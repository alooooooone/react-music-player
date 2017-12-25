import React, { Component } from 'react';

import Header from './components/Header'
import Player from './pages/Player'

import './static/icomoon/style.css'
import './static/css/app.css'
import './static/css/clear.css'

class App extends Component {
    render() {
        return(
            <div>
                <Header />
                <Player />
            </div>
        )
    }
}


export default App;