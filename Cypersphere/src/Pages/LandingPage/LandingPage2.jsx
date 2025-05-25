import React, { useState, useEffect } from 'react';

const CyberSphereLanding = () => {
  const [typedText, setTypedText] = useState('');
  const [currentStringIndex, setCurrentStringIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const strings = [
    'Welcome to CyberSphere — your secure realm for learning, challenging, and ethical hacking!! ',
    'This is where your journey begins, from a beginner to a cybersecurity legend... ',
    'Are You Ready To Break The Limits Of Your Knowledge ??'
  ];

  useEffect(() => {
    const typeSpeed = isDeleting ? 30 : 50;
    const currentString = strings[currentStringIndex];
    
    const timeout = setTimeout(() => {
      if (!isDeleting && currentCharIndex < currentString.length) {
        setTypedText(currentString.substring(0, currentCharIndex + 1));
        setCurrentCharIndex(prev => prev + 1);
      } else if (isDeleting && currentCharIndex > 0) {
        setTypedText(currentString.substring(0, currentCharIndex - 1));
        setCurrentCharIndex(prev => prev - 1);
      } else if (!isDeleting && currentCharIndex === currentString.length) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && currentCharIndex === 0) {
        setIsDeleting(false);
        setCurrentStringIndex((prev) => (prev + 1) % strings.length);
      }
    }, typeSpeed);

    return () => clearTimeout(timeout);
  }, [currentCharIndex, currentStringIndex, isDeleting, strings]);

  const teamMembers = [
    {
      name: "Mohammed Elshafei",
      role: "Cybersecurity Expert",
      image: "https://i.postimg.cc/MKpNWFqQ/Screenshot-2025-05-18-232411.png"
    },
    {
      name: "Jane Smith",
      role: "CTF Specialist",
      image: "https://via.placeholder.com/150"
    },
    {
      name: "Ahmed Ali",
      role: "Network Security Guru",
      image: "https://via.placeholder.com/150"
    }
  ];

  return (
    <div className="bg-black text-gray-200 font-mono overflow-x-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              radial-gradient(circle at 10% 10%, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
              radial-gradient(circle at 30% 70%, rgba(6, 182, 212, 0.2) 2px, transparent 2px),
              radial-gradient(circle at 80% 20%, rgba(168, 85, 247, 0.15) 1.5px, transparent 1.5px),
              radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.05) 3px, transparent 3px)
            `,
            backgroundSize: '100px 100px, 150px 150px, 120px 120px, 200px 200px',
            animation: 'starDrift 20s infinite linear'
          }}
        />
      </div>

      {/* Header */}
      <header className="fixed top-0 w-full p-5 bg-black/80 z-50 flex justify-start items-center">
        <div className="font-sans font-bold text-3xl ml-5 text-purple-400" style={{ fontFamily: 'Orbitron, sans-serif', textShadow: '0 0 8px #A855F7' }}>
          CyberSphere
        </div>
      </header>

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center items-center text-center relative pt-20">
        <div className="bg-black border-2 border-cyan-400 rounded-lg p-5 w-full max-w-2xl mx-4 relative z-10 shadow-lg shadow-cyan-400/50 animate-pulse-glow">
          {/* Terminal Header */}
          <div className="bg-black p-2 rounded-t-lg flex justify-start gap-2">
            <span className="w-3 h-3 rounded-full bg-red-600"></span>
            <span className="w-3 h-3 rounded-full bg-yellow-600"></span>
            <span className="w-3 h-3 rounded-full bg-green-600"></span>
          </div>
          
          {/* Terminal Body */}
          <div className="p-5 text-left text-lg">
            <p className="mb-4">
              {'> '}
              <span className="text-pink-400">{typedText}</span>
              <span className="animate-pulse">|</span>
            </p>
            <a href='/signin' 
              className="bg-transparent border-2 border-cyan-400 text-gray-200 font-bold py-2 px-6 uppercase tracking-wider hover:bg-cyan-400 hover:text-black transition-all duration-300 animate-pulse-scale"
              style={{ fontFamily: 'Orbitron, sans-serif', textShadow: '0 0 5px #06B6D4' }}
            >
              Get Started
            </a>
          </div>
        </div>
        
        <div className="mt-8 text-center max-w-4xl mx-4 relative z-10">
          <p className="text-lg mb-4">
            Learn, connect, Hack — and get hired! Jump into CTFs, hands-on courses, group chats to grow your skills
          </p>
          <p className="text-lg">
            Explore the Jobs hub to launch your cybersecurity career!
          </p>
        </div>
      </section>

      {/* Who Is It For Section */}
      <section className="min-h-screen py-16 px-5 text-center relative">
        <h2 className="font-bold text-4xl mb-10 text-cyan-400" style={{ fontFamily: 'Orbitron, sans-serif', textShadow: '0 0 8px #06B6D4' }}>
          Who Is It For?
        </h2>
        <div className="flex justify-center gap-5 flex-wrap relative z-10">
          {[
            { title: "Students", description: "Learn Red Team, Blue Team, and Network Security with hands-on challenges." },
            { title: "Professionals", description: "Enhance your skills with advanced courses and real-world scenarios." },
            { title: "Enthusiasts", description: "Join a community of hackers and solve exciting CTF challenges." }
          ].map((card, index) => (
            <div 
              key={index}
              className="bg-black p-5 w-80 border-2 border-cyan-400 rounded-lg shadow-lg shadow-cyan-400/30 hover:scale-110 transform transition-all duration-300 animate-card-throw"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <h3 className="text-xl mb-3 text-gray-200">{card.title}</h3>
              <p className="text-gray-300">{card.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="min-h-screen py-16 px-5 text-center relative">
        <h2 className="font-bold text-4xl mb-10 text-cyan-400" style={{ fontFamily: 'Orbitron, sans-serif', textShadow: '0 0 8px #06B6D4' }}>
          How It Works
        </h2>
        <div className="flex justify-center gap-5 flex-wrap relative z-10">
          {[
            { title: "Learn", description: "Access courses, books, and articles on Red Team, Blue Team, and more." },
            { title: "Practice", description: "Solve CTF challenges to test your skills in real-world scenarios." },
            { title: "Connect", description: "Join group chats and interact with our AI chatbot for guidance." }
          ].map((card, index) => (
            <div 
              key={index}
              className="bg-black p-5 w-80 border-2 border-cyan-400 rounded-lg shadow-lg shadow-cyan-400/30 hover:scale-110 transform transition-all duration-300 animate-card-throw"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <h3 className="text-xl mb-3 text-gray-200">{card.title}</h3>
              <p className="text-gray-300">{card.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* The Team Section */}
      <section className="min-h-screen py-16 px-5 text-center relative">
        <h2 className="font-bold text-4xl mb-10 text-cyan-400" style={{ fontFamily: 'Orbitron, sans-serif', textShadow: '0 0 8px #06B6D4' }}>
          The Team
        </h2>
        <div className="flex justify-center gap-8 flex-wrap relative z-10">
          {teamMembers.map((member, index) => (
            <div key={index} className="inline-block m-5">
              <img 
                src={member.image}
                alt={member.name}
                className="w-36 h-36 rounded-full border-2 border-cyan-400 object-cover hover:scale-110 transition-transform duration-300"
              />
              <h3 className="text-xl mt-3 text-gray-200">{member.name}</h3>
              <p className="text-gray-400">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-gray-200 py-10 px-5 flex justify-between items-center flex-wrap border-t-4 border-cyan-400">
        <div className="flex flex-col gap-3">
          <a href="https://cyper-sphere.vercel.app/privacy-policy" className="text-gray-200 hover:text-cyan-400 transition-colors duration-300 text-lg">
            Privacy
          </a>
          <a href="https://cyper-sphere.vercel.app/terms-of-service" className="text-gray-200 hover:text-cyan-400 transition-colors duration-300 text-lg">
            Terms
          </a>
          <a href="https://cyper-sphere.vercel.app/delete-your-data" className="text-gray-200 hover:text-cyan-400 transition-colors duration-300 text-lg">
            Data
          </a>
          <a href="mailto:elshaf3yx0@gmail.com" className="text-gray-200 hover:text-cyan-400 transition-colors duration-300 text-lg">
            Support Email: elshaf3yx0@gmail.com
          </a>
        </div>
        
        <div className="flex flex-col items-end gap-3">
          <div className="flex gap-6">
            <a href="https://www.linkedin.com/in/mohammed-elshafei-810943221/" target="_blank" rel="noopener noreferrer" className="text-gray-200 hover:text-cyan-400 transition-colors duration-300 text-2xl">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="https://www.facebook.com/mohamed.elshafie.9400" target="_blank" rel="noopener noreferrer" className="text-gray-200 hover:text-cyan-400 transition-colors duration-300 text-2xl">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="https://www.instagram.com/mohammed_elshafei410/" target="_blank" rel="noopener noreferrer" className="text-gray-200 hover:text-cyan-400 transition-colors duration-300 text-2xl">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
          <p className="text-base">© 2025 CyberSphere</p>
        </div>
      </footer>

      {/* Custom Styles */}
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&family=VT323&display=swap');
        @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css');
        
        @keyframes starDrift {
          0% { background-position: 0 0, 0 0, 0 0, 0 0; }
          100% { background-position: 100px 100px, 150px 150px, 120px 120px, 200px 200px; }
        }
        
        @keyframes pulse-glow {
          0% { box-shadow: 0 0 10px #06B6D4, 0 0 20px #A855F7; }
          50% { box-shadow: 0 0 15px #06B6D4, 0 0 25px #A855F7; }
          100% { box-shadow: 0 0 10px #06B6D4, 0 0 20px #A855F7; }
        }
        
        @keyframes pulse-scale {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        
        @keyframes card-throw {
          0% {
            transform: translateY(100px) rotate(10deg) scale(0.9);
            opacity: 0;
          }
          50% {
            transform: translateY(-20px) rotate(-5deg) scale(1.1);
            opacity: 0.5;
          }
          100% {
            transform: translateY(0) rotate(0deg) scale(1);
            opacity: 1;
          }
        }
        
        .animate-pulse-glow {
          animation: pulse-glow 3s infinite ease-in-out;
        }
        
        .animate-pulse-scale {
          animation: pulse-scale 2s infinite;
        }
        
        .animate-card-throw {
          animation: card-throw 1s ease-out;
        }
        
        @media (max-width: 768px) {
          .flex-wrap > div {
            width: 100% !important;
            max-width: 90% !important;
          }
          
          footer {
            flex-direction: column;
            align-items: center;
            gap: 20px;
          }
          
          footer > div:last-child {
            align-items: center;
          }
        }
      `}</style>
    </div>
  );
};

export default CyberSphereLanding;