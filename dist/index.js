import { TodoList } from "./clases/todo-list.js";
import { actualizarAlmacenamiento } from "./helpers/actualizar-almacenamiento.js";
import { getOrCreateWorks } from "./helpers/obtener-o-crear-tareas.js";
const $containerListTareas = document.getElementById('container-list-tareas');
const todoList = new TodoList($containerListTareas, JSON.parse(getOrCreateWorks()));
todoList.listarTareas();
const $formAgregarTarea = document.getElementById('form-add-tarea');
const $buttonClear = document.getElementById('btn-clear');
$formAgregarTarea.addEventListener('submit', (event) => {
    event.preventDefault();
    const datos = new FormData(event.currentTarget);
    const nombreTarea = datos.get('nombre');
    $formAgregarTarea.childNodes[1].value = '';
    todoList.agregarTarea(nombreTarea.toString());
    actualizarAlmacenamiento(todoList.obtenerTareas);
    todoList.listarTareas();
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Tarea agregada con exito',
        showConfirmButton: true,
    });
});
$buttonClear.addEventListener('click', () => {
    Swal.fire({
        title: '¿Estas seguro de eliminar todo?',
        text: "Esto no se podra revertir",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminar todo'
    }).then((result) => {
        if (result.isConfirmed) {
            todoList.eliminarTodo();
            actualizarAlmacenamiento(todoList.obtenerTareas);
            todoList.listarTareas();
            Swal.fire('Tareas eliminadas con exito', '', 'success');
        }
    });
});