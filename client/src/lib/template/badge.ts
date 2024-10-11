export const welcomeTemplate = `
<!DOCTYPE html>
<html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">
<head>
    <title>Welcome</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: Arial, sans-serif;
            color: #333;
            margin: 0;
            padding: 0;
            text-align: center;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            font-size: 24px;
            margin-bottom: 20px;
        }
        .description {
            font-size: 16px;
            margin-bottom: 20px;
        }
        .qr-image {
            margin-top: 20px;
            max-width: 100%;
            height: auto;
        }
        .footer {
            margin-top: 20px;
            font-size: 14px;
            color: #888;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            Scan to Get In
        </div>
        <div class="description">
            To access our harbour, <a href="https://qrcodess-rho.vercel.app/badge.png" style="color: blue; text-decoration: underline;">click here</a> to access it directly:
        </div>
        <div class="footer">
            If you have any questions, please contact us at support@example.com.
        </div>
    </div>
</body>
</html>
`;
