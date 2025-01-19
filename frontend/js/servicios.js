document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('servicio-form');
    const tbody = document.getElementById('servicios-tbody');
    const servicioIdInput = document.getElementById('servicio-id'); // Campo oculto para ID del servicio

    // Cargar servicios al cargar la página
    cargarServicios();

    // Evento de envío del formulario
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Obtener los valores del formulario
        const nombre = document.getElementById('nombre').value.trim();
        const duracion = parseInt(document.getElementById('duracion').value);
        const precio = parseFloat(document.getElementById('precio').value);

        // Validar datos
        if (!nombre || !duracion || !precio) {
            alert('Por favor, completa todos los campos antes de enviar.');
            return;
        }

        const servicio = { nombre, duracion, precio };

        // Si hay un servicio seleccionado (modo edición)
        if (servicioIdInput.value) {
            await actualizarServicio(servicioIdInput.value, servicio);
        } else {
            // Crear un nuevo servicio
            await crearServicio(servicio);
        }

        // Limpiar formulario y recargar servicios
        form.reset();
        servicioIdInput.value = ''; // Resetear el ID
        cargarServicios();
    });

    // Crear un servicio
    async function crearServicio(servicio) {
        try {
            const response = await fetch('http://localhost:3000/api/servicios', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(servicio),
            });

            if (response.ok) {
                alert('Servicio creado con éxito');
            } else {
                const error = await response.json();
                alert(`Error al crear el servicio: ${error.mensaje || 'Error desconocido'}`);
            }
        } catch (error) {
            console.error('Error al crear el servicio:', error);
            alert('Error al crear el servicio');
        }
    }

    // Actualizar un servicio (sin enviar el campo id en el cuerpo)
    async function actualizarServicio(id, servicio) {
        try {
            const response = await fetch(`http://localhost:3000/api/servicios/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(servicio),
            });

            if (response.ok) {
                alert('Servicio actualizado con éxito');
            } else {
                const error = await response.json();
                alert(`Error al actualizar el servicio: ${error.mensaje || 'Error desconocido'}`);
            }
        } catch (error) {
            console.error('Error al actualizar el servicio:', error);
            alert('Error al actualizar el servicio');
        }
    }

    // Cargar los servicios desde el backend
    async function cargarServicios() {
        try {
            const response = await fetch('http://localhost:3000/api/servicios');
            if (response.ok) {
                const servicios = await response.json();
                tbody.innerHTML = ''; // Limpiar la tabla
                servicios.forEach(servicio => agregarServicioATabla(servicio));
            } else {
                alert('Error al cargar la lista de servicios');
            }
        } catch (error) {
            console.error('Error al cargar los servicios:', error);
            alert('Error al cargar los servicios');
        }
    }

    // Eliminar un servicio
    async function eliminarServicio(id) {
        if (confirm('¿Estás seguro de eliminar este servicio?')) {
            try {
                const response = await fetch(`http://localhost:3000/api/servicios/${id}`, { method: 'DELETE' });
                if (response.ok) {
                    alert('Servicio eliminado con éxito');
                    cargarServicios();
                } else {
                    const error = await response.json();
                    alert(`Error al eliminar servicio: ${error.mensaje || 'Error desconocido'}`);
                }
            } catch (error) {
                console.error('Error al eliminar el servicio:', error);
                alert('Error al eliminar el servicio');
            }
        }
    }

    // Agregar un servicio a la tabla
    function agregarServicioATabla(servicio) {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${servicio.id}</td>
            <td>${servicio.nombre}</td>
            <td>${servicio.duracion}</td>
            <td>${servicio.precio}</td>
            <td>
                <button class="editar-btn" data-id="${servicio.id}">Editar</button>
                <button class="eliminar-btn" data-id="${servicio.id}">Eliminar</button>
            </td>
        `;
        tbody.appendChild(tr);
    }

    // Event listener para botones de editar y eliminar
    tbody.addEventListener('click', (e) => {
        const target = e.target;
        const id = target.dataset.id;

        if (target.classList.contains('eliminar-btn')) {
            eliminarServicio(id);
        } else if (target.classList.contains('editar-btn')) {
            llenarFormularioEdicion(id);
        }
    });

    // Llenar el formulario con los datos del servicio para editar
    async function llenarFormularioEdicion(id) {
        try {
            const response = await fetch(`http://localhost:3000/api/servicios/${id}`);
            if (response.ok) {
                const servicio = await response.json();

                // Llenar el formulario
                document.getElementById('nombre').value = servicio.nombre;
                document.getElementById('duracion').value = servicio.duracion;
                document.getElementById('precio').value = servicio.precio;
                servicioIdInput.value = servicio.id; // Guardar el ID en el campo oculto
            } else {
                alert('Error al obtener los datos del servicio para editar');
            }
        } catch (error) {
            console.error('Error al obtener el servicio para editar:', error);
            alert('Error al obtener los datos del servicio');
        }
    }
});