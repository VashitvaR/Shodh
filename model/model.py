import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from statsmodels.tsa.ar_model import AutoReg
import numpy as np
from fuzzywuzzy import process  # For fuzzy string matching

# Load the dataset
df = pd.read_csv("dataset.csv")  # Replace with your dataset

# Preprocess the data
# For simplicity, let's assume you have already preprocessed the data

# Feature engineering
# Here, we'll use TF-IDF Vectorizer for text-based features (AMC Name and Category)
tfidf_vectorizer = TfidfVectorizer()

# Fit and transform both 'scheme_name' and 'category' columns using the same vectorizer instance
combined_text = df['scheme_name'] + ' ' + df['category']  # Combine scheme_name and category for TF-IDF
combined_tfidf_matrix = tfidf_vectorizer.fit_transform(combined_text)

# Build an autoregressive (AR) model to predict returns
returns_data = df[['returns_1yr', 'returns_3yr', 'returns_5yr']].dropna()
order = 1  # AR order
returns_model = AutoReg(returns_data['returns_1yr'].values, lags=order)
returns_model_fit = returns_model.fit()

# Recommendation function with return predictions
def recommend_mutual_funds(input_amc, input_category, amount_invested, tenure, years=5, top_n=5):
    # Handle missing columns or incorrect column names
    if 'scheme_name' not in df.columns or 'category' not in df.columns:
        raise ValueError("Dataset is missing 'scheme_name' or 'category' column.")

    # Calculate TF-IDF matrix for the input AMC Name and Category
    input_text = input_amc + ' ' + input_category
    input_tfidf_matrix = tfidf_vectorizer.transform([input_text])

    # Calculate cosine similarity between input and dataset
    similarity_scores = cosine_similarity(input_tfidf_matrix, combined_tfidf_matrix)

    # Get indices of top N recommendations
    top_indices = similarity_scores.argsort()[0][-top_n:][::-1]

    # Return top N recommended mutual funds with return predictions
    recommendations = df.iloc[top_indices].copy()

    # Predict returns for the specified number of years
    pred_returns = returns_model_fit.predict(start=len(returns_data), end=len(returns_data) + years - 1, dynamic=False)

    return pred_returns

# Accept user input for AMC Name, Category, Amount Invested, Tenure, and the number of years to predict returns for
input_amc = input("Enter AMC Name: ")
input_category = input("Enter Category: ")
amount_invested = float(input("Enter Amount Invested: "))
tenure = int(input("Enter Tenure: "))

# Get predicted returns
predicted_returns = recommend_mutual_funds(input_amc=input_amc,
                                           input_category=input_category,
                                           amount_invested=amount_invested,
                                           tenure=tenure,
                                           top_n=5)
print(predicted_returns)
