import { calculateDaysRemaining } from "../../utils/calculateDaysRemaining";
import { formatRupiah } from "../../utils/formatRupiah";
import { useEffect, useState } from "react";
import {
    PiCalendarCheck,
    PiCalendarDots,
    PiClockClockwise,
    PiClockCountdown,
    PiDotsThreeOutlineBold,
    PiNotePencilBold,
    PiShareFatBold,
    PiTrashBold,
    PiUserBold,
    PiUserCircleFill,
    PiUsersThreeBold,
} from "react-icons/pi";
import { Dropdown, Tooltip } from "flowbite-react";

const BatchItem = (props) => {
    if (!props || !props.id) {
        console.log("Invalid props received:", props);
        return null;
    }

    const {
        id,
        title,
        description,
        image,
        farmAddressId,
        slug,
        profitSharingPercentage,
        minimumInvestment,
        maximumInvestment,
        totalFunding,
        fundingTarget,
        tenor,
        profitSharingPayment,
        openingDate,
        closingDate,
        status,
        transaction = [],
        openModal,
    } = props;

    // Validate required props
    if (!title || !status) {
        console.log("Missing required props:", { title, status });
        return null;
    }

    const [percentage, setPercentage] = useState(0);
    const [isImageLoaded, setIsImageLoaded] = useState(false);

    const daysRemaining = calculateDaysRemaining(closingDate);

    // mengambil total investor
    const totalInvestor = transaction.length;

    useEffect(() => {
        if (totalFunding !== null && fundingTarget !== null) {
            setPercentage(Math.round((totalFunding / fundingTarget) * 100));
        }
    }, [totalFunding, fundingTarget]);

    const handleImageLoad = () => {
        setIsImageLoaded(true);
    };

    const handleImageError = (e) => {
        // console.error("Error loading image:", e);
        setIsImageLoaded(true); // Still set to true to remove loading state
    };

    return (
        <div className="bg-white rounded-2xl shadow-lg flex flex-col h-full">
            <div className="relative h-44">
                {!isImageLoaded && (
                    <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-t-2xl" />
                )}
                <img
                    src={`${import.meta.env.VITE_API_URL}/investment/image/${image}`}
                    alt={title}
                    className={`h-44 w-full object-cover rounded-t-2xl rounded-b-xl shadow ${
                        !isImageLoaded ? "invisible" : ""
                    }`}
                    onLoad={handleImageLoad}
                    onError={handleImageError}
                />
            </div>
            <div className="relative p-4 flex flex-col flex-grow">
                <div className="text-center -mt-[2px] px-5 mb-2">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900 leading-tight px-2">
                        {title}
                    </h2>
                </div>

                <div className="absolute top-4 right-4 cursor-pointer rounded-full">
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
                            icon={PiShareFatBold}
                            onClick={() =>
                                openModal("detail_investment", { slug })
                            }
                        >
                            Detail
                        </Dropdown.Item>
                        <Dropdown.Item
                            icon={PiNotePencilBold}
                            onClick={() =>
                                openModal("update_investment", {
                                    id,
                                    title,
                                    description,
                                    image,
                                    farmAddressId,
                                    slug,
                                    profitSharingPercentage,
                                    minimumInvestment,
                                    maximumInvestment,
                                    totalFunding,
                                    fundingTarget,
                                    tenor,
                                    profitSharingPayment,
                                    openingDate,
                                    closingDate,
                                })
                            }
                        >
                            Ubah
                        </Dropdown.Item>
                        <Dropdown.Item
                            icon={PiTrashBold}
                            onClick={() =>
                                openModal("delete_investment", { id })
                            }
                        >
                            Hapus
                        </Dropdown.Item>
                    </Dropdown>
                </div>

                <div className="flex justify-center mb-5">
                    <div className="flex -space-x-2">
                        {/* 3 investor dengan investasi tertinggi */}
                        {transaction
                            .sort(
                                (a, b) => b.total_investasi - a.total_investasi,
                            )
                            .slice(0, 3)
                            .map((investor) => (
                                <Tooltip
                                    key={investor.investorId}
                                    content={investor.fullname}
                                    placement="bottom"
                                >
                                    <div className="h-10 w-10 bg-gray-200 rounded-full overflow-hidden border-[3px] border-white p-1">
                                        {investor.profilePhoto ? (
                                            <img
                                                src={investor.profilePhoto}
                                                alt={investor.fullname}
                                                className="w-full h-full"
                                            />
                                        ) : investor.investorType ===
                                          "organisasi" ? (
                                            <PiUsersThreeBold className="w-full h-full" />
                                        ) : (
                                            <PiUserBold className="w-full h-full" />
                                        )}
                                    </div>
                                </Tooltip>
                            ))}
                    </div>
                </div>

                <div className="flex-grow" />

                <div className="mb-4">
                    <div className="flex items-center justify-between mb-1">
                        <p>Dana Terkumpul</p>
                        <p
                            className={`font-semibold text-lg ${
                                status === "finished"
                                    ? "text-[#138a36]"
                                    : "text-[#FFA90B]"
                            }`}
                        >
                            {formatRupiah(
                                totalFunding === null ? 0 : totalFunding,
                            )}
                        </p>
                    </div>

                    <div className="bg-gray-200 rounded-full">
                        <div
                            className="text-xs font-medium text-white text-center p-0.5 leading-none rounded-full"
                            style={{
                                width: `${percentage}%`,
                                backgroundColor: `${
                                    status === "finished"
                                        ? "#138a36"
                                        : "#e3a008"
                                }`,
                            }}
                        >
                            {percentage}%
                        </div>
                    </div>
                </div>

                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1 text-slate-700">
                        <PiUserCircleFill className="w-6 h-6" />
                        {/* total investor */}
                        <p className="font-medium">
                            {totalInvestor > 0 ? totalInvestor : 0} investor
                        </p>
                    </div>

                    {status === "soon" ? (
                        <div className="bg-[#eeeffa] text-[#5766CE] items-center justify-center rounded-3xl py-1 px-3 flex gap-1">
                            <PiCalendarDots className="-ms-[3px] w-5 h-5" />
                            <p className="font-medium">Segera</p>
                        </div>
                    ) : status === "open" ? (
                        <div className="bg-[#b8dbc2] text-[#138A36] items-center justify-center rounded-3xl py-1 px-3 flex gap-1">
                            <PiClockClockwise className="-ms-[3px] w-5 h-5" />
                            <p className="font-medium">{daysRemaining} hari</p>
                        </div>
                    ) : status === "process" ? (
                        <div className="bg-[#fff6e6] fff6e6 text-[#FFA90B] items-center justify-center rounded-3xl py-1 px-3 flex gap-1">
                            <PiClockCountdown className="-ms-[3px] w-5 h-5" />
                            <p className="font-medium">Proses</p>
                        </div>
                    ) : (
                        <div className="bg-[#dbb9b8] text-[#8a1713] items-center justify-center rounded-3xl py-1 px-3 flex gap-1">
                            <PiCalendarCheck className="-ms-[3px] w-5 h-5" />
                            <p className="font-medium">Selesai</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BatchItem;
