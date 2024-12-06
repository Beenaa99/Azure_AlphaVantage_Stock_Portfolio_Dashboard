WITH StockIndicators AS (
   SELECT
       System.Timestamp AS timestamp,
       [open] AS open_price,
       high AS high_price,
       low AS low_price,
       [close] AS close_price,
       volume AS volume,
       CASE PartitionId
           WHEN 0 THEN 'TSLA'
           WHEN 1 THEN 'NVDA'
           WHEN 2 THEN 'AAPL'
           WHEN 3 THEN 'AMD'
           ELSE 'UNKNOWN'
       END AS stock_symbol,
       CASE
           WHEN COUNT([close]) OVER (PARTITION BY PartitionId LIMIT DURATION(second, 30)) < 2 THEN 0
           ELSE ROUND(AVG([close]) OVER (PARTITION BY PartitionId LIMIT DURATION(second, 30)), 2)
       END AS SMA,
       CASE
           WHEN COUNT([close]) OVER (PARTITION BY PartitionId LIMIT DURATION(second, 30)) < 2 THEN 0
           ELSE ROUND(SUM([close]) OVER (PARTITION BY PartitionId LIMIT DURATION(second, 30)) /
                COUNT([close]) OVER (PARTITION BY PartitionId LIMIT DURATION(second, 30)), 2)
       END AS CMA,
       CASE
           WHEN COUNT(volume) OVER (PARTITION BY PartitionId LIMIT DURATION(second, 30)) < 2 THEN 0
           ELSE ROUND(AVG(volume) OVER (PARTITION BY PartitionId LIMIT DURATION(second, 30)), 2)
       END AS VMA
   FROM [intraday-stock-1]
)

-- Real-time output to Event Hub
SELECT *
INTO [intraday-stock-2]
FROM StockIndicators;

-- Store raw data in Blob Storage
SELECT timestamp, open_price, high_price, low_price, close_price, volume, stock_symbol, SMA, CMA, VMA
INTO [archival]
FROM StockIndicators
GROUP BY 
   timestamp, open_price, high_price, low_price, close_price, volume, stock_symbol, SMA, CMA, VMA,
   TumblingWindow(minute, 10);