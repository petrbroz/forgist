/// import * as Autodesk from "@types/forge-viewer";

/**
 * Lists names and URNs of models available for viewing.
 * @async
 * @returns {Promise<{ name: string; urn: string; }[]>} List of models.
 */
 export async function listModels() {
    const resp = await fetch(new URL('/api/models', import.meta.url));
    if (!resp.ok) {
        throw new Error(await resp.text());
    }
    return resp.json();
}

/**
 * Initializes new viewer instance.
 * @async
 * @param {HTMLElement} container HTML element for hosting the viewer component.
 * @param {string[]} [extensions] Optional list of viewer extensions.
 * @returns {Promise<Autodesk.Viewing.GuiViewer3D>} Promise which resolves into the viewer instance.
 */
export async function initViewer(container, extensions) {
    async function getAccessToken(callback) {
        const resp = await fetch(new URL('/api/token', import.meta.url));
        if (resp.ok) {
            const { access_token, expires_in } = await resp.json();
            callback(access_token, expires_in);
        } else {
            alert('Could not obtain access token. See the console for more details.');
            console.error(await resp.text());
        }
    }
    return new Promise(function (resolve, reject) {
        Autodesk.Viewing.Initializer({ getAccessToken }, async function () {
            const viewer = new Autodesk.Viewing.GuiViewer3D(container, { extensions });
            viewer.start();
            resolve(viewer);
        });
    });
}

/**
 * Loads model into the viewer.
 * @param {Autodesk.Viewing.GuiViewer3D} viewer Viewer instance.
 * @param {string} urn Base64-encoded URN of model to load.
 * @param {string} [guid] Optional GUIID of the model viewable to load.
 * @returns {Promise<Autodesk.Viewing.Model>}
 */
export async function loadModel(viewer, urn, guid) {
    return new Promise(function (resolve, reject) {
        function onDocumentLoadSuccess(doc) {
            const root = doc.getRoot();
            viewer.loadDocumentNode(doc, guid ? root.findByGuid(guid) : root.getDefaultGeometry())
                .then(resolve)
                .catch(reject);
        }
        function onDocumentLoadFailure(code, message) {
            reject(message);
        }
        Autodesk.Viewing.Document.load('urn:' + urn, onDocumentLoadSuccess, onDocumentLoadFailure);
    });
}

/**
 * Sets up a basic Forge Viewer environment for quick experiments.
 * @async
 * @param {HTMLElement} container HTML element for hosting the viewer component.
 * @param {string} [model] Name of the model to be loaded.
 * @returns {Promise<Autodesk.Viewing.GuiViewer3D>} Promise which resolves into the viewer instance,
 * or gets rejected in case of an issue.
 */
export async function setup(container, model) {
    const viewer = await initViewer(container);
    if (model) {
        const models = await listModels();
        const match = models.find(item => item.name === model);
        if (match) {
            await loadModel(viewer, match.urn)
        }
    }
    return viewer;
}
