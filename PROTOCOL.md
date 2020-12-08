# Overview
Describes the basic protocol between the Server and the Frontend.

Each request is encoded in the following manner:
Example for requesting the StationIds:
{
    "id": 1
}

After messagepack encode:
0x81,0xa2,0x69,0x64,0x01

Problem: The server neeeds to know how long the payload is, in order for it to fully read the request.
Solution: Supply a (network-order / big-endian) length field (2 bytes) before the transmission.

length(0x81,0xa2,0x69,0x64,0x01) = 5 bytes

Thus the payload becomes:
0x05,0x00,0x81,0xa2,0x69,0x64,0x01

Now the server knows that the incoming request is 5 bytes long and can happily parse the data.

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
