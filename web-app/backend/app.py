from flask import Flask, render_template, request, jsonify
from flask_socketio import SocketIO

app = Flask(__name__)
#app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/stock')
def stock_details():
    return render_template('stock.html')  # Render the HTML file

@app.route('/send_data', methods=['POST'])
def receive_data():
    data = request.get_json()  # Receive data from the consumer
    print("Received Data:", data)
    socketio.emit('stock_update', data)  # Emit data to WebSocket clients
    return jsonify({"status": "success"}), 200

@socketio.on('connect')
def on_connect():
    print("Client connected!")

@socketio.on('disconnect')
def on_disconnect():
    print("Client disconnected!")

if __name__ == '__main__':
    socketio.run(app, debug=True)

