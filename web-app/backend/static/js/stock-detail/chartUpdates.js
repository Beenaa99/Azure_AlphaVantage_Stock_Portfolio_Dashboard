class ChartUpdater {
    constructor() {
        // Data points for all charts
        this.realtimeDataPoints = [];
        this.historicalDataPoints = [];
        this.smaDataPoints = [];
        this.cmaDataPoints = [];
        this.vmaDataPoints = [];
        
        // Chart instances
        this.realtimeChart = null;
        this.historicalChart = null;
        this.movingAveragesChart = null;
        this.volumeAnalysisChart = null;
        
        // Get initial data from the template
        const initialData = JSON.parse(document.getElementById('initial-data').textContent || '[]');
        const currentData = JSON.parse(document.getElementById('current-data').textContent || '{}');
        
        if (initialData.length > 0) {
            this.initializeWithHistoricalData(initialData);
        }
        if (Object.keys(currentData).length > 0) {
            this.updatePriceDisplay(currentData);
        }
    }

    initializeWithHistoricalData(data) {
        // Process historical data for candlestick chart
        this.historicalDataPoints = data.map(item => ({
            x: new Date(item.timestamp).getTime(),
            y: [item.open, item.high, item.low, item.close]
        }));

        // Process indicator data
        this.smaDataPoints = data.map(item => ({
            x: new Date(item.timestamp).getTime(),
            y: item.sma
        }));

        this.cmaDataPoints = data.map(item => ({
            x: new Date(item.timestamp).getTime(),
            y: item.cma
        }));

        // Process volume data
        this.realtimeDataPoints = data.map(item => ({
            x: new Date(item.timestamp).getTime(),
            y: item.volume
        }));

        this.vmaDataPoints = data.map(item => ({
            x: new Date(item.timestamp).getTime(),
            y: item.vma
        }));

        // Keep only last 100 points for realtime charts
        if (this.realtimeDataPoints.length > 100) {
            this.realtimeDataPoints = this.realtimeDataPoints.slice(-100);
            this.vmaDataPoints = this.vmaDataPoints.slice(-100);
        }
    }

    handleResize() {
        // Resize all charts
        if (this.historicalChart) this.historicalChart.resize();
        if (this.realtimeChart) this.realtimeChart.resize();
        if (this.movingAveragesChart) this.movingAveragesChart.resize();
        if (this.volumeAnalysisChart) this.volumeAnalysisChart.resize();
    }

    initializeCharts() {
        // Update historical chart options with current data
        const updatedHistoricalOptions = {
            ...historicalOptions,
            series: [{
                name: 'Price',
                type: 'candlestick',
                data: this.historicalDataPoints
            }, {
                name: 'SMA',
                type: 'line',
                data: this.smaDataPoints
            }, {
                name: 'CMA',
                type: 'line',
                data: this.cmaDataPoints
            }]
        };

        // Update realtime chart options with current data
        const updatedRealtimeOptions = {
            ...realtimeOptions,
            series: [{
                name: 'Volume',
                type: 'area',
                data: this.realtimeDataPoints
            }, {
                name: 'VMA',
                type: 'line',
                data: this.vmaDataPoints
            }]
        };

        // Update moving averages chart options
        const updatedMovingAveragesOptions = {
            ...movingAveragesOptions,
            series: [{
                name: 'SMA',
                type: 'line',
                data: this.smaDataPoints
            }, {
                name: 'CMA',
                type: 'line',
                data: this.cmaDataPoints
            }]
        };

        // Update volume analysis chart options
        const updatedVolumeAnalysisOptions = {
            ...volumeAnalysisOptions,
            series: [{
                name: 'Volume',
                type: 'bar',
                data: this.realtimeDataPoints
            }, {
                name: 'VMA',
                type: 'line',
                data: this.vmaDataPoints
            }]
        };

        // Initialize all charts with updated options
        this.historicalChart = new ApexCharts(
            document.querySelector("#historicalChart"),
            updatedHistoricalOptions
        );
        
        this.realtimeChart = new ApexCharts(
            document.querySelector("#realtimeChart"),
            updatedRealtimeOptions
        );
        
        this.movingAveragesChart = new ApexCharts(
            document.querySelector("#movingAveragesChart"),
            updatedMovingAveragesOptions
        );
        
        this.volumeAnalysisChart = new ApexCharts(
            document.querySelector("#volumeAnalysisChart"),
            updatedVolumeAnalysisOptions
        );

        // Render all charts
        this.historicalChart.render();
        this.realtimeChart.render();
        this.movingAveragesChart.render();
        this.volumeAnalysisChart.render();
    }

    handleIncomingData(data) {
        const timestamp = new Date(data.timestamp).getTime();
        const { open, high, low, close, volume, sma, cma, vma } = data;

        // Update historical candlestick data
        this.historicalDataPoints.push({
            x: timestamp,
            y: [open, high, low, close]
        });

        // Update indicator data
        this.smaDataPoints.push({
            x: timestamp,
            y: sma
        });

        this.cmaDataPoints.push({
            x: timestamp,
            y: cma
        });

        // Update historical chart with all series
        this.historicalChart.updateSeries([{
            name: 'Price',
            type: 'candlestick',
            data: this.historicalDataPoints
        }, {
            name: 'SMA',
            type: 'line',
            data: this.smaDataPoints
        }, {
            name: 'CMA',
            type: 'line',
            data: this.cmaDataPoints
        }]);

        // Update moving averages chart
        this.movingAveragesChart.updateSeries([{
            name: 'SMA',
            type: 'line',
            data: this.smaDataPoints
        }, {
            name: 'CMA',
            type: 'line',
            data: this.cmaDataPoints
        }]);

        // Update volume data
        this.realtimeDataPoints.push({
            x: timestamp,
            y: volume
        });

        this.vmaDataPoints.push({
            x: timestamp,
            y: vma
        });

        // Keep only the latest 100 points for performance
        if (this.realtimeDataPoints.length > 100) {
            this.realtimeDataPoints.shift();
            this.vmaDataPoints.shift();
        }

        // Update realtime volume chart
        this.realtimeChart.updateSeries([{
            name: 'Volume',
            type: 'area',
            data: this.realtimeDataPoints
        }, {
            name: 'VMA',
            type: 'line',
            data: this.vmaDataPoints
        }]);

        // Update volume analysis chart
        this.volumeAnalysisChart.updateSeries([{
            name: 'Volume',
            type: 'bar',
            data: this.realtimeDataPoints
        }, {
            name: 'VMA',
            type: 'line',
            data: this.vmaDataPoints
        }]);

        // Update metrics display
        this.updatePriceDisplay(data);
        this.updateMetrics(data);
    }

    updatePriceDisplay(data) {
        const stockPrice = document.querySelector('.stock-price');
        const stockChange = document.querySelector('.stock-change');
        const lastUpdated = document.getElementById('last-updated');

        const formattedPrice = data.close.toFixed(2);
        const priceChange = data.close - data.open;
        const percentageChange = (priceChange / data.open * 100).toFixed(2);

        stockPrice.textContent = `$${formattedPrice}`;
        stockChange.textContent = `${priceChange >= 0 ? '+' : ''}$${Math.abs(priceChange).toFixed(2)} (${percentageChange >= 0 ? '+' : ''}${percentageChange}%)`;
        stockChange.className = `stock-change ${percentageChange >= 0 ? 'positive' : 'negative'}`;
        lastUpdated.textContent = `Last updated: ${new Date(data.timestamp).toLocaleTimeString()}`;
    }

    updateMetrics(data) {
        // Update moving averages
        document.getElementById('sma-value').textContent = `$${data.sma.toFixed(2)}`;
        document.getElementById('cma-value').textContent = `$${data.cma.toFixed(2)}`;
        document.getElementById('vma-value').textContent = data.vma.toLocaleString();
    }

    filterDataByTimeRange(days) {
        const cutoffTime = new Date().getTime() - (days * 24 * 60 * 60 * 1000);
        
        // Filter data for historical chart
        const filteredPriceData = this.historicalDataPoints.filter(point => point.x >= cutoffTime);
        const filteredSMAData = this.smaDataPoints.filter(point => point.x >= cutoffTime);
        const filteredCMAData = this.cmaDataPoints.filter(point => point.x >= cutoffTime);
        
        // Filter data for volume charts
        const filteredVolumeData = this.realtimeDataPoints.filter(point => point.x >= cutoffTime);
        const filteredVMAData = this.vmaDataPoints.filter(point => point.x >= cutoffTime);

        // Update historical chart
        this.historicalChart.updateSeries([{
            name: 'Price',
            type: 'candlestick',
            data: filteredPriceData
        }, {
            name: 'SMA',
            type: 'line',
            data: filteredSMAData
        }, {
            name: 'CMA',
            type: 'line',
            data: filteredCMAData
        }]);

        // Update moving averages chart
        this.movingAveragesChart.updateSeries([{
            name: 'SMA',
            data: filteredSMAData
        }, {
            name: 'CMA',
            data: filteredCMAData
        }]);

        // Update volume analysis chart
        this.volumeAnalysisChart.updateSeries([{
            name: 'Volume',
            data: filteredVolumeData
        }, {
            name: 'VMA',
            data: filteredVMAData
        }]);
    }
}