# API Documentation

## Predictions Endpoint

### Description
This API endpoint provides predictions and recommendations based on user input.

### Endpoint
- **Method:** GET
- **URL:** `https://your-api-url.com/predictions`

### Request Body
```json
{
    "amc": "ABC Mutual Fund",
    "category": "Equity",
    "amount_invested": 10000,
    "tenure": 5
}
```
### Response Body

```
{
  "predictions": {
    "maturity_amount": [
      10388.700601962086,
      10812.643715553564,
      11255.74411805085,
      11717.174005325543,
      12197.536040132265
    ],
    "return_percentage": [
      3.887006019620872,
      4.080809812840411,
      4.097983935787175,
      4.099505838398526,
      4.099640703367504
    ],
    "year": [
      2024,
      2025,
      2026,
      2027,
      2028
    ]
  },
  "recommendations": [
    {
      "AMC Name": "Tata Mutual Fund",
      "Category": "Equity",
      "Returns 1yr": 6.6,
      "Returns 3yr": 27.8,
      "Returns 5yr": 10,
      "Scheme Name": "Tata Equity P/E Fund"
    },
    {
      "AMC Name": "L&T Mutual Fund",
      "Category": "Equity",
      "Returns 1yr": -0.7,
      "Returns 3yr": 33.7,
      "Returns 5yr": 11.3,
      "Scheme Name": "L&T Focused Equity Fund"
    },
    {
      "AMC Name": "SBI Mutual Fund",
      "Category": "Equity",
      "Returns 1yr": -4.9,
      "Returns 3yr": 22,
      "Returns 5yr": 12.2,
      "Scheme Name": "SBI Focused Equity Fund"
    },
    {
      "AMC Name": "IDBI Mutual Fund",
      "Category": "Equity",
      "Returns 1yr": -0.7,
      "Returns 3yr": 33.7,
      "Returns 5yr": 11.3,
      "Scheme Name": "IDBI Equity Advantage Fund"
    },
    {
      "AMC Name": "Tata Mutual Fund",
      "Category": "Equity",
      "Returns 1yr": 0.4,
      "Returns 3yr": 28.4,
      "Returns 5yr": null,
      "Scheme Name": "Tata Focused Equity Fund"
    }
  ]
}
```
### Response code

```
200 OK: Successful response.

400 Bad Request: Invalid request format.
```
### Sample usage

```
curl -X GET "https://your-api-url.com/predictions" -H "Content-Type: application/json" -d '{
    "amc": "ABC Mutual Fund",
    "category": "Equity",
    "amount_invested": 10000,
    "tenure": 5
}'

```

### Response Explanation

- predictions: Predicted maturity amount and return percentages over the tenure.
- recommendations: Recommended mutual fund schemes based on historical returns.