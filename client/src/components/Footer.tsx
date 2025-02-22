import Link from "next/link";
import SocialLinks from "@/components/SocialLinks";
import Copyright from "@/components/Copyright";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About Us */}
        <div>
          <h3 className="text-lg font-semibold mb-3">About Us</h3>
          <ul className="space-y-2">
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/charter">Charter</Link></li>
            <li><Link href="/jobs">Jobs</Link></li>
            <li><Link href="/stats">Stats</Link></li>
            <li><Link href="/press">Press</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Support</h3>
          <ul className="space-y-2">
            <li><Link href="/help">Help Center</Link></li>
            <li><Link href="/contact">Contact Us</Link></li>
            <li><Link href="/faq">FAQ</Link></li>
          </ul>
        </div>

        {/* More From Us */}
        <div>
          <h3 className="text-lg font-semibold mb-3">More from Us</h3>
          <ul className="space-y-2">
            <li><Link href="/blog">Blog</Link></li>
            <li><Link href="/partners">Our Partners</Link></li>
            <li><Link href="/investors">Investors</Link></li>
          </ul>
        </div>
      </div>

      {/* Social Media Links */}
      <div className="mt-8">
        <SocialLinks />
      </div>

      {/* Copyright */}
      <Copyright />
    </footer>
  );
};

export default Footer;