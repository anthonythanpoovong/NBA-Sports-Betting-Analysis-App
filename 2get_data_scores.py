import os
import pandas as pd
import time
from bs4 import BeautifulSoup
from playwright.async_api import async_playwright, TimeoutError as PlaywrightTimeout
import asyncio

# Define directories
DATA_DIR = "data"
STANDINGS_DIR = os.path.join(DATA_DIR, "standings")
SCORES_DIR = os.path.join(DATA_DIR, "scores")

# Ensure scores directory exists
if not os.path.exists(SCORES_DIR):
    os.makedirs(SCORES_DIR)

async def get_html(url, selector, sleep=5, retries=3):
    html = None
    for i in range(1, retries + 1):
        time.sleep(sleep * i)  # Wait before retrying
        try:
            async with async_playwright() as p:
                browser = await p.chromium.launch()
                page = await browser.new_page()
                await page.goto(url)
                print(await page.title())
                html = await page.inner_html(selector)
        except Exception as e:
            print(f"Error occurred: {e}")
            continue
        else:
            break
    return html

async def scrape_game(standings_file):
    with open(standings_file, 'r', encoding='utf-8') as f:
        html = f.read()

    soup = BeautifulSoup(html, "html.parser")
    links = soup.find_all("a")
    hrefs = [l.get('href') for l in links]
    box_scores = [f"https://www.basketball-reference.com{l}" for l in hrefs if l and "boxscore" in l and '.html' in l]

    for url in box_scores:
        save_path = os.path.join(SCORES_DIR, url.split("/")[-1])
        if os.path.exists(save_path):
            print(f"File already exists: {save_path}")
            continue

        html = await get_html(url, "#content")
        if not html:
            continue
        
        # Open the file with utf-8 encoding
        with open(save_path, "w+", encoding='utf-8') as f:
            f.write(html)
            print(f"Saved box score to {save_path}")


async def main():
    # List all standings files
    standings_files = os.listdir(STANDINGS_DIR)
    SEASONS = list(range(2023, 2026))  # Define your seasons here

    for season in SEASONS:
        files = [s for s in standings_files if str(season) in s]
        
        for f in files:
            filepath = os.path.join(STANDINGS_DIR, f)
            await scrape_game(filepath)

if __name__ == "__main__":
    import asyncio
    asyncio.run(main())
