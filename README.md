# Real-time Portfolio Dashboard (AlphaVantage)


## Project’s Function
The Real-time Portfolio Dashboard integrates historical data processing with real-time streaming to monitor stock performance and provide technical analysis. It calculates indicators such as SMA, CMA, and VMA dynamically and delivers actionable insights via an interactive web interface. This project addresses the challenge of managing and visualizing large-scale, real-time financial data.

---

## Dataset
- **Primary Source:** [AlphaVantage API](https://www.alphavantage.co/documentation/)  
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
   - Real-time Data: In-memory caching for low-latency updates.  

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
   - Calculated SMA, CMA, VMA dynamically.  

2. **Batch Pipeline:**  
   - CSV Files → Azure Blob Storage → Data Factory → SQL Database.  
   - Cleaned and standardized historical data for trend analysis.  

**Execution Notes:**  
- Requires an AlphaVantage API key.  
- Clone the GitHub repository and follow the `README` instructions.  

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

## GitHub Repository
[GitHub Link Placeholder]

