import React, { Component } from 'react';
import '../assets/css/layout.css';
import Header from './Header';
import SideMenu from './SideMenu';
import Panel from './Panel';
import Footer from './Footer';

class Layout extends Component {
  render() {
    return (
      <div className="layout">
        <Header />
        <SideMenu />
        <Panel>{this.props.children}</Panel>
        <Footer />
      </div>
    );
  }
}

export default Layout;
