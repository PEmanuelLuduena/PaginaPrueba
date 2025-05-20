
(function(){
    emailjs.init("S-XdyH2yWbfy46oVk");
})();

document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault();

    emailjs.sendForm("service_acw0v47", "template_k6qbp33", this)
        .then(function() {
            document.getElementById("status-msg").innerText = "¡Mensaje enviado!";
        }, function(error) {
            document.getElementById("status-msg").innerText = "Error al enviar: " + JSON.stringify(error);
        });
});
