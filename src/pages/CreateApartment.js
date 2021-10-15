import React, { useState } from "react";
import { DropzoneArea } from "material-ui-dropzone";
import "../css/custom.css";

export default function CreateApartment() {
  const [state, setState] = useState({
    data: {
      pets: false,
      featured: false,
      breakfast: false,
    },
    images: [],
    notify: { vertical: "top", horizontal: "right" },
  });
  const formData = new FormData();

  const handleChange = (event) => {
    setState((s) => ({
      ...s,
      data: { ...state.data, [event.target.name]: event.target.value },
    }));
  };

  const handleCheck = (event) => {
    setState((s) => ({
      ...s,
      data: { ...state.data, [event.target.name]: event.target.checked },
    }));
  };

  const handleImage = (image) => {
    setState((s) => ({
      ...s,
      images: image,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      ...state.data,
      extras: state.data["extras"]?.trim().split("\n"),
    };
    formData.append("thisProp", JSON.stringify(data));
    state.images.map((image, index) => {
      formData.append("photo", image, image.name);
    });
    console.log(formData.get("photo"), data);
  };

  return (
    <>
      <div className="woocommerce">
        <div className="customer-register">
          <div className="martfury-login-tabs">
            <div className="tabs-content">
              <div className="tabs-panel active">
                <div
                  style={{
                    width: "50%",
                    padding: "60px 0",
                    border: "gray",
                  }}
                >
                  <DropzoneArea
                    filesLimit={100}
                    name="images"
                    showAlerts={false}
                    onChange={handleImage}
                    showPreviews
                    showPreviewsInDropzone={false}
                    onAdd={(fileObjs) => console.log("Added Files:", fileObjs)}
                  />
                </div>
                <div>
                  <h2>Create Apartment</h2>
                  <form className="woocommerce-form woocommerce-form-login login">
                    <label>
                      Apartment Name&nbsp;<span className="required">*</span>
                    </label>
                    <p className="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
                      <input
                        type="text"
                        spellCheck="false"
                        className="woocommerce-Input woocommerce-Input--text input-text"
                        required=""
                        placeholder="Apartment Name"
                        name="apartmentName"
                        id="apartmentName"
                        onChange={handleChange}
                        autoComplete="off"
                      />
                    </p>
                    <div style={{ display: "flex" }}>
                      <p className="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
                        <label>
                          Sỉze&nbsp;<span className="required">*</span>
                        </label>
                        <input
                          type="text"
                          spellCheck="false"
                          className="woocommerce-Input woocommerce-Input--text input-text"
                          required=""
                          placeholder="Size (m2)"
                          name="size"
                          id="size"
                          onChange={handleChange}
                          autoComplete="off"
                        />
                      </p>
                      <p className="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
                        <label>
                          Price&nbsp;<span className="required">*</span>
                        </label>
                        <input
                          type="text"
                          spellCheck="false"
                          className="woocommerce-Input woocommerce-Input--text input-text"
                          required=""
                          placeholder="Price (usd)"
                          name="price"
                          id="price"
                          onChange={handleChange}
                          autoComplete="off"
                        />
                      </p>
                    </div>
                    <p className="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
                      <label>
                        Capacity&nbsp;<span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        spellCheck="false"
                        className="woocommerce-Input woocommerce-Input--text input-text"
                        required=""
                        placeholder="Capacity (person)"
                        name="capacity"
                        id="capacity"
                        onChange={handleChange}
                        autoComplete="off"
                      />
                    </p>
                    <p className="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide form-row-password">
                      <label>
                        Desciption&nbsp;<span className="required">*</span>
                      </label>
                      <textarea
                        className="woocommerce-Input woocommerce-Input--text input-text"
                        spellCheck="false"
                        required=""
                        rows="4"
                        placeholder="Description"
                        name="description"
                        id="description"
                        onChange={handleChange}
                      />
                    </p>
                    <p
                      className="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide"
                      style={{ display: "inline-grid", width: "100%" }}
                    >
                      <label>
                        Allow&nbsp;<span className="required">*</span>
                      </label>
                      <span
                        className="woocommerce-form-row__remember"
                        style={{
                          display: "flex",
                          justifyContent: "space-around",
                        }}
                      >
                        <label className="woocommerce-form__label woocommerce-form__label-for-checkbox woocommerce-form-login__rememberme">
                          <input
                            className="woocommerce-form__input woocommerce-form__input-checkbox"
                            name="pets"
                            spellCheck="false"
                            type="checkbox"
                            id="pets"
                            onChange={handleCheck}
                          />
                          <span style={{ paddingLeft: "10px" }}>Pets</span>
                        </label>
                        <label className="woocommerce-form__label woocommerce-form__label-for-checkbox woocommerce-form-login__rememberme">
                          <input
                            className="woocommerce-form__input woocommerce-form__input-checkbox"
                            name="breakfast"
                            type="checkbox"
                            id="breakfast"
                            onChange={handleCheck}
                          />
                          <span style={{ paddingLeft: "10px" }}>Breakfast</span>
                        </label>
                        <label className="woocommerce-form__label woocommerce-form__label-for-checkbox woocommerce-form-login__rememberme">
                          <input
                            className="woocommerce-form__input woocommerce-form__input-checkbox"
                            name="featured"
                            type="checkbox"
                            id="featured"
                            onChange={handleCheck}
                          />
                          <span style={{ paddingLeft: "10px" }}>Featured</span>
                        </label>
                      </span>
                    </p>
                    <p className="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide form-row-password">
                      <label>
                        Extras&nbsp;<span className="required">*</span>
                      </label>
                      <span className="password-input">
                        <textarea
                          className="woocommerce-Input woocommerce-Input--text input-text"
                          required=""
                          spellCheck="false"
                          rows="4"
                          placeholder="Extras"
                          name="extras"
                          id="extras"
                          onChange={handleChange}
                        />
                      </span>
                    </p>
                    <p className="form-row">
                      <button
                        className="woocommerce-Button button"
                        id="register"
                        name="register"
                        value="Register"
                        onClick={handleSubmit}
                      >
                        <span className="button__text">Create</span>
                      </button>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
