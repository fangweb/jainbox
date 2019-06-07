import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Dropdown } from '../pkg/dropdown';
import { setForm, clearForm, sendForm } from '../modules/compose-module';
import '../assets/css/compose.css';

class Compose extends Component {
  /* TODO:
  constructor(props) {
    super(props);
    this.state = {
      messageSubmitting: false
    };
  }
  */

  componentWillUnmount() {
    /* TODO:
    if (this.props.messageSubmitting) {
    } else {
      this.props.clearForm();
    }
    */
    this.props.clearForm();
  }

  send = e => {
    e.preventDefault();
  };

  selectedFromDropdown = selected => {
    this.props.setForm({ to: selected.username });
  };

  setForm = e => {
    const { target } = e;
    this.props.setForm({ [target.name]: target.value });
  };

  onClearForm = e => {
    e.preventDefault();
    this.props.clearForm();
  };

  getDropdownTitle = () => {
    const { form } = this.props.compose;
    if (!form.to) {
      return (
        <React.Fragment>
          <i className="fas fa-user cfa" />
          <span>Select a user</span>
        </React.Fragment>
      );
    }
    return (
      <React.Fragment>
        <i className="fas fa-user cfa" />
        <span>{form.to}</span>
      </React.Fragment>
    );
  };

  render() {
    const { application, compose } = this.props;

    return (
      <div className="compose">
        <form onSubmit={this.onSend}>
          <div className="compose-ctrl">
            <Dropdown
              title={this.getDropdownTitle()}
              data={application.onlineUsers}
              onSelectItem={this.selectedFromDropdown}
            />
            <button onClick={this.onClearForm} type="submit" className="clear">
              <i className="fas fa-eraser cfa" />
              <span>Clear Form</span>
            </button>
          </div>
          <input
            name="title"
            onChange={this.setForm}
            value={compose.form.title}
            placeholder="Title"
            type="text"
          />
          <textarea
            name="message"
            onChange={this.setForm}
            value={compose.form.message}
            placeholder="Message"
            className="message"
          />
          <button type="submit" className="send">
            <i className="fas fa-share-square" />
            <span>Send</span>
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  application: state.applicationReducer,
  compose: state.composeReducer
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setForm,
      clearForm,
      sendForm
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Compose);
