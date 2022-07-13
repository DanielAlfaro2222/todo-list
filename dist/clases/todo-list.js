import { actualizarAlmacenamiento } from '../helpers/actualizar-almacenamiento.js';
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
    get obtenerTareasPendientes() {
        return this.tareas.filter(tarea => !tarea.finalizada);
    }
    listarTareas() {
        this.contenedor.innerHTML = '';
        let counter = 1;
        for (let tarea of this.tareas) {
            const buttonDelet = document.createElement('button');
            const buttonEdit = document.createElement('button');
            const section = document.createElement('section');
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
                        Swal.fire('Tarea eliminada con exito', '', 'success');
                    }
                });
            });
            buttonDelet.innerHTML = '<i class="fa-solid fa-trash-can" aria-hidden="true"></i>';
            buttonEdit.innerHTML = '<i class="fa-solid fa-pen-to-square" aria-hidden="true"></i>';
            section.innerHTML = `${counter}. ${tarea.nombre} <input type="checkbox" class="tarea-completada" ${(tarea.finalizada) ? "checked='true'" : ""}></input>`;
            section.querySelector('.tarea-completada').addEventListener('click', () => {
                this.completarTarea(tarea.id);
            });
            section.append(buttonEdit, buttonDelet);
            buttonEdit.addEventListener('click', () => {
                buttonDelet.classList.add('hide');
                buttonEdit.classList.add('hide');
                section.querySelector('.tarea-completada').classList.add('hide');
                this.modificarTarea(tarea.id);
            });
            this.contenedor.appendChild(section);
            this.mostrarCantidadTareasPendientes();
            counter++;
        }
    }
    agregarTarea(nombre) {
        const tarea = new Tarea(nombre);
        this.tareas.push(tarea);
        return tarea;
    }
    modificarTarea(id) {
    }
    completarTarea(id) {
        for (let tarea of this.tareas) {
            if (tarea.id === id) {
                if (tarea.finalizada) {
                    tarea.finalizada = false;
                    tarea.fechaFinalizacion = null;
                }
                else {
                    tarea.finalizada = true;
                    tarea.fechaFinalizacion = new Date();
                }
            }
        }
        this.listarTareas();
        actualizarAlmacenamiento(this.obtenerTareas);
    }
    eliminarTarea(id) {
        this.tareas = this.tareas.filter(tarea => tarea.id !== id);
        actualizarAlmacenamiento(this.obtenerTareas);
    }
    eliminarTodo() {
        this.tareas = [];
        this.mostrarCantidadTareasPendientes();
    }
    mostrarCantidadTareasPendientes() {
        const quantity = this.obtenerTareasPendientes.length;
        document.getElementById('quantity-tareas-pendientes').textContent = `Tienes ${quantity} tareas pendientes`;
    }
    verificarTareaExiste(nombre) {
        return Boolean(this.tareas.find(tarea => tarea.nombre.toLocaleLowerCase() === nombre));
    }
}
