'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

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
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-6 text-white">
          <em>Aspergillus fumigatus</em> Community Sequencing Initiative
        </h1>

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