"use client";

import { useState } from 'react';
import Link from "next/link";
import { RegisterForm } from "@/components/register-form";
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
    pageTitle: "Create Account",
    pageSubtitle: "Enter your details to join Serenity Monitor",
    hasAccount: "Already have an account?",
    login: "Login",
    registerForm: {
      title: "Get Started",
      fullNameLabel: "Full Name",
      emailLabel: "Email",
      passwordLabel: "Password",
      roleLabel: "I am a...",
      rolePilgrim: "Pilgrim",
      roleFamily: "Family Member",
      roleAgent: "Travel Agent",
      submitButton: "Create Account",
    },
  },
  id: {
    pageTitle: "Buat Akun",
    pageSubtitle: "Masukkan detail Anda untuk bergabung dengan Serenity Monitor",
    hasAccount: "Sudah punya akun?",
    login: "Masuk",
    registerForm: {
      title: "Mulai",
      fullNameLabel: "Nama Lengkap",
      emailLabel: "Email",
      passwordLabel: "Kata Sandi",
      roleLabel: "Saya adalah...",
      rolePilgrim: "Jemaah",
      roleFamily: "Anggota Keluarga",
      roleAgent: "Agen Perjalanan",
      submitButton: "Buat Akun",
    },
  },
  ar: {
    pageTitle: "إنشاء حساب",
    pageSubtitle: "أدخل بياناتك للانضمام إلى Serenity Monitor",
    hasAccount: "هل لديك حساب بالفعل؟",
    login: "تسجيل الدخول",
    registerForm: {
      title: "ابدأ",
      fullNameLabel: "الاسم الكامل",
      emailLabel: "البريد الإلكتروني",
      passwordLabel: "كلمة المرور",
      roleLabel: "أنا...",
      rolePilgrim: "حاج",
      roleFamily: "فرد من العائلة",
      roleAgent: "وكيل سفر",
      submitButton: "إنشاء حساب",
    },
  },
};

type Language = keyof typeof translations;

export default function RegisterPage() {
    const [lang, setLang] = useState<Language>('id');

    const t = translations[lang];

    return (
        <div className="flex min-h-screen w-full items-center justify-center p-4 lg:p-8" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
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
            <div className="w-full max-w-md space-y-6">
                <div className="flex flex-col items-center text-center">
                    <div className="mb-4 flex items-center gap-3 text-primary">
                        <Waves className="h-10 w-10" />
                        <h1 className="font-headline text-4xl font-bold">{t.pageTitle}</h1>
                    </div>
                    <p className="text-muted-foreground">
                        {t.pageSubtitle}
                    </p>
                </div>
                <RegisterForm translations={t.registerForm} />
                <p className="text-center text-sm text-muted-foreground">
                    {t.hasAccount}{" "}
                    <Link
                        href="/"
                        className="font-medium text-primary underline-offset-4 hover:underline"
                    >
                        {t.login}
                    </Link>
                </p>
            </div>
        </div>
    );
}
