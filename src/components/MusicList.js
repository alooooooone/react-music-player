import React, { Component } from 'react';

class MusicList extends Component {
    render() {
        var { currentSong, selectMusicPlay, deleteSong, music, handleClick } = this.props

        return(
            <div id="components-musiclist" className={ `${this.props.isShow ? "musiclist-show" : ""}`}>
                <ul>
                    {music.map((item, index) => {
                        var classN = currentSong === index ? "col-between green" : "col-between"
                        return <MusicItem classN={ classN } key={item.id} title={item.title} artist={item.artist}
                        handleDoubleClick={(e) => { selectMusicPlay(e, index) }} 
                        deleteSong={(e) => {deleteSong(e,index)}}/>
                    })}
                </ul>
                <div id="show-list" onClick={ handleClick }>播放列表</div>
            </div>
        )
    }
}

function MusicItem(props){
    var { classN, handleDoubleClick, title, artist, deleteSong} = props

    return(
        <li className={ classN } onDoubleClick={ handleDoubleClick }>
            <span className="col-5">{ title }</span>
            <span className="col-6">{ artist }</span>
            <span className="col-1 icon-cross deleteBtn" style={{ fontSize: "12px" }} onClick={ deleteSong }></span>
        </li>
    )
}

export default MusicList