document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('cliente-form');
    const tbody = document.getElementById('clientes-tbody');
    const clienteIdInput = document.getElementById('cliente-id'); // Campo oculto para ID del cliente

    // Cargar clientes al cargar la página
    cargarClientes();

    // Evento de envío del formulario
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Obtener los valores del formulario
        const nombre = document.getElementById('nombre').value.trim();
        const telefono = document.getElementById('telefono').value.trim();
        const email = document.getElementById('email').value.trim();
        const direccion = document.getElementById('direccion').value.trim();

        // Validar datos
        if (!nombre || !telefono || !email || !direccion) {
            alert('Por favor, completa todos los campos antes de enviar.');
            return;
        }

        const cliente = { nombre, telefono, email, direccion };

        // Si hay un cliente seleccionado (modo edición)
        if (clienteIdInput.value) {
            await actualizarCliente(clienteIdInput.value, cliente);
        } else {
            // Crear un nuevo cliente
            await crearCliente(cliente);
        }

        // Limpiar formulario y recargar clientes
        form.reset();
        clienteIdInput.value = ''; // Resetear el ID
        cargarClientes();
    });

    // Crear un cliente
    async function crearCliente(cliente) {
        try {
            const response = await fetch('http://localhost:3000/api/clientes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(cliente),
            });

            if (response.ok) {
                alert('Cliente creado con éxito');
            } else {
                const error = await response.json();
                alert(`Error al crear el cliente: ${error.mensaje || 'Error desconocido'}`);
            }
        } catch (error) {
            console.error('Error al crear cliente:', error);
            alert('Error al crear el cliente');
        }
    }

    // Actualizar un cliente (sin enviar el campo id en el cuerpo)
    async function actualizarCliente(id, cliente) {
        try {
            const response = await fetch(`http://localhost:3000/api/clientes/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(cliente),
            });

            if (response.ok) {
                alert('Cliente actualizado con éxito');
            } else {
                const error = await response.json();
                alert(`Error al actualizar el cliente: ${error.mensaje || 'Error desconocido'}`);
            }
        } catch (error) {
            console.error('Error al actualizar cliente:', error);
            alert('Error al actualizar el cliente');
        }
    }

    // Cargar los clientes desde el backend
    async function cargarClientes() {
        try {
            const response = await fetch('http://localhost:3000/api/clientes');
            if (response.ok) {
                const clientes = await response.json();
                tbody.innerHTML = ''; // Limpiar la tabla
                clientes.forEach(cliente => agregarClienteATabla(cliente));
            } else {
                alert('Error al cargar la lista de clientes');
            }
        } catch (error) {
            console.error('Error al cargar los clientes:', error);
            alert('Error al cargar los clientes');
        }
    }

    // Eliminar un cliente
    async function eliminarCliente(id) {
        if (confirm('¿Estás seguro de eliminar este cliente?')) {
            try {
                const response = await fetch(`http://localhost:3000/api/clientes/${id}`, { method: 'DELETE' });
                if (response.ok) {
                    alert('Cliente eliminado con éxito');
                    cargarClientes();
                } else {
                    const error = await response.json();
                    alert(`Error al eliminar cliente: ${error.mensaje || 'Error desconocido'}`);
                }
            } catch (error) {
                console.error('Error al eliminar el cliente:', error);
                alert('Error al eliminar el cliente');
            }
        }
    }

    // Agregar un cliente a la tabla
    function agregarClienteATabla(cliente) {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${cliente.nombre}</td>
            <td>${cliente.telefono}</td>
            <td>${cliente.email}</td>
            <td>${cliente.direccion}</td>
            <td>
                <button class="editar-btn" data-id="${cliente.id}">Editar</button>
                <button class="eliminar-btn" data-id="${cliente.id}">Eliminar</button>
            </td>
        `;
        tbody.appendChild(tr);
    }

    // Event listener para botones de editar y eliminar
    tbody.addEventListener('click', (e) => {
        const target = e.target;
        const id = target.dataset.id;

        if (target.classList.contains('eliminar-btn')) {
            eliminarCliente(id);
        } else if (target.classList.contains('editar-btn')) {
            llenarFormularioEdicion(id);
        }
    });

    // Llenar el formulario con los datos del cliente para editar
    async function llenarFormularioEdicion(id) {
        try {
            const response = await fetch(`http://localhost:3000/api/clientes/${id}`);
            if (response.ok) {
                const cliente = await response.json();

                // Llenar el formulario
                document.getElementById('nombre').value = cliente.nombre;
                document.getElementById('telefono').value = cliente.telefono;
                document.getElementById('email').value = cliente.email;
                document.getElementById('direccion').value = cliente.direccion;
                clienteIdInput.value = cliente.id; // Guardar el ID en el campo oculto
            } else {
                alert('Error al obtener los datos del cliente para editar');
            }
        } catch (error) {
            console.error('Error al obtener el cliente para editar:', error);
            alert('Error al obtener los datos del cliente');
        }
    }
});
