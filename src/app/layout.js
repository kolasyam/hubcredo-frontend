
import "./globals.css";



export const metadata = {
  title: "Quantum-assignment",
  description: "Quantum-assignment",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
