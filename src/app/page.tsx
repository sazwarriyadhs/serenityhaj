import Link from "next/link";
import { LoginForm } from "@/components/login-form";
import { Waves } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen w-full">
      <div className="flex flex-1 items-center justify-center p-4 lg:p-8">
        <div className="w-full max-w-md space-y-6">
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 flex items-center gap-3 text-primary">
              <Waves className="h-10 w-10" />
              <h1 className="font-headline text-4xl font-bold">Serenity</h1>
            </div>
            <p className="text-muted-foreground">
              Monitoring Jemaah Haji dan Umroh Indonesia
            </p>
          </div>
          <LoginForm />
          <p className="text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
      <div className="hidden lg:flex lg:flex-1 bg-primary">
        <img
            src="https://placehold.co/1080x1920.png"
            alt="Pilgrims at Kaaba"
            className="h-full w-full object-cover"
            data-ai-hint="pilgrims kaaba"
        />
      </div>
    </div>
  );
}
