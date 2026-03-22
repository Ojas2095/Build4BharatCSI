import csv
import random

# Core categories and subcategories derived from the provided PM-DDKY dashboard screenshot
CATEGORIES = {
    "Enhancing Agricultural Productivity": [
        "Encouraging Crop Diversification and Sustainable Agricultural Practices",
        "Augmenting Post-Harvest Storage Capacity",
        "Improving Irrigation Infrastructure",
        "Enabling Greater Access to Short-Term and Long-Term Agricultural Credit",
        "Better Governance & Service Delivery"
    ],
    "Health and Nutrition": [
        "Improving Access to Healthcare",
        "Enhancing Maternal and Child Health",
        "Reducing Malnutrition"
    ],
    "Education": [
        "Improving School Infrastructure",
        "Enhancing Quality of Teaching",
        "Increasing Student Attendance"
    ]
}

# Aspirational districts sample matching the image context
DISTRICTS = [
    {"district": "Malkangiri", "state": "Odisha", "base_score": 4.5},
    {"district": "Bastar", "state": "Chhattisgarh", "base_score": 3.6},
    {"district": "Kalahandi", "state": "Odisha", "base_score": 3.5},
    {"district": "Rayagada", "state": "Odisha", "base_score": 3.2},
    {"district": "Sukma", "state": "Chhattisgarh", "base_score": 3.1},
    {"district": "Bijapur", "state": "Chhattisgarh", "base_score": 3.0},
    {"district": "Dantewada", "state": "Chhattisgarh", "base_score": 2.9},
    {"district": "Ranchi", "state": "Jharkhand", "base_score": 4.1},
    {"district": "Khunti", "state": "Jharkhand", "base_score": 3.4},
    {"district": "Gaya", "state": "Bihar", "base_score": 3.7},
    {"district": "Jamui", "state": "Bihar", "base_score": 3.2},
    {"district": "Chitrakoot", "state": "Uttar Pradesh", "base_score": 3.8},
    {"district": "Fatehpur", "state": "Uttar Pradesh", "base_score": 4.0},
]

def generate_dataset(output_file):
    print(f"Generating synthetic dataset: {output_file}...")
    rows = []
    
    for cat, subcats in CATEGORIES.items():
        for subcat in subcats:
            for d in DISTRICTS:
                # Add some random variance to the score based on the base_score
                variance = random.uniform(-0.5, 0.8)
                raw_score = d["base_score"] + variance
                
                # Make sure specific exact values from image show up for 'Enhancing Agricultural Productivity'
                if cat == "Enhancing Agricultural Productivity" and subcat == "Encouraging Crop Diversification and Sustainable Agricultural Practices":
                    if d["district"] == "Malkangiri":
                        raw_score = 4.64
                    elif d["district"] == "Bastar":
                        raw_score = 3.73
                    elif d["district"] == "Kalahandi":
                        raw_score = 3.65

                score = round(max(0.1, raw_score), 2)
                
                rows.append({
                    "Category": cat,
                    "Subcategory": subcat,
                    "State": d["state"],
                    "District": d["district"],
                    "Score": score
                })
                
    with open(output_file, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=["Category", "Subcategory", "State", "District", "Score"])
        writer.writeheader()
        writer.writerows(rows)
        
    print(f"Successfully generated {len(rows)} records in {output_file}")

if __name__ == "__main__":
    generate_dataset(r"e:\CSI_B4B\pmddky_dashboard_dummy.csv")
