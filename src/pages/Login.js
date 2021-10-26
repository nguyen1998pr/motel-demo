import React, { useState, useContext } from "react";
import * as apiServices from "../store/motel/services";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { ApartmentContext } from "../context";
import "../css/custom.css";
import data from "@iconify/icons-eva/home-fill";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Login = (props) => {
  const context = useContext(ApartmentContext);
  const { handleLogin } = context;
  const [state, setState] = useState({
    credentials: {},
    notify: { vertical: "top", horizontal: "right" },
  });

  const handleChange = (e) => {
    setState((s) => ({
      ...s,
      credentials: { ...state.credentials, [e.target.name]: e.target.value },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const btn = document.querySelector(".woocommerce-Button");
    document.getElementById("login").disabled = true;
    btn.classList.add("button--loading");

    const request = apiServices.userLogin(state.credentials);
    request
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        setTimeout(function () {
          btn.classList.remove("button--loading");
          setState((s) => ({
            ...s,
            notify: {
              ...state.notify,
              open: true,
              message: "Login Success!",
              type: "success",
            },
          }));
          props.callBack({ open: false, type: "login", loggedIn: true });
          handleLogin({ isLogin: true, userInfo: res.data.user });
        }, 2000);
      })
      .catch((err) => {
        setTimeout(function () {
          let message = "";
          let type = "";
          btn.classList.remove("button--loading");

          switch (err && err.status) {
            case 500:
              message = "Server Error!!!";
              type = "error";
              break;
            case 400:
              message = "You have been banned!!!";
              type = "error";
              break;
            case 401:
              message = "Wrong Password!!!";
              type = "error";
              break;
            case 422:
              message = "User Not Found!!!";
              type = "error";
              break;
            default:
              break;
          }
          setState((s) => ({
            ...s,
            notify: {
              ...state.notify,
              open: true,
              message: message,
              type: type,
            },
          }));
        }, 2000);
      });
  };

  const handleNotify = () => {
    setState((s) => ({ ...s, notify: { ...state.notify, open: false } }));
  };

  const { vertical, horizontal } = state.notify;

  return (
    <>
      <div className="woocommerce">
        <div className="customer-login">
          <div className="martfury-login-tabs">
            <div className="tabs-content">
              <div className="tabs-panel active">
                <h2>Log In Your Account</h2>
                <form className="woocommerce-form woocommerce-form-login login">
                  <p className="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
                    <input
                      type="text"
                      className="woocommerce-Input woocommerce-Input--text input-text"
                      required=""
                      onChange={handleChange}
                      placeholder="Email address"
                      name="email"
                      id="email"
                      autoComplete="off"
                    />
                  </p>
                  <p className="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide form-row-password">
                    <span className="password-input">
                      <input
                        className="woocommerce-Input woocommerce-Input--text input-text"
                        required=""
                        placeholder="Password"
                        onChange={handleChange}
                        type="password"
                        name="password"
                        id="password"
                      />
                      <span className="show-password-input"></span>
                    </span>
                  </p>
                  <p className="form-row">
                    <span className="woocommerce-form-row__remember">
                      <label className="woocommerce-form__label woocommerce-form__label-for-checkbox woocommerce-form-login__rememberme">
                        <input
                          className="woocommerce-form__input woocommerce-form__input-checkbox"
                          name="rememberme"
                          type="checkbox"
                          id="rememberme"
                          value="forever"
                        />
                        <span>Remember me</span>
                      </label>
                      <a className="lost-password">Forgot your password?</a>
                    </span>
                    <button
                      className="woocommerce-Button button"
                      name="login"
                      id="login"
                      onClick={handleSubmit}
                    >
                      <span className="button__text">Login</span>
                    </button>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={state.notify.open}
        onClose={handleNotify}
        autoHideDuration={1500}
        key={"top" + "right"}
      >
        <Alert severity={state.notify.type} sx={{ width: "100%" }}>
          {state.notify.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Login;
