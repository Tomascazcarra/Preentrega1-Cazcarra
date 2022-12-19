class Producto{
    constructor (nombre, precio, stock){

        this.nombre = nombre;
        this.precio = precio;
        this.stock = stock;
    }

    get_datos(){
        console.log ("<------------>");
        console.log ("nombre: ", this.nombre);
        console.log ("precio: ", this.precio);
        console.log ("stock ", this.stock);
        console.log ("");
    }

    get_stock(){

        if(this.stock <0){
            return false
        }
        else{
            return true
        }
    }

    update_stock(cantidad){
        cantidad = parseInt(cantidad);
        if (this.stock >= cantidad){
            this.stock = this.stock - cantidad;
        }
        else{
            console.log ("No tenemos suficiente stock");
        }
    }
}

function crear_producto(lista_productos){

    let nombre = prompt("Ingrese el nombre del producto");
    let precio = prompt("Ingrese el precio del producto");
    let stock = prompt("Ingrese el stock del producto");

    let producto = new Producto(nombre, precio, stock);

    lista_productos.push(producto);
    return lista_productos;
}

function mostrar_productos(lista_productos){

    for(let producto of lista_productos){
        producto.get_datos();
    }
}

//simulo compra aca se tiene que añadir las cuotas

function buscar_producto(producto){
    return producto.nombre == compra_usuario
}


function comprar_producto(lista_productos){
    let compra_usuario = prompt("Ingrese el nombre del producto que desea comprar");
    let resultado_find = lista_productos.find(producto => producto.nombre == compra_usuario);
    
    if(resultado_find != undefined){

        if(resultado_find.get_stock()){
            let unidades = prompt("¿Cuantas unidades quiere?");
            resultado_find.update_stock(unidades);
            console.log("Gracias por su compra");
        }
        else{
            console.log("No tenemos mas stock del producto solicitado");
        }
        resultado_find.get_datos();
    }
    else{
        console.log("Producto no encontrado")
    }
    return lista_productos;
}

let lista_productos = [];

let respuesta = -1;

console.log("Bienvenido al sistema!")

while(respuesta!=0){
    opciones = "Bienvenido! \n"
    opciones = opciones + "Elija una opcion \n"
    opciones = opciones + "1- Crear producto \n"
    opciones = opciones + "2- Comprar producto \n"
    opciones = opciones + "3- Mostrar producto \n"
    opciones = opciones + "0- Salir del sistema"
    respuesta = prompt(opciones);
    
    if(respuesta == 1){
        lista_productos = crear_producto(lista_productos);
    }
    else if(respuesta == 2){
        lista_productos = comprar_producto(lista_productos);
    }
    else if(respuesta == 3){
        mostrar_productos(lista_productos);
    }
    else if(respuesta == 0){
        console.log("Usted eligió salir del sistema. Hasta luego!")
    }
    else{
        console.log("Opción no valida!")
    }
}