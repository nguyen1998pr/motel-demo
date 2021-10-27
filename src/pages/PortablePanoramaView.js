import React, { useEffect, useState } from "react";
import ReactPannellum, {
  addScene,
  getAllScenes,
} from "../components/PanoramaView/libs/react-pannellum/dist";
import * as apiServices from "../store/motel/services/index";

export default function PortableView() {
  const [state, setState] = useState({
    id: window.location.pathname.split("/").pop(),
    fullScenesInformation: [],
    isLoadConfig: false,
    loadState: false,
  });

  useEffect(() => {
    const request = apiServices.apartmentInfo(state.id);
    request
      .then((res) => {
        setState((s) => ({
          ...s,
          fullScenesInformation: res.data.prop.fields.scenePanoInfo,
          isLoadConfig: true,
          loadState: true,
        }));
      })
      .catch((err) => {});
  }, []);

  console.log(state.fullScenesInformation, getAllScenes());

  useEffect(() => {
    if (state.fullScenesInformation.length)
      setState((s) => ({ ...s, loadState: false }));
  }, [state.fullScenesInformation.length]);

  useEffect(() => {
    if (state.fullScenesInformation.length) {
      const array = [...state.fullScenesInformation.slice(1)];
      array.map((value) => {
        return addScene(Object.keys(value)[0], Object.values(value)[0]);
      });
      setState((s) => ({ ...s, isLoadConfig: false }));
    }
  }, [state.loadState]);

  return (
    <div style={{ position: "absolute" }}>
      {state.fullScenesInformation.length ? (
        <ReactPannellum
          id={Object.keys(state.fullScenesInformation[0])[0]}
          sceneId={Object.keys(state.fullScenesInformation[0])[0]}
          imageSource={
            Object.values(state.fullScenesInformation[0])[0].imageSource
          }
          config={Object.values(state.fullScenesInformation[0])[0]}
        />
      ) : null}
    </div>
  );
}
