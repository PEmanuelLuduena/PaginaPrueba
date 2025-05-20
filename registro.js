document.addEventListener('DOMContentLoaded', () => {
  const registerForm = document.getElementById('register-form');

  if(registerForm){
    registerForm.addEventListener('submit', async e => {
      e.preventDefault();
      const name = document.getElementById('register-name').value;
      const email = document.getElementById('register-email').value;
      const password = document.getElementById('register-password').value;
      const messageDiv = document.getElementById('register-message');

      try {
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        const user = userCredential.user;

        await user.updateProfile({displayName: name});
        await user.sendEmailVerification({
          url: 'https://pemanuelluduena.github.io/PaginaPrueba/terminar-registro.html'
        });

        messageDiv.textContent = 'Registrado. Revisa tu correo para verificar.';
        messageDiv.classList.remove('error');
        messageDiv.classList.add('success');
        registerForm.reset();
      } catch (error) {
        messageDiv.textContent = error.message;
        messageDiv.classList.remove('success');
        messageDiv.classList.add('error');
      }
    });
  }
});