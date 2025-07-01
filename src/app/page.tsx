"use client";

import { useState } from 'react';
import Link from "next/link";
import { LoginForm } from "@/components/login-form";
import { Waves, Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const translations = {
  en: {
    subtitle: "Monitoring for Hajj and Umrah Pilgrims from Indonesia",
    noAccount: "Don't have an account?",
    register: "Register",
    loginForm: {
        title: "Sign In",
        emailLabel: "Email",
        passwordLabel: "Password",
        loginButton: "Login",
    }
  },
  id: {
    subtitle: "Monitoring Jemaah Haji dan Umroh Indonesia",
    noAccount: "Belum punya akun?",
    register: "Daftar",
    loginForm: {
        title: "Masuk",
        emailLabel: "Email",
        passwordLabel: "Kata Sandi",
        loginButton: "Masuk",
    }
  },
  ar: {
    subtitle: "مراقبة حجاج العمرة والحج من إندونيسيا",
    noAccount: "ليس لديك حساب؟",
    register: "تسجيل",
    loginForm: {
        title: "تسجيل الدخول",
        emailLabel: "البريد الإلكتروني",
        passwordLabel: "كلمة المرور",
        loginButton: "تسجيل الدخول",
    }
  },
};

type Language = keyof typeof translations;


export default function Home() {
  const [lang, setLang] = useState<Language>("id");

  const t = translations[lang];

  return (
    <div className="flex min-h-screen w-full" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
        <div className="absolute top-4 right-4 z-10">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                        <Languages className="h-[1.2rem] w-[1.2rem]" />
                        <span className="sr-only">Change language</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setLang('en')}>
                        English
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setLang('id')}>
                        Indonesia
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setLang('ar')}>
                        العربية
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>

      <div className="flex flex-1 items-center justify-center p-4 lg:p-8">
        <div className="w-full max-w-md space-y-6">
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 flex items-center gap-3 text-primary">
              <Waves className="h-10 w-10" />
              <h1 className="font-headline text-4xl font-bold">Serenity</h1>
            </div>
            <p className="text-muted-foreground">
              {t.subtitle}
            </p>
          </div>
          <LoginForm translations={t.loginForm} />
          <p className="text-center text-sm text-muted-foreground">
            {t.noAccount}{" "}
            <Link
              href="/register"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              {t.register}
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
