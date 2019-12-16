import React from 'react';
import styles from './toast.module.css';

class Toast extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      message: ''
    };

    this.timeoutIds = [];
    this.promiseRejections = [];
  }

  componentDidMount() {
    this.setState({ message: this.props.message });
    this.startSequence();
  }

  componentWillUnmount() {
    // this.cancelDelays();
  }

  cancelSequence = async () => {
    this.cancelDelays();
    this.setState({ visible: false });
    await this.produceVisibilityDelay(this.props.transitionDelay * 2);
  };

  startSequence = async () => {
    try {
      await this.produceVisibilityDelay(this.props.transitionDelay, true);
      await this.produceVisibilityDelay(this.props.duration, false);
      await this.produceVisibilityDelay(this.props.transitionDelay * 2);
      this.props.toastHasFinished();
    } catch (e) {
      console.log('Sequence cancelled');
    }
  };

  cancelDelays = () => {
    this.timeoutIds.forEach(id => clearTimeout(id));
    this.promiseRejections.forEach(reject => reject());

    this.timeoutIds = [];
    this.promiseRejections = [];
  };

  addRejection = reject => this.promiseRejections.push(reject);

  addDelay = (id, reject) => {
    this.timeoutIds.push(id);
  };

  produceVisibilityDelay = (delay, visible) => {
    return new Promise((resolve, reject) => {
      const id = setTimeout(() => {
        if (visible !== undefined) {
          this.setState({ visible });
        }
        resolve();
      }, delay);

      this.addRejection(reject);
      this.addDelay(id);
    });
  };

  componentDidUpdate = async prevProps => {
    if (this.props.message !== prevProps.message) {
      await this.cancelSequence();
      this.setState({ message: this.props.message });
      this.startSequence();
    }
  };

  render() {
    const { visible, message } = this.state;

    let toastType = '';
    console.log(this.props);
    if (this.props.toastType === 'success') {
      toastType = styles.success;
    } else if (this.props.toastType === 'error') {
      toastType = styles.error;
    }

    return (
      <div
        className={`${styles.toast} ${toastType} ${
          visible ? styles.visible : ''
        }`}
      >
        <i className={`fas fa-check ${styles.toastIcon}`} />
        {message}
      </div>
    );
  }
}

export default Toast;
