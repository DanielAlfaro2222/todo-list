export { Tarea };

class Tarea {
    private id: string;
    public nombre: string;
    protected finalizada: boolean;
    protected fechaCreacion: Date;
    protected fechaFinalizacion: any;


    constructor(nombre: string) {
        this.nombre = nombre;
        this.fechaCreacion = new Date();
        this.finalizada = false;
        this.fechaFinalizacion = null;
    }
}