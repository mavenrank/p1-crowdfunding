export default function VerifyEmailPage() {
    return (
        <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg text-center">
            <h2 className="text-2xl font-bold text-center mb-4">Email Verification</h2>
            <p className="text-gray-600">✅ Your email has been verified successfully!</p>
            <a href="/signin" className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded-md">
                Go to Sign In
            </a>
        </div>
    );
}