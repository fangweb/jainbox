import React, { Component } from 'react';

class Checkbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.checked !== prevProps.checked) {
      this.setState({ checked: this.props.checked });
    }
  }

  toggleCheck = () => {
    this.setState(prevState => {
      const checked = !prevState.checked;
      this.props.selectSingle(this.props.panelId, checked);
      return { checked };
    });
  };

  render() {
    const { checked } = this.state;
    return (
      <input type="checkbox" checked={checked} onChange={this.toggleCheck} />
    );
  }
}

export default Checkbox;
