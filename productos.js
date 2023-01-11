
function agrandar_imagen(id_producto){
    document.getElementById(id_producto).style.width="70px";
    document.getElementById(id_producto).style.height="25px";
}     

function achicar_imagen(id_producto){
    document.getElementById(id_producto).style.width="65px";
    document.getElementById(id_producto).style.height="20px";
}

function compra(){
    alert("Compraste exitosamente el producto");
}

function capturar_datos(){
    
    let lista_compras = JSON.parse(localStorage.getItem("lista_compras"));
    let producto_elegido = document.getElementById("producto_elegido").value;
    let cantidad_elegida = document.getElementById("cantidad_elegida").value;
    let json_producto = JSON.parse(localStorage.getItem(producto_elegido));
    
    if(cantidad_elegida > json_producto["stock"]){
        alert("Cantidad no disponible");
    }
    else{
        let compra_producto = {"nombre": json_producto["nombre"], "cantidad": cantidad_elegida, "img": "../" + json_producto["img"]};
        lista_compras.push(compra_producto);
        localStorage.setItem("lista_compras", JSON.stringify(lista_compras));
        json_producto["stock"] = json_producto["stock"]-cantidad_elegida;
        localStorage.setItem(producto_elegido, JSON.stringify(json_producto));
        alert("Gracias por su compra");
    }
}

function crear(){
   
    array_productos = ["producto1","producto2","producto3","producto4"];

    for(let i=0; i<array_productos.length; i++){
        item = JSON.parse(localStorage.getItem(array_productos[i]));
        var div = document.createElement("div");
        div.className = "div__centrado";

        var img = document.createElement("img");
        img.setAttribute("src", item['img']);
        img.setAttribute("alt", "No se puede cargar la imagen");

        var p1 = document.createElement("p");
        p1.innerText = item['nombre'];

        var p2 = document.createElement("p");
        p2.innerText = "$" + item['precio'] + " | Stock disponible: " + item['stock'];

        var div2 = document.createElement("div");
        var button = document.createElement("button");

        button.innerText = "Comprar";
        button.setAttribute("id", array_productos[i]);
        button.setAttribute("onmouseover", "agrandar_imagen(this.id)");
        button.setAttribute("onmouseout", "achicar_imagen(this.id)");
        button.setAttribute("onclick", "location.href='paginas/compra.html'");
        div2.appendChild(button);

        div.appendChild(img);
        div.appendChild(p1);
        div.appendChild(p2);
        div.appendChild(div2);

        document.querySelector(".principal__s").appendChild(div);
    }
}

function ver(){
    let lista_compras = localStorage.getItem("lista_compras");
    lista_compras = JSON.parse(lista_compras);

    for(let i=0; i<lista_compras.length; i++){
       
        item = lista_compras[i];
        var div = document.createElement("div");
        div.className = "carrito";

        var img = document.createElement("img");
        img.setAttribute("src", item['img']);
        img.setAttribute("alt", "No se puede cargar la imagen");

        var p1 = document.createElement("p");
        p1.innerText = item['nombre'];

        var p2 = document.createElement("p");
        p2.innerText = "Cantidad comprada: " + item["cantidad"]

        div.appendChild(img);
        div.appendChild(p1);
        div.appendChild(p2);

        document.querySelector(".principal__s").appendChild(div);
    }

}

if(localStorage.getItem("producto1") === null){
    let producto1 = {"nombre": "Producto 1", "precio": 10000, "stock": 5, "img": "multimedia/shop1.jpg"};
    producto1 = JSON.stringify(producto1);
    localStorage.setItem("producto1", producto1);
}  
if(localStorage.getItem("producto2") === null){
    let producto2 = {"nombre": "Producto 2", "precio": 25000, "stock": 2, "img": "multimedia/shop2.jpg"};
    producto2 = JSON.stringify(producto2);
    localStorage.setItem("producto2", producto2);
}
if(localStorage.getItem("producto3") === null){
    let producto3 = {"nombre": "Producto 3", "precio": 1500, "stock": 10, "img": "multimedia/shop3.jpg"};
    producto3 = JSON.stringify(producto3);
    localStorage.setItem("producto3", producto3);
}
if(localStorage.getItem("producto4") === null){
    let producto4 = {"nombre": "Producto 4", "precio": 7500, "stock": 3, "img": "multimedia/shop4.jpg"};
    producto4 = JSON.stringify(producto4);
    localStorage.setItem("producto4", producto4);
}
if(localStorage.getItem("lista_compras") === null){
    localStorage.setItem("lista_compras", JSON.stringify([]));
}



