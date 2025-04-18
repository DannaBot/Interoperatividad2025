document.getElementById('registroForm').addEventListener('submit', function(event) {
    event.preventDefault();

    if (validarDatos()) {
        const nombre = document.getElementById('nombre').value;
        const numero = document.getElementById('numero').value;
        const correo = document.getElementById('correo').value;
        const nacimiento = document.getElementById('nacimiento').value;
        const usuario = document.getElementById('usuario').value;
        const contra = document.getElementById('contra').value;

        const nuevoUsuario = {nombre, numero, correo, nacimiento, usuario, contra};

        let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

        if (usuarios.some(u => u.usuario === usuario)) {
            alert('El nombre de usuario ya está en uso. Por favor, elija otro nombre de usuario.');
            return;
        }

        if (usuarios.some(u => u.correo === correo)) {
            alert('El correo ya está en uso. Por favor, elija otro correo.');
            return;
        }

        usuarios.push(nuevoUsuario);
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        alert('USUARIO REGISTRADO CON ÉXITO');

        document.getElementById('registroForm').reset();
        mostrarDatos();
    }
});

function validarDatos(nombre = '', numero = '', correo = '', nacimiento = '', usuario = '', contra = '') {
    if (nombre === '') nombre = document.getElementById('nombre').value;
    if (numero === '') numero = document.getElementById('numero').value;
    if (correo === '') correo = document.getElementById('correo').value;
    if (nacimiento === '') nacimiento = document.getElementById('nacimiento').value;
    if (usuario === '') usuario = document.getElementById('usuario').value;
    if (contra === '') contra = document.getElementById('contra').value;

    if (nombre.trim() === '') {
        alert('El campo de nombre no puede estar vacío.');
        return false;
    }
    if (numero.trim() === '') {
        alert('El campo de número no puede estar vacío.');
        return false;
    }
    if (correo.trim() === '' || !correo.includes('@')) {
        alert('Por favor, ingrese una dirección de correo válida que contenga @.');
        return false;
    }
    if (nacimiento.trim() === '') {
        alert('El campo de nacimiento no puede estar vacío.');
        return false;
    }
    if (usuario.trim() === '') {
        alert('El campo de nombre de usuario no puede estar vacío.');
        return false;
    }
    if (contra.trim() === '') {
        alert('El campo de contraseña no puede estar vacío.');
        return false;
    }

    return true;
}

function mostrarDatos() {
    const datos = localStorage.getItem('usuarios');
    const tabla = document.getElementById('tablaDatos');
    const tbody = document.getElementById('guardarDatos');
    tbody.innerHTML = '';

    if (datos) {
        const usuarios = JSON.parse(datos);
        if (usuarios.length > 0) {
            tabla.style.display = 'table'; // Muestra la tabla si hay datos
            usuarios.forEach((usuario, index) => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td><span id="nombre-${index}">${usuario.nombre}</span><input type="text" id="input-nombre-${index}" value="${usuario.nombre}" style="display:none;"></td>
                    <td><span id="numero-${index}">${usuario.numero}</span><input type="text" id="input-numero-${index}" value="${usuario.numero}" style="display:none;"></td>
                    <td><span id="correo-${index}">${usuario.correo}</span><input type="text" id="input-correo-${index}" value="${usuario.correo}" style="display:none;"></td>
                    <td><span id="nacimiento-${index}">${usuario.nacimiento}</span><input type="date" id="input-nacimiento-${index}" value="${usuario.nacimiento}" style="display:none;"></td>
                    <td><span id="usuario-${index}">${usuario.usuario}</span><input type="text" id="input-usuario-${index}" value="${usuario.usuario}" style="display:none;"></td>
                    <td><span id="contra-${index}">${usuario.contra}</span><input type="text" id="input-contra-${index}" value="${usuario.contra}" style="display:none;"></td>
                    <td>
                        <button class="editar-btn" onclick="editarUsuario(${index})">Editar</button>
                        <button class="guardar-btn" id="guardar-${index}" onclick="guardarUsuario(${index})" style="display:none;">Guardar</button>
                        <button class="eliminar-btn" onclick="eliminarUsuario(${index})">Eliminar</button>
                    </td>
                `;
                tbody.appendChild(tr);
            });
        } else {
            tabla.style.display = 'none'; // Oculta la tabla si no hay datos
        }
    } else {
        tabla.style.display = 'none'; // Oculta la tabla si no hay datos
    }
}

function editarUsuario(index) {
    document.getElementById(`nombre-${index}`).style.display = 'none';
    document.getElementById(`input-nombre-${index}`).style.display = 'inline';
    document.getElementById(`numero-${index}`).style.display = 'none';
    document.getElementById(`input-numero-${index}`).style.display = 'inline';
    document.getElementById(`correo-${index}`).style.display = 'none';
    document.getElementById(`input-correo-${index}`).style.display = 'inline';
    document.getElementById(`nacimiento-${index}`).style.display = 'none';
    document.getElementById(`input-nacimiento-${index}`).style.display = 'inline';
    document.getElementById(`usuario-${index}`).style.display = 'none';
    document.getElementById(`input-usuario-${index}`).style.display = 'inline';
    document.getElementById(`contra-${index}`).style.display = 'none';
    document.getElementById(`input-contra-${index}`).style.display = 'inline';
    document.getElementById(`guardar-${index}`).style.display = 'inline';

    // Agregar clase edit-mode
    document.getElementById(`input-nombre-${index}`).classList.add('edit-mode');
    document.getElementById(`input-numero-${index}`).classList.add('edit-mode');
    document.getElementById(`input-correo-${index}`).classList.add('edit-mode');
    document.getElementById(`input-nacimiento-${index}`).classList.add('edit-mode');
    document.getElementById(`input-usuario-${index}`).classList.add('edit-mode');
    document.getElementById(`input-contra-${index}`).classList.add('edit-mode');
}

function guardarUsuario(index) {
    const nombre = document.getElementById(`input-nombre-${index}`).value;
    const numero = document.getElementById(`input-numero-${index}`).value;
    const correo = document.getElementById(`input-correo-${index}`).value;
    const nacimiento = document.getElementById(`input-nacimiento-${index}`).value;
    const usuario = document.getElementById(`input-usuario-${index}`).value;
    const contra = document.getElementById(`input-contra-${index}`).value;

    if (validarDatos(nombre, numero, correo, nacimiento, usuario, contra)) {
        let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        if (usuarios.some((u, i) => (u.usuario === usuario || u.correo === correo) && i !== index)) {
            alert('El nombre de usuario o el correo ya está en uso. Por favor, elija otro nombre de usuario o correo.');
            return;
        }

        const usuarioActualizado = {nombre, numero, correo, nacimiento, usuario, contra};
        usuarios[index] = usuarioActualizado;
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        mostrarDatos();
        alert('USUARIO ACTUALIZADO CON ÉXITO');
    }
}

function eliminarUsuario(index) {
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    usuarios.splice(index, 1);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    mostrarDatos();
    alert('USUARIO ELIMINADO CON ÉXITO');
}

// Inicializa los datos de la tabla al cargar la página
mostrarDatos();
