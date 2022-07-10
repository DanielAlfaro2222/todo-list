import { Tarea } from './tarea.js';
export { TodoList };

class TodoList {
    protected tareas: Tarea[];
    protected contenedor: HTMLElement;

    constructor(contenedor: HTMLElement, tareas: Tarea[]) {
        this.tareas = tareas;
        this.contenedor = contenedor;
    }

    get obtenerTareas(): Tarea[] {
        return this.tareas;
    }

    listarTareas(): void {
        let resultado: string = '';

        for (let tarea of this.tareas) {
            resultado += `<section>${tarea.nombre}
                <button onclick="eventoEliminar(${tarea.id})">
                    <i class="fa-solid fa-trash-can" aria-hidden="true"></i>
                </button>
            </section>`;
        }

        this.contenedor.innerHTML = resultado;
    }

    agregarTarea(nombre: string): Tarea {
        const tarea: Tarea = new Tarea(nombre);

        this.tareas.push(tarea);

        return tarea;
    }

    modificarTarea(id: string): void {

    }

    eliminarTarea(id: string): void {
        this.tareas = this.tareas.filter(tarea => tarea.id !== id);
    }

    eliminarTodo(): void {
        this.tareas = [];
    }
}