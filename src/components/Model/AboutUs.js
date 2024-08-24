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
              <div key={member.name} className={`rounded-lg shadow-lg overflow-hidden ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
                <img className="w-full h-56 object-cover" src={member.imageUrl} alt={member.name} />
                <div className="p-6">
                  <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{member.name}</h3>
                  <p className={`text-gray-400 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{member.role}</p>
                  <p className={`mt-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{member.bio}</p>
                  <div className="mt-4 flex space-x-3">
                    <a href={member.github} target="_blank" rel="noopener noreferrer" className={`text-gray-400 hover:text-white ${theme === 'dark' ? 'hover:text-gray-200' : 'hover:text-gray-800'}`}>
                      <span className="sr-only">GitHub</span>
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M12 2C6.478 2 2 6.478 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.483 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.34-3.369-1.34-.454-1.154-1.11-1.461-1.11-1.461-.907-.62.069-.607.069-.607 1.002.07 1.53 1.03 1.53 1.03.892 1.528 2.341 1.087 2.91.831.092-.646.349-1.087.634-1.338-2.22-.254-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.447-1.274.097-2.654 0 0 .84-.269 2.75 1.024A9.561 9.561 0 0112 6.837c.85.004 1.705.114 2.504.334 1.909-1.293 2.748-1.024 2.748-1.024.546 1.38.202 2.401.1 2.654.641.699 1.028 1.592 1.028 2.683 0 3.841-2.339 4.685-4.565 4.934.36.31.678.924.678 1.861 0 1.345-.012 2.427-.012 2.754 0 .268.18.58.688.482A10.002 10.002 0 0022 12c0-5.522-4.478-10-10-10z" clipRule="evenodd" />
                      </svg>
                    </a>
                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className={`text-gray-400 hover:text-white ${theme === 'dark' ? 'hover:text-gray-200' : 'hover:text-gray-800'}`}>
                      <span className="sr-only">LinkedIn</span>
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M19.25 3H4.75C4.34 3 4 3.34 4 3.75v16.5c0 .41.34.75.75.75h14.5c.41 0 .75-.34.75-.75V3.75c0-.41-.34-.75-.75-.75zM8.75 18h-2V9h2v9zm-1-10.02c-.69 0-1.25-.57-1.25-1.27 0-.7.56-1.26 1.25-1.26.69 0 1.25.56 1.25 1.26 0 .7-.56 1.27-1.25 1.27zm10.75 10.02h-2v-4.83c0-2.11-2.5-1.95-2.5 0V18h-2V9h2v1.02c.87-1.68 4-1.81 4 1.6V18z" clipRule="evenodd" />
                      </svg>
                    </a>
                    <a href={member.instagram} target="_blank" rel="noopener noreferrer" className={`text-gray-400 hover:text-white ${theme === 'dark' ? 'hover:text-gray-200' : 'hover:text-gray-800'}`}>
                      <span className="sr-only">Instagram</span>
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M7.75 2C5.13 2 3 4.13 3 6.75v10.5C3 19.87 5.13 22 7.75 22h10.5c2.62 0 4.75-2.13 4.75-4.75V6.75C23 4.13 20.87 2 18.25 2H7.75zM7.5 4h9c1.93 0 3.5 1.57 3.5 3.5v9c0 1.93-1.57 3.5-3.5 3.5h-9C5.57 20 4 18.43 4 16.5v-9C4 5.57 5.57 4 7.5 4zm7.5 2.25a.75.75 0 110 1.5.75.75 0 010-1.5zm-5.75 3a4 4 0 100 8 4 4 0 000-8zm0 1.5a2.5 2.5 0 110 5 2.5 2.5 0 010-5z" clipRule="evenodd" />
                      </svg>
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
                          <p className={`text-gray-400 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{testimonial.author}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <ContactUs />
        </div>
      </main>
      <Footer theme={theme} />
    </div>
  );
};

export default AboutUs;
