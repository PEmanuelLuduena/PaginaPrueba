(function() {
  emailjs.init("S-XdyH2yWbfy46oVk"); // tu clave pública
})();

document.getElementById('contact-form').addEventListener('submit', function(e) {
  e.preventDefault();

  emailjs.sendForm('service_acw0v47', 'template_k6qbp33', this)
    .then(function() {
      alert('¡Mensaje enviado con éxito!');
    }, function(error) {
      alert('Error al enviar mensaje: ' + JSON.stringify(error));
    });
});