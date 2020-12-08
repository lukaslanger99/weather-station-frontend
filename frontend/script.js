const SINGLE_STATION_RESPONSE = 0;
const STATIONIDS_RESPONSE = 3;
const MULTIPLE_STATIONS_RESPONSE = 5;

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

function updateCheckboxList() {
    var checkboxes = document.querySelectorAll("input[type=checkbox][name=station]");
    let enabledSettings = []

    checkboxes.forEach(function(checkbox) {
      checkbox.addEventListener('change', function() {
        enabledSettings = Array.from(checkboxes).filter(i => i.checked).map(i => i.value);
    })
    console.log(enabledSettings);
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
        case SINGLE_STATION_RESPONSE:
            
            break;
        case STATIONIDS_RESPONSE:
        
            break;
        case MULTIPLE_STATIONS_RESPONSE:
        
            break;
    
        default:
            break;
    }
}