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


for (let i = 0; i < form.length - 1; i++) {

    const element = form[i];
    const helpText = getHelpText(element);
    let tooltip = "";
    element.addEventListener('invalid', event => {
        event.preventDefault();
        tooltip = new bootstrap.Tooltip(form[i], options);
        const first = form.querySelector(":invalid");
        if (element == first) {
            element.focus();
        }
        setInvalidity(element, helpText, tooltip, event);
    });
    element.addEventListener('change', event => {
        event.preventDefault()
        if (!element.validity.valid) {
            console.log("invalid")
            if (tooltip == "") {
                tooltip = new bootstrap.Tooltip(form[i], options);
            }
            setInvalidity(element, helpText, tooltip, event);
        } else {
            setValidity(element, helpText, tooltip);
        }
    });
}

function changeTooltip(tooltip, event) {
    let content = "";
    if (!(event.target.validity.valueMissing)) {
        if (event.target.type === "number" && event.target.validity.rangeUnderflow) {
            content = "Doit être positif";
        }
        if (event.target.type === "date" && event.target.validity.rangeUnderflow) {
            content = "Doit être égale ou supérieure à aujourd'hui";
        }
    } else {
        content = "Champ obligatoire";
    }
    tooltip.setContent({ '.tooltip-inner': content });
}

function getHelpText(element) {
    const id = element.getAttribute("id");
    const helpId = `${id}Help`;
    return document.getElementById(helpId);
}

function setValidity(element, helpText, tooltip) {
    element.classList.remove("is-invalid");
    element.classList.add("is-valid");
    helpText.classList.remove("text-danger")
    helpText.classList.add("text-success");
    if (tooltip != "") {
        tooltip.hide();
        tooltip.disable();
    }
}

function setInvalidity(element, helpText, tooltip, event) {
    changeTooltip(tooltip, event);
    element.classList.remove("is-valid");
    element.classList.add("is-invalid");
    helpText.classList.add("text-danger")
    helpText.classList.remove("text-success");
    tooltip.enable();
}