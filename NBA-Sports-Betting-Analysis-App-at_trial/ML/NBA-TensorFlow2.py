import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.utils import class_weight
import tensorflow as tf
from tensorflow.keras import layers

# Load the dataset
path = "nba_games_new.csv"
df = pd.read_csv(path)

# Ensure team names are strings to avoid mixed data types
df['home_opp'] = df['home_opp'].astype(str)
df['team_opp'] = df['team_opp'].astype(str)

# Filter the data to include only games from the 2020 season onwards
df_filtered = df[df['season'] >= 2020]

# Create a 'winner' column where 1 = home team wins, 0 = away team wins
df_filtered['winner'] = (df_filtered['pts'] > df_filtered['pts_opp']).astype(int)

# Check class balance
home_wins = df_filtered['winner'].value_counts(normalize=True)
print(f"Home Wins Proportion: {home_wins[1]:.2f}, Away Wins Proportion: {home_wins[0]:.2f}")

# Encode team names
unique_teams = np.concatenate((df_filtered['home_opp'].unique(), df_filtered['team_opp'].unique()))
le = LabelEncoder()
le.fit(unique_teams)
df_filtered['home_team_enc'] = le.transform(df_filtered['home_opp'])
df_filtered['away_team_enc'] = le.transform(df_filtered['team_opp'])

# Prepare features based on available stats from the CSV
season_features = [
    'fg%', '3p%', 'ft%', 'tov%',
    'ortg_max_opp', 'drtg_max_opp',
    'trb', 'pts', 'pts_opp'
]

# Calculate season averages for both home and away
home_averages = df_filtered.groupby('home_opp')[season_features].mean().reset_index()
home_averages.columns = ['team'] + [f"{stat}_avg" for stat in season_features]
away_averages = df_filtered.groupby('team_opp')[season_features].mean().reset_index()
away_averages.columns = ['team'] + [f"{stat}_avg" for stat in season_features]

# Combine averages and add a home advantage feature
season_averages = pd.concat([home_averages, away_averages]).groupby('team').mean().reset_index()
season_averages['home_advantage'] = home_wins[1] - home_wins[0]

# Merge averages with the main DataFrame
home_averages = season_averages.rename(columns={f"{stat}_avg": f"home_{stat}" for stat in season_features})
away_averages = season_averages.rename(columns={f"{stat}_avg": f"away_{stat}" for stat in season_features})
df_merged = df_filtered.merge(home_averages, left_on='home_opp', right_on='team', how='left')
df_merged = df_merged.merge(away_averages, left_on='team_opp', right_on='team', how='left', suffixes=('', '_away'))

# Prepare final features for the model
final_features = [
    'home_team_enc', 'away_team_enc', 'home_advantage',
    'home_fg%', 'home_3p%', 'home_ft%', 'home_tov%',
    'away_fg%', 'away_3p%', 'away_ft%', 'away_tov%',
    'home_ortg_max_opp', 'home_drtg_max_opp',
    'away_ortg_max_opp', 'away_drtg_max_opp'
]

X = df_merged[final_features]
y = df_merged['winner']

# Scale the features separately for home and away to avoid bias
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# Split the data into train and test sets
X_train, X_test, y_train, y_test = train_test_split(X_scaled, y, test_size=0.2, random_state=42)

# Handle class imbalance by adjusting class weights
class_weights_array = class_weight.compute_class_weight(
    class_weight='balanced', classes=np.unique(y_train), y=y_train
)
class_weights = {i: class_weights_array[i] for i in np.unique(y_train)}

# Convert y_train and y_test to numpy arrays with two dimensions
y_train = np.array(y_train).reshape(-1, 1)
y_test = np.array(y_test).reshape(-1, 1)

# Print class weights to verify
print("Class weights:", class_weights)

# Build the TensorFlow Model
model = tf.keras.Sequential([
    layers.Input(shape=(X_train.shape[1],)),
    layers.Dense(128, activation='relu'),
    layers.Dropout(0.2),
    layers.Dense(64, activation='relu'),
    layers.Dense(1, activation='sigmoid')
])

model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])
model.fit(X_train, y_train, epochs=20, batch_size=32, validation_split=0.2, class_weight=class_weights)

# Evaluate the model
test_loss, test_accuracy = model.evaluate(X_test, y_test)
print(f'Test Accuracy: {test_accuracy:.4f}')

# Adjusted Prediction Function
def predict_winner(home_team, away_team):
    if home_team not in le.classes_ or away_team not in le.classes_:
        raise ValueError(f"Teams '{home_team}' or '{away_team}' are not recognized.")

    # Get average stats for both teams
    home_team_stats = season_averages[season_averages['team'] == home_team].iloc[0]
    away_team_stats = season_averages[season_averages['team'] == away_team].iloc[0]

    # Prepare input data for prediction
    input_data = [
        le.transform([home_team])[0],
        le.transform([away_team])[0],
        season_averages['home_advantage'].mean(),
        home_team_stats['fg%_avg'], home_team_stats['3p%_avg'], home_team_stats['ft%_avg'], home_team_stats['tov%_avg'],
        away_team_stats['fg%_avg'], away_team_stats['3p%_avg'], away_team_stats['ft%_avg'], away_team_stats['tov%_avg'],
        home_team_stats['ortg_max_opp_avg'], home_team_stats['drtg_max_opp_avg'],
        away_team_stats['ortg_max_opp_avg'], away_team_stats['drtg_max_opp_avg']
    ]

    # Scale the input data
    input_data_scaled = scaler.transform([input_data])

    # Predict the probability of the home team winning
    probability = model.predict(input_data_scaled)[0][0]

    # Return the predicted probability along with the winner
    return {
        'home_team': home_team,
        'away_team': away_team,
        'home_win_probability': probability,
        'away_win_probability': 1 - probability
    }

# Example prediction with probability
prediction = predict_winner("LAL", "BOS")
print(f"Prediction: {prediction['home_team']} vs {prediction['away_team']}")
print(f"Home team win probability: {prediction['home_win_probability']:.2f}")
print(f"Away team win probability: {prediction['away_win_probability']:.2f}")
