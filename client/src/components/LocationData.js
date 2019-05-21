import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import { connect } from "react-redux";
import { getLocale } from "../actions/localeActions";
import PropTypes from "prop-types";

class LocationData extends Component {
  static propTypes = {
    getLocale: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
  };

  render() {
    const { location } = this.props.location;
    return (
      <div>
        {console.log('props_2', this.props)}
        {/* {location !== undefined
          ? location.map(({ _id, name }) => (
          <div className="col-12" key={_id}>Location:
            <div className="col-6">{name}</div>
            <div className="col-6">{_id}</div>
          </div>
        )) :
        null} */}
        {location && location.name}
        <Route path="/location/:id/:name" render={({ match }) => (
          <div className="col-12">
          {console.log('location', location)}
            <div className="col-12">
              {match.params.id}
            </div>
            <div className="col-12">
              {match.params.name}
            </div>
            <div className="col-12">
              <Link to="/">
                &lt;&lt; Back
              </Link>
            </div>
          </div>
        )} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  location: state.locale.location,
});

export default connect(
  mapStateToProps,
  { getLocale }
)(LocationData);
