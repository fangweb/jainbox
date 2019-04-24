import React from 'react';

class Warning extends React.Component {
  
  onWrapperClick = (event) => {
    event.stopPropagation()
  }

  render() {
    return (
      <div className="warning-wrapper" onClick={this.onWrapperClick}>
        <div className="warning-heading">
          {this.props.title}
        </div>       
        <div> Proceed / Cancel </div>
      </div>
    );
  }
}

export default Warning;

