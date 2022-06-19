
        class Tetrimino{
            constructor(nombre= random(["Z","I","T","O","S","L","J"])){
                this.nombre=nombre;
                let base=tetriminosBase[nombre];
                this.color=base.color;
                this.mapa=[]
                for(const pmino of base.mapa){//crea una copia del mapa
                    this.mapa.push(pmino.copy());
                }
                this.posicion= createVector(int(tablero.columnas / 2),0);
            }

            //movimiento segun teclas de direccion
            moverDerecha(){
                this.posicion.x++;
                if(this.movimientoErroneo){
                    this.moverIzquierda();
                }
            }

            moverIzquierda(){
                this.posicion.x--;
                if(this.movimientoErroneo){
                    this.moverDerecha();
                }
            }

            moverAbajo(){
                this.posicion.y++;
                if(this.movimientoErroneo){
                    this.moverArriba();
                    if(tetrimino == this){
                        tablero.almacenarMino = this
                        tetrimino = new Tetrimino()
                    }
                    return false;
                }
                return true;
            }
            moverArriba(){
                this.posicion.y--;
            }


            ponerEnElFondo(){
                this.posicion= this.espectro.posicion
                this.moverAbajo()
            }

            girar(){
                for(const pmino of this.mapa){
                    pmino.set(pmino.y, -pmino.x)
                }
                
                if(this.movimientoErroneo){
                    this.desgirar();
                }
            }


            desgirar(){
                for(const pmino of this.mapa){
                    pmino.set(-pmino.y, pmino.x)
                }
            }

            get movimientoErroneo(){
                let salioDelTablero=!this.estaDentroTablero;
                return salioDelTablero || this.colisionConMinosAlmacenados;
            }

            get colisionConMinosAlmacenados(){
                for(const pmino of this.mapaTablero){
                    if(tablero.minosAlmacenados[pmino.x][pmino.y]){
                        return true;
                    }
                }
                return false
            }

            get estaDentroTablero(){
                for(const pmino of this.mapaTablero){
                    if(pmino.x  < 0 ){
                        //Evita la salida por la izquierda del tetrimino
                        return false;
                    }
                    if(pmino.x >= tablero.columnas){
                     //Evita la salida por la derecha del tetrimino
                        return false;
                    }
                    if(pmino.y >= tablero.filas){
                     //Evita la salida por abajo del tetrimino
                        return false;
                    }
                    return true
                }
            }


            get mapaTablero(){
                let retorno=[];//crea una matriz vacia
                for(const pmino of this.mapa){
                    let copy=pmino.copy().add(this.posicion);//copia el punto y lo suma con la posicion
                    retorno.push(copy);//convierte las coordenadas del mapa a coordenadas del tablero
                }
                return retorno;
            }

            get mapaCanvas(){
                let retorno=[];//crea una matriz vacia
                for(const pmino of this.mapa){
                    let copy=pmino.copy().add(this.posicion);//copia el punto y lo suma con la posicion
                    retorno.push(tablero.coordenada(copy.x,copy.y));//convierte las coordenadas del mapa a coordenadas del tablero
                }
                return retorno;
            }

            //Esta funcion se encargara del procesamiento logico del dibujado del objeto
            dibujar(){
                push();
                fill(this.color);
                for(const pmino of this.mapaCanvas){
                    Tetrimino.dibujarMino(pmino);
                }
                pop();

                if(tetrimino == this){
                    this.dibujarEspectro()
                }
            }


            dibujarEspectro(){
                this.espectro= new Tetrimino(this.nombre);
                this.espectro.posicion= this.posicion.copy();
                for(let i=0; i < this.mapa.length; i++){
                    this.espectro.mapa[i] = this.mapa[i].copy()
                }
                while(this.espectro.moverAbajo());
                push()
                    drawingContext.globalAlpha = 0.3;
                    this.espectro.dibujar();
                pop()
            }


            static dibujarMino(pmino){
                rect(pmino.x,pmino.y,tablero.lado_celda);//dibuja un rectangulo en las coordenadas del tablero
                push()
                noStroke();
                fill(255,255,255,100);
                beginShape();//inicia una figura
                vertex(pmino.x,pmino.y);//dibuja un punto en las coordenadas del tablero
                vertex(pmino.x+tablero.lado_celda,pmino.y);//dibuja un punto en las coordenadas del tablero
                vertex(pmino.x+tablero.lado_celda,pmino.y+tablero.lado_celda);
                endShape(CLOSE);//cierra la figura

                beginShape();
                fill(0,0,0,80);
                vertex(pmino.x,pmino.y);
                vertex(pmino.x, pmino.y + tablero.lado_celda);
                vertex(pmino.x+tablero.lado_celda,pmino.y+tablero.lado_celda);
                endShape(CLOSE);

                // rect(pmino.x,pmino.y,tablero.lado_celda,tablero.lado_celda/2);
                pop()
                // let coordDelTablero=tablero.coordenada(pmino.x,pmino.y);//obtiene las coordenadas del tablero
            }
        }

function crearMapeoBaseTetrimino(){
    tetriminosBase={
        "Z":{
            "mapa":[
                createVector(),
                createVector(1,0),
                createVector(0,1),
                createVector(-1,1)
            ],
            "color":"red"
        },
        "S":{
            "mapa":[
                createVector(),
                createVector(-1,0),
                createVector(0,-1),
                createVector(1,-1)
            ],
            "color":"green"
        },
        "J":{
            "mapa":[
                createVector(),
                createVector(-1,0),
                createVector(-1,-1),
                createVector(1,0),
            ],
            "color":"orange",
        },
        "L":{
            "mapa":[
                createVector(),
                createVector(-1,0),
                createVector(1,-1),
                createVector(1,0)
            ],
            "color":"pink"
        },
        "T":{
            "mapa":[
                createVector(),
                createVector(-1,0),
                createVector(1,0),
                createVector(0,-1)
            ],
            "color":"magenta"
        },
        "O":{
            "mapa":[
                createVector(),
                createVector(0,-1),
                createVector(1,-1),
                createVector(1,0)
            ],
            "color":"yellow"
        },
        "I":{
            "mapa":[
                createVector(),
                createVector(-1,0),
                createVector(1,0),
                createVector(2,0)
            ],
            "color":"cyan"
        }
    }
}
