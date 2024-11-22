CREATE TABLE Portfolio_Investment (
    stock_symbol NVARCHAR(10) NOT NULL PRIMARY KEY,          -- Ticker symbol of the stock (e.g., AAPL, TSLA)
    company_name NVARCHAR(100) NOT NULL,         -- Full name of the company
    quantity_held DECIMAL(18, 2) NOT NULL,       -- Number of shares held
    purchase_price DECIMAL(18, 2) NOT NULL,      -- Average purchase price
    total_investment AS (quantity_held * purchase_price) PERSISTED, -- Total investment
    last_update DATETIME DEFAULT GETDATE()        -- Timestamp of portfolio entry creation
);
