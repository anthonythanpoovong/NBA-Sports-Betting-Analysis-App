import React from 'react';
import Footer from "../Footer";
import ContactUs from "./ContactUs";
import Image from 'next/image';
import abel from "../../assets/abel_pic.jpg";
import anthony from "../../assets/Anthony_pic.jpg";
import UAS from "../../assets/UAS.jpg";
import ATLink from "../../assets/logo.png";

const teamMembers = [
  {
    name: 'Abel Thomas',
    role: 'Full Stack Developer for Sports Betting Analysis Website',
    imageUrl: abel.src,
    bio: 'Abel is a skilled frontend developer with a passion for creating interactive user experiences.',
    github: 'https://github.com/AT1XX',
    linkedin: 'https://www.linkedin.com/in/abel-thomas-921bab251/',
    instagram: 'https://www.instagram.com/abel.thoms1/',
    skills: ['React', 'JavaScript', 'Node', 'Python', 'Java', 'SQL'],
    projects: [
      {
        name: 'Personal Portfolio',
        imageUrl: ATLink.src,
        description: 'A personalized website built utilizing React, JavaScript, CSS, HTML, and GitHub extension functionalities to display my unique abilities as a website.',
        url: 'https://at2002.netlify.app/',
      },
    ],
    testimonials: [
      // Add testimonials here if needed
    ],
  },
  {
    name: 'Anthony Thanpoovong',
    role: 'Backend Developer for Sports Betting Analysis Website',
    imageUrl: anthony.src,
    bio: 'Anthony specializes in backend development and is adept at building robust and scalable applications.',
    github: 'https://github.com/anthonythanpoovong',
    linkedin: 'https://www.linkedin.com/in/anthony-thanpoovong/',
    instagram: 'https://www.instagram.com/anthony.thanpoovong/',
    skills: ['Java', 'Python', 'SQL', 'HTML', 'CSS', 'Linux'],
    projects: [
      {
        name: 'University Administration System',
        imageUrl: UAS.src,
        description: 'A university administration system that manipulates SQL and Oracle Apex Database.',
        url: 'https://github.com/anthonythanpoovong/University-Administration-System?tab=readme-ov-file',
      },
    ],
    testimonials: [
      {
        quote: 'Working with Anthony and his team was a fantastic experience. They delivered beyond our expectations!',
        author: 'John Doe, CEO of Example Inc.',
      },
    ],
  },
  {
    name: 'Dylan',
    role: 'Full Stack Developer',
    imageUrl: 'path/to/dylan.jpg',
    bio: 'Dylan is a talented full stack developer with a knack for solving complex problems.',
    github: 'https://github.com/dylan',
    linkedin: 'https://linkedin.com/in/dylan',
    twitter: 'https://twitter.com/dylan',
    skills: ['Java', 'Python', 'SQL', 'HTML', 'CSS', 'Linux'],
    projects: [
      {
        name: 'Project A',
        imageUrl: 'path/to/projectA.jpg',
        description: 'Built a responsive web application using React and Node.js.',
      },
    ],
    testimonials: [
      {
        quote: 'Working with Abel and his team was a fantastic experience. They delivered beyond our expectations!',
        author: 'John Doe, CEO of Example Inc.',
      },
    ],
  },
];

const AboutUs = ({ theme }) => {
  return (
    <div className={`flex flex-col min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <main className="flex-grow py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className={`text-base font-semibold uppercase tracking-wide ${theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'}`}>About Us</h2>
            <p className={`mt-1 text-4xl font-extrabold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} sm:text-5xl lg:text-6xl`}>Meet Our Team</p>
            <p className={`mx-auto mt-5 max-w-xl text-xl ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>We are a group of passionate developers committed to building great products.</p>
          </div>
          <div className="mt-10 grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map((member) => (
              <div key={member.name} className={`rounded-lg shadow-lg overflow-hidden ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} slide-up`}>
                <img className="w-full h-56 object-cover" src={member.imageUrl} alt={member.name} />
                <div className="p-6">
                  <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{member.name}</h3>
                  <p className={`text-gray-400 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{member.role}</p>
                  <p className={`mt-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{member.bio}</p>
                  <div className="mt-4 flex space-x-3">
                    <a href={member.github} target="_blank" rel="noopener noreferrer" className={`text-gray-400 hover:text-white ${theme === 'dark' ? 'hover:text-gray-200' : 'hover:text-gray-800'}`}>
                      <span className="sr-only">GitHub</span>
                      {/* SVG for GitHub icon */}
                    </a>
                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className={`text-gray-400 hover:text-white ${theme === 'dark' ? 'hover:text-gray-200' : 'hover:text-gray-800'}`}>
                      <span className="sr-only">LinkedIn</span>
                      {/* SVG for LinkedIn icon */}
                    </a>
                    <a href={member.instagram} target="_blank" rel="noopener noreferrer" className={`text-gray-400 hover:text-white ${theme === 'dark' ? 'hover:text-gray-200' : 'hover:text-gray-800'}`}>
                      <span className="sr-only">Instagram</span>
                      {/* SVG for Instagram icon */}
                    </a>
                  </div>
                  <div className="mt-4">
                    <h4 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Skills</h4>
                    <div className="flex flex-wrap mt-2">
                      {member.skills.map((skill) => (
                        <span key={skill} className={`text-gray-400 bg-gray-700 px-2 py-1 rounded-full text-sm mr-2 mb-2 ${theme === 'dark' ? 'bg-gray-700 text-gray-400' : 'bg-gray-200 text-gray-800'}`}>{skill}</span>
                      ))}
                    </div>
                  </div>
                  <div className="mt-4">
                    <h4 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Know more about me</h4>
                    <div className="mt-2 space-y-2">
                      {member.projects.map((project) => (
                        <div key={project.name} className="flex items-center">
                          <img className="w-18 h-8 rounded mr-2" src={project.imageUrl} alt={project.name} />
                          <div>
                            <p className={`text-gray-300 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                              <a href={project.url} target="_blank" rel="noopener noreferrer" className={`hover:underline ${theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'}`}>
                                {project.name}
                              </a>
                            </p>
                            <p className={`text-gray-400 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{project.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="mt-4">
                    <h4 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Testimonials</h4>
                    <div className="mt-2">
                      {member.testimonials.map((testimonial, index) => (
                        <div key={index} className="mt-4">
                          <p className={`text-gray-300 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{testimonial.quote}</p>
                          <p className={`text-gray-400 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>- {testimonial.author}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <ContactUs theme={theme} />
      <Footer theme={theme} />
    </div>
  );
};

export default AboutUs;
