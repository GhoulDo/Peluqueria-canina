document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('cita-form');
    const tbody = document.getElementById('citas-tbody');
    const citaIdInput = document.getElementById('cita-id'); // Campo oculto para ID de la cita

    // Cargar citas al cargar la página
    cargarCitas();

    // Evento de envío del formulario
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Obtener los valores del formulario
        const mascotaId = parseInt(document.getElementById('mascota-id').value);
        const servicioId = parseInt(document.getElementById('servicio-id').value);
        const fecha = document.getElementById('fecha').value;
        const hora = document.getElementById('hora').value;
        const estado = document.getElementById('estado').value;

        // Validar datos
        if (!mascotaId || !servicioId || !fecha || !hora || !estado) {
            alert('Por favor, completa todos los campos antes de enviar.');
            return;
        }

        const cita = { mascota_id: mascotaId, servicio_id: servicioId, fecha, hora, estado };

        // Si hay una cita seleccionada (modo edición)
        if (citaIdInput.value) {
            await actualizarCita(citaIdInput.value, cita);
        } else {
            // Crear una nueva cita
            await crearCita(cita);
        }

        // Limpiar formulario y recargar citas
        form.reset();
        citaIdInput.value = ''; // Resetear el ID
        cargarCitas();
    });

    // Crear una cita
    async function crearCita(cita) {
        try {
            const response = await fetch('http://localhost:3000/api/citas', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(cita),
            });

            if (response.ok) {
                alert('Cita creada con éxito');
            } else {
                const error = await response.json();
                alert(`Error al crear la cita: ${error.mensaje || 'Error desconocido'}`);
            }
        } catch (error) {
            console.error('Error al crear la cita:', error);
            alert('Error al crear la cita');
        }
    }

    // Actualizar una cita (sin enviar el campo id en el cuerpo)
    async function actualizarCita(id, cita) {
        try {
            const response = await fetch(`http://localhost:3000/api/citas/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(cita),
            });

            if (response.ok) {
                alert('Cita actualizada con éxito');
            } else {
                const error = await response.json();
                alert(`Error al actualizar la cita: ${error.mensaje || 'Error desconocido'}`);
            }
        } catch (error) {
            console.error('Error al actualizar la cita:', error);
            alert('Error al actualizar la cita');
        }
    }

    // Cargar las citas desde el backend
    async function cargarCitas() {
        try {
            const response = await fetch('http://localhost:3000/api/citas');
            if (response.ok) {
                const citas = await response.json();
                tbody.innerHTML = ''; // Limpiar la tabla
                citas.forEach(cita => agregarCitaATabla(cita));
            } else {
                alert('Error al cargar la lista de citas');
            }
        } catch (error) {
            console.error('Error al cargar las citas:', error);
            alert('Error al cargar las citas');
        }
    }

    // Eliminar una cita
    async function eliminarCita(id) {
        if (confirm('¿Estás seguro de eliminar esta cita?')) {
            try {
                const response = await fetch(`http://localhost:3000/api/citas/${id}`, { method: 'DELETE' });
                if (response.ok) {
                    alert('Cita eliminada con éxito');
                    cargarCitas();
                } else {
                    const error = await response.json();
                    alert(`Error al eliminar cita: ${error.mensaje || 'Error desconocido'}`);
                }
            } catch (error) {
                console.error('Error al eliminar la cita:', error);
                alert('Error al eliminar la cita');
            }
        }
    }

    // Agregar una cita a la tabla
    function agregarCitaATabla(cita) {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${cita.id}</td>
            <td>${cita.mascota_id}</td>
            <td>${cita.servicio_id}</td>
            <td>${cita.fecha}</td>
            <td>${cita.hora}</td>
            <td>${cita.estado}</td>
            <td>
                <button class="editar-btn" data-id="${cita.id}">Editar</button>
                <button class="eliminar-btn" data-id="${cita.id}">Eliminar</button>
            </td>
        `;
        tbody.appendChild(tr);
    }

    // Event listener para botones de editar y eliminar
    tbody.addEventListener('click', (e) => {
        const target = e.target;
        const id = target.dataset.id;

        if (target.classList.contains('eliminar-btn')) {
            eliminarCita(id);
        } else if (target.classList.contains('editar-btn')) {
            llenarFormularioEdicion(id);
        }
    });

    // Llenar el formulario con los datos de la cita para editar
    async function llenarFormularioEdicion(id) {
        try {
            const response = await fetch(`http://localhost:3000/api/citas/${id}`);
            if (response.ok) {
                const cita = await response.json();

                // Llenar el formulario
                document.getElementById('mascota-id').value = cita.mascota_id;
                document.getElementById('servicio-id').value = cita.servicio_id;
                document.getElementById('fecha').value = cita.fecha;
                document.getElementById('hora').value = cita.hora;
                document.getElementById('estado').value = cita.estado;
                citaIdInput.value = cita.id; // Guardar el ID en el campo oculto
            } else {
                alert('Error al obtener los datos de la cita para editar');
            }
        } catch (error) {
            console.error('Error al obtener la cita para editar:', error);
            alert('Error al obtener los datos de la cita');
        }
    }
});