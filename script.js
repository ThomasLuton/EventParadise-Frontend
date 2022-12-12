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
        const helpText = getHelpText(element);
        element.classList.remove("is-valid");
        helpText.classList.remove("text-success");
    }
});

const options = {
    title: "default"
};
const tooltips = [6];

for (let i = 0; i < form.length - 1; i++) {

    const element = form[i];
    const helpText = getHelpText(element);
    element.addEventListener('invalid', event => {
        event.preventDefault();
        const tooltip = new bootstrap.Tooltip(form[i], options);
        tooltips[i] = tooltip;
        const first = form.querySelector(":invalid");
        if (element == first) {
            element.focus();
        }
        setInvalidity(element, helpText, tooltips[i], event);
    });
    element.addEventListener('change', event => {
        event.preventDefault()
        if (element.validity.valid) {
            setValidity(element, helpText, tooltips[i]);
        } else {
            setInvalidity(element, helpText, tooltips[i], event);
        }
    });
}

function changeTooltip(tooltip, event) {
    if (event.target.validity.valueMissing) {
        tooltip.setContent({ '.tooltip-inner': "Champ obligatoire" })
    } else if (event.target.value < event.target.min && event.target.type === "number") {
        tooltip.setContent({ '.tooltip-inner': "Doit être positif" })
    } else if (event.target.type === "date") {
        tooltip.setContent({ '.tooltip-inner': "Doit être égale ou supérieure à aujourd'hui" });
    }
}

function getHelpText(element) {
    const parentElement = element.parentElement;
    if (element.getAttribute("id") == "rate") {
        const tmp = parentElement.parentElement;
        return tmp.querySelector(".form-text");
    } else {
        return parentElement.querySelector(".form-text");
    }
}

function setValidity(element, helpText, tooltip) {
    element.classList.remove("is-invalid");
    element.classList.add("is-valid");
    helpText.classList.remove("text-danger")
    helpText.classList.add("text-success");
    tooltip.disable();
}

function setInvalidity(element, helpText, tooltip, event) {
    changeTooltip(tooltip, event);
    element.classList.remove("is-valid");
    element.classList.add("is-invalid");
    helpText.classList.add("text-danger")
    helpText.classList.remove("text-success");
    tooltip.enable();
}