from flask import Flask,send_file, request, jsonify
from flask_cors import CORS
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

app = Flask(__name__)
CORS(app)  # Allow cross-origin requests from frontend


EMAIL_ADDRESS = "janvisingh.gahrwal@gmail.com"
EMAIL_PASSWORD = "shzroavoyekyjfij"
@app.route('/')
def index():
    return send_file('index.html')  # index.html at root project folder

@app.route('/script.js')
def script():
    return send_file('script.js')

@app.route('/style.css')
def style():
    return send_file('style.css')
def send_email(to_email, subject, message):
    
    try:
        print("Trying to send email to:", to_email)  # Debug line

        server = smtplib.SMTP("smtp.gmail.com", 587)
        server.starttls()
        server.login(EMAIL_ADDRESS, EMAIL_PASSWORD)

        # Create email message
        msg = MIMEMultipart()
        msg["From"] = EMAIL_ADDRESS
        msg["To"] = to_email
        msg["Subject"] = subject
        msg.attach(MIMEText(message, "plain"))

        # Send email
        server.sendmail(EMAIL_ADDRESS, to_email, msg.as_string())
        server.quit()
        return True
    except Exception as e:
        print("Error sending email:", e,flush=True)
        return False

@app.route('/send_email', methods=['POST'])
def send_email_api():
    data = request.json
    print("Received data:", data)  # Debug

    to_email = data.get("email")
    subject = data.get("subject", "Emergency Alert")
    message = data.get("message")  # Message already includes location in frontend

    if send_email(to_email, subject, message):
        return jsonify({"message": "Email sent successfully!"}), 200
    else:
        return jsonify({"error": "Failed to send email"}), 500



if __name__ == '__main__':
    app.run(debug=True)
