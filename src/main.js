class Tarea{
    valorComun = 1;

    constructor (codigo, duracion, complejidad){
        this.codigo = codigo;
        this.duracion = duracion;
        this.complejidad = complejidad;

    }

    getDuracion(){
        return this.duracion;
    }

    getCodigo(){
        return this.codigo;
    }

    getCosto(){
        return this.complejidad.getCostoExtra(this.duracion, this.valorComun);
    }

    mostrarTarea(){
        console.log(`codigo: ${this.codigo} - duracion: ${this.duracion}`);
    }
}

class  TareaCompuesta{
    valorComun = 1;
    constructor (codigo, duracion, tareas = [], complejidad){
        this.codigo = codigo;
        this.duracion = duracion;
        this.tareas = tareas;  
        this.complejidad = complejidad;
    }

    getDuracion(){
        return this.tareas.reduce((acum, tarea) => acum = acum + tarea.getDuracion(), this.duracion);
    }

    getCodigo(){
        return this.codigo;
    }

    getCosto(){
        const costoTareas = this.tareas.reduce((acum, tarea) => acum + tarea.getCosto(), this.complejidad.getCostoExtra(this.duracion, this.valorComun));
        return this.tareas.length > 3 ? costoTareas + (costoTareas * 4 / 100) : costoTareas;
    }

    mostrarTarea(){
        console.log(`codigo: ${this.codigo} - duracion: ${this.duracion}`);
        this.tareas.forEach((tarea) => {tarea.mostrarTarea()});
    }

}

class ComplejidadMinima{
    getCostoExtra(duracion, valorComun){
        return duracion * valorComun;
    }
}

class ComplejidadMedia{
    getCostoExtra(duracion, valorComun){
        return (duracion * valorComun) + ((duracion * valorComun) * 5 / 100);
    }
}

class ComplejidadMaxima{
    getCostoExtra(duracion, valorComun){
        const costoConExtra = (duracion * valorComun) + ((duracion * valorComun) * 7 / 100);
        return duracion <= 10 ? costoConExtra : costoConExtra + ((duracion - 10) * 1000);
    }
}

class Proyecto{
    constructor(){
        this.tareas = [];
    }

    agregarTarea(tarea){
        this.tareas.push(tarea);
    }

    getDuracion(){
        return this.tareas.reduce((acum, tarea) => acum = acum + tarea.getDuracion(), 0);
    }

    getCosto(){
        return this.tareas.reduce((acum, tarea) => acum + tarea.getCosto(), 0);
    }

    mostrarTareas(){
        this.tareas.forEach((tarea) => {tarea.mostrarTarea()});
    }

    limpiarTareas(){
        this.tareas = []; 
    }
}


const complejidadMinima = new ComplejidadMinima();
const complejidadMedia = new ComplejidadMedia();
const complejidadMaxima = new ComplejidadMaxima();

const tarea1 = new Tarea("1",5, complejidadMinima);
const tarea21 = new Tarea("2.1",5, complejidadMinima);
const tarea221 = new Tarea("2.2.1",5, complejidadMinima);
const tarea222 = new Tarea("2.2.2",5, complejidadMinima);
const tarea31 = new Tarea("3.1",5, complejidadMinima);
const tarea32 = new Tarea("3.2",5, complejidadMinima);
const tarea223 = new Tarea("2.2.3",5, complejidadMinima);
const tarea224 = new Tarea("2.2.4",5, complejidadMinima);

const tarea22 = new TareaCompuesta("2.2",5,[tarea221, tarea222, tarea223, tarea224], complejidadMinima);
const tarea2 = new TareaCompuesta("2",5,[tarea21, tarea22], complejidadMinima);
const tarea3 = new TareaCompuesta("3",5,[tarea31, tarea32], complejidadMinima);

const proyecto = new Proyecto();
proyecto.agregarTarea(tarea1);
proyecto.agregarTarea(tarea2);
proyecto.agregarTarea(tarea3);
proyecto.mostrarTareas();
console.log(`Duracion total: ${proyecto.getDuracion()}`);
console.log(`Costo total: ${proyecto.getCosto()}`);
