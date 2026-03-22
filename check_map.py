import urllib.request
import json

url = "https://pmddky.niti.gov.in/assets/districts-topojson/india_districts.json"
print(f"Fetching {url}...")
try:
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    response = urllib.request.urlopen(req)
    data = json.loads(response.read().decode('utf-8'))
    
    print("Keys in top level:", list(data.keys()))
    if "objects" in data:
        print("Objects:", list(data["objects"].keys()))
        # Let's check properties of the first few features
        first_obj_key = list(data["objects"].keys())[0]
        geometries = data["objects"][first_obj_key].get("geometries", [])
        print(f"\nTotal geometries in {first_obj_key}: {len(geometries)}")
        
        print("\nProperties of first 3 geometries:")
        for idx in range(min(3, len(geometries))):
            print(geometries[idx].get("properties", {}))
            
except urllib.error.URLError as e:
    print(f"URL Error: {e}")
except Exception as e:
    print(f"Error: {e}")
