class PortfolioData {
    constructor() {
        // portfolioData.js constructor
this.socket = io();
console.log('Socket instance created');

        // Add to portfolioData.js constructor
this.socket.on('connect', () => {
    console.log('WebSocket connected');
});
this.socket.on('connect_error', (error) => {
    console.error('WebSocket connection error:', error);
});


        // Static portfolio positions
        this.stocks = [
            {
                symbol: 'NVDA',
                companyName: 'NVIDIA Corporation',
                shares: 80,
                avgPrice: 48.16
            },
            {
                symbol: 'TSLA',
                companyName: 'Tesla, Inc.',
                shares: 200,
                avgPrice: 248.42
            },
            {
                symbol: 'AMD',
                companyName: 'Advanced Micro Devices',
                shares: 100,
                avgPrice: 138.58
            },
            {
                symbol: 'AAPL',
                companyName: 'Apple Inc.',
                shares: 100,
                avgPrice: 184.73
            }
        ];

        // Dynamic data from WebSocket
        this.currentPrices = {};
        this.dayChanges = {};
        this.volumes = {};
        this.historicalData = [];
        
        // Initialize WebSocket connection
        this.socket = io();
        this.setupWebSocket();
        
        // Fetch initial historical data
        this.fetchHistoricalData();
    }

    setupWebSocket() {
        this.stocks.forEach(stock => {
            this.socket.emit('join', { symbol: stock.symbol });
            
            // Initialize with default values
            this.currentPrices[stock.symbol] = stock.avgPrice;
            this.openPrices = {}; // Add this new object to store opening prices
            this.dayChanges[stock.symbol] = 0;
            this.volumes[stock.symbol] = 0;
        });
    
        this.socket.on('stock_update', (data) => {
            console.log('Before update:', this.currentPrices);
            
            // Store the first price of the day as the opening price if not set
            if (!this.openPrices[data.stock]) {
                this.openPrices[data.stock] = data.open;  // Use data.open from the websocket
            }
            
            this.currentPrices[data.stock] = data.close;
            this.volumes[data.stock] = data.volume;
            // Calculate day change using opening price
            this.dayChanges[data.stock] = ((data.close - this.openPrices[data.stock]) / this.openPrices[data.stock]) * 100;
            
            console.log('After update:', this.currentPrices);
            this.updateHistoricalData();
        });
    }
    async fetchHistoricalData() {
        try {
            // Fetch historical data for each stock
            const promises = this.stocks.map(stock => 
                fetch(`/get_historical_data/${stock.symbol}`).then(res => res.json())
            );
            
            const allHistoricalData = await Promise.all(promises);
            
            // Process and combine historical data
            this.processHistoricalData(allHistoricalData);
        } catch (error) {
            console.error('Error fetching historical data:', error);
        }
    }

    processHistoricalData(allData) {
        // Combine historical data from all stocks into portfolio value
        const timestampMap = new Map();
        
        allData.forEach((stockData, index) => {
            const stock = this.stocks[index];
            
            stockData.forEach(dataPoint => {
                const timestamp = new Date(dataPoint.timestamp).getTime();
                const value = dataPoint.close * stock.shares;
                
                if (timestampMap.has(timestamp)) {
                    timestampMap.set(timestamp, timestampMap.get(timestamp) + value);
                } else {
                    timestampMap.set(timestamp, value);
                }
            });
        });

        // Convert to array format for chart
        this.historicalData = Array.from(timestampMap.entries())
            .map(([x, y]) => ({ x, y }))
            .sort((a, b) => a.x - b.x);
    }

    updateHistoricalData() {
        const currentValue = this.getPortfolioSummary().totalValue;
        const timestamp = new Date().getTime();
        
        this.historicalData.push({
            x: timestamp,
            y: currentValue
        });

        // Keep last 180 data points (3 hours at 1-minute intervals)
        if (this.historicalData.length > 180) {
            this.historicalData.shift();
        }
    }

    getPortfolioSummary() {
        let totalValue = 0;
        let totalCost = 0;
        let todayOpenValue = 0;
    
        this.stocks.forEach(stock => {
            const currentPrice = this.currentPrices[stock.symbol];
            const currentValue = currentPrice * stock.shares;
            const originalValue = stock.avgPrice * stock.shares;
            const openPrice = this.openPrices[stock.symbol] || currentPrice; // Use actual opening price or current as fallback
            
            totalValue += currentValue;
            totalCost += originalValue;
            todayOpenValue += openPrice * stock.shares;
        });
    
        const todayChange = totalValue - todayOpenValue;
        const todayChangePercentage = ((totalValue - todayOpenValue) / todayOpenValue) * 100;
    
        return {
            totalValue,
            totalCost,
            totalReturn: totalValue - totalCost,
            totalReturnPercentage: ((totalValue - totalCost) / totalCost) * 100,
            todayChange,
            todayChangePercentage
        };
    }

// Add to portfolioData.js
getStockMetrics(symbol) {
    const stock = this.stocks.find(s => s.symbol === symbol);
    if (!stock) return null;
    
    const currentPrice = this.currentPrices[symbol];
    const marketValue = currentPrice * stock.shares;
    const costBasis = stock.avgPrice * stock.shares;
    const totalReturn = marketValue - costBasis;
    
    return {
        ...stock,
        currentPrice,
        dayChange: this.dayChanges[symbol],
        volume: this.volumes[symbol],
        marketValue,
        totalReturn,
        totalReturnPercentage: (totalReturn / costBasis) * 100
    };
}

    getHistoricalData() {
        return this.historicalData;
    }
}