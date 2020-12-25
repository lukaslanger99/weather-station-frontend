// perhaps a class would be cleaner here?
const STATIONIDS_RESPONSE = 1;
const WEATHER_RESPONSE = 0;
const stationNames = {};

// make sure to keep on port 8080
const ws = new WebSocket("ws://localhost:8080");

ws.onmessage = (event) => {
    console.log("Response: "+event.data);
    parseResponse(event.data);
}

function updateStationSelection() {
    var stations = document.getElementById("stationList");
    var stationName = stations.value;
    console.log("selected station: "+stationName);
}

function requestStations() {
    ws.onopen = () => {
        console.log("Connection established ");
        const json = {
            "id": 1
        };

        const request = encodeToHex(json);
        console.log("Request: "+request);
        ws.send(request);
    }
}

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
        const json = {
            "id": 0,
            "stationIds": selectedStations
        }
        const request = encodeToHex(json);
        console.log("Request: "+request);
        ws.send(request);
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
    json = JSON.parse(json);
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

function toBigEndian(val) {
    var byteArray = [0, 0];

    for (var i = 0; i < byteArray.length; ++i) {
        var byte = val & 0xff;
        byteArray[i] = byte;
        val = (val - byte) >> 8;
    }

    return byteArray;
}

function encodeToHex(obj) {
    var str = JSON.stringify(obj);
    var hexArray = [];

    // copy size in big endian
    var size = toBigEndian(str.length);
    for (var i = 0; i < 2; ++i) {
        hexArray[i] = size[i];
    }

    for (var i = 0; i < str.length; ++i) {
        var bytes = [];
        for (var j = 0; j < str[i].length; ++j) {
            bytes.push(str[i].charCodeAt(j));
        }
        hexArray.push(bytes);
    }
    const payloadSize = hexArray.length;
    const buffer = new ArrayBuffer(payloadSize);
    const dataView = new DataView(buffer);

    for (var i = 0; i < payloadSize; ++i) {
        dataView.setUint8(i, hexArray[i]);
        console.log(dataView.getUint8(i));
    }
    return dataView;
}
