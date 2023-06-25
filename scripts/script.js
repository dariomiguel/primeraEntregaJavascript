/////////////////////////////////////////////////////////////////
//                Declaración de variables                     //
/////////////////////////////////////////////////////////////////

//Variables Globales
datos=false;

//Declaración del array vacío que nos servirá para listar los elementos como si fuera una base de datos.
let registro =  [], registroJson =  JSON.stringify(registro);

//Nombre de las ID que se utilizan en la table
let ids = ["operarioResponsable", "codigoMaquina", "cantidadProduccion", "hsProduccion", "paradasTecnicas", "fechaTrabajo"];

/////////////////////////////////////////////////////////////////
//        Declaración de clase Constructora de objetos         //
/////////////////////////////////////////////////////////////////

class maquina {
    constructor(operarioResponsable, codigoMaquina, cantidadProduccion, hsProduccion, paradasTecnicas, fechaTrabajo, contenido){
        this.operarioResponsable = operarioResponsable;
        this.codigoMaquina = codigoMaquina;
        this.cantidadProduccion = cantidadProduccion;
        this.hsProduccion = hsProduccion;
        this.paradasTecnicas = paradasTecnicas;
        this.fechaTrabajo = fechaTrabajo;
        //Verificar si tiene valores cargados
        this.contenido = contenido;
    }
    //Metodo para obtener los valores mediante los inputs
    getInputs() {
        this.operarioResponsable = document.getElementById("operarioResponsable").value;
        this.codigoMaquina = document.getElementById("codigoMaquina").value;
        this.cantidadProduccion = document.getElementById("cantidadProduccion").value;
        this.hsProduccion = document.getElementById("hsProduccion").value;
        this.paradasTecnicas = document.getElementById("paradasTecnicas").value;
        this.fechaTrabajo = document.getElementById("fechaTrabajo").value;
        this.contenido = true
        
    }
    //Metodo para seleccionar los valores y retornar un valor correcto para la lista
    normalizarValores(){
        //Convertir los nombres de los operarios a tipo oración y los pase de esta manera al registro
        this.operarioResponsable = this.operarioResponsable.charAt(0).toUpperCase()+this.operarioResponsable.slice(1).toLowerCase();
        //Convertimos los valores de los codigos de máquinas 
        this.codigoMaquina = this.codigoMaquina.toUpperCase();
        //Convertimos los valores numericos para que no tengan un cero por delante
        this.cantidadProduccion = parseInt(this.cantidadProduccion,10);
        this.hsProduccion = parseInt(this.hsProduccion,10);
        this.paradasTecnicas = parseInt(this.paradasTecnicas,10);
        //Convierte el formato de fecha al que necesito en el proyecto
        this.fechaTrabajo = new Date(this.fechaTrabajo).toLocaleDateString("es-ES");     
    }
    //Metodo que verifica que no exista un elemeento vacío
    verificarDatosVacios(){
        for(let key in this){
                this[key] === "" ? this.contenido = false : null;
        }
    }
}

/////////////////////////////////////////////////////////////////
//   Declaración de objetos predeterminado para pruebas        //
/////////////////////////////////////////////////////////////////

function valoresPredeterminadosPrueba(){
    inicializarRegistro();
    let valorPruebaUno = new maquina("Darío", "asd111", 55500, 22, 1, new Date("2012-01-01").toLocaleDateString(), true);
    registro.push(valorPruebaUno);
    let valorPruebaDos = new maquina("Maira", "11d111", 5500, 12, 3, new Date("2012-01-02").toLocaleDateString(), true);
    registro.push(valorPruebaDos);
    let valorPruebaTres = new maquina("Carlos", "234aa", 23, 1, 12, new Date("2012-02-01").toLocaleDateString(), true);
    registro.push(valorPruebaTres);
    let valorPruebaCuatro = new maquina("Pepe", "cdcd21", 11, 23, 3, new Date("2012-03-01").toLocaleDateString(), true);
    registro.push(valorPruebaCuatro);
    let valorPruebaCinco = new maquina("Ana", "a1112f", 31231, 10, 0, new Date("2022-01-06").toLocaleDateString(), true);
    registro.push(valorPruebaCinco);
    let valorPruebaSeis = new maquina("Simon", "aa1144", 600, 21, 15, new Date("2023-01-01").toLocaleDateString(), true);
    registro.push(valorPruebaSeis);
    guardarRegistro();
}

/////////////////////////////////////////////////////////////////
//                Declaración de funciones                     //
/////////////////////////////////////////////////////////////////

//Función para inicialiar los elementos del registro
function inicializarRegistro(){
    registroJson = localStorage.getItem("registro");
    //llenamos el contenido de "registro" con lo que posee "registroJson" y si está vacío que cree un array vacío.
    registro = JSON.parse(registroJson) || [];
    datos = registro.length !== 0;  
}

//Función para guardar en registro
function guardarRegistro(){
    registroJson = JSON.stringify(registro);
    localStorage.setItem("registro", registroJson);
}

/////////////////////////////////////////////////////////////////
//               Metodos para manipular el HTML                //
/////////////////////////////////////////////////////////////////

//Función para restablecer los valores del inputs a valor vacío
function restablecerValores() {
    for (let i = 0; i < ids.length; i++) {
        document.getElementById(ids[i]).value = "";
    }
}

//Función para sacar del objeto los valores y convertirlo en un array
function valoresArray(objeto){
    let array = [];
    for (let key in objeto){
        key !== 'contenido' ? array.push(objeto[key]) : null;
    }
    return array
}

//Función para obtener los valores del input
function ingresarDatosInput() {
    inicializarRegistro();

    let elementoNuevo = new maquina();
    elementoNuevo.getInputs();
    elementoNuevo.normalizarValores()
    elementoNuevo.verificarDatosVacios();
    elementoNuevo.contenido ? registro.push(elementoNuevo) : Swal.fire('Cuidado!','Complete todos los campos para continuar.','error');

    restablecerValores();
    guardarRegistro();
}

//Función agregar filas en tabla de registro con el contenido del input
function agregarFila() {
    inicializarRegistro();
    //Agregamos la tabla como variable a usar
    if(document.getElementById("tablaRegistro")!==null){
        let tablaRegistro = document.getElementById("tablaRegistro");
        //Obtenemos el tbody de la tabla
        let tbody = tablaRegistro.querySelector("tbody");
        //Agregamos un for con el tamaño igual a la cantidad de objetos que tenemos guardados en nuestro arreglo
        for(let j = 0; j < registro.length; j++){
            //Insertamos una fila nueva en el tbody
            let fila = tbody.insertRow();
            // Array con el contenido para cada celda
            let contenidoCeldas = valoresArray(registro[j])
            // Iterar sobre el array y crear una celda para cada elemento
            for (let i = 0; i < contenidoCeldas.length; i++) {
                let celda = fila.insertCell();
                celda.innerHTML = contenidoCeldas[i];
            }
        }
    }
}

function ordernarLista (propiedad) {
    inicializarRegistro();
    //Variable para invertir los valores de la tabla sin que desaparezca cuando se refresca la pantalla
    let inversorGuardado = localStorage.getItem("inversor")
    //Si es distinto significa que fue presionado una sola vez
    if (propiedad !== inversorGuardado){    
        // En la lógica excluimos a quienes queremos tratar como texto
        if (propiedad === "operarioResponsable" || propiedad === "codigoMaquina"|| propiedad === "fechaTrabajo"){
            //Se crea un ordenador para mover de lugar los elementos del registro, utilzando una variable auxiliar donde guardamos los objetos
            for(let i = 0; i < registro.length -1; i++){
                for (let j = i + 1; j < registro.length; j++){
                    if (registro[i][propiedad] > registro[j][propiedad]){
                        let aux = registro[i];
                        registro[i] = registro[j];
                        registro[j] = aux;
                    }
                }
            }
            localStorage.setItem("inversor", propiedad);
        }else{
            for(let i = 0; i < registro.length -1; i++){
                for (let j = i + 1; j < registro.length; j++){
                    if (parseInt( registro[i][propiedad]) > parseInt(registro[j][propiedad])){
                        let aux = registro[i];
                        registro[i] = registro[j];
                        registro[j] = aux;
                    }
                }
            }
            localStorage.setItem("inversor", propiedad);
        }
    //lógica para invertir la tabla
    }else{
        registro = [...registro].reverse();
        localStorage.setItem("inversor", "variableDiferente");
    }
    guardarRegistro(); 
    agregarFila();
    return inversorGuardado
}

//Función para borrar tabla y colocar nuevos datos 
function borrarTablaRegistro(){
    let tabla = document.getElementById("tablaRegistro");
    // Obtenemos todas las filas excepto la fila del encabezado
    let filas = tabla.getElementsByTagName("tr");
    let filasAEliminar = Array.from(filas).slice(1);
    // Eliminar las filas
    filasAEliminar.forEach((fila) => fila.remove());
}

//Función para resetear valores del local storage
let reseteo = () => {
    Swal.fire({
        title: '¿Desea eliminar todos los datos del registro?',
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        confirmButtonColor: '#dc3741',
        focusConfirm: false,
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire('Se eliminaron los valores del registro', '', 'info')
            localStorage.clear();
        }
    })
}

//Función para crear eventos para los botones de ordenamiento de la lista
function crearEventoBoton(boton, propiedad) {
    if (boton !== null) {
        boton.addEventListener("click", (e) => {
            borrarTablaRegistro();
            ordernarLista(propiedad);

            //Gira la flecha del elemento que ordena la lista
            let elementoTh = document.querySelectorAll("th");
            let elementoB = document.querySelectorAll("th b");
            elementoB.forEach((elementoB, index) => {
                //Iteramos sobre cada th y verificamos que no posee la clase y colocamos la clase firar a quien corresponde
                elementoTh[index] === e.target ? elementoB.classList.toggle("girar") : elementoB.classList.remove("girar")
            });
        });
    }
}  

/////////////////////////////////////////////////////////////////
//                           Eventos                           //
/////////////////////////////////////////////////////////////////

//Botón para agregar los datos del input
let btnAgregarDatos = document.getElementById("btnAgregarDatos");
btnAgregarDatos !== null ? btnAgregarDatos.addEventListener("click", ingresarDatosInput) : null;

//Botón para resetear los datos
let btnReset = document.getElementById("btnReset");
btnReset !== null ? btnReset.addEventListener("click", reseteo) : null;

//Evento para agregar filas a la tabla de ver datos con los datos cargados en el registro cuando carga la página
document.addEventListener("DOMContentLoaded", () => agregarFila() );

//Botones con valores predeterminados que podemos usar para pruebas
let btnValoresPredeterminados = document.getElementById("btnValoresPredeterminados");
btnValoresPredeterminados !== null ? btnValoresPredeterminados.addEventListener("click", valoresPredeterminadosPrueba) : null;


//////Botones para ordenar la lista

//Alfabeticamente por nombre de operario
crearEventoBoton(document.getElementById("btnOrdenarOperarioResponsable"),"operarioResponsable");
//Alfabeticamente por codigo de máquina
crearEventoBoton(document.getElementById("btnOrdenarCodigo"),"codigoMaquina");
//Numericamente por cantidad de producción
crearEventoBoton(document.getElementById("btnOrdenarProduccion"),"cantidadProduccion");
//Numericamente por cantidad de horas de producción
crearEventoBoton(document.getElementById("btnOrdenarHsProduccion"),"hsProduccion");
//Numericamente por orden cantidad de producción
crearEventoBoton(document.getElementById("btnOrdenarParadas"),"paradasTecnicas");
//Numericamente por fecha
crearEventoBoton(document.getElementById("btnOrdenarFecha"),"fechaTrabajo");
