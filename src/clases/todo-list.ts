import { Tarea } from './tarea.js';
export { TodoList };

class TodoList {
    protected tareas: Tarea[];

    constructor(tareas: Tarea[] = []) {
        this.tareas = tareas;
    }

    agregarTarea(): void {

    }

    modificarTarea(): void {

    }

    eliminarTarea(): void {

    }
}