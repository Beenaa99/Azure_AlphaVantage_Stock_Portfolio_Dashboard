document.addEventListener('DOMContentLoaded', () => {
    // Initialize chart updater
    const chartUpdater = new ChartUpdater();
    chartUpdater.initializeCharts();


// In your JS file
const socket = io("http://127.0.0.1:5000"); // Ensure this matches your Flask server's address and port

// Handle connection and errors
socket.on("connect", () => {
    console.log("Connected to WebSocket server");
});

socket.on("disconnect", () => {
    console.log("Disconnected from WebSocket server");
});

socket.on("stock_update", (data) => {
    console.log("Received stock update:", data);
    chartUpdater.handleIncomingData(data);
});
    // Handle time filter clicks
    document.querySelectorAll('.time-filter').forEach(button => {
        button.addEventListener('click', () => {
            document.querySelectorAll('.time-filter').forEach(btn => {
                btn.classList.remove('active');
            });
            button.classList.add('active');

            const period = button.textContent;
            let days;
            switch (period) {
                case '1D': days = 1; break;
                case '1W': days = 7; break;
                case '1M': days = 30; break;
                case '3M': days = 90; break;
                case '1Y': days = 365; break;
            }

            chartUpdater.updateHistoricalData(days);
        });
    });

    // Handle window resize
    window.addEventListener('resize', () => {
        if (chartUpdater && typeof chartUpdater.handleResize === 'function') {
            chartUpdater.handleResize();
        } else {
            console.error("chartUpdater.handleResize is not defined!");
        }
    });
});
