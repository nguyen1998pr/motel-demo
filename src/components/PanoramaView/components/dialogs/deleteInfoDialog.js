import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { removeHotSpot } from "../../libs/react-pannellum/dist";
import Button from "@mui/material/Button";
import { useFormControls } from "../validiations/deleteInfoValidation";
import { helperTextStyles } from "../styles";

export default function DeleteInfoDialog(props) {
  const [state, setState] = useState({
    scene: {
      // use to save / retrieve config of scene
      sceneId: "",
      config: {
        type: "equirectangular",
        text: "",
        title: "",
        author: "",
        imageSource: "",
      },
    },
    hotSpot: {
      // use to save config of hotSpot
      id: "",
      sceneId: "",
      pitch: "",
      type: "",
      yaw: "",
      text: "",
      URL: "",
    },
  });

  const { handleInputValue, handleFormSubmit, formIsValid, errors } =
    useFormControls({
      open: props.open,
      sceneID: state.hotSpot["sceneId"],
    });

  const onDeleteInfo = () => {
    removeHotSpot(state.hotSpot["id"], state.hotSpot["sceneId"]);
    props.close(3, "Delete Hotspot Successful !");
  };

  return (
    <Dialog // this is Delete Info Dialog
      open={props.open}
      onClose={() => props.close(3)}
      aria-labelledby="form-dialog-title"
    >
      <form id="my-delete-info">
        <DialogTitle id="form-dialog-title">Delete Info</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To delete info, first choice scene name, then choice hotspot.
          </DialogContentText>
          <Autocomplete
            id="scenes"
            options={props.fullScenesInformation}
            getOptionLabel={(option) => Object.keys(option)[0]}
            onChange={(event, value) => {
              handleInputValue({
                target: {
                  name: "sceneName",
                  value: value ? Object.keys(value)[0] : "",
                },
              });
              setState((s) => ({
                ...s,
                scene: value ? Object.values(value)[0] : {},
                hotSpot: {
                  ...s.hotSpot,
                  sceneId: value ? Object.keys(value)[0] : "",
                },
              }));
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Scene Name"
                variant="outlined"
                margin="dense"
                style={{ marginTop: "15px", marginBottom: "10px" }}
                name="sceneName"
                FormHelperTextProps={{ classes: helperTextStyles() }}
                error={errors["sceneName"]?.length > 0}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                  }
                }}
                onBlur={handleInputValue}
                onChange={handleInputValue}
                {...(errors["sceneName"] && {
                  error: true,
                  helperText: errors["sceneName"],
                })}
              />
            )}
          />
          <Autocomplete
            disabled={state.scene["hotSpots"] ? false : true}
            id="hotspot"
            options={state.scene["hotSpots"] ? state.scene["hotSpots"] : []}
            getOptionLabel={(option) => option.id}
            onChange={(event, value) => {
              handleInputValue({
                target: {
                  name: "hotSpotName",
                  value: value ? Object.keys(value)[0] : "",
                },
              });
              setState((s) => ({
                ...s,
                hotSpot: {
                  ...s.hotSpot,
                  id: value ? value.id.toString() : "",
                },
              }));
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                style={{ marginTop: "15px", marginBottom: "10px" }}
                label="Hotspot Name"
                variant="outlined"
                name="hotSpotName"
                error={errors["hotSpotName"]?.length > 0}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                  }
                }}
                onBlur={handleInputValue}
                onChange={handleInputValue}
                FormHelperTextProps={{ classes: helperTextStyles() }}
                {...(errors["hotSpotName"] && {
                  error: true,
                  helperText: errors["hotSpotName"],
                })}
                margin="dense"
              />
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => props.close(3)} color="primary">
            Cancel
          </Button>
          <Button
            disabled={!formIsValid()}
            onClick={() => onDeleteInfo()}
            color="primary"
          >
            Delete
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
