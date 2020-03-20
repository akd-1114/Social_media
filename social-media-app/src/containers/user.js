import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Scream from "../components/Scream";
import axios from "../axios-order";
import * as actions from "../redux/actions/index";
import StaticProfiles from "../components/StaticProfile";
import ScreamSkeleton from "../utils/ScreamSkeleton";
import ProfileSkeleton from "../utils/ProfileSkeleton";

class user extends Component {
  state = {
    profile: null,
    screamIdParams: null
  };

  componentDidMount() {
    const handle = this.props.match.params.handle;
    this.props.getUserProfiles(handle);

    const screamId = this.props.match.params.screamId;
    if (screamId) this.setState({ screamIdParams: screamId });

    axios
      .get(`/users/${handle}`)
      .then(res => {
        this.setState({ profile: res.data.user });
      })
      .catch(err => console.error(err));
  }

  render() {
    const { screams, loading } = this.props.data;
    const { screamIdParams } = this.state;

    const screamsMarkup = loading ? (
      <ScreamSkeleton />
    ) : screams === null ? (
      <p>No scream from this user</p>
    ) : !screamIdParams ? (
      screams.map(scream => <Scream scream={scream} key={scream.screamId} />)
    ) : (
      screams.map(scream => {
        if (scream.screamId !== screamIdParams)
          return <Scream scream={scream} key={scream.screamId} />;
        else return <Scream scream={scream} key={scream.screamId} openDialog />;
      })
    );

    return (
      <Grid container spacing={10}>
        <Grid item sm={8} xs={12}>
          {screamsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          {this.state.profile === null ? (
            <ProfileSkeleton />
          ) : (
            <StaticProfiles profile={this.state.profile} />
          )}
        </Grid>
      </Grid>
    );
  }
}

user.propTypes = {
  getUserProfiles: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    data: state.data
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUserProfiles: userHandle => dispatch(actions.getUserProfiles(userHandle))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(user);
