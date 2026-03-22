import urllib.request
import json

url = "https://pmddky.niti.gov.in/assets/districts-topojson/india_districts.json"
try:
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    response = urllib.request.urlopen(req)
    data = json.loads(response.read().decode('utf-8'))
    
    with open("feature_props.txt", "w", encoding="utf-8") as f:
        f.write(f"Type: {data.get('type')}\n")
        features = data.get("features", [])
        f.write(f"Total features: {len(features)}\n\n")
        
        for idx in range(min(5, len(features))):
            f.write(f"Feature {idx} properties: {json.dumps(features[idx].get('properties', {}))}\n")
            
except Exception as e:
    with open("feature_props.txt", "w", encoding="utf-8") as f:
        f.write(f"Error: {e}")
