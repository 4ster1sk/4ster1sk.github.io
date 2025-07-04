
window.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('loaded');
});

document.getElementById('dialog-button').addEventListener('click', function () {
    document.getElementById('dialog').style.display = 'flex'; // flexに変更
});

document.querySelector('.close-button').addEventListener('click', function () {
    document.getElementById('dialog').style.display = 'none';
});

window.addEventListener('click', function (event) {
    if (event.target == document.getElementById('dialog')) {
        document.getElementById('dialog').style.display = 'none';
    }
});