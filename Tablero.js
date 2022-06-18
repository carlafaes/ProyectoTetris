
//se va a encargar de representar el modelo del tablero de juego, empieza
//su nombre comienza con mayuscula para identificar que sea una clase y no una variable
class Tablero{
    constructor(){
        this.columnas= 10;
        this.filas= 20;
        this.lado_celda=20;
        this.ancho= this.columnas*this.lado_celda;
        this.alto= this.filas*this.lado_celda;
        this.posicion= createVector(
            MARGEN_TABLERO,
            MARGEN_TABLERO + 2*this.lado_celda);//posicion inicial del tablero
            
            //memoria es la variable que se encargara de representar los minos almacenados en el tablero
            this.minosAlmacenados=[];
            for(let fila=0; fila<this.filas; fila++){
                this.minosAlmacenados[fila]=[];//crea una fila vacia
                for(let columna=0; columna<this.columnas; columna++){
                    this.minosAlmacenados[fila].push("");   //agrega una columna vacia
                }
            }
    }

    set almacenarMino(tetrimino){
        for(const pmino of tetrimino.mapaTablero){
            this.minosAlmacenados[pmino.y][pmino.x]=tetrimino.nombre;
        }
    }

    //la coordenada es una transformacion no lineal donde se aplica un escalamiento(multiplicacion) para el ajuste de las medidas y una traslacion (suma) para el ajuste de las posiciones.
    //En este caso no se usan rotaciones no se necesita
    coordenada(x,y){
        return createVector(x,y).mult(this.lado_celda).add(this.posicion);
    }

//Se encargara del procesamiento logico para el dibujado de este elemento
    dibujar(){
        push()
        noStroke()//no se dibuja bordes
        for(let columna = 0; columna<this.columnas; columna++){
            
            for(let fila = 0; fila<this.filas; fila++){
                if((columna+fila)%2 == 0){
                    fill("#000000");
                }
                else{
                    fill("#003");
                }
                let c= this.coordenada(columna,fila);
                rect(c.x,c.y,this.lado_celda);
            }   
         }
        pop()
    }
}