document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('cita-form');
    const tbody = document.getElementById('citas-tbody');

    let citaSeleccionada = null;

    // Cargar citas al iniciar la página
    cargarCitas();

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const mascotaId = parseInt(document.getElementById('mascota-id').value);
        const servicioId = parseInt(document.getElementById('servicio-id').value);
        const fecha = document.getElementById('fecha').value;
        const hora = document.getElementById('hora').value;
        const estado = document.getElementById('estado').value;

        const citaData = { mascota_id: mascotaId, servicio_id: servicioId, fecha, hora, estado };

        if (citaSeleccionada) {
            const actualizado = await put(`/citas/${citaSeleccionada}`, citaData);
            if (actualizado) alert('Cita actualizada con éxito');
        } else {
            const nuevaCita = await post('/citas', citaData);
            if (nuevaCita) alert('Cita registrada con éxito');
        }

        form.reset();
        citaSeleccionada = null;
        cargarCitas();
    });

    async function cargarCitas() {
        const citas = await get('/citas');
        tbody.innerHTML = '';
        if (citas) {
            citas.forEach((cita) => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${cita.id}</td>
                    <td>${cita.mascota_id}</td>
                    <td>${cita.servicio_id}</td>
                    <td>${cita.fecha}</td>
                    <td>${cita.hora}</td>
                    <td>${cita.estado}</td>
                    <td>
                        <button onclick="editarCita(${cita.id})">Editar</button>
                        <button onclick="eliminarCita(${cita.id})">Eliminar</button>
                    </td>
                `;
                tbody.appendChild(tr);
            });
        }
    }

    async function editarCita(id) {
        const cita = await get(`/citas/${id}`);
        if (cita) {
            citaSeleccionada = id;
            document.getElementById('mascota-id').value = cita.mascota_id;
            document.getElementById('servicio-id').value = cita.servicio_id;
            document.getElementById('fecha').value = cita.fecha;
            document.getElementById('hora').value = cita.hora;
            document.getElementById('estado').value = cita.estado;
        }
    }

    async function eliminarCita(id) {
        if (confirm('¿Estás seguro de eliminar esta cita?')) {
            const eliminado = await del(`/citas/${id}`);
            if (eliminado) {
                alert('Cita eliminada con éxito');
                cargarCitas();
            }
        }
    }
});
