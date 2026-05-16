import { useEffect, useState } from "react";
import { IoMdMore } from "react-icons/io";
import Alert from "./Alert";
import PropTypes from "prop-types";

const CardList = ({ data, imageUrl, columns, onEdit, onDelete, onDetail }) => {
    return (
        <div>
            {data.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {data.map((item) => (
                        <Card
                            key={item.id}
                            item={item}
                            imageUrl={imageUrl}
                            columns={columns}
                            onEdit={onEdit}
                            onDelete={onDelete}
                            onDetail={onDetail}
                        />
                    ))}
                </div>
            ) : (
                <div className="flex justify-center">
                    <Alert
                        message={"Tidak ada investor yang tersedia."}
                        type={"info"}
                    />
                </div>
            )}
        </div>
    );
};

CardList.propTypes = {
    data: PropTypes.array.isRequired,
    imageUrl: PropTypes.string.isRequired,
    columns: PropTypes.array.isRequired,
    onEdit: PropTypes.func,
    onDelete: PropTypes.func,
    onDetail: PropTypes.func,
};

const Card = ({ item, imageUrl, columns, onEdit, onDelete, onDetail }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    useEffect(() => {
        console.log("data : ", item.id);
    }, []);

    return (
        <div className="bg-white shadow-md rounded-lg p-4 relative">
            {columns.map((col, index) => {
                const value =
                    col.key
                        .split(".")
                        .reduce((acc, part) => acc?.[part], item) || "-";

                // Cek apakah ini adalah kolom gambar
                if (col.type === "image") {
                    const imageUrls = value
                        ? `${import.meta.env.VITE_API_URL}${imageUrl}${value}`
                        : "https://via.placeholder.com/150";
                    return (
                        <img
                            key={col.key}
                            src={imageUrls}
                            alt="Gambar"
                            className="w-full h-40 object-cover rounded-md"
                        />
                    );
                }

                return (
                    <p
                        key={col.key}
                        className={`text-center text-sm text-gray-700 ${
                            index === 1 ? "font-bold" : ""
                        }`}
                    >
                        {value}
                    </p>
                );
            })}

            {/* Tombol Three Dots */}
            <div className="absolute top-2 right-2">
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
                >
                    <IoMdMore size={20} />
                </button>

                {/* Dropdown Menu */}
                {menuOpen && (
                    <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                        {onDetail && (
                            <button
                                onClick={() => {
                                    onDetail(item);
                                    setMenuOpen(false);
                                }}
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                                Detail
                            </button>
                        )}
                        {onEdit && (
                            <button
                                onClick={() => {
                                    onEdit(item);
                                    setMenuOpen(false);
                                }}
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                                Edit
                            </button>
                        )}
                        {onDelete && (
                            <button
                                onClick={() => {
                                    if (
                                        window.confirm(
                                            `Yakin ingin menghapus data ini?`
                                        )
                                    ) {
                                        onDelete(item.id);
                                    }
                                    setMenuOpen(false);
                                }}
                                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                            >
                                Hapus
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

Card.propTypes = {
    item: PropTypes.shape({
        id: PropTypes.string.isRequired,
    }).isRequired,
    imageUrl: PropTypes.string.isRequired,
    columns: PropTypes.array.isRequired,
    onEdit: PropTypes.func,
    onDelete: PropTypes.func,
    onDetail: PropTypes.func,
};

export default CardList;
