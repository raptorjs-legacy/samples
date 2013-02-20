require('raptor');

var files = require('raptor/files');

/*
 * Read the JSON output file produced by the optimizer. This file
 * contains the HTML that should be injected into the page for 
 * each "slot". The slot HTML is used to include the optimized
 * resource bundles into the final optimized page.
 */
var optimizedPageJSON = files.readAsString("./static/test-page-optimized.json");
var optimizedPage = JSON.parse(optimizedPageJSON);

/*
 * Now read the page HTML file so that we can replace the slot placeholders
 * with the generated slot HTML.
 */
var pageHtmlPath = "pages/test-page/test-page.html";
var outputPath = "test-page.html";
var pageHtml = files.readAsString(pageHtmlPath);

/*
 * Use a regular expression to find the slots and inject the slot HTML
 */
var outputHtml = pageHtml.replace(/<!--\s*slot: ([\w]*)\s*-->/g, function(matches, slotName) {
    return optimizedPage[slotName];
});

/*
 * Write back the optimized page to disk
 */
console.log('Writing updated page with optimizer-generated HTML to "' + outputPath + '"...');
files.writeAsString(outputPath, outputHtml);