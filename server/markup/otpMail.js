

const getOtpMarkup = ({otp}) => {
    return `
    <!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
        }
        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            background-color: #7E60BF;
            padding: 20px;
            text-align: center;
            color: #ffffff;
            font-size: 24px;
            font-weight: bold;
        }
        .content {
            padding: 20px;
            text-align: center;
        }
        .otp {
            font-size: 32px;
            font-weight: bold;
            color: #7E60BF;
            margin: 20px 0;
        }
        .instructions {
            font-size: 16px;
            color: #666666;
            margin-bottom: 20px;
        }
        .footer {
            background-color: #f4f4f4;
            text-align: center;
            padding: 10px;
            font-size: 14px;
            color: #999999;
        }
        .footer a {
            color: #7E60BF;
            text-decoration: none;
        }
        @media only screen and (max-width: 600px) {
            .email-container {
                width: 90%;
                margin: 20px auto;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <!-- Header -->
        <div class="header">
            AIMagicText
        </div>
        
        <!-- Content -->
        <div class="content">
            <p>Hello,</p>
            <p>Here is your OTP for verification:</p>
            <div class="otp">${otp}</div>
            <p class="instructions">
                Please enter this OTP in the verification field within the next 10 minutes to complete your process.
            </p>
            <p>If you didn't request this, please ignore this email or contact our support team.</p>
        </div>
        
        <!-- Footer -->
        <div class="footer">
            <p>Need help? <a href="mailto:app@aimagictext.in">Contact Support</a></p>
            <p>&copy; 2024 AIMagicText. All rights reserved.</p>
        </div>
    </div>
</body>
</html>

    
    `
}

module.exports = {
    getOtpMarkup
}