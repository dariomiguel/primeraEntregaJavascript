/////////////////////////////////////////////////////////////////
//                Declaración de variables                     //
/////////////////////////////////////////////////////////////////

//Variables Globales
let opc, cont = 0, index=0, mayor=0, mayorIndex, total=0, promedio=0, datos = false;

//Declaración del array vacío que nos servirá para listar los elementos como si fuera una base de datos.
let registro =  [];

/////////////////////////////////////////////////////////////////
//                Declaración de funciones                     //
/////////////////////////////////////////////////////////////////

//Función para el Menú Principal que se muestra en pantalla.
function menu(){
    opc = prompt(`MENU PRINCIPAL
    1_Ingresar datos de máquinas.
    2_Lista de datos.
    3_Enviar Correo de informe diario.
    4_Enviar Correo para máquinas que requieren mantenimiento.
    5_Buscar máquinas por nombre de operario.\n6_SALIR\n
Seleccione una opción:`);
    opc = parseInt(opc);
}

//Función para agregar los datos de cada máquina
function ingDat(){
    //Declaración del objeto vacío que contendrá las características que se quieren almacenar.
    let maquina = {};

    maquina.cod = prompt("código de máquina: \n");
    maquina.cantPro = prompt("Ingrese cantidad de productos fabricados: \n");
    maquina.hsPro = prompt ("Ingrese cantidad de horas de producción: \n");
    maquina.parTec = prompt ("Ingrese cantidad de paradas técnicas: \n");
    maquina.opeCar = prompt ("Operario a cargo: \n");

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

//Función para buscar según nombre de operario
// function 
//Teniendo en cuenta que el código de máquina de producción no diferencia entre mayúsculas y minúsculas se convierte todo a mayúsculas para poder usar el buscador




//Función para que no inicie hasta que tenga un dato cargado 





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
                envCor();
            }else{
                alert("No hay datos cargados todavía");
            }
            break;
    }
}while (opc != 6);