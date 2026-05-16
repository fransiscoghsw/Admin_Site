import { BiCheck, BiX } from "react-icons/bi";
import { AiOutlineClockCircle } from "react-icons/ai";
import PropTypes from "prop-types";

const StatusBadge = ({ status, type = "investment" }) => {
  let badgeText = "";
  let badgeClass = "";
  let Icon = null;

  if (type === "investment") {
    // Handle Investment Status (true/false)
    const isActive = Boolean(status); // Convert to boolean

    if (isActive) {
      badgeText = "Aktif";
      badgeClass = "bg-green-100 text-green-800";
      Icon = BiCheck;
    } else {
      badgeText = "Tidak Aktif";
      badgeClass = "bg-red-100 text-red-800";
      Icon = BiX;
    }
  } else {
    // Handle Transaction Status (process/success/failed)
    switch (status?.toLowerCase()) {
      case "process":
        badgeText = "Diproses";
        badgeClass = "bg-yellow-100 text-yellow-800";
        Icon = AiOutlineClockCircle;
        break;
      case "success":
        badgeText = "Berhasil";
        badgeClass = "bg-green-100 text-green-800";
        Icon = BiCheck;
        break;
      case "failed":
        badgeText = "Gagal";
        badgeClass = "bg-red-100 text-red-800";
        Icon = BiX;
        break;
      default:
        badgeText = "Unknown";
        badgeClass = "bg-gray-100 text-gray-800";
        Icon = AiOutlineClockCircle;
    }
  }

  return (
    <span
      className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-0.5 rounded-full ${badgeClass}`}
    >
      {Icon && <Icon className="w-3.5 h-3.5" />}
      {badgeText}
    </span>
  );
};

StatusBadge.propTypes = {
  status: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
  ]),
  type: PropTypes.oneOf(["investment", "transaction"]),
};

export default StatusBadge;
