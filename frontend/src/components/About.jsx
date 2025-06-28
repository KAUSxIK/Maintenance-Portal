import React from 'react';
import Footer from './Footer';

function About() {
  const cards = [
    {
      name: "Donald Jackman",
      title: "Graphic Designer",
      image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
    },
    {
      name: "Richard Nelson",
      title: "Content Creator",
      image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200",
    },
    {
      name: "James Washington",
      title: "Co-founder",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop",
    },
  ];

  return (
    <div>
    <div className="flex flex-cols md:flex-row justify-center items-center gap-8 mt-50 px-6 py-12 bg-gray-50">
      {cards.map((user, index) => (
        <div key={index} className="w-80 border border-gray-300 p-8 rounded-lg shadow-sm bg-white flex flex-col items-center text-center">
          <img src={user.image} alt={user.name} className="h-20 w-20 rounded-full object-cover" />
          <h2 className="text-lg text-gray-900 font-semibold mt-4">{user.name}</h2>
          <p className="text-sm text-gray-500">{user.title}</p>
          <div className="flex mt-3 gap-1">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                width="16"
                height="15"
                viewBox="0 0 16 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.524.464a.5.5 0 0 1 .952 0l1.432 4.41a.5.5 0 0 0 .476.345h4.637a.5.5 0 0 1 .294.904L11.563 8.85a.5.5 0 0 0-.181.559l1.433 4.41a.5.5 0 0 1-.77.559L8.294 11.65a.5.5 0 0 0-.588 0l-3.751 2.726a.5.5 0 0 1-.77-.56l1.433-4.41a.5.5 0 0 0-.181-.558L.685 6.123A.5.5 0 0 1 .98 5.22h4.637a.5.5 0 0 0 .476-.346z"
                  fill="#FF532E"
                />
              </svg>
            ))}
          </div>
          <p className="text-sm mt-3 text-gray-500">
            I've been using Imagify for nearly two years, primarily for Instagram, and it has been incredibly user-friendly.
          </p>
        </div>
      ))}
      
    </div>
    
    </div>
  );
}

export default About;
