export { getOrCreateWorks };
function getOrCreateWorks() {
    let listadoTareas = [];
    for (let key of Object.keys(window.localStorage)) {
        let tarea = window.localStorage.getItem(key);
        listadoTareas.push(JSON.parse(tarea));
    }
    return listadoTareas;
}
