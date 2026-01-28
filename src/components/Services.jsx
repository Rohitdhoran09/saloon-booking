export default function Services() {
  const services = [
    { name: "Hair Styling", price: "₹999" },
    { name: "Facial Treatment", price: "₹1499" },
    { name: "Full Body Massage", price: "₹1999" },
    { name: "Manicure & Pedicure", price: "₹899" },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <h3 className="text-3xl font-bold text-center mb-10">
        Our Services
      </h3>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 px-6">
        {services.map((service, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-2xl shadow-md text-center"
          >
            <h4 className="text-xl font-semibold mb-2">
              {service.name}
            </h4>
            <p className="text-pink-600 font-bold">
              {service.price}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}