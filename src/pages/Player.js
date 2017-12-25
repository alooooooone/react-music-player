import React, { Component } from 'react';

import Progress from '../components/Progress'
import Controls from '../components/Controls'
import MusicList from '../components/MusicList'
import { MUSIC } from '../static/data/MUSIC'

import '../static/css/player.css'

import MyPlayer from '../utils/myPlayer'
var myPlayer = null

class Player extends Component{
    constructor(props){
        super(props)
        this.state = {
            music: MUSIC,
            currentSong: 0,
            progress: 0,
            length: 0,
            kind: 0,
            isPlay: false,
            isShow: false,
        }

        this.handleClick = this.handleClick.bind(this)
        this.handleDoubleClick = this.handleDoubleClick.bind(this)
        this.playMusic = this.playMusic.bind(this)
        this.changeMusic = this.changeMusic.bind(this)
        this.setProgress = this.setProgress.bind(this)
        this.autoChangeSong = this.autoChangeSong.bind(this)
        this.changeKind = this.changeKind.bind(this)
        this.canPlay = this.canPlay.bind(this)
        this.showList = this.showList.bind(this)
        this.deleteSong = this.deleteSong.bind(this)
    }

    handleClick(e){
        var offsetL = document.querySelector('.components-progress').offsetLeft
        var width = document.querySelector('.components-progress').clientWidth
        var clientX = e.clientX
        var percentage = (clientX - offsetL) / width
        var duration = myPlayer.duration()

        myPlayer.setCurrentTime( duration * percentage )

        this.setState({
            progress: percentage * 100
        })
    }
    handleDoubleClick(e,index){
        this.setState({
            currentSong: index
        }, () => myPlayer.play())
    }
    changeMusic(e){
        var { currentSong, length, kind } = this.state

        if(e.target.id === "next"){
            switch ( kind ) {
                case 0:
                case 1:
                    currentSong = (currentSong + 1) % length
                    break;
                case 2:
                    currentSong = Math.floor(Math.random() * length)
                    break;

                default:
                    break;
            }
            this.setState({
                currentSong: currentSong,
                isPlay: true
            },() => myPlayer.play())
        }else{
            this.setState({
                currentSong: currentSong === 0 ? length - 1 : currentSong -= 1,
                isPlay: true
            }, () => myPlayer.play())
        }
    }
    autoChangeSong(){
        var { currentSong, length, kind } = this.state

        switch ( kind ) {
            case 0:
                currentSong = (currentSong + 1) % length
                break;
            case 1:
                break;
            case 2:
                currentSong = Math.floor(Math.random() * length)
                break;
        
            default:
                break;
        }

        this.setState({
            currentSong: currentSong,
            isPlay: false
        }, () => myPlayer.play())
    }
    changeKind(e){
        var kind = this.state.kind
        if(e.target.id === "kind"){
            kind = ( kind + 1 ) % 3
        }
        this.setState({
            kind: kind
        })
    }
    canPlay(){
        this.setState({
            isPlay: true
        })
    }
    playMusic(){
        this.state.isPlay ? myPlayer.pause() : myPlayer.play()
        this.setState({
            isPlay: !this.state.isPlay
        })
    }
    setProgress( duration, currentTime ){
        var time = currentTime / duration * 100

        this.setState({
            progress: time,
            currenttime: Math.round(currentTime),
            duration: Math.round(duration),
        })
    }
    showList(e){
        if(e.target.id === "show-list"){
            this.setState({
                isShow: !this.state.isShow
            })
        }
    }
    deleteSong(e,index){
        var { music } = this.state

        if(e.target.className.indexOf("delete-btn")){
            music.splice( index, 1)
            var newMusic = music
            this.setState({
                music: newMusic,
                length: newMusic.length
            })
        }
    }

    componentWillMount(){
        this.setState({
            length: this.state.music.length
        })
    }
    componentDidMount(){
        myPlayer = new MyPlayer("#myPlayer")
        myPlayer.setProgress( this.setProgress )
        myPlayer.musicEnd( this.autoChangeSong, this.canPlay )
    }

    render() {
        var { progress, music, currentSong, isPlay, kind, isShow, currenttime } = this.state

        return(
            <div id="pages-player" className="col-center">
                <div className="player col-center col-column">
                    <div className="top-cover">
                        <div className={ `cover cover-${ isPlay ? "animation" : "stop" } ${ !isPlay && currenttime  ? "animation-cover-stop" : ""}` }></div>
                        <img className={ `pic pic-${isPlay ? "animation" : "stop" } ${ !isPlay && currenttime  ? "animation-pic-stop" : ""}` } src={ music[currentSong].cover } alt="cover" />
                    </div>
                    <div className="progress">
                        <Progress passTime={ progress } handleClick={ this.handleClick }/>
                    </div>
                    <div className="controls">
                        <Controls play={ this.playMusic } isPlay={ isPlay } changeMusic={ this.changeMusic } kind={ kind } changeKind={this.changeKind}/>
                    </div>
                    <audio id="myPlayer" src={ music[currentSong].file}></audio>
                </div>
                <MusicList music={ music } currentSong={ currentSong } isShow={ isShow } handleClick={this.showList} selectMusicPlay={this.handleDoubleClick} deleteSong={this.deleteSong}/>
            </div>
        )
    }
}

export default Player