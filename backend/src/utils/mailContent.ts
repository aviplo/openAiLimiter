const emailContent = (limit: number, price: number, percentage: number) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Balance Limit Reached</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .container {
            background-color: #f9f9f9;
            border: 1px solid #ddd;
            border-radius: 5px;
            padding: 20px;
        }
        .warning {
            color: #d9534f;
            font-weight: bold;
        }
        .highlight {
            background-color: #ffd700;
            padding: 2px 5px;
            border-radius: 3px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h2>Balance Limit Alert</h2>
        <p class="warning">You have reached the limit of your balance!</p>
        <p>Your current balance is: <span class="highlight">${price}$</span></p>
        <p>Your limit is: <span class="highlight">${limit}$</span></p>
        <p>You have reached <span class="highlight">${percentage}%</span> of your limit.</p>
        <p>Please take necessary actions to avoid any service interruptions.</p>
    </div>
</body>
</html>`;
};

export default emailContent;
