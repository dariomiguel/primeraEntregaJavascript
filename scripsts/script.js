/////////////////////////////////////////////////////////////////
//                Declaración de variables                     //
/////////////////////////////////////////////////////////////////

//Variables Globales
let opcionMenuPrincipal=0, mayor=0, mayorIndex=0, total=0, promedio=0, datos=false;

//Declaración del array vacío que nos servirá para listar los elementos como si fuera una base de datos.
let registro =  [];

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
    5_Buscar\n\n6_SALIR
Seleccione una opción:`);
    opcionMenuPrincipal = parseInt(opcionMenuPrincipal);
}

//Función para agregar los datos de cada máquina
function ingresarDatos(){
    //Declaración del objeto vacío que contendrá las características que se quieren almacenar.
    let maquina = {};

    maquina.codigoMaquina = promptValido("código de máquina: \n");
    maquina.cantidadProduccion = promptValido("Ingrese cantidad de productos fabricados: \n");
    maquina.hsProduccion = promptValido ("Ingrese cantidad de horas de producción: \n");
    maquina.paradasTecnicas = promptValido ("Ingrese cantidad de paradas técnicas: \n");
    maquina.operarioResponsable = promptValido ("Operario a cargo: \n");

    registro.push(maquina);
}

//Función para listar los datos cargados
function listarDatos(){
    for (let i = 0; i < registro.length; i++) {
        alert(
        "Máquina " + registro[i].codigoMaquina + ":" + "\n" +
        "    Producción:           " + registro[i].cantidadProduccion + "\n" + 
        "    Horas de Trabajo: " + registro[i].hsProduccion + "\n" + 
        "    Paradas Técnicas:  " + registro[i].paradasTecnicas + "\n" +
        "    Operario a cargo: " + registro[i].operarioResponsable);
    }
}

//Función que calcular la mayor producción
function mayorProduccion(){
    for(let i = 0; i < registro.length; i++){
        if(registro[i].cantidadProduccion > mayor){
            mayor = registro[i].cantidadProduccion;
            mayorIndex = i;
        }
    }
    
}

//Función que cambia el valor para la producción total y el promedio
function produccionTotal(){
    total = 0;  //Se resetea el valor de total, para que siempre se use el calculado, de otra forma cada vez que se llama a la función se agregará al total anterior.
    for(let i = 0; i < registro.length; i++){
        registro[i].cantidadProduccion = parseInt(registro[i].cantidadProduccion);
        total += registro[i].cantidadProduccion; //Suma cada una de las produccion que realizó cada maquina y lo agrega en la variable total.
    }
    promedio = total / registro.length; // Se calcula el promedio total
}

//Función para enviar correo de informe de producción diario
function enviarInformeDiario(){
    // Se llama a las funciones mayor producción y producción total para tener los valores de los mismos (total, promedio y Mayor producción)
    mayorProduccion();
    produccionTotal();
    //Se crea un objeto llamado fecha actual para poder extraer los dias, mes y años del día que se ejecute
    const fechaActual = new Date();  
    const dia = fechaActual.getDate();  // Se utiliza la instancia para el día 
    const mes = fechaActual.getMonth() + 1; // Se utiliza la instancia para los meses, los meses empiezan en 0, así que se suma 1
    const anio = fechaActual.getFullYear(); // Se utiliza la instancia para los años

    alert("Asunto: Producción del día" + dia + "/" + mes + "/" + anio + "\n" +
    "Informe: \n\n" + 
    "La máquina que más produjo es la " + registro[mayorIndex].codigoMaquina + ". El total de producción del día es de " + total + " unidades, dando un promedio de " + promedio + " unidades por máquina.\n\nSaludos Cordiales");
}

//Función para enviar correo de informe de producción diario.
function enviarInformeMantenimiento(){

    /* Se crea una variable signoAuxiliar donde se ubicarán los valores para los strings y se crea un array de mantenimiento vacío que 
    contendrá unicamente las máquinas que necesitan mantenimiento, para que en el texto queden corectamente las comas. las 
    variables oracionAuxiliarA y oracionAuxiliarB, corresponden a las variables para que el mensaje esté en plural o no.*/  
    let signoAuxiliar = "", oracionAuxiliarA="Máquina", oracionAuxiliarB="No se presentan máquinas para", arrayMantenimiento =[];
    const fechaActual = new Date();  
    const dia = fechaActual.getDate(); 
    const mes = fechaActual.getMonth() + 1;
    const anio = fechaActual.getFullYear();

    //Se crea el array, rellenandolo con las máquinas que necesitan paradas técnicas
        for(i = 0, largo = registro.length; i < largo; i++){
        if(registro[i].paradasTecnicas > 3){
            arrayMantenimiento.push(registro[i].codigoMaquina);
        } 
    }

    /*Creamos un string con cada una de las máquinas que necesitan mantenimiento (Las que poseen más de 3 paradas técnicas).
    y se concatenan a la variable signoAuxiliar.
    Primero corroboramos que la cantidad de máquinas para mantenimiento es distinto de cero para poder colocar correctamente
    el texto en el mensaje*/
    if(arrayMantenimiento.length != 0){
        signoAuxiliar = ":";
        for(let i = 0; i < arrayMantenimiento.length; i++){
            if(i != (arrayMantenimiento.length - 1)){                
                signoAuxiliar += " " + String(arrayMantenimiento[i]) + ",";
            // Colocamos de esta manera para que el último código de máquina no lleve coma. 
            }else{
                signoAuxiliar += " " + String(arrayMantenimiento[i]); 
            }
        }
    } 

    //Si la función tiene uno o más máquinas, cambiará el texto del mensaje.
    switch(arrayMantenimiento.length){
        case 0:
            break;
        case 1:
            oracionAuxiliarB = "La siguiente máquina necesita";
            break;
        default:
            oracionAuxiliarA = "Máquinas";
            oracionAuxiliarB = "La siguientes máquinas necesitan";
            break
    }
    
    alert("Asunto: " + oracionAuxiliarA + " para mantenimiento preventivo          " + dia + "/" + mes + "/" + anio + "\n\n" +
    "Informe: \n" + oracionAuxiliarB  + " mantenimiento preventivo" + signoAuxiliar + ".\n\nSaludos Cordiales");
}

//Función para buscar según código de máquina.
function buscarPorCodigo(){
    let buscar="", cantidadEncontrados = 0, arrayBusqueda = [];
    
    //Convertimos en un string, y lo pasasmos a mayúsculas para que no haya errores en la búsqueda
    buscar = String(promptValido("Escriba el codigo de máquina que desea buscar")).toUpperCase();
    
    /*Busca en el array registro, la sección del código de máquina hasta encontrar coincidencias. Si existen coincidencias 
    se guardan  en el array auxiliar la posición en donde se encontró, y el contador de búsqueda se incrementa en uno.*/
    for(let i=0; i < registro.length; i++ ){
        if( buscar == registro[i].codigoMaquina.toUpperCase()){
            arrayBusqueda.push(i);
            cantidadEncontrados++;
        }
    }

    /*En esta sección de la función se usa el contador de búsqueda, si es cero significa que no existieron coincidencias
    de otra forma devuelve de uno en uno, mediante alertas, el objeto alojado en la posición donde se encontró, utilizando el 
    array auxiliar de búsqueda*/
    if (cantidadEncontrados == 0){
        alert("No se encontraron coincidencias.");
    }else{
        alert("Se encontraron las siguientes coincidencias: \n");
        for(let i=0; i < arrayBusqueda.length;i++){
            alert(
            "Máquina " + registro[arrayBusqueda[i]].codigoMaquina + ":" + "\n" +
            "    Producción:           " + registro[arrayBusqueda[i]].cantidadProduccion + "\n" + 
            "    Horas de Trabajo: " + registro[arrayBusqueda[i]].hsProduccion + "\n" + 
            "    Paradas Técnicas:  " + registro[arrayBusqueda[i]].paradasTecnicas + "\n" +
            "    Operario a cargo: " + registro[arrayBusqueda[i]].operarioResponsable);
        }          
    }
}

//Función para buscar según nombre de operario.
function buscarPorNombre(){
    mayorProduccion();

    //La lógica de está función es similar a la de buscar por código.
    let buscar="", cantidadEncontrados = 0, arrayBusqueda = [];

    buscar = String(promptValido("Escriba el nombre del operario que desea buscar"));
    for(let i=0; i < registro.length; i++ ){
        if( buscar == registro[i].operarioResponsable){
            arrayBusqueda.push(i);
            cantidadEncontrados++;
        }
    }
    if (cantidadEncontrados == 0){
        alert("No se encontraron coincidencias.");
    }else{
        alert("Se encontraron las siguientes coincidencias: \n");
        for(let i=0; i < arrayBusqueda.length;i++){
            alert(
            "Máquina " + registro[arrayBusqueda[i]].codigoMaquina + ":" + "\n" +
            "    Producción:           " + registro[arrayBusqueda[i]].cantidadProduccion + "\n" + 
            "    Horas de Trabajo: " + registro[arrayBusqueda[i]].hsProduccion + "\n" + 
            "    Paradas Técnicas:  " + registro[arrayBusqueda[i]].paradasTecnicas + "\n" +
            "    Operario a cargo: " + registro[arrayBusqueda[i]].operarioResponsable);
        }          
    }
}

//Función para buscar según mayor número de producción.
function buscarPorMayorProduccion(){
    mayorProduccion();
    //Reutilizando la función de mayorP, podemos obtener la posición en donde está ubicado la máquina con mayor producción.
    alert("La máquina con mayor producción fue:\n" +
        "Máquina " + registro[mayorIndex].codigoMaquina + ":" + "\n" +
        "    Producción:           " + registro[mayorIndex].cantidadProduccion + "\n" + 
        "    Horas de Trabajo:  " + registro[mayorIndex].hsProduccion + "\n" + 
        "    Paradas Técnicas:  " + registro[mayorIndex].paradasTecnicas + "\n" +
        "    Operario a cargo:  " + registro[mayorIndex].operarioResponsable);
}

//Función para buscar por el mayor número de paradas.
function buscarPorParadas(){
    mayorProduccion();
    let auxiliar = 0, indexAuxiliar = 0;
    /*En el siguiente for escanea las propiedas del objetos parada técnica, si es mayor que auxiliar, auxiliar cambiará a ese nuevo valor
    y se guarda el indice de posición, de donde se encontró, para poder llamarlo despues en el alert.*/
    for(let i = 0; i < registro.length; i++){
        if(registro[i].paradasTecnicas > auxiliar){
            auxiliar = registro[i].paradasTecnicas;
            indexAuxiliar = i;
        }
    }
    alert("La máquina con mayor número de paradas fue:\n" +
        "Máquina   " + registro[indexAuxiliar].codigoMaquina + ":" + "\n" +
        "    Producción:           " + registro[indexAuxiliar].cantidadProduccion + "\n" + 
        "    Horas de Trabajo:  " + registro[indexAuxiliar].hsProduccion + "\n" + 
        "    Paradas Técnicas:  " + registro[indexAuxiliar].paradasTecnicas + "\n" +
        "    Operario a cargo:  " + registro[indexAuxiliar].operarioResponsable);
}

//Función de búsqueda
function busqueda(){
    let opcionMenuBusqueda = "";
    do{
        opcionMenuBusqueda = prompt(`Indique de que forma quiere buscar:
    1_Buscar por Código de máquina.
    2_Buscar por operario.
    3_Buscar el de mayor producción.
    4_Buscar el que mayor paradas técnicas tuvo.
    
(V)olver al menú anterior`);
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
                busqueda();
            }else{
                alert("No hay datos cargados todavía");
            }
            break;
    }
}while (opcionMenuPrincipal != 6);