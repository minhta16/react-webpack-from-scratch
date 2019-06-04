// Build script to copy files from public folder to dist folder

var fs = require("file-system");
var path = require("path");

var buildPath = path.resolve(__dirname, "../dist/");
var publicPath = path.resolve(__dirname, "../public/");

// remove build files and folders
if (fs.existsSync(buildPath)) {
  fs.rmdirSync(buildPath);
}

// create a new dist folder
fs.mkdirSync(buildPath);

// copy asset files to dist folder
fs.copySync(publicPath, buildPath);
