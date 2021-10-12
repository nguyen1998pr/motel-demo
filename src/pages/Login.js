import React from "react";
import "../custom.css";

const Login = () => {
  return (
    <div className="woocommerce">
      <div className="customer-login">
        <div className="martfury-login-tabs">
          <div className="tabs-content">
            <div className="tabs-panel active">
              <h2>Log In Your Account</h2>
              <form
                className="woocommerce-form woocommerce-form-login login"
                method="post"
              >
                <p className="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
                  <input
                    type="text"
                    className="woocommerce-Input woocommerce-Input--text input-text"
                    required=""
                    placeholder="Username or email address"
                    name="username"
                    id="username"
                    autoComplete="off"
                  />
                </p>
                <p className="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide form-row-password">
                  <span className="password-input">
                    <input
                      className="woocommerce-Input woocommerce-Input--text input-text"
                      required=""
                      placeholder="Password"
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
                    {"           "}
                    <a className="lost-password">Forgot your password?</a>
                  </span>
                  <button
                    type="submit"
                    className="woocommerce-Button button"
                    name="login"
                    value="Log in"
                  >
                    Log in
                  </button>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
