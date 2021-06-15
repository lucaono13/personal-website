document.addEventListener('DOMContentLoaded', function(){
    newActive = document.getElementById('nav-fm');
    newActive.className += ' active';
    newActive.setAttribute('aria-current', 'page');
})
document.addEventListener('DOMContentLoaded', bindButtons);

function bindButtons(){
    document.getElementById('leedsSave').addEventListener('click', function(event){
        var DLlink = document.createElement('a');
        DLlink.setAttribute('href', '/files/fm/LeedsSave.fm');
        DLlink.setAttribute('download','LeedsSave.fm');
        document.body.appendChild(DLlink);
        DLlink.click();
    })
    document.getElementById('bariSave').addEventListener('click', function(event){
        var DLlink = document.createElement('a');
        DLlink.setAttribute('href', '/files/fm/BariSave.fm');
        DLlink.setAttribute('download','BariSave.fm');
        document.body.appendChild(DLlink);
        DLlink.click();
    })
    document.getElementById('1860Save').addEventListener('click', function(event){
        var DLlink = document.createElement('a');
        DLlink.setAttribute('href', '/files/fm/1860Save.fm');
        DLlink.setAttribute('download','1860Save.fm');
        document.body.appendChild(DLlink);
        DLlink.click();
    })
    document.getElementById('haaland').addEventListener('click', function(event){
        var erling = document.createElement('a');
        erling.setAttribute('href','https://www.youtube.com/watch?v=2RpqJjL9zoc');
        erling.setAttribute('target','_blank');
        erling.id = 'erling';
        document.body.appendChild(erling);
        erling.click();
        document.getElementById('erling').remove();
        event.preventDefault();
    })
    document.getElementById('fm21').addEventListener('click', function(event){
        var fm21 = document.createElement('a');
        fm21.setAttribute('href','https://www.footballmanager.com/games/football-manager-2021');
        fm21.setAttribute('target','_blank');
        fm21.id = '21store';
        fm21.click();
        document.getElementById('20store').remove();
        event.preventDefault();
    })
}