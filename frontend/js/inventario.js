document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('producto-form');
    const tbody = document.getElementById('productos-tbody');
    const productoIdInput = document.getElementById('producto-id'); // Campo oculto para ID del producto

    // Cargar productos al cargar la página
    cargarProductos();

    // Evento de envío del formulario
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Obtener los valores del formulario
        const nombre = document.getElementById('nombre').value.trim();
        const tipo = document.getElementById('tipo').value.trim();
        const precio = parseFloat(document.getElementById('precio').value);
        const stock = parseInt(document.getElementById('stock').value);

        // Validar datos
        if (!nombre || !tipo || !precio || !stock) {
            alert('Por favor, completa todos los campos antes de enviar.');
            return;
        }

        const producto = { nombre, tipo, precio, stock };

        // Si hay un producto seleccionado (modo edición)
        if (productoIdInput.value) {
            await actualizarProducto(productoIdInput.value, producto);
        } else {
            // Crear un nuevo producto
            await crearProducto(producto);
        }

        // Limpiar formulario y recargar productos
        form.reset();
        productoIdInput.value = ''; // Resetear el ID
        cargarProductos();
    });

    // Crear un producto
    async function crearProducto(producto) {
        try {
            const response = await fetch('http://localhost:3000/api/productos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(producto),
            });

            if (response.ok) {
                alert('Producto creado con éxito');
            } else {
                const error = await response.json();
                alert(`Error al crear el producto: ${error.mensaje || 'Error desconocido'}`);
            }
        } catch (error) {
            console.error('Error al crear el producto:', error);
            alert('Error al crear el producto');
        }
    }

    // Actualizar un producto (sin enviar el campo id en el cuerpo)
    async function actualizarProducto(id, producto) {
        try {
            const response = await fetch(`http://localhost:3000/api/productos/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(producto),
            });

            if (response.ok) {
                alert('Producto actualizado con éxito');
            } else {
                const error = await response.json();
                alert(`Error al actualizar el producto: ${error.mensaje || 'Error desconocido'}`);
            }
        } catch (error) {
            console.error('Error al actualizar el producto:', error);
            alert('Error al actualizar el producto');
        }
    }

    // Cargar los productos desde el backend
    async function cargarProductos() {
        try {
            const response = await fetch('http://localhost:3000/api/productos');
            if (response.ok) {
                const productos = await response.json();
                tbody.innerHTML = ''; // Limpiar la tabla
                productos.forEach(producto => agregarProductoATabla(producto));
            } else {
                alert('Error al cargar la lista de productos');
            }
        } catch (error) {
            console.error('Error al cargar los productos:', error);
            alert('Error al cargar los productos');
        }
    }

    // Eliminar un producto
    async function eliminarProducto(id) {
        if (confirm('¿Estás seguro de eliminar este producto?')) {
            try {
                const response = await fetch(`http://localhost:3000/api/productos/${id}`, { method: 'DELETE' });
                if (response.ok) {
                    alert('Producto eliminado con éxito');
                    cargarProductos();
                } else {
                    const error = await response.json();
                    alert(`Error al eliminar producto: ${error.mensaje || 'Error desconocido'}`);
                }
            } catch (error) {
                console.error('Error al eliminar el producto:', error);
                alert('Error al eliminar el producto');
            }
        }
    }

    // Agregar un producto a la tabla
    function agregarProductoATabla(producto) {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${producto.id}</td>
            <td>${producto.nombre}</td>
            <td>${producto.tipo}</td>
            <td>${producto.precio}</td>
            <td>${producto.stock}</td>
            <td>
                <button class="editar-btn" data-id="${producto.id}">Editar</button>
                <button class="eliminar-btn" data-id="${producto.id}">Eliminar</button>
            </td>
        `;
        tbody.appendChild(tr);
    }

    // Event listener para botones de editar y eliminar
    tbody.addEventListener('click', (e) => {
        const target = e.target;
        const id = target.dataset.id;

        if (target.classList.contains('eliminar-btn')) {
            eliminarProducto(id);
        } else if (target.classList.contains('editar-btn')) {
            llenarFormularioEdicion(id);
        }
    });

    // Llenar el formulario con los datos del producto para editar
    async function llenarFormularioEdicion(id) {
        try {
            const response = await fetch(`http://localhost:3000/api/productos/${id}`);
            if (response.ok) {
                const producto = await response.json();

                // Llenar el formulario
                document.getElementById('nombre').value = producto.nombre;
                document.getElementById('tipo').value = producto.tipo;
                document.getElementById('precio').value = producto.precio;
                document.getElementById('stock').value = producto.stock;
                productoIdInput.value = producto.id; // Guardar el ID en el campo oculto
            } else {
                alert('Error al obtener los datos del producto para editar');
            }
        } catch (error) {
            console.error('Error al obtener el producto para editar:', error);
            alert('Error al obtener los datos del producto');
        }
    }
});