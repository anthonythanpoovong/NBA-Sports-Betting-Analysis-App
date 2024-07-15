import React from 'react';
import Footer from "../Footer";
import ContactUs from "./ContactUs";

const teamMembers = [
  {
    name: 'Abel',
    role: 'Frontend Developer',
    imageUrl: 'path/to/abel.jpg',
    bio: 'Abel is a skilled frontend developer with a passion for creating interactive user experiences.',
    github: 'https://github.com/abel',
    linkedin: 'https://linkedin.com/in/abel',
    twitter: 'https://twitter.com/abel',
    skills: ['React', 'JavaScript', 'UI/UX Design'],
    projects: [
      {
        name: 'Project A',
        imageUrl: 'path/to/projectA.jpg',
        description: 'Built a responsive web application using React and Node.js.',
      },
      // Add more projects as needed
    ],
    testimonials: [
      {
        quote: 'Working with Abel and his team was a fantastic experience. They delivered beyond our expectations!',
        author: 'John Doe, CEO of Example Inc.',
      },
      // Add more testimonials as needed
    ],
  },
  {
    name: 'Anthony',
    role: 'Backend Developer',
    imageUrl: 'path/to/anthony.jpg',
    bio: 'Anthony specializes in backend development and is adept at building robust and scalable applications.',
    github: 'https://github.com/anthony',
    linkedin: 'https://linkedin.com/in/anthony',
    twitter: 'https://twitter.com/anthony',
    skills: ['React', 'JavaScript', 'UI/UX Design'],
    projects: [
      {
        name: 'Project A',
        imageUrl: 'path/to/projectA.jpg',
        description: 'Built a responsive web application using React and Node.js.',
      },
      // Add more projects as needed
    ],
    testimonials: [
      {
        quote: 'Working with Abel and his team was a fantastic experience. They delivered beyond our expectations!',
        author: 'John Doe, CEO of Example Inc.',
      },
      // Add more testimonials as needed
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
    skills: ['React', 'JavaScript', 'UI/UX Design'],
    projects: [
      {
        name: 'Project A',
        imageUrl: 'path/to/projectA.jpg',
        description: 'Built a responsive web application using React and Node.js.',
      },
      // Add more projects as needed
    ],
    testimonials: [
      {
        quote: 'Working with Abel and his team was a fantastic experience. They delivered beyond our expectations!',
        author: 'John Doe, CEO of Example Inc.',
      },
      // Add more testimonials as needed
    ],
  },
  // Add more team members similarly
];

const AboutUs = ({ theme }) => {
  return (
    <div id="#about-us" className={`py-12 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
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
                  <a href={member.github} className={`text-gray-400 hover:text-white ${theme === 'dark' ? 'hover:text-gray-200' : 'hover:text-gray-800'}`}>
                    <span className="sr-only">GitHub</span>
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12 2C6.478 2 2 6.478 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.483 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.34-3.369-1.34-.454-1.154-1.11-1.461-1.11-1.461-.907-.62.069-.607.069-.607 1.002.07 1.53 1.03 1.53 1.03.892 1.528 2.341 1.087 2.91.831.092-.646.349-1.087.634-1.338-2.22-.254-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.447-1.274.097-2.654 0 0 .84-.269 2.75 1.024A9.561 9.561 0 0112 6.837c.85.004 1.705.114 2.504.334 1.909-1.293 2.748-1.024 2.748-1.024.546 1.38.202 2.401.1 2.654.641.699 1.028 1.592 1.028 2.683 0 3.841-2.339 4.685-4.565 4.934.36.31.678.924.678 1.861 0 1.345-.012 2.427-.012 2.754 0 .268.18.58.688.482A10.002 10.002 0 0022 12c0-5.522-4.478-10-10-10z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a href={member.linkedin} className={`text-gray-400 hover:text-white ${theme === 'dark' ? 'hover:text-gray-200' : 'hover:text-gray-800'}`}>
                    <span className="sr-only">LinkedIn</span>
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M19.25 3H4.75C4.34 3 4 3.34 4 3.75v16.5c0 .41.34.75.75.75h14.5c.41 0 .75-.34.75-.75V3.75c0-.41-.34-.75-.75-.75zM8.75 18h-2V9h2v9zm-1-10.02c-.69 0-1.25-.57-1.25-1.27 0-.7.56-1.26 1.25-1.26.69 0 1.25.56 1.25 1.26 0 .7-.56 1.27-1.25 1.27zm10.75 10.02h-2v-4.83c0-2.11-2.5-1.95-2.5 0V18h-2V9h2v1.02c.87-1.68 4-1.81 4 1.6V18z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a href={member.twitter} className={`text-gray-400 hover:text-white ${theme === 'dark' ? 'hover:text-gray-200' : 'hover:text-gray-800'}`}>
                    <span className="sr-only">Twitter</span>
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M23 4.01c-.82.36-1.71.61-2.64.72.95-.57 1.68-1.47 2.03-2.54-.89.52-1.87.9-2.92 1.1a4.93 4.93 0 00-8.39 4.48A13.98 13.98 0 011.64 3.16a4.93 4.93 0 001.53 6.58 4.91 4.91 0 01-2.23-.62v.06a4.93 4.93 0 003.95 4.83c-.73.2-1.49.3-2.26.11a4.93 4.93 0 004.6 3.42A9.88 9.88 0 010 20.9a13.94 13.94 0 007.55 2.22c9.06 0 14.02-7.5 14.02-14v-.64c.95-.68 1.77-1.52 2.42-2.48a9.86 9.86 0 01-2.86.79 4.91 4.91 0 002.14-2.71c-.89.52-1.87.9-2.92 1.1a4.93 4.93 0 00-8.39 4.48z" clipRule="evenodd" />
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
                  <h4 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Projects</h4>
                  <div className="mt-2 space-y-2">
                    {member.projects.map((project) => (
                      <div key={project.name} className="flex items-center">
                        <img className="w-8 h-8 rounded-full mr-2" src={project.imageUrl} alt={project.name} />
                        <div>
                          <p className={`text-gray-300 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{project.name}</p>
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
      <Footer theme="dark" />
    </div>
  );
};

export default AboutUs;
