import React, { Component } from "react";
import { ListGroup,
  ListGroupItem,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Modal,
  ModalHeader,
  ModalBody } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import { getLocale, getLocales, editLocale, deleteLocale } from "../actions/localeActions";
import LocationModal from "../components/LocationModal";
import PropTypes from "prop-types";

class LocationManager extends Component {
  state = {
    modal: false,
    name: '',
    mhp: '',
    iotypes: ''
  };

  static propTypes = {
    getLocales: PropTypes.func.isRequired,
    getLocale: PropTypes.func.isRequired,
    locale: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  handleInputChange = e => {
    let change = { 
      [e.target.name]: e.target.value 
    }
    this.setState(change);
  };

  componentDidMount() {
    this.props.getLocales();
  }

  onDeleteClick = id => {
    this.props.deleteLocale(id);
  };

  updateLocation = (e, id, keys) => {
    e.preventDefault();

    const { name, mhp, iotypes } = this.state;

    const values = [
      name,
      mhp,
      iotypes
    ];

    for (var i=0; i<keys.length; i++) {
      this.props.editLocale(id, keys[i], values[i]);
    }

    // Close Modal
    this.toggle();

    this.props.getLocales();
  }

  showLocale = (e, id) => {
    e.preventDefault();

    // Get locale via getLocale action
    this.props.getLocale(id)
      .then(res => {
        this.setState({
          name: res.payload.location.name,
          mhp: res.payload.location.mhp,
          io_types: res.payload.location.iotypes
        });
      });
    
    // Close Modal
    this.toggle();
  };

  reJigger = (e, locales) => {
    e.preventDefault();

    for (var i=0; i<locales.length; i++) {
      this.props.editLocale(locales[i]._id, 'id', i+1);
    }

    this.props.getLocales();
  }

  render() {
    const { locales } = this.props.locale;
    const { location } = this.props.location;

    return (
      <div>
        {this.props.isAuthenticated ? (
          <div>
            <LocationModal />
          </div>
        ) : (
          <h4 className="mb-3">Please log in to manage locations</h4>
        )}
        {this.props.isAuthenticated && (
          <ListGroup>
            <TransitionGroup className="location-list">
              {locales.map(({ _id, id, name}) => (
                <CSSTransition key={_id} timeout={500} classNames="fade">
                  <ListGroupItem>
                    <span className="col-1">{id}</span>
                    <Button
                      className="location-btn text-left col-10"
                      color="light"
                      size="lg"
                      onClick={(e)=>{this.showLocale(e, _id)}}
                    >
                    {name}
                    </Button>
                    <span className="col-1">
                      <Button
                        className="remove-btn"
                        color="danger"
                        size="sm"
                        onClick={()=>{this.onDeleteClick(_id)}}
                      >
                        &times;
                      </Button>
                    </span>
                  </ListGroupItem>
                </CSSTransition>
              ))}
            </TransitionGroup>
          </ListGroup>
        )}
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>
            {location && location.name}: ({location && location.id})
          </ModalHeader>
          <ModalBody>
            <Form onSubmit={(e)=>{this.updateLocation(e, location._id, [e.target.name.id, e.target.mhp.id, e.target.iotypes.id])}}>
              <FormGroup>
                <Label for="name">Location</Label>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Location name"
                  value={this.state.name}
                  onChange={this.handleInputChange}
                />
                <Label className="mt-3" for="mhp">Mean home price</Label>
                <Input
                  type="text"
                  name="mhp"
                  id="mhp"
                  placeholder="Mean housing price"
                  value={this.state.mhp}
                  onChange={this.handleInputChange}
                />
                <Label className="mt-3" for="io_types">IO Types</Label>
                <Input
                  type="text"
                  name="io_types"
                  id="io_types"
                  placeholder="iBuyer Types"
                  value={this.state.io_types}
                  onChange={this.handleInputChange}
                />
                <Button
                  color="dark"
                  style={{ marginTop: "2rem" }}
                  block>
                  Update Location
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
        {this.props.isAuthenticated && (
          <div>
            <Button
              className="mt-3 float-right"
              color="dark"
              size="sm"
              onClick={(e)=>{this.reJigger(e, locales)}}
            >
              Rejigger IDs
            </Button>
          </div>
        )}
      </div>
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
  { getLocale, getLocales, editLocale, deleteLocale }
)(LocationManager);
