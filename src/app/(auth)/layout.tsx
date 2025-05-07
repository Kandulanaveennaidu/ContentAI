// src/app/(auth)/layout.tsx
"use client";

// This layout applies to auth pages like login and signup
// It ensures they don't have the main app header/footer
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* No Header or Footer here, or a minimal one if needed */}
      <main className="flex-grow">{children}</main>
    </div>
  );
}
