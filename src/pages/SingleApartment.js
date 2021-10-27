import React, { useContext, useEffect, useState } from "react";
import defaultBcg from "../images/apartment-1.jpeg";
import Banner from "../components/Banner";
import { Link } from "react-router-dom";
import { ApartmentContext } from "../context";
import StyledHero from "../components/StyledHero";
import ReactPannellum, {
  addScene,
} from "../components/PanoramaView/libs/react-pannellum/dist";

export default function SingleApartment() {
  const [state, setState] = useState({
    id: window.location.pathname.split("/").pop(),
    defaultBcg: defaultBcg,
    fullScenesInformation: [],
    isLoadConfig: false,
    loadState: false,
  });
  const { getApartment } = useContext(ApartmentContext);
  const apartment = getApartment(state.id);

  useEffect(() => {
    const scenePanoInfo = apartment?.scenePanoInfo;
    if (!scenePanoInfo?.length) {
      setState((s) => ({
        ...s,
        fullScenesInformation: [],
        isLoadConfig: true,
        loadState: true,
      }));
    }
    if (scenePanoInfo?.length) {
      setState((s) => ({
        ...s,
        fullScenesInformation: scenePanoInfo,
        isLoadConfig: true,
        loadState: true,
      }));
    }
  }, [apartment]);

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

  if (!apartment) {
    return (
      <div className="error">
        <h3> no such apartment could be found...</h3>
        <Link to="/h/apartments" className="btn-primary">
          back to apartments
        </Link>
      </div>
    );
  }

  const {
    apartmentName,
    description,
    capacity,
    size,
    price,
    extras,
    breakfast,
    pets,
    images,
  } = apartment;

  const [...defaultImages] = images;

  return (
    <>
      <StyledHero img={images[0] || state.defaultBcg}>
        <Banner title={`${apartmentName}`}>
          <Link to="/h/apartments" className="btn-primary">
            back to apartments
          </Link>
        </Banner>
      </StyledHero>
      <section className="single-apartment">
        <div className="single-apartment-images">
          {defaultImages.map((item, index) => (
            <img key={index} src={item} alt={apartmentName} />
          ))}
        </div>
        <div className="single-apartment-info" style={{ display: "flex" }}>
          {state.fullScenesInformation.length ? (
            <article
              className="desc"
              style={{ width: "1170px", height: "700px" }}
            >
              <h3>360 Viewer</h3>
              <ReactPannellum
                id={Object.keys(state.fullScenesInformation[0])[0]}
                sceneId={Object.keys(state.fullScenesInformation[0])[0]}
                imageSource={
                  Object.values(state.fullScenesInformation[0])[0].imageSource
                }
                config={Object.values(state.fullScenesInformation[0])[0]}
              />
            </article>
          ) : null}
        </div>
        <div className="single-apartment-info">
          <article
            className="desc"
            style={{ maxWidth: "50vw", wordBreak: "break-word" }}
          >
            <h3>details</h3>
            <p>{description}</p>
          </article>
          <article className="info">
            <h3>info</h3>
            <h6>price : ${price}</h6>
            <h6>size : {size} SQFT</h6>
            <h6>
              max capacity :
              {capacity > 1 ? `${capacity} people` : `${capacity} person`}
            </h6>
            <h6>{pets ? "pets allowed" : "no pets allowed"}</h6>
            <h6>{breakfast && "free breakfast included"}</h6>
          </article>
        </div>
      </section>
      <section className="apartment-extras">
        <h6>extras </h6>
        <ul className="extras">
          {extras.map((item, index) => (
            <li key={index}>- {item}</li>
          ))}
        </ul>
      </section>
    </>
  );
}
