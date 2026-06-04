import Logo from "../assets/images/logo.png";
import Label from "../components/common/Label";
import Input from "../components/common/Input";
import InputError from "../components/common/InputError";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { login } from "../services/auth.service";
import * as Yup from "yup";

const Login = () => {
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const loginAdmin = async (values) => {
        setError("");
        try {
            const response = await login(values);

            // Check user role and navigate accordingly
            const userRole = response?.data?.user?.role || response?.user?.role;

            if (userRole === "Public Relation") {
                navigate("/cms/artikel");
            } else {
                navigate("/dashboard");
            }
        } catch (error) {
            if (error.response) {
                setError(error.response.data.message);
            } else {
                setError("Terjadi kesalahan!");
            }
        }
    };

    const validationSchema = Yup.object().shape({
        usernameOrEmail: Yup.string().required(
            "Username atau email wajib diisi",
        ),
        password: Yup.string().required("Password wajib diisi"),
    });

    const formik = useFormik({
        initialValues: {
            usernameOrEmail: "",
            password: "",
        },
        onSubmit: loginAdmin,
        validationSchema: validationSchema,
    });

    return (
        <div className="absolute inset-0 w-full h-full bg-cover bg-center bg-[#000080]">
            <div className="relative flex flex-col items-center justify-center mx-auto min-h-screen w-[90%] lg:w-full z-10">
                <div className="w-full lg:w-1/2 p-8 bg-white rounded-lg">
                    <div className="flex items-center justify-center mb-10">
                        <img
                            src={Logo}
                            alt="Logo"
                            className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 object-contain mr-4"
                        />
                    </div>
                    <form onSubmit={formik.handleSubmit}>
                        <div>
                            <Label
                                value="Username/Email"
                                htmlFor="usernameOrEmail"
                            />
                            <Input
                                name="usernameOrEmail"
                                type="text"
                                variant="primary-outline"
                                placeholder="Masukkan username/email.."
                                handleChange={formik.handleChange}
                                isError={
                                    formik.touched.usernameOrEmail &&
                                    !!formik.errors.usernameOrEmail
                                }
                                isFocused
                            />
                            <InputError
                                message={
                                    formik.touched.usernameOrEmail &&
                                    formik.errors.usernameOrEmail
                                }
                            />
                        </div>
                        <div>
                            <Label value="Kata Sandi" htmlFor="password" />
                            <Input
                                name="password"
                                type="password"
                                variant="primary-outline"
                                placeholder="Masukkan kata sandi.."
                                handleChange={formik.handleChange}
                                isError={
                                    formik.touched.password &&
                                    !!formik.errors.password
                                }
                            />
                            <InputError
                                message={
                                    formik.touched.password &&
                                    formik.errors.password
                                }
                            />
                            {/* <div className="flex justify-end">
                                <Link
                                    to="/admin/lupa-password"
                                    className="text-[#000080] hover:text-[#381b13] text-right block font-semibold mt-1"
                                >
                                    Lupa kata sandi?
                                </Link>
                            </div> */}
                        </div>
                        <div className="mt-4">
                            <button
                                type="submit"
                                className="bg-[#000080] hover:bg-[#381b13] ease-in-out duration-300 text-white font-bold py-2 px-4 rounded-2xl focus:outline-none focus:shadow-outline w-full"
                            >
                                Masuk
                            </button>
                        </div>
                        <InputError message={error} className="text-center" />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
