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

function getSelectedStation() {
    var stations = document.getElementById("stationList");
    return stations.value;
}

function getJSONFromBackend(station) {
    //TODO
}

function showData(data) {
    document.getElementById("title").innerHTML = "Station: "+data.stationId;
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