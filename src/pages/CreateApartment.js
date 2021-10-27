import React, { useState, useEffect, useContext } from "react";
import { ApartmentContext } from "../context";
import * as apiServices from "../store/motel/services";
import { DropzoneArea } from "material-ui-dropzone";
import { makeStyles } from "@mui/styles";
import useValidator from "../utils/useValidator";
import "../css/custom.css";

const useStyles = makeStyles({
  item: {
    paddingLeft: "0px !important",
    // paddingTop: "0px !important",
    marginLeft: "64px",
  },
  dropzone: {
    minHeight: "100px",
    borderColor: "lightgray",
  },
  container: {
    marginTop: "5px",
    overflow: "auto",
    overflowX: "hidden",
    maxHeight: "500px",
    justifyContent: "space-around",
  },
});

export default function CreateApartment(props) {
  const classes = useStyles();
  const context = useContext(ApartmentContext);
  const { handleEditApart } = context;
  const [validator, showValidationMessage] = useValidator();
  const [state, setState] = useState({
    data: {
      pets: false,
      featured: false,
      breakfast: false,
      type: "Single",
      images: [],
      panoImages: [],
    },
    notify: { vertical: "top", horizontal: "right" },
  });

  useEffect(() => {
    if (props.props.isEdit) {
      const request = apiServices.apartmentEdit(props.props.apartId);
      request
        .then((res) => {
          setState((s) => ({
            ...s,
            data: {
              ...res.data.prop.fields,
              extras: res.data.prop.fields.extras
                ?.map((item) => item)
                .join("\n"),
              images: res.data.prop.fields.images.map(
                (item) =>
                  `${process.env.REACT_APP_API_URL}/uploads/properties/${item.name}`
              ),
            },
          }));
        })
        .catch((err) => {});
    }
  }, []);

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

  const handleCreate = (event) => {
    event.preventDefault();

    if (validator.allValid()) {
      const btn = document.querySelector(".submit-button");
      document.getElementById("submit").disabled = true;
      btn.classList.add("button--loading");

      const formData = new FormData();
      const data = {
        ...state.data,
        extras: state.data["extras"]?.trim().split("\n"),
      };
      formData.append("thisProp", JSON.stringify({ fields: { ...data } }));
      state.images.map((image, index) => {
        formData.append("photo", image, image.name);
      });

      const request = apiServices.addApartment(formData);
      request
        .then((res) => {
          setTimeout(function () {
            btn.classList.remove("button--loading");
            props.callBack({
              open: true,
              message: "Apartment Created!",
              type: "success",
              reload: true,
            });
          }, 2000);
        })
        .catch((err) => {});
    } else {
      showValidationMessage(true);
    }
  };

  const handleEdit = (event) => {
    event.preventDefault();

    const btn = document.querySelector(".submit-button");
    document.getElementById("submit").disabled = true;
    btn.classList.add("button--loading");

    const formData = new FormData();
    const data = {
      ...state.data,
      images: [],
      extras: state.data["extras"]?.trim().split("\n"),
    };
    formData.append("thisProp", JSON.stringify({ fields: { ...data } }));
    state.images.map((image) => {
      formData.append("photo", image, image.name);
    });

    const request = apiServices.editApartment(props.props.apartId, formData);
    request
      .then((res) => {
        setTimeout(function () {
          btn.classList.remove("button--loading");
          handleEditApart();
          props.callBack({
            open: true,
            message: "Apartment Modified!",
            type: "success",
            reload: true,
          });
        }, 2000);
      })
      .catch((err) => {});
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
                    border: "gray",
                  }}
                >
                  <h2>Normal Images</h2>
                  <div>
                    {props.props.isAdd || !state.data.images.length ? (
                      <>
                        <DropzoneArea
                          acceptedFiles={["image/*"]}
                          filesLimit={10}
                          name="images"
                          showAlerts={false}
                          onChange={handleImage}
                          showPreviews
                          showPreviewsInDropzone={false}
                          onAdd={(fileObjs) =>
                            console.log("Added Files:", fileObjs)
                          }
                          dropzoneClass={classes.dropzone}
                          previewGridClasses={{
                            item: classes.item,
                            container: classes.container,
                          }}
                        />
                      </>
                    ) : null}
                    {state.data.images.length && props.props.isEdit ? (
                      <DropzoneArea
                        acceptedFiles={["image/*"]}
                        filesLimit={10}
                        name="images"
                        initialFiles={[...state.data.images]}
                        showAlerts={false}
                        onChange={handleImage}
                        showPreviews
                        showPreviewsInDropzone={false}
                        onAdd={(fileObjs) =>
                          console.log("Added Files:", fileObjs)
                        }
                        dropzoneClass={classes.dropzone}
                        previewGridClasses={{
                          item: classes.item,
                          container: classes.container,
                        }}
                      />
                    ) : null}
                  </div>
                </div>
                <div>
                  <h2>
                    {props.props.isEdit ? "Edit Apartment" : "Create Apartment"}
                  </h2>
                  <form className="woocommerce-form woocommerce-form-login login">
                    <label>
                      Apartment Name&nbsp;<span className="required">*</span>
                    </label>
                    <div className="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
                      <input
                        type="text"
                        spellCheck="false"
                        className="woocommerce-Input woocommerce-Input--text input-text"
                        defaultValue={
                          props.props.isEdit ? state.data.apartmentName : ""
                        }
                        placeholder="Apartment Name"
                        name="apartmentName"
                        id="apartmentName"
                        onChange={handleChange}
                        autoComplete="off"
                        onBlur={() => validator.showMessageFor("apartmentName")}
                      />
                      {validator.message(
                        "apartmentName",
                        state.data.apartmentName,
                        "required",
                        {
                          messages: {
                            required: `"Apartment Name" is Required`,
                          },
                        }
                      )}
                    </div>
                    <label>
                      Type&nbsp;<span className="required">*</span>
                    </label>
                    <div className="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
                      <select
                        onChange={handleChange}
                        name="type"
                        id="type"
                        defaultValue={
                          props.props.isEdit ? state.data.type : "Single"
                        }
                      >
                        <option value="Single">Single</option>
                        <option value="Double">Double</option>
                        <option value="Multi">Multi</option>
                      </select>
                    </div>
                    <div style={{ display: "flex" }}>
                      <div className="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
                        <label>
                          Sỉze&nbsp;<span className="required">*</span>
                        </label>
                        <input
                          type="text"
                          spellCheck="false"
                          className="woocommerce-Input woocommerce-Input--text input-text"
                          defaultValue={
                            props.props.isEdit ? state.data.size : ""
                          }
                          placeholder="Size (m2)"
                          name="size"
                          id="size"
                          onChange={handleChange}
                          autoComplete="off"
                          onBlur={() => validator.showMessageFor("size")}
                        />
                        {validator.message(
                          "size",
                          state.data.size,
                          "required|numeric|min:20,num",
                          {
                            messages: {
                              required: `"Size" is Required`,
                              numeric: `"Size" must be a number`,
                            },
                          }
                        )}
                      </div>
                      <div className="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
                        <label>
                          Price&nbsp;<span className="required">*</span>
                        </label>
                        <input
                          type="text"
                          spellCheck="false"
                          className="woocommerce-Input woocommerce-Input--text input-text"
                          defaultValue={
                            props.props.isEdit ? state.data.price : ""
                          }
                          placeholder="Price (usd)"
                          name="price"
                          id="price"
                          onChange={handleChange}
                          autoComplete="off"
                          onBlur={() => validator.showMessageFor("price")}
                        />
                        {validator.message(
                          "price",
                          state.data.price,
                          "required|numeric|min:0,num",
                          {
                            messages: {
                              required: `"Price" is Required`,
                              numeric: `"Price" must be a number`,
                            },
                          }
                        )}
                      </div>
                    </div>
                    <div className="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
                      <label>
                        Capacity&nbsp;<span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        spellCheck="false"
                        className="woocommerce-Input woocommerce-Input--text input-text"
                        defaultValue={
                          props.props.isEdit ? state.data.capacity : ""
                        }
                        placeholder="Capacity (person)"
                        name="capacity"
                        id="capacity"
                        onChange={handleChange}
                        autoComplete="off"
                        onBlur={() => validator.showMessageFor("capacity")}
                      />
                      {validator.message(
                        "capacity",
                        state.data.capacity,
                        "required|numeric|min:1,num",
                        {
                          messages: {
                            required: `"Capacity" is Required`,
                            numeric: `"Capacity" must be a number`,
                          },
                        }
                      )}
                    </div>
                    <div className="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide form-row-password">
                      <label>
                        Desciption&nbsp;<span className="required">*</span>
                      </label>
                      <textarea
                        className="woocommerce-Input woocommerce-Input--text input-text"
                        spellCheck="false"
                        defaultValue={
                          props.props.isEdit ? state.data.description : ""
                        }
                        rows="5"
                        placeholder="Description"
                        name="description"
                        id="description"
                        onChange={handleChange}
                        onBlur={() => validator.showMessageFor("description")}
                      />
                      {validator.message(
                        "description",
                        state.data.capacity,
                        "required",
                        {
                          messages: {
                            required: `"Description" is Required`,
                          },
                        }
                      )}
                    </div>
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
                            checked={props.props.isEdit && state.data.pets}
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
                            checked={props.props.isEdit && state.data.breakfast}
                            type="checkbox"
                            id="breakfast"
                            onChange={handleCheck}
                          />
                          <span style={{ paddingLeft: "10px" }}>Breakfast</span>
                        </label>
                        <label className="woocommerce-form__label woocommerce-form__label-for-checkbox woocommerce-form-login__rememberme">
                          <input
                            className="woocommerce-form__input woocommerce-form__input-checkbox"
                            checked={props.props.isEdit && state.data.featured}
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
                          defaultValue={
                            props.props.isEdit ? state.data.extras : ""
                          }
                          spellCheck="false"
                          rows="5"
                          placeholder="Extras"
                          name="extras"
                          id="extras"
                          onChange={handleChange}
                        />
                      </span>
                    </p>
                    <p className="form-row">
                      <button
                        className="woocommerce-Button submit-button button"
                        id="submit"
                        name="submit"
                        value="submit"
                        onClick={props.props.isEdit ? handleEdit : handleCreate}
                      >
                        <span className="button__text">Submit</span>
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
