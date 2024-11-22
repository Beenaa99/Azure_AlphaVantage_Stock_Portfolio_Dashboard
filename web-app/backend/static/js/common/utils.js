// Utility functions used across the application
const utils = {
    formatCurrency: (value) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(value);
    },

    formatPercentage: (value) => {
        return new Intl.NumberFormat('en-US', {
            style: 'percent',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(value / 100);
    },

    formatLargeNumber: (value) => {
        if (value >= 1e12) {
            return `${(value / 1e12).toFixed(2)}T`;
        } else if (value >= 1e9) {
            return `${(value / 1e9).toFixed(2)}B`;
        } else if (value >= 1e6) {
            return `${(value / 1e6).toFixed(2)}M`;
        }
        return value.toFixed(2);
    },

    formatChangeValue: (value, includeSign = true) => {
        const formatted = Math.abs(value).toFixed(2);
        if (includeSign) {
            return value >= 0 ? `+${formatted}` : `-${formatted}`;
        }
        return formatted;
    },

    getChangeClass: (value) => {
        return value >= 0 ? 'positive' : 'negative';
    },

    updateLastUpdated: () => {
        const element = document.getElementById('last-updated');
        if (element) {
            element.textContent = `Last updated: ${new Date().toLocaleTimeString()}`;
        }
    }
};