from fer import FER
import cv2
import time
from flask import Flask, request, jsonify
import snscrape.modules.twitter as sntwitter


app = Flask(__name__)
emotion_detector = FER(mtcnn=True)

def predict_image(img):

    # Convert Gradio image format (BGR) to RGB
    img = cv2.imread(img)
    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    analysis = emotion_detector.detect_emotions(img)
    start_time = time.time() 

    res = []
    for data in analysis:
      emotions = data['emotions']
      max_emotion = max(emotions, key=emotions.get)
      max_value = emotions[max_emotion]
      res.append({max_emotion: max_value})
  
    response = {
        'analysis': analysis,
        'best_predict': list(res),
    }
    return response

def fetch_user_tweets(user):
  maxTweets = 500

  # Creating list to append tweet data to
  tweets_list = []

  # Using TwitterSearchScraper to scrape data and append tweets to list
  for i,tweet in enumerate(sntwitter.TwitterProfileScraper(f'{user}').get_items()):
      if i>maxTweets:
          break
      media = []
      if tweet.media:
        for med in tweet.media:
          media.append({"media_url": med})
      curr_dict = {"media": media, "user": tweet.user.username, "id": tweet.id, "text": tweet.content, "date": tweet.date.strftime("%Y-%m-%d %H:%M:%S"), "tweet": tweet}
      tweets_list.append(curr_dict)
  return tweets_list


def fetch_tweets_from_id(tweet_id):
  maxTweets = 500

  # Creating list to append tweet data to
  tweets_list = []

  # Using TwitterSearchScraper to scrape data and append tweets to list
  for i,tweet in enumerate(sntwitter.TwitterTweetScraper(tweet_id).get_items()):
      if i>maxTweets:
          break
      media = []
      if tweet.media:
        for med in tweet.media:
          media.append({"media_url": med})
      curr_dict = {"media": media, "user": tweet.user.username, "id": tweet.id, "text": tweet.content, "date": tweet.date.strftime("%Y-%m-%d %H:%M:%S"), "tweet": tweet}
      tweets_list.append(curr_dict)
  return tweets_list


@app.route('/', methods=['GET'])
def index():
    res = {"app": "Text sentiment analysis for social media"}
    return jsonify(res)

@app.route('/fetch_user_tweets', methods=['GET'])
def fetch_user_tweets_route():
    user = request.args.get('user')
    users = fetch_user_tweets(user)
    return jsonify(fetch_user_tweets(user))

@app.route('/fetch_tweets_from_id', methods=['GET'])
def fetch_tweets_from_id_route():
    return jsonify(fetch_tweets_from_id(request.args.get('tweet_id')))

@app.route('/predict', methods=['POST'])
def predict():
    file = request.files['image']
    img_path = 'temp.jpg'  # Temporarily save the image to a file
    file.save(img_path)
    
    result = predict_image(img_path)
    
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True, timeout=600)
