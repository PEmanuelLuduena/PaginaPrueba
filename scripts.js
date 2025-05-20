document.addEventListener('DOMContentLoaded', () => {
  const registerForm = document.getElementById('register-form');
  const loginForm = document.getElementById('login-form');

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

  if(loginForm){
    loginForm.addEventListener('submit', async e => {
      e.preventDefault();
      const email = document.getElementById('login-email').value;
      const password = document.getElementById('login-password').value;
      const messageDiv = document.getElementById('login-message');

      try {
        const userCredential = await auth.signInWithEmailAndPassword(email, password);
        const user = userCredential.user;

        if(user.emailVerified){
          messageDiv.textContent = 'Bienvenido ' + user.displayName;
          messageDiv.classList.remove('error');
          messageDiv.classList.add('success');
          // Aquí redirigís o mostras contenido privado
        } else {
          messageDiv.textContent = 'Verifica tu correo antes de entrar.';
          messageDiv.classList.remove('success');
          messageDiv.classList.add('error');
          await auth.signOut();
        }
      } catch (error) {
        messageDiv.textContent = error.message;
        messageDiv.classList.remove('success');
        messageDiv.classList.add('error');
      }
    });
  }

  if(window.location.pathname.endsWith('terminar-registro.html')){
    auth.onAuthStateChanged(async user => {
      const messageDiv = document.getElementById('verify-message');
      if(user){
        await user.reload();
        if(user.emailVerified){
          messageDiv.textContent = 'Correo verificado. Ya puedes entrar.';
          messageDiv.classList.remove('error');
          messageDiv.classList.add('success');
        } else {
          messageDiv.textContent = 'Por favor, verifica tu correo primero.';
          messageDiv.classList.remove('success');
          messageDiv.classList.add('error');
        }
      } else {
        messageDiv.textContent = 'No estás autenticado.';
        messageDiv.classList.remove('success');
        messageDiv.classList.add('error');
      }
    });
  }
});