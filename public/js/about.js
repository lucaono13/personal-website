document.addEventListener('DOMContentLoaded', function(){
    newActive = document.getElementById('nav-about');
    newActive.className += ' active';
    newActive.setAttribute('aria-current', 'page');
    var ram = document.getElementById('ram');
    ram.onclick = function() {window.open("https://open.spotify.com/album/4m2880jivSbbyEGAKfITCa?si=lC21ofOHR_CHeyF4pj5Lfg")};
})