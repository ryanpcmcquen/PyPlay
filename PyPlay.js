/* global ace, brython */
document.addEventListener('DOMContentLoaded', () => {
    const editor = ace.edit('editor');
    editor.session.setMode('ace/mode/python');
    ace.require('ace/ext/language_tools');
    editor.setOptions({
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true
    });

    const editorNode = document.querySelector('#editor');
    const outputNode = document.querySelector('#console');
    const runNode = document.querySelector('#run');
    const pythonNode = document.querySelector('#python');
    const downloadNode = document.querySelector('#download');
    const filenameNode = document.querySelector('#filename');

    editorNode.style.width = `${window.innerWidth / 1.05}px`;
    editorNode.style.height = `${window.innerHeight / 1.5}px`;

    outputNode.style.width = `${window.innerWidth / 1.05}px`;
    outputNode.style.height = `${window.innerHeight / 4}px`;

    runNode.style.width = `${window.innerWidth / 4}px`;
    downloadNode.style.width = `${window.innerWidth / 4}px`;

    const run = () => {
        pythonNode.innerHTML = `<script type="text/python">${editor.getValue()}</script>`;
        outputNode.innerHTML = '';
        brython();
        window.console.log = (message) => {
            outputNode.innerHTML += `${message}<br>`;
        };
    };

    const download = () => {
        const element = document.createElement('a');
        element.setAttribute(
            'href',
            `data:text/python;charset=utf-8,${encodeURIComponent(
                editor.getValue()
            )}`
        );
        element.setAttribute('download', filenameNode.value);
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    };

    editor.commands.addCommands([
        {
            name: 'run',
            bindKey: {
                win: 'Ctrl-Enter',
                mac: 'Command-Enter'
            },
            exec: run
        },
        {
            name: 'download',
            bindKey: {
                win: 'Ctrl-S',
                mac: 'Command-S'
            },
            exec: download
        }
    ]);

    runNode.addEventListener('click', () => {
        run();
    });

    downloadNode.addEventListener('click', () => {
        download();
    });

    editor.focus();
});
