import React, { Component } from 'react';

class Dashboard extends Component {
    render() {
        return (
            <div className="home-container">
                <h1>Welcome to {this.props.username} Dashboard</h1>
            </div>
        )
    }
}

export default Dashboard;