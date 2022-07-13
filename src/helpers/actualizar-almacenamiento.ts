import { Tarea } from "../clases/tarea";

export { actualizarAlmacenamiento };

function actualizarAlmacenamiento(tareas: Tarea[]): void {
    tareas.forEach(tarea => {
        window.localStorage.setItem(tarea.id, JSON.stringify(tarea));
    });
}