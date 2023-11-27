import re
import json

with open("data.sql", "r") as f:
    sql_fragment = f.read()


data_pattern = re.compile(r"\((\d+),\s*'(\w+)',\s*'(\w+)'\)")
matches = data_pattern.findall(sql_fragment)

make_models_dict = {}
for match in matches:
    year, make, model = match
    if make not in make_models_dict:
        make_models_dict[make] = {"make": make, "models": []}
    make_models_dict[make]["models"].append(model)

#usuń z modeli wszystkie te które się powtarzają żeby został tylko jeden
for make in make_models_dict:
    make_models_dict[make]["models"] = list(set(make_models_dict[make]["models"]))

make_models_list = list(make_models_dict.values())
json_data = json.dumps(make_models_list, ensure_ascii=False, indent=2)

with open("cars.json", "w") as f:
    f.write(json_data)


