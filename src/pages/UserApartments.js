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
  Snackbar,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
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

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function UserApartment() {
  const [state, setState] = useState({
    openFilter: false,
    openCreateApart: false,
    apartmentList: [],
    notify: { vertical: "top", horizontal: "right" },
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

  const handleCreateApart = (data) => {
    if (data.reload) {
      window.location.reload();
      setState((s) => ({
        ...s,
        openCreateApart: !state.openCreateApart,
        notify: { ...s.notify, ...data },
      }));
    } else {
      setState((s) => ({
        ...s,
        openCreateApart: !state.openCreateApart,
        notify: { vertical: "top", horizontal: "right" },
      }));
    }
  };

  const handleResetFilter = () => {
    handleSubmit();
    resetForm();
  };

  const handleNotify = () => {
    setState((s) => ({ ...s, notify: { ...s.notify, open: false } }));
  };

  const { vertical, horizontal } = state.notify;

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
            Create Apartment
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
          <CreateApartment
            props={{ isAdd: true }}
            callBack={handleCreateApart}
          />
        </DialogContent>
      </Dialog>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={state.notify.open}
        onClose={handleNotify}
        autoHideDuration={1500}
        key={"top" + "right"}
      >
        <Alert severity={state.notify.type} sx={{ width: "100%" }}>
          {state.notify.message}
        </Alert>
      </Snackbar>
    </>
  );
}
