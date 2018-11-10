import React, { Component } from "react";
import CreateOrg from "./CreateOrg";
import OrgList from "./OrgList";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import Button from "@material-ui/core/Button";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import Divider from "@material-ui/core/Divider";
import Typography from '@material-ui/core/Typography';
import { Input, FormControl, InputLabel } from "@material-ui/core";

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
      .get(`http://127.0.0.1:5000/orgs/${this.state.ranked ? "ranked" : "pageNum/"+this.state.pageNum}`)
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
    });
  };
  nextPage = () => {
    this.setState({pageNum : this.state.pageNum + 1});
    this.getOrgList();
  }
  prePage = () => {
    if(this.state.pageNum > 1){
      this.setState({pageNum:this.state.pageNum - 1});
      this.getOrgList();
    }
  }

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
      list = this.state.filteredOrgs.map(org => {
        return (
          <OrgList
            key={org._id + Math.random() * 100}
            id={org._id}
            name={org.name}
            description={org.description}
            orgObject={org}
          />
        );
      });
    }

    return (
      <div>
        <FormControl margin="normal" fullWidth>
          <InputLabel>
            <SearchIcon />
          </InputLabel>
          <Input
            placeholder="Purdue Hackers"
            onKeyUp={this.handleKeyUp}
          />
        </FormControl>
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

        <Divider style={{ marginTop: "100px" }} />

        <div style={{height:"4rem",width:"100%"}}>
          <div id="pageControl" style={{margin:"0 auto",width:"40%",textAlign:"center"}}>
            <Button variant="contained" color="primary" onClick={this.prePage}>
              Back 
            </Button>
              <span style={{padding:"0 20px 0 20px"}}>Page {this.state.pageNum}</span>
             <Button variant="contained" color="primary" onClick={this.nextPage}>
              Next
            </Button>
          </div>
        </div>

        {list}
      </div>
    );
  }
}
