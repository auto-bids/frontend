from bs4 import BeautifulSoup
import re
import json

with open('trailersData.html') as html_file:
    html_data = html_file.read()


soup = BeautifulSoup(html_data, 'html.parser')

# Znajdź wszystkie elementy <span> z klasą 'ooa-micpln er34gjf0' wewnątrz <li>
brand_elements = soup.select('li.ooa-t0lbh8 span.ooa-micpln.er34gjf0')

# Wydziel nazwy marek z tagu <span>
brands_list = [element.text.strip() for element in brand_elements]

#omiń 2 pierwsze elementy
brands_list = brands_list[2:]

def remove_numbers_and_parentheses(brand):
    return re.sub(r'\(\d+\)', '', brand).strip()

cleaned_brands_list = [remove_numbers_and_parentheses(brand) for brand in brands_list]

with open('trailersBrands.json', 'w', encoding='utf-8') as file:
    json.dump(cleaned_brands_list, file, ensure_ascii=False, indent=2)

