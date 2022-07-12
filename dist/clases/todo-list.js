import { Tarea } from './tarea.js';
export { TodoList };
class TodoList {
    tareas;
    contenedor;
    constructor(contenedor, tareas) {
        this.tareas = tareas;
        this.contenedor = contenedor;
    }
    get obtenerTareas() {
        return this.tareas;
    }
    listarTareas() {
        this.contenedor.innerHTML = '';
        for (let tarea of this.tareas) {
            const button = document.createElement('button');
            button.addEventListener('click', () => {
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
                        Swal.fire('Tarea eliminada con exito', '', 'success');
                    }
                });
            });
            button.innerHTML = '<i class="fa-solid fa-trash-can" aria-hidden="true"></i>';
            const section = document.createElement('section');
            section.textContent = tarea.nombre;
            section.appendChild(button);
            this.contenedor.appendChild(section);
        }
    }
    agregarTarea(nombre) {
        const tarea = new Tarea(nombre);
        this.tareas.push(tarea);
        return tarea;
    }
    modificarTarea(id) {
    }
    eliminarTarea(id) {
        this.tareas = this.tareas.filter(tarea => tarea.id !== id);
    }
    eliminarTodo() {
        this.tareas = [];
    }
}
