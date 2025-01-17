document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('mascota-form');
    const tbody = document.getElementById('mascotas-tbody');

    let mascotaSeleccionada = null;

    // Cargar mascotas al iniciar la página
    cargarMascotas();

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const nombre = document.getElementById('nombre').value;
        const tipo = document.getElementById('tipo').value;
        const raza = document.getElementById('raza').value;
        const edad = parseInt(document.getElementById('edad').value);
        const clienteId = parseInt(document.getElementById('cliente-id').value);

        const mascotaData = { nombre, tipo, raza, edad, cliente_id: clienteId };

        if (mascotaSeleccionada) {
            // Actualizar una mascota existente
            const actualizado = await put(`/mascotas/${mascotaSeleccionada}`, mascotaData);
            if (actualizado) alert('Mascota actualizada con éxito');
        } else {
            // Crear una nueva mascota
            const nuevaMascota = await post('/mascotas', mascotaData);
            if (nuevaMascota) alert('Mascota registrada con éxito');
        }

        form.reset();
        mascotaSeleccionada = null;
        cargarMascotas();
    });

    async function cargarMascotas() {
        const mascotas = await get('/mascotas');
        tbody.innerHTML = '';
        if (mascotas) {
            mascotas.forEach((mascota) => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${mascota.id}</td>
                    <td>${mascota.nombre}</td>
                    <td>${mascota.tipo}</td>
                    <td>${mascota.raza || ''}</td>
                    <td>${mascota.edad}</td>
                    <td>${mascota.cliente_id}</td>
                    <td>
                        <button onclick="editarMascota(${mascota.id})">Editar</button>
                        <button onclick="eliminarMascota(${mascota.id})">Eliminar</button>
                    </td>
                `;
                tbody.appendChild(tr);
            });
        }
    }

    async function editarMascota(id) {
        const mascota = await get(`/mascotas/${id}`);
        if (mascota) {
            mascotaSeleccionada = id;
            document.getElementById('nombre').value = mascota.nombre;
            document.getElementById('tipo').value = mascota.tipo;
            document.getElementById('raza').value = mascota.raza || '';
            document.getElementById('edad').value = mascota.edad;
            document.getElementById('cliente-id').value = mascota.cliente_id;
        }
    }

    async function eliminarMascota(id) {
        if (confirm('¿Estás seguro de eliminar esta mascota?')) {
            const eliminado = await del(`/mascotas/${id}`);
            if (eliminado) {
                alert('Mascota eliminada con éxito');
                cargarMascotas();
            }
        }
    }
});
