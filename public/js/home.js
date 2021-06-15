document.addEventListener('DOMContentLoaded', function(){
    newActive = document.getElementById('nav-home');
    newActive.className += ' active';
    newActive.setAttribute('aria-current', 'page');
    document.getElementById('rm1').addEventListener('click', function(){
        document.getElementById('desc').textContent = 'The home page is currently very very empty. The only thing there is a carousel of photos. Work on adding a news feed in order to add more variety to the page.'
    })
    document.getElementById('rm2').addEventListener('click', function(){
        document.getElementById('desc').textContent = 'Want to create my own version of a notes/to-do list. Need to implement a database first and then after work on adding this feature.'
    })
    document.getElementById('rm3').addEventListener('click', function(){
        document.getElementById('desc').textContent = 'A few pages have the layout not looking correctly and a bit wonky. Not all of them scale properly with screen size so fixing that is a priority!'
    })
    document.getElementById('rm4').addEventListener('click', function(){
        document.getElementById('desc').textContent = 'Add the ability to login and see your own personal to-do list if you have at least one item on it. Also add admin permissions (add page, delete page, etc).'
    })
})

// CAROUSEL EXPLANATION
// The JavaScript behind making the carousel is such that it creates a few constants, the notable ones being the default attributes like the interval, pausing on hover, and wrapping around.  
// The private function _slide is the meat of the carousel activity. It queries the element that is currently with the class active and grabs the index. 
// It has a few checks to ensure that if the default event is prevented, or if the next element is the same as the active element or if something strange is happening then the function ends. 
// If then sets the new active element and sets the indicator. Then it adds some class names until the slide is finished, like which direction the slide is going and adds the active element to the next element). 
// Then right before the transition begins it removes all added classes, other than the active class and triggers the transition. 
// There are also some public functions that ensure the carousel isn't sliding when the page isn't visible.
// The CSS for the carousel is simple as it has transitions where it has some classes that move the picture 100% to the left or right depending on if the item is previous or next. 
// Also the SCSS creates alternate transitions other than just moving to the left or right, as there is also a fade for it. 

document.addEventListener('DOMContentLoaded', function(){
    var req = new XMLHttpRequest();
    var link = "https://api.geekdo.com/xmlapi2/hot?type=boardgame";
    req.open('GET', link);
    var top2 = [];
    req.addEventListener('load', function(){
        if (req.status >= 200 && req.status <  400){
            var xml = req.responseXML;
            // var hots = [];
            top2.push(xml.getElementsByTagName('item')[0].getAttribute('id'));
            top2.push(xml.getElementsByTagName('item')[1].getAttribute('id'));  
            var req2 = new XMLHttpRequest();
            var link2 = "https://api.geekdo.com/xmlapi2/thing?id=" + top2.join(',') + "&stats=1";
            req2.open('GET', link2);
            req2.addEventListener('load', function(){
                if (req2.status >= 200 && req2.status < 400){
                    var xml2 = req2.responseXML;
                    if (xml2.getElementsByTagName('image').length > 0){
                        var pic1 = document.getElementById('bgpic1');
                        var pic2 = document.getElementById('bgpic2');
                        pic1.src = xml2.getElementsByTagName('image')[0].textContent;
                        pic2.src = xml2.getElementsByTagName('image')[1].textContent;
                        pic1.onclick = function() {window.open("https://boardgamegeek.com/boardgame/" + xml2.getElementsByTagName('item')[0].id, '_blank')};
                        pic2.onclick = function() {window.open("https://boardgamegeek.com/boardgame/" + xml2.getElementsByTagName('item')[1].id, '_blank')};
                        var pic1cap = document.getElementById('bgh1');
                        pic1cap.textContent = xml2.getElementsByTagName('item')[0].getElementsByTagName('name')[0].getAttribute('value');
                        var pic2cap = document.getElementById('bgh2');
                        pic2cap.textContent = xml2.getElementsByTagName('item')[1].getElementsByTagName('name')[0].getAttribute('value')
                    }
                }
            });
            req2.send();
        }
    });
    req.send();
    var sideProj = document.getElementById('caritem1');
    sideProj.href="/side-projects";
});
