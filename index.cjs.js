(
  (root, factory) => {
    typeof module === 'object' && module.exports
      ? module.exports = factory()
      : root.processCSS = factory()
  }
)(
  typeof self !== 'undefined'
    ? self
    : this,
  () => function(
    stringOfCSS = '',
    listOfPlugins = [
      string => ({
        css: string,
        js: '',
        otherFiles: []
      })
    ],
  ) {
    const processed = {
      css: stringOfCSS,
      js: '',
      otherFiles: []
    }
    listOfPlugins.forEach(plugin => {
      const result = plugin(processed.css)

      // Return the CSS you want to pass through to the next plugin
      if (result.css) {
        processed.css = result.css
      }

      // Accumulate any JS you need to output along the way to support things
      if (result.js) {
        processed.js += result.js
      }

      // Accumulate other files
      if (
        result.otherFiles
        && Array.isArray(result.otherFiles)
        && result.otherFiles.every(element => 
          element.hasOwnProperty('filename')
          && typeof element.filename === 'string'
          && element.hasOwnProperty('text')
          && typeof element.text === 'string'
        )
      ) {
        result.otherFiles.forEach(file =>
          processed.otherFiles.find(({filename}) => filename === file.filename)
          ? existingFile.text += `\nfile.text`
          : processed.otherFiles.push(file)
        )
      }
    })

    return processed
  }
)