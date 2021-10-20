import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
// material
import {
  Container,
  Stack,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Slide,
} from "@mui/material";
import {
  ApartmentSort,
  ApartmentList,
  ApartmentFilterSidebar,
} from "../components/Apartments";
import CreateApartment from "./CreateApartment";
import * as apiServices from "../store/motel/services";

//
import cancel from "../images/cancel.png";

// ----------------------------------------------------------------------

let closeImg = {
  cursor: "pointer",
  float: "right",
  marginTop: "5px",
  width: "20px",
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function UserApartment() {
  const [state, setState] = useState({
    openFilter: false,
    openCreateApart: false,
    apartmentList: [],
  });

  useEffect(() => {
    const request = apiServices.userApartment();
    request
      .then((res) => {
        setState((s) => ({ ...s, apartmentList: res.data.obj }));
      })
      .catch((err) => {});
  }, []);

  const formik = useFormik({
    initialValues: {
      gender: "",
      category: "",
      colors: "",
      priceRange: "",
      rating: "",
    },
    onSubmit: () => {
      setState((s) => ({ ...s, openFilter: false }));
    },
  });

  const { resetForm, handleSubmit } = formik;

  const handleOpenFilter = () => {
    setState((s) => ({ ...s, openFilter: true }));
  };

  const handleCloseFilter = () => {
    setState((s) => ({ ...s, openFilter: false }));
  };

  const handleCreateApart = () => {
    setState((s) => ({ ...s, openCreateApart: !state.openCreateApart }));
  };

  const handleResetFilter = () => {
    handleSubmit();
    resetForm();
  };

  return (
    <>
      <Container style={{ paddingTop: "24px" }}>
        <Stack
          direction="row"
          flexWrap="wrap"
          alignItems="center"
          justifyContent="space-between"
          sx={{ mb: 5 }}
        >
          <Button
            color="primary"
            variant="contained"
            onClick={handleCreateApart}
          >
            Add product
          </Button>
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <ApartmentFilterSidebar
              formik={formik}
              isOpenFilter={state.openFilter}
              onResetFilter={handleResetFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
            />
            <ApartmentSort />
          </Stack>
        </Stack>

        <ApartmentList products={state.apartmentList} />
      </Container>
      <Dialog
        open={state.openCreateApart}
        fullScreen
        TransitionComponent={Transition}
      >
        <DialogTitle id="alert-dialog-title">
          <img
            alt=""
            src={cancel}
            style={closeImg}
            onClick={handleCreateApart}
          />
        </DialogTitle>
        <DialogContent>
          <CreateApartment props={{ isAdd: true }} />
        </DialogContent>
      </Dialog>
    </>
  );
}
