import React, { useState, useEffect } from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import MuiDrawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { MainListItems } from "../components/categories";
import { Alert, AlertTitle, Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import AddInfoDialog from "../components/dialogs/addInfoDialog";
import AddSceneDialog from "../components/dialogs/addSceneDialog";
import DeleteInfoDialog from "../components/dialogs/deleteInfoDialog";
import DeleteSceneDialog from "../components/dialogs/deleteSceneDialog";
import LoadSceneDialog from "../components/dialogs/loadSceneDialog";
import EditInfoDialog from "../components/dialogs/editInfoDialog";
import EditSceneDialog from "../components/dialogs/editSceneDialog";
import UploadPanorama from "../components/dialogs/uploadPanoDialog";
import Button from "@mui/material/Button";
import { initialState, pinCusor } from "./default-config";
import ReactPannellum, {
  mouseEventToCoords,
  changeMouseCursor,
  getAllScenes,
  startAutoRotate,
  stopAutoRotate,
  showCompass,
  addScene,
  destroy,
} from "../libs/react-pannellum/dist";
import * as apiServices from "../../../store/motel/services";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  marginBlockStart: "67px",
  backgroundColor: "lightslategray",
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const Alerts = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const mdTheme = createTheme();

const types = [{ title: "info" }, { title: "scene" }];

export default function Mainpage() {
  const id = window.location.pathname.split("/")[3];

  const [state, setState] = useState({
    isOpenDrawer: false, // use to open / close the sidebar content
    openDialog: "", // use to open special dialog
    isSelect: -1, // use to remove highlight of item of sidebar
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
    scenes: [], // use to save / retrieve array of scenes
    isSceneType: false, // use to define "scene" type of hotspot when "Add"
    isInfoType: false, // use to define "info" type of hotspot when "Add"
    isAddInfo: false, // use to open / close "Add Hotspot" Dialog
    isAddScene: false, // use to open / close "Add Scene" Dialog
    isLoadScene: false, // use to open / close "Load Scene" Dialog
    isEditInfo: false, // use to open / close "Edit Hotspot" Dialog
    isEditScene: false,
    isDeleteInfo: false, // use to open / close "Delete Hotspot" Dialog
    isDeleteScene: false, // use to open / close "Delete Scene" Dialog
    isUploadPano: false,
    isLoadConfig: false,
    loadState: false,
    config: {
      sceneFadeDuration: 1000,
    }, // config for viewer
    fullScenesInformation: [], // use save / retrieve all scenes information / configs of this view
    apartmentInfo: {},
    snackbarAction: {
      // use to show / hide notification
      isOpen: false,
      message: "",
      type: "",
    },
    coordinates: {},
    notify: { vertical: "top", horizontal: "right" },
  });

  useEffect(() => {
    setState((s) => ({
      ...s,
      fullScenesInformation: [],
      isLoadConfig: true,
      loadState: true,
    }));
    const request = apiServices.apartmentEdit(id);
    request
      .then((res) => {
        setState((s) => ({
          ...s,
          apartmentInfo: res.data.prop.fields,
          fullScenesInformation: res.data.prop.fields.scenePanoInfo?.length
            ? res.data.prop.fields.scenePanoInfo
            : [],
        }));
      })
      .catch((err) => {});
  }, []);

  useEffect(() => {
    changeMouseCursor(state);
  }, [state.isAddInfo]);

  useEffect(() => {
    if (getAllScenes() === null) {
      setState((s) => ({
        ...s,
        config: {
          ...s.config,
        },
      }));
    } else {
      setState((s) => ({
        ...s,
        fullScenesInformation: getAllScenes(),
      }));
    }
    console.log(getAllScenes());
  }, [
    state.isAddInfo,
    state.isAddScene,
    state.isLoadScene,
    state.isEditInfo,
    state.isEditScene,
    state.isDeleteInfo,
    state.isDeleteScene,
  ]);

  useEffect(() => {
    if (state.fullScenesInformation.length)
      setState((s) => ({ ...s, loadState: false }));
  }, [state.fullScenesInformation.length]);

  useEffect(() => {
    if (state.fullScenesInformation.length) {
      const array = [...state.fullScenesInformation.slice(1)];
      array.map((value, index) => {
        return addScene(Object.keys(value)[0], Object.values(value)[0]);
      });
      setState((s) => ({ ...s, isLoadConfig: false }));
    }
  }, [state.loadState]);

  const handleDrawerOpen = () => {
    setState((s) => ({ ...s, isOpenDrawer: true }));
  };

  const handleDrawerClose = () => {
    setState((s) => ({ ...s, isOpenDrawer: false }));
  };

  const handleDialogClose = (index, value) => {
    switch (index) {
      case 0: // this case use to close "Add Info" dialog when click "CANCEL".
        setState((s) => ({
          ...s,
          openDialog: "",
          isSceneType: false,
          isInfoType: false,
        }));
        break;
      case 1:
        setState((s) => ({
          ...s,
          openDialog: "",
          isAddInfo: false,
          isAddScene: false,
          isDeleteInfo: false,
          isDeleteScene: false,
          isLoadScene: false,
          isSelect: -1,
          fullScenesInformation: value.fullScenesInformation,
          config: {
            ...s.config,
            title: Object.values(value.fullScenesInformation[0])[0].title,
            author: Object.values(value.fullScenesInformation[0])[0].author,
          },
        }));
        break;
      case 3: // this case use to close all dialog ( except "Add Info" ) when click "CANCEL".
        value && actionSuccess(value);
        setState((s) => ({
          ...s,
          openDialog: "",
          isAddInfo: false,
          isAddScene: false,
          isEditInfo: false,
          isEditScene: false,
          isDeleteInfo: false,
          isDeleteScene: false,
          isLoadScene: false,
          isSelect: -1,
        }));
        break;
      default:
        break;
    }
  };

  const actionSuccess = (message) => {
    setState((s) => ({
      ...s,
      snackbarAction: {
        isOpen: true,
        message: message,
        type: "success",
      },
    }));
  };

  const onCloseSnackBar = (value) => {
    setState((s) => ({
      ...s,
      snackbarAction: {
        ...s.snackbarAction,
        isOpen: false,
      },
    }));
  };

  const isAddInfo = (data, index) => {
    setState((s) => ({
      ...s,
      isAddInfo: data,
      isSelect: index,
    }));
  };

  const isAddScene = (data, index) => {
    setState((s) => ({
      ...s,
      isAddScene: data,
      isSelect: index,
    }));
  };

  const isLoadScene = (data, index) => {
    setState((s) => ({
      ...s,
      isLoadScene: data,
      isSelect: index,
    }));
  };

  const isEditInfo = (data, index) => {
    setState((s) => ({
      ...s,
      isEditInfo: data,
      isSelect: index,
    }));
  };

  const isEditScene = (data, index) => {
    setState((s) => ({
      ...s,
      isEditScene: data,
      isSelect: index,
    }));
  };

  const isDeleteInfo = (data, index) => {
    setState((s) => ({
      ...s,
      isDeleteInfo: data,
      isSelect: index,
    }));
  };

  const isDeleteScene = (data, index) => {
    setState((s) => ({
      ...s,
      isDeleteScene: data,
      isSelect: index,
    }));
  };

  const isUploadPano = (data) => {
    if (data.reload) {
      window.location.reload();
      setState((s) => ({
        ...s,
        isUploadPano: !s.isUploadPano,
        notify: { ...s.notify, ...data },
      }));
    } else {
      setState((s) => ({
        ...s,
        isUploadPano: !s.isUploadPano,
        notify: { vertical: "top", horizontal: "right" },
      }));
    }
  };

  const autoRotate = (value) => {
    value ? startAutoRotate() : stopAutoRotate();
  };

  const enableCompass = (value) => {
    showCompass(value);
  };

  const getMouseEventToCoords = (e) => {
    if (state.isAddInfo === true) {
      setState((s) => ({
        ...s,
        openDialog: "isAddInfo",
        hotSpot: {
          ...s.hotSpot,
          pitch: mouseEventToCoords(e)[0],
          yaw: mouseEventToCoords(e)[1],
        },
        coordinates: {
          pitch: mouseEventToCoords(e)[0],
          yaw: mouseEventToCoords(e)[1],
        },
      }));
    }
  };

  const exportConfig = (event) => {
    event.preventDefault();

    const btn = document.querySelector(".woocommerce-Button");
    document.getElementById("save").disabled = true;
    btn.classList.add("button--loading");

    const config = getAllScenes();
    const formData = new FormData();
    const data = {
      ...state.apartmentInfo,
      scenePanoInfo: config,
    };
    console.log(data);
    formData.append("thisProp", JSON.stringify({ fields: { ...data } }));
    const request = apiServices.editPanoImage(id, formData);
    request
      .then((res) => {
        setTimeout(function () {
          btn.classList.remove("button--loading");
          setState((s) => ({
            ...s,
            notify: {
              ...s.notify,
              open: true,
              message: "Panorama View Was Saved!",
              type: "success",
            },
          }));
        }, 2000);
      })
      .catch((err) => {});
  };

  const handleNotify = () => {
    setState((s) => ({ ...s, notify: { ...s.notify, open: false } }));
  };

  const { vertical, horizontal } = state.notify;

  return (
    <div
      style={{
        cursor: state.isAddInfo ? `url(${pinCusor}), pointer` : "default",
      }}
    >
      <ThemeProvider theme={mdTheme}>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <AppBar position="absolute" open={state.isOpenDrawer}>
            <Toolbar sx={{ pr: "24px" }}>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                sx={{
                  marginRight: "36px",
                  ...(state.isOpenDrawer && { display: "none" }),
                }}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                sx={{ flexGrow: 1 }}
              >
                CREATE PANORAMA VIEW
              </Typography>
              <Box>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => isUploadPano(true)}
                >
                  Upload Image
                </Button>
                <> </>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={exportConfig}
                  className="woocommerce-Button button"
                  id="save"
                >
                  <span className="button__mui">Save</span>
                </Button>
              </Box>
            </Toolbar>
          </AppBar>
          <Drawer variant="permanent" open={state.isOpenDrawer}>
            <Toolbar
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                px: [1],
              }}
            >
              <IconButton onClick={handleDrawerClose}>
                <ChevronLeftIcon />
              </IconButton>
            </Toolbar>
            <Divider />
            <List>
              <MainListItems
                isOpenDrawer={state.isOpenDrawer}
                isSelect={state.isSelect}
                isAddInfo={isAddInfo}
                isAddScene={isAddScene}
                isLoadScene={isLoadScene}
                isEditInfo={isEditInfo}
                isEditScene={isEditScene}
                isDeleteInfo={isDeleteInfo}
                isDeleteScene={isDeleteScene}
                isAutoRotate={autoRotate}
                isCompass={enableCompass}
                disable={state.fullScenesInformation?.length ? false : true}
              />
            </List>
            <Divider />
          </Drawer>
          <Box
            component="main"
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === "light"
                  ? theme.palette.grey[100]
                  : theme.palette.grey[900],
              flexGrow: 1,
              height: "93.3vh",
              overflow: "hidden",
            }}
          >
            <Toolbar />
            <Container
              maxWidth="lg"
              sx={{
                mt: 4,
                mb: 4,
                maxHeight: "800px",
                height: "100%",
              }}
            >
              {state.fullScenesInformation?.length ? (
                <ReactPannellum
                  onMouseDown={getMouseEventToCoords}
                  id={Object.keys(state.fullScenesInformation[0])[0]}
                  sceneId={Object.keys(state.fullScenesInformation[0])[0]}
                  imageSource={
                    Object.values(state.fullScenesInformation[0])[0].imageSource
                  }
                  config={
                    state.isLoadConfig
                      ? Object.values(state.fullScenesInformation[0])[0]
                      : state.config
                  }
                />
              ) : null}
              {!state.fullScenesInformation.length && (
                <Alert severity="warning">
                  <AlertTitle>Warning</AlertTitle>
                  No scene found, select <strong>"Add Scene"</strong> to add the
                  first scene — <strong>check it out!</strong>
                </Alert>
              )}
            </Container>
            <AddInfoDialog
              open={state.openDialog === "isAddInfo"}
              close={handleDialogClose}
              mouseEventToCoords={state.coordinates}
              fullScenesInformation={state.fullScenesInformation}
            />
            <AddSceneDialog
              open={state.isAddScene}
              close={handleDialogClose}
              fullScenesInformation={state.fullScenesInformation}
            />
            <LoadSceneDialog
              open={state.isLoadScene}
              close={handleDialogClose}
              fullScenesInformation={state.fullScenesInformation}
            />
            <EditInfoDialog
              open={state.isEditInfo}
              close={handleDialogClose}
              fullScenesInformation={state.fullScenesInformation}
            />
            <EditSceneDialog
              open={state.isEditScene}
              close={handleDialogClose}
              fullScenesInformation={state.fullScenesInformation}
            />
            <DeleteInfoDialog
              open={state.isDeleteInfo}
              close={handleDialogClose}
              fullScenesInformation={state.fullScenesInformation}
            />
            <DeleteSceneDialog
              open={state.isDeleteScene}
              close={handleDialogClose}
              fullScenesInformation={state.fullScenesInformation}
            />
            <UploadPanorama
              open={state.isUploadPano}
              close={isUploadPano}
              apartmentInfo={state.apartmentInfo}
            />
            <Snackbar
              anchorOrigin={{ vertical, horizontal }}
              open={state.notify.open}
              onClose={handleNotify}
              autoHideDuration={1500}
              key={"top" + "right"}
            >
              <Alerts severity={state.notify.type} sx={{ width: "100%" }}>
                {state.notify.message}
              </Alerts>
            </Snackbar>
          </Box>
        </Box>
      </ThemeProvider>
    </div>
  );
}
