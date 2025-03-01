"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Link from "next/link";
import { useModal } from "@/components/ModalProvider"; // ✅ Import modal context

const signUpSchema = yup.object().shape({
  fullName: yup.string().required("Full name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required(),
  confirmPassword: yup.string().oneOf([yup.ref("password")], "Passwords must match"),
  terms: yup.bool().oneOf([true], "You must agree to the terms"),
});

const SignUpForm = () => {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const modalContext = useModal();
  const openSignIn = modalContext?.openSignIn;
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(signUpSchema),
  });

  const onSubmit = async (data: any) => {
    setError("");
    setLoading(true);

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const responseData = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(responseData.error);
    } else {
      alert("Check your email to verify your account!");
      openSignIn?.(); // Open sign-in modal after successful signup
    }
  };

  return (
    <div className="max-w-lg mx-auto p-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold text-gray-700 text-center mb-6">Sign Up</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Full Name */}
        <div>
          <label className="block text-gray-700 font-semibold">Full Name</label>
          <input {...register("fullName")} className="w-full p-2 border text-black rounded" />
          <p className="text-red-500 text-sm">{errors.fullName?.message}</p>
        </div>

        {/* Email */}
        <div>
          <label className="block text-gray-700 font-semibold">Email Address</label>
          <input {...register("email")} type="email" className="w-full p-2 border rounded" />
          <p className="text-red-500 text-sm">{errors.email?.message}</p>
        </div>

        {/* Password */}
        <div>
          <label className="block text-gray-700 font-semibold">Password</label>
          <input {...register("password")} type="password" className="w-full p-2 border rounded" />
          <p className="text-red-500 text-sm">{errors.password?.message}</p>
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-gray-700 font-semibold">Confirm Password</label>
          <input {...register("confirmPassword")} type="password" className="w-full p-2 border rounded" />
          <p className="text-red-500 text-sm">{errors.confirmPassword?.message}</p>
        </div>

        {/* Terms and Conditions */}
        <div className="flex items-center">
          <input type="checkbox" {...register("terms")} className="mr-2" />
          <span>I agree to the <Link href="/terms" className="text-blue-600">Terms and Conditions</Link></span>
        </div>
        <p className="text-red-500 text-sm">{errors.terms?.message}</p>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded-md font-semibold hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </button>

        {/* Already have an account? */}
        <p className="text-center mt-2">
          Already have an account?
          {/*<Link href="/signin" className="text-blue-600 hover:underline">Sign In</Link> */}
          <button className="text-blue-600 hover:underline" onClick={openSignIn}>Sign In</button>
        </p>
      </form>
    </div>
  );
};

export default SignUpForm;