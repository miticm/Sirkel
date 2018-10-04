import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import {
  firstDividerSideBarItems,
  secondDividerSideBarItems
} from "./icons/dashboardData";

const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: "hidden",
    position: "relative",
    display: "flex"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  toolbar: theme.mixins.toolbar
});

function Sidebar(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <Drawer
        variant="permanent"
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.toolbar} />
        <List>{firstDividerSideBarItems}</List>
        <Divider />
        <List>{secondDividerSideBarItems}</List>
      </Drawer>
    </div>
  );
}

Sidebar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Sidebar);
