
import os
import asyncio
from pyppeteer import launch

async def main():
    download_directory = os.path.join(os.getcwd(), "download")
    os.makedirs(download_directory, exist_ok=True)

    browser = await launch(headless=True)
    page = await browser.newPage()

    # Set download behavior
    await page._client.send('Page.setDownloadBehavior', {
        'behavior': 'allow',
        'downloadPath': download_directory
    })

    await page.goto('https://www.contractsfinder.service.gov.uk/')
    await page.type('input[name="keywords"]', 'Defence, MOD')
    await page.click('button[name="adv_search"]')
    await page.waitFor(5000)
    await page.click('#get_csv_file')

    await asyncio.sleep(15)
    await browser.close()

asyncio.run(main())
