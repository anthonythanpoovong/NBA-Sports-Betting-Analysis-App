import pandas as pd
import os

# Paths to the existing and new CSV files
existing_csv_path = "C:/Users/abelc/Desktop/NBA_ML_data/existing_data.csv"  # Change this to your existing file path
new_csv_path = "C:/Users/abelc/Desktop/NBA_ML_data/nba_games1.csv"  # Path to the newly created CSV file

# Check if the existing CSV file exists
if os.path.exists(existing_csv_path):
    # Read the existing CSV file
    existing_df = pd.read_csv(existing_csv_path)

    # Read the new CSV file
    new_df = pd.read_csv(new_csv_path)

    # Append the new rows to the existing DataFrame
    combined_df = pd.concat([existing_df, new_df], ignore_index=True)

    # Save the combined DataFrame back to the existing CSV file
    combined_df.to_csv(existing_csv_path, index=False)
    print(f"New rows added to {existing_csv_path}.")
else:
    print(f"{existing_csv_path} does not exist.")
