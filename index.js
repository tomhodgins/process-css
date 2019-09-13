export default function(
  stringOfCSS = '',
  listOfPlugins = [
    string => ({
      css: string,
      js: '',
      otherFiles: []
    })
  ],
  environment = {}
) {
  const processed = {
    css: stringOfCSS,
    js: '',
    otherFiles: []
  }
  listOfPlugins.forEach(plugin => {
    const result = plugin(processed.css, environment)

    // Return the CSS you want to pass through to the next plugin
    if (result.css !== undefined) {
      processed.css = result.css
    }

    // Accumulate any JS you need to output along the way to support things
    if (result.js !== undefined) {
      processed.js += result.js
    }

    // Accumulate other files
    if (
      result.otherFiles !== undefined
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