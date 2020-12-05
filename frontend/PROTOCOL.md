# Overview
Describes the basic protocol between the Server and the Frontend.

> Sending a request for station Ids
```json
{
    "id": 2
}
```
> Receiving station Ids
```json
{
    "id": 3,
    "stations": [
        {
            "id": 0,
            "stationId": 0
        },
        {
            "id": 0,
            "stationId": 1
        },
        {
            "id": 0,
            "stationId": 2
        }
    ]
}
```

> Sending a weather status request:
```json
{
    "id": 0,
    "stationId": 1
}
```

> Sending a weather status request (multiple stations):
```json
{
    "id": 4,
    "stations": [
        {
            "id": 0,
            "stationId": 1
        },
        {
            "id": 0,
            "stationId": 2
        }
    ]
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

> Receiving a weather status response(multiple stations):
```json
{
    "id": 5,
    "stations": [
        {
            "id": 0,
            "stationId": 1,
            "temperature": 27.4,
            "humidity": 44.2,
            "time": "2021-01-01 14:03:55"
        },
        {
            "id": 0,
            "stationId": 2,
            "temperature": 27.4,
            "humidity": 44.2,
            "time": "2021-01-01 14:03:55"
        }
    ]
}
```