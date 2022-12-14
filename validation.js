const toastSucces = document.getElementById('liveToast');
const toast = bootstrap.Toast.getOrCreateInstance(toastSucces);

const form = document.querySelector("form")
const options = {
    title: "default"
};

form.addEventListener('submit', event => {
    event.preventDefault();
    const url = "http://localhost:8080/event";
    const method = "POST";
    const data = {
        name: "",
        date: "",
        locationId: "",
        themeId: "",
        rate: "",
        description: ""
    }
    const properties = Object.keys(data);
    properties.forEach(property => {
        const element = document.getElementById(`${property}`);
        data[property] = element.value;
    });
    send(url, method, data);
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

for (let i = 0; i < form.length - 1; i++) {

    const element = form[i];
    const helpText = getHelpText(element);
    element.addEventListener('invalid', event => {
        event.preventDefault();
        tooltip = bootstrap.Tooltip.getOrCreateInstance(form[i], options);
        const first = form.querySelector(":invalid");
        if (element == first) {
            element.focus();
        }
        changeTooltip(tooltip, event);
        setInvalidity(element, helpText, tooltip);
    });
    element.addEventListener('change', event => {
        event.preventDefault();
        tooltip = bootstrap.Tooltip.getOrCreateInstance(form[i], options);
        if (!element.validity.valid) {
            changeTooltip(tooltip, event);
            setInvalidity(element, helpText, tooltip);
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
        } else if (event.target.type === "date" && event.target.validity.rangeUnderflow) {
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
    tooltip.hide();
    tooltip.disable();
}

function setInvalidity(element, helpText, tooltip) {
    element.classList.remove("is-valid");
    element.classList.add("is-invalid");
    helpText.classList.add("text-danger")
    helpText.classList.remove("text-success");
    tooltip.enable();
}

async function send(url, method, data) {
    const options = {
        method: method
    };
    if (data != null) {
        options.body = JSON.stringify(data);
        options.headers = {
            'Content-Type': 'application/json'
        }
    }
    const response = await fetch(url, options);
    if (response.status == 400) {
        console.log(response.response)
    }

}