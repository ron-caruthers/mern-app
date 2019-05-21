import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import { connect } from "react-redux";
import { addLocale, getLocales, editLocale } from "../actions/localeActions";
import PropTypes from "prop-types";

class LocationModal extends Component {
  state = {
    modal: false,
    name: "",
    id: ""
  };

  static propTypes = {
    getLocales: PropTypes.func.isRequired,
    editLocale: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  componentWillMount() {
    this.props.getLocales();
  }

  onChange = e => {
    this.setState(
      { [e.target.name]: e.target.value }
    );
  };

  onSubmit = (e, locales) => {
    e.preventDefault();

    const newLocation = {
      name: this.state.name,
      id: (locales + 1)
    };

    // Add locale via addLocale action
    this.props.addLocale(newLocation);

    // Close Modal
    this.toggle();

    this.props.getLocales();
  };

  render() {
    const { locales } = this.props.locale;
    return (
      <div>
        {this.props.isAuthenticated ? (
          <Button
            color="dark"
            style={{ marginBottom: "2rem" }}
            onClick={this.toggle}
          >
            Add New Location
          </Button>
        ) : (
          <h4 className="mb-3">Please log in to manage locations</h4>
        )}
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Add New Location</ModalHeader>
          <ModalBody>
            <Form onSubmit={(e)=>{this.onSubmit(e, locales.length)}}>
              <FormGroup>
                <Label for="name">Location</Label>
                <Input
                  className="mb-1"
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Add new location"
                  onChange={this.onChange}
                />
                <Button color="dark" style={{ marginTop: "2rem" }} block>
                  Add Location
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  locale: state.locale,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { editLocale, getLocales, addLocale }
)(LocationModal);
