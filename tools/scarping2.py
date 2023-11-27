import time
import json
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import re

def accept_cookies(browser):
    try:
        cookies_popup = WebDriverWait(browser, 10).until(EC.element_to_be_clickable((By.ID, 'onetrust-accept-btn-handler')))
        cookies_popup.click()
    except:
        pass

def clean_name(raw_name):
    cleaned_name = re.sub(r'\s+\(\d+\)$', '', raw_name)
    return cleaned_name

def get_all_brands_and_models():
    browser = webdriver.Chrome()

    url = 'https://www.otomoto.pl/?category=osobowe'
    browser.get(url)

    accept_cookies(browser)

    brand_input = WebDriverWait(browser, 10).until(EC.element_to_be_clickable((By.CLASS_NAME, 'ooa-4ehujk')))
    brand_input.click()

    brand_elements = WebDriverWait(browser, 10).until(EC.visibility_of_all_elements_located((By.CLASS_NAME, "ooa-164w2lr")))

    brand_elements = brand_elements[11:]

    brands_and_models = []

    counter = 11

    for brand_element in brand_elements:
        # print(f"brand_element: {brand_element}")
        brand_input.click()
        time.sleep(1)
        brand_input.clear()
        brand_elements = WebDriverWait(browser, 10).until(EC.visibility_of_all_elements_located((By.CLASS_NAME, "ooa-164w2lr")))
        if len(brand_elements) < counter:
            break
        brand_element = brand_elements[counter]
        counter += 1
        brand_name = brand_element.text.strip()
        brand_name=clean_name(brand_name)
        brand_element.click()
        time.sleep(1)

        model_inputs = WebDriverWait(browser, 10).until(
        EC.presence_of_all_elements_located((By.CLASS_NAME, "ooa-1xfqg6o"))
        )

        if len(model_inputs) < 2:
            continue

        model_input = model_inputs[1]
        model_input.click()
        time.sleep(1)

        model_elements = WebDriverWait(browser, 10).until(EC.visibility_of_all_elements_located((By.CLASS_NAME, 'ooa-164w2lr')))
        model_elements = model_elements[1:]

        models = []
        for model_element in model_elements:
            model_name = model_element.text.strip()
            model_name=clean_name(model_name)
            models.append(model_name)

        brands_and_models.append({"make": brand_name, "models": models})
        with open('test.txt', 'w', encoding='utf-8') as f:
            f.write(json.dumps(brands_and_models, ensure_ascii=False, indent=2))

    browser.quit()

    return brands_and_models

brands_and_models = get_all_brands_and_models()

print(json.dumps(brands_and_models, ensure_ascii=False, indent=2))

with open('brands_and_models.json', 'w', encoding='utf-8') as f:
    json.dump(brands_and_models, f, ensure_ascii=False, indent=2)
