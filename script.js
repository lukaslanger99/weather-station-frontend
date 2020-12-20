const STATIONIDS_RESPONSE = 1;
const WEATHER_RESPONSE = 0;

const stationNames = {};

const ws = new WebSocket("ws://localhost:80");


ws.onmessage = (event) => {
    console.log(event.data);
    parseResponse(event.data);
}

// function getJSON(json) {
//     // const obj = {
//     //     "id": 0,
//     //     "stations": [
//     //         {
//     //             "stationId": 1,
//     //             "temperature": 27.4,
//     //             "humidity": 44.2,
//     //             "time": "2021-01-01 14:03:55"
//     //         },
//     //         {
//     //             "stationId": 2,
//     //             "temperature": 30.0,
//     //             "humidity": 84.8,
//     //             "time": "2021-01-01 18:48:29"
//     //         }
//     //     ]
//     // };
//       const objStr = JSON.stringify(json);
//       return JSON.parse(objStr);
// }

function updateStationSelection() {
    var stations = document.getElementById("stationList");
    var stationName = stations.value;
    console.log("selected station: "+stationName);
}


function requestStations() {
    // const json = {
    //     "id": 1
    // };
    // ws.send(json);
    ws.onopen = () => {
        console.log("Connection established ");
        // requestStations();
        const json = {
            "id": 1
        };
        const encoded: Uint8Array = encode({id: 1});
        console.log(encoded);
        ws.send(json);
    }
}

// function getStations(json) {
//     //TODO send request to server
//     // const obj = {
//     //     "id": 1,
//     //     "stations": [
//     //         {
//     //             "stationId": 0,
//     //             "stationName": "GOE"
//     //         },
//     //         {
//     //             "stationId": 1,
//     //             "stationName": "WF"
//     //         },
//     //         {
//     //             "stationId": 2,
//     //             "stationName": "BS"
//     //         }
//     //     ]
//     // };
//     const objStr = JSON.stringify(json);
//     return JSON.parse(objStr);
// }

function createCheckboxList() {
    stationIDs = stationsJSON.stations;
    var html = "<ul class=\"checkboxList\">\
    <li class=\"checkboxListItem\"><input type=\"checkbox\" name=\"groupSelector\" value=\"all\">Toggle All</li>";
    stationIDs.forEach(station => {
        html += "<li class=\"checkboxListItem\"><input type=\"checkbox\" name=\"station\" value=\""+station.stationId+"\">"+station.stationName+"</li>";
        stationNames[station.stationId] = station.stationName;
    });
    document.getElementById("checkboxgroup").innerHTML = html+"</ul>";
    addCheckboxListener();
}

function addCheckboxListener() {
    selectAllCheckbox = document.querySelector("input[type=checkbox][name=groupSelector]");
    selectAllCheckbox.addEventListener('change', function() {
        var checkboxes = document.querySelectorAll("input[type=checkbox][name=station]");
        checkboxes.forEach(function(checkbox) {
            checkbox.checked = selectAllCheckbox.checked;
        });
        requestWeatherData(Array.from(document.querySelectorAll("input[type=checkbox][name=station]")).filter(i => i.checked).map(i => parseInt(i.value)));
    });

    var checkboxes = document.querySelectorAll("input[type=checkbox][name=station]");
    var selectedStations = [];            
    checkboxes.forEach(function(checkbox) {
      checkbox.addEventListener('change', function() {
        selectedStations = Array.from(checkboxes).filter(i => i.checked).map(i => parseInt(i.value));
        requestWeatherData(selectedStations);
        });
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

function showData(data) {
    var html = "";
    data.stations.forEach(station => {
        html += "\
        <div class=\"box\" id=\"station"+station.stationId+"\">\
            <div id=\"title\" class=\"title\">Station: "+idToName(station.stationId)+"</div>\
            <div id=\"degrees\" class=\"degrees\">"+station.temperature+" °C</div>\
            <div id=\"humidity\" class=\"humidity\">Luftfeuchtigkeit: "+station.humidity+"</div>\
            <div id=\"date\" class=\"date\">"+station.time+"</div>\
        </div>\
        ";
    });
    document.getElementById("boxes").innerHTML = html;
}

function idToName(id) {
    return stationNames[id];
}

function parseResponse(json) {
    switch (json.id) {
        case STATIONIDS_RESPONSE:
            stationsJSON = json;
            createCheckboxList();
            break;
        case WEATHER_RESPONSE:
            showData(json);
            break;
        default:
            break;
    }
}