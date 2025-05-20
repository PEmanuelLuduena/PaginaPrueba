document.addEventListener('DOMContentLoaded', () => {
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