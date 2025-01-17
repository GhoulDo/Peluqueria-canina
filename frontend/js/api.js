const BASE_URL = 'http://localhost:3000/api';

async function get(endpoint) {
    try {
        const response = await fetch(`${BASE_URL}${endpoint}`);
        if (!response.ok) throw new Error(`GET ${endpoint} failed: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error(error);
        alert(`Error al obtener datos: ${error.message}`);
    }
}

async function post(endpoint, data) {
    try {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error(`POST ${endpoint} failed: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error(error);
        alert(`Error al enviar datos: ${error.message}`);
    }
}

async function put(endpoint, data) {
    try {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error(`PUT ${endpoint} failed: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error(error);
        alert(`Error al actualizar datos: ${error.message}`);
    }
}

async function del(endpoint) {
    try {
        const response = await fetch(`${BASE_URL}${endpoint}`, { method: 'DELETE' });
        if (!response.ok) throw new Error(`DELETE ${endpoint} failed: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error(error);
        alert(`Error al eliminar datos: ${error.message}`);
    }
}
