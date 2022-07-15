import { Tarea } from "../clases/tarea.js";

export { createButtonDelet, createButtonEdit, createArticle, createDiv };

function createButtonDelet(): HTMLElement {
    const element: HTMLElement = document.createElement('button');
    element.innerHTML = '<i class="fa-solid fa-trash-can" aria-hidden="true"></i>';
    element.classList.add('container-options-work__btn');
    element.classList.add('container-options-work__btn--delet');

    return element;
}

function createButtonEdit(): HTMLElement {
    const element: HTMLElement = document.createElement('button');
    element.innerHTML = '<i class="fa-solid fa-pen-to-square" aria-hidden="true"></i>';
    element.classList.add('container-options-work__btn');
    element.classList.add('container-options-work__btn--edit');

    return element;
}

function createArticle(counter: number, tarea: Tarea): HTMLElement {
    const element: HTMLElement = document.createElement('article');
    element.classList.add('container-work');
    element.innerHTML = `<p>${counter}. ${tarea.nombre}</p>
    <form method="post" class="hide container-form-edit-work" id="form-edit-work">
        <input type="text" placeholder="Nombre tarea" value="${tarea.nombre}" name="nombre-tarea" class="container-form-edit-work__input">

        <button class="container-form-edit-work__btn container-form-edit-work__btn--edit">
            <i class="fa-solid fa-check" aria-hidden="true"></i>
        </button>

        <button type="button" id="cancel-edit" class="container-form-edit-work__btn container-form-edit-work__btn--cancel">
            <i class="fa-solid fa-xmark" aria-hidden="true"></i>
        </button>
    </form>`;

    if (tarea.finalizada) {
        element.classList.add('container-work--complete');
    } else {
        element.classList.remove('container-work--complete');
    }

    return element;
}

function createDiv(tarea: Tarea): HTMLElement {
    const element: HTMLElement = document.createElement('div');
    element.classList.add('container-options-work');
    element.innerHTML = `<input type="checkbox" class="tarea-completada" ${(tarea.finalizada) ? "checked='true'" : ""}>`;

    return element;
}