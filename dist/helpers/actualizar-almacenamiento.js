export { actualizarAlmacenamiento };
function actualizarAlmacenamiento(tareas) {
    window.localStorage.setItem('tareas', JSON.stringify(tareas));
}
