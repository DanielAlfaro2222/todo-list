import { actualizarAlmacenamiento } from '../helpers/actualizar-almacenamiento.js';
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

    get obtenerTareasPendientes(): Tarea[] {
        return this.tareas.filter(tarea => !tarea.tareaFinalizada);
    }

    listarTareas(): void {
        this.contenedor.innerHTML = '';
        let counter: number = 1;

        for (let tarea of this.tareas) {
            const buttonDelet: HTMLElement = document.createElement('button');
            const buttonEdit: HTMLElement = document.createElement('button');
            const section: HTMLElement = document.createElement('section');

            buttonDelet.addEventListener('click', () => {
                Swal.fire({
                    title: '¿Estas seguro de eliminar esta tarea?',
                    text: "Esto no se podra revertir",
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Si, eliminar'
                }).then((result) => {
                    if (result.isConfirmed) {
                        this.eliminarTarea(tarea.id);
                        this.listarTareas();

                        Swal.fire(
                            'Tarea eliminada con exito',
                            '',
                            'success'
                        )
                    }
                })
            })

            buttonEdit.addEventListener('click', () => {
                this.modificarTarea(tarea.id);
            });

            buttonDelet.innerHTML = '<i class="fa-solid fa-trash-can" aria-hidden="true"></i>';

            buttonEdit.innerHTML = '<i class="fa-solid fa-pen-to-square" aria-hidden="true"></i>';

            section.textContent = `${counter}. ${tarea.nombre} `;

            section.append(buttonEdit, buttonDelet);

            this.contenedor.appendChild(section);

            this.mostrarCantidadTareasPendientes();

            counter++;
        }
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
        actualizarAlmacenamiento(this.obtenerTareas);
    }

    eliminarTodo(): void {
        this.tareas = [];
        this.mostrarCantidadTareasPendientes();
    }

    mostrarCantidadTareasPendientes(): void {
        const quantity: number = this.obtenerTareasPendientes.length;

        document.getElementById('quantity-tareas-pendientes').textContent = `Tienes ${quantity} tareas pendientes`;
    }

    verificarTareaExiste(nombre: string): boolean {
        return Boolean(this.tareas.find(tarea => tarea.nombre.toLocaleLowerCase() === nombre));
    }
}