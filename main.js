if (goles == 821) {
    let goles = prompt("Ingrese los goles actuales de Messi")

    alert("Eres fan de Messi");
} else if ((goles <= 821 && goles >= 800)) {
    alert("Te gusta Messi pero no lo suficiente");
} else {
    alert("Que miras bobo")
}

for (let i = 5; i >= 0; i--) {
    let numero = prompt("Adivina la contraseña");
    if (numero === "messi se lo mereci y lo consiguio gano la 3") {
        alert("Adivinaste!");
        break;
    }
    alert(`intentalo de nuevo, Intentos restantes: ${i}`);
}
alert("No hay más intentos seras bloqueado por 3 dias")


function saludar(nombre) {
    if (nombre) {
        return `¡Hola, ${nombre}!`;
    } else {
        return '¡Hola, desconocido!';
    }
}

let nombreUsuario = "Franco";
let saludo = saludar(nombreUsuario);

console.log(saludo);
