import React from "react";
import { useNavigate } from "react-router-dom";

const Terms = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate("/"); // navigate back to login page
  };

  return (
    <div className="container py-5">
      <div className="card shadow-sm">
        <div className="card-body">
          <h2 className="card-title mb-4">Terms & Conditions</h2>
          <p className="text-muted mb-2"><strong>Effective Date:</strong> February 1, 2026</p>

          <h5 className="mt-4">1. Acceptance of Terms</h5>
          <p>
            By using this application, you agree to comply with these Terms and Conditions.
          </p>

          <h5 className="mt-4">2. Application Use</h5>
          <p>
            This app is intended for personal expense tracking only. You agree not to misuse the app for any illegal or unauthorized purposes.
          </p>

          <h5 className="mt-4">3. User Accounts</h5>
          <p>
            You must log in using a valid Google account. You are responsible for maintaining the confidentiality of your account information.
          </p>

          <h5 className="mt-4">4. Data Storage</h5>
          <p>
            All data is stored in your browser session (sessionStorage). Logging out will clear your stored information.
          </p>

          <h5 className="mt-4">5. Third-Party Services</h5>
          <p>
            This app uses Google OAuth and Google reCAPTCHA v3. Please review their privacy policies for details.
          </p>

          <h5 className="mt-4">6. Limitation of Liability</h5>
          <p>
            This app is provided “as is” without warranty of any kind. We are not liable for any loss or damage resulting from the use of the app.
          </p>

          <h5 className="mt-4">7. Changes to Terms</h5>
          <p>
            We may update these Terms from time to time. The effective date at the top will be updated when changes occur.
          </p>

          <h5 className="mt-4">8. Contact Us</h5>
          <p>
            For questions regarding these Terms, contact us at: <strong>workspcex@gmail.com</strong>
          </p>

          {/* Go Back Button */}
          <div className="text-center mt-4">
            <button className="btn btn-primary" onClick={goBack}>
              ← Go Back to Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;
