import Label from "../components/common/Label";
import Input from "../components/common/Input";
import InputError from "../components/common/InputError";
import Alert from "../components/common/Alert";
// import PasswordValidation from "../../components/guest/PasswordValidation";
import { resetPasswordAdmin } from "../services/admin.service";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LuArrowLeft, LuKey, LuMailCheck } from "react-icons/lu";
import { useFormik } from "formik";
import * as Yup from "yup";

const UserResetPassword = () => {
    const [isPasswordReset, setIsPasswordReset] = useState(false);
    const [token, setToken] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // Extract token from URL query parameters
        const searchParams = new URLSearchParams(location.search);
        const tokenParam = searchParams.get("token");

        if (!tokenParam) {
            // Redirect to login if no token is present
            navigate("/masuk");
            return;
        }

        setToken(tokenParam);
        // Reset error message when token changes
        setErrorMessage("");
    }, [location, navigate]);

    const handleResetPasswordAdmin = (values) => {
        setErrorMessage(""); // Reset error message on new submission
        setIsLoading(true);

        const data = {
            token: token,
            newPassword: values.password,
        };

        setTimeout(() => {
            resetPasswordAdmin(
                data,
                (response) => {
                    setIsPasswordReset(true);
                    setIsLoading(false);
                },
                (error) => {
                    setErrorMessage(
                        "Token mengatur ulang kata sandi tidak valid atau kadaluwarsa.",
                    );
                    setIsLoading(false);
                },
            );
        }, 2000);
    };

    const validationSchema = Yup.object().shape({
        password: Yup.string()
            .min(8, "Password harus terdiri dari minimal 8 karakter")
            .matches(/[0-9]/, "Password harus terdiri dari minimal 1 angka")
            .matches(
                /[A-Z]/,
                "Password harus terdiri dari minimal 1 huruf besar",
            )
            .matches(
                /[a-z]/,
                "Password harus terdiri dari minimal 1 huruf kecil",
            )
            .matches(
                /[^\w]/,
                "Password harus mengandung minimal satu simbol (@!$%*?&)",
            )
            .required("Password wajib diisi"),
        confirm_password: Yup.string()
            .oneOf(
                [Yup.ref("password")],
                "Konfirmasi password harus cocok dengan password",
            )
            .required("Konfirmasi password wajib diisi"),
    });

    const formik = useFormik({
        initialValues: {
            password: "",
            confirm_password: "",
        },
        onSubmit: handleResetPasswordAdmin,
        validationSchema: validationSchema,
        validateOnChange: true,
        validateOnBlur: true,
    });

    return (
        <div className="absolute inset-0 w-full h-full bg-cover bg-center bg-[#000080]">
            <div className="relative flex flex-col items-center justify-center mx-auto min-h-screen w-[90%] lg:w-full z-10">
                <div className="w-full lg:w-1/2 p-8 bg-white rounded-lg">
                    <div className="flex flex-col justify-center items-center">
                        {!isPasswordReset ? (
                            <>
                                <div className="bg-[#DBD3D1] border-[10px] border-[#EDE9E8] rounded-full w-20 h-20 p-[12px] mb-4 overflow-hidden">
                                    <LuKey className="w-full h-full text-[#000080] object-cover" />
                                </div>
                                <h2 className="font-bold text-2xl mb-2">
                                    Atur ulang kata sandi
                                </h2>
                                <p className="text-gray-600 text-center px-20 mb-4">
                                    Silakan masukkan kata sandi baru dan
                                    konfirmasi kata sandi untuk mengatur ulang
                                    kata sandi.
                                </p>

                                {errorMessage && (
                                    <Alert
                                        message={errorMessage}
                                        type="danger"
                                        width={"max-w-full"}
                                    />
                                )}

                                <form
                                    className="w-full"
                                    onSubmit={formik.handleSubmit}
                                >
                                    <div>
                                        <Label
                                            value={"Kata Sandi Baru"}
                                            htmlFor={"password"}
                                        />
                                        <Input
                                            name="password"
                                            type="password"
                                            variant="primary-outline"
                                            placeholder="Masukkan password.."
                                            handleChange={formik.handleChange}
                                            isError={
                                                !!formik.errors.password &&
                                                formik.touched.password
                                            }
                                            isFocused
                                        />
                                        {formik.errors.password &&
                                        formik.errors.password.includes(
                                            "Password wajib diisi",
                                        ) ? (
                                            <InputError
                                                message={
                                                    formik.touched.password
                                                        ? formik.errors.password
                                                        : ""
                                                }
                                            />
                                        ) : null}
                                    </div>
                                    <div>
                                        <Label
                                            value={"Konfirmasi Kata Sandi Baru"}
                                            htmlFor={"confirm_password"}
                                        />
                                        <Input
                                            name="confirm_password"
                                            type="password"
                                            variant="primary-outline"
                                            placeholder="Masukkan konfirmasi kata sandi baru.."
                                            handleChange={formik.handleChange}
                                            isError={
                                                !!formik.errors
                                                    .confirm_password &&
                                                formik.touched.confirm_password
                                            }
                                        />
                                        {formik.errors.confirm_password &&
                                        formik.errors.confirm_password.includes(
                                            "Konfirmasi password wajib diisi",
                                        ) ? (
                                            <InputError
                                                message={
                                                    formik.touched
                                                        .confirm_password
                                                        ? formik.errors
                                                              .confirm_password
                                                        : ""
                                                }
                                            />
                                        ) : null}
                                    </div>

                                    <PasswordValidation
                                        password={formik.values.password}
                                        confirmPassword={
                                            formik.values.confirm_password
                                        }
                                    />

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
                                                Menyimpan...
                                            </>
                                        ) : (
                                            "Simpan Kata Sandi Baru"
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
                                    Kata sandi diperbarui
                                </h2>
                                <p className="text-gray-600 text-center px-20 mb-8">
                                    Kata sandi Anda telah berhasil diperbarui.
                                    Klik tombol di bawah untuk kembali ke
                                    halaman masuk.
                                </p>

                                <Link
                                    to={"/masuk"}
                                    className="text-center bg-[#000080] hover:bg-[#381b13] ease-in-out duration-300 text-white font-bold py-2 rounded-2xl focus:outline-none focus:shadow-outline w-full"
                                >
                                    Masuk
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserResetPassword;
