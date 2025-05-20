document.addEventListener('DOMContentLoaded', () => {
  if (window.location.pathname.endsWith('terminar-registro.html')) {
    const messageDiv = document.getElementById('verify-message');
    const loader = document.getElementById('loader');

    // Mostrar loader mientras se verifica
    loader.style.display = 'block';
    messageDiv.textContent = 'Verificando...';
    messageDiv.classList.remove('success', 'error');

    auth.onAuthStateChanged(async user => {
      if (user) {
        await user.reload();
        loader.style.display = 'none'; // Ocultar loader cuando termina

        if (user.emailVerified) {
          messageDiv.textContent = 'Correo verificado. Ya puedes entrar.';
          messageDiv.classList.add('success');

          // Botón para ir a login manualmente
          const btn = document.createElement('button');
          btn.textContent = 'Ir a Login ahora';
          btn.style.marginTop = '15px';
          btn.onclick = () => window.location.href = 'login.html';
          messageDiv.appendChild(document.createElement('br'));
          messageDiv.appendChild(btn);

          // Redirigir automáticamente después de 3 segundos
          setTimeout(() => {
            window.location.href = 'login.html';
          }, 3000);

        } else {
          messageDiv.textContent = 'Por favor, verifica tu correo primero.';
          messageDiv.classList.add('error');
        }
      } else {
        loader.style.display = 'none'; // Ocultar loader si no hay usuario
        messageDiv.textContent = 'No estás autenticado.';
        messageDiv.classList.add('error');
      }
    });
  }
});