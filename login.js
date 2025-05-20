document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');

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
});