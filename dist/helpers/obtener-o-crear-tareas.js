export { getOrCreateWorks };
function getOrCreateWorks() {
    let listadoTareas = window.localStorage.getItem('tareas');
    if (listadoTareas === null) {
        listadoTareas = [];
        window.localStorage.setItem('tareas', JSON.stringify(listadoTareas));
    }
    return listadoTareas;
}
