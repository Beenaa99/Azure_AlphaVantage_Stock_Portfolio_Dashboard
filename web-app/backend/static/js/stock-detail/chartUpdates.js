class ChartUpdater {
    constructor() {
        this.realtimeDataPoints = [];
        this.historicalDataPoints = [];
        this.realtimeChart = null;
        this.historicalChart = null;
    }

    handleResize() {
        console.log("Handling resize...");
        if (this.historicalChart) this.historicalChart.resize();
        if (this.realtimeChart) this.realtimeChart.resize();
    }

    initializeCharts() {
        // Initialize historical and real-time charts
        this.historicalChart = new ApexCharts(
            document.querySelector("#historicalChart"),
            historicalOptions
        );
        this.realtimeChart = new ApexCharts(
            document.querySelector("#realtimeChart"),
            realtimeOptions
        );

        // Render both charts
        this.historicalChart.render();
        this.realtimeChart.render();
    }

    handleIncomingData(data) {
        const timestamp = new Date(data.timestamp).getTime();
        const { open, high, low, close, volume } = data;
        //console.log("Handling incoming data, timestamp, open")
        // Debugging parsed values
        console.log("Parsed Data:", { timestamp, open, high, low, close, volume });




        // Update historical data
        this.historicalDataPoints.push({
            x: timestamp,
            y: [open, high, low, close]
        });

        this.historicalChart.updateSeries([{
            data: this.historicalDataPoints
        }]);

        // Update real-time volume chart
        this.realtimeDataPoints.push({
            x: timestamp,
            y: volume
        });

        // Keep only the latest 100 points for performance
        if (this.realtimeDataPoints.length > 100) {
            this.realtimeDataPoints.shift();
        }

        this.realtimeChart.updateSeries([{
            data: this.realtimeDataPoints
        }]);

        // Update display
        this.updatePriceDisplay(data);
    }
    

    updatePriceDisplay(data) {
        const stockPrice = document.querySelector('.stock-price');
        const stockChange = document.querySelector('.stock-change');
        const lastUpdated = document.getElementById('last-updated');

        const formattedPrice = data.close.toFixed(2);
        const percentageChange = ((data.close - data.open) / data.open * 100).toFixed(2);

        stockPrice.textContent = `$${formattedPrice}`;
        stockChange.textContent = `${percentageChange >= 0 ? '+' : ''}${percentageChange}%`;
        stockChange.className = `stock-change ${percentageChange >= 0 ? 'positive' : 'negative'}`;
        lastUpdated.textContent = `Last updated: ${new Date(data.timestamp).toLocaleTimeString()}`;
    }
}
