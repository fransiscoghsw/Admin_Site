import { Tabs } from "flowbite-react";
import DefaultMaleUser from "../../assets/images/icons/default-male-user.svg";
import Label from "../common/Label";
import Input from "../common/Input";
import ZoomableImage from "../common/ZoomableImage";
import Modal from "./Modal";
import { PiUserBold, PiUsersThreeBold } from "react-icons/pi";
import { formatDate } from "../../utils/formatDate";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import {
    getProvinsi,
    getKota,
    getKecamatan,
    getKelurahan,
} from "../../services/master.service";

const DetailInvestorModal = ({ formInvestor, onClose }) => {
    const [provinces, setProvinces] = useState([]);
    const [cities, setCities] = useState([]);
    const [kecamatans, setKecamatans] = useState([]);
    const [kelurahans, setKelurahans] = useState([]);

    useEffect(() => {
        const fetchLocationData = async () => {
            const provincesData = await getProvinsi();
            setProvinces(provincesData);

            if (formInvestor.investorAddress?.provinceId) {
                const citiesData = await getKota(
                    formInvestor.investorAddress.provinceId,
                );
                setCities(citiesData);
            }

            if (formInvestor.investorAddress?.cityId) {
                const kecamatansData = await getKecamatan(
                    formInvestor.investorAddress.cityId,
                );
                setKecamatans(kecamatansData);
            }

            if (formInvestor.investorAddress?.kecamatanId) {
                const kelurahansData = await getKelurahan(
                    formInvestor.investorAddress.kecamatanId,
                );
                setKelurahans(kelurahansData);
            }
        };

        fetchLocationData();
    }, [formInvestor.investorAddress]);

    const getLocationName = (id, locations) => {
        return locations.find((item) => item.id === id)?.name || id || "";
    };

    return (
        <>
            <Modal.Header onClose={onClose}>
                <div className="flex mx-auto max-w-lg items-center mt-2 gap-4">
                    {formInvestor.investorBiodata?.profilePhoto ? (
                        <img
                            src={`${import.meta.env.VITE_API_URL}/investorBiodata/images/${
                                formInvestor.investorBiodata.profilePhoto
                            }`}
                            alt={`${import.meta.env.VITE_API_URL}/investorBiodata/images/${
                                formInvestor.investorBiodata.profilePhoto
                            }`}
                            className="w-24 h-24 rounded-full"
                            onError={(e) => {
                                e.target.src = DefaultMaleUser;
                            }}
                        />
                    ) : (
                        <div>
                            <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 p-3">
                                {formInvestor.investorType ===
                                "organization" ? (
                                    <PiUsersThreeBold className="w-full h-full" />
                                ) : (
                                    <PiUserBold className="w-full h-full" />
                                )}
                            </div>
                        </div>
                    )}
                    <div>
                        <h3 className="text-2xl font-semibold text-[#000080]">
                            {formInvestor.investorBiodata?.fullname}
                        </h3>
                        <p>{formInvestor.investorType}</p>
                    </div>
                </div>
            </Modal.Header>

            <Modal.Body className="md:pb-5 mt-2">
                <Tabs aria-label="Pills" variant="pills">
                    <Tabs.Item active title="Biodata">
                        <Label value={"Username"} />
                        <Input
                            variant={"disabled"}
                            value={formInvestor.username || ""}
                            isDisabled={true}
                        />
                        <Label value={"Email"} />
                        <Input
                            variant={"disabled"}
                            value={formInvestor.email || ""}
                            isDisabled={true}
                        />
                        <Label value={"Jenis Kelamin"} />
                        <Input
                            variant={"disabled"}
                            value={formInvestor.investorBiodata?.gender || ""}
                            isDisabled={true}
                        />
                        <Label value={"Tempat Lahir"} />
                        <Input
                            variant={"disabled"}
                            value={
                                formInvestor.investorBiodata?.placeOfBirth || ""
                            }
                            isDisabled={true}
                        />
                        <Label value={"Tanggal Lahir"} />
                        <Input
                            variant={"disabled"}
                            value={formatDate(
                                formInvestor.investorBiodata?.dateOfBirth || "",
                            )}
                            isDisabled={true}
                        />
                        <Label value={"Nomor Telepon"} />
                        <Input
                            variant={"disabled"}
                            value={
                                formInvestor.investorBiodata?.phoneNumber || ""
                            }
                            isDisabled={true}
                        />
                    </Tabs.Item>
                    <Tabs.Item title="Alamat">
                        <Label value={"Alamat sesuai KTP"} />
                        <Input
                            variant={"disabled"}
                            value={formInvestor.investorAddress?.address || ""}
                            isDisabled={true}
                        />
                        <Label value={"Provinsi"} />
                        <Input
                            variant={"disabled"}
                            value={getLocationName(
                                formInvestor.investorAddress?.provinceId,
                                provinces,
                            )}
                            isDisabled={true}
                        />
                        <Label value={"Kabupaten/Kota"} />
                        <Input
                            variant={"disabled"}
                            value={getLocationName(
                                formInvestor.investorAddress?.cityId,
                                cities,
                            )}
                            isDisabled={true}
                        />
                        <Label value={"Kecamatan"} />
                        <Input
                            variant={"disabled"}
                            value={getLocationName(
                                formInvestor.investorAddress?.kecamatanId,
                                kecamatans,
                            )}
                            isDisabled={true}
                        />
                        <Label value={"Kelurahan"} />
                        <Input
                            variant={"disabled"}
                            value={getLocationName(
                                formInvestor.investorAddress?.kelurahanId,
                                kelurahans,
                            )}
                            isDisabled={true}
                        />
                        <Label value={"Kode Pos"} />
                        <Input
                            variant={"disabled"}
                            value={
                                formInvestor.investorAddress?.postalCode || ""
                            }
                            isDisabled={true}
                        />
                    </Tabs.Item>
                    <Tabs.Item title="Identitas">
                        <Label value={"Nomor KTP"} />
                        <Input
                            variant={"disabled"}
                            value={
                                formInvestor.investorIdentity?.ktpNumber || ""
                            }
                            isDisabled={true}
                        />
                        <Label value={"Foto KTP"} />
                        {formInvestor.investorIdentity?.ktpPhoto ? (
                            <ZoomableImage
                                src={`${import.meta.env.VITE_API_URL}/investorIdentity/image/${
                                    formInvestor.investorIdentity.ktpPhoto
                                }`}
                                alt="Foto KTP"
                            />
                        ) : (
                            <div className="flex justify-center w-full h-64 mt-2 mb-4 py-2 border-gray-50 border-2 bg-gray-50 rounded-2xl">
                                <div className="text-gray-400 flex items-center">
                                    Tidak ada foto KTP
                                </div>
                            </div>
                        )}
                        <Label value={"Nomor NPWP"} />
                        <Input
                            variant={"disabled"}
                            value={
                                formInvestor.investorIdentity?.npwpNumber || ""
                            }
                            isDisabled={true}
                        />
                        <Label value={"Foto NPWP"} />
                        {formInvestor.investorIdentity?.npwpPhoto ? (
                            <ZoomableImage
                                src={`${import.meta.env.VITE_API_URL}/investorIdentity/image/${
                                    formInvestor.investorIdentity.npwpPhoto
                                }`}
                                alt="Foto NPWP"
                            />
                        ) : (
                            <div className="flex justify-center w-full h-64 mt-2 mb-4 py-2 border-gray-50 border-2 bg-gray-50 rounded-2xl">
                                <div className="text-gray-400 flex items-center">
                                    Tidak ada foto NPWP
                                </div>
                            </div>
                        )}
                        <Label value={"Foto Selfi dengan KTP"} />
                        {formInvestor.investorIdentity?.ktpSelfie ? (
                            <ZoomableImage
                                src={`${import.meta.env.VITE_API_URL}/investorIdentity/image/${
                                    formInvestor.investorIdentity.ktpSelfie
                                }`}
                                alt="Foto Selfie dengan KTP"
                            />
                        ) : (
                            <div className="flex justify-center w-full h-64 mt-2 mb-4 py-2 border-gray-50 border-2 bg-gray-50 rounded-2xl">
                                <div className="text-gray-400 flex items-center">
                                    Tidak ada foto selfie dengan KTP
                                </div>
                            </div>
                        )}
                    </Tabs.Item>
                    <Tabs.Item title="Pendukung">
                        <Label value={"Latar Belakang Pendidikan"} />
                        <Input
                            variant={"disabled"}
                            value={
                                formInvestor.investorSupportData
                                    ?.educationLevel || ""
                            }
                            isDisabled={true}
                        />
                        <Label value={"Sumber Penghasilan"} />
                        <Input
                            variant={"disabled"}
                            value={
                                formInvestor.investorSupportData
                                    ?.incomeSource || ""
                            }
                            isDisabled={true}
                        />
                        <Label value={"Jumlah Penghasilan"} />
                        <Input
                            variant={"disabled"}
                            value={
                                formInvestor.investorSupportData
                                    ?.incomeAmount || ""
                            }
                            isDisabled={true}
                        />
                        <Label value={"Bidang Usaha"} />
                        <Input
                            variant={"disabled"}
                            value={
                                formInvestor.investorSupportData
                                    ?.businessField || ""
                            }
                            isDisabled={true}
                        />
                        <Label value={"Tujuang Investasi"} />
                        <Input
                            variant={"disabled"}
                            value={
                                formInvestor.investorSupportData
                                    ?.investmentPurpose || ""
                            }
                            isDisabled={true}
                        />
                        <Label value={"Nomor SID"} />
                        <Input
                            variant={"disabled"}
                            value={
                                formInvestor.investorSupportData?.sidNumber ||
                                ""
                            }
                            isDisabled={true}
                        />
                        <Label value={"Tanggal Pembuatan SID"} />
                        <Input
                            variant={"disabled"}
                            value={formatDate(
                                formInvestor.investorSupportData
                                    ?.sidCreationDate,
                            )}
                            isDisabled={true}
                        />
                    </Tabs.Item>
                    <Tabs.Item title="Rekening Bank">
                        <Label value={"Bank"} />
                        <Input
                            variant={"disabled"}
                            value={
                                formInvestor.bankAccountInvestor?.bankAccount
                                    ?.name || ""
                            }
                            isDisabled={true}
                        />
                        <Label value={"Nomor Rekening"} />
                        <Input
                            variant={"disabled"}
                            value={
                                formInvestor.bankAccountInvestor
                                    ?.accountNumber || ""
                            }
                            isDisabled={true}
                        />
                        <Label value={"Atas Nama"} />
                        <Input
                            variant={"disabled"}
                            value={formInvestor.bankAccountInvestor?.name || ""}
                            isDisabled={true}
                        />
                    </Tabs.Item>
                </Tabs>
            </Modal.Body>

            <Modal.Footer buttonLabel={"Kembali"} onClose={onClose} />
        </>
    );
};
DetailInvestorModal.propTypes = {
    formInvestor: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default DetailInvestorModal;
