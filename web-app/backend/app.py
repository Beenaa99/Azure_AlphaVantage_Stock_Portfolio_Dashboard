from flask import Flask, render_template, request, jsonify, redirect, url_for
from flask_socketio import SocketIO, emit, join_room, leave_room
from collections import deque
from datetime import datetime, timedelta
import json

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")

# Store current and historical stock data
# Using deque with maxlen to prevent unlimited memory growth
HISTORY_LENGTH = 100  # Store last 1000 data points for each stock

stock_data = {
    'AAPL': {'current': {}, 'history': deque(maxlen=HISTORY_LENGTH)},
    'NVDA': {'current': {}, 'history': deque(maxlen=HISTORY_LENGTH)},
    'AMD': {'current': {}, 'history': deque(maxlen=HISTORY_LENGTH)},
    'TSLA': {'current': {}, 'history': deque(maxlen=HISTORY_LENGTH)}
}

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/stock/<symbol>')
def stock_details(symbol):
    symbol = symbol.upper()
    if symbol not in stock_data:
        return redirect(url_for('home'))
    
    # Get historical data for initial load
    history = list(stock_data[symbol]['history'])
    current = stock_data[symbol]['current']
    
    return render_template('stock.html', 
                         symbol=symbol, 
                         initial_data=json.dumps(history),
                         current_data=json.dumps(current))

@app.route('/send_data', methods=['POST'])
def receive_data():
    data = request.get_json()
    
    # Transform incoming data
    processed_data = {
        'timestamp': data['timestamp'],
        'open': float(data['open_price']),
        'high': float(data['high_price']),
        'low': float(data['low_price']),
        'close': float(data['close_price']),
        'volume': int(data['volume']),
        'sma': float(data['SMA']),
        'cma': float(data['CMA']),
        'vma': float(data['VMA'])
    }
    
    stock_symbol = data['stock_symbol'].upper()
    
    # Update current data
    stock_data[stock_symbol]['current'] = processed_data
    # Add to historical data
    stock_data[stock_symbol]['history'].append(processed_data)
    
    # Emit to the specific stock's room
    socketio.emit('stock_update', processed_data, room=stock_symbol)
    
    return jsonify({"status": "success"}), 200

@app.route('/get_historical_data/<symbol>')
def get_historical_data(symbol):
    symbol = symbol.upper()
    if symbol not in stock_data:
        return jsonify([])
    
    return jsonify(list(stock_data[symbol]['history']))

@socketio.on('connect')
def on_connect():
    print("Client connected!")

@socketio.on('join')
def on_join(data):
    symbol = data['symbol'].upper()
    join_room(symbol)
    print(f"Client joined room: {symbol}")
    
    # Send the latest data for this stock if available
    if stock_data[symbol]['current']:
        emit('stock_update', stock_data[symbol]['current'])

@socketio.on('leave')
def on_leave(data):
    symbol = data['symbol'].upper()
    leave_room(symbol)
    print(f"Client left room: {symbol}")

@socketio.on('disconnect')
def on_disconnect():
    print("Client disconnected!")

if __name__ == '__main__':
    socketio.run(app, debug=True)