export { Tarea };
import { randomId } from '../helpers/generate-id.js';

class Tarea {
    public id: string;
    public nombre: string;
    protected finalizada: boolean;
    protected fechaCreacion: Date;
    protected fechaFinalizacion: any;

    constructor(nombre: string) {
        this.id = randomId();
        this.nombre = nombre;
        this.fechaCreacion = new Date();
        this.finalizada = false;
        this.fechaFinalizacion = null;
    }

    get tareaFinalizada(): boolean {
        return this.finalizada;
    }
}
