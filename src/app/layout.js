
import "./globals.css";



export const metadata = {
  title: "Hubcredo-assignment",
  description: "Hubcredo-assignment",
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
