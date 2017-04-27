/* global ace, brython */
document.addEventListener('DOMContentLoaded', () => {
  const editor = ace.edit('editor')
  editor.session.setMode('ace/mode/python')

  const editorNode = document.querySelector('#editor')
  const outputNode = document.querySelector('#console')
  const runNode = document.querySelector('#run')
  const pythonNode = document.querySelector('#python')
  const downloadNode = document.querySelector('#download')

  editorNode.style.width = `${(window.innerWidth / 2.1)}px`
  editorNode.style.height = `${(window.innerHeight) - 30}px`

  outputNode.style.width = `${(window.innerWidth / 2.1)}px`
  outputNode.style.height = `${(window.innerHeight) - 88}px`

  runNode.style.width = `${(window.innerWidth / 2.2)}px`
  downloadNode.style.width = `${(window.innerWidth / 2.6)}px`

  runNode.addEventListener('click', () => {
    pythonNode.innerHTML =
      '<script type="text/python">' + editor.getValue() + '</script>'
    outputNode.innerHTML = ''
    window.console.log = (message) => {
      if (typeof message === 'object') {
        outputNode.innerHTML += (JSON && JSON.stringify ? JSON.stringify(
          message) : message) + '<br />'
      } else {
        outputNode.innerHTML += message + '<br />'
      }
    }
    brython()
  })

  const download = (filename, text) => {
    const element = document.createElement('a')
    element.setAttribute('href',
      `data:text/python;charset=utf-8,${encodeURIComponent(text)}`)
    element.setAttribute('download', filename)
    element.style.display = 'none'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  downloadNode.addEventListener('click', () => {
    download(document.querySelector('#filename').value, editor.getValue())
  })
})
