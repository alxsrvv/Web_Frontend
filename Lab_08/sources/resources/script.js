let xmlhelp = new XMLHttpRequest();
let CODE;
let FULL_URL;
const URL = "https://cloud.iexapis.com/v1/stock/market/batch?symbols=gm,foxa,dis,nflx,aapl,googl,msft,nvda&types=quote&token=";
const REQUEST_UPDATE = 20000;
const TIMER_UPDATE = 100;
let latest_updated_time = 0;

function tableCreate(valArray) {
    let keys = [];
    for (let key in valArray) 
      keys.push(key);

    let body = document.body;
    let tbl  = document.createElement('table');

    tbl.setAttribute("bgcolor", "azure");
    tbl.setAttribute("id", "mainTable");
    tbl.setAttribute("align", "center");
    tbl.setAttribute('style', 'height: 500px; width: 400px; border: 1px solid black');
    
    let title = tbl.insertRow();
    title.insertCell().appendChild(document.createTextNode("Company name"));
    title.insertCell().appendChild(document.createTextNode("Position"));
    title.insertCell().appendChild(document.createTextNode("Last price"));
    title.insertCell().appendChild(document.createTextNode("Price change"));

    for(var i = 0; i < 8; i++){
      let tr = tbl.insertRow();
      for(var j = 0; j < 4; j++){
        let td = tr.insertCell();
        td.setAttribute("style", "border: 1px solid black;")
    
        if (j == 0)
          td.appendChild(document.createTextNode(valArray[keys[i]]["quote"]["companyName"]));
        else if (j == 1)
          td.appendChild(document.createTextNode(valArray[keys[i]]["quote"]["symbol"]));
        else if (j == 2)
          td.appendChild(document.createTextNode(valArray[keys[i]]["quote"]["latestPrice"]));
        else if (j == 3)
          td.appendChild(document.createTextNode((0).toFixed(4)));
      }
    }
    body.appendChild(tbl);
}

function tableInsert(valArray) {
  let keys = [];
  for (let key in valArray) 
    keys.push(key);

  let tbl = document.getElementById('mainTable');
  for(var i = 1; i < 9; i++){
    let prev_val;
    let cur_val;
    for(var j = 2; j < 4; j++){  
      if (j == 2) {
        prev_val = tbl.rows[i].cells[j].innerHTML;
        tbl.rows[i].cells[j].innerHTML = valArray[keys[i-1]]["quote"]["latestPrice"];
        cur_val = tbl.rows[i].cells[j].innerHTML;
      }
      else if (j == 3) 
        tbl.rows[i].cells[j].innerHTML = (cur_val - prev_val).toFixed(4);
    }
  }
}

function submitValue() {
  CODE = document.getElementById("key").value;
  FULL_URL = URL + CODE;
  run();
}

function run() {
  xmlhelp.onreadystatechange = () => {
    if (xmlhelp.readyState == 4 && xmlhelp.status == 200) {
      let valArray = JSON.parse(xmlhelp.responseText);
      tableCreate(valArray);
      latest_updated_time = Date.now();
    }
    else if (xmlhelp.status == 403 || xmlhelp.status == 400) {
      alert("Bad key entered. Reload page!")
      xmlhelp.abort()
    }
    let input = document.getElementById("input");
    input.style.display = "none";
  }
  xmlhelp.open("GET", FULL_URL, true);
  xmlhelp.send();

  let interval$ = rxjs.interval(REQUEST_UPDATE)
    .subscribe( () => {
	
	    xmlhelp.onreadystatechange = () => {
		    if (xmlhelp.readyState === 4 && xmlhelp.status === 200) {
			    let valArray = JSON.parse(xmlhelp.responseText);
          tableInsert(valArray);
          latest_updated_time = Date.now();
		    }
	    }
      xmlhelp.open("GET", FULL_URL, true);
	    xmlhelp.send();
  });

  let timeUpdate$ = rxjs.interval(TIMER_UPDATE)
    .subscribe( () => {
      if (latest_updated_time) {
        let time_update_place = document.getElementById("timeAfterUpdate");
        time_update_place.innerHTML = "Time by price update: " + 
        ((Date.now() - latest_updated_time)/1000).toFixed(1) + " SEC";
      }
  });
}