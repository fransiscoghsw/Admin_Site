import Input from "../components/common/Input";
import InputError from "../components/common/InputError";
import Label from "../components/common/Label";
import { useState } from "react";
import { Link } from "react-router-dom";
import { LuArrowLeft, LuKey, LuMailCheck } from "react-icons/lu";
import { useFormik } from "formik";
import apiAdmin from "../lib/axios";
import * as Yup from "yup";

const UserLupaPassword = () => {
    const [emailSent, setEmailSent] = useState(false);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const forgotPasswordAdmin = async () => {
        setIsLoading(true);

        try {
            const response = await axiosInstance.fetch(
                "/auth/admin/request-password-reset",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email: formik.values.email }),
                },
            );

            if (response.ok) {
                setEmailSent(true);
            } else {
                setError("Email admin tidak ditemukan");
            }
        } catch (err) {
            setError("Terjadi kesalahan. Silakan coba lagi nanti.");
            console.error("Fetch error: ", err);
        } finally {
            setIsLoading(false);
        }
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email(
                "Email tidak valid. Harap masukkan email yang benar (contoh: user@example.test)",
            )
            .required("Email wajib diisi"),
    });

    const formik = useFormik({
        initialValues: {
            email: "",
        },
        onSubmit: forgotPasswordAdmin,
        validationSchema: validationSchema,
        validateOnChange: true,
        validateOnBlur: true,
    });

    return (
        <div className="absolute inset-0 w-full h-full bg-cover bg-center bg-[#000080]">
            <div className="relative flex flex-col items-center justify-center mx-auto min-h-screen w-[90%] lg:w-full z-10">
                <div className="w-full lg:w-1/2 p-8 bg-white rounded-lg">
                    <div className="flex flex-col justify-center items-center">
                        {!emailSent ? (
                            <>
                                <div className="bg-[#DBD3D1] border-[10px] border-[#EDE9E8] rounded-full w-20 h-20 p-[12px] mb-4 overflow-hidden">
                                    <LuKey className="w-full h-full text-[#000080] object-cover" />
                                </div>
                                <h2 className="font-bold text-2xl mb-2">
                                    Lupa kata sandi?
                                </h2>
                                <p className="text-gray-600 text-center px-10">
                                    Jangan khawatir! Hal ini bisa terjadi.
                                    Silakan masukkan email yang terkait dengan
                                    akun Anda untuk mengatur ulang kata sandi.
                                </p>

                                <form
                                    className="w-full mt-4"
                                    onSubmit={formik.handleSubmit}
                                >
                                    <Label value={"Email"} htmlFor={"email"} />
                                    <Input
                                        name="email"
                                        type="text"
                                        variant="primary-outline"
                                        placeholder="Masukkan email.."
                                        handleChange={formik.handleChange}
                                        isError={
                                            !!formik.errors.email &&
                                            formik.touched.email
                                        }
                                        isFocused
                                    />
                                    <InputError
                                        message={
                                            formik.touched.email
                                                ? formik.errors.email
                                                : ""
                                        }
                                    />

                                    {error && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {error}
                                        </p>
                                    )}
                                    <button
                                        type="submit"
                                        className={`bg-[#000080] flex items-center justify-center text-white font-bold py-2 px-4 rounded-2xl focus:outline-none focus:shadow-outline w-full mt-6 ease-in-out duration-300 ${
                                            isLoading
                                                ? "opacity-75 cursor-not-allowed"
                                                : "hover:bg-[#381b13]"
                                        }`}
                                        disabled={isLoading}
                                    >
                                        {isLoading ? (
                                            <>
                                                <svg
                                                    className="animate-spin mr-3 h-5 w-5 text-white"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <circle
                                                        className="opacity-25"
                                                        cx="12"
                                                        cy="12"
                                                        r="10"
                                                        stroke="currentColor"
                                                        strokeWidth="4"
                                                    ></circle>
                                                    <path
                                                        className="opacity-75"
                                                        fill="currentColor"
                                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                    ></path>
                                                </svg>
                                                Mengirim...
                                            </>
                                        ) : (
                                            "Kirim"
                                        )}
                                    </button>
                                </form>
                                <div className="text-center mt-5">
                                    <Link
                                        to="/masuk"
                                        className="font-medium text-[#000080] hover:text-[#381b13] flex items-center gap-2"
                                    >
                                        <LuArrowLeft />
                                        <p>Kembali untuk Masuk</p>
                                    </Link>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="bg-[#DBD3D1] border-[10px] border-[#EDE9E8] rounded-full w-20 h-20 p-[12px] mb-4 overflow-hidden">
                                    <LuMailCheck className="w-full h-full text-[#000080] object-cover" />
                                </div>
                                <h2 className="font-bold text-2xl mb-2">
                                    Cek email Anda
                                </h2>
                                <p className="text-gray-600 text-center px-10">
                                    Kami telah mengirimkan tautan verifikasi ke
                                    email {""}
                                    <span className="font-semibold">
                                        {formik.values.email}
                                    </span>
                                    . Silakan cek email Anda untuk melanjutkan
                                    proses pengaturan ulang kata sandi.
                                </p>

                                <Link
                                    to={"https://mail.google.com/"}
                                    target="_blank"
                                    className="text-center bg-[#000080] hover:bg-[#381b13] ease-in-out duration-300 text-white font-bold py-2 rounded-2xl focus:outline-none focus:shadow-outline w-full mt-8"
                                >
                                    Buka aplikasi Email
                                </Link>

                                <div className="text-center mt-5">
                                    <Link
                                        to="/masuk"
                                        className="font-medium text-[#000080] hover:text-[#381b13] flex items-center gap-2"
                                    >
                                        <LuArrowLeft />
                                        <p>Kembali untuk Masuk</p>
                                    </Link>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserLupaPassword;
