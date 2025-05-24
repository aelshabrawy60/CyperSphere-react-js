import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  BookOpen, 
  Award, 
  Users, 
  MessageSquare, 
  Briefcase, 
  Bot, 
  Flag, 
  ChevronRight, 
  Play,
  Star,
  TrendingUp,
  Lock,
  Globe,
  Zap,
  Target,
  Menu,
  X
} from 'lucide-react';

const CyberSphereAcademy = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Learning Paths",
      description: "Structured cybersecurity curricula designed by industry experts",
      color: "from-blue-500 to-cyan-400"
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Certificates",
      description: "Industry-recognized certifications to boost your career",
      color: "from-blue-500 to-pink-400"
    },
    {
      icon: <Flag className="w-8 h-8" />,
      title: "CTF Challenges",
      description: "Hands-on capture-the-flag competitions and practice",
      color: "from-green-500 to-teal-400"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Student Groups",
      description: "Connect and collaborate with fellow cybersecurity enthusiasts",
      color: "from-orange-500 to-red-400"
    }
  ];

  const stats = [
    { number: "50K+", label: "Active Students" },
    { number: "200+", label: "Expert Courses" },
    { number: "95%", label: "Success Rate" },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900/20 to-blue-900/20" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Navigation */}
      <nav className="relative z-50 px-6 py-4 backdrop-blur-lg bg-gray-900/80 border-b border-gray-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-400 bg-clip-text text-transparent">
              CyberSphere
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a href="#courses" className="hover:text-blue-400 transition-colors">Courses</a>
            <a href="#paths" className="hover:text-blue-400 transition-colors">Learning Paths</a>
            <a href="#ctf" className="hover:text-blue-400 transition-colors">CTF</a>
            <a href="#community" className="hover:text-blue-400 transition-colors">Community</a>
            <a href="#jobs" className="hover:text-blue-400 transition-colors">Jobs</a>
            <a href='/signin' className="bg-gradient-to-r from-blue-600 to-blue-600 px-6 py-2 rounded-full hover:from-blue-700 hover:to-blue-700 transition-all transform hover:scale-105">
              Get Started
            </a>
          </div>

          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-gray-900/95 backdrop-blur-lg md:hidden">
          <div className="flex flex-col items-center justify-center h-full space-y-8 text-xl">
            <a href="#courses" className="hover:text-blue-400 transition-colors">Courses</a>
            <a href="#paths" className="hover:text-blue-400 transition-colors">Learning Paths</a>
            <a href="#ctf" className="hover:text-blue-400 transition-colors">CTF</a>
            <a href="#community" className="hover:text-blue-400 transition-colors">Community</a>
            <a href="#jobs" className="hover:text-blue-400 transition-colors">Jobs</a>
            <a href='/signin' className="bg-gradient-to-r from-blue-600 to-blue-600 px-8 py-3 rounded-full">
              Get Started
            </a>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-32 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div 
            className="mb-8 transform transition-transform duration-1000"
            style={{ transform: `translateY(${scrollY * 0.1}px)` }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent leading-tight">
              Master Cybersecurity
              <br />
              <span className="text-4xl md:text-6xl">in the Digital Age</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed">
              Join thousands of professionals advancing their cybersecurity careers through our comprehensive learning platform
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <a href='/signin' className="group bg-gradient-to-r from-blue-600 to-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:from-blue-700 hover:to-blue-700 transition-all transform hover:scale-105 flex items-center justify-center space-x-2">
              <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>Start Learning</span>
            </a>
            <a href='/signin' className="border border-gray-600 px-8 py-4 rounded-full text-lg font-semibold hover:border-blue-400 hover:text-blue-400 transition-all flex items-center justify-center space-x-2">
              <Globe className="w-5 h-5" />
              <span>Explore Platform</span>
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-20">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="text-center transform hover:scale-105 transition-transform"
              >
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-blue-400 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-blue-400 bg-clip-text text-transparent">
              Everything You Need to Excel
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Comprehensive cybersecurity education with cutting-edge tools and community support
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group relative bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 hover:border-blue-500/50 transition-all duration-300 transform hover:scale-105"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Platform Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-900/30 to-blue-900/30 border border-blue-500/20 rounded-2xl p-8 hover:border-blue-400/40 transition-all">
              <BookOpen className="w-12 h-12 text-blue-400 mb-4" />
              <h3 className="text-2xl font-bold mb-4">Interactive Courses</h3>
              <p className="text-gray-300 mb-6">Hands-on learning with real-world scenarios and lab environments</p>
              <a href='/signin' className="text-blue-400 hover:text-blue-300 flex items-center space-x-2">
                <span>Explore Courses</span>
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>

            <div className="bg-gradient-to-br from-blue-900/30 to-pink-900/30 border border-blue-500/20 rounded-2xl p-8 hover:border-blue-400/40 transition-all">
              <Bot className="w-12 h-12 text-blue-400 mb-4" />
              <h3 className="text-2xl font-bold mb-4">AI Chatbot Assistant</h3>
              <p className="text-gray-300 mb-6">Get instant help and guidance from our intelligent learning assistant</p>
              <a href='/signin' className="text-blue-400 hover:text-blue-300 flex items-center space-x-2">
                <span>Chat Now</span>
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>

            <div className="bg-gradient-to-br from-green-900/30 to-teal-900/30 border border-green-500/20 rounded-2xl p-8 hover:border-green-400/40 transition-all">
              <Briefcase className="w-12 h-12 text-green-400 mb-4" />
              <h3 className="text-2xl font-bold mb-4">Career Center</h3>
              <p className="text-gray-300 mb-6">Access latest cybersecurity job opportunities from top companies</p>
              <a href='/signin' className="text-green-400 hover:text-green-300 flex items-center space-x-2">
                <span>View Jobs</span>
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Paths Preview */}
      <section className="relative z-10 py-20 px-6 bg-gradient-to-r from-blue-900/10 to-blue-900/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-blue-400 bg-clip-text text-transparent">
              Structured Learning Paths
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Follow expert-designed curricula from beginner to advanced levels
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Network Security", level: "Beginner to Advanced", duration: "12 weeks", students: "15K+" },
              { title: "Red Team", level: "Intermediate", duration: "8 weeks", students: "8K+" },
              { title: "Blue Team", level: "Advanced", duration: "10 weeks", students: "5K+" }
            ].map((path, index) => (
              <div key={index} className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 hover:border-blue-500/50 transition-all transform hover:scale-105">
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full text-sm">{path.level}</span>
                  <div className="flex items-center space-x-1 text-yellow-400">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm">4.9</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">{path.title}</h3>
                <div className="flex items-center justify-between text-gray-400 text-sm mb-6">
                  <span>{path.duration}</span>
                  <span>{path.students} students</span>
                </div>
                <a href='/signin' className="w-full px-3 bg-gradient-to-r from-blue-600 to-blue-600 py-2 rounded-lg hover:from-blue-700 hover:to-blue-700 transition-all">
                  Start Path
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-blue-400 bg-clip-text text-transparent">
            Join Our Community
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
            Connect with cybersecurity professionals, participate in discussions, and grow together
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: <Users className="w-8 h-8" />, title: "Study Groups", count: "500+ Groups" },
              { icon: <Flag className="w-8 h-8" />, title: "CTF Competitions", count: "Weekly Events" },
              { icon: <TrendingUp className="w-8 h-8" />, title: "Career Network", count: "25K+ Members" }
            ].map((item, index) => (
              <div key={index} className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:border-blue-500/50 transition-all">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-blue-400 font-medium">{item.count}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-20 px-6 bg-gradient-to-r from-blue-900/20 to-blue-900/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-blue-400 bg-clip-text text-transparent">
            Ready to Secure Your Future?
          </h2>
          <p className="text-xl text-gray-300 mb-12">
            Join CyberSphere Academy today and become part of the next generation of cybersecurity professionals
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a href='/signin' className="bg-gradient-to-r from-blue-600 to-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:from-blue-700 hover:to-blue-700 transition-all transform hover:scale-105 flex items-center justify-center space-x-2">
              <Zap className="w-5 h-5" />
              <span>Start Free</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-gray-800 bg-gray-900/50 backdrop-blur-sm py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-blue-400 bg-clip-text text-transparent">
                  CyberSphere
                </span>
              </div>
              <p className="text-gray-400">Empowering the next generation of cybersecurity professionals</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-blue-400 transition-colors">Courses</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Learning Paths</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Certificates</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">CTF</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Community</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-blue-400 transition-colors">Forums</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Study Groups</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Events</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-blue-400 transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2025 CyberSphere Academy. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CyberSphereAcademy;