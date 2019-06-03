const loaderUtils = require("loader-utils");
const md5 = require("md5");
const path = require("path");
const fs = require("file-system");

module.exports = function(source) {
  // Get all the options of the loader
  // For this one, only hashLength is available
  const options = loaderUtils.getOptions(this);

  // Use a regex expression to find all src="..." in source
  const regex = /src={(.*?)}/g;
  const matches = source.match(regex);
  // Copy source
  var resultSource = source;

  // For each match add hash query string
  if (matches) {
    matches.forEach(match => {
      resultSource = resultSource.replace(
        match,
        pathToHashedPath(match, options.hashLength)
      );
    });
  }
  return resultSource;
};

const pathToHashedPath = (srcValue, hashLength) => {
  // Determine whether double or single quote is used
  var quoteUsed = srcValue.match('"').length > 0 ? '"' : "'";

  // Extract the path of the src param
  var pathOnly = srcValue.slice(
    srcValue.indexOf(quoteUsed) + 1,
    srcValue.lastIndexOf(quoteUsed)
  );
  var fileName = pathOnly.substring(pathOnly.lastIndexOf("/") + 1);

  // Read the file in the path & append the hash value to a query param
  let data = fs.readFileSync(
    path.resolve(__dirname, `../public/${fileName}`),
    "utf8"
  );
  const hash = md5(data).slice(0, hashLength);
  return `src={require("${pathOnly}?h=${hash}")}`;
};
