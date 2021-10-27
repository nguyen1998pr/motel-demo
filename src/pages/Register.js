import React, { useState } from "react";
import * as apiServices from "../store/motel/services";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import logo from "../images/logo.svg";
import useValidator from "../utils/useValidator";
import "../css/custom.css";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Register = (props) => {
  const [validator, showValidationMessage] = useValidator();
  const [state, setState] = useState({
    data: {
      firstName: "",
    },
    notify: { vertical: "top", horizontal: "right" },
  });

  const handleChange = (event) => {
    setState((s) => ({
      ...s,
      data: { ...state.data, [event.target.name]: event.target.value },
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validator.allValid()) {
      const btn = document.querySelector(".woocommerce-Button");
      document.getElementById("register").disabled = true;
      btn.classList.add("button--loading");

      const request = apiServices.userRegister(state.data);
      request
        .then((res) => {
          setTimeout(function () {
            btn.classList.remove("button--loading");
            setState((s) => ({
              ...s,
              notify: {
                ...state.notify,
                open: true,
                message: "Register Success!",
                type: "success",
              },
            }));
          }, 2000);
        })
        .catch((err) => {
          setTimeout(function () {
            btn.classList.remove("button--loading");
            if (err.status === 500 || err.status === 409) {
              setState((s) => ({
                ...s,
                notify: {
                  ...state.notify,
                  open: true,
                  message: "Register Fail!",
                  type: "error",
                },
              }));
            }
          }, 2000);
        });
    } else {
      showValidationMessage(true);
    }
  };

  const handleNotify = () => {
    setState((s) => ({ ...s, notify: { ...state.notify, open: false } }));
  };

  const { vertical, horizontal } = state.notify;

  return (
    <>
      <div className="woocommerce">
        <div className="customer-register">
          <div className="martfury-login-tabs">
            <div className="tabs-content">
              <div className="tabs-panel active">
                <div
                  style={{
                    textAlign: "center",
                    maxWidth: "250px",
                    padding: "60px 0",
                  }}
                >
                  <img className="mb-4" src={logo} alt="" />
                  <p style={{ paddingTop: "10px" }}>
                    In consideration of Your access to and use of the Service,
                    You agree to provide true, accurate, current and complete
                    information about yourself and notify us of any changes to
                    previously submitted registration data. If You provide any
                    information that is false, incomplete or otherwise
                    inaccurate, or we have a reasonable basis to suspect that
                    such inaccurate information has been provided, we have the
                    right to deny, suspend, or terminate Your account and refuse
                    any and all current or future use of the Service (or any
                    portion thereof).
                  </p>
                </div>
                <div>
                  <h2>Register Account</h2>
                  <form className="woocommerce-form woocommerce-form-login login">
                    <div style={{ display: "flex" }}>
                      <div className="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
                        <input
                          type="text"
                          className="woocommerce-Input woocommerce-Input--text input-text"
                          required=""
                          placeholder="First Name"
                          name="firstName"
                          id="firstName"
                          onChange={handleChange}
                          autoComplete="off"
                          onBlur={() => validator.showMessageFor("firstName")}
                        />
                        {validator.message(
                          "firstName",
                          state.data.firstName,
                          "required|alpha_space",
                          {
                            messages: {
                              required: `"First Name" is Required`,
                              alpha_space: `Numbers are not Allowed`,
                            },
                          }
                        )}
                      </div>
                      <div className="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
                        <input
                          type="text"
                          className="woocommerce-Input woocommerce-Input--text input-text"
                          required=""
                          placeholder="Last Name"
                          name="lastName"
                          id="lastName"
                          onChange={handleChange}
                          autoComplete="off"
                          onBlur={() => validator.showMessageFor("lastName")}
                        />
                        {validator.message(
                          "lastName",
                          state.data.lastName,
                          "required|alpha_space",
                          {
                            messages: {
                              required: `"Last Name" is Required`,
                              alpha_space: `Numbers are not Allowed`,
                            },
                          }
                        )}
                      </div>
                    </div>
                    <div className="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
                      <input
                        type="text"
                        className="woocommerce-Input woocommerce-Input--text input-text"
                        required=""
                        placeholder="Username"
                        name="userName"
                        id="userName"
                        onChange={handleChange}
                        autoComplete="off"
                        onBlur={() => validator.showMessageFor("userName")}
                      />
                      {validator.message(
                        "userName",
                        state.data.userName,
                        "required",
                        {
                          messages: {
                            required: `"userName" is Required`,
                          },
                        }
                      )}
                    </div>
                    <div className="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide form-row-password">
                      <input
                        className="woocommerce-Input woocommerce-Input--text input-text"
                        required=""
                        placeholder="Password"
                        type="password"
                        name="password"
                        id="password"
                        onChange={handleChange}
                        onBlur={() => validator.showMessageFor("password")}
                      />
                      {validator.message(
                        "password",
                        state.data.password,
                        "required",
                        {
                          messages: {
                            required: `"Password" is Required`,
                          },
                        }
                      )}
                    </div>
                    <div className="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide form-row-password">
                      <span className="password-input">
                        <input
                          className="woocommerce-Input woocommerce-Input--text input-text"
                          required=""
                          placeholder="Confirm Password"
                          type="password"
                          name="confirmPassword"
                          id="confirmPassword"
                          onChange={handleChange}
                          onBlur={() =>
                            validator.showMessageFor("confirmPassword")
                          }
                        />
                        <span className="show-password-input"></span>
                      </span>
                      {validator.message(
                        "confirmPassword",
                        state.data.confirmPassword,
                        `required|in:${state.data.password}`,
                        {
                          messages: {
                            required: `"Confirm Password" is Required`,
                            in: `Password doesn't match!`,
                          },
                        }
                      )}
                    </div>
                    <div className="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
                      <input
                        type="text"
                        className="woocommerce-Input woocommerce-Input--text input-text"
                        required=""
                        placeholder="Email"
                        type="email"
                        name="email"
                        id="email"
                        onChange={handleChange}
                        onBlur={() => validator.showMessageFor("email")}
                        autoComplete="off"
                      />
                      {validator.message(
                        "email",
                        state.data.email,
                        "required|email",
                        {
                          messages: {
                            required: `"Email" is Required`,
                            email: `"Email" is Invalid`,
                          },
                        }
                      )}
                    </div>
                    <div className="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
                      <input
                        type="text"
                        className="woocommerce-Input woocommerce-Input--text input-text"
                        required=""
                        placeholder="Phone Number"
                        onChange={handleChange}
                        name="phone"
                        id="phone"
                        onBlur={() => validator.showMessageFor("phone")}
                      />
                      {validator.message(
                        "phone",
                        state.data.phone,
                        "required",
                        {
                          messages: {
                            required: `"Phone" is Required`,
                          },
                        }
                      )}
                    </div>
                    <div className="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
                      <input
                        type="text"
                        className="woocommerce-Input woocommerce-Input--text input-text"
                        required=""
                        placeholder="Address"
                        name="address"
                        onChange={handleChange}
                        id="address"
                        onBlur={() => validator.showMessageFor("address")}
                      />
                      {validator.message(
                        "address",
                        state.data.address,
                        "required",
                        {
                          messages: {
                            required: `"Address" is Required`,
                          },
                        }
                      )}
                    </div>
                    <p className="form-row">
                      <button
                        className="woocommerce-Button button"
                        id="register"
                        name="register"
                        value="Register"
                        onClick={handleSubmit}
                      >
                        <span className="button__text">Register</span>
                      </button>
                    </p>
                  </form>
                </div>
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

export default Register;
