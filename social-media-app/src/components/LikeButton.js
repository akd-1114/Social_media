import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import PropTypes from "prop-types";

import MyButton from "../utils/MyButton";
import * as actions from "../redux/actions/index";

class LikeButton extends Component {
  likedScream = () => {
    if (
      this.props.user.likes &&
      this.props.user.likes.find(like => like.screamId === this.props.screamId)
    )
      return true;
    else return false;
  };

  likeScream = () => {
    if (this.props.user.credentials.handle !== this.props.userHandle)
      this.props.likeScream(this.props.screamId);
  };

  unLikeScream = () => {
    if (this.props.user.credentials.handle !== this.props.userHandle)
      this.props.unlikeScream(this.props.screamId);
  };
  render() {
    const { authenticated } = this.props.user;

    const likeButton = !authenticated ? (
      <Link to="/users/login">
        <MyButton title="Like">
          <FavoriteBorder color="primary" />
        </MyButton>
      </Link>
    ) : this.likedScream() ? (
      <MyButton title="Undo like" onClick={this.unLikeScream}>
        <FavoriteIcon color="primary" />
      </MyButton>
    ) : (
      <MyButton title="Like" onClick={this.likeScream}>
        <FavoriteBorder color="primary" />
      </MyButton>
    );
    return likeButton;
  }
}

LikeButton.propTypes = {
  user: PropTypes.object.isRequired,
  screamId: PropTypes.string.isRequired,
  likeScream: PropTypes.func.isRequired,
  unlikeScream: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    likeScream: screamId => dispatch(actions.likeScream(screamId)),
    unlikeScream: screamId => dispatch(actions.unlikeScream(screamId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LikeButton);
