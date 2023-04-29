/////////////////////////////////////////////////////////////////
//                Declaración de variables                     //
/////////////////////////////////////////////////////////////////

//Variables Globales
let opc, cont = 0, index=0, mayora, totala, datos = false;

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

    //Se utilizá el metodo JSON.stringify para convertir a texto los elementos y se puedan mostrar en pantalla
    // alert(JSON.stringify(registro));
    
    for (let i = 0; i < registro.length; i++) {
        alert(
        "          Máquina\n" + registro[i].cod + ":" + "\n" +
        "Producción:       " + registro[i].cantPro + "\n" + 
        "Horas de Trabajo: " + registro[i].hsPro + "\n" + 
        "Paradas Técnicas: " + registro[i].parTec + "\n" +
        "Operario a cargo: " + registro[i].opeCar);
    }
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
            datos = true;
            alert("El número elegido es el "+opc);
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