import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import PeopleIcon from '@material-ui/icons/People';
import PersonIcon from '@material-ui/icons/Person';
import EventIcon from '@material-ui/icons/Event';
import ChatIcon from '@material-ui/icons/Chat';
import SettingsIcon from '@material-ui/icons/Settings';
import GroupWorkIcon from '@material-ui/icons/GroupWork';
import { Link } from "react-router-dom";

export const FirstDividerSideBarItems = (props) => (
  <div>
    <ListItem component={Link} to="/connections" button onClick={props.close}>
      <ListItemIcon>
      <PeopleIcon />      
      </ListItemIcon>
      <ListItemText primary="Users" />
    </ListItem>

    <ListItem component={Link} to="/org" button onClick={props.close}>
      <ListItemIcon>
        <GroupWorkIcon />
      </ListItemIcon>
      <ListItemText primary="Organizations" />
    </ListItem>

    <ListItem component={Link} to="/chats" button onClick={props.close}>
      <ListItemIcon>
        <ChatIcon />
      </ListItemIcon>
      <ListItemText primary="Chats" />
    </ListItem>

    <ListItem component={Link} to="/events" button onClick={props.close}>
      <ListItemIcon>
        <EventIcon />
      </ListItemIcon>
      <ListItemText primary="Events" />
    </ListItem>
  </div>
);

export const SecondDividerSideBarItems = (props) => (
  <div>
    <ListItem component={Link} to="/profile" button onClick={props.close}>
      <ListItemIcon>
        <PersonIcon/>
      </ListItemIcon>
      <ListItemText primary="My profile" />
    </ListItem>

    {/* <ListItem component={Link} to="/settings" button onClick={props.close}>
      <ListItemIcon>
        <SettingsIcon />
      </ListItemIcon>
      <ListItemText primary="Settings" />
    </ListItem> */}
  </div>
);
