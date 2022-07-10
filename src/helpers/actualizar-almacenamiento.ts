import { Tarea } from "../clases/tarea";

export { actualizarAlmacenamiento };

function actualizarAlmacenamiento(tareas: Tarea[]): void {
    window.localStorage.setItem('tareas', JSON.stringify(tareas));
}