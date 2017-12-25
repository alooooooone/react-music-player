import React, { Component } from 'react';

import '../static/css/progress.css'

class Progress extends Component{
    render() {
        var { handleClick, passTime } = this.props

        return(
            <div className="components-progress" ref="progress" onClick={ handleClick }>
                <div className="pass-time" style={{width: `${ passTime }%`}}></div>
            </div>
        )
    }
}

export default Progress