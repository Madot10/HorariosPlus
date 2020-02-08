let matInscriptas = [
    //0
    {
        materia: "Geometría Plana y Trigonometría",
        //Index = seccion
        nrc: ["1", "2222"],
        secciones: [
            //Seccion1 (0)-  datos seccion [mat, secc] - l m mi j v s
            [{ 7: [0, 0], 8: [0, 0] }, {}, { 10: [0, 0], 11: [0, 0] }, { 15: [0, 0] }, {}, {}],
            //Seccion 2 (1)
            [{ 9: [0, 1], 10: [0, 1] }, {}, { 9: [0, 1], 10: [0, 1] }, {}, { 10: [0, 1] }, {}],
        ],
    },

    //1
    {
        materia: "Matemática Básica",
        nrc: ["20", "21"],
        secciones: [
            [{ 12: [1, 0], 13: [1, 0] }, {}, {}, { 13: [1, 0], 14: [1, 0] }, {}, {}],
            [{}, { 10: [1, 1], 11: [1, 1] }, {}, {}, { 9: [1, 1], 10: [1, 1] }, {}],
        ],
    },

    //2
    {
        materia: "Identidad, Liderazgo y Compromiso I",
        nrc: ["3"],
        secciones: [
            // l m m j v s
            [{}, {}, {}, { 8: [2, 0], 9: [2, 0] }, {}, {}],
        ],
    },
    //3
    {
        materia: "Identidad, Liderazgo y Compromiso II",
        nrc: ["4"],
        secciones: [
            // l m m j v s
            [{ 21: [2, 0], 19: [2, 0] }, {}, {}, { 21: [2, 0], 19: [2, 0] }, {}, {}],
        ],
    },
    //4
    {
        materia: "Identidad, Liderazgo y Compromiso 3",
        nrc: ["5"],
        secciones: [
            // l m m j v s
            [
                { 20: [2, 0], 18: [2, 0] },
                {},
                {},
                { 20: [2, 0], 18: [2, 0] },
                {},
                { 20: [2, 0], 18: [2, 0] },
            ],
        ],
    },
];

let horTest = [
    //lunes 0
    { 7: [0, 0], 8: [0, 0], 12: [1, 0], 13: [1, 0] },
    //martes 1
    {},
    //miercoles 2
    { 10: [0, 0], 11: [0, 0] },
    //jueves 3
    { 8: [2, 0], 9: [2, 0], 13: [1, 0], 14: [1, 0], 15: [0, 0] },
    //viernes
    {},
    //sabado
    {},
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
    {},
];

function addSeccion(seccion, horTemp) {
    if (seccion /*&& canAddSeccion(seccion, horTemp)*/) {
        let horAux = JSON.parse(JSON.stringify(horTemp));
        for (let d = 0; d < 6; d++) {
            //Cuando hay clases ese dia => Copiamos
            if (Object.keys(seccion[d]).length > 0) {
                //Object.assign(horTemp[d-1], seccion[d]);
                //Hacemos copia
                Object.assign(horAux[d], seccion[d]);
            }
        }
        return horAux;
    }
    return null;
}

function canAddSeccion(seccion, horTemp) {
    if (seccion) {
        //Existe'()
        for (let d = 0; d < 6; d++) {
            //Mientras halla alguna clase ese dia, se recorre las horas para ver colisiones
            if (Object.keys(seccion[d]).length > 0) {
                for (let i = 7; i <= 21; i++) {
                    if (seccion[d][i]) {
                        //Hay algo a esa hora => chequemos en horario tmp
                        if (horTemp[d][i]) {
                            //Chocamos
                            //console.log("Chocamos dia: y hora: ", d, i);
                            //console.log(seccion, horTemp);
                            return 0;
                        }
                    }
                }
            }
        }
    } else {
        return null;
    }
    return 1;
}

function publicar(hor) {
    //console.log("publicars")
    if (matInscriptas.length > 0) {
        console.warn("PUBLICACION", numHor, hor);
        if (numHor != 1) {
            //primero
            document.getElementById("horarios").innerHTML += "<br>";
        }
        document.getElementById("horarios").innerHTML +=
            ` <h3>Horario ${numHor}</h3> 
        <div class="btn-group btn-block " role="group" aria-label="Basic example">
            <button class="btn btn-primary btn-sm " onclick="savePDF('${numHor}-hor')">
                PDF <i class="fas fa-download"></i>
            </button>
            <button class="btn btn-primary btn-sm" onclick="saveIMG('${numHor}-hor')">
                IMAGEN <i class="fas fa-download"></i>
            </button>
        </div>` + templateTable(numHor);

        numHor++;
        fillHorarioTemplate(hor);
    }
    hideSnack();
}

function horario(idMat, idSeccion, horarioT) {
    //console.log("ahor", horarioT);
    //console.log("String", JSON.stringify(horarioT));
    //JSON.parse(JSON.stringify(horarioT));
    var horarioTemp = JSON.parse(JSON.stringify(horarioT));
    //console.log("dhor", horarioTemp);

    //Si existe materia
    if (matInscriptas[idMat]) {
        //console.log("Mat existe", idMat);
        //Mientras la seccion exista y idSecc no se pase
        while (
            idSeccion < matInscriptas[idMat].secciones.length &&
            matInscriptas[idMat].secciones[idSeccion]
        ) {
            //console.log("ANTES horarioTemp", horarioTemp);
            if (canAddSeccion(matInscriptas[idMat].secciones[idSeccion], horarioTemp)) {
                //addSeccion(matInscriptas[idMat].secciones[idSeccion], horarioTemp);
                //console.log("Seccion add", idSeccion);
                //console.log("DESPUES horarioTemp", horarioTemp);
                //console.log("Horario (",idMat + 1, 0);
                horario(
                    idMat + 1,
                    0,
                    addSeccion(matInscriptas[idMat].secciones[idSeccion], horarioTemp)
                );
            }
            //console.log("volvemos", idMat, idSeccion);
            if (idSeccion == matInscriptas[idMat].secciones.length - 1 && idMat == 0) {
                //llegamos a la ultima interacion
                //Desactivar aviso "procesando"
                if (numHor == 1) {
                    //aviso de combinacciones no posibles
                    document.getElementById(
                        "horarios"
                    ).innerHTML = `<div class="alert alert-warning" role="alert">
                        ¡No se encontraron combinaciones posibles!  <i class="far fa-sad-tear"></i> <br> Una materia debe estar ocasionando el problema
                    </div>`;
                    hideSnack();
                }
                //
            }
            idSeccion += 1;
        }
    } else {
        //console.warn("Publicamos(",idMat,idSeccion);
        //No existe = no hay mas => publicar
        publicar(horarioTemp);
    }
}

function run() {
    numHor = 1;
    //matInscriptasBorrador = matInscriptas;
    document.getElementById("horarios").innerHTML = "";

    initColors();
    matInscriptas = matInscriptasBorrador.filter(Boolean);
    //console.log("run", horarioGen);
    msgSnack(`<div class="spinner-border spinner-border-sm text-light" role="status">
                <span class="sr-only">Loading...</span>
            </div> Generando!`);
    setTimeout(() => {
        horario(0, 0, horarioGen);
    }, 250);
}

function fillHorarioTemplate(horario) {
    let indHorario = document.getElementsByClassName("l7").length - 1;
    //Recorremos cada dia
    horario.forEach((dia, diaId) => {
        for (let hora in dia) {
            if (dia.hasOwnProperty(hora)) {
                let cell = document.getElementsByClassName(getClassDay(diaId, hora))[indHorario];
                cell.innerText = getDataCell(dia[hora][0], dia[hora][1]);
                cell.style.backgroundColor = getColorBack(dia[hora][0]);
            }
        }
    });
}

function getClassDay(did, hid) {
    let dayBase = "";
    switch (did) {
        case 0:
            dayBase = "l";
            break;
        case 1:
            dayBase = "m";
            break;
        case 2:
            dayBase = "mm";
            break;
        case 3:
            dayBase = "j";
            break;
        case 4:
            dayBase = "v";
            break;
        case 5:
            dayBase = "s";
            break;
    }

    return `${dayBase}${hid}`;
}

function getDataCell(matId, secId) {
    //matInscriptasBorrados USAR EN PRODUCCION
    //EN DEBUG matInscriptas
    let matData = matInscriptasBorrador[matId];
    //let matData = matInscriptas[matId];
    return `Alias: ${matData.nrc[secId]} 
                ${matData.materia}`;
}

let arrColor = [];
let i = 1;
function initColors() {
    arrColor = [];
    numHor = 1;
    i = 1;
}

function getColorBack(matId) {
    if (!arrColor[matId]) {
        //mat NO tiene color asig
        arrColor[matId] = `var(--c${i})`;
        i++;
    }
    return arrColor[matId];
}
