# Overview
Describes the basic protocol between the Server and the Frontend.

> Sending a request for station Ids
```json
{
    "id": 1
}
```
> Receiving station Ids
```json
{
    "id": 1,
    "stations": [0, 1, 2]
}
```

> Sending a weather status request:
```json
{
    "id": 0,
    "stationIds": [1]
}
```

> Receiving a weather status response:
```json
{
    "id": 0,
    "stationId": 1,
    "temperature": 27.4,
    "humidity": 44.2,
    "time": "2021-01-01 14:03:55"
}
```

> Sending a weather status request (multiple stations):
```json
{
    "id": 0,
    "stationIds": [1, 2]
}
```

> Receiving a weather status response(multiple stations):
```json
{
    "id": 0,
    "stations": [
        {
            "stationId": 1,
            "temperature": 27.4,
            "humidity": 44.2,
            "time": "2021-01-01 14:03:55"
        },
        {
            "stationId": 2,
            "temperature": 30.0,
            "humidity": 84.8,
            "time": "2021-01-01 18:48:29"
        }
    ]
}
```
