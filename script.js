
(() => {
    //Création du toast
    const toastSucces = document.getElementById('liveToast');
    const toast = new bootstrap.Toast(toastSucces);
    //On récupère le formulaire 
    const forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
                //Si on a un soucis on appelle la fonction
                //check qui nous permet de voir si c'est un 
                //champ non rempli ou une autre erreur
                check();
            } else {
                //Si tout est valide on affiche le toast
                toast.show();
            }
            //Ajoute la classe bootstrap permettant d'afficher 
            //le contenu personnaliser
            form.classList.add('was-validated')

            event.preventDefault();
        }, false)
    })
})()

function check() {
    checkName();
    checkDate();
    checkTarif();
    checkDescription();
}
function checkName() {
    const input = document.getElementById("nom").value;
    if (input.length > 255) {
        document.getElementById("nom-feedback").innerHTML = "Nom trop long";
    }
    if (!input) {
        document.getElementById("nom-feedback").innerHTML = "Ce champ est obligatoire";
    }
}

function checkDate() {
    const input = document.getElementById("date").valueAsDate;
    const date = new Date(input);
    const today = new Date();
    if (input && date < today) {
        document.getElementById("date-feedback").innerHTML = "Doit être égale ou supérieur à aujourd'hui";
    }
}

function checkTarif() {
    let input = document.getElementById("tarif").value;
    input = parseInt(input, 10);
    if (input <= 0) {
        document.getElementById("tarif-feedback").innerHTML = "Doit être positif";
    }
}
function checkDescription() {
    const input = document.getElementById("description").value;
    if (input.length > 1000) {
        document.getElementById("description-feedback").innerHTML = "Description trop longue";
    }
    if (!input) {
        document.getElementById("description-feedback").innerHTML = "Ce champ est obligatoire";
    }
}