const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));

// Create a transporter using Gmail
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

// Contact form endpoint
app.post('/send-email', async (req, res) => {
    const { name, email, subject, message } = req.body;

    // Validate inputs
    if (!name || !email || !subject || !message) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    try {
        // Email to you (portfolio owner)
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            subject: `New Contact Form Submission: ${subject}`,
            html: `
                <h2>New Contact Form Submission</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Subject:</strong> ${subject}</p>
                <p><strong>Message:</strong></p>
                <p>${message.replace(/\n/g, '<br>')}</p>
            `
        };

        // Email to sender (confirmation)
        const confirmationEmail = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'We received your message',
            html: `
                <h2>Thank you for contacting us!</h2>
                <p>Hi ${name},</p>
                <p>We have received your message and will get back to you as soon as possible.</p>
                <hr>
                <p><strong>Your Message:</strong></p>
                <p><strong>Subject:</strong> ${subject}</p>
                <p>${message.replace(/\n/g, '<br>')}</p>
                <p>Best regards,<br>Naveen Kumar J</p>
            `
        };

        // Send both emails
        await transporter.sendMail(mailOptions);
        await transporter.sendMail(confirmationEmail);

        res.status(200).json({ success: true, message: 'Email sent successfully!' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ success: false, message: 'Failed to send email', error: error.message });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'Server is running' });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
