import React, { useState, useEffect, useContext } from "react";
import Login from "../pages/Login";
import { ApartmentContext } from "../context";
import Register from "../pages/Register";
import Avatar from "../components/Avatar";
import { Link } from "react-router-dom";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import cancel from "../images/cancel.png";
import logo from "../images/logo.svg";
import { FaAlignRight } from "react-icons/fa";

let closeImg = {
  cursor: "pointer",
  float: "right",
  marginTop: "5px",
  width: "20px",
};

const Navbar = () => {
  const context = useContext(ApartmentContext);
  const { getLoginStatus, getUserStatus } = context;
  const user = getUserStatus();
  const [state, setState] = useState({
    user: {},
    isOpen: false,
    isOpenLogin: false,
    isOpenRegister: false,
    isLoggedIn: false,
  });

  useEffect(() => {}, []);

  const handleToggle = () => {
    setState((s) => ({ ...s, isOpen: !state.isOpen }));
  };

  const handleLoginToggle = () => {
    setState((s) => ({ ...s, isOpenLogin: !state.isOpenLogin }));
  };

  const handleRegisterToggle = () => {
    setState((s) => ({
      ...s,
      isOpenRegister: !state.isOpenRegister,
    }));
  };

  const handleCallback = (data) => {
    if (data.type === "login")
      setState((s) => ({
        ...s,
        isOpenLogin: data.open,
        isLoggedIn: data.loggedIn,
      }));
    if (data.type === "register")
      setState((s) => ({
        ...s,
        isOpenRegister: data.open,
      }));
    if (data.type === "logout")
      setState((s) => ({
        ...s,
        isLoggedIn: data.isLoggedIn,
      }));
  };
  return (
    <>
      <nav className="navbar">
        <div className="nav-center">
          <div className="nav-header">
            <Link to="/h">
              <img src={logo} alt="RentNStudy" />
            </Link>
            <button type="button" className="nav-btn" onClick={handleToggle}>
              <FaAlignRight className="nav-icon" />
            </button>
          </div>
          <ul className={state.isOpen ? "nav-links show-nav" : "nav-links"}>
            <div className="left">
              <li>
                <Link to="/h">Home</Link>
              </li>
              <li>
                <Link to="/h/apartments">Apartments</Link>
              </li>
            </div>
            <div className="right">
              {user.infoLoading ? null : !getLoginStatus() ? (
                <>
                  <li>
                    <p
                      onClick={handleLoginToggle}
                      style={{ cursor: "pointer" }}
                    >
                      Login
                    </p>
                  </li>
                  <li>
                    <p
                      onClick={handleRegisterToggle}
                      style={{ cursor: "pointer" }}
                    >
                      Register
                    </p>
                  </li>
                </>
              ) : (
                <Avatar user={user} callBack={handleCallback} />
              )}
            </div>
          </ul>
        </div>
      </nav>
      <Dialog open={state.isOpenLogin} fullWidth maxWidth="xs">
        <DialogTitle id="alert-dialog-title">
          <img
            alt=""
            src={cancel}
            style={closeImg}
            onClick={handleLoginToggle}
          />
        </DialogTitle>
        <DialogContent>
          <Login callBack={handleCallback} />
        </DialogContent>
      </Dialog>
      <Dialog open={state.isOpenRegister} fullWidth maxWidth="md">
        <DialogTitle id="alert-dialog-title">
          <img
            alt=""
            src={cancel}
            style={closeImg}
            onClick={handleRegisterToggle}
          />
        </DialogTitle>
        <DialogContent>
          <Register callBack={handleCallback} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Navbar;
