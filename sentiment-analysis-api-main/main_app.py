from flask import Flask, request, jsonify
import time
import ktrain

app = Flask(__name__)

predictor = ktrain.load_predictor('saved_model')

# worked
# print(predictor.predict('I love this product!'))
# print(predictor.predict('I hate this product!'))
# print(predictor.predict('I am so sad!'))
# print(predictor.predict('I am so happy!'))

# print(predictor.predict("I am looking for a job."))
# print(predictor.predict("I like to play football."))
# print(predictor.predict("I am going to the beach."))
# print(predictor.predict("I am going to the hospital."))
# print(predictor.predict("His son is very sick."))

@app.route('/')
def index():
    response = {
        'message': 'Social Media Emotion Analysis!'
    }
    
    return jsonify(response)

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
