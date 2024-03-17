from flask import Flask, request, jsonify
import pandas as pd  # Don't forget to import pandas
from models import recommend_mutual_funds
from flask_cors import CORS

app = Flask(__name__)
CORS(app) 

class UserRequest:
    def __init__(self, amc, category, amount_invested, tenure):
        self.amc = amc
        self.category = category
        self.amount_invested = amount_invested
        self.tenure = tenure

class UserResponse:
    def __init__(self, predictions, recommendations):
        self.predictions = predictions
        self.recommendations = recommendations

@app.route('/getrecommendation', methods=['GET'])
def get_recommendation():
    # Extract query parameters from the request
    amc = request.args.get('amc')
    category = request.args.get('category')
    amount_invested = request.args.get('amount_invested')
    tenure = request.args.get('tenure')

    # Create an instance of UserRequest
    user_request = UserRequest(
        amc=amc,
        category=category,
        amount_invested=amount_invested,
        tenure=tenure
    )

    # Validate the request
    if not all(vars(user_request).values()):
        return jsonify({'error': 'Missing required parameters in the query.'}), 400

    # Convert amount_invested and tenure to appropriate types
    try:
        amount_invested = float(amount_invested)
        tenure = int(tenure)
    except ValueError:
        return jsonify({'error': 'Amount invested and tenure must be numeric values.'}), 400

    # Call the recommendation function from the models module
    recommendations, predicted_returns, maturity_amounts = recommend_mutual_funds(input_amc=amc,
                                                                                 input_category=category,
                                                                                 amount_invested=amount_invested,
                                                                                 tenure=tenure)

    # Construct the response
    predictions = {
        'year': list(range(pd.Timestamp.now().year, pd.Timestamp.now().year + tenure)),
        'return_percentage': predicted_returns.tolist(),
        'maturity_amount': maturity_amounts
    }
    recommendations_data = []
    for _, row in recommendations.iterrows():
        recommendations_data.append({
            'Scheme Name': row['scheme_name'],
            'AMC Name': row['amc_name'],
            'Category': row['category'],
            'Returns 1yr': row['returns_1yr'],
            'Returns 3yr': row['returns_3yr'],
            'Returns 5yr': row['returns_5yr']
        })

    user_response = UserResponse(predictions=predictions, recommendations=recommendations_data)

    # Return the response as JSON
    return jsonify(user_response.__dict__)

if __name__ == '__main__':
    app.run(debug=True)

