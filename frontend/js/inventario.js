document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('producto-form');
    const tbody = document.getElementById('productos-tbody');

    let productoSeleccionado = null;

    // Cargar productos al iniciar la página
    cargarProductos();

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const nombre = document.getElementById('nombre').value;
        const tipo = document.getElementById('tipo').value;
        const precio = parseFloat(document.getElementById('precio').value);
        const stock = parseInt(document.getElementById('stock').value);

        const productoData = { nombre, tipo, precio, stock };

        if (productoSeleccionado) {
            const actualizado = await put(`/productos/${productoSeleccionado}`, productoData);
            if (actualizado) alert('Producto actualizado con éxito');
        } else {
            const nuevoProducto = await post('/productos', productoData);
            if (nuevoProducto) alert('Producto registrado con éxito');
        }

        form.reset();
        productoSeleccionado = null;
        cargarProductos();
    });

    async function cargarProductos() {
        const productos = await get('/productos');
        tbody.innerHTML = '';
        if (productos) {
            productos.forEach((producto) => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${producto.id}</td>
                    <td>${producto.nombre}</td>
                    <td>${producto.tipo}</td>
                    <td>${producto.precio.toFixed(2)}</td>
                    <td>${producto.stock}</td>
                    <td>
                        <button onclick="editarProducto(${producto.id})">Editar</button>
                        <button onclick="eliminarProducto(${producto.id})">Eliminar</button>
                    </td>
                `;
                tbody.appendChild(tr);
            });
        }
    }

    async function editarProducto(id) {
        const producto = await get(`/productos/${id}`);
        if (producto) {
            productoSeleccionado = id;
            document.getElementById('nombre').value = producto.nombre;
            document.getElementById('tipo').value = producto.tipo;
            document.getElementById('precio').value = producto.precio;
            document.getElementById('stock').value = producto.stock;
        }
    }

    async function eliminarProducto(id) {
        if (confirm('¿Estás seguro de eliminar este producto?')) {
            const eliminado = await del(`/productos/${id}`);
            if (eliminado) {
                alert('Producto eliminado con éxito');
                cargarProductos();
            }
        }
    }
});
