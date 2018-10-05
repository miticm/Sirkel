import React, { Component } from "react";
import CreateOrg from "./CreateOrg";
import OrgList from "./OrgList";
import axios from "axios";

export default class OrgPage extends Component {
  state = {
    OrgList: []
  };
  getOrgList = () => {
    axios
      .get("http://127.0.0.1:5000/orgs")
      .then(res => {
        console.log(res.data);
        this.setState({ OrgList: res.data.orgs });
      })
      .catch(err => console.log(err));
  };
  componentDidMount() {
    this.getOrgList();
  }
  render() {
    return (
      <div>
        <CreateOrg getOrgList={this.getOrgList} />
        {this.state.OrgList.map(org => {
          return (
            <OrgList
              key={org._id + Math.random() * 100}
              id={org._id}
              name={org.name}
              description={org.description}
              orgObject={org}
            />
          );
        })}
      </div>
    );
  }
}
