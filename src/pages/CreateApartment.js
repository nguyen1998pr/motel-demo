import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { DropzoneArea } from "material-ui-dropzone";
import * as apiServices from "../store/motel/services";
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
  const [state, setState] = useState({
    data: {
      pets: false,
      featured: false,
      breakfast: false,
      images: [],
      panoImages: [],
    },
    notify: { vertical: "top", horizontal: "right" },
  });

  useEffect(() => {
    if (props.props.isEdit) {
      const request = apiServices.apartmentInfo(props.props.apartId);
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
                  `http://localhost:8080/uploads/properties/${item.name}`
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
    request.then((res) => {}).catch((err) => {});
  };

  const handleEdit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    const data = {
      ...state.data,
      images: [],
      extras: state.data["extras"]?.trim().split("\n"),
    };
    formData.append("thisProp", JSON.stringify({ fields: { ...data } }));
    state.images.map((image, index) => {
      formData.append("photo", image, image.name);
    });

    const request = apiServices.editApartment(props.props.apartId, formData);
    request.then((res) => {}).catch((err) => {});
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
                  {/* <h2 style={{ marginTop: "25px" }}>Panorama Images</h2>
                  <div
                    style={{
                      height: "250px",
                      overflow: "auto",
                      overflowX: "hidden",
                    }}
                  >
                    <DropzoneArea
                      filesLimit={10}
                      name="panoImages"
                      showAlerts={false}
                      onChange={handlePanoImage}
                      showPreviews
                      showPreviewsInDropzone={false}
                      onAdd={(fileObjs) =>
                        console.log("Added Files:", fileObjs)
                      }
                      dropzoneClass={classes.dropzone}
                      previewGridClasses={{ item: classes.item }}
                    />
                  </div> */}
                </div>
                <div>
                  <h2>
                    {props.props.isEdit ? "Edit Apartment" : "Create Apartment"}
                  </h2>
                  <form className="woocommerce-form woocommerce-form-login login">
                    <label>
                      Apartment Name&nbsp;<span className="required">*</span>
                    </label>
                    <p className="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
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
                      />
                    </p>
                    <label>
                      Type&nbsp;<span className="required">*</span>
                    </label>
                    <p className="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
                      <input
                        type="text"
                        spellCheck="false"
                        className="woocommerce-Input woocommerce-Input--text input-text"
                        defaultValue={props.props.isEdit ? state.data.type : ""}
                        placeholder="Type"
                        name="type"
                        id="type"
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
                          defaultValue={
                            props.props.isEdit ? state.data.size : ""
                          }
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
                          defaultValue={
                            props.props.isEdit ? state.data.price : ""
                          }
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
                        defaultValue={
                          props.props.isEdit ? state.data.capacity : ""
                        }
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
                        defaultValue={
                          props.props.isEdit ? state.data.description : ""
                        }
                        rows="5"
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
                        className="woocommerce-Button button"
                        id="register"
                        name="register"
                        value="Register"
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
