import React, { Component } from 'react';
import '../static/css/header.css'

class Header extends Component{
    render() {
        return (
            <div id="header" className="row">
                <div className="col col-6 col-mid">
                    <span className="icon-music" style={{ color: "#fff" }}></span>
                </div>
                <div className="col col-6 col-center-bottom">
                    <span className="sign">Design by jielong</span>
                </div>
            </div>
        )
    }
}

export default Header