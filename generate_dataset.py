"""
generate_dataset.py
Generates a realistic synthetic dataset for PMDDKY Smart Governance Platform
Covers: 13 Uttarakhand districts × 12 months × ~500 beneficiaries
Outputs:
  - beneficiaries.csv     : individual beneficiary records
  - district_monthly.csv  : district-level monthly KPIs
  - anomalies.csv         : labelled anomaly events (for supervised ML)
"""

import csv
import random
import math
from datetime import date, timedelta

random.seed(42)

# ── Constants ────────────────────────────────────────────────────────────────
DISTRICTS = [
    "Dehradun", "Haridwar", "Almora", "Nainital", "Pauri Garhwal",
    "Tehri Garhwal", "Chamoli", "Uttarkashi", "Pithoragarh", "Bageshwar",
    "Champawat", "Rudraprayag", "Udham Singh Nagar"
]

# District characteristics (relative population, avg land, income level 1-3)
DISTRICT_PROFILE = {
    "Dehradun":          {"pop_weight": 2.2, "avg_land": 0.9,  "income": 2},
    "Haridwar":          {"pop_weight": 2.8, "avg_land": 1.1,  "income": 2},
    "Almora":            {"pop_weight": 1.0, "avg_land": 0.6,  "income": 1},
    "Nainital":          {"pop_weight": 1.3, "avg_land": 0.8,  "income": 2},
    "Pauri Garhwal":     {"pop_weight": 0.9, "avg_land": 0.55, "income": 1},
    "Tehri Garhwal":     {"pop_weight": 0.8, "avg_land": 0.5,  "income": 1},
    "Chamoli":           {"pop_weight": 0.5, "avg_land": 0.45, "income": 1},
    "Uttarkashi":        {"pop_weight": 0.5, "avg_land": 0.5,  "income": 1},
    "Pithoragarh":       {"pop_weight": 0.7, "avg_land": 0.6,  "income": 1},
    "Bageshwar":         {"pop_weight": 0.4, "avg_land": 0.4,  "income": 1},
    "Champawat":         {"pop_weight": 0.4, "avg_land": 0.5,  "income": 1},
    "Rudraprayag":       {"pop_weight": 0.3, "avg_land": 0.4,  "income": 1},
    "Udham Singh Nagar": {"pop_weight": 2.0, "avg_land": 1.3,  "income": 3},
}

CROPS = ["Wheat", "Rice", "Maize", "Mustard", "Potato", "Apple", "Lentil", "Soybean"]
STATUSES = ["Verified", "Pending", "Rejected"]
STATUS_WEIGHTS = [0.88, 0.09, 0.03]

TOTAL_BENEFICIARIES = 5800  # ~5.8 lakh scaled to 5800 for demo (×100 in reality)
MONTHS = [date(2024, m, 1) for m in range(4, 13)]  # Apr 2024 – Dec 2024


# ── 1. BENEFICIARIES TABLE ───────────────────────────────────────────────────
print("⏳ Generating beneficiaries.csv ...")
beneficiaries = []
bid = 1

for district in DISTRICTS:
    profile = DISTRICT_PROFILE[district]
    n = int(TOTAL_BENEFICIARIES * profile["pop_weight"] / sum(
        v["pop_weight"] for v in DISTRICT_PROFILE.values()))
    
    for _ in range(max(n, 30)):
        status = random.choices(STATUSES, STATUS_WEIGHTS)[0]
        land   = round(max(0.1, random.gauss(profile["avg_land"], 0.25)), 2)
        crop   = random.choice(CROPS)
        enrolled = random.choice(MONTHS)
        
        # Fund amount based on land, income level, and some randomness
        base_fund = 6000 + (land * 3500) + (profile["income"] - 1) * 1000
        fund = round(base_fund * random.uniform(0.85, 1.15), -2)  # round to 100
        
        aadhaar_verified = (status == "Verified") or (status == "Pending" and random.random() > 0.4)

        # Synthetic anomaly flag: unusually high fund for small land
        anomaly_flag = 1 if (fund > base_fund * 1.5 and land < 0.3) else 0

        beneficiaries.append({
            "beneficiary_id":   f"UK{bid:06d}",
            "district":         district,
            "name":             f"Farmer_{bid}",
            "land_area_ha":     land,
            "primary_crop":     crop,
            "income_category":  profile["income"],
            "aadhaar_verified": int(aadhaar_verified),
            "status":           status,
            "fund_amount_inr":  int(fund),
            "enrollment_month": enrolled.strftime("%Y-%m"),
            "anomaly_flag":     anomaly_flag,
        })
        bid += 1

with open(r"E:\CSI_B4B\beneficiaries.csv", "w", newline="", encoding="utf-8") as f:
    writer = csv.DictWriter(f, fieldnames=beneficiaries[0].keys())
    writer.writeheader()
    writer.writerows(beneficiaries)

print(f"   Saved {len(beneficiaries):,} beneficiary records")


# ── 2. DISTRICT MONTHLY KPIs ─────────────────────────────────────────────────
print("⏳ Generating district_monthly.csv ...")
district_rows = []

for district in DISTRICTS:
    profile = DISTRICT_PROFILE[district]
    base_ben = int(TOTAL_BENEFICIARIES * profile["pop_weight"] / sum(
        v["pop_weight"] for v in DISTRICT_PROFILE.values()))
    
    cumulative_enrolled = 0
    cumulative_funds    = 0.0

    for i, month in enumerate(MONTHS):
        # Simulate ramp-up in early months
        ramp = 1 - math.exp(-i * 0.5)
        new_enrolled = int(base_ben * ramp * random.uniform(0.05, 0.18))
        cumulative_enrolled += new_enrolled

        avg_fund = 6000 + profile["avg_land"] * 3500
        funds_disbursed = new_enrolled * avg_fund * random.uniform(0.9, 1.1)
        cumulative_funds += funds_disbursed

        # Inject anomaly: Bageshwar has a spike in month 6
        is_anomaly = 0
        if district == "Bageshwar" and i == 5:
            funds_disbursed *= 3.2
            is_anomaly = 1

        verified_pct = random.uniform(0.83, 0.96)
        pending_pct  = random.uniform(0.02, 0.10)
        rejected_pct = 1.0 - verified_pct - pending_pct

        district_rows.append({
            "month":                    month.strftime("%Y-%m"),
            "district":                 district,
            "new_enrollments":          new_enrolled,
            "cumulative_enrolled":      cumulative_enrolled,
            "funds_disbursed_inr":      round(funds_disbursed, 2),
            "cumulative_funds_inr":     round(cumulative_funds, 2),
            "verified_pct":             round(verified_pct * 100, 1),
            "pending_pct":              round(pending_pct * 100, 1),
            "rejected_pct":             round(rejected_pct * 100, 1),
            "avg_land_ha":              round(profile["avg_land"] + random.uniform(-0.05, 0.05), 2),
            "avg_fund_per_farmer_inr":  round(funds_disbursed / max(new_enrolled, 1), 2),
            "anomaly_label":            is_anomaly,
        })

with open(r"E:\CSI_B4B\district_monthly.csv", "w", newline="", encoding="utf-8") as f:
    writer = csv.DictWriter(f, fieldnames=district_rows[0].keys())
    writer.writeheader()
    writer.writerows(district_rows)

print(f"   Saved {len(district_rows)} district-month records ({len(DISTRICTS)} districts × {len(MONTHS)} months)")


# ── 3. ANOMALIES TABLE (labelled, for supervised ML) ────────────────────────
print("⏳ Generating anomalies.csv ...")
anomaly_rows = []

# From district_monthly: rows with anomaly_label = 1
for row in district_rows:
    if row["anomaly_label"] == 1:
        anomaly_rows.append({
            "month":       row["month"],
            "district":    row["district"],
            "type":        "fund_spike",
            "description": "Fund disbursement > 3× expected for district",
            "severity":    "HIGH",
            "flagged_by":  "AI_Anomaly_Detector",
        })

# From beneficiaries: anomaly_flag = 1
for b in beneficiaries:
    if b["anomaly_flag"] == 1:
        anomaly_rows.append({
            "month":       b["enrollment_month"],
            "district":    b["district"],
            "type":        "fund_amount_outlier",
            "description": f"Beneficiary {b['beneficiary_id']}: fund ₹{b['fund_amount_inr']} high for land {b['land_area_ha']}ha",
            "severity":    "MEDIUM",
            "flagged_by":  "AI_Anomaly_Detector",
        })

# Add some synthetic pattern anomalies
for district in random.sample(DISTRICTS, 4):
    anomaly_rows.append({
        "month":       "2024-09",
        "district":    district,
        "type":        "enrollment_drop",
        "description": "Enrollment dropped >40% vs previous month",
        "severity":    "MEDIUM",
        "flagged_by":  "AI_Anomaly_Detector",
    })

with open(r"E:\CSI_B4B\anomalies.csv", "w", newline="", encoding="utf-8") as f:
    writer = csv.DictWriter(f, fieldnames=["month", "district", "type", "description", "severity", "flagged_by"])
    writer.writeheader()
    writer.writerows(anomaly_rows)

print(f"   Saved {len(anomaly_rows)} anomaly records")

print()
print("✅ Dataset generation complete!")
print("   E:\\CSI_B4B\\beneficiaries.csv      — Individual farmer records (for classification/verification model)")
print("   E:\\CSI_B4B\\district_monthly.csv   — District KPI time-series (for trend forecasting model)")
print("   E:\\CSI_B4B\\anomalies.csv          — Labelled anomaly events  (for anomaly detection model)")
print()
print("💡 Recommended ML models:")
print("   beneficiaries.csv   → Random Forest / XGBoost  (predict fund_amount or verify legitimacy)")
print("   district_monthly.csv → LSTM / ARIMA             (predict next month funds/enrollments)")
print("   anomalies.csv        → Isolation Forest          (unsupervised anomaly scoring)")
