'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import GoogleTranslate from './GoogleTranslate';

const Navigation = () => {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'About' },
    { href: '/faq', label: 'FAQs' },
    { href: '/join', label: 'Join' },
    { href: '/map', label: 'Map' },
    { href: '/metadata-form', label: 'Metadata form' },
    { href: '/isolate-form', label: 'Isolate form' }
  ];

  return (
    <nav className="nav-container">
      <div className="container mx-auto px-4 py-6">
        {/* Header with logo, title, and translate button */}
        <div className="flex items-center justify-center mb-6 relative">
          {/* Logo on the left */}
          <div className="absolute left-0 hidden md:block">
            <Image
              src="/logo.png"
              alt="Aspergillus fumigatus Logo"
              width={100}
              height={100}
              className="logo-image"
            />
          </div>
          
          {/* Centered title */}
          <h1 className="text-2xl md:text-3xl font-bold text-white text-center px-4">
            <em>Aspergillus fumigatus</em> Community Sequencing Initiative
          </h1>
          
          {/* Translate button on the right */}
          <div className="absolute right-0">
            <GoogleTranslate />
          </div>
        </div>

        {/* Navigation links */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`nav-link transition-all duration-300 text-sm md:text-base ${
                pathname === item.href ? 'active' : ''
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;