function calcular_valor( valor , cuotas ){

    valor = parseFloat(valor);
    let total = 0;

    if(valor > 0 && cuotas == 3){
        total = valor + (valor * 0.1);
        return total
    }
    else if(valor > 0 && cuotas == 6){
        total = valor + (valor * 0.2);
        return total
    }
    else if(valor > 0 && cuotas == 12){
        total = valor + (valor * 0.3);
        return total
    }
    else{
        return -1 
    }
}

let valor = "";

console.log("Calcular total");

while( valor != "OK" ){

    valor = prompt("Ingrese el valor del producto o ingrese OK para finalizar el calculo");
    if(valor == "OK"){
        break
    }

    let cuotas = prompt("Ingrese la cantidad de cuotas");
    let final = calcular_valor(valor , cuotas);
    if(final == -1){
        console.log("Uno de los datos ingresados no es valido");
    }
    else{
        console.log("El valor del producto que ingresaste es de: " , valor);
        console.log("La cantidad de cuotas que elegiste es de: " , cuotas);
        console.log("El valor final de tu producto es de " , final);
        console.log("Volver a calcular");
    }
}