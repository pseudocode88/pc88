var $e = {};
var player;

var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

function onYouTubeIframeAPIReady() {
    console.log('yt ready');

    player = new YT.Player('player', {
        height: '1',
        width: '1',
        videoId: '',
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });

    init();
}

function onPlayerReady() {
    player.loadVideoById("Z1sSqyeEg5o", 0, "large")

}

var done = false;
function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING && !done) {
        setTimeout(stopVideo, 6000);
        done = true;
    }
}

function init() {
    $e.knot = document.getElementById('knot');
    $e.player = document.getElementById('musicplayer');

    $e.knot.addEventListener('mouseenter', function () {
        player.playVideo();
    })

    $e.knot.addEventListener('mouseleave', function () {
        player.stopVideo();
        player.loadVideoById("Z1sSqyeEg5o", 0, "large")
    })
}

// window.onload = init;