const socials = ["Instagram", "Twitter", "LinkedIn"];

function SocialLinks() {
  return (
    <section className="py-20 bg-[#111827] px-5">

      <div className="max-w-4xl mx-auto text-center">

        <h2 className="text-3xl mb-6">
          Follow Us
        </h2>

        <div className="flex justify-center gap-6">

          {socials.map((s) => (
            <button
              key={s}
              className="border border-gray-700 px-6 py-3 rounded-lg"
            >
              {s}
            </button>
          ))}

        </div>

      </div>

    </section>
  );
}

export default SocialLinks;