import React from "react";
import { withApartmentConsumer } from "../context";
import Loading from "./Loading";
import ApartmentsFilter from "./ApartmentsFilter";
import ApartmentsList from "./ApartmentsList";
import Pagination from "@mui/material/Pagination";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiPagination: {
      styleOverrides: {
        ul: {
          justifyContent: "center",
          padding: "10px 0",
        },
      },
    },
  },
});

function ApartmentContainer({ context }) {
  const { loading, getApartment, sortedApartments, apartments } = context;
  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <ApartmentsFilter apartments={apartments} />
      <ApartmentsList
        apartments={sortedApartments}
        getApartment={getApartment}
      />
      {apartments.length > 15 ? (
        <ThemeProvider theme={theme}>
          <Pagination
            count={Math.ceil(apartments.length / 15)}
            showFirstButton
            showLastButton
            variant="outlined"
          />
        </ThemeProvider>
      ) : null}
    </>
  );
}

export default withApartmentConsumer(ApartmentContainer);
