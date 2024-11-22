CREATE PROCEDURE BuyStocks
    @stock_symbol NVARCHAR(10),
    @quantity INT,
    @price DECIMAL(18, 2)
AS
BEGIN
    -- Check if the stock already exists in the portfolio
    IF EXISTS (SELECT 1 FROM Portfolio_Investment WHERE stock_symbol = @stock_symbol)
    BEGIN
        -- Update the existing stock
        UPDATE Portfolio_Investment
        SET 
            quantity_held = quantity_held + @quantity,
            purchase_price = 
                (purchase_price * quantity_held + @price * @quantity) / (quantity_held + @quantity),
            total_investment = (quantity_held + @quantity) * 
                ((purchase_price * quantity_held + @price * @quantity) / (quantity_held + @quantity))
        WHERE stock_symbol = @stock_symbol;
    END
    ELSE
    BEGIN
        -- Stock not found; return a message
        PRINT 'Stock not found in portfolio for the specified user.';
    END
END;
