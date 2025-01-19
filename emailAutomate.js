const nodemailer = require("nodemailer");
const schedule = require("node-schedule");

// Step 1: Configure the email transporter
const transporter = nodemailer.createTransport({
    service: "gmail", // Email provider
    auth: {
        user: "nandhakumar311522@gmail.com", // Replace with your email
        pass: "Nandhan@18", // Replace with your app password
    },
});

// Step 2: Define the email options
const recipients = [
    "nandhakumaredu.it@gmail.com"
]; // Add multiple recipients

const mailOptions = {
    from: "nandhakumar311522@gmail.com", // Sender's email
    to: recipients.join(","), // Send to all recipients
    subject: "Scheduled Email (3 Times a Week)", // Email subject
    text: "Hello! This is an automated email sent 3 times a week using JavaScript and Node.js.", // Email text body
    html: `<p>Hello! This is an <b>automated email</b> sent <i>3 times a week</i> using <b>JavaScript</b> and <b>Node.js</b>.</p>`, // HTML body
};

// Step 3: Schedule the email to run 3 times a week
// Using cron-style expressions (Monday, Wednesday, Friday at 10 AM)
const rule = new schedule.RecurrenceRule();
rule.dayOfWeek = [0, 2, 5]; // Monday, Wednesday, Friday
rule.hour = 20; // 10 AM
rule.minute = 0;

schedule.scheduleJob(rule, () => {
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log("Error occurred:", error.message);
        } else {
            console.log("Email sent successfully to all recipients:", info.response);
        }
    });
});

console.log("Email automation script is running. Emails will be sent 3 times a week!");
