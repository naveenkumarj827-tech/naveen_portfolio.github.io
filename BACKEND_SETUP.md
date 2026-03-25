# Portfolio Backend Setup Guide

## Overview
This backend server integrates Gmail email sending for your portfolio contact form. It uses:
- **Express.js** - Web framework
- **Nodemailer** - Email sending
- **CORS** - Cross-origin requests
- **dotenv** - Environment variables

## Prerequisites
- Node.js installed (v14+)
- npm installed
- Gmail account
- Google App Password (not your regular password)

## Setup Instructions

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Get Your Gmail App Password

1. Go to your Google Account: https://myaccount.google.com/
2. Click **Security** in the left sidebar
3. Enable **2-Step Verification** (if not already enabled)
4. Search for **App passwords** in the Security settings
5. Select **Mail** and **Windows Computer** (or your device)
6. Google will generate a 16-character password
7. Copy this password

### Step 3: Configure Environment Variables

Edit the `.env` file and update:

```env
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASSWORD=your_16_character_app_password
PORT=3000
```

**Important:** Use your **Gmail App Password**, NOT your regular Gmail password!

### Step 4: Run the Server

For development (with auto-reload):
```bash
npm run dev
```

Or for production:
```bash
npm start
```

You should see:
```
Server is running on http://localhost:3000
```

### Step 5: Test the Server

Open your browser and go to:
```
http://localhost:3000/api/health
```

You should see: `{"status":"Server is running"}`

## How It Works

1. User fills out the contact form on your portfolio
2. Clicks "Send Message" button
3. Form data is sent to your Node.js backend
4. Backend validates the data
5. Two emails are sent:
   - **Email 1:** To you with the user's message
   - **Email 2:** To the user as a confirmation

## Troubleshooting

### "Failed to send email" error
- Check if Node.js server is running
- Verify `.env` file has correct Gmail credentials
- Ensure 2-Step Verification is enabled on Gmail account
- Use an **App Password**, not your regular password

### "Connection refused" error
- Server is not running. Run `npm run dev` or `npm start`
- Check if you're using the correct PORT (default 3000)

### CORS errors
- Make sure the frontend is fetching from `http://localhost:3000`
- Adjust the fetch URL if running on different port

## File Structure
```
├── package.json          # Dependencies and scripts
├── .env                  # Environment variables (keep secret!)
├── server.js             # Express backend server
├── app.js                # Frontend JavaScript
├── index.html            # HTML file
├── styles/               # CSS files
└── img/                  # Images
```

## Security Notes

⚠️ **Important:**
- Never commit `.env` file to GitHub
- Keep your App Password secret
- Add `.env` to `.gitignore`

## Keeping Server Running

For production deployment, consider using:
- **PM2:** Process manager to keep server running
- **Heroku:** Cloud platform for hosting
- **AWS:** Cloud services
- **Google Cloud:** Cloud hosting

### Using PM2:
```bash
npm install -g pm2
pm2 start server.js --name "portfolio-backend"
pm2 startup
pm2 save
```

## Support

If you encounter issues, check:
1. Node.js is installed: `node --version`
2. Dependencies are installed: `npm list`
3. `.env` file has correct credentials
4. Gmail account allows App Passwords
5. Port 3000 is not already in use

Enjoy your portfolio contact form! 🎉
