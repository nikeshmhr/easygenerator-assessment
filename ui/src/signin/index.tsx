import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup";
import { signin } from "../api";
import { useState } from "react";
import { useForceRedirect } from "../hooks/useForceRedirect";

export type Inputs = {
    email: string
    password: string
}

const validationSchema = yup.object({
    email: yup.string().email("Must be a valid email.").required("Email is required."),
    password: yup.string().required("Password is required.")
})

export default function SignIn() {
    const navigate = useNavigate();
    const [loginErr, setLoginErr] = useState('');

    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>({ resolver: yupResolver(validationSchema) });

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {
            setLoginErr("");
            const response = await signin({ ...data });

            if (response && response.data['access_token']) {
                window.localStorage.setItem('accessToken', response.data['access_token']);
                navigate('/');
            }
        } catch (err) {
            setLoginErr("Incorrect email or password.");
        }
    }

    // Force redirect to welcome page if loggedin
    useForceRedirect();

    return <>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Sign In
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
                            <p className="text-red-500">{errors.password?.message}</p>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Sign in
                        </button>
                        <p className="text-red-500">{loginErr}</p>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm text-gray-500">
                    Not a member?{' '}
                    <Link to="/signup" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    </>
}