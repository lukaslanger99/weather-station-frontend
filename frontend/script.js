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