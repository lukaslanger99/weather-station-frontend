const STATIONIDS_RESPONSE = 1;
const WEATHER_RESPONSE = 0;

const stationNames = {};
const weatherData = {};

const ws = new WebSocket("ws://localhost:8080");

ws.onmessage = (event) => {
    console.log("Response: "+event.data);
    parseResponse(event.data);
}

function requestStations() {
    ws.onopen = () => {
        sendStationRequest();
    }
}

function sendStationRequest() {
    console.log("Connection established ");
    const json = {
        "id": 1
    };

    const request = encodeToHex(json);
    console.log("Request: "+request);
    ws.send(request);
}

function createCheckboxList() {
    stationIDs = stationsJSON.stations;
    var html = "<ul class=\"checkboxList\">\
    Station List\
    <button onClick=\"sendStationRequest()\">Refresh</button>\
    <li class=\"checkboxListItem\"><input type=\"checkbox\" name=\"groupSelector\" value=\"all\">Toggle All</li>";
    stationIDs.forEach(station => {
        html += "<li class=\"checkboxListItem\"><input type=\"checkbox\" name=\"station\" value=\""+station.stationId+"\">"+station.stationName+"</li>";
        stationNames[station.stationId] = station.stationName;
    });
    html += "<button onClick=\"requestWeatherData()\">Send</button>";
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
    });
}

function getSelectedStations() {
    var checkboxes = document.querySelectorAll("input[type=checkbox][name=station]");
    var selectedStations = [];            
    checkboxes.forEach(function() {
        selectedStations = Array.from(checkboxes).filter(i => i.checked).map(i => parseInt(i.value));
    });
    resetCheckboxList(checkboxes);
    return selectedStations;
}

function resetCheckboxList(checkboxes) {
    checkboxes.forEach(function(checkbox) {
        checkbox.checked = false;
    });
    selectAllCheckbox = document.querySelector("input[type=checkbox][name=groupSelector]");
    selectAllCheckbox.checked = false;
}

function requestWeatherData() {
    const json = {
        "id": 0,
        "stationIds": getSelectedStations()
    }
    const request = encodeToHex(json);
    console.log("Request: "+request);
    ws.send(request);
}

function saveData(data) {
    weatherData[data['stationId']] = data;
}

function deleteStation(id) {
    delete weatherData[id];
    showData();
}

function showData() {
    var html = "";
    for (var station in weatherData) {
        var stationId = weatherData[station]["stationId"];
        html += "\
        <div class=\"box\" id=\"station"+stationId+"\">\
            <div class\"stationdata\">\
            <div id=\"title\" class=\"boxitem\">Station: "+idToName(stationId)+"</div>\
            <div id=\"degrees\" class=\"boxitem\">"+(weatherData[station]["temperature"]).toFixed(1)+" °C</div>\
            <div id=\"humidity\" class=\"boxitem\">Humidity: "+(weatherData[station]["humidity"]).toFixed(1)+" %</div>\
            <div id=\"date\" class=\"boxitem\">"+weatherData[station]["time"]+"</div>\
            </div>\
            <div class=\"buttonbox\"><button onClick=\"deleteStation("+stationId+")\">Delete</button></div>\
        </div>\
        ";
    }
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
            saveData(json);
            showData();
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
        // console.log(dataView.getUint8(i));
    }
    return dataView;
}
