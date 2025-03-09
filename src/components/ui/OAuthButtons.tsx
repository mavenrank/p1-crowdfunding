import { signIn } from "next-auth/react";

const OAuthButtons = () => {
  return (
    <div className="space-y-3">
      <button onClick={() => signIn("google")} className="w-full flex items-center justify-center gap-2 p-3 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-100">
        Sign in with Google
      </button>
      <button onClick={() => signIn("facebook")} className="w-full flex items-center justify-center gap-2 p-3 rounded-md bg-[#1877F2] text-white hover:bg-[#165dbb]">
        Sign in with Facebook
      </button>
      <button onClick={() => signIn("apple")} className="w-full flex items-center justify-center gap-2 p-3 rounded-md bg-black text-white hover:bg-gray-900">
        Sign in with Apple
      </button>
    </div>
  );
};

export default OAuthButtons;