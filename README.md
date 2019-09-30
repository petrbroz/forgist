# jsfiddle-forge-backend

Simple [Autodesk Forge](https://forge.autodesk.com) application
providing authentication and sample data for [jsfiddle](https://jsfiddle.net) snippets.

## Available endpoints

### GET /api/token

Returns a 2-legged OAuth token with `viewables:read` scope.

#### Request

`GET https://jsfiddle-forge-backend.herokuapp.com/api/token`

#### Response

```json
{
    "access_token": "<access-token>",
    "expires_in": <expiration-time-in-seconds>
}
```

### GET /api/models

Returns a collection of sample models ready for viewing.

#### Request

`GET https://jsfiddle-forge-backend.herokuapp.com/api/models`

#### Response

```json
[
    {
        "name": "<name-of-model>",
        "urn": "<model-urn>"
    },
    {
        "name": "<name-of-model>",
        "urn": "<model-urn>"
    },
        {
        "name": "<name-of-model>",
        "urn": "<model-urn>"
    }
]
```
