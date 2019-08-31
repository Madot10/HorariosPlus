//Abre modal
function openModal(nameModal) {
    isOpen = 1;

    /* switch (nameModal) {
        case 'coopModal':
            resetCoopModal();
            break;

        case 'carModal':
           if(!sede){
                isOpen = 0;
                alert("¡DEBE SELECCIONAR UNA SEDE!");
            }
            break;

        case 'matModal':
           if(!carrera){
                isOpen = 0;
                alert("¡DEBE SELECCIONAR UNA CARRERA!");
            }
            break;

        default:
            break;
    }
 */
    if (isOpen) {
        //abrir
        document.getElementById(nameModal).style.display = "block";
    } else {
        document.getElementById(nameModal).style.display = "none";
    }
}

window.onclick = function (event) {
    // alert("run");
    if (isOpen && event.target.className == 'modal') {
        //Si hay algun modal abierto >> cerrar
        closeModal();
    }
}

function closeModal() {
    isOpen = 0;
    for (const modal of document.getElementsByClassName("modal")) {
        modal.style.display = "none";
    }
}

function carreraSelect(elem){
    //limpiamos texto
    let content = elem.textContent.replace(/\n/g,'');
    content = elem.textContent.replace(/[.]/g,'');
    content = content.trim();
    content = content.toUpperCase();

    let span;
    let parentElem;

   
    span = document.getElementById("sCarrera");
    parentElem = span.parentElement;
   

    //guardamos
    carrera = content.replace(/\s/g,'').toLowerCase();

    //Ocultamos flecha
    parentElem.children[2].style.display = 'none';

    materias = GetJsonDataMaterias(carrera);
    //console.log(carrera, materias);

    //mostramos nombre de carrera en boton exterior
    span.innerHTML = content;

    //limpiamos tabla de materias 
    // document.getElementsByClassName('materias')[0].innerHTML = '';
    // ucbase = 0;
    // uctotal = 0;
  

    genMateriaList();
    closeModal();
}

function genMateriaList(){
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
        if(semI != semAct){ 
            semAct = semI;
            if(divBtn && divCont){
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