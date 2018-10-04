// This file is shared across the demos.
import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import StarIcon from "@material-ui/icons/Star";
import { Link } from "react-router-dom";

export const firstDividerSideBarItems = (
  <div>
    <ListItem component={Link} to="/dashboard" button>
      <ListItemIcon>
        <StarIcon />
      </ListItemIcon>
        <ListItemText primary="Connections" className="dashButton" />
    </ListItem>

    <ListItem component={Link} to="/organizations" button>
      <ListItemIcon>
        <StarIcon />
      </ListItemIcon>
      <ListItemText primary="Organizations" />
    </ListItem>

    <ListItem component={Link} to="/dashboard" button>
      <ListItemIcon>
        <StarIcon />
      </ListItemIcon>
      <ListItemText primary="Chats" />
    </ListItem>

    <ListItem component={Link} to="/events" button>
      <ListItemIcon>
        <StarIcon />
      </ListItemIcon>
      <ListItemText primary="Events" />
    </ListItem>
  </div>
);

export const secondDividerSideBarItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <StarIcon />
      </ListItemIcon>
      <ListItemText primary="My profile" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <StarIcon />
      </ListItemIcon>
      <ListItemText primary="Recommandation" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <StarIcon />
      </ListItemIcon>
      <ListItemText primary="Setting" />
    </ListItem>
  </div>
);
