import urllib.request
import re

url = "https://pmddky.niti.gov.in/assets/index-CBOf23xL.js"
try:
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    response = urllib.request.urlopen(req)
    content = response.read().decode('utf-8')

    json_urls = re.findall(r'"([^"]+\.json)"', content)
    api_urls = re.findall(r'"(/api/[^"]+)"', content)
    http_urls = re.findall(r'(\bhttps?://[^"\s]+\b)', content)

    with open("endpoints.txt", "w", encoding="utf-8") as f:
        f.write("--- Found .json matches ---\n")
        f.write("\n".join(set(json_urls)) + "\n")
        f.write("\n--- Found /api/ matches ---\n")
        f.write("\n".join(set(api_urls)) + "\n")
        f.write("\n--- Found http urls ---\n")
        f.write("\n".join(set(http_urls)) + "\n")

except Exception as e:
    print(f"Error: {e}")
