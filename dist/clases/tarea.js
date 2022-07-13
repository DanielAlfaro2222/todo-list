export { Tarea };
import { randomId } from '../helpers/generate-id.js';
class Tarea {
    id;
    nombre;
    finalizada;
    fechaCreacion;
    fechaFinalizacion;
    constructor(nombre) {
        this.id = randomId();
        this.nombre = nombre;
        this.fechaCreacion = new Date();
        this.finalizada = false;
        this.fechaFinalizacion = null;
    }
    get tareaFinalizada() {
        return this.finalizada;
    }
}
