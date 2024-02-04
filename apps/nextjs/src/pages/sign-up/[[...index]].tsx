import { SignUp } from "@clerk/nextjs";
import { PageLayout } from "../../components/Layout";

const SignUpPage = () => (
  <PageLayout>
    <div
      className="flex h-full flex-col items-center justify-center gap-4"
      style={{
        background: "url('/images/login-background.jpg') no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-8">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          Sign Up
        </h1>
        <SignUp path="/sign-up" routing="path" signInUrl="/sign-in" />
      </div>
    </div>
  </PageLayout>
);

export default SignUpPage;
