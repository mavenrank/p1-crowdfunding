import Link from "next/link";
import SocialLinks from "@/components/SocialLinks";
import Copyright from "./Copyright";

const Footer = () => {
  return (
    <footer >
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        
        {/* About */}
        <div>
          <h3 className="text-lg font-semibold mb-3">ABOUT</h3>
          <ul className="space-y-2">
            <li><Link href="/about">About us</Link></li>
            <li><Link href="/charter">Our charter</Link></li>
            <li><Link href="/stats">Stats</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg font-semibold mb-3">SUPPORT</h3>
          <ul className="space-y-2">
            <li><Link href="/help">Help Center</Link></li>
            <li><Link href="/rules">Our Rules</Link></li>
          </ul>
        </div>

        {/* More from Us */}
        <div>
          <h3 className="text-lg font-semibold mb-3">MORE FROM US</h3>
          <ul className="space-y-2">
            <li><Link href="/blog">Newsletters</Link></li>
            <li><Link href="/updates">Project Updates</Link></li>
          </ul>
        </div>

      </div>

      {/* Bottom Section */}
      <div className="mt-10 border-t border-gray-300 pt-6 flex flex-col md:flex-row items-center justify-between container mx-auto px-2">
        {/* Logo & Copyright */}
        <Copyright />
        {/* Social Media Links */}
        <SocialLinks />
      </div>
    </footer>
  );
};

export default Footer;