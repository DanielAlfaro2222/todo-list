export { getOrCreateWorks };
import { Tarea } from '../clases/tarea.js';

function getOrCreateWorks() {
    let listadoTareas: any | Tarea[] = window.localStorage.getItem('tareas');

    if (listadoTareas === null) {
        listadoTareas = [];
        window.localStorage.setItem('tareas', JSON.stringify(listadoTareas));
    }

    return listadoTareas;
}