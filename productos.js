function agrandar_imagen(id_producto){
    document.getElementById(id_producto).style.width="70px";
    document.getElementById(id_producto).style.height="25px";
}     

function achicar_imagen(id_producto){
    document.getElementById(id_producto).style.width="65px";
    document.getElementById(id_producto).style.height="20px";
}

function capturar_datos(){
    let lista_compras = JSON.parse(localStorage.getItem("lista_compras"));
    let producto_elegido = document.getElementById("producto_elegido").value;
    let cantidad_elegida = document.getElementById("cantidad_elegida").value;
    let productos = localStorage.getItem("productos");
    productos = JSON.parse(productos);
    let json_producto = productos.filter(function(producto){
        return producto.nombre === producto_elegido
    });
    
    json_producto = json_producto[0];

    if(cantidad_elegida > json_producto["stock"]){
        alert("Cantidad no disponible");
    }
    else{
        let compra_producto = {"nombre": json_producto["nombre"], "cantidad": cantidad_elegida, "img": json_producto["img"]};
        lista_compras.push(compra_producto);
        localStorage.setItem("lista_compras", JSON.stringify(lista_compras));
        json_producto["stock"] = json_producto["stock"]-parseInt(cantidad_elegida);
        for(let i=0; i<productos.length; i++){
            if (productos[i]["nombre"] === json_producto["nombre"]){
                productos[i] = json_producto;
            }
        }
        localStorage.setItem("productos", JSON.stringify(productos));
    }
}

function opciones(){
    let productos = localStorage.getItem("productos");
    productos = JSON.parse(productos);
    let nombres_productos = [];
    var producto_elegido =  document.getElementById("producto_elegido");
    var producto_url = get_producto_url();
    producto_url2 = "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet";

    for(let i=0; i<productos.length; i++){
        let nombre_producto = productos[i]["nombre"];
        nombres_productos.push(nombre_producto);
        var option = document.createElement("option");
        option.setAttribute("value", productos[i]["nombre"]);
        option.innerText = productos[i]["nombre"];
        
        if(producto_url == productos[i]["nombre"]){
            option.setAttribute("selected", "selected");
        }
        producto_elegido.appendChild(option);
    }
}

function crear(){
   let productos = localStorage.getItem("productos");
    productos = JSON.parse(productos);

    for(let i=0; i<productos.length; i++){
        item = productos[i];
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
        button.setAttribute("id", productos[i]["id"]);
        button.setAttribute("onmouseover", "agrandar_imagen(this.id)");
        button.setAttribute("onmouseout", "achicar_imagen(this.id)");
        button.setAttribute("onclick", 'location.href="paginas/compra.html?producto_elegido=' + encodeURI(productos[i]['nombre'].replace("&", "%26")) +'"');
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

function devolver_stocks(){
    var producto_elegido = $("#producto_elegido").val();
    var productos = localStorage.getItem("productos");
    productos = JSON.parse(productos);
    let json_producto = productos.filter(function(producto){
        return producto.nombre === producto_elegido
    });
    json_producto = json_producto[0];
    return json_producto["stock"];
}

function get_producto_url(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    var producto_url = urlParams.get("producto_elegido");

    if(producto_url !== null){
        return decodeURI(producto_url.replace("%26", "&"));
    }
    else{
        return "";
    }
}

if(localStorage.getItem("lista_compras") === null){
    localStorage.setItem("lista_compras", JSON.stringify([]));
}

let getProducts = async () =>{
    let productos;
    await fetch("https://fakestoreapi.com/products?limit=5")
            .then(async(res)=>res.json())
            .then(async(data)=>{
                productos = data;
            })
    if(localStorage.getItem("productos") === null){
        let productos_nuevos = [];
        for (var i = 0; i < productos.length; i++){
            let producto = {"id": i, "nombre": productos[i]["title"], "precio": productos[i]["price"], "stock": Math.floor(Math.random()*10), "img": productos[i]["image"]};
            productos_nuevos.push(producto);
        }
        localStorage.setItem("productos", JSON.stringify(productos_nuevos));
    }
}

getProducts();




