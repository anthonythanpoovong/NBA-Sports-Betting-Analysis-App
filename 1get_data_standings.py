import os

SEASONS = list(range(2025, 2026))

DATA_DIR = "data"
STANDINGS_DIR = os.path.join(DATA_DIR, "standings")
SCORES_DIR = os.path.join(DATA_DIR, "scores")

# Check if the data directory exists
if not os.path.exists(DATA_DIR):
    print(f"{DATA_DIR} does not exist.")
else:
    print(f"{DATA_DIR} exists.")

# Check if the standings directory exists
if not os.path.exists(STANDINGS_DIR):
    print(f"{STANDINGS_DIR} does not exist.")
else:
    print(f"{STANDINGS_DIR} exists.")

# Check if the scores directory exists
if not os.path.exists(SCORES_DIR):
    print(f"{SCORES_DIR} does not exist.")
else:
    print(f"{SCORES_DIR} exists.")

import os
import time
from bs4 import BeautifulSoup
from playwright.async_api import async_playwright, TimeoutError as PlaywrightTimeout
import asyncio



# Check and create data directories if they don't exist
if not os.path.exists(DATA_DIR):
    os.makedirs(DATA_DIR)
if not os.path.exists(STANDINGS_DIR):
    os.makedirs(STANDINGS_DIR)

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
        except PlaywrightTimeout:
            print(f"Timeout error on {url}")
            continue
        else:
            break
    return html

async def scrape_season(season):
    url = f"https://www.basketball-reference.com/leagues/NBA_{season}_games.html"
    html = await get_html(url, "#content .filter")
    
    soup = BeautifulSoup(html, "html.parser")
    links = soup.find_all("a")
    standings_pages = [f"https://www.basketball-reference.com{l['href']}" for l in links]
    
    for url in standings_pages:
        save_path = os.path.join(STANDINGS_DIR, url.split("/")[-1])
        if os.path.exists(save_path):
            print(f"File already exists: {save_path}")
            continue
        
        html = await get_html(url, "#all_schedule")
        with open(save_path, "w+") as f:
            f.write(html)
            print(f"Saved HTML to {save_path}")

async def main():
    for season in SEASONS:
        await scrape_season(season)

if __name__ == "__main__":
    asyncio.run(main())
