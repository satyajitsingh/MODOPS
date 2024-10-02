# Django CSV Downloader

This project is a Django web application that downloads a CSV file from the UK Government Contracts Finder website and returns its contents as JSON. It utilizes the `pyppeteer` library to automate the download process.

## Features

- Downloads CSV files based on a search query.
- Returns the contents of the downloaded CSV file in JSON format.
- Implements asynchronous handling of the download process.

## Requirements

- Python 3.8 or higher
- Django 3.1 or higher
- pyppeteer
- pandas
- requests

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/satyajitsingh/MODOPS.git
   cd <repository_directory>

2. **Create a virtual environment:**
python -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`

3. **Install the required packages**
pip install django pandas pyppeteer requests

4. **Create a new Django project**
django-admin startproject myproject
cd myproject

5. **Create a new Django app**
python manage.py startapp myapp

6. **Add myapp to INSTALLED_APPS in settings.py**
INSTALLED_APPS = [
    ...
    'myapp',
]

## Configuration
Update the myapp/views.py file with the provided code to set up the CSV downloading functionality.
Update the myapp/urls.py file to route requests to the download view.
Include the app's URLs in the project's urls.py

## Running the Application
1. **Migrate the database**
python manage.py migrate

2. **Run the server**
python manage.py runserver

3. **Access the download functionality**
Open your web browser and navigate to - http://127.0.0.1:8000/download_csv/

### Customization

Feel free to modify the sections, such as the project title or any specific instructions, to better fit your project’s requirements or additional features. Let me know if you need any more changes!