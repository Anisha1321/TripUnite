const faqs = [
  {
    q: "How do I create a trip?",
    a: "Sign up and click Create Trip to start planning."
  },
  {
    q: "Is TripUnite free?",
    a: "Yes, basic features are free."
  },
  {
    q: "How are travelers verified?",
    a: "Users go through identity verification."
  }
];

function ContactFAQ() {
  return (
    <section className="py-20 px-5">

      <div className="max-w-2xl mx-auto">

        <h2 className="text-3xl text-center mb-8">
          FAQ
        </h2>

        <div className="space-y-4">

          {faqs.map((f) => (
            <div
              key={f.q}
              className="border border-gray-800 p-4 rounded-lg"
            >
              <p className="text-gray-200">{f.q}</p>
              <p className="text-gray-400 text-sm mt-2">{f.a}</p>
            </div>
          ))}

        </div>

      </div>

    </section>
  );
}

export default ContactFAQ;