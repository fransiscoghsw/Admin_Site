import { useMemo } from "react";
import { PiCheckBold, PiClockCountdownBold, PiXBold } from "react-icons/pi";
import PropTypes from "prop-types";

const StatusBadge = ({ status }) => {
  const badgeContent = useMemo(() => {
    const statusLower = status?.toLowerCase();

    switch (statusLower) {
      case "berhasil":
        return {
          bgColor: "bg-[#E7F3EA]",
          textColor: "text-[#138A36]",
          icon: <PiCheckBold className="w-[14px] h-[14px]" />,
          label: "Berhasil",
        };
      case "gagal":
        return {
          bgColor: "bg-[#FCE8EA]",
          textColor: "text-[#E71D36]",
          icon: <PiXBold className="w-[14px] h-[14px]" />,
          label: "Gagal",
        };
      case "proses":
        return {
          bgColor: "bg-slate-100",
          textColor: "text-slate-600",
          icon: <PiClockCountdownBold className="w-4 h-w-4" />,
          label: "Proses",
        };
      default:
        return {
          bgColor: "bg-gray-100",
          textColor: "text-gray-600",
          icon: <PiClockCountdownBold className="w-4 h-w-4" />,
          label: status || "Unknown",
        };
    }
  }, [status]);

  if (!status) return <span className="text-gray-400">No status</span>;

  return (
    <div
      className={`flex items-center w-fit gap-[5px] justify-between px-2 rounded-3xl font-medium ${badgeContent.bgColor} ${badgeContent.textColor}`}
    >
      {badgeContent.icon}
      <p>{badgeContent.label}</p>
    </div>
  );
};

StatusBadge.propTypes = {
  status: PropTypes.string,
};

export default StatusBadge;
