import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/Auth/AuthContext";

const Login = (props) => {
  const { user, isAuthenticated, login, register, error, clearError } =
    useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const registerHandler = (e) => {
    e.preventDefault();
    register(email, password, name);
  };
  const loginHandler = (e) => {
    e.preventDefault();
    login(email, password);
  };

  useEffect(() => {
    clearError();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, isAuthenticated, props.history, user]);

  if (isAuthenticated) return <Navigate to="/" />;

  return (
    <div className="login-main">
      <div className="main">
        <input type="checkbox" id="chk" aria-hidden="true"></input>
        <div className="signup">
          <form onSubmit={(e) => registerHandler(e)}>
            <label htmlFor="chk" aria-hidden="true">
              Sign up
            </label>
            <input
              type="text"
              name="txt"
              placeholder="User name"
              required={true}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              required={true}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              name="pswd"
              placeholder="Password"
              required={true}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button>Register</button>
          </form>
          {error}
        </div>

        <div className="login">
          <form onSubmit={(e) => loginHandler(e)}>
            <label htmlFor="chk" aria-hidden="true">
              Login
            </label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              required={true}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              name="pswd"
              placeholder="Password"
              required={true}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button>Login</button>
            {error && (
              <div
                style={{
                  textAlign: "center",
                  marginTop: "20px",
                  backgroundColor: "#F2DEDE",
                  borderColor: "#ffeeba",
                  borderRadius: "5px",
                  fontSize: "15px",
                  padding: "10px",
                  textTransform: "capitalize",
                  marginBottom: "25px",
                  fontWeight: "400",
                  color: "#843534",
                }}
              >
                <strong>Warning! </strong>
                {error}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
