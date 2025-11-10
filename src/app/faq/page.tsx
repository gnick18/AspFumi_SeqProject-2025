export default function FAQ() {
  const faqs = [
    {
      question: "What type of labs are we looking to collaborate with?",
      answer: "Do you use the model isolates Af293 or CEA10 in your research? If so, we want your help!"
    },
    {
      question: "What do I need to do to get involved?",
      answer: "We need two things from each collaborating lab:\n\n1. DNA extracted from your isolate, sent to our sequencing hub in Jena, Germany.\n\n2. A completed short (5 min) metadata survey with some basic information about your lab and the strain you are sending."
    },{
      question: "What strain should I send?",
      answer: "This is a very individual decision for each lab. In many cases, it does not make sense to send the base wild-type strain (Af293 or CEA10) you received from a stock center. Instead, we encourage you to send a strain that has been used for a long time as a parental strain in your lab and has been passaged multiple times. This way, the genome we generate will be more representative of the actual strain you work with.\n\n For example, perhaps your lab frequently uses and passages a parental strain of Af293 with the Δku and ΔpyrG mutations. In this case, please send that strain. Ultimately, after our first contact, the coordinating team will work individually with each lab to help them determine which isolate makes the most sense for their group to send."
    },
    {
      question: "What does my research team get out of this collaboration?",
      answer: "We will sequence your lab's isolate of Af293 or CEA10 for free and will provide your group with the resulting genome assembly and annotation files in real-time. In addition, the principal investigator from each collaborating lab will be offered co-authorship on the publication summarizing our findings."
    },
    {
      question: "Our lab would like to participate but have already sequenced our isolate of Af293 or CEA10 in-house in the past?",
      answer: "We are still very interested in collaborating with your lab! Please notify of this in your email to the organizing team and we can discuss how best to proceed. Depending on how long ago the sequencing was done, we may still want to sequence your strain again (for free of course!) to ensure consistency across the dataset."
    },
    {
      question: "Will the genome from my lab's isolate be shared publicly?",
      answer: "To ensure confidentiality, each genome will be assigned an anonymous code and will only be shared directly with the lab that provided the strain during the analysis phase. For the final publication and data release, all genomes will be identified only by their anonymous code, making them untraceable to a specific lab. The only researchers with access to the full, non-anonymized dataset during the project will be the leadership team."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-8" style={{ color: 'var(--primary)' }}>
        Frequently Asked Questions
      </h2>

      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <div key={index} className="popup-card p-6 rounded-lg mb-6">
            <h3 className="text-lg font-bold mb-3" style={{ color: 'var(--secondary)' }}>
              {faq.question}
            </h3>
            <p className="text-base leading-relaxed whitespace-pre-line">
              {faq.answer}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-12 popup-card p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-3" style={{ color: 'var(--secondary)' }}>
          Have More Questions?
        </h3>
        <p className="text-base mb-4">
          If you have additional questions not covered here, please don&apos;t hesitate to reach out
          to our organizing team through the &quot;Join&quot; page.
        </p>
        <p className="text-sm" style={{ color: 'var(--dark-grey)' }}>
          We&apos;re here to help and ensure your participation in this initiative is as smooth as possible.
        </p>
      </div>

      <div className="text-center mt-8">
        <a
          href="/join"
          className="inline-block p-6 rounded-lg transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
          style={{
            backgroundColor: 'var(--light-yellow)',
            border: '2px solid var(--soft-green)',
          }}
        >
          <h4 className="text-lg font-semibold mb-2 flex items-center justify-center gap-2" style={{ color: 'var(--dark-green)' }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path d="M6.25 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM3.25 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM19.75 7.5a.75.75 0 00-1.5 0v2.25H16a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H22a.75.75 0 000-1.5h-2.25V7.5z" />
            </svg>
            Join Our Initiative
          </h4>
          <p className="text-sm" style={{ color: 'var(--forest-green)' }}>
            Contact us to participate in this collaborative effort
          </p>
        </a>
      </div>
    </div>
  );
}