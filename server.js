const path = require('path');
const express = require('express');
const cors = require('cors');
const { AuthenticationClient, DataManagementClient, urnify } = require('forge-server-utils');

const port = process.env.PORT || 3000;
const { FORGE_CLIENT_ID, FORGE_CLIENT_SECRET, FORGE_BUCKET, CORS_ORIGINS } = process.env;
if (!FORGE_CLIENT_ID || !FORGE_CLIENT_SECRET || !FORGE_BUCKET || !CORS_ORIGINS) {
    console.warn('Missing some of the following env. variables:');
    console.warn('FORGE_CLIENT_ID, FORGE_CLIENT_SECRET, FORGE_BUCKET, CORS_ORIGINS');
    return;
}

let app = express();
let authenticationClient = new AuthenticationClient(FORGE_CLIENT_ID, FORGE_CLIENT_SECRET);
let dataManagementClient = new DataManagementClient({ client_id: FORGE_CLIENT_ID, client_secret: FORGE_CLIENT_SECRET });

app.use(cors({ origin: CORS_ORIGINS.split(',') }));
app.get('/api/token', async function(req, res) {
    try {
        const token = await authenticationClient.authenticate(['viewables:read']);
        res.json(token);
    } catch(err) {
        res.status(500).send(err);
    }
});
app.get('/api/models', async function(req, res) {
    try {
        const objects = await dataManagementClient.listObjects(FORGE_BUCKET);
        res.json(objects.map(function (obj) {
            return {
                name: obj.objectKey,
                urn: urnify(obj.objectId)
            };
        }));
    } catch(err) {
        res.status(500).send(err);
    }
});
app.use('/client', express.static(path.join(__dirname, 'client')));
app.listen(port, () => console.log(`Server listening on port ${port}...`));
