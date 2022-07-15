import { actualizarAlmacenamiento } from '../helpers/actualizar-almacenamiento.js';
import { createArticle, createButtonDelet, createButtonEdit, createDiv } from '../helpers/create-element.js';
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
            const $buttonDelet = createButtonDelet();
            const $buttonEdit = createButtonEdit();
            const $article = createArticle(counter, tarea);
            const $buttonCancelEdit = $article.querySelector('#cancel-edit');
            const $div = createDiv(tarea);
            $div.append($buttonEdit, $buttonDelet);
            $article.append($div);
            $buttonDelet.addEventListener('click', () => {
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
            $div.querySelector('.tarea-completada').addEventListener('click', () => {
                this.completarTarea(tarea.id);
            });
            $buttonCancelEdit.addEventListener('click', () => {
                $buttonDelet.classList.remove('hide');
                $buttonEdit.classList.remove('hide');
                $article.querySelector('.tarea-completada').classList.remove('hide');
                $article.querySelector('p').classList.remove('hide');
                const $formEditarTarea = $article.querySelector('#form-edit-work');
                $formEditarTarea.classList.add('hide');
            });
            $buttonEdit.addEventListener('click', () => {
                $buttonDelet.classList.add('hide');
                $buttonEdit.classList.add('hide');
                $article.querySelector('.tarea-completada').classList.add('hide');
                $article.querySelector('p').classList.add('hide');
                const $formEditarTarea = $article.querySelector('#form-edit-work');
                this.modificarTarea(tarea.id, $formEditarTarea);
            });
            this.contenedor.appendChild($article);
            this.mostrarCantidadTareasPendientes();
            counter++;
        }
    }
    agregarTarea(nombre) {
        const tarea = new Tarea(nombre);
        this.tareas.push(tarea);
        return tarea;
    }
    modificarTarea(id, $formEditarTarea) {
        $formEditarTarea.classList.remove('hide');
        $formEditarTarea.addEventListener('submit', (event) => {
            event.preventDefault();
            const datos = new FormData($formEditarTarea);
            const nombreTarea = datos.get('nombre-tarea').toString().trim();
            if (nombreTarea === '') {
                Swal.fire({
                    position: 'center',
                    icon: 'warning',
                    title: 'Debe ingresar un valor valido',
                    showConfirmButton: true,
                });
            }
            else if (this.verificarTareaExiste(nombreTarea.toLocaleLowerCase(), id)) {
                Swal.fire({
                    position: 'center',
                    icon: 'warning',
                    title: 'La tarea ya existe',
                    showConfirmButton: true,
                });
            }
            else {
                this.tareas.forEach(tarea => {
                    if (tarea.id === id) {
                        tarea.nombre = nombreTarea;
                    }
                });
                actualizarAlmacenamiento(this.tareas);
                this.listarTareas();
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Tarea editada con exito',
                    showConfirmButton: true,
                });
            }
        });
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
        actualizarAlmacenamiento(this.tareas);
    }
    eliminarTarea(id) {
        this.tareas = this.tareas.filter(tarea => tarea.id !== id);
        actualizarAlmacenamiento(this.tareas);
        this.mostrarCantidadTareasPendientes();
    }
    eliminarTodo() {
        this.tareas = [];
        this.mostrarCantidadTareasPendientes();
        localStorage.clear();
    }
    mostrarCantidadTareasPendientes() {
        const quantity = this.obtenerTareasPendientes.length;
        document.getElementById('quantity-tareas-pendientes').textContent = `Tienes ${quantity} tareas pendientes`;
    }
    verificarTareaExiste(nombre, id = '') {
        return Boolean(this.tareas.find(tarea => {
            return tarea.nombre.toLocaleLowerCase() === nombre && tarea.id !== id;
        }));
    }
}
