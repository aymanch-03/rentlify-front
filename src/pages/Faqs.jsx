import backgroundImage from "../assets/background-faqs.jpg";

const faqs = [
  [
    {
      question: "Is Rentlify responsible for property maintenance?",
      answer:
        "No, Rentlify is a platform connecting tenants and landlords. Property maintenance is the responsibility of the property owner or management.",
    },
    {
      question: "How can I list my property on Rentlify?",
      answer:
        "Listing your property is easy! Just sign up, switch to Host Mode, and follow the simple steps to add your property details.",
    },
  ],
  [
    {
      question: "What happens if a tenant violates the rental agreement?",
      answer:
        "Rentlify provides tools for communication and issue resolution. In case of disputes, it's advisable to refer to the terms in your rental agreement and seek legal advice if necessary.",
    },

    {
      question: "How does Rentlify handle security deposits?",
      answer:
        "Rentlify facilitates the handling of security deposits between tenants and landlords. Make sure to clearly outline deposit terms in your rental agreement.",
    },
    {
      question: "Can I set my own rental terms and conditions?",
      answer:
        "Absolutely! Rentlify allows you to customize your rental terms and conditions to meet your specific requirements and preferences.",
    },
  ],
  [
    {
      question: "Are there any fees for using Rentlify?",
      answer:
        "The fees for these plans are generally around 10 percent of the rental amount.",
    },
    {
      question: "Is Rentlify available internationally?",
      answer:
        "Currently, Rentlify operates in Morocco. We are continuously expanding, so stay tuned for updates on our international presence.",
    },
  ],
];

export default function Faqs() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="relative overflow-hidden bg-slate-50 py-16"
    >
      <div className="w-full h-20 bg-gradient-to-b from-white to-transparent absolute top-0 z-50 right-0"></div>
      <img
        className="absolute left-1/2 top-0 max-w-none -translate-y-1/4 translate-x-[-30%]"
        src={backgroundImage}
        alt=""
        width={1558}
        height={946}
      />
      <div className="relative mx-auto md:py-16 md:px-8 px-4 py-8 max-w-7xl">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2
            id="faq-title"
            className="font-medium text-3xl tracking-tight text-slate-900 sm:text-4xl"
          >
            Frequently asked questions
          </h2>
          <p className="mt-4 text-lg tracking-tight text-slate-700">
            If you can’t find what you’re looking for, email our support team
            and if you’re lucky someone will get back to you.
          </p>
        </div>
        <ul
          role="list"
          className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3"
        >
          {faqs.map((column, columnIndex) => (
            <li key={columnIndex}>
              <ul role="list" className="flex flex-col gap-y-8">
                {column.map((faq, faqIndex) => (
                  <li key={faqIndex}>
                    <h3 className="font-medium text-lg leading-7 text-slate-900">
                      {faq.question}
                    </h3>
                    <p className="mt-4 text-sm text-slate-700">{faq.answer}</p>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
