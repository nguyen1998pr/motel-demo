import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { addScene } from "../../libs/react-pannellum/dist";
import { defaultConfig } from "../../views/default-config";
import { useFormControls } from "../validiations/addSceneValidation";
import { helperTextStyles } from "../styles";
import ImageGallery from "react-image-gallery";

export default function AddSceneDialog(props) {
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
        hotSpots: [],
      },
    },
    fullScenesInformation: [],
  });

  useEffect(() => {
    setState((s) => ({
      scene: {
        // use to save / retrieve config of scene
        sceneId: "",
        config: {
          type: "equirectangular",
          text: "",
          title: "",
          author: "",
          imageSource: "",
          hotSpots: [],
        },
      },
      fullScenesInformation: [],
    }));
  }, [props.open]);

  const { handleInputValue, handleFormSubmit, formIsValid, errors } =
    useFormControls({
      open: props.open,
    });

  const addSceneSuccess = () => {
    setState((s) => ({
      ...s,
      snackbarAction: {
        isOpen: true,
        message: "Add Scene Successful !",
        type: "success",
      },
    }));
  };

  const onAddScene = () => {
    if (!props.fullScenesInformation?.length) {
      setState((s) => ({
        ...s,
        fullScenesInformation: [
          {
            [s.scene["sceneId"]]: {
              ...s.scene["config"],
            },
          },
        ],
      }));
      props.close(1, {
        ...state,
        fullScenesInformation: [
          {
            [state.scene["sceneId"]]: {
              ...state.scene["config"],
            },
          },
        ],
      });
    } else {
      addScene(state.scene.sceneId, state.scene["config"], addSceneSuccess);
      props.close(3, "Add Scene Successful !");
    }
  };

  return (
    <Dialog // this is Add Scene Dialog
      open={props.open}
      onClose={() => props.close(3)}
      aria-labelledby="form-dialog-title"
    >
      <form id="my-add-scene">
        <DialogTitle id="form-dialog-title">Add Scene</DialogTitle>
        <DialogContent style={{ display: "flex" }}>
          <div style={{ maxHeight: "200px" }}>
            <ImageGallery
              items={[
                {
                  original: "https://picsum.photos/id/1018/1000/600/",
                  thumbnail: "https://picsum.photos/id/1018/250/150/",
                },
                {
                  original: "https://picsum.photos/id/1015/1000/600/",
                  thumbnail: "https://picsum.photos/id/1015/250/150/",
                },
                {
                  original: "https://picsum.photos/id/1019/1000/600/",
                  thumbnail: "https://picsum.photos/id/1019/250/150/",
                },
              ]}
            />
          </div>
          <div>
            <DialogContentText>
              To add scene, enter a scene id, scene name, then enter the source
              of scene ( link ).
            </DialogContentText>
            <TextField
              style={{ marginTop: "15px", marginBottom: "10px" }}
              FormHelperTextProps={{ classes: helperTextStyles() }}
              variant="outlined"
              margin="dense"
              id="scene-id"
              label="Scene ID"
              type="text"
              autoComplete="off"
              onChange={(e) => {
                handleInputValue(e);
                setState((s) => ({
                  ...s,
                  scene: {
                    ...s.scene,
                    sceneId: e.target.value,
                  },
                }));
              }}
              name="sceneID"
              error={errors["sceneID"]?.length > 0}
              onBlur={handleInputValue}
              {...(errors["sceneID"] && {
                error: true,
                helperText: errors["sceneID"],
              })}
              fullWidth
            />
            <div style={{ display: "flex", alignItems: "baseline" }}>
              <TextField
                style={{ marginTop: "15px", marginBottom: "10px" }}
                fullWidth
                FormHelperTextProps={{ classes: helperTextStyles() }}
                variant="outlined"
                margin="dense"
                disabled
                size="small"
                id="image-source"
                label="Image Source"
                type="text"
                autoComplete="off"
                onChange={(e) => {
                  handleInputValue(e);
                  setState((s) => ({
                    ...s,
                    scene: {
                      ...s.scene,
                      config: {
                        ...defaultConfig,
                        ...s.scene["config"],
                        imageSource: e.target.value,
                      },
                    },
                  }));
                }}
                name="imageSource"
                error={errors["imageSource"]?.length > 0}
                onBlur={handleInputValue}
                {...(errors["imageSource"] && {
                  error: true,
                  helperText: errors["imageSource"],
                })}
              />
              <DialogActions>
                <Button size="small" variant="outlined" color="success">
                  Select
                </Button>
              </DialogActions>
            </div>
            <TextField
              style={{ marginTop: "15px", marginBottom: "10px" }}
              FormHelperTextProps={{ classes: helperTextStyles() }}
              variant="outlined"
              margin="dense"
              id="image-name"
              label="Scene Name"
              type="text"
              autoComplete="off"
              onChange={(e) => {
                handleInputValue(e);
                setState((s) => ({
                  ...s,
                  scene: {
                    ...s.scene,
                    config: {
                      ...defaultConfig,
                      ...s.scene["config"],
                      title: e.target.value,
                    },
                  },
                }));
              }}
              name="sceneName"
              error={errors["sceneName"]?.length > 0}
              onBlur={handleInputValue}
              {...(errors["sceneName"] && {
                error: true,
                helperText: errors["sceneName"],
              })}
              fullWidth
            />
            <TextField
              style={{ marginTop: "15px", marginBottom: "10px" }}
              FormHelperTextProps={{ classes: helperTextStyles() }}
              variant="outlined"
              margin="dense"
              id="author-name"
              label="Author"
              type="text"
              autoComplete="off"
              onChange={(e) => {
                handleInputValue(e);
                setState((s) => ({
                  ...s,
                  scene: {
                    ...s.scene,
                    config: {
                      ...defaultConfig,
                      ...s.scene["config"],
                      author: e.target.value,
                    },
                  },
                }));
              }}
              name="author"
              error={errors["author"]?.length > 0}
              onBlur={handleInputValue}
              {...(errors["author"] && {
                error: true,
                helperText: errors["author"],
              })}
              fullWidth
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => props.close(3)} color="primary">
            Cancel
          </Button>
          <Button
            disabled={!formIsValid()}
            onClick={() => onAddScene()}
            color="primary"
          >
            Add
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
