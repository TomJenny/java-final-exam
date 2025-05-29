import React, { Component } from 'react';
import { ACCESS_TOKEN } from '../../constants';
import { Redirect } from 'react-router-dom'

class OAuth2RedirectHandler extends Component {
    getUrlParameter(name) {
        console.log("getUrlParameter|name:", name)
        name = name.replace(/[\\[]/, '\\[').replace(/[\\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');

        var results = regex.exec(this.props.location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };

    render() {        
        const token = this.getUrlParameter('token');
        const error = this.getUrlParameter('error');

        if(token) {
            console.log("OAuth2RedirectHandler|token: ", token)
            localStorage.setItem(ACCESS_TOKEN, token);
            window.location.href = "/profile";
            return null;
        } else {
            console.log("OAuth2RedirectHandler login")
            return <Redirect to={{
                pathname: "/login",
                state: { 
                    from: this.props.location,
                    error: error 
                }
            }}/>; 
        }
    }
}

export default OAuth2RedirectHandler;