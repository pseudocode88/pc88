var $e = {};

function init() {
    $e.knot = document.getElementById('knot');
    $e.player = document.getElementById('player');

    $e.knot.addEventListener('click', function () {
        $e.player.play();
        $e.knot.setAttribute('class', "knot-rotate")
        document.body.className = 'turn-body';
    })

    $e.player.addEventListener('ended', function () {
        $e.knot.setAttribute('class', "knot-rotate-back")
        document.body.className = '';
    })
}

window.onload = init;