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
    divC.classList.add(id, "card");
    //divC.setAttribute("onclick", `desCheckMatList(${id});`)
    //divC.style.display = "inline-block";

    divC.innerHTML = `
                        <div class="card-header" style="position: relative;">
                            ${data.Asignatura} <a href="#"  onclick="desCheckMatList(${id});" class="stretched-link text-danger" ><i class="far fa-times-circle"></i></a>
                        </div>
                        <div class="card-body">
                            <div class="seccion">

                            </div>
                            <button onclick="modalSeccion()" class="btn btn-outline-primary btn-block wshadow"><i class="fas fa-plus"></i> Sección</button>
                        </div>
                   `;

    main.appendChild(divC);
}



function modalSeccion(){
    $('#seccionModal').modal('show');

}
