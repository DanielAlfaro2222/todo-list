export { getOrCreateWorks };
import { Tarea } from '../clases/tarea.js';

function getOrCreateWorks() {
    let listadoTareas: Tarea[] = [];

    for (let key of Object.keys(window.localStorage)) {
        let tarea = window.localStorage.getItem(key);

        listadoTareas.push(JSON.parse(tarea));
    }

    return listadoTareas;
}