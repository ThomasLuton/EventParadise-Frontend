const toastSucces = document.getElementById('liveToast');
const toast = new bootstrap.Toast(toastSucces);




const forms = document.querySelectorAll('.needs-validation')
document.getElementById("save").addEventListener('click', event => {
    forms[0].classList.add("was-validated");
    if (forms[0].checkValidity()) {
        toast.show();
        event.preventDefault();
    }
})


Array.from(forms[0]).forEach(input => {
    const id = input.getAttribute("id");
    const type = input.getAttribute("type");

    const element = document.getElementById(`${id}`);
    if (type == "text") {
        element.addEventListener('invalid', event => {
            if (element.value == "") {
                document.getElementById(`${id}-feedback`).innerHTML = "Ce champ est obligatoire";
            } else {
                document.getElementById(`${id}-feedback`).innerHTML = "Trop de caractères";
            }
            event.preventDefault();
        });
    }
    if (id == "rate") {
        element.addEventListener('invalid', event => {
            if (element.value == "") {
                document.getElementById(`${id}-feedback`).innerHTML = "Ce champ est obligatoire";
            } else {
                document.getElementById(`${id}-feedback`).innerHTML = "Doit être positif";
            }
            event.preventDefault();
        });
    }
    if (type == "date") {
        element.addEventListener('invalid', event => {
            if (element.valueAsDate == undefined) {
                document.getElementById(`${id}-feedback`).innerHTML = "Ce champ est obligatoire";
            } else {
                document.getElementById(`${id}-feedback`).innerHTML = "Doit être égale ou supérieur à aujourd'hui";
            }
            event.preventDefault();
        });
    }
    if (type == "select") {
        element.addEventListener('invalid', event => {
            document.getElementById(`${id}-feedback`).innerHTML = "Ce champ est obligatoire";
            event.preventDefault();
        });
    }
});


