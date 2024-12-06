# Real-time Portfolio Dashboard (AlphaVantage)
  

## Project’s Function
A cloud-based real-time portfolio dashboard that tracks and visualizes stock performance using AlphaVantage API data, processes it through Azure services, and provides interactive visualizations with technical indicators.

---

## Dataset
- **Primary Source:** [AlphaVantage API](https://www.alphavantage.co/documentation/)
-  Requires an AlphaVantage API key
- **Stocks:** AAPL, NVDA, AMD, TSLA (Tech sector focus)  
- **Data Types:**  
  - **Historical Data:** 20 years of daily OHLCV data, stored in Azure Blob Storage for batch processing.  
  - **Intraday Data:** 1-minute OHLCV data simulated at 3-second intervals for November 2024.  
  - **Technical Indicators:** Calculated metrics (SMA, CMA, VMA).  

---

## Pipeline / Architecture
1. **Data Ingestion:**  
   - Historical Data: CSV files from AlphaVantage → Azure Blob Storage.  
   - Real-time Data: Simulated intraday data → Azure Event Hubs.  

2. **Processing:**  
   - **Real-time:** Azure Stream Analytics computes technical indicators.  
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
   - Streamed data → Event Hub → Stream Analytics → WebSocket server.  
   - Calculated SMA, CMA, VMA dynamically in 30-second windows.  

2. **Batch Pipeline:**  
   - CSV Files → Azure Blob Storage → Data Factory → SQL Database.  
   - Cleaned and standardized historical data for trend analysis.  

**Execution Notes:**  
# Real-time Portfolio Dashboard - Setup Guide

## Prerequisites
- Python 3.8+
- Azure Account (Event Hub, Stream Analytics, Data Factory, SQL DB)
- AlphaVantage API key

```bash
# Configure .env with:
# - ALPHAVANTAGE_API_KEY
# - SQL_CONNECTION_STRING
# - EVENTHUB_CONN_STR
```

## Quick Setup
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
- Verify Event Hub data flow
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
## Demo
![Watch the Demo](https://github.com/Beenaa99/Azure_AlphaVantage_Stock_Portfolio_Dashboard/blob/main/demo_videos/portfolio_page_demo.mp4)
![Portfolio Dashboard](https://github.com/Beenaa99/Azure_AlphaVantage_Stock_Portfolio_Dashboard/blob/main/images/portfolio_dashboard.jpeg)
![Stock-Details Page](https://github.com/Beenaa99/Azure_AlphaVantage_Stock_Portfolio_Dashboard/blob/main/images/tesla_stock_1.jpeg)

---

## REPORT 
Please find the report ([here](https://github.com/Beenaa99/Azure_AlphaVantage_Stock_Portfolio_Dashboard/blob/main/ECE%205984%20_%20Project%20Final%20Report.pdf))

---

## GitHub Repository
[[GitHub Link](https://github.com/Beenaa99/Azure_AlphaVantage_Stock_Portfolio_Dashboard)]

