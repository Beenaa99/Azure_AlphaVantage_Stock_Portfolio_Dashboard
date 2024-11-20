// Chart update handlers
class ChartUpdater {
    constructor() {
        this.lastPrice = 875;
        this.realtimeDataPoints = [];
        this.historicalChart = null;
        this.realtimeChart = null;
        this.updateInterval = null;
    }

    initializeCharts() {
        // Initialize historical chart
        this.historicalChart = new ApexCharts(
            document.querySelector("#historicalChart"), 
            historicalOptions
        );
        
        // Initialize realtime chart
        this.realtimeChart = new ApexCharts(
            document.querySelector("#realtimeChart"), 
            realtimeOptions
        );
        
        // Render both charts
        this.historicalChart.render();
        this.realtimeChart.render();
        
        // Set initial data
        this.updateHistoricalData(30);
        this.initializeRealtimeData();
    }

    updateHistoricalData(days) {
        const newData = generateCandlestickData(days);
        this.historicalChart.updateSeries([{
            data: newData
        }]);
    }

    initializeRealtimeData() {
        const { data, lastPrice } = generateInitialRealtimeData(50, this.lastPrice);
        this.realtimeDataPoints = data;
        this.lastPrice = lastPrice;
        
        this.realtimeChart.updateSeries([{
            data: this.realtimeDataPoints
        }]);
    }

    startRealtimeUpdates() {
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
        }

        this.updateInterval = setInterval(() => {
            this.updateRealtimeData();
        }, 1000);
    }

    updateRealtimeData() {
        const { price, change, timestamp } = generateRealtimeData(this.lastPrice);
        this.lastPrice = price;
        
        this.realtimeDataPoints.push({
            x: timestamp,
            y: price
        });
        
        // Keep only last 100 points
        if (this.realtimeDataPoints.length > 100) {
            this.realtimeDataPoints.shift();
        }
        
        this.realtimeChart.updateSeries([{
            data: this.realtimeDataPoints
        }]);

        this.updatePriceDisplay(price, change);
    }

    updatePriceDisplay(price, change) {
        const stockPrice = document.querySelector('.stock-price');
        const stockChange = document.querySelector('.stock-change');
        const lastUpdated = document.getElementById('last-updated');
        
        const formattedPrice = price.toFixed(2);
        const absoluteChange = Math.abs(change).toFixed(2);
        const percentageChange = (change / (price - change) * 100).toFixed(2);
        
        stockPrice.textContent = `$${formattedPrice}`;
        stockChange.textContent = `${change >= 0 ? '+' : '-'}$${absoluteChange} (${change >= 0 ? '+' : '-'}${Math.abs(percentageChange)}%)`;
        stockChange.className = `stock-change ${change >= 0 ? 'positive' : 'negative'}`;
        
        lastUpdated.textContent = `Last updated: ${new Date().toLocaleTimeString()}`;
    }

    handleResize() {
        this.historicalChart.updateOptions({
            chart: {
                width: '100%'
            }
        });
        this.realtimeChart.updateOptions({
            chart: {
                width: '100%'
            }
        });
    }
}