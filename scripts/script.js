/////////////////////////////////////////////////////////////////
//                Declaración de variables                     //
/////////////////////////////////////////////////////////////////

//Variables Globales
let opcionMenuPrincipal=0, mayor=0, indexMayorProduccion=0, total=0, promedio=0, datos=false, fechaActualTexto="";

//Declaración del array vacío que nos servirá para listar los elementos como si fuera una base de datos.
let registro =  [], registroJson =  JSON.stringify(registro);

//Nombre de las ID que se utilizan en la table
let ids = ["operarioResponsable", "codigoMaquina", "cantidadProduccion", "hsProduccion", "paradasTecnicas", "fechaTrabajo"];

/////////////////////////////////////////////////////////////////
//                Declaración de funciones                     //
/////////////////////////////////////////////////////////////////

//Función para el Menú Principal prompt.
function menu(){
    opcionMenuPrincipal = prompt(`MENU PRINCIPAL
    1_Ingresar datos de máquinas
    2_Lista de datos
    3_Enviar Correo de informe diario
    4_Enviar Correo para máquinas que requieren mantenimiento
    5_Buscar\n6_SALIR o presione el botón de "Cancelar"\n
Seleccione una opción:`);
//Se editó esta parte de la función para poder cerrar el menú, con el boton "Cancelar", si es nulo devuelve 6 para poder cerrar la ventana  
    opcionMenuPrincipal === null ? opcionMenuPrincipal = 6 : opcionMenuPrincipal = parseInt(opcionMenuPrincipal);
    
}

//Función para inicialiar los elementos del registro
function inicilizarRegistro(){
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

//Función para agregar los datos del Prompt de cada máquina al registro
function ingresarDatosPrompt(){
    inicilizarRegistro()

    let maquina = {
        fechaTrabajo: promptValido("Ingrese la fecha en el siguiente formato 01/01/2000: \n"),
        operarioResponsable: promptValido ("Operario a cargo: \n"),
        codigoMaquina: promptValido("código de máquina: \n"),
        cantidadProduccion: promptValido("Ingrese cantidad de productos fabricados: \n"),
        hsProduccion: promptValido ("Ingrese cantidad de horas de producción: \n"),
        paradasTecnicas: promptValido ("Ingrese cantidad de paradas técnicas: \n")
    };
    registro.push(maquina);

    guardarRegistro();
}

//Verifica si hay datos cargados en el registro
function verificarDatosCargados(funcion) {
    //Se inicializa el registro para poder verificar si hay datos
    inicilizarRegistro();
    datos ? funcion():alert("No hay datos cargados todavía");
}

//Función para listar registro
function listarRegistro(array, indexArray){
    alert("Máquina " + array[indexArray].codigoMaquina + ":" + "\n" +
    "    Producción:           " + array[indexArray].cantidadProduccion + "\n" + 
    "    Horas de Trabajo: " + array[indexArray].hsProduccion + "\n" + 
    "    Paradas Técnicas:  " + array[indexArray].paradasTecnicas + "\n" +
    "    Operario a cargo: " + array[indexArray].operarioResponsable);
}  

//Función para listar los datos cargados
function listarDatos(){
    inicilizarRegistro()
    for (let elemento of registro) {
        let indexArray=registro.indexOf(elemento);
        listarRegistro(registro,indexArray);
    }    
    guardarRegistro()
}

//Función que calcular la mayor producción
function mayorProduccion(){
    for(let i = 0; i < registro.length; i++){
        if(registro[i].cantidadProduccion > mayor){
            mayor = registro[i].cantidadProduccion;
            indexMayorProduccion = i;
        }
    }
}

//Función que cambia el valor para la producción total y el promedio
function produccionTotal(){
    total = 0;  //Se resetea el valor de total, para prevenir que se calcule al valor ya existente.
    for (let elemento of registro){
        elemento.cantidadProduccion = parseInt(elemento.cantidadProduccion);
        total += elemento.cantidadProduccion;//Suma cada una de las produccion que realizó cada maquina y lo agrega en la variable total.
    }
    return total
}

//Función para el calculo del promedio
function calcularPromedio() {
    let totalProduccion = produccionTotal();
    promedio = totalProduccion / registro.length;
};

//Función que muestra en texto la fecha del dia de hoy
function mostrarFechaHoy(){
    //Se crea un objeto llamado fecha actual para poder extraer los dias, mes y años del día que se ejecute
    const fechaActual = new Date();  
    const dia = fechaActual.getDate();  // Se utiliza la instancia para el día 
    const mes = fechaActual.getMonth() + 1; // Se utiliza la instancia para los meses, los meses empiezan en 0, así que se suma 1
    const anio = fechaActual.getFullYear(); // Se utiliza la instancia para los años
    fechaActualTexto = dia + "/" + mes + "/" + anio;
}

//Función para enviar correo de informe de producción diario
function enviarInformeDiario(){
    // Se llaman a las funciones para tener los valores que se colocarán en el cuerpo del mensaje (total, promedio, Mayor producción y fecha)
    mayorProduccion();
    produccionTotal();
    calcularPromedio();
    mostrarFechaHoy();

    alert("Asunto: Producción del día " + fechaActualTexto + "\nInforme: \n\n" + 
    "La máquina que más produjo es la " + registro[indexMayorProduccion].codigoMaquina + ". El total de producción del día es de " + total + " unidades, dando un promedio de " + promedio + " unidades por máquina.\n\nSaludos Cordiales");
}

//Función para enviar correo de informe de producción diario.
function enviarInformeMantenimiento(){
    mostrarFechaHoy();

    /* Se crea una variable signoAuxiliar donde se ubicarán los valores para los strings y se crea un array de mantenimiento vacío que 
    contendrá unicamente las máquinas que necesitan mantenimiento, para que en el texto queden corectamente las comas. las 
    variables oracionAuxiliarA y oracionAuxiliarB, corresponden a las variables para que el mensaje esté en plural o no.*/  
    let signoAuxiliar = "", arrayMantenimiento =[];

    //Se crea el array, rellenandolo con las máquinas que necesitan paradas técnicas
    for(let elemento of registro){
        if(elemento.paradasTecnicas > 3){
            arrayMantenimiento.push(elemento.codigoMaquina);
        }
    }

    /*Creamos un string con cada una de las máquinas que necesitan mantenimiento (Las que poseen más de 3 paradas técnicas).
    y se concatenan a la variable signoAuxiliar.
    Primero corroboramos que la cantidad de máquinas para mantenimiento es distinto de cero para poder colocar correctamente
    el texto en el mensaje*/
    if(arrayMantenimiento.length !== 0){
        signoAuxiliar = ": " + arrayMantenimiento.join(", ");
    }

    //Si la función tiene uno o más máquinas, cambiará el texto del mensaje.
    if(arrayMantenimiento.length === 0){
        alert("Asunto: Máquina para mantenimiento preventivo          " + fechaActualTexto + "\n\n" +
        "Informe: \nNo se presentan máquinas para mantenimiento preventivo" + signoAuxiliar + ".\n\nSaludos Cordiales");
    }else if(arrayMantenimiento.length === 1){
        alert("Asunto: Máquina para mantenimiento preventivo          " + fechaActualTexto + "\n\n" +
        "Informe: \nLa siguiente máquinas necesita mantenimiento preventivo" + signoAuxiliar + ".\n\nSaludos Cordiales");
    }else{
        alert("Asunto: Máquinas para mantenimiento preventivo          " + fechaActualTexto + "\n\n" +
        "Informe: \nLas siguientes máquinas necesitan mantenimiento preventivo" + signoAuxiliar + ".\n\nSaludos Cordiales");
    }
}

//Función para buscar según código de máquina.
function buscarPorCodigo(){
    let buscar="", encontrados = false, indexBusqueda = 0, arrayBusqueda = [];
    
    //Convertimos en un string, y lo pasamos a mayúsculas para que no haya errores en la búsqueda
    buscar = String(promptValido("Escriba el codigo de máquina que desea buscar")).toUpperCase();
    
    /*Busca en el array registro, la sección del código de máquina hasta encontrar coincidencias. Si existen coincidencias 
    se guardan  en el array auxiliar la posición en donde se encontró, y el contador de búsqueda se incrementa en uno.*/
    for(let i=0; i < registro.length; i++ ){
        if( buscar == registro[i].codigoMaquina.toUpperCase()){
            arrayBusqueda.push(i);
            encontrados = true;
        }
    }

    /*En esta sección de la función se usa el contador de búsqueda, si es cero significa que no existieron coincidencias
    de otra forma devuelve de uno en uno, mediante alertas, el objeto alojado en la posición donde se encontró, utilizando el 
    array auxiliar de búsqueda*/
    if (encontrados){
        alert("Se encontraron las siguientes coincidencias: \n");
        for(let i=0; i < arrayBusqueda.length;i++){
            indexBusqueda = arrayBusqueda[i];
            listarRegistro(registro, indexBusqueda);
        }          
    }else{
        alert("No se encontraron coincidencias.");
    }
}

//Función para buscar según nombre de operario.
function buscarPorNombre(){
    mayorProduccion();

    //La lógica de está función es similar a la de buscar por código.
    let buscar="", encontrados = false, indexBusqueda = 0, arrayBusqueda = [];

    buscar = String(promptValido("Escriba el nombre del operario que desea buscar"));
    for(let i=0; i < registro.length; i++ ){
        if( buscar == registro[i].operarioResponsable){
            arrayBusqueda.push(i);
            encontrados = true;
        }
    }

    if (encontrados){
        alert("Se encontraron las siguientes coincidencias: \n");
        for(let i=0; i < arrayBusqueda.length;i++){
            indexBusqueda = arrayBusqueda[i];
            listarRegistro(registro, indexBusqueda);
        }          
    }else{
        alert("No se encontraron coincidencias.");
    }
}

//Función para buscar según mayor número de producción.
function buscarPorMayorProduccion(){
    mayorProduccion();
    //Reutilizando la función de mayorP, podemos obtener la posición en donde está ubicado la máquina con mayor producción.
    alert("La máquina con mayor producción fue:\n");
    listarRegistro(registro,indexMayorProduccion);
}

//Función para buscar por el mayor número de paradas.
function buscarPorParadas(){
    mayorProduccion();
    let auxiliar = 0, indexBusqueda = 0;
    /*En el siguiente for escanea las propiedas del objetos parada técnica, si es mayor que auxiliar, auxiliar cambiará a ese nuevo valor
    y se guarda el indice de posición, de donde se encontró, para poder llamarlo despues en el alert.*/
    for(let i = 0; i < registro.length; i++){
        if(registro[i].paradasTecnicas > auxiliar){
            auxiliar = registro[i].paradasTecnicas;
            indexBusqueda = i;
        }
    }
    alert("La máquina con mayor número de paradas fue:\n")
    listarRegistro(registro, indexBusqueda);
}

//Función de menú de búsqueda
function menuBusqueda(){
    let opcionMenuBusqueda = "";
    do{
        opcionMenuBusqueda = prompt(`Indique de que forma quiere buscar:
    1_Buscar por Código de máquina.
    2_Buscar por operario.
    3_Buscar el de mayor producción.
    4_Buscar el que mayor paradas técnicas tuvo.
    
(V)olver al menú anterior`);
        opcionMenuBusqueda === null ? opcionMenuBusqueda = "v" : opcionMenuBusqueda = opcionMenuBusqueda.toString();
        switch(opcionMenuBusqueda){
            case "1":
                buscarPorCodigo();
                break;
            case "2":
                buscarPorNombre()
                break;
            case "3":
                buscarPorMayorProduccion()
                break;
            case "4":
                buscarPorParadas()
                break;
            case "v":
            case "V":
                break;
            default:
                alert("No es una opción valida");
                break;            
        }
    //Pasamos la variable a minúsculas para que no haya inconvenientes con la coincidencias
    }while(opcionMenuBusqueda.toLowerCase() != "v");
}

//Función para que no avance hasta que tenga un dato cargado 
function promptValido(mensaje) {
    let valor;
    do {
        valor = prompt(mensaje);
    } while (valor === "");
    return valor;
}

/////////////////////////////////////////////////////////////////
//                  Menú Principal Prompt                      //
/////////////////////////////////////////////////////////////////


let boton = document.getElementById("botonMenuPrompt");

//Modificación en la variable boton para evitar el mensajes de error.
boton !== null ? boton.addEventListener("click", respuestaClick) : null;

function respuestaClick(){
        do{
            //Llamamos la función menú
            menu();
            //Selección de opciones en el menú
            switch(opcionMenuPrincipal){
                case 1:
                    ingresarDatosPrompt();
                    break;
                case 2:
                    verificarDatosCargados(listarDatos);
                    break;
                case 3:
                    verificarDatosCargados(enviarInformeDiario);
                    break;
                case 4:
                    verificarDatosCargados(enviarInformeMantenimiento);
                    break;
                case 5:
                    verificarDatosCargados(menuBusqueda);
                    break;
            }
        }while (opcionMenuPrincipal != 6);
    }

/////////////////////////////////////////////////////////////////
//               Metodos para manipular el HTML                //
/////////////////////////////////////////////////////////////////

//Función que colocando un array con los id, devuelve los valores del objeto
function obtenerValores(ids) {
    let valores = {};
    for (let id of ids) {
    valores[id] = document.getElementById(id).value;
    }
    //Convertir los nombres de los operarios a tipo oración y los pase de esta manera al registro
    valores.operarioResponsable = valores.operarioResponsable.charAt(0).toUpperCase()+valores.operarioResponsable.slice(1).toLowerCase();

    while(valores.operarioResponsable.length < 10){
        valores.operarioResponsable += " ";
    }
    return valores;
}

//Función para sacar del objeto los valores y convertirlo en un array
function valoresArray(objeto){
    let array = [];
    for (let key in objeto){
        array.push(objeto[key])  
    }
    return array
}

//Función para obtener los valores del input
function ingresarDatosInput() {
    inicilizarRegistro();

    let maquina = obtenerValores(ids);
    registro.push(maquina);

    //Borrar los elementos del input
    for (let key in maquina) {
        let input = document.getElementById(key);
        input.value = "";
    }

    guardarRegistro();
}

//Función agregar filas en tabla de registro con el contenido del input
function agregarFila() {
    inicilizarRegistro();
    //Agregamos la tabla como variable a usar
    let tablaRegistro = document.getElementById('tablaRegistro');
    //Agregamos un for con el tamaño igual a la cantidad de objetos que tenemos que guardar
    for(let j = 0; j < registro.length; j++){
        //Insertamos una fila nueva en la tabla existente
        let fila = tablaRegistro.insertRow();
        // Array con el contenido para cada celda
        let contenidoCeldas = valoresArray(registro[j])
        // Iterar sobre el array y crear una celda para cada elemento
        for (let i = 0; i < contenidoCeldas.length; i++) {
            let celda = fila.insertCell();
            celda.innerHTML = contenidoCeldas[i];
        }
    }
}

function ordernarLista (propiedad) {
    inicilizarRegistro();
    for(let i = 0; i < registro.length -1; i++){
        for (let j = i + 1; j < registro.length; j++){
            if (registro[i][propiedad] > registro[j][propiedad]){
                let aux = registro[i];
                registro[i] = registro[j];
                registro[j] = aux;
            }
        }
    }
    guardarRegistro(); 
    agregarFila();
}

//Función para resetear valores del local storage
let reseteo = () => localStorage.clear();

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
document.addEventListener("DOMContentLoaded", function() {
    agregarFila();
});


//Botones para ordenar la lista
//Alfabeticamente por nombre de operario
let btnOrdenarOperarioResponsable = document.getElementById("btnOrdenarOperarioResponsable");
btnOrdenarOperarioResponsable !== null ? btnOrdenarOperarioResponsable.addEventListener("click", function(){
    ordernarLista('operarioResponsable');
    location.reload();
}) : null;

//Alfabeticamente por codigo de máquina
let btnOrdenarCodigo = document.getElementById("btnOrdenarCodigo");
btnOrdenarCodigo !== null ? btnOrdenarCodigo.addEventListener("click", function(){
    ordernarLista('codigoMaquina');
    location.reload();
}) : null;

//Numericamente por cantidad de producción
let btnOrdenarProduccion = document.getElementById("btnOrdenarProduccion");
btnOrdenarProduccion !== null ? btnOrdenarProduccion.addEventListener("click", function(){
    ordernarLista('cantidadProduccion');
    location.reload();
}) : null;

//Numericamente por cantidad de horas de producción
let btnOrdenarHsProduccion = document.getElementById("btnOrdenarHsProduccion");
btnOrdenarHsProduccion !== null ? btnOrdenarHsProduccion.addEventListener("click", function(){
    ordernarLista('hsProduccion');
    location.reload();
}) : null;

//Numericamente por orden cantidad de producción
let btnOrdenarParadas = document.getElementById("btnOrdenarParadas");
btnOrdenarParadas !== null ? btnOrdenarParadas.addEventListener("click", function(){
    ordernarLista('paradasTecnicas');
    location.reload();
}) : null;

let btnOrdenarFecha = document.getElementById("btnOrdenarFecha");
btnOrdenarFecha !== null ? btnOrdenarFecha.addEventListener("click", function(){
    ordernarLista('fechaTrabajo');
    location.reload();
}) : null;
