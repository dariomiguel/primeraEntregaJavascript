/////////////////////////////////////////////////////////////////
//                Declaración de variables                     //
/////////////////////////////////////////////////////////////////

//Variables Globales
datos=false;

//Nombre de las ID que se utilizan en la table
let ids = ["operarioResponsable", "codigoMaquina", "cantidadProduccion", "hsProduccion", "paradasTecnicas", "fechaTrabajo"];

/////////////////////////////////////////////////////////////////
//        Declaración de clase Constructora de objetos         //
/////////////////////////////////////////////////////////////////

class Maquina {
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
        this.fechaTrabajo = document.getElementById("fechaTrabajo").value;
        this.operarioResponsable = document.getElementById("operarioResponsable").value;
        this.codigoMaquina = document.getElementById("codigoMaquina").value;
        this.cantidadProduccion = document.getElementById("cantidadProduccion").value;
        this.hsProduccion = document.getElementById("hsProduccion").value;
        this.paradasTecnicas = document.getElementById("paradasTecnicas").value;
        this.contenido = true;
        
    }
    //Metodo para seleccionar los valores y retornar un valor correcto para la lista
    normalizarValores(){
        //Convierte el formato de fecha al que necesito en el proyecto
        this.fechaTrabajo = new Date(this.fechaTrabajo).toLocaleDateString("es-ES");     
        //Convertir los nombres de los operarios a tipo oración y los pase de esta manera al registro
        this.operarioResponsable = this.operarioResponsable.charAt(0).toUpperCase()+this.operarioResponsable.slice(1).toLowerCase();
        //Convertimos los valores de los codigos de máquinas 
        this.codigoMaquina = this.codigoMaquina.toUpperCase();
        //Convertimos los valores numericos para que no tengan un cero por delante
        this.cantidadProduccion = parseInt(this.cantidadProduccion,10);
        this.hsProduccion = parseInt(this.hsProduccion,10);
        this.paradasTecnicas = parseInt(this.paradasTecnicas,10);
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
    let valorPruebaUno = new Maquina("Darío", "ASD111", 55500, 22, 1, new Date("2023-01-01").toLocaleDateString(), true);
    registro.push(valorPruebaUno);
    let valorPruebaDos = new Maquina("Maira", "11D111", 5500, 12, 3, new Date("2023-01-02").toLocaleDateString(), true);
    registro.push(valorPruebaDos);
    let valorPruebaTres = new Maquina("Carlos", "234AAV", 23, 1, 12, new Date("2023-02-01").toLocaleDateString(), true);
    registro.push(valorPruebaTres);
    let valorPruebaCuatro = new Maquina("Pepe", "CDCD21", 11, 23, 3, new Date("2023-03-01").toLocaleDateString(), true);
    registro.push(valorPruebaCuatro);
    let valorPruebaCinco = new Maquina("Ana", "A1112F", 31231, 10, 0, new Date("2023-01-06").toLocaleDateString(), true);
    registro.push(valorPruebaCinco);
    let valorPruebaSeis = new Maquina("Simon", "AA1144", 600, 21, 15, new Date("2023-01-01").toLocaleDateString(), true);
    registro.push(valorPruebaSeis);
    Toastify({
        text: "Se agregaron valores de prueba!",
        duration: 3000
        }).showToast();
    guardarRegistro();
}


/////////////////////////////////////////////////////////////////
//                Declaración de funciones                     //
/////////////////////////////////////////////////////////////////

//Función para convertir en fecha los elementos dados
function convertirAFecha (dia, mes, anio){
    let fecha = new Date(anio, mes - 1, dia);
    //Convertimos la fecha a un formato standard que utilzamos en el script
    let fechaFormateada = fecha.toISOString().split("T")[0];
    return fechaFormateada
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
    
    let elementoNuevo = new Maquina();
    elementoNuevo.getInputs();
    elementoNuevo.verificarDatosVacios();
    elementoNuevo.normalizarValores();
    //Verificamos si todos los input tienen contenido
    if(elementoNuevo.contenido){
        registro.push(elementoNuevo);
        restablecerValores();
        guardarRegistro();
        Toastify({
            text: "Se agregaron datos al registro!",
            duration: 3000
        }).showToast();
    }else{
        Swal.fire('Cuidado!','Complete todos los campos para continuar.','error')
    }
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

// enviarInformeDiario();
function enviarInformeDiario() {
    inicializarCorreosMemoria();
    let asuntoDiario = document.getElementById("asuntoDiario");
    asuntoDiario.innerHTML = correosMemoria[0];
    let mensajeDiario = document.getElementById("mensajeDiario");
    mensajeDiario.innerHTML = correosMemoria[1];
}

document.addEventListener("DOMContentLoaded", enviarInformeDiario);

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

let maquinaRandom = () =>{ 
    fetch("https://randomapi.com/api/wq29y0su?key=DOWN-I1EH-1F0L-6RKT")
        .then(response => response.json())
        .then(data => {
            let inputFechaTrabajo = document.getElementById("fechaTrabajo");
            inputFechaTrabajo.value = convertirAFecha( data.results[0].maquinaRandom.fecha.dia, data.results[0].maquinaRandom.fecha.mes - 1, 2023);
            
            let inputOperarioResponsable = document.getElementById("operarioResponsable");
            inputOperarioResponsable.value = data.results[0].maquinaRandom.nombre;
            
            let inputCodigoMaquina = document.getElementById("codigoMaquina");
            inputCodigoMaquina.value = data.results[0].maquinaRandom.codigo;
            
            let inputCantidadProduccion = document.getElementById("cantidadProduccion");
            inputCantidadProduccion.value = data.results[0].maquinaRandom.produccion;
            
            let inputHsProduccion = document.getElementById("hsProduccion");
            inputHsProduccion.value = data.results[0].maquinaRandom.horasProduccion;
            
            let inputParadasTecnicas = document.getElementById("paradasTecnicas");
            inputParadasTecnicas.value = data.results[0].maquinaRandom.paradas;        
        });
    }

let btnValoresRandom = document.getElementById("btnValoresRandom");
btnValoresRandom !== null ? btnValoresRandom.addEventListener("click",maquinaRandom) : null;