/////////////////////////////////////////////////////////////////
//                Declaración de variables                     //
/////////////////////////////////////////////////////////////////

//Variables Globales
let opcionMenuPrincipal=0, mayor=0, indexMayorProduccion=0, total=0, promedio=0, datos=false, fechaActualTexto="";

//Declaración del array vacío que nos servirá para listar los elementos como si fuera una base de datos.
let registro =  [], registroJson =  JSON.stringify(registro);


/////////////////////////////////////////////////////////////////
//                Declaración de funciones                     //
/////////////////////////////////////////////////////////////////

//Función para el Menú Principal que se muestra en pantalla.
function menu(){
    opcionMenuPrincipal = prompt(`MENU PRINCIPAL
    1_Ingresar datos de máquinas
    2_Lista de datos
    3_Enviar Correo de informe diario
    4_Enviar Correo para máquinas que requieren mantenimiento
    5_Buscar\n\n6_SALIR o presione el botón de "Cancelar"
Seleccione una opción:`);
//Se edito esta parte de la función para poder cerrar el menú, con el boton "Cancelar".  
    opcionMenuPrincipal === null ? opcionMenuPrincipal = 6 : opcionMenuPrincipal = parseInt(opcionMenuPrincipal);
}

//Función para agregar los datos de cada máquina
function ingresarDatos(){
    //Declaración del objeto vacío que contendrá las características que se quieren almacenar.
    
    registroJson = localStorage.getItem("registro");
    registro = JSON.parse(registroJson) || [];

    let maquina = {
        fechaTrabajo: promptValido("Ingrese la fecha en el siguiente formato 01/01/2000: \n"),
        operarioResponsable: promptValido ("Operario a cargo: \n"),
        codigoMaquina: promptValido("código de máquina: \n"),
        cantidadProduccion: promptValido("Ingrese cantidad de productos fabricados: \n"),
        hsProduccion: promptValido ("Ingrese cantidad de horas de producción: \n"),
        paradasTecnicas: promptValido ("Ingrese cantidad de paradas técnicas: \n")
    };

    registro.push(maquina);
    registroJson = JSON.stringify(registro);    
    localStorage.setItem("registro", registroJson)
    console.log(registro);

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
    for (let elemento of registro) {
        let indexArray=registro.indexOf(elemento);
        listarRegistro(registro,indexArray);
    }    
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
//                      Menú Principal                         //
/////////////////////////////////////////////////////////////////
let boton = document.getElementById("botonMenuPrompt");

//Modificación en la variable boton para evitar el mensajes de error.
if (boton !== null) {
    boton.addEventListener("click", respuestaClick);
}

function respuestaClick(){
        do{
            //Llamamos la función menú
            menu();
            //Selección de opciones en el menú
            switch(opcionMenuPrincipal){
                case 1:
                    datos = true;
                    ingresarDatos();
                    break;
                case 2:
                    if(datos){
                        listarDatos();
                    }else{
                        alert("No hay datos cargados todavía");
                    }
                    break;
                case 3:
                    if(datos){
                        enviarInformeDiario();
                    }else{
                        alert("No hay datos cargados todavía");
                    }
                    break;
                case 4:
                    if(datos){
                        enviarInformeMantenimiento();
                    }else{
                        alert("No hay datos cargados todavía");
                    }
                    break;
                case 5:
                    if(datos){
                        menuBusqueda();
                    }else{
                        alert("No hay datos cargados todavía");
                    }
                    break;
            }
        }while (opcionMenuPrincipal != 6);
    }

/////////////////////////////////////////////////////////////////
//               Funciones para modificar el HTML              //
/////////////////////////////////////////////////////////////////


function accionBtnAgregar() {

    registroJson = localStorage.getItem("registro");
    //llenamos el contenido de "registro" con lo que posee "registroJson"
    registro = JSON.parse(registroJson) || [];

    let maquina = {
        fechaTrabajo: document.getElementById("fechaTrabajo").value,
        operarioResponsable: document.getElementById("operarioResponsable").value,
        codigoMaquina: document.getElementById("codigoMaquina").value,
        cantidadProduccion: document.getElementById("cantidadProduccion").value,
        hsProduccion: document.getElementById("hsProduccion").value,
        paradasTecnicas: document.getElementById("paradasTecnicas").value
    };

    registro.push(maquina);

    registroJson = JSON.stringify(registro);

    localStorage.setItem("registro", registroJson)
    console.log(registro);
}

let reseteo = () => localStorage.clear();


//Eventos
let btnAgregarDatos = document.getElementById("btnAgregarDatos");
btnAgregarDatos.addEventListener("click", accionBtnAgregar);

let btnReset = document.getElementById("btnReset");
btnReset.addEventListener("click",reseteo )
