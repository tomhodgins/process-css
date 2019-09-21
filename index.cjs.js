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
        otherFiles: {}
      })
    ],
    environment = {}
  ) {
    const processed = {
      css: stringOfCSS,
      js: '',
      otherFiles: {}
    }
    listOfPlugins.forEach(plugin => {
      const result = plugin(processed.css, environment)

      // Return the CSS you want to pass through to the next plugin
      if (result.css) {
        processed.css = result.css
      }

      // Accumulate any JS you need to output along the way to support things
      if (result.js) {
        processed.js += result.js
      }

    // Accumulate other files
      if (result.otherFiles) {
        Object.entries(result.otherFiles).forEach(([file, content]) => {
          if (processed.otherFiles.hasOwnProperty(file)) {
            processed.otherFiles[file] += `\n${content}`
          } else {
            processed.otherFiles[file] = content
          }
        })
      }
    })

    return processed
  }
)
