import joblib
import sys

# Load the trained model and vectorizer
classifier = joblib.load('abusive_language_detector.pkl')
vectorizer = joblib.load('vectorizer.pkl')

# Get the text to be predicted from Node.js
text = sys.argv[1]

# Vectorize the text data
text_vectorized = vectorizer.transform([text])

# Make the prediction
prediction = classifier.predict(text_vectorized)

# Print the prediction result to stdout
print(prediction[0])