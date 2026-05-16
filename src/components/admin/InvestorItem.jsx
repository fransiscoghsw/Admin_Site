import DefaultMaleUser from "../../assets/images/icons/default-male-user.svg";
import { Dropdown, Tooltip } from "flowbite-react";
import ToggleButton from "../common/ToggleButton";
import {
    PiDotsThreeOutlineBold,
    PiFolderUser,
    PiMoneyWavy,
    PiNotePencilDuotone,
    PiUserBold,
    PiUsersThreeBold,
} from "react-icons/pi";

const InvestorItem = (props) => {
    const {
        id,
        investorType,
        investorBiodata,
        openModal,
        isVerifiedProfile,
        handleToggleStatus,
    } = props;

    const profilePhotoUrl = `${
        import.meta.env.VITE_API_URL
    }/investorBiodata/images/${investorBiodata.profilePhoto}`;
    // console.log("Trying to load profile photo from:", profilePhotoUrl);

    return (
        <div className="bg-white flex flex-col items-center px-5 py-6 rounded-2xl shadow-lg">
            <div className="flex justify-between w-full">
                <div className="">
                    <Tooltip
                        content={
                            isVerifiedProfile
                                ? "Batalkan Verifikasi"
                                : "Verifikasi Investor"
                        }
                        placement="top"
                    >
                        <ToggleButton
                            isChecked={isVerifiedProfile}
                            handleToggleStatus={() =>
                                handleToggleStatus(id, isVerifiedProfile)
                            }
                        />
                    </Tooltip>
                </div>

                <div className="w-24 h-24 rounded-full overflow-hidden flex items-center justify-center">
                    {investorBiodata?.profilePhoto ? (
                        <img
                            src={`${
                                import.meta.env.VITE_API_URL
                            }/investorBiodata/images/${encodeURIComponent(
                                investorBiodata.profilePhoto,
                            )}`}
                            alt={
                                investorBiodata?.fullname || "Investor Profile"
                            }
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                e.target.src = DefaultMaleUser;
                            }}
                        />
                    ) : investorType === "organization" ? (
                        <PiUsersThreeBold className="w-full h-full text-gray-500" />
                    ) : (
                        <PiUserBold className="w-full h-full text-gray-500" />
                    )}
                </div>

                <div className="cursor-pointer">
                    <Dropdown
                        label=""
                        dismissOnClick={false}
                        renderTrigger={() => (
                            <div className="border border-gray-300 rounded-full p-[6px] duration-300 ease-in-out hover:border-[#000080] hover:shadow-lg">
                                <PiDotsThreeOutlineBold className="text-gray-400" />
                            </div>
                        )}
                        placement="right-end"
                    >
                        <Dropdown.Item
                            icon={PiFolderUser}
                            onClick={() => openModal("detail_investor", id)}
                        >
                            Profil
                        </Dropdown.Item>
                        <Dropdown.Item
                            icon={PiNotePencilDuotone}
                            onClick={() => openModal("edit_investor", id)}
                        >
                            Ubah
                        </Dropdown.Item>
                        <Dropdown.Item
                            icon={PiMoneyWavy}
                            onClick={() => openModal("view_portfolio", id)}
                        >
                            Portofolio
                        </Dropdown.Item>
                    </Dropdown>
                </div>
            </div>

            <div className="ml-[26.4px] text-center mt-1">
                <h4 className="font-semibold">{investorBiodata?.fullname}</h4>
                <p className="text-gray-600">
                    {investorType === "organization"
                        ? "Organisasi"
                        : "Individu"}
                </p>
            </div>
        </div>
    );
};

export default InvestorItem;
