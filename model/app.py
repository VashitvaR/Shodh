from flask import Flask, request, jsonify
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from statsmodels.tsa.ar_model import AutoReg
import pandas as pd
from fuzzywuzzy import process

app = Flask(__name__)

# Load the dataset
df = pd.read_csv("MF_India_AI.csv")  # Replace with your dataset path

# Preprocess the data
tfidf_vectorizer = TfidfVectorizer()
combined_text = df['scheme_name'] + ' ' + df['category']
combined_tfidf_matrix = tfidf_vectorizer.fit_transform(combined_text)

# Build an autoregressive (AR) model to predict returns
returns_data = df[['returns_1yr', 'returns_3yr', 'returns_5yr']].dropna()
order = 1
returns_model = AutoReg(returns_data['returns_1yr'].values, lags=order)
returns_model_fit = returns_model.fit()

@app.route('/predict', methods=['POST'])
def predict():
    # Get input data from the request
    input_data = request.json

    # Process input data
    input_amc = input_data['input_amc']
    input_category = input_data['input_category']
    amount_invested = input_data['amount_invested']
    tenure = input_data['tenure']

    # Calculate TF-IDF matrix for the input AMC Name and Category
    input_text = input_amc + ' ' + input_category
    input_tfidf_matrix = tfidf_vectorizer.transform([input_text])

    # Calculate cosine similarity between input and dataset
    similarity_scores = cosine_similarity(input_tfidf_matrix, combined_tfidf_matrix)

    # Get indices of top recommendations
    top_indices = similarity_scores.argsort()[0][-5:][::-1]

    # Get top mutual fund recommendations
    recommended_funds = df.iloc[top_indices].copy()

    # Predict returns for the specified tenure
    start_year = pd.Timestamp.now().year
    end_year = start_year + tenure
    pred_returns = returns_model_fit.predict(start=len(returns_data), end=len(returns_data) + tenure - 1, dynamic=False)

    # Treat returns as percentages and calculate the maturity amount using compound interest
    maturity_amounts = [amount_invested]
    for return_percentage in pred_returns:
        previous_maturity = maturity_amounts[-1]
        maturity_amount = previous_maturity * ((1 + return_percentage / 100))
        maturity_amounts.append(maturity_amount)

    # Prepare response data
    response_data = {
        'recommended_funds': recommended_funds.to_dict(orient='records'),
        'predicted_returns': pred_returns.tolist(),
        'maturity_amounts': maturity_amounts[1:]  # Exclude initial investment
    }

    # Return response as JSON
    return jsonify(response_data)

if __name__ == '__main__':
    app.run(debug=True)
