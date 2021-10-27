import React from "react";
import { Link } from "react-router-dom";
import defaultImg from "../images/apartment-1.jpeg";
import PropTypes from "prop-types";
import { memo } from "react";
const Apartment = memo(({ apartment }) => {
  const { id, apartmentName, images, price } = apartment;
  // console.log(name);
  return (
    <article className="apartment">
      <div className="img-container">
        <img src={images[0] || defaultImg} alt="single apartment" />
        <div className="price-top">
          <h6>${price}</h6>
          <p>per month</p>
        </div>
        <Link to={`/h/apartments/${id}`} className="btn-primary apartment-link">
          features
        </Link>
      </div>
      <p className="apartment-info">{apartmentName}</p>
    </article>
  );
});

Apartment.propTypes = {
  apartment: PropTypes.shape({
    name: PropTypes.string.isRequired,
    apartmentName: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    price: PropTypes.number.isRequired,
  }),
};
export default Apartment;
