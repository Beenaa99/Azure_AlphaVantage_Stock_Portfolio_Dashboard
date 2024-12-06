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
.  

1. Clone Repository

```bash

git clone https://github.com/Beenaa99/Azure_AlphaVantage_Stock_Portfolio_Dashboard

cd Azure_AlphaVantage_Stock_Portfolio_Dashboard

```

2. Install Dependencies

```bash

pip install -r requirements.txt

```

3. Configure Azure Services

   a. Event Hub Setup

   ```bash

   # Configure connection in config.py

   EVENT_HUB_CONNECTION_STRING="your_connection_string"

   EVENT_HUB_NAME="your_hub_name"

   ```

   b. SQL Database

   ```bash

   # Run schema setup scripts from /sql folder

   # Update connection string in config.py

   SQL_CONNECTION_STRING="your_connection_string"

   ```

4. Start Services

   a. Data Producer

   ```bash

   python producer.py

   ```

   b. Flask Application

   ```bash

   python app.py

   ```

   - Open http://localhost:5000 in your browser

---

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
[Watch the Demo](https://github.com/Beenaa99/Azure_AlphaVantage_Stock_Portfolio_Dashboard/blob/main/demo_videos/portfolio_page_demo.gif)

---

## GitHub Repository
[[GitHub Link](https://github.com/Beenaa99/Azure_AlphaVantage_Stock_Portfolio_Dashboard)]

