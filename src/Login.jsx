import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useNavigate, Link } from "react-router-dom";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

function Login() {
  const navigate = useNavigate();
  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleLoginSuccess = async (credentialResponse) => {
    if (!executeRecaptcha) {
      console.warn("reCAPTCHA not ready");
      return;
    }

    // Run reCAPTCHA v3
    const recaptchaToken = await executeRecaptcha("google_login");
    console.log("reCAPTCHA token:", recaptchaToken);

    // Decode Google JWT
    const user = jwtDecode(credentialResponse.credential);

    // Store in sessionStorage
    sessionStorage.setItem("user", JSON.stringify(user));
    sessionStorage.setItem("loginTime", new Date().toLocaleString());

    navigate("/home");
  };

  return (
    <div className="container vh-100 d-flex align-items-center justify-content-center">
      <div className="card shadow-lg p-4" style={{ maxWidth: "400px", width: "100%" }}>
        <div className="text-center mb-4">
          <h3 className="fw-bold">Welcome Back 👋</h3>
          <p className="text-muted mb-0">Sign in to continue</p>
        </div>

        <div className="d-flex justify-content-center mb-4">
          <GoogleLogin
            onSuccess={handleLoginSuccess}
            onError={() => console.log("Login Failed")}
          />
        </div>

        <hr className="my-4" />

        <p className="text-center text-muted small mb-0">
          By signing in, you agree to our{" "}
          <Link to="/terms" className="fw-semibold text-decoration-underline">
            Terms
          </Link>{" "}
          &{" "}
          <Link to="/privacy-policy" className="fw-semibold text-decoration-underline">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
