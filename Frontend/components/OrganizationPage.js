import React, { Component } from "react";
import OrganizationList from "./OrganizationList";
import CreateOrganization from "./CreateOrganization";

export default class OrganizationPage extends Component {
  state = {
    organizationName: "",
    description: ""
  };

  render() {   
    return (
      <div>
        <CreateOrganization />
        <OrganizationList />
      </div>
    );
  }
}

