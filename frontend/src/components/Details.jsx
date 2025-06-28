import React from "react";
import { WashingMachine, Droplet, Utensils, Wifi, ShieldCheck, Bell } from "lucide-react"; // install with `npm i lucide-react`

const facilities = [
  {
    icon: <WashingMachine size={32} className="text-[#800000]" />,
    title: "6 Washing Machines",
    description: "Easily book slots for laundry anytime from your dashboard.",
  },
  {
    icon: <Droplet size={32} className="text-[#800000]" />,
    title: "9 Water Coolers",
    description: "Filtered water available on all floors for your convenience.",
  },
  {
    icon: <Utensils size={32} className="text-[#800000]" />,
    title: "Pantry Access",
    description: "Shared pantry space for light cooking or heating food.",
  },
  {
    icon: <Wifi size={32} className="text-[#800000]" />,
    title: "High-Speed Wi-Fi",
    description: "24/7 internet access available across the hostel.",
  },
  {
    icon: <ShieldCheck size={32} className="text-[#800000]" />,
    title: "Secure Premises",
    description: "Monitored entry/exit for student safety and asset protection.",
  },
  {
    icon: <Bell size={32} className="text-[#800000]" />,
    title: "Issue Reporting",
    description: "Raise complaints for any maintenance issue directly online.",
  },
];

const Details = () => {
  return (
    <section className="bg-light   pb-15  -mt-20  px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-[#800000] mb-12">
          Kapili Hostel Facilities
        </h2>

        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          {facilities.map((item, index) => (
            <div
              key={index}
              className="bg-light rounded-xl p-6 shadow hover:shadow-md transition"
            >
              <div className="mb-4">{item.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Details;
