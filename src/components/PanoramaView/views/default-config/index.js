export const defaultConfig = {
  title: "",
  author: "",
  description: "",
  autoLoad: false,
  sceneFadeDuration: 1000,
  autoRotate: 0,
  autoRotateInactivityDelay: 0,
  autoRotateStopDelay: 0,
  preview: "",
  showZoomCtrl: true,
  keyboardZoom: true,
  mouseZoom: true,
  doubleClickZoom: false,
  draggable: true,
  friction: 0.15,
  disableKeyboardCtrl: false,
  showFullscreenCtrl: true,
  showControls: true,
  touchPanSpeedCoeffFactor: 1,
  yaw: 0,
  pitch: 0,
  maxPitch: 90,
  minPitch: -90,
  maxYaw: 180,
  minYaw: -180,
  hfov: 100,
  minHfov: 50,
  maxHfov: 120,
  multiResMinHfov: false,
  backgroundColor: [0, 0, 0],
  avoidShowingBackground: false,
  compass: false,
  northOffset: 0,
  hotSpots: [],
  hotSpotDebug: false,
  haov: 360,
  vaov: 180,
  vOffset: 0,
  ignoreGPanoXMP: false,
  loadButtonLabel: "Click to<br>Load<br>Panorama",
  loadingLabel: "Loading...",
  bylineLabel: "by %s",
  noPanoramaError: "No panorama image was specified.",
  fileAccessError: "The file %s could not be accessed.",
  malformedURLError: "There is something wrong with the panorama URL.",
  iOS8WebGLError:
    "Due to iOS 8's broken WebGL implementation, only progressive encoded JPEGs work for your device (this panorama uses standard encoding).",
  genericWebGLError:
    "Your browser does not have the necessary WebGL support to display this panorama.",
  textureSizeError:
    "This panorama is too big for your device! It's %spx wide, but your device only supports images up to %spx wide. Try another device. (If you're the author, try scaling down the image.)",
  unknownError: "Unknown error. Check developer console.",
  type: "equirectangular",
  imageSource: "",
  cubeMap: [],
  multiRes: {},
};

export const initialState = {
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
  isLoadConfig: false,
  loadState: false,
  config: {
    sceneFadeDuration: 1000,
  }, // config for viewer
  fullScenesInformation: [], // use save / retrieve all scenes information / configs of this view
  snackbarAction: {
    // use to show / hide notification
    isOpen: false,
    message: "",
    type: "",
  },
  coordinates: {},
};

export const pinCusor =
  "data:image/x-icon;base64,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AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFVZUf+TlpD/k5aQ/5OWkP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAI0kQAR06DgEiRhMBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVVlR/5OWkP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//////////////B////AH///gA///wAH//8AB/8CAAP8AAAD8AAAAeAAAAHgAAABwAAAAcAAAAPAAAADwAAAB8AAAA/AAAA/wAAD/8AAA//gAAf/4AAH/+AAB//gAA//wAAf/8IAP/+BAH//g+H//w////8///////////////8=";
