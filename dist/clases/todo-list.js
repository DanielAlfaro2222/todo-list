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
            const $buttonDelet = document.createElement('button');
            const $buttonEdit = document.createElement('button');
            const $article = document.createElement('article');
            const $buttonCancelEdit = document.createElement('button');
            const $div = document.createElement('div');
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
            $article.classList.add('container-work');
            if (tarea.finalizada) {
                $article.classList.add('container-work--complete');
            }
            else {
                $article.classList.remove('container-work--complete');
            }
            $buttonDelet.innerHTML = '<i class="fa-solid fa-trash-can" aria-hidden="true"></i>';
            $buttonEdit.innerHTML = '<i class="fa-solid fa-pen-to-square" aria-hidden="true"></i>';
            $article.innerHTML = `<p>${counter}. ${tarea.nombre}</p>
            <form method="post" class="hide" id="form-edit-work">
                <input type="text" placeholder="Nombre tarea" value="${tarea.nombre}" name="nombre-tarea">
                </input> 
                <button>Editar tarea</button>
            </form>`;
            $buttonCancelEdit.textContent = 'Cancelar';
            $buttonCancelEdit.classList.add('hide');
            $div.classList.add('container-options-work');
            $buttonDelet.classList.add('container-options-work__btn');
            $buttonEdit.classList.add('container-options-work__btn');
            $buttonDelet.classList.add('container-options-work__btn--delet');
            $buttonEdit.classList.add('container-options-work__btn--edit');
            $div.innerHTML = `<input type="checkbox" class="tarea-completada" ${(tarea.finalizada) ? "checked='true'" : ""}>
            </input>`;
            $div.querySelector('.tarea-completada').addEventListener('click', () => {
                this.completarTarea(tarea.id);
            });
            $div.append($buttonEdit, $buttonDelet, $buttonCancelEdit);
            $article.append($div);
            $buttonCancelEdit.addEventListener('click', () => {
                $buttonDelet.classList.remove('hide');
                $buttonEdit.classList.remove('hide');
                $article.querySelector('.tarea-completada').classList.remove('hide');
                $article.querySelector('p').classList.remove('hide');
                const $formEditarTarea = $article.querySelector('#form-edit-work');
                $formEditarTarea.classList.add('hide');
                $buttonCancelEdit.classList.add('hide');
            });
            $buttonEdit.addEventListener('click', () => {
                $buttonDelet.classList.add('hide');
                $buttonEdit.classList.add('hide');
                $article.querySelector('.tarea-completada').classList.add('hide');
                $article.querySelector('p').classList.add('hide');
                $buttonCancelEdit.classList.remove('hide');
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
            else if (this.verificarTareaExiste(nombreTarea.toLocaleLowerCase())) {
                Swal.fire({
                    position: 'center',
                    icon: 'warning',
                    title: 'La tarea ya existe',
                    showConfirmButton: true,
                });
            }
            else {
                for (let tarea of this.tareas) {
                    if (tarea.id === id) {
                        tarea.nombre = nombreTarea;
                    }
                }
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
    verificarTareaExiste(nombre) {
        return Boolean(this.tareas.find(tarea => tarea.nombre.toLocaleLowerCase() === nombre));
    }
}
