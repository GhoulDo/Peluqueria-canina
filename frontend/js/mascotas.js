document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('mascota-form');
    const tbody = document.getElementById('mascotas-tbody');
    const mascotaIdInput = document.getElementById('mascota-id'); // Campo oculto para ID de la mascota

    // Cargar mascotas al cargar la página
    cargarMascotas();

    // Evento de envío del formulario
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Obtener los valores del formulario
        const nombre = document.getElementById('nombre').value.trim();
        const tipo = document.getElementById('tipo').value.trim();
        const raza = document.getElementById('raza').value.trim();
        const edad = document.getElementById('edad').value;
        const clienteId = document.getElementById('cliente-id').value;

        // Validar datos
        if (!nombre || !tipo || !edad || !clienteId) {
            alert('Por favor, completa todos los campos antes de enviar.');
            return;
        }

        const mascota = { nombre, tipo, raza, edad, cliente_id: clienteId };

        // Si hay una mascota seleccionada (modo edición)
        if (mascotaIdInput.value) {
            await actualizarMascota(mascotaIdInput.value, mascota);
        } else {
            // Crear una nueva mascota
            await crearMascota(mascota);
        }

        // Limpiar formulario y recargar mascotas
        form.reset();
        mascotaIdInput.value = ''; // Resetear el ID
        cargarMascotas();
    });

    // Crear una mascota
    async function crearMascota(mascota) {
        try {
            const response = await fetch('http://localhost:3000/api/mascotas', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(mascota),
            });

            if (response.ok) {
                alert('Mascota creada con éxito');
            } else {
                const error = await response.json();
                alert(`Error al crear la mascota: ${error.mensaje || 'Error desconocido'}`);
            }
        } catch (error) {
            console.error('Error al crear la mascota:', error);
            alert('Error al crear la mascota');
        }
    }

    // Actualizar una mascota (sin enviar el campo id en el cuerpo)
    async function actualizarMascota(id, mascota) {
        try {
            const response = await fetch(`http://localhost:3000/api/mascotas/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(mascota),
            });

            if (response.ok) {
                alert('Mascota actualizada con éxito');
            } else {
                const error = await response.json();
                alert(`Error al actualizar la mascota: ${error.mensaje || 'Error desconocido'}`);
            }
        } catch (error) {
            console.error('Error al actualizar la mascota:', error);
            alert('Error al actualizar la mascota');
        }
    }

    // Cargar las mascotas desde el backend
    async function cargarMascotas() {
        try {
            const response = await fetch('http://localhost:3000/api/mascotas');
            if (response.ok) {
                const mascotas = await response.json();
                tbody.innerHTML = ''; // Limpiar la tabla
                mascotas.forEach(mascota => agregarMascotaATabla(mascota));
            } else {
                alert('Error al cargar la lista de mascotas');
            }
        } catch (error) {
            console.error('Error al cargar las mascotas:', error);
            alert('Error al cargar las mascotas');
        }
    }

    // Eliminar una mascota
    async function eliminarMascota(id) {
        if (confirm('¿Estás seguro de eliminar esta mascota?')) {
            try {
                const response = await fetch(`http://localhost:3000/api/mascotas/${id}`, { method: 'DELETE' });
                if (response.ok) {
                    alert('Mascota eliminada con éxito');
                    cargarMascotas();
                } else {
                    const error = await response.json();
                    alert(`Error al eliminar mascota: ${error.mensaje || 'Error desconocido'}`);
                }
            } catch (error) {
                console.error('Error al eliminar la mascota:', error);
                alert('Error al eliminar la mascota');
            }
        }
    }

    // Agregar una mascota a la tabla
    function agregarMascotaATabla(mascota) {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${mascota.id}</td>
            <td>${mascota.nombre}</td>
            <td>${mascota.tipo}</td>
            <td>${mascota.raza || ''}</td>
            <td>${mascota.edad}</td>
            <td>${mascota.cliente_id}</td>
            <td>
                <button class="editar-btn" data-id="${mascota.id}">Editar</button>
                <button class="eliminar-btn" data-id="${mascota.id}">Eliminar</button>
            </td>
        `;
        tbody.appendChild(tr);
    }

    // Event listener para botones de editar y eliminar
    tbody.addEventListener('click', (e) => {
        const target = e.target;
        const id = target.dataset.id;

        if (target.classList.contains('eliminar-btn')) {
            eliminarMascota(id);
        } else if (target.classList.contains('editar-btn')) {
            llenarFormularioEdicion(id);
        }
    });

    // Llenar el formulario con los datos de la mascota para editar
    async function llenarFormularioEdicion(id) {
        try {
            const response = await fetch(`http://localhost:3000/api/mascotas/${id}`);
            if (response.ok) {
                const mascota = await response.json();

                // Llenar el formulario
                document.getElementById('nombre').value = mascota.nombre;
                document.getElementById('tipo').value = mascota.tipo;
                document.getElementById('raza').value = mascota.raza;
                document.getElementById('edad').value = mascota.edad;
                document.getElementById('cliente-id').value = mascota.cliente_id;
                mascotaIdInput.value = mascota.id; // Guardar el ID en el campo oculto
            } else {
                alert('Error al obtener los datos de la mascota para editar');
            }
        } catch (error) {
            console.error('Error al obtener la mascota para editar:', error);
            alert('Error al obtener los datos de la mascota');
        }
    }
});