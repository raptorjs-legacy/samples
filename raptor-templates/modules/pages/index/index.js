function renderTemplate() {
    var templating = require('raptor/templating');
    var html = templating.renderToString('colors', {
        colors: ['cyan', 'magenta', 'yellow']
    });
    document.getElementById('renderTarget').innerHTML = html;
}

function renderTemplateAppendTo() {
    require('raptor/renderer')
        .renderTemplate('colors', {
            colors: ['cyan', 'magenta', 'yellow']
        })
        .appendTo('renderTarget');
}