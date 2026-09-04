// 1. VARIABLES Y TIPOS DE DATOS (Fundamentos)
const nombreCurso = "Desarrollo Web Moderno"; // Constante (no cambia)
let totalEstudiantes = 15;                  // Variable numérica
let cursoActivo = true;                     // Boolean
// 2. OBJETOS Y ARREGLOS
const profesor = {
    nombre: "Samuel",
    rol: "Instructor"
};
const estudiantes = ["Carlos", "Mariana", "Alejandro", "Valeria"];

// 3. ESTRUCTURA DE CONTROL (Condicional)
if (cursoActivo) {
    console.log(`El curso ${nombreCurso} dirigido por ${profesor.nombre} está activo.`);
} else {
    console.log("El curso está pausado.");
}

// 4. BUCLES (Ciclos)
// Recorriendo el arreglo de estudiantes para agregarlos luego al DOM
for (let i = 0; i < estudiantes.length; i++) {
    console.log(`Estudiante registrado: ${estudiantes[i]}`);
}

// 5. FUNCIONES Y MÉTODOS NATIVOS
function calcularTotalConExtra(extra) {
    return totalEstudiantes + extra;
}

// 6. MANIPULACIÓN DEL DOM
// Seleccionando elementos del HTML
const tituloEl = document.getElementById("titulo");
const mensajeEl = document.querySelector("#mensaje");
const botonEl = document.getElementById("miBoton");
const listaEl = document.getElementById("listaEstudiantes");

// Modificando contenido y estilos con el DOM
tituloEl.textContent = `${nombreCurso} - Día 2`;
mensajeEl.style.color = "green";
mensajeEl.textContent = `Todo listo. Total de asistentes: ${calcularTotalConExtra(2)}`;

// Renderizando el arreglo en la lista HTML usando un bucle y métodode DOM
estudiantes.forEach(estudiante => {
    const li = document.createElement("li");
    li.textContent = estudiante.toUpperCase(); // Método nativo de strings
    listaEl.appendChild(li);
});

// 7. EVENTOS (Escuchar interacciones del usuario)
botonEl.addEventListener("click", function() {
    alert("¡Botón presionado! Revisa la consola para ver la depuración.");
    
    // Bloque try...catch para manejo de errores simulado
    try {
        console.log("Intentando ejecutar acción interactiva...");
        // Simulando un error controlado
        let resultado = 10 / 2;
        console.log("Resultado seguro:", resultado);
    } catch (error) {
        console.error("Ocurrió un error:", error);
    }
});