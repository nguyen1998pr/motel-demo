import React from "react";
import PropTypes from "prop-types";
// material
import { Grid } from "@mui/material";
import ApartmentCard from "./ApartmentCard";

// ----------------------------------------------------------------------

AparmentList.propTypes = {
  products: PropTypes.array.isRequired,
};

export default function AparmentList({ products, ...other }) {
  return (
    <Grid container spacing={3} {...other}>
      {products.map((product) => (
        <Grid key={product.id} item xs={12} sm={6} md={3}>
          <ApartmentCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
}
