
//array
let BD = [];
//leer local storage
const tareasGuardadas = localStorage.getItem("BD");
if (tareasGuardadas) {
    BD = JSON.parse(tareasGuardadas);
}

//selecciona el cuerpo de tabla para cargar ahi los datos
const cuerpoTabla = document.querySelector(".table tbody");

function cargaT() {
    cuerpoTabla.innerHTML = ""// vacia la tabla
    for (let i = 0; i < BD.length; i++) {
        const t = BD[i];

        cuerpoTabla.innerHTML += `
                        <tr>
                            <td>${t.tarea}</td>
                            <td>${t.prioridad}</td>
                            <td>${t.fechaI}</td>
                            <td>${t.fechaF}</td>
                            <td>${t.estado}</td>
                            <td>
                                <button class="delete" data-index="${i}">🗑️</button>
                            </td>
                        </tr>
                        `;
    }
}
cargaT();

const form = document.getElementById("form");
form.reset();
//lee los datos que llegan del formulario
const tarea = document.getElementById("tarea");
const prioridad = document.getElementById("prioridad");
const fechaI = document.getElementById("fechaI");
const fechaF = document.getElementById("fechaF");
const estado = document.getElementById("estado");

form.addEventListener("submit", function (q) {
    q.preventDefault();
    if (
        tarea.value.trim() === "" ||
        prioridad.value.trim() === "" ||
        fechaI.value === "" ||
        fechaF.value === "" ||
        estado.value === ""
    ) {
        alert("Todos los campos son obligatorios");
        return; // se para el guardado
    }
    //objeto para hacerse manipulable en conjunto
    const tareaN = { tarea: tarea.value, prioridad: prioridad.value, fechaI: fechaI.value, fechaF: fechaF.value, estado: estado.value }
    //carga la tarea en el array
    BD.push(tareaN);
    localStorage.setItem("BD", JSON.stringify(BD));
    cargaT();
    form.reset();
});

cuerpoTabla.addEventListener("click", function (q) {
    if (q.target.classList.contains("delete")) {
        const index = q.target.dataset.index;
        BD.splice(index, 1); //elimina el array
        localStorage.setItem("BD", JSON.stringify(BD));
        cargaT();
    }
})