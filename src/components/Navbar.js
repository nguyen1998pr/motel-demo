import React, { Component } from "react";
import logo from "../images/logo.svg";
import { FaAlignRight } from "react-icons/fa";
import cancel from "../images/cancel.png";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { Link } from "react-router-dom";

let closeImg = {
  cursor: "pointer",
  float: "right",
  marginTop: "5px",
  width: "20px",
};

export default class Navbar extends Component {
  state = {
    isOpen: false,
    isOpenLogin: false,
    isOpenRegister: false,
  };

  handleToggle = () => {
    this.setState((s) => ({ ...s, isOpen: !this.state.isOpen }));
  };

  handleLoginToggle = () => {
    this.setState((s) => ({ ...s, isOpenLogin: !this.state.isOpenLogin }));
  };

  handleRegisterToggle = () => {
    this.setState((s) => ({
      ...s,
      isOpenRegister: !this.state.isOpenRegister,
    }));
  };

  render() {
    return (
      <>
        <nav className="navbar">
          <div className="nav-center">
            <div className="nav-header">
              <Link to="/">
                <img src={logo} alt="RentNStudy" />
              </Link>
              <button
                type="button"
                className="nav-btn"
                onClick={this.handleToggle}
              >
                <FaAlignRight className="nav-icon" />
              </button>
            </div>
            <ul
              className={this.state.isOpen ? "nav-links show-nav" : "nav-links"}
            >
              <div className="left">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/apartments">Apartments</Link>
                </li>
              </div>
              <div className="right">
                <li>
                  <p
                    onClick={this.handleLoginToggle}
                    style={{ cursor: "pointer" }}
                  >
                    Login
                  </p>
                </li>
                <li>
                  <p
                    onClick={this.handleRegisterToggle}
                    style={{ cursor: "pointer" }}
                  >
                    Register
                  </p>
                </li>
              </div>
            </ul>
          </div>
        </nav>
        <Dialog
          open={this.state.isOpenLogin}
          fullWidth
          maxWidth="xs"
          // onClose={}
        >
          <DialogTitle id="alert-dialog-title">
            <img
              alt=""
              src={cancel}
              style={closeImg}
              onClick={this.handleLoginToggle}
            />
          </DialogTitle>
          <DialogContent>
            <Login />
          </DialogContent>
        </Dialog>
        <Dialog
          open={this.state.isOpenRegister}
          fullWidth
          maxWidth="md"
          // onClose={}
        >
          <DialogTitle id="alert-dialog-title">
            <img
              alt=""
              src={cancel}
              style={closeImg}
              onClick={this.handleRegisterToggle}
            />
          </DialogTitle>
          <DialogContent>
            <Register />
          </DialogContent>
        </Dialog>
      </>
    );
  }
}
