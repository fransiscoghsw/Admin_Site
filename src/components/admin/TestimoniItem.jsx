import ActionButton from "../common/ActionButton";
import { PiNotePencilBold, PiTrashBold } from "react-icons/pi";

const TestimoniItem = (props) => {
    const { id, nama, foto, pekerjaan, pesan, openModal } = props;
    return (
        <div className="bg-white flex gap-3 py-3 px-5 rounded-2xl shadow-lg flex-wrap xl:flex-nowrap">
            <div className="w-full">
                <div className="flex items-center gap-3 mb-3">
                    <div className="w-14 h-14 rounded-full overflow-hidden shadow shrink-0">
                        <img
                            src={`${
                                import.meta.env.VITE_API_URL
                            }/testimoni/image/${foto}`}
                            alt={`${
                                import.meta.env.VITE_API_URL
                            }/testimoni/image/${foto}`}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <div className="truncate grow">
                        <h3 className="text-2xl mb-[2px] font-bold tracking-tight text-gray-900 truncate">
                            {nama}
                        </h3>
                        <p className="text-gray-600 truncate">{pekerjaan}</p>
                    </div>

                    <div className="space-x-2 shrink-0">
                        <ActionButton
                            icon={PiNotePencilBold}
                            className={"text-yellow-600"}
                            tooltip={"Ubah"}
                            onClick={() =>
                                openModal("update_testimoni", {
                                    id,
                                    nama,
                                    foto,
                                    pekerjaan,
                                    pesan,
                                })
                            }
                        />
                        <ActionButton
                            icon={PiTrashBold}
                            className={"text-red-600"}
                            tooltip={"Hapus"}
                            onClick={() =>
                                openModal("delete_testimoni", { id })
                            }
                        />
                    </div>
                </div>
                <div>
                    <p>
                        {'"'}
                        {pesan}
                        {'"'}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default TestimoniItem;
