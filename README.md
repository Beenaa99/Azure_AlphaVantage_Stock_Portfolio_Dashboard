# Real-time Portfolio Dashboard 
  

## Project’s Function
### Cloud-based real-time portfolio monitoring system that integrates live stock data visualization and stream processing. Provides interactive visualization of stock performance, technical indicators, and portfolio metrics for informed investment decisions.
---
![Descriptors](https://github.com/Beenaa99/Azure_AlphaVantage_Stock_Portfolio_Dashboard/blob/main/demo_videos/descriptors.gif)


---

## Dataset
- **Primary Source:** [AlphaVantage API](https://www.alphavantage.co/documentation/)
-  Requires an AlphaVantage API key
- **Stocks:** AAPL, NVDA, AMD, TSLA (Tech sector focus)  
- **Data Types:**  
  - **Historical Data:** 20 years of daily OHLCV data, stored in Azure Blob Storage for batch processing.  
  - **Intraday Data:** 1-min intraday data (simulated at 3s intervals)  
  - **Technical Indicators:** Via stream Processing - (SMA, CMA, VMA).  

---

## Pipeline / Architecture
1. **Data Ingestion:**  
   - Historical Data: CSV files from AlphaVantage → Azure Blob Storage.  
   - Real-time Data: Simulated intraday data → Azure Event Hubs.  

2. **Processing:**  
   - **Real-time:**
   - Azure Stream Analytics computes SMA, CMA, and VMA dynamically for trend Identification.
   - **Batch:** Azure Data Factory processes historical data.  

3. **Storage:**  
   - Historical Data: Azure SQL Database.  
   - Real-time Data: In-memory caching for low-latency updates & Azure Blob Storage archival.  

4. **Presentation:**  
   - Flask-based dashboard with WebSocket integration for dynamic updates.  

---
## Infographic
### System Architecture
![System Architecture](https://github.com/Beenaa99/Azure_AlphaVantage_Stock_Portfolio_Dashboard/blob/main/images/system_arch.png?raw=true)


---

## Data Quality Assessment
1. **Completeness:**  
   - Verified timestamp alignment across datasets.  
   - Interpolated missing data to ensure seamless visualization.  

2. **Consistency:**  
   - Standardized timestamps and numerical formats.  
   - Ensured compatibility across real-time and historical data schemas.  

---

## Data Transformation Models Used
1. **Real-time Pipeline:**  
   - Raw Data (colab producer) → Event Hub 1 → Stream Analytics → Technical Indicators → Event Hub 2 → Consumer → WebSocket
   - Charts moving average (SMA: Simple Moving Average & CMA : Cumulative Moving Average) crossovers for potential buy/sell signals.
   - Volume Analysis : Charts Volume trades against VMA (Volume Moving Average) to understand trading activity for informed investment decisions
  
2. **Batch Pipeline:**  
   - CSV Files → Azure Blob Storage → Data Factory → SQL Database.  
   - Cleaning and Standardization: Ensures uniform formats across dates, decimals, and structures.

![Volume Analysis](https://github.com/Beenaa99/Azure_AlphaVantage_Stock_Portfolio_Dashboard/blob/main/demo_videos/volume%20analysis.gif)


**Execution Notes:**  
# Real-time Portfolio Dashboard - Setup Guide

## Prerequisites
- Python 3.8+
- Azure Account (Event Hub, Stream Analytics, Data Factory, SQL DB)
- ([Data Studio](https://azure.microsoft.com/en-us/products/data-studio))
- ([Event Hubs](https://azure.microsoft.com/en-us/products/event-hubs))
- ([Data Factory](https://azure.microsoft.com/en-us/products/data-factory))
- ([Stream Analytics](https://azure.microsoft.com/en-us/products/stream-analytics))
- ([Flask](https://flask.palletsprojects.com/en/stable/))
- AlphaVantage API key

```
# Keys required:
ALPHAVANTAGE_API_KEY
SQL_CONNECTION_STRING (Azure SQL server)
EVENTHUB_CONN_STR (event hub 1 for producers, event hub 2 for consumer)
```
## Repository Structure
```
├── azure-data-studio/          # SQL scripts 
├── azure-event-hub/            # Producer/Consumer scripts 
├── azure-data-factory/         # ADF pipelines 
├── azure-stream-analytics/    # Analytics queries 
└── web-app/                    # Flask application 
```
### 1. Database
```bash
cd azure-data-studio
# Run sql files in Azure Data Studio subfolders
```

### 2. Event Hub
```bash
cd azure-event-hub
# Start data flow:
python producer.py (window/stock -- new terminal)
python consumer.py  # new terminal
```

### 3. Stream Analytics
```bash
cd azure-stream-processing
# Import stream_processing.aql to Azure Portal
# Configure input/output and start job
```

### 4. Data Factory
```bash
cd azure-data-factory
# Import and configure pipeline JSONs via Azure Portal
```

### 5. Web App
```bash
cd web-app
pip install -r requirements.txt
python app.py
# Access at http://localhost:5000
```

## Verification
- Check database for portfolio table
- Verify Event Hub data flow (producer -> event hub 1 -> stream analytics -> event hub 2 -> consumer)
- Monitor Stream Analytics job
- Confirm real-time dashboard updates


## Thorough Investigation
### Viability and Innovations
The project demonstrates a scalable, cloud-native architecture capable of real-time stock analysis. Innovations include simulated real-time streaming, WebSocket integration, and dynamic visualizations.

### Challenges and Recommendations
- **API Rate Limits:** Simulated data addresses this but limits live use cases.  
- **Latency Issues:** Backend optimizations required under high workloads.  
- **Costs:** Scaling Azure services may increase expenses.  

### Future Steps
- Add predictive analytics (e.g., ML-based forecasting).  
- Incorporate automated trading and alert systems.  
- Explore cost-effective, self-hosted alternatives.

---
## Demo Videos & Screenshots

![Watch the Demo](https://github.com/Beenaa99/Azure_AlphaVantage_Stock_Portfolio_Dashboard/blob/main/demo_videos/portfolio_page_demo.gif)


---

## REPORT 
Please find the report ([here](https://github.com/Beenaa99/Azure_AlphaVantage_Stock_Portfolio_Dashboard/blob/main/ECE%205984%20_%20Project%20Final%20Report.pdf))

---

## GitHub Repository
[[GitHub Link](https://github.com/Beenaa99/Azure_AlphaVantage_Stock_Portfolio_Dashboard)]

