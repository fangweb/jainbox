import React from 'react';
import styles from './toast.module.css';

class Success extends React.Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
      visible: false,
      message: ''
    };
    
    this.timeoutIds = [];
    this.promiseRejections = [];
  }
  
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
  }
  
  addDelay = (id, reject) => {
    this.timeoutIds.push(id);
  }
  
  addRejection = (reject) => this.promiseRejections.push(reject)
  
  cancelDelays = () => {
    for( const id of this.timeoutIds ) {
      clearTimeout(id);
    }
    
    for( const reject of this.promiseRejections ) {
      reject();
    }
    
    this.timeoutIds = [];
    this.promiseRejections = [];    
  }
  
  cancelSequence = async () => {
    this.cancelDelays();
    this.setState({ visible: false });
    await this.produceVisibilityDelay(this.props.transitionDelay * 2);
  }
  
  startSequence = async () => {
    try {
      await this.produceVisibilityDelay(this.props.transitionDelay, true); 
      await this.produceVisibilityDelay(this.props.duration, false); 
      await this.produceVisibilityDelay(this.props.transitionDelay * 2); 
      this.props.toastHasFinished();
    } catch (e) {
      console.log("Sequence cancelled");
    }
  }
    
  componentDidMount() {
    this.setState({ message: this.props.message });
    this.startSequence(); 
  }
  
  componentWillUnmount() {
    this.cancelDelays();
  }
  
  componentDidUpdate = async (prevProps) => {
    if (this.props.message !== prevProps.message) {
      await this.cancelSequence();
      this.setState({ message: this.props.message });
      this.startSequence();
    }  
  }
  
  render() {
    const { visible, message } = this.state;
    return (
      <div className={`${styles.success} ${visible ? styles.visible : ''}`}>
        <i className={`fas fa-check ${styles.successIcon}`}></i>{ message }      
      </div>      
    );
  }
}

export default Success;

