var $e = {};

function init() {
    $e.knot = document.getElementById('knot');
    $e.player = document.getElementById('player');

    $e.knot.addEventListener('click', function () {
        $e.player.play();
        // $e.knot.className = 'knot-rotate';

        $e.knot.setAttribute('class', "knot-rotate")

        console.log(this, $e.knot.className)
    })

    // $e.knot.addEventListener('mouseleave', function () {
    //     $e.player.pause();
    //     $e.player.currentTime = 0;
    // })
}

window.onload = init;