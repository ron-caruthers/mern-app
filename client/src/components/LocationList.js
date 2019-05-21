import React, { Component } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import { ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import { getLocale, getLocales, deleteLocale } from "../actions/localeActions";
import LocationData from "../components/LocationData";
import LocationModal from "../components/LocationModal";
import PropTypes from "prop-types";

class LocationList extends Component {
  static propTypes = {
    getLocales: PropTypes.func.isRequired,
    getLocale: PropTypes.func.isRequired,
    locale: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool
  };

  componentWillMount() {
    console.log('WillMount-a', this.props);
  }

  componentDidMount() {
    this.props.getLocales();
  }

  onDeleteClick = id => {
    this.props.deleteLocale(id);
  };

  showLocale = id => {
    this.props.getLocale(id);
  };

  render() {
    console.log('LList props_2', this.props);
    const { locales } = this.props.locale;
    const { location } = this.props.location;
    return (
      <BrowserRouter>
        <Route exact={true} path="/" render={() => (
          <div>
            <LocationModal />
            <ListGroup>
              <TransitionGroup className="location-list">
              {/* {console.log('props_3', this.props)} */}
                {locales.map(({ _id, id, name}) => (
                  <CSSTransition key={_id} timeout={500} classNames="fade">
                    <ListGroupItem>
                      <Button
                        className="remove-btn"
                        color="danger"
                        size="sm"
                        onClick={()=>{this.onDeleteClick(_id)}}
                      >
                        &times;
                      </Button>
                      <Link to={`/location/${_id}/${name}`}
                        onClick={()=>{this.showLocale(_id)}}
                      >
                        {name}
                      </Link>
                      <span className="float-right">{id}</span>
                    </ListGroupItem>
                  </CSSTransition>
                ))}
              </TransitionGroup>
            </ListGroup>
          </div>
          )} />
          <Route path="/location/:id" component={LocationData} />
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => ({
  locale: state.locale,
  location: state.locale.location,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { getLocale, getLocales, deleteLocale }
)(LocationList);
