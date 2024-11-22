-- To execute mention stock, quantity and price 
-- (it will automatically update total shares held, average purchase price and total investmnet)
EXEC BuyStocks @stock_symbol = 'AAPL', @quantity = 5, @price = 150.00;
