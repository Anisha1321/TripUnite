const cards = [
  {
    title: "Email Support",
    email: "support@tripunite.com",
    desc: "Questions about your account or trips",
  },
  {
    title: "Partnerships",
    email: "partners@tripunite.com",
    desc: "Collab and brand partnerships",
  },
  {
    title: "General",
    email: "hello@tripunite.com",
    desc: "Anything else on your mind",
  },
];

function ContactCards() {
  return (
    <section className="py-16 px-5">
      <div className="max-w-5xl mx-auto grid sm:grid-cols-3 gap-6">
        {cards.map((c) => (
          <div
            key={c.title}
            className="bg-[#111827] border border-gray-800 rounded-xl p-6"
          >
            <h3 className="text-gray-200 font-medium">{c.title}</h3>

            <p className="text-green-400 text-sm mt-2">{c.email}</p>

            <p className="text-gray-500 text-sm mt-2">{c.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ContactCards;