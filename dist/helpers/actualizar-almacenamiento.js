export { actualizarAlmacenamiento };
function actualizarAlmacenamiento(tareas) {
    tareas.forEach(tarea => {
        window.localStorage.setItem(tarea.id, JSON.stringify(tarea));
    });
}
