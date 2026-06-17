import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
// import LogogramPutih from "../../assets/images/Logogram Putih.svg";
import Logo from "../../assets/images/logo.png";
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";
import { PiCircleThin } from "react-icons/pi";
import { menuItems } from "./MenuSidebar";

const Sidebar = ({ userRole, isHovered, setIsHovered }) => {
    const [activeMenus, setActiveMenus] = useState({});
    const location = useLocation();

    const toggleMenu = (menuName) => {
        setActiveMenus((prev) => ({
            ...prev,
            [menuName]: !prev[menuName],
        }));
    };

    const isSubMenuActive = (subMenu) => {
        return subMenu.some((item) =>
            item.path
                ? location.pathname === item.path
                : item.subMenu && isSubMenuActive(item.subMenu),
        );
    };

    const renderMenu = (items, parentName = "") => {
        return (
            <ul className="space-y-2 font-medium">
                {items.map((item, index) => {
                    if (!item.roles.includes(userRole)) return null;

                    const menuKey = `${parentName}-${item.name}`;
                    const isActive =
                        location.pathname === item.path ||
                        (item.subMenu && isSubMenuActive(item.subMenu));

                    return (
                        <li key={index}>
                            {item.subMenu ? (
                                <button
                                    type="button"
                                    className={`flex my-2 p-2 w-full items-center rounded-lg ${
                                        isActive
                                            ? "bg-[#ffffff1a] text-white"
                                            : "text-gray-900 hover:bg-[#ffffff1a]"
                                    }`}
                                    onClick={() => toggleMenu(menuKey)}
                                >
                                    <span className="">
                                        {item.icon || (
                                            <PiCircleThin className="flex-shrink-0 w-7 h-7 text-white bg-transparent" />
                                        )}
                                    </span>
                                    <span
                                        className={`ms-3 text-sm text-white whitespace-nowrap transition-all duration-300 ease-in-out ${
                                            isHovered
                                                ? "translate-x-0 opacity-100"
                                                : "-translate-x-10 opacity-0"
                                        }`}
                                    >
                                        {item.name}
                                    </span>
                                    <span className="ms-auto">
                                        {activeMenus[menuKey] ? (
                                            <IoIosArrowDown className="w-6 h-6 text-white" />
                                        ) : (
                                            <IoIosArrowForward className="w-6 h-6 text-white" />
                                        )}
                                    </span>
                                </button>
                            ) : (
                                <NavLink
                                    to={item.path}
                                    className={({ isActive }) =>
                                        isActive
                                            ? "flex p-2 items-center text-white rounded-lg bg-[#ffffff1a]"
                                            : "flex p-2 items-center text-gray-900 rounded-lg hover:bg-[#ffffff1a]"
                                    }
                                >
                                    <span className="text-xl">
                                        {item.icon || (
                                            <PiCircleThin className="flex-shrink-0 w-7 h-7 text-white bg-transparent" />
                                        )}
                                    </span>
                                    <span
                                        className={`ms-3 text-sm text-white flex-1 whitespace-nowrap transition-all duration-300 ease-in-out ${
                                            isHovered
                                                ? "translate-x-0 opacity-100"
                                                : "-translate-x-10 opacity-0"
                                        }`}
                                    >
                                        {item.name}
                                    </span>
                                </NavLink>
                            )}
                            {item.subMenu && activeMenus[menuKey] && (
                                <div className="ms-2">
                                    {renderMenu(item.subMenu, menuKey)}
                                </div>
                            )}
                        </li>
                    );
                })}
            </ul>
        );
    };

    return (
        <aside
            id="sidebar-multi-level-sidebar"
            className={`px-4 py-5 fixed top-0 left-0 z-10 h-screen transition-width duration-300 ease-in-out group ${
                isHovered ? "w-72" : "w-28"
            }`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            aria-label="Sidebar"
        >
            <div className="h-full overflow-y-auto overflow-x-hidden flex flex-col px-3 py-10 bg-[#000080] rounded-2xl shadow-2xl custom-scrollbar">
                <NavLink
                    to="/dashboard"
                    className="flex items-center justify-center w-full mb-6 transition-all duration-300 ease-in-out"
                >
                    <div className="mx-auto">
                        <img
                            src={Logo}
                            alt="Logo"
                            className={`rounded-full bg-white shadow-xl shadow-black/25 object-contain ${
                                isHovered ? "h-20 w-20" : "h-10 w-10"
                            }`}
                        />
                    </div>
                </NavLink>
                {renderMenu(menuItems)}
            </div>
        </aside>
    );
};

export default Sidebar;
