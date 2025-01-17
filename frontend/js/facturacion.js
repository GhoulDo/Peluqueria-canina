document.addEventListener('DOMContentLoaded', () => {
    const facturaForm = document.getElementById('factura-form');
    const detalleForm = document.getElementById('detalle-form');
    const facturasTbody = document.getElementById('facturas-tbody');
    const detallesTbody = document.getElementById('detalles-tbody');

    let facturaSeleccionada = null;
    let detalleSeleccionado = null;

    // Cargar facturas y detalles al iniciar la página
    cargarFacturas();
    cargarDetalles();

    // Gestión de facturas
    facturaForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const clienteId = parseInt(document.getElementById('cliente-id').value);
        const total = parseFloat(document.getElementById('total').value);

        const facturaData = { cliente_id: clienteId, total };

        if (facturaSeleccionada) {
            const actualizado = await put(`/facturas/${facturaSeleccionada}`, facturaData);
            if (actualizado) alert('Factura actualizada con éxito');
        } else {
            const nuevaFactura = await post('/facturas', facturaData);
            if (nuevaFactura) alert('Factura registrada con éxito');
        }

        facturaForm.reset();
        facturaSeleccionada = null;
        cargarFacturas();
    });

    // Gestión de detalles de factura
    detalleForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const facturaId = parseInt(document.getElementById('factura-id').value);
        const productoId = parseInt(document.getElementById('producto-id').value);
        const cantidad = parseInt(document.getElementById('cantidad').value);
        const subtotal = parseFloat(document.getElementById('subtotal').value);

        const detalleData = { factura_id: facturaId, producto_id: productoId, cantidad, subtotal };

        if (detalleSeleccionado) {
            const actualizado = await put(`/detalles-factura/${detalleSeleccionado}`, detalleData);
            if (actualizado) alert('Detalle actualizado con éxito');
        } else {
            const nuevoDetalle = await post('/detalles-factura', detalleData);
            if (nuevoDetalle) alert('Detalle registrado con éxito');
        }

        detalleForm.reset();
        detalleSeleccionado = null;
        cargarDetalles();
    });

    async function cargarFacturas() {
        const facturas = await get('/facturas');
        facturasTbody.innerHTML = '';
        if (facturas) {
            facturas.forEach((factura) => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${factura.id}</td>
                    <td>${factura.cliente_id}</td>
                    <td>${factura.fecha}</td>
                    <td>$${factura.total.toFixed(2)}</td>
                    <td>
                        <button onclick="editarFactura(${factura.id})">Editar</button>
                        <button onclick="eliminarFactura(${factura.id})">Eliminar</button>
                    </td>
                `;
                facturasTbody.appendChild(tr);
            });
        }
    }

    async function cargarDetalles() {
        const detalles = await get('/detalles-factura');
        detallesTbody.innerHTML = '';
        if (detalles) {
            detalles.forEach((detalle) => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${detalle.id}</td>
                    <td>${detalle.factura_id}</td>
                    <td>${detalle.producto_id}</td>
                    <td>${detalle.cantidad}</td>
                    <td>$${detalle.subtotal.toFixed(2)}</td>
                    <td>
                        <button onclick="editarDetalle(${detalle.id})">Editar</button>
                        <button onclick="eliminarDetalle(${detalle.id})">Eliminar</button>
                    </td>
                `;
                detallesTbody.appendChild(tr);
            });
        }
    }

    async function editarFactura(id) {
        const factura = await get(`/facturas/${id}`);
        if (factura) {
            facturaSeleccionada = id;
            document.getElementById('cliente-id').value = factura.cliente_id;
            document.getElementById('total').value = factura.total;
        }
    }

    async function editarDetalle(id) {
        const detalle = await get(`/detalles-factura/${id}`);
        if (detalle) {
            detalleSeleccionado = id;
            document.getElementById('factura-id').value = detalle.factura_id;
            document.getElementById('producto-id').value = detalle.producto_id;
            document.getElementById('cantidad').value = detalle.cantidad;
            document.getElementById('subtotal').value = detalle.subtotal;
        }
    }

    async function eliminarFactura(id) {
        if (confirm('¿Estás seguro de eliminar esta factura?')) {
            const eliminado = await del(`/facturas/${id}`);
            if (eliminado) {
                alert('Factura eliminada con éxito');
                cargarFacturas();
            }
        }
    }

    async function eliminarDetalle(id) {
        if (confirm('¿Estás seguro de eliminar este detalle?')) {
            const eliminado = await del(`/detalles-factura/${id}`);
            if (eliminado) {
                alert('Detalle eliminado con éxito');
                cargarDetalles();
            }
        }
    }
});
