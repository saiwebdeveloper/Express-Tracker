import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  return (
    <div className="container vh-100 d-flex align-items-center justify-content-center">
      <div className="card shadow-lg p-4" style={{ maxWidth: "400px", width: "100%" }}>
        <div className="text-center mb-4">
          <h3 className="fw-bold">Welcome Back 👋</h3>
          <p className="text-muted mb-0">Sign in to continue</p>
        </div>

        <div className="d-flex justify-content-center">
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              const user = jwtDecode(credentialResponse.credential);

              // ✅ logout on refresh
              sessionStorage.setItem("user", JSON.stringify(user));

              navigate("/home");
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          />
        </div>

        <hr className="my-4" />

        <p className="text-center text-muted small mb-0">
          By signing in, you agree to our <span className="fw-semibold">Terms</span> &
          <span className="fw-semibold"> Privacy Policy</span>
        </p>
      </div>
    </div>
  );
}

export default Login;
