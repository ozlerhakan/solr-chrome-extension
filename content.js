
function injectNewButtons() {
  console.info('DOM loaded');
  initOn();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', injectNewButtons);
} else { 
  injectNewButtons();
}

document.addEventListener("click", function(msg){ 
   initOn();
}); 

function initOn() {
    var query_selector = document.querySelector("div#query");
    if(document.querySelector("button#solr_up")) {
        return;
    }
    if(query_selector == undefined) {
        return;
    }
    var ahref = document.createElement('button');
    ahref.type = 'submit';
    ahref.id = 'solr_up';
    ahref.textContent = 'UP';
    ahref.style.cssText = "position: fixed;bottom: 95px;right: 63px;";
    query_selector.parentNode.insertBefore(ahref, query_selector.nextSibling);

    ahref.onclick = function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (document.querySelector("button#buton_solr")) {
        return;
    }
    var index = document.createElement('button');
    index.type = 'submit';
    index.id = 'buton_solr';
    index.textContent = 'Row Numbers';
    index.style.cssText = "margin-top: 10px;";
    index.addEventListener("click", insertRowNumbers, false);

    var query = document.querySelector("form.ng-pristine");
    query.parentNode.insertBefore(index, query.nextSibling);
}

function httpGet(theUrl, sendResponse) {
    fetch(theUrl)
      .then(response => response.json())
      .then(body => body.response)
      .then(solrResponse => solrResponse.docs)
      .then(json => sendResponse(json))
    return true;
}

function insertRowNumbers(){
    href_url = document.querySelector('#url').href;
    if (href_url) {
        httpGet(href_url, function(json) {
            var columns = new Map();
            for (const entry of json.entries()) {
                columns.set(entry[0], Object.keys(entry[1]).length);
            }
            row_numbers = 1;
            nOfkeys = 0;
            console.log(columns)
            document.querySelectorAll('#response > pre > code > span:nth-child(4) > span:nth-child(6) span.value').forEach(function (box, i) { 
                if (i == 0) {
                    nOfkeys = columns.get(0);
                }
                box.setAttribute("title", row_numbers);
                if ((i+1) % nOfkeys == 0) {
                    row_numbers += 1;
                    nOfkeys += columns.get(row_numbers - 1);
                }
            });
        });
    }
}

