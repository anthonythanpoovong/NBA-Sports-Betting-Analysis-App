import os
import pandas as pd
from bs4 import BeautifulSoup

# Specify the custom path for scores
# Option 1: Use double backslashes
#SCORES_DIR = "C:\\Users\\abelc\\Desktop\\NBA_ML_data\\data\\scores"  

# Option 2: Use a raw string
#SCORES_DIR = r"C:\Users\abelc\Desktop\NBA_ML_data\data\scores"

# Option 3: Use forward slashes
SCORES_DIR = "C:/Users/abelc/Desktop/NBA_ML_data/data/scores"

# Check if the scores directory exists
if not os.path.exists(SCORES_DIR):
    print(f"{SCORES_DIR} does not exist.")
else:
    print(f"{SCORES_DIR} exists.")

# List box score files
box_scores = os.listdir(SCORES_DIR)
box_scores = [os.path.join(SCORES_DIR, f) for f in box_scores if f.endswith(".html")]

# Check if there are any box score files
if not box_scores:
    print("No box score files found in the scores directory.")
else:
    print(f"Found {len(box_scores)} box score files.")

def parse_html(box_score):
    with open(box_score, encoding='utf-8') as f:  # Specify encoding here
        html = f.read()

    soup = BeautifulSoup(html, "html.parser")
    [s.decompose() for s in soup.select("tr.over_header")]
    [s.decompose() for s in soup.select("tr.thead")]
    return soup


def read_season_info(soup):
    nav = soup.select("#bottom_nav_container")[0]
    hrefs = [a["href"] for a in nav.find_all('a')]
    season = os.path.basename(hrefs[1]).split("_")[0]
    return season

def read_line_score(soup):
    line_score = pd.read_html(str(soup), attrs={'id': 'line_score'})[0]
    cols = list(line_score.columns)
    cols[0] = "team"
    cols[-1] = "total"
    line_score.columns = cols
    
    line_score = line_score[["team", "total"]]
    
    return line_score

def read_stats(soup, team, stat):
    df = pd.read_html(str(soup), attrs={'id': f'box-{team}-game-{stat}'}, index_col=0)[0]
    df = df.apply(pd.to_numeric, errors="coerce")
    return df

games = []
base_cols = None

# Process each box score file
for box_score in box_scores:
    soup = parse_html(box_score)

    line_score = read_line_score(soup)
    teams = list(line_score["team"])

    summaries = []
    for team in teams:
        basic = read_stats(soup, team, "basic")
        advanced = read_stats(soup, team, "advanced")

        totals = pd.concat([basic.iloc[-1, :], advanced.iloc[-1, :]])
        totals.index = totals.index.str.lower()

        maxes = pd.concat([basic.iloc[:-1].max(), advanced.iloc[:-1].max()])
        maxes.index = maxes.index.str.lower() + "_max"

        summary = pd.concat([totals, maxes])
        
        if base_cols is None:
            base_cols = list(summary.index.drop_duplicates(keep="first"))
            base_cols = [b for b in base_cols if "bpm" not in b]
        
        summary = summary[base_cols]
        
        summaries.append(summary)

    summary = pd.concat(summaries, axis=1).T

    game = pd.concat([summary, line_score], axis=1)
    game["home"] = [0, 1]

    game_opp = game.iloc[::-1].reset_index()
    game_opp.columns += "_opp"

    full_game = pd.concat([game, game_opp], axis=1)
    full_game["season"] = read_season_info(soup)
    
    full_game["date"] = os.path.basename(box_score)[:8]
    full_game["date"] = pd.to_datetime(full_game["date"], format="%Y%m%d")
    
    full_game["won"] = full_game["total"] > full_game["total_opp"]
    games.append(full_game)
    
    if len(games) % 100 == 0:
        print(f"{len(games)} / {len(box_scores)}")

# Define the path to save the CSV file
output_csv_path = os.path.join("C:\\Users\\abelc\\Desktop\\NBA_ML_data", "nba_games_22_23_24Oct31_season.csv")  # Specify your output path

# Combine all game data into a single DataFrame
if games:  # Ensure there are games to concatenate
    games_df = pd.concat(games, ignore_index=True)
    # Save the DataFrame to a CSV file
    games_df.to_csv(output_csv_path, index=False)
    print(f"Data saved to {output_csv_path}")
else:
    print("No game data to save.")
