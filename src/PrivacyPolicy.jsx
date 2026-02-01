import React from "react";
import { useNavigate } from "react-router-dom";

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate("/"); // navigate back to login page
  };

  return (
    <div className="container py-5">
      <div className="card shadow-sm">
        <div className="card-body">
          <h2 className="card-title mb-4">Privacy Policy</h2>
          <p className="text-muted mb-2"><strong>Effective Date:</strong> February 1, 2026</p>

          <h5 className="mt-4">1. Information We Collect</h5>
          <p>We may collect your name, email (via Google login), and expenses you input in the app.</p>

          <h5 className="mt-4">2. How We Use Your Information</h5>
          <p>
            To display your info, track your expenses, and prevent unauthorized access.
          </p>

          <h5 className="mt-4">3. Data Storage</h5>
          <p>
            Your data is stored in your browser (sessionStorage). Logging out clears all stored data.
          </p>

          <h5 className="mt-4">4. Third-Party Services</h5>
          <p>
            We use Google OAuth and Google reCAPTCHA v3. Please see their privacy policies for more details.
          </p>

          <h5 className="mt-4">5. Security</h5>
          <p>
            We take reasonable measures to protect your data, but no method of storage or transmission is completely secure.
          </p>

          <h5 className="mt-4">6. Changes to This Policy</h5>
          <p>
            We may update this Privacy Policy from time to time. The effective date at the top will be updated when changes are made.
          </p>

          <h5 className="mt-4">7. Contact Us</h5>
          <p>
            For questions regarding this Privacy Policy, contact us at: <strong>workspcex@gmail.com</strong>
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

export default PrivacyPolicy;
