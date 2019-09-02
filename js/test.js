var carrera = "";

function GetJsonDataMaterias(tx) {
    tx = tx.replace(/\s/g, '');
    tx = tx.replace(/\n/g, '');
    tx = tx.toLowerCase();

    //console.log("TX " + tx);
    return tx = window[tx];
}

/* MATERIA MODAL */
function toggleActiveChbox(elem){
    let parentElem = elem.parentElement;
    parentElem.classList.toggle("actChbox");
    materiaSelect(elem);
}

/* SISTEMA DE MATERIAS */
function toggleList(elem) {

    elem.classList.toggle("active");
    var content = elem.nextElementSibling;

    if (content.style.display === "block") {
        content.style.display = "none";
    } else {
        content.style.display = "block";
    }


}

function desCheckMatList(id){
    let elem = document.getElementById(id);
    
    if(elem.checked){
        elem.checked = false;
    }

    toggleActiveChbox(elem);   
}

function carreraSelect(elem) {
    //limpiamos texto
    let content = elem.textContent.replace(/\n/g, '');
    content = elem.textContent.replace(/[.]/g, '');
    content = content.trim();
    content = content.toUpperCase();

    $('#carreraModal').modal('hide')
    //let span;
    //let parentElem;


    //span = document.getElementById("sCarrera");
    //parentElem = span.parentElement;


    //guardamos
    carrera = content.replace(/\s/g, '').toLowerCase();

    //Ocultamos flecha
    //parentElem.children[2].style.display = 'none';

    materias = GetJsonDataMaterias(carrera);
    //console.log(carrera, materias);

    //mostramos nombre de carrera en boton exterior
    //span.innerHTML = content;

    //limpiamos tabla de materias 
    // document.getElementsByClassName('materias')[0].innerHTML = '';
    // ucbase = 0;
    // uctotal = 0;


    genMateriaList();
}

function genMateriaList() {
    let main = document.getElementById("matList");
    main.innerHTML = '';
    let divBtn;
    let divCont;

    let semI = null;
    let semAct = null;
    //console.log("run out");
    //Reccorremos cada materia
    for (let i = 0; i < materias.length; i++) {
        //console.log("run");
        semI = materias[i].Semestre;

        //Nuevo semestre >> nueva seccion
        if (semI != semAct) {
            semAct = semI;
            if (divBtn && divCont) {
                main.appendChild(divBtn);
                main.appendChild(divCont);
            }
            //Creamos
            divBtn = document.createElement("div");
            divCont = document.createElement("div");

            //Formato
            divBtn.innerHTML = `<div class="collapsible" onclick="toggleList(this)"> ${semAct}</div>`;
            divCont.innerHTML = `<div class="content"></div>`;

            divBtn = divBtn.firstElementChild;
            divCont = divCont.firstElementChild;
        }

        //if(mode == "UC"){
        //Creamos materia
        let div = document.createElement('div');
        div.setAttribute("class", "divMat");

        let inp = document.createElement('input');
        inp.setAttribute("id", i);
        inp.setAttribute("type", "checkbox");
        inp.setAttribute("class", "chbox");
        //oninput
        inp.setAttribute("onclick", "toggleActiveChbox(this)");

        div.appendChild(inp);

        let lb = document.createElement("label");
        lb.setAttribute("for", i);
        lb.setAttribute("class", "materia");
        lb.innerText = materias[i].Asignatura;

        div.appendChild(lb);

        divCont.appendChild(div);
        //}
    }
    main.appendChild(divBtn);
    main.appendChild(divCont);
}

function materiaSelect(elem){
    //Verificamos si es true o false
    let id = elem.getAttribute("id");
    if(elem.checked){
        //activado
        addMateriaList(id);
    }else{
        //desactivado >> eliminar
        deleteMateriaList(id);
    }
}

function deleteMateriaList(id){
    let elem = document.getElementsByClassName(id)[0];
    elem.parentNode.removeChild(elem);
}

function addMateriaList(id){
    let data = materias[id];
    console.log("ID: ", id);
    let main = document.getElementById("materias");

    let divC = document.createElement("div");
    divC.classList.add(id, "card", "card-mat");
    //divC.setAttribute("id", `${id}-mat`);
    //divC.setAttribute("onclick", `desCheckMatList(${id});`)
    //divC.style.display = "inline-block";

    divC.innerHTML = `
                        <div class="card-header" style="position: relative;">
                            ${data.Asignatura} <a href="#"  onclick="desCheckMatList(${id});" class="stretched-link text-danger" ><i class="far fa-times-circle"></i></a>
                        </div>
                        <div class="card-body">
                            <div class="seccion" id="${id}-mat">

                            </div>
                            <button onclick="modalSeccion(${id})" class="btn btn-outline-primary btn-block wshadow"><i class="fas fa-plus"></i> Sección</button>
                        </div>
                   `;

    main.appendChild(divC);
}

let matInscriptasBorrador = [];

var idMatActual = null;

function modalSeccion(idMat){
    clearModalSeccion();
    console.log("idMateria: ", idMat);
    idMatActual = idMat;

    $('#seccionModal').modal('show');
}

function guardarSeccion(){
    let codNRC = document.getElementById("inNrc").value;
    if(codNRC != ""){
        if(matInscriptasBorrador[idMatActual]){
            //Existe mat => agregar seccion
            matInscriptasBorrador[idMatActual].nrc.push(codNRC);
            matInscriptasBorrador[idMatActual].secciones.push(genArrSeccion());
        }else{
            console.warn("Create materia ", idMatActual, matInscriptasBorrador[idMatActual]);
            //Crear materia
            let matAux = {};
            matAux["materia"] = window[carrera][idMatActual].Asignatura;
            matAux["nrc"] = [];
            matAux.nrc.push(codNRC);
            //Agregar seccion
            matAux["secciones"] = [];
            matAux.secciones.push(genArrSeccion());
    
            matInscriptasBorrador[idMatActual] = matAux;
        }
    
        insertSecCard(idMatActual, codNRC);
        $('#seccionModal').modal('hide');
        console.log("Guarda Seccion!");
    }else{
        alert("Debe introducir un NRC!");
    }
    
}

function insertSecCard(idMat, nrc){
    let divMain = document.getElementById(`${idMat}-mat`);
    divMain.innerHTML += `   <button id="${idMat}-${nrc}" onclick="deleteSeccion(${idMat}, ${nrc})" type="button" class="list-group-item list-group-item-action">
                                NRC: ${nrc} <i class="fas fa-times-circle text-danger"></i>
                            </button>`;
}

function isMatSaved(matName){
    matInscriptasBorrador.forEach((mat, i) =>{
        if(matName == mat.materia){
            //Retornamos => Index 
            return i;
        }
    });
    return false;
}

function genArrSeccion(){
    let sec = [[]];
    let hours  = document.getElementsByClassName("check-time");

    let idayAnt = 0;
    let objDay = {};
    let matData = matInscriptasBorrador[idMatActual];

    let idSeccion = 0;
        if(matData){
            idSeccion = matData.secciones.length;
        }
    Array.from(hours).forEach((check, i) =>{
        let idayActual = Math.floor(i / 15);

        //hay Cambio de dia o llegamos al ultimo* 
        if((idayAnt != idayActual)){
            idayAnt = idayActual;
            
            sec.push(objDay); //Guardamos dia
            objDay = {}; //Cambio de dia
        } 
        
        //Hay clase
        if(check.checked){
            objDay[(i % 15) + 7] = [idMatActual, idSeccion]
        }

        //Ultimo guardamos
        if(i == 89){
            sec.push(objDay); //Guardamos dia
        }
    })

    console.log("Seccion gen: ", sec);
    return sec;
}

function deleteSeccion(idMat, nrc){
    let idSec =  matInscriptasBorrador[idMat].nrc.indexOf(`${nrc}`);
    
    //Eliminar seccion
    matInscriptasBorrador[idMat].secciones.splice(idSec,1);
    //Eliminar NRC de registro
    matInscriptasBorrador[idMat].nrc.splice(idSec,1);

    //Delete html card
    //console.log(` Deleting ${idMat}-${nrc}`);
    let elem = document.getElementById(`${idMat}-${nrc}`);
    elem.parentNode.removeChild(elem);
    
}

function clearModalSeccion(){
    //console.warn("CLEAN");
    document.getElementById("inNrc").value = "";

    let hours  = document.getElementsByClassName("check-time");
    Array.from(hours).forEach(elem =>{
        elem.checked = false;
    })
}