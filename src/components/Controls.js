import React, { Component } from 'react';

import '../static/css/controls.css'

const Kind = [ "loop", "infinite", "shuffle" ]

class Controls extends Component {
    render() {
        var { changeMusic, isPlay, play, kind, changeKind } = this.props

        return (
            <div className="components-controls col-between">
                <span id="next" className="icon-volume-medium" style={{ color: "#fff" }} onClick={ changeMusic } ></span>
                <span id="prev" className="icon-previous" style={{color: "#fff"}} onClick={ changeMusic }></span>
                <span className={`${isPlay ? 'icon-pause' : 'icon-play'}`} style={{ fontSize: "60px", color: "#fff" }} onClick={ play }></span>
                <span id="next" className="icon-next" style={{ color: "#fff" }} onClick={ changeMusic } ></span>
                <span id="kind" className={ `icon-${Kind[kind]}`} style={{ color: "#fff" }} onClick={ changeKind } ></span>
            </div>
        )
    }
}

export default Controls