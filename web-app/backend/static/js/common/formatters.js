// Advanced formatting utilities
const formatters = {
    // Stock-specific formatters
    stock: {
        price: (price) => {
            return new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }).format(price);
        },

        change: (value, includePercentage = true, includeCurrency = true) => {
            const formattedCurrency = includeCurrency ? 
                new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                }).format(Math.abs(value)) : '';

            const formattedPercentage = includePercentage ?
                ` (${(Math.abs(value) * 100).toFixed(2)}%)` : '';

            const prefix = value >= 0 ? '+' : '-';
            return `${prefix}${formattedCurrency}${formattedPercentage}`;
        },

        volume: (volume) => {
            const num = parseFloat(volume);
            if (num >= 1e9) return (num / 1e9).toFixed(2) + 'B';
            if (num >= 1e6) return (num / 1e6).toFixed(2) + 'M';
            if (num >= 1e3) return (num / 1e3).toFixed(2) + 'K';
            return num.toString();
        },

        marketCap: (cap) => {
            const num = parseFloat(cap);
            if (num >= 1e12) return (num / 1e12).toFixed(2) + 'T';
            if (num >= 1e9) return (num / 1e9).toFixed(2) + 'B';
            if (num >= 1e6) return (num / 1e6).toFixed(2) + 'M';
            return num.toString();
        }
    },

    // Time formatters
    time: {
        toLocaleDateString: (timestamp) => {
            return new Date(timestamp).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
        },

        toLocaleTimeString: (timestamp) => {
            return new Date(timestamp).toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });
        },

        getRelativeTimeString: (timestamp) => {
            const now = new Date().getTime();
            const diff = now - timestamp;

            if (diff < 1000) return 'just now';
            if (diff < 60000) return `${Math.floor(diff / 1000)}s ago`;
            if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
            if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
            return formatters.time.toLocaleDateString(timestamp);
        }
    },

    // Number formatters
    numbers: {
        toCompact: (number) => {
            return new Intl.NumberFormat('en-US', {
                notation: 'compact',
                compactDisplay: 'short'
            }).format(number);
        },

        toPercentage: (number, decimals = 2) => {
            return number.toLocaleString('en-US', {
                style: 'percent',
                minimumFractionDigits: decimals,
                maximumFractionDigits: decimals
            });
        },

        roundToDecimals: (number, decimals = 2) => {
            return Number(Math.round(number + 'e' + decimals) + 'e-' + decimals);
        }
    },

    // Style formatters
    style: {
        getChangeColor: (value) => {
            return value >= 0 ? 'positive' : 'negative';
        },

        getChangeBadgeClass: (value) => {
            return `change-badge ${value >= 0 ? 'positive' : 'negative'}`;
        }
    }
};