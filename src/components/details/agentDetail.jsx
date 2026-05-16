import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Modal from "../admin/Modal";
import { getAgentImage } from "../../services/agent.service";

const AgentDetail = ({ agent, onClose }) => {
    if (!agent) return null; // Mencegah error jika agent undefined

    const [photoKtpUrl, setPhotoKtpUrl] = useState(null);
    const [photoNpwpUrl, setPhotoNpwpUrl] = useState(null);

    // Ambil gambar dari API saat komponen dimount
    useEffect(() => {
        const fetchImages = async () => {
            if (agent.photoKtp) {
                try {
                    const res = await getAgentImage(agent.photoKtp);
                    setPhotoKtpUrl(res);
                } catch (error) {
                    setPhotoKtpUrl(null);
                }
            }
            if (agent.photoNpwp) {
                try {
                    const res = await getAgentImage(agent.photoNpwp);
                    setPhotoNpwpUrl(res);
                } catch (error) {
                    setPhotoNpwpUrl(null);
                }
            }
        };

        fetchImages();
    }, [agent.photoKtp, agent.photoNpwp]);

    const commonDetails = [
        { label: "Kategori", value: agent.category },
        { label: "Nama Lengkap", value: agent.fullname },
        { label: "Alamat Lengkap", value: agent.address },
        { label: "Nomor Telepon/WhatsApp", value: agent.noPhone },
    ];

    const packagingDetails = [
        { label: "Tempat, Tanggal Lahir", value: agent.placeAndDateOfBirth },
        { label: "Nomor KTP", value: agent.noKtp },
        { label: "Email", value: agent.email },
        { label: "Jenis Usaha", value: agent.typeOfBusiness },
        { label: "Alamat Usaha", value: agent.addressBusiness },
        { label: "NPWP", value: agent.noNpwp },
        { label: "Media Penjualan", value: agent.salesMedia },
        { label: "Pilihan Paket", value: agent.businessPackage },
        { label: "Pilihan Penggunaan Brand", value: agent.brandUsage },
    ];

    const trayDetails = [
        { label: "Jumlah Telur yang Dipesan", value: agent.qty },
        { label: "Frekuensi Pemesanan", value: agent.orderFrequency },
        { label: "Alamat Pengiriman", value: agent.shippingAddress },
        { label: "Jadwal Pengiriman", value: agent.shippingSchedule },
        { label: "Biaya Pengiriman", value: agent.shippingCost },
        { label: "Nama Bank", value: agent.bankName },
        { label: "Nomor Rekening & Nama", value: agent.noRekeningAndName },
    ];

    const details =
        agent.category === "Packaging"
            ? [...commonDetails, ...packagingDetails]
            : [...commonDetails, ...trayDetails];

    return (
        <div>
            <Modal.Header
                title={`Detail Agen: ${agent.fullname}`}
                onClose={onClose}
            />
            <Modal.Body>
                <div className="grid gap-3 text-gray-700">
                    {details.map(({ label, value }, index) => (
                        <div
                            key={index}
                            className="flex justify-between p-2 border-b border-gray-200"
                        >
                            <span className="font-semibold">{label}</span>
                            <span className="text-gray-600">
                                {value || "-"}
                            </span>
                        </div>
                    ))}
                    {/* Tampilkan Foto KTP */}
                    {agent.photoKtp && (
                        <div className="p-2 border-b border-gray-200">
                            <span className="font-semibold">Foto KTP:</span>
                            {agent?.photoKtp ? (
                                <img
                                    src={`${
                                        import.meta.env.VITE_API_URL
                                    }/admin/agents/image/${agent?.photoKtp}`}
                                    alt="Foto KTP"
                                    className="w-32 h-32 object-cover rounded-lg mt-2"
                                />
                            ) : (
                                <span className="text-gray-600">
                                    Tidak tersedia
                                </span>
                            )}
                        </div>
                    )}
                    {/* Tampilkan Foto NPWP */}
                    {agent.photoNpwp && (
                        <div className="p-2 border-b border-gray-200">
                            <span className="font-semibold">Foto NPWP:</span>
                            {photoNpwpUrl ? (
                                <img
                                    src={`${
                                        import.meta.env.VITE_API_URL
                                    }/admin/agents/image/${agent?.photoNpwp}`}
                                    alt="Foto NPWP"
                                    className="w-32 h-32 object-cover rounded-lg mt-2"
                                />
                            ) : (
                                <span className="text-gray-600">
                                    Tidak tersedia
                                </span>
                            )}
                        </div>
                    )}
                </div>
            </Modal.Body>
        </div>
    );
};

// ✅ Validasi Props
AgentDetail.propTypes = {
    agent: PropTypes.shape({
        category: PropTypes.string.isRequired,
        fullname: PropTypes.string.isRequired,
        address: PropTypes.string.isRequired,
        noPhone: PropTypes.string.isRequired,
        placeAndDateOfBirth: PropTypes.string,
        noKtp: PropTypes.string,
        email: PropTypes.string,
        typeOfBusiness: PropTypes.string,
        addressBusiness: PropTypes.string,
        noNpwp: PropTypes.string,
        salesMedia: PropTypes.string,
        businessPackage: PropTypes.string,
        brandUsage: PropTypes.string,
        photoKtp: PropTypes.string,
        photoNpwp: PropTypes.string,
        qty: PropTypes.string,
        orderFrequency: PropTypes.string,
        shippingAddress: PropTypes.string,
        shippingSchedule: PropTypes.string,
        shippingCost: PropTypes.string,
        bankName: PropTypes.string,
        noRekeningAndName: PropTypes.string,
    }),
    onClose: PropTypes.func.isRequired,
};

export default AgentDetail;
