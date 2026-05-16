import { useState, useEffect } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import {
    getAllProduct,
    createProduct,
    updateProduct,
    deleteProduct,
} from "../../services/product.service";
import Modal from "../../components/admin/Modal";
import { showToast } from "../../utils/toast";
import ProductForm from "../../components/form/ProductForm";
import SearchInput from "../../components/input/SearchInput";
import Table from "../../components/common/Table";
import Button from "../../components/common/Button";

const Product = () => {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [currentProduct, setCurrentProduct] = useState(null);

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        try {
            const data = await getAllProduct();

            setProducts(data);
        } catch (error) {
            console.log("Error fetching products:", error);
        }
    };

    const handleCreate = () => {
        setCurrentProduct(null);
        setIsModalOpen(true);
    };

    const handleEdit = (product) => {
        setCurrentProduct(product);
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        try {
            await deleteProduct(id);
            showToast("Produk berhasil dihapus");
            setProducts((prevProducts) =>
                prevProducts.filter((product) => product.id !== id),
            );
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    const handleSubmit = async (formData) => {
        try {
            if (currentProduct) {
                await updateProduct(currentProduct?.id, formData);
            } else {
                await createProduct(formData);
            }
            await loadProducts();
            setIsModalOpen(false);
        } catch (error) {
            console.error("Error creating/updating product:", error);
        }
    };

    // Filter berdasarkan search term
    const filteredProducts = products.filter((product) =>
        [product.name].some((field) =>
            field?.toLowerCase().includes(searchTerm.toLowerCase()),
        ),
    );

    // Definisi kolom tabel
    const columnTable = [
        { key: "id", label: "ID" },
        { key: "name", label: "Nama" },
    ];

    return (
        <AdminLayout pageTitle="Halaman Data Produk">
            <div className="bg-[#F5F5F7] w-full rounded-2xl shadow-md p-6">
                {/* Header & Button */}
                <div className="flex flex-wrap gap-4 justify-between items-center mb-6">
                    <div className="w-full md:w-auto flex-1">
                        {/* Search Input */}
                        <SearchInput
                            value={searchTerm}
                            onChange={setSearchTerm}
                        />
                    </div>
                    <div className="flex items-center gap-4">
                        {/* Add Produk Button */}
                        <Button variant="primary" onClick={handleCreate}>
                            + Add Produk
                        </Button>
                    </div>
                </div>

                {/* Menampilkan Table */}
                <Table
                    columns={columnTable}
                    data={filteredProducts}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />

                {/* Modal Form */}
                <Modal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                >
                    <ProductForm
                        initialData={currentProduct}
                        onSubmit={handleSubmit}
                        onClose={() => setIsModalOpen(false)}
                    />
                </Modal>
            </div>
        </AdminLayout>
    );
};

export default Product;
