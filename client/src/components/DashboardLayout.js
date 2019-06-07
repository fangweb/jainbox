import React, { Component } from 'react';
import '../assets/css/dashboard-layout.css';
import Header from './Header';
import SideMenu from './SideMenu';
import Panel from './Panel';
import Footer from './Footer';

class DashboardLayout extends Component {
  render() {
    return (
      <div className="dashboard">
        <Header />
        <SideMenu />
        <Panel>{this.props.children}</Panel>
        <Footer />
      </div>
    );
  }
}

export default DashboardLayout;
