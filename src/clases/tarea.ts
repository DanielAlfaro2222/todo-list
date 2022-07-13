export { Tarea };
import { randomId } from '../helpers/generate-id.js';

class Tarea {
    id: string;
    nombre: string;
    finalizada: boolean;
    fechaCreacion: Date;
    fechaFinalizacion: any;

    constructor(nombre: string) {
        this.id = randomId();
        this.nombre = nombre;
        this.fechaCreacion = new Date();
        this.finalizada = false;
        this.fechaFinalizacion = null;
    }
}
