
import "./globals.css";

export const metadata = {
  title: "Task Management App",
  description:
    "A comprehensive task management solution to organize, track, and prioritize your tasks efficiently.",
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="dar">{children}</body>
    </html>
  );
}
