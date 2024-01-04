# Social Media Sentiment analysis


@app.route('/predict-str', methods=['POST'])
def predict_message():
    data = request.json
    message = data.get('message', '')
    start_time = time.time() 
    prediction = predictor.predict(message)
    
    response = {
        'message': message,
        'prediction': prediction,
        'elapsed_time': time.time() - start_time
    }
    
    return jsonify(response)

@app.route('/predict-list', methods=['POST'])
def predict_list():
    data = request.json
    messages = data.get('messages', [])
    start_time = time.time() 
    predictions = predictor.predict(messages)
    
    response = {
        'messages': messages,
        'predictions': predictions,
        'elapsed_time': time.time() - start_time
    }
    
    return jsonify(response)



if __name__ == '__main__':
    app.run()

## API Endpoints
- predict-str: Predicts the sentiment of a single message
    - parameters: message
    - json response: {message, prediction, elapsed_time}
- predict-list: Predicts the sentiment of a list of messages
    - parameters: messages (list)
    - json response: {messages, predictions, elapsed_time}
