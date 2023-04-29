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

    maquina.cod = prompt("Codigo de máquina: \n");
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
        "    Producción:       " + registro[i].cantPro + "\n" + 
        "    Horas de Trabajo: " + registro[i].hsPro + "\n" + 
        "    Paradas Técnicas: " + registro[i].parTec + "\n" +
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

//Función para enviar correo
function envCor(){
    mayorP();
    totalP();
    alert("Asunto: Producción del día 29/04/2023\n"+
    "Informe: \n\n" + 
    "La máquina que más produjo es la " + registro[mayorIndex].cod + ". El total de producción del día es de " + total + " unidades, dando un promedio de " + promedio + " unidades por máquina.\n\nSaludos Cordiales");
}





/////////////////////////////////////////////////////////////////
//                           Main                              //
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
            datos = true;
            alert("El número elegido es el "+opc);
            break;
        case 5:
            datos = true;
            alert("El número elegido es el "+opc);
            break;
        // case 6:
        //     datos = true;
        //     alert("El número elegido es el "+opc);
        //     break;    
    }
}while (opc != 6);