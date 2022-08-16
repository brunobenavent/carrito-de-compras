//Variables que vamos a necesitar
const listaCursos = document.querySelector("#lista-cursos");
const carrito = document.querySelector("#lista-carrito");
const contenedorCursos = carrito.querySelector("tbody");
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");
let cursosAgregados = [];



//Cargamos nuestros eventos y los mandamos a llamar
cargarEventListeners();
function cargarEventListeners(){
    listaCursos.addEventListener("click", agregarCurso);
    contenedorCursos.addEventListener("click", eliminarCurso);
    vaciarCarritoBtn.addEventListener("click", e =>{
        e.preventDefault();
        cursosAgregados = [];
        console.log(cursosAgregados);
        pintarHtml();

    });
}

function agregarCurso(e){
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        leerDatosCurso(e.target.parentElement.parentElement);
    }
}

function eliminarCurso(e){
    e.preventDefault();
    if(e.target.classList.contains("borrar-curso")){
        const id = e.target.getAttribute("data-id");
        cursosAgregados = cursosAgregados.filter(curso=> curso.id !== id);
        console.log(cursosAgregados);
        pintarHtml();
        
    }

}





function leerDatosCurso(curso){
    const infoCurso ={
        imagen: curso.querySelector(".imagen-curso").src,
        titulo: curso.querySelector("h4").textContent,
        precio: curso.querySelector(".precio").textContent,
        cantidad: 1,
        id: curso.querySelector(".agregar-carrito").getAttribute("data-id")
    }
    agregarCursoCarrito(infoCurso);
}

function agregarCursoCarrito(curso){
    const existeCurso = cursosAgregados.some( cursoAgregado => cursoAgregado.id===curso.id);
    if(existeCurso){
        cursosAgregados = cursosAgregados.map( cursoAgregado =>{
             if(cursoAgregado.id===curso.id){
                cursoAgregado.cantidad++;
                return cursoAgregado;
            }else{
                 return cursoAgregado;
             }     
        });
       
    } else{
         cursosAgregados = [...cursosAgregados, curso];
    } 
    pintarHtml();  
    console.log(cursosAgregados);
}

function pintarHtml(){
    limpiarHtml();
    cursosAgregados.forEach( curso => {
        const fila = document.createElement("tr");
        const {imagen, nombre, precio, cantidad, id} = curso;
        fila.innerHTML=`
        <td>  
        <img src="${curso.imagen}" width=100>
   </td>
            <td>${nombre}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>
            <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
       </td>
        `;
        contenedorCursos.appendChild(fila);
    });

}













function limpiarHtml(){
    while(contenedorCursos.firstChild){
        contenedorCursos.removeChild(contenedorCursos.firstChild);
    }
}