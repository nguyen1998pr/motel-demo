import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import { addHotSpot } from "../../libs/react-pannellum/dist";
import { useFormControls } from "../validiations/addInfoValidation";
import { helperTextStyles } from "../styles";

const types = [{ title: "info" }, { title: "scene" }];

export default function AddInfoDialog(props) {
  const [state, setState] = useState({
    hotSpot: {
      id: "",
      sceneId: "",
      pitch: "",
      type: "",
      yaw: "",
      text: "",
      URL: "",
    },
    isSceneType: false, // use to define "scene" type of hotspot when "Add"
    isInfoType: false, // use to define "info" type of hotspot when "Add"
  });

  useEffect(() => {
    setState((s) => ({
      hotSpot: {
        id: "",
        sceneId: "",
        pitch: "",
        type: "",
        yaw: "",
        text: "",
        URL: "",
      },
      isSceneType: false, // use to define "scene" type of hotspot when "Add"
      isInfoType: false, // use to define "info" type of hotspot when "Add"
    }));
  }, [props.open]);

  const { handleInputValue, handleFormSubmit, formIsValid, errors } =
    useFormControls({
      open: props.open,
      isInfo: state.isInfoType,
      isScene: state.isSceneType,
    });

  const onAddInfo = () => {
    addHotSpot({
      pitch: props.mouseEventToCoords["pitch"],
      yaw: props.mouseEventToCoords["yaw"],
      id: state.hotSpot["id"],
      sceneId: state.hotSpot["sceneId"],
      type: state.hotSpot["type"],
      text: state.hotSpot["text"],
      URL: state.hotSpot["URL"],
    });
    setState((s) => ({
      ...s,
      hotSpot: {
        id: "",
        sceneId: "",
        pitch: "",
        type: "",
        yaw: "",
        text: "",
        URL: "",
      },
      isSceneType: false,
      isInfoType: false,
    }));
    props.close(3, "Add Hotspot Successful !");
  };

  return (
    <Dialog // this is Add Info Dialog
      open={props.open}
      onClose={() => props.close(0)}
      aria-labelledby="form-dialog-title"
    >
      <form id="my-add-info">
        <DialogTitle id="form-dialog-title">Add Place Info</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add information for this place, enter a place name, then enter a
            description (if available).
          </DialogContentText>
          <Autocomplete
            id="type"
            options={types}
            onSelect={handleInputValue}
            getOptionLabel={(option) => option.title}
            onChange={(event, value) => {
              setState((s) => ({
                ...s,
                hotSpot: {
                  ...s.hotSpot,
                  type: value && value.title.toString(),
                },
                isSceneType:
                  value && value.title.toString() === "scene" ? true : false,
                isInfoType:
                  value && value.title.toString() === "info" ? true : false,
              }));
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                style={{ marginTop: "15px", marginBottom: "10px" }}
                margin="dense"
                FormHelperTextProps={{ classes: helperTextStyles() }}
                label="Type"
                variant="outlined"
                name="type"
                error={errors["type"]?.length > 0}
                onBlur={handleInputValue}
                onChange={handleInputValue}
                {...(errors["type"] && {
                  error: true,
                  helperText: errors["type"],
                })}
              />
            )}
          />
          <TextField
            style={{ marginTop: "15px", marginBottom: "10px" }}
            variant="outlined"
            margin="dense"
            id="title"
            name="title"
            error={errors["title"]?.length > 0}
            label="Title( ID )"
            type="text"
            autoComplete="off"
            onBlur={handleInputValue}
            FormHelperTextProps={{ classes: helperTextStyles() }}
            onChange={(e) => {
              handleInputValue(e);
              setState((s) => ({
                ...s,
                hotSpot: { ...s.hotSpot, id: e.target.value },
              }));
            }}
            {...(errors["title"] && {
              error: true,
              helperText: errors["title"],
            })}
            fullWidth
          />
          {state.isSceneType && (
            <Autocomplete
              id="scenes"
              options={props.fullScenesInformation}
              onSelect={handleInputValue}
              getOptionLabel={(option) => Object.keys(option)[0]}
              onChange={(event, value) =>
                setState((s) => ({
                  ...s,
                  hotSpot: {
                    ...s.hotSpot,
                    sceneId: value && Object.keys(value)[0],
                  },
                }))
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  name="sname"
                  style={{ marginTop: "15px", marginBottom: "10px" }}
                  FormHelperTextProps={{ classes: helperTextStyles() }}
                  label="Target Scene"
                  variant="outlined"
                  margin="dense"
                  error={errors["sname"]?.length > 0}
                  onBlur={handleInputValue}
                  onChange={handleInputValue}
                  {...(errors["sname"] && {
                    error: true,
                    helperText: errors["sname"],
                  })}
                />
              )}
            />
          )}
          <TextField
            style={{ marginTop: "15px", marginBottom: "10px" }}
            variant="outlined"
            margin="dense"
            id="description"
            label="Description"
            type="text"
            autoComplete="off"
            onChange={(e) =>
              setState((s) => ({
                ...s,
                hotSpot: { ...s.hotSpot, text: e.target.value },
              }))
            }
            multiline
            rows={3}
            fullWidth
          />
          {state.isInfoType && (
            <TextField
              style={{ marginTop: "15px", marginBottom: "10px" }}
              variant="outlined"
              margin="dense"
              id="url"
              label="URL( Optional )"
              type="text"
              autoComplete="off"
              onChange={(e) =>
                setState((s) => ({
                  ...s,
                  hotSpot: { ...s.hotSpot, URL: e.target.value },
                }))
              }
              fullWidth
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => props.close(0)} color="primary">
            Cancel
          </Button>
          <Button
            disabled={!formIsValid()}
            onClick={() => onAddInfo()}
            color="primary"
          >
            Add
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
