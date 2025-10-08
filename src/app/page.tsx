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
            Working with shared genetic isolates is crucial for scientific communities, as it allows labs to reliably compare findings on physiology, pathogenicity, and genetic perturbations. This project is a collaborative effort by researchers worldwide who use the <em>A. fumigatus</em> model isolates Af293 and/or CEA10.
          </p>

          <p className="text-base leading-relaxed">
            Our goal is to determine the genetic similarity between these globally distributed strains while providing all sequencing data back to the contributing labs.
          </p>
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
