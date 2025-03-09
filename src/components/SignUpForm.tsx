"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Link from "next/link";
import { useModal } from "@/components/ModelProvider"; // ✅ Import modal context

const signUpSchema = yup.object().shape({
  fullName: yup.string().required("Full name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required(),
  confirmPassword: yup.string().oneOf([yup.ref("password")], "Passwords must match"),
  role: yup.string().oneOf(["donor", "fundraiser"]).required("Role selection is required"), // ✅ Add role validation
  terms: yup.bool().oneOf([true], "You must agree to the terms"),
});

const SignUpForm = () => {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const modalContext = useModal();
  const openSignIn = modalContext?.openSignIn;
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(signUpSchema),
  });

  const onSubmit = async (data: any) => {
    setError("");
    setLoading(true);
    setSuccess(false);

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
      //alert("Check your email to verify your account!");
      //router.push("/signin"); // Redirect to sign in
      //openSignIn?.(); // Open sign-in modal after successful signup
      setSuccess(true); // ✅ Show success message
    }
  };

  return (
    <div className="max-w-lg mx-auto p-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold text-gray-700 text-center mb-6">Sign Up</h2>

      {error && <p className="text-red-500 text-center">{error}</p>}
      {success && (
        <div className="bg-green-100 text-green-700 p-3 rounded-md text-center">
          🎉 Sign-up successful!
          {process.env.NEXT_PUBLIC_ENABLE_EMAIL_VERIFICATION === "true" ? (
            <>
              <p>Please check your email for verification.</p>
              <p className="mt-2">Once verified, you can sign in to your account.</p>
            </>
          ) : (
            <p>You can now sign in to your account.</p>
          )}

          <div className="mt-4 flex flex-col space-y-2">
            {/* Button to Sign In */}
            <a href="/signin" className="block w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
              🔑 Go to Sign In
            </a>

            {/* Button to Return to Landing Page */}
            <a href="/" className="block w-full bg-gray-600 text-white py-2 rounded-md hover:bg-gray-700">
              🏠 Return to Home
            </a>
          </div>
        </div>
      )}

      {!success && (
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
            <input {...register("email")} type="email" className="w-full p-2 border rounded text-gray-900 focus:text-blue-900" />
            <p className="text-red-500 text-sm">{errors.email?.message}</p>
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 font-semibold">Password</label>
            <input {...register("password")} type="password" className="w-full p-2 border rounded text-gray-900 focus:text-blue-900" />
            <p className="text-red-500 text-sm">{errors.password?.message}</p>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-gray-700 font-semibold">Confirm Password</label>
            <input {...register("confirmPassword")} type="password" className="w-full p-2 border rounded text-gray-900 focus:text-blue-900" />
            <p className="text-red-500 text-sm">{errors.confirmPassword?.message}</p>
          </div>

          {/* 🔹 Role Selection (Fundraiser or Donor) */}
          <div>
            <label className="block text-gray-700 font-semibold">Sign Up As</label>
            <select {...register("role")} className="w-full p-2 border rounded text-gray-900">
              <option value="">Select Role</option>
              <option value="fundraiser">Fund Raiser</option>
              <option value="donor">Donor</option>
            </select>
            <p className="text-red-500 text-sm">{errors.role?.message}</p>
          </div>

          {/* Terms and Conditions */}
          <div className="flex items-center">
            <input type="checkbox" {...register("terms")} className="mr-2" />
            <span className="text-gray-700">I agree to the <Link href="/terms" className="text-blue-600">Terms and Conditions</Link></span>
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
          <p className="text-center mt-2 text-gray-700" >
            Already have an account?
            {/*<Link href="/signin" className="text-blue-600 hover:underline">Sign In</Link> */}
            <button className="text-blue-600 hover:underline" onClick={openSignIn}>Sign In</button>
          </p>
        </form>
      )}
    </div>
  );
};

export default SignUpForm;