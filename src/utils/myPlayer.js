function MyPlayer( id ) {
    this.name = id
    this.element = document.querySelector( id )
}

MyPlayer.prototype = {
    setProgress (fn) {
        this.element.addEventListener('timeupdate', function () {
            var [ duration, currentTime ] = [ this.duration, this.currentTime ]
            fn( duration, currentTime )
        })

        return this
    },
    musicEnd ( fn1, fn2 ) {
        this.element.addEventListener('ended', function () {
            fn1()
        })
        this.element.addEventListener('play', function () {
            fn2()
        })
    },
    play (){
        this.element.play()

        return this
    },
    pause () {
        this.element.pause()

        return this
    },
    duration() {
        return this.element.duration
    },
    currentTime() {
        return this.element.currentTime
    },
    setCurrentTime( num ){
        this.element.currentTime = num
    }
}

export default MyPlayer