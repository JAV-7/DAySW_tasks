/**
 * 
 */
export class MockAPI {
    constructor(storageKey) {
        this.storageKey = storageKey;
        this.data = JSON.parse(localStorage.getItem(this.storageKey)) || [];
    }

    saveToStorage() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.data));
    }

    async getAll() {
        return this.data;
    }

    async create(newItem) {
        newItem.id = crypto.randomUUID();
        this.data.push(newItem);
        this.saveToStorage();
        return newItem;
    }

    async update(id, updatedItem) {
        this.data = this.data.map(item => item.id === id ? { ...item, ...updatedItem } : item);
        this.saveToStorage();
        return updatedItem;
    }

    async delete(id) {
        this.data = this.data.filter(item => item.id !== id);
        this.saveToStorage();
    }
}

//
const crud_api = new MockAPI('products');
const productTableBody = document.getElementById('product-table-body');
const productForm = document.getElementById('product-form');
const modalTitle = document.getElementById('modal-title');
const productModal = new bootstrap.Modal(document.getElementById('productModal'));
let editingProductId = null;

/**
 * 
 */
async function loadProducts() {
    productTableBody.innerHTML = '';
    const products = await crud_api.getAll();

    products.forEach((product, index) => {
        productTableBody.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${product.name}</td>
                <td>${product.price}</td>
                <td>
                    <button class="btn btn-warning btn-sm me-2" onclick='handleEdit("${product.id}")'>Edit</button>
                    <button class="btn btn-danger btn-sm" onclick="handleDelete('${product.id}')">Delete</button>
                </td>
            </tr>`;
    });
}

/**
 * 
 */
function toggleModal(title, product = {}) {
    modalTitle.innerText = title;
    productForm.reset();
    document.getElementById('productName').value = product.name || '';
    document.getElementById('productPrice').value = product.price || '';
    editingProductId = product.id || null;
    productModal.show();
}

/**
 * 
 */
async function handleEdit(id) {
    const products = await crud_api.getAll();
    const product = products.find(product => product.id === id);
    if (product) {
        toggleModal('Edit product', product);
    }
}

/**
 * 
 */
async function handleDelete(id) {
    if (confirm('Delete this product?')) {
        await crud_api.delete(id);
        loadProducts();
    }
}

/**
 * 
 */
productForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const product = {
        name: document.getElementById('productName').value,
        price: document.getElementById('productPrice').value,
    };

    if (editingProductId) {
        await crud_api.update(editingProductId, product);
    } else {
        await crud_api.create(product);
    }

    productModal.hide();
    loadProducts();
});

document.addEventListener('DOMContentLoaded', loadProducts);