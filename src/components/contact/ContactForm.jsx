import { useState } from "react";

function ContactForm() {

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <section className="py-20 bg-[#111827] px-5">

      <div className="max-w-xl mx-auto">

        <h2 className="text-2xl text-center mb-8">
          Send a Message
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            placeholder="Name"
            className="w-full p-3 bg-[#0D1117] border border-gray-800 rounded-lg"
          />

          <input
            placeholder="Email"
            className="w-full p-3 bg-[#0D1117] border border-gray-800 rounded-lg"
          />

          <input
            placeholder="Subject"
            className="w-full p-3 bg-[#0D1117] border border-gray-800 rounded-lg"
          />

          <textarea
            rows="5"
            placeholder="Message"
            className="w-full p-3 bg-[#0D1117] border border-gray-800 rounded-lg"
          />

          <button className="w-full bg-green-600 py-3 rounded-lg">
            Send Message
          </button>

        </form>
      </div>
    </section>
  );
}

export default ContactForm;