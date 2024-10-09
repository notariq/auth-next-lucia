import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Log In to App",
};

export default function LogInLayout({
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
  