// Data generation functions
function generateCandlestickData(days) {
    const data = [];
    let basePrice = 875;
    const endDate = new Date();
    
    for (let i = days; i > 0; i--) {
        const date = new Date(endDate);
        date.setDate(date.getDate() - i);
        
        const volatility = Math.random() * 20 - 10;
        const open = basePrice + volatility;
        const high = open + Math.random() * 10;
        const low = open - Math.random() * 10;
        const close = (high + low) / 2;
        
        data.push({
            x: date,
            y: [open, high, low, close]
        });
        
        basePrice = close;
    }
    
    return data;
}

function generateRealtimeData(lastPrice) {
    const volatility = 0.002; // 0.2% volatility
    const change = lastPrice * volatility * (Math.random() - 0.5) * 2;
    const newPrice = Math.max(0, lastPrice + change);
    
    return {
        price: newPrice,
        change: change,
        timestamp: new Date().getTime()
    };
}

function generateInitialRealtimeData(count, startPrice) {
    const data = [];
    let currentPrice = startPrice;
    const initialTime = new Date();
    
    for (let i = 0; i < count; i++) {
        const { price, change } = generateRealtimeData(currentPrice);
        currentPrice = price;
        
        data.push({
            x: initialTime.getTime() - (count - i) * 1000,
            y: currentPrice
        });
    }
    
    return {
        data: data,
        lastPrice: currentPrice
    };
}