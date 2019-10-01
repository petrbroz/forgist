# forgist

[Autodesk Forge](https://forge.autodesk.com) application
providing authentication and sample data for various code snippet websites
such as [jsfiddle](https://jsfiddle.net) or [codepen](https://codepen.io).

> If you're interested in seeing additional APIs and models other than those listed below,
> submit a [feature request](https://github.com/petrbroz/forgist/issues/new).

## Endpoints

### GET /api/token

Returns a 2-legged OAuth token with `viewables:read` scope.

#### Request

`GET https://forgist.herokuapp.com/api/token`

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

`GET https://forgist.herokuapp.com/api/models`

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

## Models

| Thumbnail | Name | Credit |
| --------- | ---- | ------ |
| ![rac_basic_sample_project.rvt](docs/rac_basic_sample_project.rvt.200x200.png) | rac_basic_sample_project.rvt | [Autodesk Revit 2019 sample files](https://knowledge.autodesk.com/support/revit-products/getting-started/caas/CloudHelp/cloudhelp/2019/ENU/Revit-GetStarted/files/GUID-61EF2F22-3A1F-4317-B925-1E85F138BE88-htm.html) |
| ![rac_advanced_sample_project.rvt](docs/rac_advanced_sample_project.rvt.200x200.png) | rac_advanced_sample_project.rvt | [Autodesk Revit 2019 sample files](https://knowledge.autodesk.com/support/revit-products/getting-started/caas/CloudHelp/cloudhelp/2019/ENU/Revit-GetStarted/files/GUID-61EF2F22-3A1F-4317-B925-1E85F138BE88-htm.html) |
| ![rst_basic_sample_project.rvt](docs/rst_basic_sample_project.rvt.200x200.png) | rst_basic_sample_project.rvt | [Autodesk Revit 2019 sample files](https://knowledge.autodesk.com/support/revit-products/getting-started/caas/CloudHelp/cloudhelp/2019/ENU/Revit-GetStarted/files/GUID-61EF2F22-3A1F-4317-B925-1E85F138BE88-htm.html) |
| ![rst_advanced_sample_project.rvt](docs/rst_advanced_sample_project.rvt.200x200.png) | rst_advanced_sample_project.rvt | [Autodesk Revit 2019 sample files](https://knowledge.autodesk.com/support/revit-products/getting-started/caas/CloudHelp/cloudhelp/2019/ENU/Revit-GetStarted/files/GUID-61EF2F22-3A1F-4317-B925-1E85F138BE88-htm.html) |
| ![rme_basic_sample_project.rvt](docs/rme_basic_sample_project.rvt.200x200.png) | rme_basic_sample_project.rvt | [Autodesk Revit 2019 sample files](https://knowledge.autodesk.com/support/revit-products/getting-started/caas/CloudHelp/cloudhelp/2019/ENU/Revit-GetStarted/files/GUID-61EF2F22-3A1F-4317-B925-1E85F138BE88-htm.html) |
| ![rme_advanced_sample_project_.rvt](docs/rme_advanced_sample_project_.rvt.200x200.png) | rme_advanced_sample_project_.rvt | [Autodesk Revit 2019 sample files](https://knowledge.autodesk.com/support/revit-products/getting-started/caas/CloudHelp/cloudhelp/2019/ENU/Revit-GetStarted/files/GUID-61EF2F22-3A1F-4317-B925-1E85F138BE88-htm.html) |