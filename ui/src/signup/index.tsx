import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup";
import { useForceRedirect } from "../hooks/useForceRedirect";
import { signin, signup } from "../api";
import { useState } from "react";

export type Inputs = {
    email: string
    name: string
    password: string
}

const validationSchema = yup.object({
    email: yup.string().email("Must be a valid email.").required("Email is required."),
    name: yup.string().required("Name is required."),
    password: yup
        .string()
        .required("Password is required.")
        .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            `Password requirements:<br/>
            <ul class="list-disc ml-8">
                <li>Minimum length of 8 characters.</li>
                <li>Contains at least 1 letter.</li>
                <li>Contains at least 1 number.</li>
                <li>Contains at least 1 special character.</li>
            </ul>`
        )
})

export default function SignUp() {
    const [err, setErr] = useState("");
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<Inputs>({ resolver: yupResolver(validationSchema) });

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {
            setErr("")
            window.localStorage.removeItem("accessToken");
            const response = await signup(data);

            if (response && response.data['_id']) {
                const signInResponse = await signin({
                    email: data.email,
                    password: data.password,
                });

                if (signInResponse && signInResponse.data.access_token) {
                    window.localStorage.setItem('accessToken', signInResponse.data['access_token']);
                    navigate('/');
                }
            }
        } catch (error) {
            // something went wrong
            console.error(error);
            setErr('Unable to signup.');
        }
    }

    useForceRedirect();

    return <>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Sign Up
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                            Email
                        </label>
                        <div className="mt-2">
                            <input
                                id="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                {...register("email")}
                            />
                            <p className="text-red-500">{errors.email?.message}</p>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                            Name
                        </label>
                        <div className="mt-2">
                            <input
                                id="name"
                                type="text"
                                autoComplete="name"
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                {...register("name")}
                            />
                            <p className="text-red-500">{errors.name?.message}</p>
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                Password
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                                id="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                {...register("password")}
                            />
                            {errors.password && errors.password.message && <p className="text-red-500" dangerouslySetInnerHTML={{ __html: errors.password.message }}></p>}
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Sign up
                        </button>
                        <p className="text-red-500">{err}</p>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm text-gray-500">
                    Already a member?{' '}
                    <Link to="/signin" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    </>
}