# Email API Setup Instructions for Contact Form

## Overview
The contact form on the school website now supports both **Email** and **WhatsApp** message sending. The email functionality uses EmailJS, a service that allows sending emails directly from the frontend without requiring a backend server.

## EmailJS Setup Instructions

### Step 1: Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

### Step 2: Add Email Service
1. In your EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions for your email provider
5. Note down the **Service ID** (you'll need this later)

### Step 3: Create Email Template
1. Go to **Email Templates** in your dashboard
2. Click **Create New Template**
3. Use this template content:

```
Subject: New Contact Form Message - {{subject}}

From: {{from_name}}
Email: {{from_email}}
Phone: {{phone}}

Subject: {{subject}}

Message:
{{message}}

---
This message was sent from the school website contact form.
```

4. Save the template and note down the **Template ID**

### Step 4: Get Your User ID
1. Go to **Account** settings in your dashboard
2. Find your **User ID** (starts with "user_")

### Step 5: Update the Website Code
In the file `pages/contact.html`, find these lines and replace with your actual IDs:

```javascript
emailjs.init("YOUR_EMAILJS_USER_ID"); // Replace with your actual User ID
```

```javascript
emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
```

Replace:
- `YOUR_EMAILJS_USER_ID` with your actual User ID
- `YOUR_SERVICE_ID` with your actual Service ID
- `YOUR_TEMPLATE_ID` with your actual Template ID

## Features Added

### 1. Dual Submission Options
- **Send via Email**: Sends the message directly to `chandrima.sharma79@gmail.com`
- **Send via WhatsApp**: Opens WhatsApp with pre-formatted message

### 2. Enhanced User Experience
- Real-time status messages (success, error, loading)
- Form validation
- Button state management
- Auto-dismissing success messages

### 3. Error Handling
- Graceful fallback if email fails
- Clear error messages for users
- Console logging for debugging

## Testing
1. After setting up EmailJS, test the contact form
2. Try sending a test email to verify configuration
3. Check the school email inbox for test messages
4. Test WhatsApp functionality as well

## Benefits
- **Professional**: Direct email delivery to school inbox
- **Backup Option**: WhatsApp as alternative communication method
- **No Backend Required**: Fully frontend solution
- **Free Tier**: EmailJS offers 200 free emails per month
- **Secure**: No email credentials stored in frontend code

## Troubleshooting
- If emails don't arrive, check EmailJS dashboard for delivery status
- Verify email service configuration
- Check browser console for error messages
- Ensure template variables match the JavaScript code

## Free Tier Limitations
- 200 emails per month
- EmailJS branding in emails
- Basic support

For higher volume or to remove branding, consider upgrading to a paid EmailJS plan.