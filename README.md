# PM-DDKY Build4Bharat Project - Kishta Coders

This repository contains the core development codebase for the PM-DDKY Smart Governance Platform project by team Kishta Coders for the Build4Bharat Hackathon. 

## Project Structure

```text
CSI_B4B/
│
├── scripts/                          # Data Generation & Processing Scripts
│   ├── extract_api.py                # Fetches / parses external API endpoints
│   ├── generate_dataset.py           # Generates dummy data and structures
│   ├── generate_dashboard_dummy.py   # Creates structured records for dashboard usage
│   ├── check_features.py             # Validates dataset parameters/features
│   └── check_map.py                  # Testing mapping logic for geographic attributes
│
├── datasets/                         # Datasets & API Definitions
│   ├── beneficiaries.csv             # Beneficiary demographic records
│   ├── anomalies.csv                 # Identified/simulated dataset anomalies
│   ├── district_monthly.csv          # Regional aggregate data tracking
│   ├── pmddky_dashboard_dummy.csv    # Master dashboard dataset view
│   ├── endpoints.txt                 # API reference list
│   └── feature_props.txt             # Dataset properties schema
│
└── webapp/                           # Presentation & Dashboard UI
    ├── presentation.html             # Main HTML visualization interface
    └── pmddky_index.js               # Core frontend business logic & map rendering
```

## Overview
This platform is designed to track progress, ensure targeted interventions, and showcase transparent data visualization for the PM DDKY initiative. We utilize various Python scripts to collect, sanitize, and format data, which is then visualized via a detailed web dashboard application spanning the files in `webapp/`.
