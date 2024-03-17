import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from statsmodels.tsa.ar_model import AutoReg

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
def recommend_mutual_funds(input_amc, input_category, amount_invested, tenure, top_n=5):
    # Calculate TF-IDF matrix for the input AMC Name and Category
    input_text = input_amc + ' ' + input_category
    input_tfidf_matrix = tfidf_vectorizer.transform([input_text])

    # Calculate cosine similarity between input and dataset
    similarity_scores = cosine_similarity(input_tfidf_matrix, combined_tfidf_matrix)

    # Get indices of top N recommendations
    top_indices = similarity_scores.argsort()[0][-top_n:][::-1]

    # Return top N recommended mutual funds with return predictions
    recommendations = df.iloc[top_indices].copy()

    # Predict returns for the specified tenure (number of future years)
    start_year = pd.Timestamp.now().year
    end_year = start_year + tenure
    pred_returns = returns_model_fit.predict(start=len(returns_data), end=len(returns_data) + tenure - 1,
                                             dynamic=False)

    # Treat returns as percentages and calculate the maturity amount using compound interest
    maturity_amounts = [amount_invested]  # Initialize with initial investment
    for return_percentage in pred_returns:
        previous_maturity = maturity_amounts[-1]
        maturity_amount = previous_maturity * ((1 + return_percentage / 100))
        maturity_amounts.append(maturity_amount)

    return recommendations, pred_returns, maturity_amounts[1:]  # Exclude initial investment from return
