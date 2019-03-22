let matInscriptas = [
    //0 
    {
        "materia": "Geometría Plana y Trigonometría",
        "secciones": [
            //Seccion1 -  datos seccion [mat, secc] - l m mi j v s
            [[], {7: [0,0], 8: [0,0]}, {}, {10: [0,0], 11: [0,0]}, {15: [0,0]}, {}, {} ],
            //Seccion 2
            [[], {9: [0,1], 10: [0,1]}, {}, {9: [0,1], 10: [0,1]}, {}, {10: [0,1]}, {} ]    
    ]},

    //1
    {
        "materia":"Matemática Básica",
        "secciones": [
            [[], {12: [1,0], 13: [1,0]}, {}, {}, { 13: [1,0], 14: [1,0] }, {}, {} ],
            [[], {}, {10: [1,1] , 11: [1,1]}, {}, {}, {9: [1,1], 10: [1,1]}, {} ]
    ]},

    //2
    {
        "materia": "Identidad, Liderazgo y Compromiso I",
        "secciones": [
            // l m m j v s
            [[], {}, {}, {}, { 8: [2,0], 9: [2,0] }, {}, {} ],
    ]}
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
        for(let d = 1; d <= 6; d++){
            //Cuando hay clases ese dia => Copiamos
            if(Object.keys(seccion[d]).length > 0){
                Object.assign(horTemp[d-1], seccion[d]);
            }
        }
    }
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
    console.log("PUBLICACION", hor);
}

function horario(idMat, idSeccion, horarioT){
    //console.log("ahor", horarioT);
    console.log("String", JSON.stringify(horarioT));
    //JSON.parse(JSON.stringify(horarioT));
    var horarioTemp = JSON.parse(JSON.stringify(horarioT));
    //console.log("dhor", horarioTemp);
    if(matInscriptas[idMat]){
        console.log("Mat existe", idMat);
        //Si existe
        while((idSeccion <= (matInscriptas[idMat].secciones.length - 1)) && matInscriptas[idMat].secciones[idSeccion]){
            if(canAddSeccion(matInscriptas[idMat].secciones[idSeccion], horarioTemp)){
                addSeccion(matInscriptas[idMat].secciones[idSeccion], horarioTemp);
                console.log("Seccion add", idSeccion);
                //console.log("horarioTemp", horarioTemp);
                horario(idMat + 1, 0, horarioTemp);
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
    console.log("run", horarioGen);
    horario(0,0, horarioGen);
}