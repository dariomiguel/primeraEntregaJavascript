// Declaración de variables
let opc, cont = 0, mayora, totala, datos = false;

//Menu Principal
function menu(){
    console.log(`\t*************************************
    *           MENU PRINCIPAL          *
    *************************************\n
    1_Ingresar datos de máquinas.
    2_Lista de datos.
    3_Enviar Correo de informe diario.
    4_Enviar Correo para máquinas que requieren mantenimiento.
    5_Buscar máquinas por nombre de operario.\t\t\t6_SALIR\n
`);
opc = prompt("Seleccione una opción:");
opc = parseInt(opc);
}

//Llamamos la función menu
menu();

//Selección de opciones en el menú
// do{
    if(opc == 1){
        datos = true;
        console.clear();
        console.log("El número es 1")
    };

//     console.clear();

//     switch(opc){
//         case 1:
//             console.log("El número es 1")
//             // system("cls");
//             // if(cont < 4){
//             //     ingDat(vReg, FILAS, &cont);
//             //     system("pause");
//             // }
//             // else{
//             //     printf("\n Lo sentimos a cargado el n%cmero m%cximo de datos.\n\n\n\n", 163, 160);
//             //     system("pause");
//             // }
//         break;

//         case 2:                            //Lista
//         console.log("El número es 2")    
//         // system("cls");
//             // if(datos){

//             //     lisDat(vReg, FILAS, &cont);
//             //     system("pause");
//             // }
//             // else{
//             //     printf("\nEl listado esta vac%co...\n\n\n\n", 161);
//             //     system("pause");
//             // }
//         break;

//         case 3:
//             console.log("El número es 3")
//             // system("cls");
//             // if(datos){
//             //     mayora = mayPro(vReg, FILAS, &cont);
//             //     totala = totPro(vReg, FILAS, &cont);
//             //     promed = (cont < FILAS) ? totala / cont  : totala / 4.0 ;

//             //     envCor(vReg, FILAS, &cont, fecha, mayora, promed, totala );
//             //     lisDat(vReg, FILAS, &cont);
//             //     system("pause");
//             // }
//             // else{
//             //     printf("\nEl listado esta vac%co...\n\n\n\n", 161);
//             //     system("pause");
//             // }
//         break;

//         case 4:
//             console.log("El número es 4")
//             // system("cls");
//             // if(datos){
//             //     envMan(vReg, FILAS, &cont);
//             //     system("pause");
//             // }
//             // else{
//             //     printf("\nEl listado esta vac%co...\n\n\n\n", 161);
//             //     system("pause");
//             // }
//         break;

//         case 5:
//             console.log("El número es 5")
//             // system("cls");
//             // if(datos){
//             //     busMaq(vReg, FILAS, &cont);
//             //     system("pause");
//             // }
//             // else{
//             //     printf("\nEl listado esta vac%co...\n\n\n\n", 161);
//             //     system("pause");
//             // }
//         break;

//         case 6:                    //SALIR
//         console.log("El número es 6")
//         //     system("cls");
//         //     printf("Gracias por utilizar el programa!!\nHasta luego!!\n\n\n\n");
//         //     return 0;
//         // break;

//         // default:
//         //     printf("Opci%cn no valida!!\n\n",162);
//         //     system("pause");
//     }
// }while(opc != 6);
