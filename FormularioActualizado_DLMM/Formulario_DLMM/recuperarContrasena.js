document.getElementById('recuperarForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const correo = document.getElementById('correo').value;

    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    const usuarioValido = usuarios.find(u => u.correo === correo);

    if (usuarioValido) {
        alert(`Usuario encontrado: ${correo}.`); 
        // Muestra el formulario para ingresar la nueva contraseña
        document.getElementById('recuperarForm').style.display = 'none';
        document.getElementById('nuevaContrasenaForm').style.display = 'block';
        document.getElementById('nuevaContrasena').dataset.index = usuarios.indexOf(usuarioValido);
    } else {
        alert('No se encontró ninguna cuenta asociada con ese correo.');
    }
});

document.getElementById('nuevaContrasenaForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const nuevaContrasena = document.getElementById('nuevaContrasena').value;
    const index = document.getElementById('nuevaContrasena').dataset.index;

    if (nuevaContrasena.trim() === '') {
        alert('El campo de nueva contraseña no puede estar vacío.');
        return;
    }

    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    usuarios[index].contra = nuevaContrasena;
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    alert('Contraseña actualizada correctamente.');
    window.location.href = 'formularioInicio.html';
});
