import React, { Component } from "react";
import CreateOrg from "./CreateOrg";
import OrgList from "./OrgList";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import Button from "@material-ui/core/Button";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import { Input, FormControl, InputLabel } from "@material-ui/core";
import serverAddress from "../utils/serverAddress";

export default class OrgPage extends Component {
  state = {
    OrgList: [],
    filteredOrgs: [],
    search: "",
    ranked: false,
    loading: true,
    pageNum: 1
  };
  getOrgList = () => {
    this.setState({ loading: true });
    axios
      .get(`${serverAddress}/orgs/${this.state.ranked ? "ranked" : "all"}`)
      .then(res => {
        if (res.data.success) {
          this.setState({
            OrgList: res.data.orgs,
            filteredOrgs: res.data.orgs,
            loading: false
          });
        } else {
          alert(res.data.msg);
        }
      })
      .catch(err => console.log(err));
  };
  componentDidMount() {
    this.getOrgList();
  }

  search = e => {
    e.preventDefault();
    let filtered = this.state.OrgList.filter(org =>
      org.name.toLowerCase().includes(this.state.search.toLowerCase())
    );
    this.setState({ filteredOrgs: filtered });
  };

  keyup = e => {
    this.setState({search:e.target.value})
  }

  toggleRanked = () => {
    this.setState({ ranked: !this.state.ranked }, () => {
      this.getOrgList();
    });
  };
  nextPage = () => {
    this.setState({ pageNum: this.state.pageNum + 1 });
  };
  prePage = () => {
    if (this.state.pageNum > 1) {
      this.setState({ pageNum: this.state.pageNum - 1 });
    }
  };

  render() {
    let list;
    if (this.state.loading) {
      list = (
        <CircularProgress
          size={200}
          style={{ marginLeft: "400px", marginTop: "100px" }}
        />
      );
    } else {
      if(this.state.filteredOrgs.length > 0){
        list = [];
        for (let i = this.state.pageNum * 10 - 10; i < this.state.pageNum * 10;i++) {
            if(i < this.state.filteredOrgs.length){

              let org = this.state.filteredOrgs[i];
              list.push(
                <OrgList
                  key={org._id + Math.random() * 100}
                  id={org._id}
                  name={org.name}
                  description={org.description}
                  orgObject={org}
                />
              );
            }
           
        }
      }else{
        list = (<h1>Didn't find anything</h1>)
      }

    }

    return (
      <div>
        <CreateOrg getOrgList={this.getOrgList} />

        <Divider style={{ marginTop: "100px" }} />


      <div style={{width: "100%",marginTop:"2rem" }}>
        <form onSubmit={this.search} style={{margin:"0 auto", width:"50%",textAlign:"center"}}>
            <Input placeholder="Search Organization..." onKeyUp={this.keyup} style={{display:"block"}} />
            <Button style={{ backgroundColor: "#60b0f4", color: "#ffffff", marginTop: "5px"}} type="submit" fullWidth>
              Search
            </Button>
            <Button style={{ backgroundColor: "#60b0f4", color: "#ffffff", marginTop: "5px"}} onClick={this.toggleRanked} fullWidth>
              List suggested organization
            </Button>
        </form>
      </div>

        <div style={{ height: "4rem", width: "100%" , marginTop:"2rem"}}>
          <div
            id="pageControl"
            style={{ margin: "0 auto", width: "40%", textAlign: "center" }}
          >
            <Button
              style={{ backgroundColor: "#60b0f4", color: "#ffffff" }}
              variant="contained"
              color="primary"
              onClick={this.prePage}
            >
              Back
            </Button>
            <span style={{ padding: "0 20px 0 20px" }}>
              Page {this.state.pageNum}
            </span>
            <Button
              style={{ backgroundColor: "#60b0f4", color: "#ffffff" }}
              variant="contained"
              color="primary"
              onClick={this.nextPage}
            >
              Next
            </Button>
          </div>
        </div>

        {list}
      </div>
    );
  }
}
