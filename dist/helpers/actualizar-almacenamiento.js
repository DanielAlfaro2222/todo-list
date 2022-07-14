export { actualizarAlmacenamiento };
function actualizarAlmacenamiento(tareas) {
    window.localStorage.clear();
    tareas.forEach(tarea => {
        window.localStorage.setItem(tarea.id, JSON.stringify(tarea));
    });
}
