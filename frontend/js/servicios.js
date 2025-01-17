document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('servicio-form');
    const tbody = document.getElementById('servicios-tbody');

    let servicioSeleccionado = null;

    // Cargar servicios al iniciar la página
    cargarServicios();

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const nombre = document.getElementById('nombre').value;
        const duracion = parseInt(document.getElementById('duracion').value);
        const precio = parseFloat(document.getElementById('precio').value);

        const servicioData = { nombre, duracion, precio };

        if (servicioSeleccionado) {
            const actualizado = await put(`/servicios/${servicioSeleccionado}`, servicioData);
            if (actualizado) alert('Servicio actualizado con éxito');
        } else {
            const nuevoServicio = await post('/servicios', servicioData);
            if (nuevoServicio) alert('Servicio registrado con éxito');
        }

        form.reset();
        servicioSeleccionado = null;
        cargarServicios();
    });

    async function cargarServicios() {
        const servicios = await get('/servicios');
        tbody.innerHTML = '';
        if (servicios) {
            servicios.forEach((servicio) => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${servicio.id}</td>
                    <td>${servicio.nombre}</td>
                    <td>${servicio.duracion} minutos</td>
                    <td>$${servicio.precio.toFixed(2)}</td>
                    <td>
                        <button onclick="editarServicio(${servicio.id})">Editar</button>
                        <button onclick="eliminarServicio(${servicio.id})">Eliminar</button>
                    </td>
                `;
                tbody.appendChild(tr);
            });
        }
    }

    async function editarServicio(id) {
        const servicio = await get(`/servicios/${id}`);
        if (servicio) {
            servicioSeleccionado = id;
            document.getElementById('nombre').value = servicio.nombre;
            document.getElementById('duracion').value = servicio.duracion;
            document.getElementById('precio').value = servicio.precio;
        }
    }

    async function eliminarServicio(id) {
        if (confirm('¿Estás seguro de eliminar este servicio?')) {
            const eliminado = await del(`/servicios/${id}`);
            if (eliminado) {
                alert('Servicio eliminado con éxito');
                cargarServicios();
            }
        }
    }
});
