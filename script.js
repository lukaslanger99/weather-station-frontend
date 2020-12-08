const STATIONIDS_RESPONSE = 1;
const WEATHER_RESPONSE = 0;

function getJSON() {
    const obj = {
        "id": 0,
        "stationId": 1,
        "temperature": 27.4,
        "humidity": 44.2,
        "time": "2021-01-01 14:03:55"
      };
      const objStr = JSON.stringify(obj);
      return JSON.parse(objStr);
}

function updateStationSelection() {
    var stations = document.getElementById("stationList");
    var stationName = stations.value;
    console.log("selected station: "+stationName);
}

function getStations() {
    //TODO send request to server
    const obj = {
        "id": 1,
        "stations": [0, 1, 2]
      };
    const objStr = JSON.stringify(obj);
    return JSON.parse(objStr);
}

function createCheckboxList() {
    stationsJSON = getStations();
    stationIDs = stationsJSON.stations;
    var html = "";
    stationIDs.forEach(station => {
        var stationName = idToName(station);
        html += "<label><input type=\"checkbox\" name=\"station\" value=\""+stationName+"\">"+stationName+"</label>"
    });
    console.log(html);
    document.getElementById("checkboxgroup").innerHTML = html;

    addCheckboxListener();
}

function addCheckboxListener() {
    var checkboxes = document.querySelectorAll("input[type=checkbox][name=station]");
    var enabledSettings = [];            
    checkboxes.forEach(function(checkbox) {
      checkbox.addEventListener('change', function() {
        enabledSettings = Array.from(checkboxes).filter(i => i.checked).map(i => i.value);
        console.log(enabledSettings);
        })
    });
}

function getSelectedStation() {
    var stations = document.getElementById("stationList");
    return stations.value;
}

function getJSONFromBackend(station) {
    //TODO
    url = "";
    ws = new WebSocket(url);
}

function showData(data) {
    document.getElementById("title").innerHTML = "Station: "+idToName(data.stationId);
    document.getElementById("degrees").innerHTML = data.temperature+" °C";
    document.getElementById("humidity").innerHTML = "Luftfeuchtigkeit: "+data.humidity+"%";
    document.getElementById("date").innerHTML = data.time;
}

function idToName(id) {
    if (id == 0) {
        return "GOE";
    } else if (id == 1) {
        return "WF";
    } else if (id == 2) {
        return "BS";
    } else {
        return "ERROR";
    }
}

function parseResponse(json) {
    switch (json.id) {
        case STATIONIDS_RESPONSE:
            
            break;
        case WEATHER_RESPONSE:
        
            break;
    
        default:
            break;
    }
}