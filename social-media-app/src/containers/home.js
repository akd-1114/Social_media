import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Scream from "../components/Scream";
import Profiles from "../components/Profiles";
import * as actions from "../redux/actions/index";
import ScreamSkeleton from "../utils/ScreamSkeleton";

class Home extends Component {
  componentDidMount() {
    this.props.getAllScreams();
  }

  render() {
    const { screams, loading } = this.props.data;
    let recentScreamMarkup = !loading ? (
      screams.map(scream => <Scream key={scream.screamId} scream={scream} />)
    ) : (
      <ScreamSkeleton />
    );
    return (
      <Grid container spacing={10}>
        <Grid item sm={8} xs={12}>
          {recentScreamMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          <Profiles />
        </Grid>
      </Grid>
    );
  }
}

Home.propTypes = {
  getAllScreams: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    data: state.data
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAllScreams: () => dispatch(actions.getScreams())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
