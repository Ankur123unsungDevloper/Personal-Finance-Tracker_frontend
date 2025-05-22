import Image from "next/image";

export default function AuthLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      <div className="h-full lg:flex flex-col items-center justify-center px-4">
        <div className="text-center space-y-4 pt-16">
          <h1 className="font-bold text-3xl text-[#2E2A47]">
            Welcome Back to our platform!
          </h1>
          <p className="text-base text-[#7ECA0]">
            Log in to get back to your dashboard!
          </p>
        </div>
        {children}
      </div>
      <div className="h-full bg-blue-600 hidden lg:flex items-center justify-center">
        <Image
          src="/logo.svg"
          height={100}
          width={100}
          alt="logo"
        />
      </div>
    </div>
  );
}