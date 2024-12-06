from azure.eventhub import EventHubConsumerClient
import requests
import json

# Azure Event Hub Configuration
CONNECTION_STR = "CONNECTTION_STR"
EVENT_HUB_NAME = "intraday-stock-2"
CONSUMER_GROUP = "$Default"  # Default consumer group
url = "http://127.0.0.1:5000/send_data"

def on_event(partition_context, event):
    """
    Callback function to process received events.
    """
    # Print the received event data
    print(f"Received event: {event.body_as_str()} from Partition: {partition_context.partition_id}")
    data = json.loads(event.body_as_str())
    response = requests.post(url, json=data)

    # Optionally update the checkpoint to mark this event as processed
    #partition_context.update_checkpoint(event)

# Initialize the Event Hub Consumer Client
consumer = EventHubConsumerClient.from_connection_string(
    conn_str=CONNECTION_STR,
    consumer_group=CONSUMER_GROUP,
    eventhub_name=EVENT_HUB_NAME
)

# Start the Consumer
print("Listening for events...")
with consumer:
    consumer.receive(
        on_event=on_event,  # Callback function
        starting_position="-1"  # Read from the beginning of the Event Hub
    )


