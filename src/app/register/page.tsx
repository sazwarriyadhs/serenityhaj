import Link from "next/link";
import { RegisterForm } from "@/components/register-form";
import { Waves } from "lucide-react";

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center p-4 lg:p-8">
      <div className="w-full max-w-md space-y-6">
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 flex items-center gap-3 text-primary">
            <Waves className="h-10 w-10" />
            <h1 className="font-headline text-4xl font-bold">Create Account</h1>
          </div>
          <p className="text-muted-foreground">
            Enter your details to join Serenity Monitor
          </p>
        </div>
        <RegisterForm />
        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/"
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
