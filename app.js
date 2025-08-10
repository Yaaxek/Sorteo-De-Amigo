let amigos = [];

function barajearArreglo(arreglo) {
    for (let i = arreglo.length - 1; i > 0; i--){
        let j = Math.floor(Math.random() * (i + 1));
        [arreglo[i], arreglo[j]] = [arreglo[j], arreglo[i]];
    }
    return arreglo;
}

function crearTarjetaHTML(nombre, amigoSecreto) {
    return `
        <div class="tarjeta" onclick="revelarAmigo(this, '${amigoSecreto}')">
            <h3>${nombre}</h3>
            <p>Haz clic para ver tu amigo secreto</p>
        </div>
    `;
}

function agregarAmigo(){
    let nombre = document.getElementById('amigo').value;
    if(amigos.includes(nombre) || nombre==''){
        alert(amigos.includes(nombre) ? 'Ya existe un amigo con ese nombre' : 'Debe ingresar un nombre');
        caja();
        return;
     }

    amigos.push(nombre);
    document.getElementById('listaAmigos').innerHTML = amigos.map(nombre=>`<li>${nombre}</li>`).join('');
    caja();
}

function limpiarLista(){
    if(amigos.length === 0){
        alert('No hay amigos para eliminar');
        return; 
    }
    amigos.pop();
    document.getElementById('listaAmigos').innerHTML = amigos.map(nombre=>`<li>${nombre}</li>`).join('');
}

function reiniciar(){
    amigos = [];
    ['listaAmigos', 'resultado'].forEach(id => document.getElementById(id).innerHTML = '');
    ['sortearAmigo', 'limpiar', 'añadir', 'amigo'].forEach(id => document.getElementById(id).disabled = false);
    caja();
}

function sortearAmigo(){
    if(amigos.length < 3){
        alert('Debe ingresar al menos 3 amigos');
        return;
    }
    
    let amigosAzar = barajearArreglo([...amigos]);
    
    let tarjetasHTML = '';
    for (let i = 0; i < amigosAzar.length; i++){
        let siguienteLista = (i + 1) % amigosAzar.length;
        tarjetasHTML += crearTarjetaHTML(amigosAzar[i], amigosAzar[siguienteLista]);
    }
    
    document.getElementById('listaAmigos').innerHTML = '';
    document.getElementById('resultado').innerHTML = tarjetasHTML;
    ['sortearAmigo', 'limpiar', 'añadir', 'amigo'].forEach(id => document.getElementById(id).disabled = true);
}

function revelarAmigo(tarjeta, amigoSecreto){
    let contenidoOriginal = tarjeta.innerHTML;
    tarjeta.innerHTML = `<h3>Tu amigo secreto es: </h3> <h2>${amigoSecreto}</h2>`;
    tarjeta.onclick = null;
    tarjeta.classList.add('revelada');

    setTimeout(function(){
        tarjeta.innerHTML = contenidoOriginal;
        tarjeta.classList.remove('revelada');
        tarjeta.onclick = function(){
            revelarAmigo(tarjeta, amigoSecreto);
        };
    }, 2000);
}

function caja(){
    document.getElementById('amigo').value = '';
}

document.addEventListener('DOMContentLoaded', function() {
    const inputAmigo = document.getElementById('amigo');
    
    inputAmigo.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault(); 
            agregarAmigo();
        }
    });
});
