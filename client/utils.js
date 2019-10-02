const forgist = {
    BackendUrl: 'https://forgist.herokuapp.com'
};

/**
 * Lists names and URNs of models available for viewing.
 * @async
 * @returns {Promise<object[]>} Promise which resolves into list of models,
 * with each model containing 'name' and 'urn' properties.
 */
forgist.listModels = () => fetch(`${forgist.BackendUrl}/api/models`).then(resp => resp.json());

/**
 * Initializes new viewer instance.
 * @async
 * @param {HTMLElement} container HTML element for hosting the viewer component.
 * @returns {Promise<GuiViewer3D>} Promise which resolves into the viewer instance.
 */
forgist.initViewer = (container) => new Promise(function (resolve, reject) {
    const options = {
        getAccessToken: function (callback) {
            fetch(`${forgist.BackendUrl}/api/token`)
                .then(resp => resp.json())
                .then(auth => callback(auth.access_token, auth.expires_in))
                .catch(err => container.innerHTML = err);
        }
    };
    Autodesk.Viewing.Initializer(options, function () {
        const viewer = new Autodesk.Viewing.Private.GuiViewer3D(container);
        viewer.start();
        resolve(viewer);
    });
});

/**
 * Loads model metadata (document) which can then be passed into viewer to load it.
 * @async
 * @param {string} urn Forge model URN.
 * @returns {Promise<object>} Promise which resolves into model metadata,
 * or gets rejected in case of an issue.
 */
forgist.loadDocument = (urn) => new Promise(function (resolve, reject) {
    Autodesk.Viewing.Document.load(
        'urn:' + urn,
        function onDocumentLoadSuccess(doc) {
            resolve(doc);
        },
        function onDocumentLoadError(errorCode, errorMsg) {
            reject(errorMsg);
        }
    );
});

/**
 * Sets up a basic Forge Viewer environment for quick experiments.
 * @async
 * @param {HTMLElement} container HTML element for hosting the viewer component.
 * @param {number|string} [modelId=0] Index or name of one of the available models to be loaded.
 * @returns {Promise<GuiViewer3D>} Promise which resolves into the viewer instance,
 * or gets rejected in case of an issue.
 *
 * @example
 * async function () {
 *   const viewer = await forgist.setup(document.getElementById('viewer'));
 *   const dbids = viewer.getSelection();
 *   viewer.isolate(dbids);
 * }
 *
 * @example
 * forgist.setup(document.getElementById('viewer')).then(viewer => {
 *   const dbids = viewer.getSelection();
 *   viewer.isolate(dbids);
 * });
 */
forgist.setup = async (container, modelId = 0) => {
    try {
        const viewer = await forgist.initViewer(container);
        const models = await forgist.listModels();
        const model = (typeof modelId === 'number') ? models[modelId] : models.find(m => m.name === modelId);
        if (!model) {
            throw new Error(`Model not found.`);
        }
        const doc = await forgist.loadDocument(model.urn);
        viewer.loadDocumentNode(doc, doc.getRoot().getDefaultGeometry());
        return viewer;
    } catch (err) {
        container.innerHTML = err;
    }
};
