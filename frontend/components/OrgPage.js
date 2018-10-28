import React, { Component } from "react";
import CreateOrg from "./CreateOrg";
import OrgList from "./OrgList";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import axios from "axios";

export default class OrgPage extends Component {
  state = {
    OrgList: [],
    filteredOrgs: [],
    search: ""
  };
  getOrgList = () => {
    axios
      .get("http://127.0.0.1:5000/orgs")
      .then(res => {
        this.setState({
          OrgList: res.data.orgs,
          filteredOrgs: res.data.orgs
        });
      })
      .catch(err => console.log(err));
  };
  componentDidMount() {
    this.getOrgList();
  }
  handleKeyUp = e => {
    this.setState({ search: e.target.value }, () => {
      let filtered = this.state.OrgList.filter(org =>
        org.name.toLowerCase().includes(this.state.search.toLowerCase())
      );
      this.setState({ filteredOrgs: filtered });
    });
  };

  render() {
    return (
      <div>
        <div style={{ border: "1px solid #60b0f4" }}>
          <SearchIcon />
          <InputBase
            placeholder="  search organization..."
            onKeyUp={this.handleKeyUp}
          />
        </div>
        <CreateOrg getOrgList={this.getOrgList} />
        {this.state.filteredOrgs.map(org => {
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
