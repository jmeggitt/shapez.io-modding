/**
 * @type {ModMainFunction}
 * @param {ModApi} api
 */
function load(api) {
    console.log("Registering test mod!");

    function onEnter(root) {
        console.log("Starting test mod!")
    }

    window.registerModImplementation(onEnter);
}

window.registerMod(load);
