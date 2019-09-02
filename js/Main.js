let matInscriptas = [
    //0 
    {
        "materia": "Geometría Plana y Trigonometría",
        //Index = seccion
        "nrc": [],
        "secciones": [
            //Seccion1 (0)-  datos seccion [mat, secc] - l m mi j v s
            [[], {7: [0,0], 8: [0,0]}, {}, {10: [0,0], 11: [0,0]}, {15: [0,0]}, {}, {} ],
            //Seccion 2 (1)
            [[], {9: [0,1], 10: [0,1]}, {}, {9: [0,1], 10: [0,1]}, {}, {10: [0,1]}, {} ]
        ]
    },

    //1
    {
        "materia":"Matemática Básica",
        "secciones": [
            [[], {12: [1,0], 13: [1,0]}, {}, {}, { 13: [1,0], 14: [1,0] }, {}, {} ],
            [[], {}, {10: [1,1] , 11: [1,1]}, {}, {}, {9: [1,1], 10: [1,1]}, {} ]
        ]
    },

    //2
    {
        "materia": "Identidad, Liderazgo y Compromiso I",
        "secciones": [
            // l m m j v s
            [[], {}, {}, {}, { 8: [2,0], 9: [2,0] }, {}, {} ],
        ]
    }
];


/* FUNCIONALIDADES */
let horarioGen = [
    //lunes 0 
    {},
    //martes 1
    {},
    //miercoles 2
    {},
    //jueves 3
    {},
    //viernes
    {},
    //sabado
    {}
];

function addSeccion(seccion, horTemp){
    if(seccion && canAddSeccion(seccion, horTemp)){
        let horAux = JSON.parse(JSON.stringify(horTemp));
        for(let d = 1; d <= 6; d++){
            //Cuando hay clases ese dia => Copiamos
            if(Object.keys(seccion[d]).length > 0){
                //Object.assign(horTemp[d-1], seccion[d]);
                //Hacemos copia
                Object.assign(horAux[d-1], seccion[d]);
            }
        }
        return horAux;
    }
    return null;
}


function canAddSeccion(seccion, horTemp){
    if(seccion){
        //Existe'()
        for(let d = 1; d <= 6; d++){
            //Mientras halla alguna clase ese dia, se recorre las horas para ver colisiones
            if(Object.keys(seccion[d]).length > 0){
                for(let i = 7; i <=21; i++){
                    if(seccion[d][i]){
                        //Hay algo a esa hora => chequemos en horario tmp
                        if(horTemp[d-1][i]){
                            //Chocamos
                            console.log("Chocamos dia: y hora: ", d, i);
                            console.log(seccion , horTemp);
                            return 0;
                        }
                    }
                }
            }
        }
    }else{
        return null;
    }
    return 1;
}

function publicar(hor){
    console.warn("PUBLICACION", hor);
}

function horario(idMat, idSeccion, horarioT){
    //console.log("ahor", horarioT);
    console.log("String", JSON.stringify(horarioT));
    //JSON.parse(JSON.stringify(horarioT));
    var horarioTemp = JSON.parse(JSON.stringify(horarioT));
    //console.log("dhor", horarioTemp);

    //Si existe materia
    if(matInscriptas[idMat]){
        console.log("Mat existe", idMat);
        //Mientras la seccion exista y idSecc no se pase
        while((idSeccion <= (matInscriptas[idMat].secciones.length - 1)) && matInscriptas[idMat].secciones[idSeccion]){
            console.log("ANTES horarioTemp", horarioTemp);
            if(canAddSeccion(matInscriptas[idMat].secciones[idSeccion], horarioTemp)){
                //addSeccion(matInscriptas[idMat].secciones[idSeccion], horarioTemp);
                console.log("Seccion add", idSeccion);
                console.log("DESPUES horarioTemp", horarioTemp);
                horario(idMat + 1, 0, addSeccion(matInscriptas[idMat].secciones[idSeccion], horarioTemp));
            }      
            console.log("volvemos",idMat,idSeccion);     
            idSeccion += 1;
        }
    }else{
        //No existe = no hay mas => publicar
        publicar(horarioTemp);
    }
}

function run(){
    matInscriptas = matInscriptasBorrador.filter(Boolean);
    //console.log("run", horarioGen);
    horario(0,0, horarioGen);
}