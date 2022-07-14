import { Tarea } from "../clases/tarea";

export { actualizarAlmacenamiento };

function actualizarAlmacenamiento(tareas: Tarea[]): void {
    window.localStorage.clear();

    tareas.forEach(tarea => {
        window.localStorage.setItem(tarea.id, JSON.stringify(tarea));
    });
}