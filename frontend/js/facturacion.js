document.addEventListener('DOMContentLoaded', () => {
    const facturaForm = document.getElementById('factura-form');
    const detalleForm = document.getElementById('detalle-form');
    const facturasTbody = document.getElementById('facturas-tbody');
    const detallesTbody = document.getElementById('detalles-tbody');

    let facturaSeleccionada = null;
    let detalleSeleccionado = null;

    // Cargar facturas y detalles al cargar la página
    cargarFacturas();
    cargarDetalles();

    // Evento de envío del formulario de factura
    facturaForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Obtener los valores del formulario
        const clienteId = parseInt(document.getElementById('cliente-id').value);
        const total = parseFloat(document.getElementById('total').value);

        // Validar datos
        if (!clienteId || isNaN(clienteId) || !total || isNaN(total)) {
            alert('Por favor, completa todos los campos antes de enviar.');
            return;
        }

        const factura = { cliente_id: clienteId, total };
        console.log('Enviando factura:', factura);

        // Si hay una factura seleccionada (modo edición)
        if (facturaSeleccionada) {
            await actualizarFactura(facturaSeleccionada, factura);
        } else {
            // Crear una nueva factura
            await crearFactura(factura);
        }

        // Limpiar formulario y recargar facturas
        facturaForm.reset();
        facturaSeleccionada = null;
        cargarFacturas();
    });

    // Evento de envío del formulario de detalle
    detalleForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Obtener los valores del formulario
        const facturaId = parseInt(document.getElementById('factura-id').value);
        const productoId = parseInt(document.getElementById('producto-id').value);
        const cantidad = parseInt(document.getElementById('cantidad').value);
        const subtotal = parseFloat(document.getElementById('subtotal').value);

        // Validar 
        if (!facturaId || !productoId || !cantidad || !subtotal) {
            alert('Por favor, completa todos los campos antes de enviar.');
            return;
        }

        const detalle = { factura_id: facturaId, producto_id: productoId, cantidad, subtotal };

        // Si hay un detalle seleccionado (modo edición)
        if (detalleSeleccionado) {
            await actualizarDetalle(detalleSeleccionado, detalle);
        } else {
            // Crear un nuevo detalle
            await crearDetalle(detalle);
        }

        // Limpiar formulario y recargar detalles
        detalleForm.reset();
        detalleSeleccionado = null;
        cargarDetalles();
    });

    // Crear una factura
    async function crearFactura(factura) {
        try {
            const response = await fetch('http://localhost:3000/api/facturas', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(factura),
            });

            if (response.ok) {
                alert('Factura creada con éxito');
            } else {
                const error = await response.json();
                alert(`Error al crear la factura: ${error.mensaje || 'Error desconocido'}`);
            }
        } catch (error) {
            console.error('Error al crear la factura:', error);
            alert('Error al crear la factura');
        }
    }

    // Actualizar una factura (sin enviar el campo id en el cuerpo)
    async function actualizarFactura(id, factura) {
        try {
            const response = await fetch(`http://localhost:3000/api/facturas/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(factura),
            });

            if (response.ok) {
                alert('Factura actualizada con éxito');
            } else {
                const error = await response.json();
                alert(`Error al actualizar la factura: ${error.mensaje || 'Error desconocido'}`);
            }
        } catch (error) {
            console.error('Error al actualizar la factura:', error);
            alert('Error al actualizar la factura');
        }
    }

    // Cargar las facturas desde el backend
    async function cargarFacturas() {
        try {
            const response = await fetch('http://localhost:3000/api/facturas');
            if (response.ok) {
                const facturas = await response.json();
                facturasTbody.innerHTML = ''; // Limpiar la tabla
                facturas.forEach(factura => agregarFacturaATabla(factura));
            } else {
                alert('Error al cargar la lista de facturas');
            }
        } catch (error) {
            console.error('Error al cargar las facturas:', error);
            alert('Error al cargar las facturas');
        }
    }

    // Eliminar una factura
    async function eliminarFactura(id) {
        if (confirm('¿Estás seguro de eliminar esta factura?')) {
            try {
                const response = await fetch(`http://localhost:3000/api/facturas/${id}`, { method: 'DELETE' });
                if (response.ok) {
                    alert('Factura eliminada con éxito');
                    cargarFacturas();
                } else {
                    const error = await response.json();
                    alert(`Error al eliminar factura: ${error.mensaje || 'Error desconocido'}`);
                }
            } catch (error) {
                console.error('Error al eliminar la factura:', error);
                alert('Error al eliminar la factura');
            }
        }
    }

    // Agregar una factura a la tabla
    function agregarFacturaATabla(factura) {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${factura.id}</td>
            <td>${factura.cliente_id}</td>
            <td>${factura.fecha}</td>
            <td>${factura.total}</td>
            <td>
                <button class="editar-btn" data-id="${factura.id}">Editar</button>
                <button class="eliminar-btn" data-id="${factura.id}">Eliminar</button>
            </td>
        `;
        facturasTbody.appendChild(tr);
    }

    // Crear un detalle
    async function crearDetalle(detalle) {
        try {
            const response = await fetch('http://localhost:3000/api/detalle-factura', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(detalle),
            });

            if (response.ok) {
                alert('Detalle creado con éxito');
            } else {
                const error = await response.json();
                alert(`Error al crear el detalle: ${error.mensaje || 'Error desconocido'}`);
            }
        } catch (error) {
            console.error('Error al crear el detalle:', error);
            alert('Error al crear el detalle');
        }
    }

    // Actualizar un detalle (sin enviar el campo id en el cuerpo)
    async function actualizarDetalle(id, detalle) {
        try {
            const response = await fetch(`http://localhost:3000/api/detalle-factura/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(detalle),
            });

            if (response.ok) {
                alert('Detalle actualizado con éxito');
            } else {
                const error = await response.json();
                alert(`Error al actualizar el detalle: ${error.mensaje || 'Error desconocido'}`);
            }
        } catch (error) {
            console.error('Error al actualizar el detalle:', error);
            alert('Error al actualizar el detalle');
        }
    }

    // Cargar los detalles desde el backend
    async function cargarDetalles() {
        try {
            const response = await fetch('http://localhost:3000/api/detalle-factura');
            if (response.ok) {
                const detalles = await response.json();
                detallesTbody.innerHTML = ''; // Limpiar la tabla
                detalles.forEach(detalle => agregarDetalleATabla(detalle));
            } else {
                alert('Error al cargar la lista de detalles');
            }
        } catch (error) {
            console.error('Error al cargar los detalles:', error);
            alert('Error al cargar los detalles');
        }
    }

    // Eliminar un detalle
    async function eliminarDetalle(id) {
        if (confirm('¿Estás seguro de eliminar este detalle?')) {
            try {
                const response = await fetch(`http://localhost:3000/api/detalle-factura/${id}`, { method: 'DELETE' });
                if (response.ok) {
                    alert('Detalle eliminado con éxito');
                    cargarDetalles();
                } else {
                    const error = await response.json();
                    alert(`Error al eliminar detalle: ${error.mensaje || 'Error desconocido'}`);
                }
            } catch (error) {
                console.error('Error al eliminar el detalle:', error);
                alert('Error al eliminar el detalle');
            }
        }
    }

    // Agregar un detalle a la tabla
    function agregarDetalleATabla(detalle) {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${detalle.id}</td>
            <td>${detalle.factura_id}</td>
            <td>${detalle.producto_id}</td>
            <td>${detalle.cantidad}</td>
            <td>${detalle.subtotal}</td>
            <td>
                <button class="editar-btn" data-id="${detalle.id}">Editar</button>
                <button class="eliminar-btn" data-id="${detalle.id}">Eliminar</button>
            </td>
        `;
        detallesTbody.appendChild(tr);
    }

    // Event listener para botones de editar y eliminar
    facturasTbody.addEventListener('click', (e) => {
        const target = e.target;
        const id = target.dataset.id;

        if (target.classList.contains('eliminar-btn')) {
            eliminarFactura(id);
        } else if (target.classList.contains('editar-btn')) {
            llenarFormularioEdicionFactura(id);
        }
    });

    detallesTbody.addEventListener('click', (e) => {
        const target = e.target;
        const id = target.dataset.id;

        if (target.classList.contains('eliminar-btn')) {
            eliminarDetalle(id);
        } else if (target.classList.contains('editar-btn')) {
            llenarFormularioEdicionDetalle(id);
        }
    });

    // Llenar el formulario con los datos de la factura para editar
    async function llenarFormularioEdicionFactura(id) {
        try {
            const response = await fetch(`http://localhost:3000/api/facturas/${id}`);
            if (response.ok) {
                const factura = await response.json();

                // Llenar el formulario
                document.getElementById('cliente-id').value = factura.cliente_id;
                document.getElementById('total').value = factura.total;
                facturaSeleccionada = factura.id; // Guardar el ID en una variable
            } else {
                alert('Error al obtener los datos de la factura para editar');
            }
        } catch (error) {
            console.error('Error al obtener la factura para editar:', error);
            alert('Error al obtener los datos de la factura');
        }
    }

    // Llenar el formulario con los datos del detalle para editar
    async function llenarFormularioEdicionDetalle(id) {
        try {
            const response = await fetch(`http://localhost:3000/api/detalle-factura/${id}`);
            if (response.ok) {
                const detalle = await response.json();

                // Llenar el formulario
                document.getElementById('factura-id').value = detalle.factura_id;
                document.getElementById('producto-id').value = detalle.producto_id;
                document.getElementById('cantidad').value = detalle.cantidad;
                document.getElementById('subtotal').value = detalle.subtotal;
                detalleSeleccionado = detalle.id; // Guardar el ID en una variable
            } else {
                alert('Error al obtener los datos del detalle para editar');
            }
        } catch (error) {
            console.error('Error al obtener el detalle para editar:', error);
            alert('Error al obtener los datos del detalle');
        }
    }
});