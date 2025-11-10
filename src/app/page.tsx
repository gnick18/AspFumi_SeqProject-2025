import Image from 'next/image';

export default function About() {
  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6" style={{ color: 'var(--primary)' }}>
        About this initiative
      </h2>

      <div className="prose prose-lg max-w-none">
        <div className="popup-card p-6 rounded-lg mb-6">
          <p className="text-lg leading-relaxed mb-4">
            Welcome to the <em>Aspergillus fumigatus</em> Af293/CEA10 community sequencing initiative.
          </p>

          <p className="text-base leading-relaxed mb-4">
            The model isolates Af293 and CEA10 have been used by researchers for decades. As these strains have been independently cultured in labs across the globe, they have likely accumulated unique, unstudied mutations. Understanding the extent of this &quot;lab-to-lab&quot; evolution is crucial to reliably compare findings on physiology, pathogenicity, and genetics.
          </p>

          <p className="text-base leading-relaxed mb-4">
            While community sequencing projects have been conducted for other model organisms, this effort is the first of its kind for a filamentous fungus. We believe <em>A. fumigatus</em> is the perfect model pathogen to pioneer this work.
          </p>

          <p className="text-base leading-relaxed mb-4">
            Our goal is to quantify the genetic divergence between all of our labs&apos; parental Af293 and CEA10 strains and create a foundational genomic resource for the entire <em>Aspergillus</em> community. All sequencing data will be provided back to the contributing labs.
          </p>

          <p className="text-base leading-relaxed">
            To learn more about how to participate, what this involves, and how data will be handled, please visit our <strong>Frequently Asked Questions (FAQ)</strong> page.
          </p>
        </div>

        <div className="text-center mb-8">
          <a
            href="/faq"
            className="inline-block p-6 rounded-lg transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            style={{
              backgroundColor: 'var(--light-yellow)',
              border: '2px solid var(--soft-green)',
            }}
          >
            <h4 className="text-lg font-semibold mb-2 flex items-center justify-center gap-2" style={{ color: 'var(--dark-green)' }}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm11.378-3.917c-.89-.777-2.366-.777-3.255 0a.75.75 0 01-.988-1.129c1.454-1.272 3.776-1.272 5.23 0 1.513 1.324 1.513 3.518 0 4.842a3.75 3.75 0 01-.837.552c-.676.328-1.028.774-1.028 1.152v.75a.75.75 0 01-1.5 0v-.75c0-1.279 1.06-2.107 1.875-2.502.182-.088.351-.199.503-.331.83-.727.83-1.857 0-2.584zM12 18a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
              </svg>
              View Frequently Asked Questions
            </h4>
            <p className="text-sm" style={{ color: 'var(--forest-green)' }}>
              Learn about participation, data handling, and more
            </p>
          </a>
        </div>

        <div className="popup-card p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-6" style={{ color: 'var(--secondary)' }}>
            Leadership
          </h3>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="text-center">
              <div className="w-32 h-32 rounded-full mx-auto mb-4 overflow-hidden border-2 border-soft-green/40">
                <Image
                  src="/leadership/Grant_Nickles.JPG"
                  alt="Dr. Grant R. Nickles"
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="font-semibold text-base mb-1">Dr. Grant R. Nickles</h4>
              <p className="text-sm text-secondary mb-1">UW-Madison Distinguished Postdoctoral Fellow</p>
              <p className="text-xs" style={{ color: 'var(--dark-grey)' }}>Plant Pathology at UW-Madison</p>
            </div>

            <div className="text-center">
              <div className="w-32 h-32 rounded-full mx-auto mb-4 overflow-hidden border-2 border-soft-green/40">
                <Image
                  src="/leadership/Dante_Calise.jpeg"
                  alt="Dr. Dante Calise"
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="font-semibold text-base mb-1">Dr. Dante Calise</h4>
              <p className="text-sm text-secondary mb-1">Postdoctoral Fellow</p>
              <p className="text-xs" style={{ color: 'var(--dark-grey)' }}>Medical Microbiology and Immunology at UW-Madison</p>
            </div>

            <div className="text-center">
              <div className="w-32 h-32 rounded-full mx-auto mb-4 overflow-hidden border-2 border-soft-green/40">
                <Image
                  src="/leadership/Amelia_Barber.jpg"
                  alt="Dr. Amelia E. Barber"
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="font-semibold text-base mb-1">Dr. Amelia E. Barber</h4>
              <p className="text-sm text-secondary mb-1">Junior Research Leader</p>
              <p className="text-xs" style={{ color: 'var(--dark-grey)' }}>Institute of Microbiology at Friedrich-Schiller-Universität Jena</p>
            </div>

            <div className="text-center">
              <div className="w-32 h-32 rounded-full mx-auto mb-4 overflow-hidden border-2 border-soft-green/40">
                <Image
                  src="/leadership/Emile_GluckThaler.png"
                  alt="Dr. Emile Gluck-Thaler"
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="font-semibold text-base mb-1">Dr. Emile Gluck-Thaler</h4>
              <p className="text-sm text-secondary mb-1">Assistant Professor</p>
              <p className="text-xs" style={{ color: 'var(--dark-grey)' }}>Plant Pathology at UW-Madison</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
