import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up to App",
};

export default function SignUpLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <main>
        {children}
      </main>
    );
  }
  