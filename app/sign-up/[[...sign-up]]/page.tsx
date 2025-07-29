import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-[#141414] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-black bg-opacity-80 p-8 rounded-lg">
        <h1 className="text-3xl font-bold text-white mb-8 text-center">
          Create Account
        </h1>
        <SignUp 
          appearance={{
            elements: {
              rootBox: 'w-full',
              card: 'bg-transparent shadow-none w-full',
              headerTitle: 'text-white text-2xl font-bold mb-2',
              headerSubtitle: 'text-gray-400 mb-6',
              socialButtonsBlockButton: 'border-gray-600 hover:bg-gray-800',
              dividerLine: 'bg-gray-700',
              dividerText: 'text-gray-400',
              formFieldLabel: 'text-gray-300',
              formFieldInput: 'bg-gray-700 border-gray-600 text-white rounded',
              formButtonPrimary: 'bg-red-600 hover:bg-red-700 text-sm normal-case',
              footerActionText: 'text-gray-400',
              footerActionLink: 'text-white hover:text-red-500',
            },
          }}
        />
      </div>
    </div>
  );
}
