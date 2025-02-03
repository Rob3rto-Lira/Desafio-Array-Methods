const input = document.getElementById('input');
const agregar = document.getElementById('agregar');
const total = document.getElementById('total');
const realizada = document.getElementById('realizada');
const id = document.getElementById('ID');
const tareasContainer = document.getElementById('tareas-container');
const tarea = document.getElementById('tarea');
let checkbox = document.getElementsByClassName('checkbox');
let eliminar = document.getElementsByClassName('eliminar');

const tareas = [ { ID: Date.now(), Tarea: 'Hacer mercado', Completada: false } ];


function render() {

    let html = '';

    let htmlId = '';

    renderId = () => { // renderiza las IDs en el DOM
        for (element of tareas) {
            htmlId += `<div>${element.ID}</div>`
        }
    }
    renderId();
    id.innerHTML = htmlId;

    renderTask = () => { // Renderiza las tareas en el DOM
        for (element of tareas) {
            html += `<div data-id ="${element.ID}"> ${element.Tarea}
          <input class="checkbox" type="checkbox" ${element.Completada ? 'checked' : 'unchecked'}/>
          <button class="borrar">X</button>
        </div>`
        }
    }
    renderTask();
    tarea.innerHTML = html;
    // Reinicia el string
    resetInput= () => input.value = '';
    resetInput();
}

document.addEventListener('DOMContentLoaded', render());

agregar.addEventListener('click', () => {
    if (input.value.trim() == '') {
        return;
    } else {
        tareas.push({ID: Date.now(), Tarea: input.value, Completada: false });
        render();
    }
});

tareasContainer.addEventListener('click', (e) => {
    // Borrar tareas
    let target = e.target
    if (target.classList.contains('borrar')) {
        const tareaDiv = target.closest('div[data-id]');
        const tareaId = parseInt(tareaDiv.dataset.id);
        const index = tareas.findIndex(task => task.ID === tareaId);
        tareas.splice(index, 1);
        render();
        // Marca la tarea como realizada
    } else if (target.classList.contains('checkbox')) {
        const tareaDiv = target.closest('div[data-id]');
        const tareaId = parseInt(tareaDiv.dataset.id);
        const index = tareas.findIndex(task => task.ID === tareaId);
        tareas[index].Completada = target.checked;
    }
})

