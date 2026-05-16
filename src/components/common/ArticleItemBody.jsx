import ActionButton from "./ActionButton";
import { formatDate } from "../../utils/formatDate";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
    PiDotsThreeOutlineBold,
    PiNotePencilBold,
    PiShareFatBold,
    PiTrashBold,
} from "react-icons/pi";
import { LiaUserEditSolid } from "react-icons/lia";
import { Dropdown } from "flowbite-react";

const ArticleItemBody = (props) => {
    const {
        id,
        slug,
        judul,
        penulis,
        tanggal,
        jumlah_penglihat,
        openModal,
        isMobile,
    } = props;

    const navigate = useNavigate();
    const location = useLocation();

    // Mengecek apakah pengguna berada di halaman admin/artikel
    const isAdminPage = location.pathname === "/cms/artikel";

    // Fungsi untuk menangani klik judul artikel
    const handleTitleClick = () => {
        if (isAdminPage) {
            // Di halaman admin, buka detail dalam modal atau tab baru
            window.open(`/cms/artikel/${slug}`, "_blank");
        } else {
            // Di halaman lain, navigasi biasa
            navigate(`/artikel/${slug}`);
        }
    };

    // Fungsi untuk membuka artikel dalam window baru
    const handlePreviewInNewTab = () => {
        window.open(`/cms/artikel/${slug}`, "_blank");
    };

    // Fungsi untuk membuka halaman edit artikel dalam window baru
    const handleEditInNewTab = () => {
        window.open(`/cms/artikel/${id}/edit`, "_blank");
    };

    return (
        <div
            className={`flex flex-col w-full justify-between 
            h-[120px] 
            sm:h-[140px] 
            md:h-[160px] 
            lg:h-[180px] 
            xl:h-[200px] 
            ${!isMobile ? "xl:w-[70%] shrink-0" : ""}`}
        >
            <div className={`px-2 ${isMobile ? "pb-1" : ""} flex-1`}>
                <div className="h-full flex flex-col justify-center">
                    <button
                        onClick={handleTitleClick}
                        className={`${
                            isMobile ? "text-base" : "text-xl"
                        } font-bold tracking-tight text-gray-900 text-left hover:text-[#000080] transition-colors duration-200`}
                    >
                        {judul}
                    </button>
                </div>
            </div>

            <div className="bg-[#F5F5F5] rounded-xl flex items-center justify-between px-3 py-1">
                <div className="flex items-center">
                    <div
                        className={`${
                            isMobile ? "w-7 h-7" : "w-9 h-9"
                        } text-slate-800 rounded-full mr-2`}
                    >
                        <LiaUserEditSolid className="w-full h-full" />
                    </div>
                    <span
                        className={`font-medium ${isMobile ? "text-sm" : ""}`}
                    >
                        {penulis}
                    </span>
                </div>

                <div className="flex items-center gap-x-2">
                    <span
                        className={`${isMobile ? "text-xs" : "text-sm"} opacity-[85%]`}
                    >
                        {formatDate(tanggal)}
                    </span>

                    {isAdminPage && (
                        <>
                            <p className="text-gray-800 text-sm">
                                <span className="font-medium">
                                    {jumlah_penglihat}
                                </span>{" "}
                                x dilihat
                            </p>

                            <Dropdown
                                label=""
                                dismissOnClick={false}
                                renderTrigger={() => (
                                    <div className="border border-gray-500 rounded-full p-[6px] duration-300 ease-in-out cursor-pointer hover:border-[#000080] hover:shadow-lg">
                                        <PiDotsThreeOutlineBold className="text-gray-800" />
                                    </div>
                                )}
                                placement="right-end"
                            >
                                <Dropdown.Item
                                    icon={PiShareFatBold}
                                    onClick={handlePreviewInNewTab}
                                >
                                    Preview
                                </Dropdown.Item>
                                <Dropdown.Item
                                    icon={PiNotePencilBold}
                                    onClick={handleEditInNewTab}
                                >
                                    Ubah
                                </Dropdown.Item>
                                <Dropdown.Item
                                    icon={PiTrashBold}
                                    onClick={() =>
                                        openModal("delete_article", { id })
                                    }
                                >
                                    Hapus
                                </Dropdown.Item>
                            </Dropdown>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ArticleItemBody;
