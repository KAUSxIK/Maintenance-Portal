import React from 'react';
import { Link,NavLink } from 'react-router-dom';
import { Mail,Instagram, YoutubeIcon } from 'lucide-react'; // Make sure to install: npm i lucide-react

export default function Footer() {
  return (
    <footer className="bg-white border-t border-[#800000]/30 px-6 mt-20 md:px-16 lg:px-24 xl:px-32">
      <div className="flex flex-col md:flex-row justify-between gap-10 py-10 text-gray-600">
        
        {/* Logo & About */}
        <div className="max-w-md">
          <h2 className="text-2xl font-bold text-[#800000]">Kapili Hostel</h2>
          <p className="mt-4 text-sm">
            A complete hostel maintenance solution for Kapili residents — book slots, raise complaints, and stay connected.
          </p>
        </div>

            <div className="flex flex-col  gap-2 text-sm">
          <h3 className="font-semibold text-gray-900 mb-2">Know More</h3>
        
        <NavLink to='/about' className="flex items-center gap-2 hover:text-[#800000] transition">About us</NavLink>
        <NavLink to='/complaints' className="flex items-center gap-2 hover:text-[#800000] transition">Complaints</NavLink>


        </div>

        {/* Contact Section */}
        <div className="flex flex-col gap-2 text-sm">
          <h3 className="font-semibold text-gray-900 mb-2">Contact Us</h3>
          <a
            href="mailto:ms.kapili@iitg.ac.in"
            className="flex items-center gap-2 hover:text-[#800000] transition"
          >
            <Mail size={20} />
            ms.kapili@iitg.ac.in
          </a>
<a
  href="https://www.instagram.com/kapili_hostel_iitg/"
  target="_blank"
  rel="noopener noreferrer"
  className="flex items-center gap-2 hover:text-[#800000] transition"
>
  <Instagram size={20} />
  kapili_hostel_iitg
</a>

<a
  href="https://www.instagram.com/kapili_hostel_iitg/"
  target="_blank"
  rel="noopener noreferrer"
  className="flex items-center gap-2 hover:text-[#800000] transition"
>
  <YoutubeIcon size={20} />
  kapili_yt
</a>
        </div>
      </div>

      {/* Bottom Text */}
      <p className="text-center text-sm py-4 text-gray-500">
        © {new Date().getFullYear()} Kapili Maintenance Portal. All rights reserved.
      </p>
    </footer>
  );
}
