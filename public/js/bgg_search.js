document.addEventListener('DOMContentLoaded', function(){
    newActive = document.getElementById('nav-boardgame');
    newActive.className += ' active';
    newActive.setAttribute('aria-current', 'page');
})
document.addEventListener('DOMContentLoaded', bindButtons);

var singleClick = function(row){
    // Helped to add click event to each row
    // https://stackoverflow.com/questions/1207939/adding-an-onclick-event-to-a-table-row
    return function() {
        var info = row.getElementsByTagName('td');
        var gid = info[3].textContent;
        var req = new XMLHttpRequest();
        var link = "https://api.geekdo.com/xmlapi2/thing?id=" + gid + "&stats=1";
        req.open('GET', link);
        req.addEventListener('load', function(){
            var box_art = document.getElementById('art');
            if (req.status >= 200 && req.status < 400) {
                var xml = req.responseXML;
                if (xml.getElementsByTagName('image').length > 0){
                    box_art.src = xml.getElementsByTagName('image')[0].textContent;
                    box_art.alt = xml.getElementsByTagName('name')[0].getAttribute('value') + " Box Art";
                } else {
                    box_art.src = 'https://upload.wikimedia.org/wikipedia/commons/0/0a/No-image-available.png';
                    box_art.alt = "No Image"
                }
            }
        })
        req.send();
        if (selected){
            selected.style.backgroundColor = oldColor;
        }
        oldColor = row.style.backgroundColor;
        row.style.backgroundColor = "lightblue";
        selected = row
    }
}

var oldColor, selected, expSelected, expOldColor;
var bgname_toExp = [];
var bgid_toExp = [];


function addToExport(){
    // Based off singleClick function
    // Adds the selected row to a list for csv export
    return function() {
        var info = selected.getElementsByTagName('td');
        bg_name = info[0].textContent;
        if(bgname_toExp.includes(bg_name)) { console.log('already in list'); return }
        if (bgname_toExp.length == 0){
            document.getElementById('export-btn').disabled=false;
        }
        bgname_toExp.push(info[0].textContent);
        bgid_toExp.push(info[3].textContent);
        var expList = document.getElementById('glist');
        var row = document.createElement('tr');
        var name = document.createElement('td');
        name.textContent = bg_name;
        name.className += ' name-cell';
        row.appendChild(name);
        bg_name = bg_name.toLowerCase().replace(" ","");
        row.id = bg_name;
        row.onclick = expSingleClick(row);
        row.ondblclick = removeExport(row);
        expList.appendChild(row);
    }
}

var expSingleClick = function(row){
    return function(){
        if (expSelected){
            expSelected.style.backgroundColor = expOldColor;
        }
        expOldColor = row.style.backgroundColor;
        row.style.backgroundColor = "lightblue";
        expSelected = row;
    }
}

function removeExport(){
    return function(){
        var sRow = expSelected.getElementsByTagName('td');
        var name = sRow[0].textContent;
        if (bgname_toExp.includes(name)) {
            var idx = bgname_toExp.indexOf(name);
            if (idx > -1){
                bgname_toExp.splice(idx, 1);
                bgid_toExp.splice(idx,1);
                var name = name.toLowerCase().replace(" ","");
                var rmRow = document.getElementById(name);
                rmRow.remove();
            }
            if (bgname_toExp.length == 0){
                document.getElementById('export-btn').disabled=true;
            }
        }
    }
}

function bindButtons(){
    document.getElementById('addtoExport').addEventListener('click', addToExport());
    document.getElementById('removal').addEventListener('click', removeExport());
    document.getElementById('bgq_submit').addEventListener('click', function(event){
        var req = new XMLHttpRequest();
        var link = "https://api.geekdo.com/xmlapi2/search?query=";
        link += document.getElementById('board_game_q').value;
        var gameCheck = document.getElementById('is_board_game').checked;
        var expanCheck = document.getElementById('is_expan').checked;
        if ( gameCheck == true && expanCheck == false) {
            link += "&type=boardgame";
        } else if (gameCheck == false && expanCheck == true) {
            link += "&type=boardgameexpansion";
        } else if (gameCheck == true && expanCheck == true) {
            link += "&type=boardgame,boardgameexpansion";
        } else {
            link += "&type=boardgame,boardgameexpansion";
        }
        req.open('GET', link);
        req.addEventListener('load', function(){
            var result_table = document.getElementById('rtable');
            var to_rm = document.getElementById('nothing');
            if (to_rm){
                to_rm.remove();
            }
            to_rm = document.getElementById('nothing_row');
            if (to_rm){
                to_rm.remove();
            }
            if (req.status >= 200 && req.status < 400) {
                var xml = req.responseXML;
                ids = xml.getElementsByTagName('item');
                var tableBody = document.createElement('tbody');
                if (xml.getElementsByTagName('items')[0].getAttribute('total') == 0){
                    nothingRow = document.createElement('tr');
                    nothingCell = document.createElement('td');
                    nothingCell.textContent = 'No results found for "' + document.getElementById('board_game_q').value + '". Please search again!';
                    nothingCell.id = 'nothing';
                    nothingRow.id = 'nothing_row';
                    nothingCell.setAttribute('colspan', 4);
                    nothingCell.className = 'nothing';
                    nothingRow.appendChild(nothingCell);
                    tableBody.appendChild(nothingRow);
                }
                tableBody.id = "result_body";
                for (i = 0; i < ids.length; i++) {
                    var total = document.getElementById('resultTot');
                    total.textContent = xml.getElementsByTagName('items')[0].getAttribute('total');
                    var result_row = document.createElement('tr');
                    // result_row.onclick=;
                    var name = ids[i].getElementsByTagName('name')[0].getAttribute('value');
                    var yearpub = ids[i].getElementsByTagName('yearpublished');
                    if (yearpub.length > 0){
                        yearpub = yearpub[0].getAttribute('value');
                    } else {
                        yearpub = 'N/A';
                    }
                    var id = ids[i].id;
                    var type = ids[i].getAttribute('type');
                    if (type == "boardgame"){
                        type = "Board Game";
                    } else if (type =="boardgameexpansion"){
                        type = "Expansion";
                    } else {
                        type = "Video Game";
                    }
                    var cell = document.createElement('td');
                    cell.className = "name-cell";
                    cell.textContent = name;
                    result_row.appendChild(cell);
                    var cell = document.createElement('td');
                    cell.className = "year-cell";
                    cell.textContent = yearpub;
                    result_row.appendChild(cell);
                    var cell = document.createElement('td');
                    cell.className = "type-cell";
                    cell.textContent = type;
                    result_row.appendChild(cell);
                    var cell = document.createElement('td');
                    cell.className = "id-cell";
                    cell.textContent = id;
                    result_row.appendChild(cell);
                    result_row.onclick = singleClick(result_row);
                    result_row.ondblclick = addToExport();
                    tableBody.appendChild(result_row);
                }
            }
            var to_rm = document.getElementById('result_body');
            if (to_rm) {
                to_rm.remove();
            }
            result_table.appendChild(tableBody);
            document.getElementById('results-div').appendChild(result_table);

        })
        req.send()
        event.preventDefault();
    })
    document.getElementById('export-btn').addEventListener('click', function(event){
        //  Javascript Array into .csv file
        var req = new XMLHttpRequest();
        var link = "https://api.geekdo.com/xmlapi2/thing?id=" + bgid_toExp.join(',') + "&stats=1"
        var expan_num = document.getElementById('num_expan').checked;
        var play_num = document.getElementById('num_play').checked;
        var avg_rating = document.getElementById('avg_rating').checked;
        var bgg_rank = document.getElementById('bgg_rank').checked;
        var weight = document.getElementById('weight').checked;
        var minage = document.getElementById('minage').checked;
        var playtime = document.getElementById('playtime').checked;
        export_List = [];
        data_to_get = ['Name','Year Published'];
        if (expan_num){data_to_get.push("Number of Expansions")}
        if (play_num){data_to_get.push("Number of Players")}
        if (avg_rating){data_to_get.push("Average BGG Rating")}
        if (bgg_rank){data_to_get.push("BGG Rank")}
        if (weight){data_to_get.push("Difficulty (scale of 1-5; 1 being easiest)")}
        if (minage){data_to_get.push("Min. Recommended Age")}
        if (playtime){data_to_get.push("Playtime")}
        export_List.push(data_to_get);
        req.open('GET', link);
        req.addEventListener('load', function(){
            if (req.status >= 200 && req.status < 400){
                var xml = req.responseXML;
                items = xml.getElementsByTagName('item');
                // var toExp = [];
                // for (item = 0; i < items.length; item++){
                for (var item = 0; item < items.length; item++){
                    var toExp = [];
                    toExp.push(items[item].getElementsByTagName('name')[0].attributes[2].nodeValue);
                    toExp.push(items[item].getElementsByTagName('yearpublished')[0].attributes[0].nodeValue);
                    if (data_to_get.includes("Number of Expansions")) {
                        var expan_c = 0;
                        for (var i = 0; i < items[item].getElementsByTagName('link'); i++){
                            var eType = items[item].getElementsByTagName('link')[extra].attributes[0].nodeValue;
                            if (eType == "boardgameexpansion"){
                                expan_c += 1;
                            }
                        }
                        toExp.push(expan_c);
                    }
                    if (data_to_get.includes('Number of Players')) {
                        toExp.push(items[item].getElementsByTagName('minplayers')[0].getAttribute('value') + " to " + items[item].getElementsByTagName("maxplayers")[0].getAttribute('value') + ' players');
                    }
                    if (data_to_get.includes('Average BGG Rating')){
                        toExp.push(items[item].getElementsByTagName('statistics')[0].getElementsByTagName('average')[0].getAttribute('value'));
                    }
                    if (data_to_get.includes('BGG Rank')) {
                        toExp.push(items[item].getElementsByTagName('statistics')[0].getElementsByTagName('ranks')[0].getElementsByTagName('rank')[0].getAttribute('value'));
                    }
                    if (data_to_get.includes('Difficulty (scale of 1-5; 1 being easiest)')) {
                        toExp.push(items[item].getElementsByTagName('statistics')[0].getElementsByTagName('averageweight')[0].getAttribute('value'))
                    }
                    if (data_to_get.includes('Min. Recommended Age')) {
                        toExp.push(items[item].getElementsByTagName('minage')[0].getAttribute('value'));
                    }
                    if (data_to_get.includes('Playtime')) {
                        toExp.push(items[item].getElementsByTagName('minplaytime')[0].getAttribute('value') + " - " + items[item].getElementsByTagName("maxplaytime")[0].getAttribute('value') + ' min');
                    }
                    export_List.push(toExp);
                    
                }
                var csvContent = "data:text/csv;charset=utf-8,";
                for (var row = 0; row < export_List.length; row++){
                    var csvrow = export_List[row].join(',');
                    csvContent += csvrow + ",\r\n";
                }
                var encodedUri = encodeURI(csvContent);
                var dlLink = document.createElement('a');
                dlLink.setAttribute('href', encodedUri);
                dlLink.setAttribute('download', 'boardgameData.csv');
                dlLink.id = "dlLink";
                document.body.appendChild(dlLink);
                dlLink.click()
                document.getElementById('dlLink').remove();
            }
        })
        req.send();
        event.preventDefault();
    })
}

