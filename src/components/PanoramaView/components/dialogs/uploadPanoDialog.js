import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import * as apiServices from "../../../../store/motel/services";
import { DropzoneArea } from "material-ui-dropzone";
import Button from "@mui/material/Button";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  item: {
    paddingLeft: "0px !important",
    paddingTop: "0px !important",
    marginLeft: "60px",
    marginTop: "10px",
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

export default function UploadPanorama(props) {
  const classes = useStyles();
  const id = window.location.pathname.split("/")[3];
  const imgSrc = `${process.env.REACT_APP_API_URL}/uploads/properties/`;
  const [state, setState] = useState({ data: {}, panoImages: [] });

  useEffect(() => {
    setState((s) => ({
      ...s,
      data: {
        ...props.apartmentInfo,
        panoImages: props.apartmentInfo.panoImages?.map((item) => {
          return `${imgSrc + item.name}`;
        }),
      },
    }));
  }, [props.apartmentInfo]);

  const handlePanoImage = (image) => {
    setState((s) => ({
      ...s,
      panoImages: image,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const btn = document.querySelector(".submit-button");
    document.getElementById("submitDialog").disabled = true;
    btn.classList.add("button--loading");

    const formData = new FormData();
    const data = {
      ...state.data,
      panoImages: [],
    };
    formData.append("thisProp", JSON.stringify({ fields: { ...data } }));
    state.panoImages.map((image) => {
      formData.append("photo", image, image.name);
    });

    const request = apiServices.editPanoImage(id, formData);
    request
      .then((res) => {
        setTimeout(function () {
          btn.classList.remove("button--loading");
          props.close({
            open: true,
            message: "Image Upload Success!",
            type: "success",
            reload: true,
          });
        }, 2000);
      })
      .catch((err) => {});
  };

  return (
    <Dialog
      open={props.open}
      onClose={() => props.close(false)}
      aria-labelledby="form-dialog-title"
      maxWidth="sm"
      fullWidth
      disable
    >
      <div style={{ padding: "20px" }}>
        {state.data.panoImages?.length ? (
          <DropzoneArea
            acceptedFiles={["image/*"]}
            filesLimit={10}
            initialFiles={state.data.panoImages}
            name="panoImages"
            onChange={handlePanoImage}
            showPreviews
            showPreviewsInDropzone={false}
            onAdd={(fileObjs) => console.log("Added Files:", fileObjs)}
            dropzoneClass={classes.dropzone}
            previewGridClasses={{
              item: classes.item,
              container: classes.container,
            }}
          />
        ) : (
          <DropzoneArea
            acceptedFiles={["image/*"]}
            filesLimit={10}
            name="panoImages"
            onChange={handlePanoImage}
            showPreviews
            showPreviewsInDropzone={false}
            onAdd={(fileObjs) => console.log("Added Files:", fileObjs)}
            dropzoneClass={classes.dropzone}
            previewGridClasses={{
              item: classes.item,
              container: classes.container,
            }}
          />
        )}
      </div>
      <DialogActions>
        <Button onClick={() => props.close(false)} color="primary">
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          color="success"
          variant="contained"
          className="woocommerce-Button submit-button button"
          id="submitDialog"
        >
          <span className="button__mui">Submit</span>
        </Button>
      </DialogActions>
    </Dialog>
  );
}
