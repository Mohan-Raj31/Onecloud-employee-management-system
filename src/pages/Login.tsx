import { useState } from "react";
import { useNavigate } from "react-router-dom";

const DEMO_USERNAME = "admin";
const DEMO_PASSWORD = "admin123";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");

    if (!username.trim() || !password.trim()) {
      setError("Username and password are required.");
      return;
    }

    if (
      username.trim() === DEMO_USERNAME &&
      password === DEMO_PASSWORD
    ) {
      if (rememberMe) {
        localStorage.setItem("onecloud_remember_me", "true");
      } else {
        localStorage.removeItem("onecloud_remember_me");
      }

      localStorage.setItem("onecloud_logged_in", "true");
      localStorage.setItem("onecloud_user", username.trim());

      navigate("/dashboard");
      return;
    }

    setError("Invalid Username or Password.");
  };

  return (
    <div className="min-h-screen bg-slate-200 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        
        <div className="rounded-2xl bg-white shadow-xl border border-slate-100 overflow-hidden">
          
          <div className="bg-gradient-to-r from-indigo-900 to-violet-500 py-5 text-center">
            <h1 className="text-2xl font-bold text-white">
              LOGIN
            </h1>
          </div>

          <form onSubmit={handleLogin} className="p-6 sm:p-8">
    
            <div>
              <label
                htmlFor="username"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Username / Email / Mobile
                <span className="text-red-500"> *</span>
              </label>

              <input
                id="username"
                type="text"
                value={username}
                onChange={(event) => {
                  setUsername(event.target.value);
                  setError("");
                }}
                placeholder="Enter username"
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            
            <div className="mt-5">
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Password
                <span className="text-red-500"> *</span>
              </label>

              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                    setError("");
                  }}
                  placeholder="Enter password"
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 pr-12 text-sm text-slate-800 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((previous) => !previous)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium text-slate-500 hover:text-indigo-600"
                  aria-label={
                    showPassword ? "Hide password" : "Show password"
                  }
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            
            <div className="mt-5 flex items-center">
              <input
                id="rememberMe"
                type="checkbox"
                checked={rememberMe}
                onChange={(event) => setRememberMe(event.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
              />

              <label
                htmlFor="rememberMe"
                className="ml-2 text-sm text-slate-600"
              >
                Remember Me
              </label>
            </div>

            
            {error && (
              <div className="mt-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="mt-6 w-full rounded-lg bg-indigo-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-100"
            >
              Login
            </button>

            <div className="mt-6 rounded-xl border border-indigo-100 bg-indigo-50 p-4">
              <h2 className="text-sm font-bold text-indigo-800">
                Demo Credentials
              </h2>

              <div className="mt-3 space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-slate-600">
                    Username:
                  </span>

                  <span className="font-semibold text-slate-800">
                    admin
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-slate-600">
                    Password:
                  </span>

                  <span className="font-semibold text-slate-800">
                    admin123
                  </span>
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Footer */}
        <p className="mt-5 text-center text-xs text-slate-500">
          OneCloud Enterprise Platform
        </p>
      </div>
    </div>
  );
}

export default Login;