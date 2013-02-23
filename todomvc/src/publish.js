

var raptor = require('raptor');
require('raptor/resources').getSearchPath().addDir(__dirname);

var templating = require('raptor/templating'),
    logger = require('raptor/logging').logger('publish'),
    strings = require('raptor/strings'),
    files = require('raptor/files'),
    File = require('raptor/files/File'),
    cwd = process.cwd(),
    resolveFile = function(path, basePath) {
        if (!path) {
            return path;
        }
        
        return new File(files.resolvePath(basePath || cwd, path));
    },
    configArgRegExp=/^(?:-|--)([A-Za-z0-9_\-]+)(?:=([^\s]+))?$/,
    paramArgRegExp=/^([A-Za-z0-9_\-]+)(?:=([^\s]+))?$/,
    cwd = process.cwd(),
    parseArgs = function(args) {
        var result={};
        args.forEach(function(arg, i) {
            var matches,
                name,
                value;
            if ((matches = configArgRegExp.exec(arg))) {
                name = matches[1];
                value = matches[2] || '';
            }
            else if ((matches = paramArgRegExp.exec(arg))) {
                name = matches[1];
                value = matches[2];
                
            }
            else {
                name = arg;
                value = true;
            }
            
            if (value === 'true' || value === 'false') {
                value = value === 'true';
            }
            result[name] = value; 
        });
        
        return result;
    },
    args = parseArgs(process.argv.slice(2));


var Publisher = function(config) {
    this.appendPageFilename = config.profile !== 'production';
    this.page = config.page;

    this.outputDir = files.resolveRelativeFile(__dirname, "..");
    this.currentOutputDir = null;

    this.templateContext = templating.createContext();
};

Publisher.prototype = {
    publish: function() {

        //raptor.require('docs-util').publisher = this;

        var baseDir = files.joinPaths(__dirname, "pages"); 
        
        var handlePage = function(templateFile) {
            var relativePath = templateFile.getParent().substring(baseDir.length);
            console.log("output dir = " + this.outputDir);
            console.log("Relatve Path = " + relativePath);
            var pathParts = relativePath.substring(1).split(/[\/\\]/)
            var pageName = pathParts.join('-');
            var outputFile = new File(this.outputDir, '/index.html');

            this.writePage(
                templateFile, 
                outputFile, 
                pageName,
                relativePath);
        }
        
        if (this.page) {
            if (!strings.endsWith(this.page, '/index.rhtml')) {
                this.page += '/index.rhtml';
            }
            
            if (!strings.startsWith(this.page, '/')) {
                this.page = '/' + this.page;
            }
            
            if (!strings.startsWith(this.page, '/pages')) {
                this.page = '/pages' + this.page;
            }
            
            var templateFile = new File(__dirname, this.page);
            handlePage.call(this, templateFile);
        }
        else {
            require('raptor/files/walker').walk(
                baseDir, 
                function(file) {
                    if (file.isFile() && file.getExtension() === "rhtml") {
                        handlePage.call(this, file);
                    }
                },
                this);

            //raptor.require('docs-util').publisher = null;
        }
        
    },

    writePage: function(templateFile, outputFile, name, relativePath) {

        // var packageFile = new File(templateFile.getParentFile(), "index-package.json");
        // var packageXmlFile = new File(templateFile.getParentFile(), "index-package.xml");
        // packageFile.remove();
        // packageXmlFile.remove();

        // var packageManifest = eval('(' + packageFile.readAsString() + ')');
        // var outputXml = '    <optimizer:page name="${data.pageName}" base-path="${data.pageOutputDir}">\n        <includes>\n';
        // raptor.forEach(packageManifest.includes, function(include) {
        //     if (typeof include === 'string') {
        //         var ext = include.substring(include.lastIndexOf('.')+1);
        //         outputXml += '            <' + ext + ' path="' + include + '"/>\n';
        //     }
        //     else if (include.module) {
        //         outputXml += '            <module name="' + include.module + '"/>\n';
        //     }
        //     else {
        //         throw raptor.createError(new Error('Invalid include: ' + JSON.stringify(include)));
        //     }
        // })
        // outputXml += '        </includes>\n    </optimizer:page>';
        // new File(templateFile.getParentFile(), "index-package.xml").writeAsString(outputXml);

        this.currentOutputDir = outputFile.getParentFile();

        var controllerFile = new File(templateFile.getParentFile(), templateFile.getNameWithoutExtension() + ".js");
        var viewModel = null;
        if (controllerFile.exists()) {
            console.log("file exist");
            viewModel = require(controllerFile.getAbsolutePath()).controller();
        }

        viewModel = viewModel || {};
        viewModel.pageName = name;
        viewModel.pageOutputDir = outputFile.getParent();

        var output = templating.renderToString(templateFile.getAbsolutePath(), viewModel, this.templateContext);
        outputFile.writeAsString(output);

        this.currentOutputDir = null;
    }
};



//exports.publish = function(config) {
    try
    {
        var config = {profile: "production"};
        var optimizer = raptor.require('raptor/optimizer');
        require('raptor/optimizer').configure(new File(__dirname, "optimizer-config.xml"), config);
        raptor.extend(config, args);
        
        var publisher = new Publisher(config);
        publisher.publish();
    }
    catch(e) {
        logger.error("Unable to publish docs. Exception: " + e, e);
    }
    
//};
