from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import re
import nltk
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer

app = Flask(__name__)
CORS(app)

nltk.download('stopwords')
nltk.download('wordnet')

def preprocess_text(text):
    text = text.lower()
    
    text = re.sub(r'[^a-zA-Z\s]', '', text)
    
    tokens = text.split()
    
    stop_words = set(stopwords.words('english'))
    tokens = [token for token in tokens if token not in stop_words]
    
    lemmatizer = WordNetLemmatizer()
    tokens = [lemmatizer.lemmatize(token) for token in tokens]
    
    return ' '.join(tokens)

def load_model():
    try:
        with open('spam_model.pkl', 'rb') as file:
            model = pickle.load(file)
        return model
    except FileNotFoundError:
        print("Model file not found. Please train the model first.")
        return None

@app.route('/detect_spam', methods=['POST'])
def detect_spam():
    data = request.json
    email_content = data.get('email', '')
    
    processed_email = preprocess_text(email_content)
    
    model = load_model()
    
    if model is None:
        return jsonify({'error': 'Spam detection model not available'}), 500
    
    try:
        spam_probability = model.predict_proba([processed_email])[0][1]
        is_spam = spam_probability > 0.5
        
        return jsonify({
            'is_spam': is_spam,
            'spam_probability': float(spam_probability)
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)