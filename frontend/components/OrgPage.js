import React, { Component } from "react";
import CreateOrg from "./CreateOrg";
import OrgList from "./OrgList";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import Button from '@material-ui/core/Button';
import axios from "axios";

export default class OrgPage extends Component {
  state = {
    OrgList: [],
    filteredOrgs: [],
    search: "",
    ranked: false
  };
  getOrgList = () => {
    axios
      .get(`http://127.0.0.1:5000/orgs/${this.state.ranked ? 'ranked' : ''}`)
      .then(res => {
        if (!res.success) {
          this.setState({
            OrgList: res.data.orgs,
            filteredOrgs: res.data.orgs
          });
        } 
        else {
          alert(msg);
        }
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

  toggleRanked = () => {
    this.setState({ ranked: !this.state.ranked }, () => {
      this.getOrgList();
    })
  }

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
        <Button
          style={{ backgroundColor: "#60b0f4" }}
          type="submit"
          multiple
          color="primary"
          onClick={this.toggleRanked}
        >
          Rank
        </Button>
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
