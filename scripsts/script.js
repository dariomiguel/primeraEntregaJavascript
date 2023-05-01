/////////////////////////////////////////////////////////////////
//                Declaración de variables                     //
/////////////////////////////////////////////////////////////////

//Variables Globales
let opc, mayor=0, mayorIndex, total=0, promedio=0, datos = false;

//Declaración del array vacío que nos servirá para listar los elementos como si fuera una base de datos.
let registro =  [];

/////////////////////////////////////////////////////////////////
//                Declaración de funciones                     //
/////////////////////////////////////////////////////////////////

//Función para el Menú Principal que se muestra en pantalla.
function menu(){
    opc = prompt(`MENU PRINCIPAL
    1_Ingresar datos de máquinas
    2_Lista de datos
    3_Enviar Correo de informe diario
    4_Enviar Correo para máquinas que requieren mantenimiento
    5_Buscar\n\n6_SALIR
Seleccione una opción:`);
    opc = parseInt(opc);
}

//Función para agregar los datos de cada máquina
function ingDat(){
    //Declaración del objeto vacío que contendrá las características que se quieren almacenar.
    let maquina = {};

    maquina.cod = promptValido("código de máquina: \n");
    maquina.cantPro = promptValido("Ingrese cantidad de productos fabricados: \n");
    maquina.hsPro = promptValido ("Ingrese cantidad de horas de producción: \n");
    maquina.parTec = promptValido ("Ingrese cantidad de paradas técnicas: \n");
    maquina.opeCar = promptValido ("Operario a cargo: \n");

    registro.push(maquina);
}

//Función para listar los datos cargados
function lisDat(){
    for (let i = 0; i < registro.length; i++) {
        alert(
        "Máquina " + registro[i].cod + ":" + "\n" +
        "    Producción:           " + registro[i].cantPro + "\n" + 
        "    Horas de Trabajo: " + registro[i].hsPro + "\n" + 
        "    Paradas Técnicas:  " + registro[i].parTec + "\n" +
        "    Operario a cargo: " + registro[i].opeCar);
    }
}

//Función que muestra la mayor producción
function mayorP(){
    for(let i = 0; i < registro.length; i++){
        if(registro[i].cantPro > mayor){
            mayor = registro[i].cantPro;
            mayorIndex = i;
        }
    }
    
}

//Función que cambia el valor para la producción total y el promedio
function totalP(){
    total = 0;
    for(let i = 0; i < registro.length; i++){
        registro[i].cantPro =parseInt(registro[i].cantPro);
        total += registro[i].cantPro;
    }
    promedio = total / registro.length;
}

//Función para enviar correo de informe de producción diario
function envCor(){
    mayorP();
    totalP();
    //Se crea un objeto llamado fecha actual para poder extraer los dias, mes y años del día que se ejecute
    const fechaActual = new Date();  
    const dia = fechaActual.getDate();  // Se utiliza la instancia para el día 
    const mes = fechaActual.getMonth() + 1; // Se utiliza la instancia para los meses, los meses empiezan en 0, así que se suma 1
    const anio = fechaActual.getFullYear(); // Se utiliza la instancia para los años

    alert("Asunto: Producción del día" + dia + "/" + mes + "/" + anio + "\n" +
    "Informe: \n\n" + 
    "La máquina que más produjo es la " + registro[mayorIndex].cod + ". El total de producción del día es de " + total + " unidades, dando un promedio de " + promedio + " unidades por máquina.\n\nSaludos Cordiales");
}

//Función para enviar correo de informe de producción diario.
function envMan(){
    /* Se crea una variable auxiliar donde se ubicarán los valores para los strings y se crea un array auxiliar vacío que 
    contendrá unicamente las máquinas que necesitan mantenimiento, para que en el texto queden corectamente las comas. las 
    variables auxOraA y auxOraB, corresponden a las variables para que el mensaje esté en plural o no.*/  
    let aux = "", auxOraA="Máquina",auxOraB="No se presentan máquinas para", auxMan =[];
    const fechaActual = new Date();  
    const dia = fechaActual.getDate(); 
    const mes = fechaActual.getMonth() + 1;
    const anio = fechaActual.getFullYear();
    //Se crea el array, rellenandolo con las máquinas que necesitan paradas técnicas
        for(i = 0, largo = registro.length; i < largo; i++){
        if(registro[i].parTec > 3){
            auxMan.push(registro[i].cod);
        } 
    }
    /*Creamos un string con cada una de las máquinas que necesitan mantenimiento (Las que poseen más de 3 paradas técnicas).
    y se concatenan a la variable auxiliar.
    Primero corroboramos que la cantidad de máquinas para mantenimiento es distinto de cero para poder colocar correctamente
    el texto en el mensaje*/
    if(auxMan.length != 0){
        aux = ":";
        for(let i = 0; i < auxMan.length; i++){
            if(i != (auxMan.length - 1)){                
                aux += " " + String(auxMan[i]) + ",";
            // Colocamos de esta manera para que el último código de máquina no lleve coma. 
            }else{
                aux += " " + String(auxMan[i]); 
            }
        }
    } 
    //Si la función tiene uno o más máquinas, cambiará el texto del mensaje.
    switch(auxMan.length){
        case 0:
            break;
        case 1:
            auxOraB = "La siguiente máquina necesita";
            break;
        default:
            auxOraA = "Máquinas";
            auxOraB = "La siguientes máquinas necesitan";
            break
    }
    
    alert("Asunto: " + auxOraA + " para mantenimiento preventivo          " + dia + "/" + mes + "/" + anio + "\n\n" +
    "Informe: \n" + auxOraB  + " mantenimiento preventivo" + aux + ".\n\nSaludos Cordiales");
}

//Función para buscar según código de máquina.
function busCod(){
    let buscar="", contBusquedad = 0, auxBusquedad = [];
    //Convertimos en un string, y lo pasasmos a mayúsculas para que no haya errores en la busquedad
    buscar = String(promptValido("Escriba el codigo de máquina que desea buscar")).toUpperCase();
    /*Busca en el array registro, la sección del código de máquina hasta encontrar coincidencias. Si existen coincidencias 
    se guardan  en el array auxiliar la posición en donde se encontró, y el contador de busquedad se incrementa en uno.*/
    for(let i=0; i < registro.length; i++ ){
        if( buscar == registro[i].cod.toUpperCase()){
            auxBusquedad.push(i);
            contBusquedad++;
        }
    }
    /*En esta sección de la función se usa el contador de busquedad, si es cero significa que no existieron coincidencias
    de otra forma devuelve de uno en uno, mediante alertas, el objeto alojado en la posición donde se encontró, utilizando el 
    array auxiliar de busquedad*/
    if (contBusquedad == 0){
        alert("No se encontraron coincidencias.");
    }else{
        alert("Se encontraron las siguientes coincidencias: \n");
        for(let i=0; i < auxBusquedad.length;i++){
            alert(
            "Máquina " + registro[auxBusquedad[i]].cod + ":" + "\n" +
            "    Producción:           " + registro[auxBusquedad[i]].cantPro + "\n" + 
            "    Horas de Trabajo: " + registro[auxBusquedad[i]].hsPro + "\n" + 
            "    Paradas Técnicas:  " + registro[auxBusquedad[i]].parTec + "\n" +
            "    Operario a cargo: " + registro[auxBusquedad[i]].opeCar);
        }          
    }
}

//Función para buscar según nombre de operario.
function busNom(){
    mayorP();
    //La lógica de está función es similar a la de buscar por código.
    let buscar="", contBusquedad = 0, auxBusquedad = [];
    buscar = String(promptValido("Escriba el nombre del operario que desea buscar"));
    for(let i=0; i < registro.length; i++ ){
        if( buscar == registro[i].opeCar){
            auxBusquedad.push(i);
            contBusquedad++;
        }
    }
    if (contBusquedad == 0){
        alert("No se encontraron coincidencias.");
    }else{
        alert("Se encontraron las siguientes coincidencias: \n");
        for(let i=0; i < auxBusquedad.length;i++){
            alert(
            "Máquina " + registro[auxBusquedad[ind]].cod + ":" + "\n" +
            "    Producción:           " + registro[auxBusquedad[i]].cantPro + "\n" + 
            "    Horas de Trabajo: " + registro[auxBusquedad[i]].hsPro + "\n" + 
            "    Paradas Técnicas:  " + registro[auxBusquedad[i]].parTec + "\n" +
            "    Operario a cargo: " + registro[auxBusquedad[i]].opeCar);
        }          
    }
}

//Función para buscar según mayor número de producción.
function busMayP(){
    mayorP();
    //Reutilizando la función de mayorP, podemos obtener la posición en donde está ubicado la máquina con mayor producción.
    alert("La máquina con mayor producción fue:\n" +
        "Máquina " + registro[mayorIndex].cod + ":" + "\n" +
        "    Producción:           " + registro[mayorIndex].cantPro + "\n" + 
        "    Horas de Trabajo:  " + registro[mayorIndex].hsPro + "\n" + 
        "    Paradas Técnicas:  " + registro[mayorIndex].parTec + "\n" +
        "    Operario a cargo:  " + registro[mayorIndex].opeCar);
}

//Función para buscar por el mayor número de paradas.
function busPar(){
    mayorP();
    let aux = 0, auxInd = 0;
    /*En el siguiente for escanea las propiedas del objetos parada técnica, si es mayor que aux, aux cambiará a ese nuevo valor
    y se guarda el indice de posición, de donde se encontró, para poder llamarlo despues en el alert.*/
    for(let i = 0; i < registro.length; i++){
        if(registro[i].parTec > aux){
            aux = registro[i].parTec;
            auxInd = i;
        }
    }
    alert("La máquina con mayor número de paradas fue:\n" +
        "Máquina   " + registro[auxInd].cod + ":" + "\n" +
        "    Producción:           " + registro[auxInd].cantPro + "\n" + 
        "    Horas de Trabajo:  " + registro[auxInd].hsPro + "\n" + 
        "    Paradas Técnicas:  " + registro[auxInd].parTec + "\n" +
        "    Operario a cargo:  " + registro[auxInd].opeCar);
}

//Función Busquedad
function busquedad(){
    debugger;
    let indexBuscar = "";
    do{
        indexBuscar = prompt(`Indique de que forma quiere buscar:
    1_Buscar por Código de máquina.
    2_Buscar por operario.
    3_Buscar el de mayor producción.
    4_Buscar el que mayor paradas técnicas tuvo.
    
(V)olver al menú anterior`);
        switch(indexBuscar){
            case "1":
                busCod();
                break;
            case "2":
                busNom()
                break;
            case "3":
                busMayP()
                break;
            case "4":
                busPar()
                break;
            case "v":
            case "V":
                break;
            default:
                alert("No es una opción valida");
                break;            
        }
    //Pasamos la variable a minúsculas para que no haya inconvenientes con la coincidencias
    }while(indexBuscar.toLowerCase() != "v");
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
    switch(opc){
        case 1:
            datos = true;
            ingDat();
            break;
        case 2:
            if(datos){
                lisDat();
            }else{
                alert("No hay datos cargados todavía");
            }
            break;
        case 3:
            if(datos){
                envCor();
            }else{
                alert("No hay datos cargados todavía");
            }
            break;
        case 4:
            if(datos){
                envMan();
            }else{
                alert("No hay datos cargados todavía");
            }
            break;
        case 5:
            if(datos){
                busquedad();
            }else{
                alert("No hay datos cargados todavía");
            }
            break;
    }
}while (opc != 6);