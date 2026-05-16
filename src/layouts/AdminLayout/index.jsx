import { useState, useContext } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
// import MobileSidebar from "./MobileSidebar"; // Import MobileSidebar component
import { ToastContainer } from "../../utils/toast";
import { Helmet } from "react-helmet-async";
import PropTypes from "prop-types";
import { AuthAdminContext } from "../../contexts/AuthAdminProvider";

const AdminLayout = (props) => {
    const { pageTitle, children } = props;
    const { admin } = useContext(AuthAdminContext);
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className="bg-white min-h-screen h-full py-5 px-6">
            <ToastContainer limit={3} />

            <Helmet>
                <title>
                    {pageTitle ? `${pageTitle} | Admin PT SQI` : `Admin PT SQI`}
                </title>
            </Helmet>

            {/* Sidebar for Desktop */}
            <div className="hidden lg:block">
                <Sidebar
                    userRole={admin.role}
                    isHovered={isHovered}
                    setIsHovered={setIsHovered}
                />
            </div>

            {/* MobileSidebar for Mobile */}
            {/* <div className="lg:hidden">
                <MobileSidebar
                    isHovered={isHovered}
                    setIsHovered={setIsHovered}
                />
            </div> */}

            {/* Main content section */}
            <div
                className={`transition-all duration-300 ease-in-out ${
                    isHovered
                        ? "md:ml-[17rem] sm:ml-0" // Jika hovered, margin kiri 17rem pada layar md dan lebih besar, 0 pada layar kecil
                        : "md:ml-24 sm:ml-0" // Jika tidak hovered, margin kiri 24 pada layar md dan lebih besar, 0 pada layar kecil
                }`}
            >
                <div className="flex flex-col gap-8">
                    <Navbar title={pageTitle} />
                    {children}
                </div>
            </div>
        </div>
    );
};

AdminLayout.propTypes = {
    pageTitle: PropTypes.string,
    children: PropTypes.node.isRequired,
};

export default AdminLayout;
