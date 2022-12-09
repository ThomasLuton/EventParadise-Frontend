const toastSucces = document.getElementById('liveToast');
const toast = new bootstrap.Toast(toastSucces);

const form = document.querySelector("form")

form.addEventListener('submit', event => {
    event.preventDefault();
    toast.show();
    form.reset();
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
    element.addEventListener('invalid', event => {
        event.preventDefault();
        const first = form.querySelector(":invalid");
        if (element == first) {
            tooltips[i].enable();
            changeTooltip(tooltips[i], event);
            element.focus();
        }
        element.addEventListener('change', event => {
            event.preventDefault()
            if (element.validity.valid) {
                element.classList.remove("is-invalid")
                element.classList.add("is-valid");

            }
            else if (element.classList.contains('is-invalid') && element.validity.valid) {
                element.classList.remove("is-invalid")
                element.classList.add("is-valid");

            }
            else {
                element.classList.remove("is-valid");
                element.classList.add("is-invalid");
            }
        });
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