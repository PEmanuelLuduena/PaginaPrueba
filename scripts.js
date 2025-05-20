// Código para login, registro y verificación de email

document.addEventListener('DOMContentLoaded', () => {
  const registerForm = document.getElementById('register-form');
  const loginForm = document.getElementById('login-form');

  if(registerForm){
    registerForm.addEventListener('submit', e => {
      e.preventDefault();
      const name = document.getElementById('register-name').value;
      const email = document.getElementById('register-email').value;
      const password = document.getElementById('register-password').value;

      auth.createUserWithEmailAndPassword(email, password)
        .then(userCredential => {
          const user = userCredential.user;
          user.updateProfile({displayName: name});
          user.sendEmailVerification({
            url: 'https://PEmanuelLuduena.github.io/PaginaPrueba/terminar-registro.html'
          });
          document.getElementById('register-message').textContent = 'Registrado. Revisa tu correo para verificar.';
          registerForm.reset();
        })
        .catch(error => {
          document.getElementById('register-message').textContent = error.message;
        });
    });
  }

  if(loginForm){
    loginForm.addEventListener('submit', e => {
      e.preventDefault();
      const email = document.getElementById('login-email').value;
      const password = document.getElementById('login-password').value;

      auth.signInWithEmailAndPassword(email, password)
        .then(userCredential => {
          const user = userCredential.user;
          if(user.emailVerified){
            document.getElementById('login-message').textContent = 'Bienvenido ' + user.displayName;
            // Redirigir o mostrar contenido privado
          } else {
            document.getElementById('login-message').textContent = 'Verifica tu correo antes de entrar.';
            auth.signOut();
          }
        })
        .catch(error => {
          document.getElementById('login-message').textContent = error.message;
        });
    });
  }

  // Código para terminar-registro.html: verificar email
  if(window.location.pathname.endsWith('terminar-registro.html')){
    auth.onAuthStateChanged(user => {
      if(user){
        user.reload().then(() => {
          if(user.emailVerified){
            document.getElementById('verify-message').textContent = 'Correo verificado. Ya puedes entrar.';
          } else {
            document.getElementById('verify-message').textContent = 'Por favor, verifica tu correo primero.';
          }
        });
      } else {
        document.getElementById('verify-message').textContent = 'No estás autenticado.';
      }
    });
  }

});