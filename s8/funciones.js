function generarNumero() {
    return Math.floor(((Math.random() * 100) % 12) + 1)
}

function mostrarNumero() {
    let numero = generarNumero();
    const display = document.getElementById("display");
    display.innerHTML = `<h1> ${numero} </h1>`
}

function mostrarDados() {

    const display = document.getElementById("display");
    display.innerHTML = `<img src="https://cdn.pixabay.com/animation/2023/11/08/17/50/17-50-28-149_512.gif" alt= "dados"></img>`
    setTimeout(mostrarNumero, 2000);

}

document.getElementById("girar").addEventListener("click", mostrarDados);
console.log("Saludos desde javascript");
