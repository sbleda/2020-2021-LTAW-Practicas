//-- Ejemplo de arrays literales

//-- Crear una lista (array) de 4 elementos
const a = [1,3,5,7];

//-- Mostrar el elemento 2
console.log("Elemento 2: " + a[2]);

//-- Mostrar el elemento 0
console.log("Elemento 2: " + a[0]);

//-- Recorrer todos los elementos
for (i in a) {
    console.log(`Posicion del array ${i} = ${a[i]}`);
}

//-- Imprimir el numero total de elementos
console.log("Cantidad de elementos: " + a.length);