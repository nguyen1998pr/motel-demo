import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CreateApartment from "../../pages/CreateApartment";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Slide,
  Tooltip,
} from "@mui/material";
import cancel from "../../images/cancel.png";

const closeImg = {
  cursor: "pointer",
  float: "right",
  marginTop: "5px",
  width: "20px",
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function RecipeReviewCard({ product }) {
  const [state, setState] = useState({ openEditApart: false });
  const host = "http://localhost:8080";
  const imagePath = "/uploads/properties/";
  const imageName = product.fields.images[0]?.name;

  const handleEditApart = () => {
    setState((s) => ({ ...s, openEditApart: !state.openEditApart }));
  };

  return (
    <>
      <Card sx={{ maxWidth: 345, border: "inset" }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              A
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={product.fields.apartmentName}
          subheader="September 14, 2016"
        />
        <CardMedia
          component="img"
          height="194"
          src={`${host + imagePath + imageName}`}
          alt="Paella dish"
        />
        <CardContent>
          <Typography noWrap variant="body2" color="text.secondary">
            {product.fields.description}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <Link to={`/apartments/${product._id}`}>
            <Tooltip title="View">
              <IconButton aria-label="view">
                <VisibilityIcon />
              </IconButton>
            </Tooltip>
          </Link>
          <Tooltip title="Edit">
            <IconButton aria-label="edit" onClick={handleEditApart}>
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
          <Link
            to={`/user/apartments/${product._id}/panorama`}
            style={{ marginLeft: "auto" }}
          >
            <Tooltip title="Add Panorama View">
              <IconButton aria-label="addPanorama">
                <AddPhotoAlternateIcon />
              </IconButton>
            </Tooltip>
          </Link>
        </CardActions>
      </Card>
      <Dialog
        open={state.openEditApart}
        fullScreen
        TransitionComponent={Transition}
      >
        <DialogTitle id="alert-dialog-title">
          <img alt="" src={cancel} style={closeImg} onClick={handleEditApart} />
        </DialogTitle>
        <DialogContent>
          <CreateApartment props={{ isEdit: true, apartId: product._id }} />
        </DialogContent>
      </Dialog>
    </>
  );
}
