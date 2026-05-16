// import GuestLayouts from "../layouts/GuestLayouts";
import Image404 from "../assets/images/404-not-found.svg";

const ErrorPage = () => {
    return (
        <div className="bg-[#FAEFE4] py-12 lg:py-16">
            <div className="flex flex-col items-center">
                <div className="text-center text-black space-y-2 mb-4">
                    <h2 className="text-3xl font-semibold">
                        Opss... gak ketemu nih🔎
                    </h2>
                    <p>
                        Aku sudah coba cari kemana-mana, tapi sepertinya halaman
                        yang kamu tuju tidak ada.
                    </p>
                </div>
                <div className="w-[30rem] p-5 rounded-2xl">
                    <img src={Image404} alt="..." className="w-full h-full" />
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;
