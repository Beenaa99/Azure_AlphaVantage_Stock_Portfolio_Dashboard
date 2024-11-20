// Mock portfolio data and data management
class PortfolioData {
    constructor() {
        this.stocks = [
            {
                symbol: 'NVDA',
                companyName: 'NVIDIA Corporation',
                shares: 50,
                avgPrice: 750.20,
                currentPrice: 875.23,
                dayChange: 2.5,
                volume: '52.3M',
                marketCap: '2.16T'
            },
            {
                symbol: 'TSLA',
                companyName: 'Tesla, Inc.',
                shares: 200,
                avgPrice: 180.50,
                currentPrice: 175.34,
                dayChange: -1.2,
                volume: '98.6M',
                marketCap: '556.8B'
            },
            {
                symbol: 'AMD',
                companyName: 'Advanced Micro Devices',
                shares: 100,
                avgPrice: 160.30,
                currentPrice: 178.62,
                dayChange: 1.8,
                volume: '45.7M',
                marketCap: '288.5B'
            },
            {
                symbol: 'SNOW',
                companyName: 'Snowflake Inc.',
                shares: 75,
                avgPrice: 190.40,
                currentPrice: 188.45,
                dayChange: -0.5,
                volume: '3.2M',
                marketCap: '62.1B'
            },
            {
                symbol: 'UBER',
                companyName: 'Uber Technologies',
                shares: 150,
                avgPrice: 65.20,
                currentPrice: 75.89,
                dayChange: 3.2,
                volume: '15.8M',
                marketCap: '156.3B'
            },
            {
                symbol: 'AAPL',
                companyName: 'Apple Inc.',
                shares: 100,
                avgPrice: 170.30,
                currentPrice: 172.45,
                dayChange: 0.8,
                volume: '65.4M',
                marketCap: '2.68T'
            }
        ];

        this.historicalData = this.generateHistoricalData();
    }

    getPortfolioSummary() {
        let totalValue = 0;
        let totalCost = 0;
        let todayChange = 0;

        this.stocks.forEach(stock => {
            const currentValue = stock.currentPrice * stock.shares;
            const originalValue = stock.avgPrice * stock.shares;
            totalValue += currentValue;
            totalCost += originalValue;
            todayChange += (currentValue * stock.dayChange / 100);
        });

        return {
            totalValue,
            totalCost,
            totalReturn: totalValue - totalCost,
            totalReturnPercentage: ((totalValue - totalCost) / totalCost) * 100,
            todayChange,
            todayChangePercentage: (todayChange / (totalValue - todayChange)) * 100
        };
    }

    getStockMetrics(symbol) {
        return this.stocks.find(stock => stock.symbol === symbol);
    }

    generateHistoricalData() {
        const data = [];
        let value = 125000; // Starting portfolio value
        const days = 180; // 6 months of data

        for (let i = days; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            
            // Add some randomness to the value
            const change = value * (Math.random() * 0.02 - 0.01); // ±1% daily change
            value += change;

            data.push({
                x: date.getTime(),
                y: value
            });
        }

        return data;
    }

    simulateRealtimeUpdate() {
        this.stocks = this.stocks.map(stock => {
            const changePercent = (Math.random() - 0.5) * 0.2; // ±0.1% change
            const priceChange = stock.currentPrice * changePercent;
            
            return {
                ...stock,
                currentPrice: stock.currentPrice + priceChange,
                dayChange: stock.dayChange + changePercent
            };
        });

        // Update historical data
        const lastValue = this.historicalData[this.historicalData.length - 1].y;
        const change = lastValue * (Math.random() * 0.004 - 0.002); // ±0.2% change
        
        this.historicalData.push({
            x: new Date().getTime(),
            y: lastValue + change
        });

        if (this.historicalData.length > 180) {
            this.historicalData.shift();
        }

        return {
            stocks: this.stocks,
            historicalData: this.historicalData
        };
    }
}