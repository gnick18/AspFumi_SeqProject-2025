'use client';

// Note: 'next/link' has been removed to resolve a build error. Standard <a> tags are used instead.

// Helper component for SVG icons to keep the main component cleaner
const Icon = ({ path, className }: { path: string, className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className || "w-8 h-8"}>
    <path fillRule="evenodd" d={path} clipRule="evenodd" />
  </svg>
);

// This array correctly defines all four steps.
const steps = [
  {
    number: '1',
    title: 'Contact the Leadership Team',
    description: 'Email the leadership team to express your interest in joining.'
  },
  {
    number: '2',
    title: 'Fill Out Metadata Form',
    description: 'We will provide you with the password to access the metadata form. Please fill it out completely.'
  },
  {
    number: '3',
    title: 'Fill out the Isolate Form',
    description: 'We will provide you with the password to access the isolate form. Please fill the form out for EACH isolate being shipped for sequencing.'
  },
  {
    number: '4',
    title: 'Ship Your Isolates',
    description: 'Shipping information will be shared via email after form submission. All samples will be processed at no cost to your lab in Jena, Germany.'
  }
];

export default function Join() {
  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-8" style={{ color: 'var(--primary)' }}>
        Join Our Initiative
      </h2>

      {/* Introduction Card */}
      <div className="popup-card p-6 rounded-lg mb-8 space-y-4">
        <p className="text-base leading-relaxed">
          We invite research labs from around the world to join this collaborative initiative.
        </p>
        <p className="text-base leading-relaxed">
          To begin, <strong>please contact our organizing team using the information below</strong>. We will then follow up via email with all the necessary details and guide you through the participation process.
        </p>
      </div>

      {/* Contact Card */}
      <div className="popup-card p-6 rounded-lg mb-8 space-y-4">
        <h3 className="text-xl font-semibold" style={{ color: 'var(--secondary)' }}>
          Contact Information
        </h3>
        <p className="text-base leading-relaxed">
          <strong>Email:</strong>{' '}
          <a href="mailto:asp.fumi.seq.initiative@gmail.com" className="text-blue-600 hover:underline">
            asp.fumi.seq.initiative@gmail.com
          </a>
        </p>
        <p className="text-base leading-relaxed">
          To get involved, please send a short email expressing your lab's interest in participating. We will follow up with more information and next steps, typically within 2-3 business days.
        </p>
      </div>

      {/* Steps Card */}
      <div className="popup-card p-6 rounded-lg mb-8">
        <h3 className="text-xl font-semibold mb-6 text-center" style={{ color: 'var(--secondary)' }}>
          Steps for Joining
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {steps.map((step) => (
            <div key={step.number} className="text-center p-4">
              <div className="w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: 'var(--soft-green)', border: '2px solid var(--dark-green)' }}>
                <span className="text-xl font-bold" style={{ color: 'var(--dark-green)' }}>{step.number}</span>
              </div>
              <h4 className="font-semibold mb-2">{step.title}</h4>
              <p className="text-sm" style={{ color: 'var(--grey)' }}>
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Links Card */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <a href="/map" className="block p-6 rounded-lg transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{ backgroundColor: 'var(--light-yellow)', border: '2px solid var(--soft-green)' }}>
          <h4 className="text-lg font-semibold mb-2 flex items-center gap-2" style={{ color: 'var(--dark-green)' }}>
            <Icon path="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" className="w-6 h-6" />
            View Global Map
          </h4>
          <p className="text-sm" style={{ color: 'var(--forest-green)' }}>
            See where our collaborating research labs are located.
          </p>
        </a>

        <a href="/metadata-form" className="block p-6 rounded-lg transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{ backgroundColor: 'var(--light-yellow)', border: '2px solid var(--soft-green)' }}>
          <h4 className="text-lg font-semibold mb-2 flex items-center gap-2" style={{ color: 'var(--dark-green)' }}>
             <Icon path="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" className="w-6 h-6" />
            Metadata Form
          </h4>
          <p className="text-sm" style={{ color: 'var(--forest-green)' }}>
            Access the secure form to submit your laboratory information.
          </p>
        </a>

        <a href="/isolate-form" className="block p-6 rounded-lg transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{ backgroundColor: 'var(--light-yellow)', border: '2px solid var(--soft-green)' }}>
          <h4 className="text-lg font-semibold mb-2 flex items-center gap-2" style={{ color: 'var(--dark-green)' }}>
             <Icon path="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" className="w-6 h-6" />
            Isolate Form
          </h4>
          <p className="text-sm" style={{ color: 'var(--forest-green)' }}>
            Submit data for each individual strain you are sending.
          </p>
        </a>
      </div>

      {/* FAQ Link */}
      <div className="popup-card p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-3" style={{ color: 'var(--secondary)' }}>
          Questions?
        </h3>
        <p className="text-base">
          If you have any questions, please visit our{' '}
          <a href="/faq" className="underline font-semibold" style={{ color: 'var(--dark-grey)' }}>
            FAQ page
          </a>{' '}
          or don't hesitate to contact us directly.
        </p>
      </div>
    </div>
  );
}

