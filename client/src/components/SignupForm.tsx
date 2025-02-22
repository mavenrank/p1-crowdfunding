import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Link from "next/link";

const signUpSchema = yup.object().shape({
  fullName: yup.string().required("Full name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required(),
  confirmPassword: yup.string().oneOf([yup.ref("password")], "Passwords must match"),
  campaignTitle: yup.string().required("Campaign title is required"),
  fundraisingGoal: yup.number().positive("Goal must be a positive number").required(),
  category: yup.string().required("Select a category"),
  shortDescription: yup.string().max(200, "Max 200 characters").required(),
  story: yup.string().required("Campaign story is required"),
  coverImage: yup.mixed().required("Cover image is required"),
  videoLink: yup.string().url("Invalid URL").nullable(),
  bankAccount: yup.string().required("Bank account details are required"),
  terms: yup.bool().oneOf([true], "You must agree to the terms"),
});

const SignUpForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(signUpSchema),
  });

  const onSubmit = (data: any) => {
    console.log("Sign Up Data:", data);
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold text-center mb-6">Create a Fundraising Campaign</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Personal Details */}
        <input {...register("fullName")} placeholder="Full Name" className="input-field" />
        <p className="error">{errors.fullName?.message}</p>

        <input {...register("email")} placeholder="Email Address" className="input-field" />
        <p className="error">{errors.email?.message}</p>

        <input {...register("password")} type="password" placeholder="Password" className="input-field" />
        <p className="error">{errors.password?.message}</p>

        <input {...register("confirmPassword")} type="password" placeholder="Confirm Password" className="input-field" />
        <p className="error">{errors.confirmPassword?.message}</p>

        {/* Campaign Details */}
        <input {...register("campaignTitle")} placeholder="Campaign Title" className="input-field" />
        <p className="error">{errors.campaignTitle?.message}</p>

        <input {...register("fundraisingGoal")} type="number" placeholder="Fundraising Goal ($)" className="input-field" />
        <p className="error">{errors.fundraisingGoal?.message}</p>

        <select {...register("category")} className="input-field">
          <option value="">Select a Category</option>
          <option value="health">Health</option>
          <option value="education">Education</option>
          <option value="community">Community</option>
          <option value="technology">Technology</option>
        </select>
        <p className="error">{errors.category?.message}</p>

        <textarea {...register("shortDescription")} placeholder="Short Description (max 200 chars)" className="input-field" />
        <p className="error">{errors.shortDescription?.message}</p>

        <textarea {...register("story")} placeholder="Tell your story..." className="input-field h-32" />
        <p className="error">{errors.story?.message}</p>

        {/* Media Uploads */}
        <input type="file" {...register("coverImage")} className="input-field" />
        <p className="error">{errors.coverImage?.message}</p>

        <input {...register("videoLink")} placeholder="Video Link (optional)" className="input-field" />
        <p className="error">{errors.videoLink?.message}</p>

        {/* Banking & Payment Details */}
        <input {...register("bankAccount")} placeholder="Bank Account Details" className="input-field" />
        <p className="error">{errors.bankAccount?.message}</p>

        {/* Terms and Conditions */}
        <label className="flex items-center">
          <input type="checkbox" {...register("terms")} className="mr-2" />
          <span>I agree to the <Link href="/terms" className="text-blue-600">Terms and Conditions</Link></span>
        </label>
        <p className="error">{errors.terms?.message}</p>

        <button type="submit" className="btn-primary">Create Campaign</button>
      </form>
    </div>
  );
};

export default SignUpForm;
