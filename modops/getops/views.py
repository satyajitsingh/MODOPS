# myapp/views.py

from django.http import JsonResponse
from django.views import View
import os
import subprocess
import pandas as pd
import json

class DownloadCSVView(View):
    def download_csv(self):
        script = """
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
"""
        # Write the script to a temporary file
        with open("download_csv.py", "w") as f:
            f.write(script)

        # Run the script in a subprocess
        subprocess.run(["python", "download_csv.py"])

    def get(self, request):
        self.download_csv()

        # Check if the file was downloaded
        csv_file_path = os.path.join(os.getcwd(), "download", "notices.csv")
        if os.path.exists(csv_file_path):
            df = pd.read_csv(csv_file_path,keep_default_na=True)
            json_data = df.to_json(orient='records')
            cleaned_data = json.loads(json_data)
            return JsonResponse(cleaned_data, safe=False)
        else:
            return JsonResponse({"error": "File not found"}, status=404)
