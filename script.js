const toastSucces = document.getElementById('liveToast');
const toast = new bootstrap.Toast(toastSucces);

const form = document.querySelector("form")

form.addEventListener('submit', event => {
    event.preventDefault();
    toast.show();
    form.reset();
    const elements = form.querySelectorAll(".text-success");
    for (let i = 0; i < elements.length; i++) {
        const element = form[i];
        const parentElement = element.parentElement;
        let helpText = "";
        if (element.getAttribute("id") == "rate") {
            const tmp = parentElement.parentElement;
            helpText = tmp.querySelector(".form-text");
            label = tmp.querySelector("label");
        } else {
            helpText = parentElement.querySelector(".form-text");
            label = parentElement.querySelector("label");
        }
        element.classList.remove("is-valid");
        helpText.classList.remove("text-success");
    }
});

const options = {
    title: "default",
    trigger: "focus",
    placement: "top"
};
const tooltips = [];
for (let i = 0; i < form.length - 1; i++) {
    const tmp = new bootstrap.Tooltip(form[i], options);
    tmp.disable();
    tooltips.push(tmp);
}

for (let i = 0; i < form.length - 1; i++) {

    const element = form[i];
    const parentElement = element.parentElement;
    let helpText = "";
    if (element.getAttribute("id") == "rate") {
        const tmp = parentElement.parentElement;
        helpText = tmp.querySelector(".form-text");
        label = tmp.querySelector("label");
    } else {
        helpText = parentElement.querySelector(".form-text");
        label = parentElement.querySelector("label");
    }
    element.addEventListener('invalid', event => {
        event.preventDefault();
        const first = form.querySelector(":invalid");
        if (element == first) {
            element.focus();
        }
        tooltips[i].enable();
        changeTooltip(tooltips[i], event);
        element.classList.add("is-invalid");
        helpText.classList.add("text-danger");
        toast.hide();
    });
    element.addEventListener('change', event => {
        event.preventDefault()
        if (element.validity.valid) {
            element.classList.remove("is-invalid")
            element.classList.add("is-valid");
            helpText.classList.remove("text-danger")
            helpText.classList.add("text-success");
            tooltips[i].disable();
        }
        else if (element.classList.contains('is-invalid') && element.validity.valid) {
            element.classList.remove("is-invalid")
            element.classList.add("is-valid");
            helpText.classList.remove("text-danger")
            helpText.classList.add("text-success");
            tooltips[i].disable();
        }
        else {
            changeTooltip(tooltips[i], event);
            element.classList.remove("is-valid");
            element.classList.add("is-invalid");
            helpText.classList.add("text-danger")
            helpText.classList.remove("text-success");
            tooltips[i].enable();
        }
    });
}

function changeTooltip(tooltip, event) {
    if (event.target.validity.valueMissing) {
        tooltip._config.title = "Champ obligatoire";
    } else if (event.target.value < event.target.min && event.target.type === "number") {
        tooltip._config.title = "Doit être positif";
    } else if (event.target.type === "date") {
        tooltip._config.title = "Doit être égale ou supérieure à aujourd'hui";
    }
}