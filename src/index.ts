import { TodoList } from "./clases/todo-list.js";
import { actualizarAlmacenamiento } from "./helpers/actualizar-almacenamiento.js";
import { getOrCreateWorks } from "./helpers/obtener-o-crear-tareas.js";

const $containerListTareas: HTMLElement = document.getElementById('container-list-tareas');
const todoList: TodoList = new TodoList($containerListTareas, getOrCreateWorks());

todoList.listarTareas();

const $formAgregarTarea: any = document.getElementById('form-add-tarea');
const $buttonClear: HTMLElement = document.getElementById('btn-clear');

// Agregar tarea
$formAgregarTarea.addEventListener('submit', (event: Event) => {
    event.preventDefault();

    const datos: FormData = new FormData(event.currentTarget as HTMLFormElement);

    const nombreTarea: string = datos.get('nombre').toString().trim();

    if (nombreTarea === '') {
        Swal.fire({
            position: 'center',
            icon: 'warning',
            title: 'Debe ingresar un valor valido',
            showConfirmButton: true,
        });
    } else if (todoList.verificarTareaExiste(nombreTarea.toLocaleLowerCase())) {
        Swal.fire({
            position: 'center',
            icon: 'warning',
            title: 'La tarea ya existe',
            showConfirmButton: true,
        });
    } else {
        $formAgregarTarea.childNodes[1].value = '';

        todoList.agregarTarea(nombreTarea);

        actualizarAlmacenamiento(todoList.obtenerTareas);

        todoList.listarTareas();

        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Tarea agregada con exito',
            showConfirmButton: true,
        });
    }
});

// Eliminar todo
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

            Swal.fire(
                'Tareas eliminadas con exito',
                '',
                'success'
            )
        }
    })
});