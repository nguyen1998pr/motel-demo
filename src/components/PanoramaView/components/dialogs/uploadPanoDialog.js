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
  const [state, setState] = useState({ data: {}, panoImages: [] });

  useEffect(() => {
    const request = apiServices.apartmentInfo(id);
    request
      .then((res) => {
        setState((s) => ({
          ...s,
          data: {
            ...s.data,
            ...res.data.prop.fields,
          },
        }));
      })
      .catch((err) => {});
  }, []);

  const handlePanoImage = (image) => {
    setState((s) => ({
      ...s,
      panoImages: image,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    const data = {
      ...state.data,
    };
    formData.append("thisProp", JSON.stringify({ fields: { ...data } }));
    state.panoImages.map((image) => {
      formData.append("photo", image, image.name);
    });

    const request = apiServices.editPanoImage(id, formData);
    request.then((res) => {}).catch((err) => {});
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
        <DropzoneArea
          acceptedFiles={["image/*"]}
          filesLimit={10}
          name="panoImages"
          showAlerts={false}
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
      </div>
      <DialogActions>
        <Button onClick={() => props.close(false)} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
