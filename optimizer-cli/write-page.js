require('raptor');

var files = require('raptor/files'),
    File = require('raptor/files/File');

/*
 * Read the JSON output file produced by the optimizer. This file
 * contains the HTML that should be injected into the page for 
 * each "slot". The slot HTML is used to include the optimized
 * resource bundles into the final optimized page.
 */
var optimizedPage = JSON.parse(
        files.readAsString("./build/static/index-html.json"));

/*
 * Now read the page HTML file so that we can replace the slot placeholders
 * with the generated slot HTML.
 */
var pageHtml = files.readAsString("modules/pages/index/index.html");

/*
 * Use a regular expression to find the slots and inject the slot HTML
 */
var outputHtml = pageHtml.replace(/<!--\s*slot: ([\w]*)\s*-->/g, function(matches, slotName) {
    return optimizedPage[slotName] || '';
});

/*
 * Write back the optimized page to disk
 */
var outputFile = new File(__dirname + "/build/index.html");
outputFile.writeAsString(outputHtml);
console.log('Optimized HTML page written to disk:\n' + outputFile.getAbsolutePath());