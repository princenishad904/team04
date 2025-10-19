import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Apna Squad",
  description: "BGMI Tournaments heigh Prize pool and 100% trused 500+ players in instagram",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >

        <main className="min-h-screen">

                {children}
        </main>

    <footer className="bg-zinc-800 text-white py-12 ">
  <div className="container mx-auto px-4">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      <div className="lg:col-span-2">
        <h3 className="text-2xl font-bold mb-4">Gaming League</h3>
        <p className="text-gray-300 mb-4 max-w-md">
          The premier destination for competitive gaming. Join our community and participate in exciting tournaments with fair play policies.
        </p>
        <div className="flex space-x-4">
          <a href="#" className="text-gray-300 hover:text-white transition">
            <i className="fab fa-twitter text-xl" />
          </a>
          <a href="#" className="text-gray-300 hover:text-white transition">
            <i className="fab fa-discord text-xl" />
          </a>
          <a href="#" className="text-gray-300 hover:text-white transition">
            <i className="fab fa-youtube text-xl" />
          </a>
          <a href="#" className="text-gray-300 hover:text-white transition">
            <i className="fab fa-twitch text-xl" />
          </a>
        </div>
      </div>
      <div>
        <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
        <ul className="space-y-2">
          <li><Link href="/about-us" className="text-gray-300 hover:text-white transition">About us</Link></li>
          <li><Link href="/contact-us" className="text-gray-300 hover:text-white transition">Contact us</Link></li>
         
        </ul>
      </div>
      <div>
        <h4 className="text-lg font-semibold mb-4">Policies</h4>
        <ul className="space-y-2">
          <li>
            
            <Link href="/privacy-policy" className="text-gray-300 hover:text-white transition">Privacy Policy</Link>
           
            
            </li>

            <li>
               <Link href="/refunds-cancellations" className="text-gray-300 hover:text-white transition">Refunds & cancellations</Link>
            </li>
            <li>
               <Link href="/terms-conditions" className="text-gray-300 hover:text-white transition">Terms & conditions</Link>
            </li>
       
        </ul>
      </div>
    </div>
   
    <div className="mt-8 pt-6 border-t border-gray-700 text-center text-gray-400">
      <p>© 2025 Gaming League. All rights reserved.</p>
    </div>
  </div>
</footer>

  


        <ToastContainer/>
      </body>
    </html>
  );
}
