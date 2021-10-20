import React, { useEffect, useState } from "react";
import ListItem from "@mui/material/ListItem";
import { makeStyles, createStyles, withStyles } from "@mui/styles";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InfoIcon from "@mui/icons-material/Info";
import CategoryIcon from "@mui/icons-material/Category";
import Collapse from "@mui/material/Collapse";
import List from "@mui/material/List";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ViewCarouselIcon from "@mui/icons-material/ViewCarousel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Divider from "@mui/material/Divider";
import Switch from "@mui/material/Switch";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";
import Tooltip from "@mui/material/Tooltip";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      width: "100%",
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
  })
);

const StyledTooltip = withStyles({
  tooltipPlacementRight: {
    margin: "0 6px",
  },
  tooltip: {
    fontSize: "0.8em",
  },
})(Tooltip);

const StyledTooltips = withStyles({
  tooltipPlacementRight: {
    margin: "0 20px",
  },
  tooltip: {
    fontSize: "0.8em",
  },
})(Tooltip);

export const MainListItems = (props) => {
  const [state, setState] = useState({
    selectedIndex: -1,
    isAutoRotate: false,
    isCompass: false,
  });
  const classes = useStyles();

  useEffect(() => {
    setState((s) => ({ ...s, selectedIndex: props.isSelect }));
  }, [props.isSelect]);

  const handleListItemClick = (event, index) => {
    if (state.selectedIndex === index) {
      index = -1;
    }
    switch (index) {
      case -1:
        props.isAddInfo(false, index);
        props.isAddScene(false, index);
        props.isEditInfo(false, index);
        props.isLoadScene(false, index);
        props.isEditScene(false, index);
        props.isDeleteInfo(false, index);
        props.isDeleteScene(false, index);
        setState((s) => ({ ...s, selectedIndex: index }));
        break;
      case 0:
        props.isAddInfo(true, index);
        setState((s) => ({ ...s, selectedIndex: index }));
        break;
      case 1:
        props.isAddScene(true, index);
        setState((s) => ({ ...s, selectedIndex: index }));
        break;
      case 2:
        props.isLoadScene(true, index);
        setState((s) => ({ ...s, selectedIndex: index }));
        break;
      case 3:
        props.isEditInfo(true, index);
        setState((s) => ({ ...s, selectedIndex: index }));
        break;
      case 4:
        props.isEditScene(true, index);
        setState((s) => ({ ...s, selectedIndex: index }));
        break;
      case 5:
        props.isDeleteInfo(true, index);
        setState((s) => ({ ...s, selectedIndex: index }));
        break;
      case 6:
        props.isDeleteScene(true, index);
        setState((s) => ({ ...s, selectedIndex: index }));
        break;
      case 7:
        setState((s) => ({ ...s, selectedIndex: index }));
        break;
      default:
        break;
    }
  };

  const handleListSwitchChange = (event) => {
    switch (event.target.name) {
      case "isAutoRotate":
        props.isAutoRotate(event.target.checked);
        break;
      case "isCompass":
        props.isCompass(event.target.checked);
        break;
      default:
        break;
    }
    setState((s) => ({ ...s, [event.target.name]: event.target.checked }));
  };

  return (
    <div>
      <ListItem
        disabled={props.disable}
        button
        selected={state.selectedIndex === 0}
        onClick={(event) => handleListItemClick(event, 0)}
      >
        {props.isOpenDrawer ? (
          <ListItemIcon>
            <InfoIcon fontSize="large" />
          </ListItemIcon>
        ) : (
          <StyledTooltip title="Add Hotspot" placement="right" arrow>
            <ListItemIcon>
              <InfoIcon fontSize="large" />
            </ListItemIcon>
          </StyledTooltip>
        )}
        <ListItemText primary="Add Hotspot" />
      </ListItem>
      <ListItem
        button
        selected={state.selectedIndex === 1}
        onClick={(event) => handleListItemClick(event, 1)}
      >
        {props.isOpenDrawer ? (
          <ListItemIcon>
            <ViewCarouselIcon fontSize="large" />
          </ListItemIcon>
        ) : (
          <StyledTooltip title="Add Scene" placement="right" arrow>
            <ListItemIcon>
              <ViewCarouselIcon fontSize="large" />
            </ListItemIcon>
          </StyledTooltip>
        )}
        <ListItemText primary="Add Scene" />
      </ListItem>
      <ListItem
        disabled={props.disable}
        button
        selected={state.selectedIndex === 2}
        onClick={(event) => handleListItemClick(event, 2)}
      >
        {props.isOpenDrawer ? (
          <ListItemIcon>
            <ImageSearchIcon fontSize="large" />{" "}
          </ListItemIcon>
        ) : (
          <StyledTooltip title="Load Scene" placement="right" arrow>
            <ListItemIcon>
              <ImageSearchIcon fontSize="large" />{" "}
            </ListItemIcon>
          </StyledTooltip>
        )}
        <ListItemText primary="Load Scene" />
      </ListItem>
      <Divider />
      <ListItem
        disabled={props.disable}
        button
        selected={state.selectedIndex === 3}
        onClick={(event) => handleListItemClick(event, 3)}
      >
        {props.isOpenDrawer ? (
          <ListItemIcon>
            <EditIcon fontSize="large" />
          </ListItemIcon>
        ) : (
          <StyledTooltip title="Edit Hotspot" placement="right" arrow>
            <ListItemIcon>
              <EditIcon fontSize="large" />
            </ListItemIcon>
          </StyledTooltip>
        )}
        <ListItemText primary="Edit Hotspot" />
      </ListItem>
      <ListItem
        disabled={props.disable}
        button
        selected={state.selectedIndex === 4}
        onClick={(event) => handleListItemClick(event, 4)}
      >
        {props.isOpenDrawer ? (
          <ListItemIcon>
            <ListItemIcon>
              <EditIcon fontSize="large" />
            </ListItemIcon>
          </ListItemIcon>
        ) : (
          <StyledTooltip title="Edit Scene" placement="right" arrow>
            <ListItemIcon>
              <ListItemIcon>
                <EditIcon fontSize="large" />
              </ListItemIcon>
            </ListItemIcon>
          </StyledTooltip>
        )}
        <ListItemText primary="Edit Scene" />
      </ListItem>
      <Divider />
      <ListItem
        disabled={props.disable}
        button
        selected={state.selectedIndex === 5}
        onClick={(event) => handleListItemClick(event, 5)}
      >
        {props.isOpenDrawer ? (
          <ListItemIcon>
            <DeleteForeverIcon fontSize="large" />
          </ListItemIcon>
        ) : (
          <StyledTooltip title="Delete Hotspot" placement="right" arrow>
            <ListItemIcon>
              <DeleteForeverIcon fontSize="large" />
            </ListItemIcon>
          </StyledTooltip>
        )}
        <ListItemText primary="Delete Info" />
      </ListItem>
      <ListItem
        disabled={props.disable}
        button
        selected={state.selectedIndex === 6}
        onClick={(event) => handleListItemClick(event, 6)}
      >
        {props.isOpenDrawer ? (
          <ListItemIcon>
            <DeleteForeverIcon fontSize="large" />
          </ListItemIcon>
        ) : (
          <StyledTooltip title="Delete Scene" placement="right" arrow>
            <ListItemIcon>
              <DeleteForeverIcon fontSize="large" />
            </ListItemIcon>
          </StyledTooltip>
        )}
        <ListItemText primary="Delete Scene" />
      </ListItem>
      <Divider />
      <ListItem
        disabled={props.disable}
        button
        selected={state.selectedIndex === 7}
        onClick={(event) => handleListItemClick(event, 7)}
      >
        {props.isOpenDrawer ? (
          <ListItemIcon>
            <CategoryIcon fontSize="large" />
          </ListItemIcon>
        ) : (
          <StyledTooltip title="More" placement="right" arrow>
            <ListItemIcon>
              <CategoryIcon fontSize="large" />
            </ListItemIcon>
          </StyledTooltip>
        )}
        <ListItemText primary="More" />
        {state.selectedIndex === 7 ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={state.selectedIndex === 7} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <FormControl className={classes.nested} component="fieldset">
            <FormGroup>
              <FormControlLabel
                control={
                  props.isOpenDrawer ? (
                    <Switch
                      checked={state.isAutoRotate}
                      onChange={handleListSwitchChange}
                      name="isAutoRotate"
                    />
                  ) : (
                    <StyledTooltips title="Auto Rotate" placement="right" arrow>
                      <Switch
                        checked={state.isAutoRotate}
                        onChange={handleListSwitchChange}
                        name="isAutoRotate"
                      />
                    </StyledTooltips>
                  )
                }
                label="Auto Rotate"
              />
              <FormControlLabel
                control={
                  props.isOpenDrawer ? (
                    <Switch
                      checked={state.isCompass}
                      onChange={handleListSwitchChange}
                      name="isCompass"
                    />
                  ) : (
                    <StyledTooltips
                      title="Show Compass"
                      placement="right"
                      arrow
                    >
                      <Switch
                        checked={state.isCompass}
                        onChange={handleListSwitchChange}
                        name="isCompass"
                      />
                    </StyledTooltips>
                  )
                }
                label="Show Compass"
              />
            </FormGroup>
          </FormControl>
        </List>
      </Collapse>
    </div>
  );
};
