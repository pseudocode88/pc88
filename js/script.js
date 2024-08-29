var $e = {};

function init() {
    $e.knot = document.getElementById('knot');
    $e.player = document.getElementById('player');

    $e.knot.addEventListener('click', function () {
        $e.player.play();
        $e.knot.setAttribute('class', "knot-rotate")
        document.body.className = 'turn-body';
        document.getElementById('cloud-left').className = 'cloud-left-up';
        document.getElementById('cloud-right').className = 'cloud-right-up';
        document.getElementById('dark-sky').className = 'dark-sky-up';
    })

    $e.player.addEventListener('ended', function () {
        $e.knot.setAttribute('class', "knot-rotate-back")
        document.body.className = '';
        document.getElementById('cloud-left').className = 'cloud-left-down';
        document.getElementById('cloud-right').className = 'cloud-right-down';
        document.getElementById('dark-sky').className = 'dark-sky-down';
    })
}

window.onload = init;