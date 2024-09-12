var $e = {};

function init() {
    $e.title = document.getElementById('title');
    $e.content = document.getElementById('content');
    $e.slug = document.getElementById('slug');
    $e.description = document.getElementById('description');

    $e.title.addEventListener('keyup', function () {
        var title = this.value;
        title = title.toLowerCase()
            .replace(/[^a-zA-Z0-9\s]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-');

        $e.slug.value = title;
    });

    $e.content.addEventListener('keyup', function () {
        var content = this.value;
        content = content
            .replace(/[_*~`>#\[\](){}!\\]/g, '')
            .replace(/\n+/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();

        if (content.length > 300) {
            content = content.substring(0, 300);
        }
        $e.description.value = content;
    })
}

window.onload = init;