import React, { useState, useEffect } from "react";
import { Users, Briefcase, Github, Linkedin, Mail } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ShivSahni from "../images/ShivSahni.jpg";
import AdityaKumar from "../images/AdityaKumar.jpeg";
import ShubhamKumar from "../images/ShubhamKumar.png";

function Team() {
  const [members, setMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const teamData = [
      {
        id: 1,
        name: "Shiv Sahni",
        role: "FullStack Developer",
        bio: "Full-stack developer specializing in React and Node.js.",
        skills: ["HTML", "JavaScript", "React", "Tailwind", "Firebase"],
        image: ShivSahni,
        social: {
          email: "shivsahni2240@example.com",
          linkedin: "https://www.linkedin.com/in/shiv-sahni-5461aa181/",
          github: "https://github.com/shiv2240",
        },
      },
      {
        id: 2,
        name: "Aditya Kumar Thakur",
        role: "FullStack Developer",
        bio: "Passionate about creating beautiful and user-friendly interfaces.",
        skills: ["HTML", "JavaScript", "React", "Tailwind", "MongoDB"],
        image: AdityaKumar,
        social: {
          email: "jamie@example.com",
          linkedin: "https://www.linkedin.com/in/aditya-kumar-thakur-bb3aa5314/",
          github: "https://github.com/AdityaKumarThakur12",
        },
      },
      {
        id: 3,
        name: "Shubham Kumar",
        role: "FullStack Developer",
        bio: "Front-end developer focusing on performance and accessibility.",
        skills: ["HTML", "JavaScript", "React", "Firebase", "Node.js"],
        image: ShubhamKumar,
        social: {
          email: "royshubham2401@example.com",
          linkedin: "https://www.linkedin.com/in/shubham-kumar-57849030a/",
          github: "https://github.com/ShubhamKumar062",
        },
      },
    ];

    setTimeout(() => {
      setMembers(teamData);
      setIsLoading(false);
    }, 500);
  }, []);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-900 pt-24">
        <main className="container mx-auto px-4 py-12 text-center">
          <h2 className="text-5xl font-bold text-white mb-6">Our Team</h2>
          <p className="text-gray-300 mb-12 max-w-2xl mx-auto">
            Meet our talented professionals dedicated to excellence.
          </p>
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-indigo-500"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {members.map((member) => (
                <div
                  key={member.id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105"
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-contain rounded-full"
                  />
                  <div className="p-6 text-center">
                    <h3 className="text-xl font-semibold text-gray-900">{member.name}</h3>
                    <p className="text-indigo-600 font-medium">{member.role}</p>
                    <p className="text-gray-600 mt-2">{member.bio}</p>
                    <div className="flex justify-center gap-4 mt-4">
                      {member.social.linkedin && (
                        <a
                          href={member.social.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-indigo-600 hover:text-indigo-800"
                        >
                          <Linkedin size={24} />
                        </a>
                      )}
                      {member.social.github && (
                        <a
                          href={member.social.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-700 hover:text-gray-900"
                        >
                          <Github size={24} />
                        </a>
                      )}
                      {member.social.email && (
                        <a
                          href={`mailto:${member.social.email}`}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Mail size={24} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
      <Footer />
    </>
  );
}

export default Team;
