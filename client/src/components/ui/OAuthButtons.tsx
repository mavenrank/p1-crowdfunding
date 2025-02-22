import { signIn } from "next-auth/react";

const OAuthButtons = () => {
  return (
    <div className="space-y-3">
      <button onClick={() => signIn("google")} className="btn-oauth bg-red-500">
        Sign in with Google
      </button>
      <button onClick={() => signIn("facebook")} className="btn-oauth bg-blue-600">
        Sign in with Facebook
      </button>
      <button onClick={() => signIn("apple")} className="btn-oauth bg-black">
        Sign in with Apple
      </button>
    </div>
  );
};

export default OAuthButtons;