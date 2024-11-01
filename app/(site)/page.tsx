import Image from "next/image";
import AuthForm from "./components/AuthForm";

export default function Home() {
  return (
    <div className="flex  min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8 bg-neutral ">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Image
          src={"/images/logo.png"}
          alt="Logo"
          height={50}
          width={50}
          className="mx-auto w-auto"
        />
        <h2
          className="
        mt-6
        text-center
        text-3xl
        font-bold
        tracking-tight
      text-neutral-content
        "
        >
          Sign in to your account!
        </h2>
      </div>

      <AuthForm />
    </div>
  );
}
