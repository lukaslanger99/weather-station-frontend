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
        "stations": [
            {
                "stationId": 0,
                "stationName": "GOE"
            },
            {
                "stationId": 1,
                "stationName": "WF"
            },
            {
                "stationId": 2,
                "stationName": "BS"
            }
        ]
    }
    const objStr = JSON.stringify(obj);
    return JSON.parse(objStr);
}

function createCheckboxList() {
    stationsJSON = getStations();
    stationIDs = stationsJSON.stations;
    var html = "";
    stationIDs.forEach(station => {
        html += "<label><input type=\"checkbox\" name=\"station\" value=\""+station.stationId+"\">"+station.stationName+"</label>"
    });
    document.getElementById("checkboxgroup").innerHTML = html;

    addCheckboxListener();
}

function addCheckboxListener() {
    var checkboxes = document.querySelectorAll("input[type=checkbox][name=station]");
    var selectedStations = [];            
    checkboxes.forEach(function(checkbox) {
      checkbox.addEventListener('change', function() {
        selectedStations = Array.from(checkboxes).filter(i => i.checked).map(i => parseInt(i.value));
        requestWeatherData(selectedStations);
        })
    });
}

function requestWeatherData(selectedStations) {
    if (selectedStations.length != 0) {
        const obj = {
            "id": 0,
            "stationIds": [selectedStations]
        }
        const objStr = JSON.stringify(obj);
        console.log(objStr);
        // send -> JSON.parse(objStr));
    }
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