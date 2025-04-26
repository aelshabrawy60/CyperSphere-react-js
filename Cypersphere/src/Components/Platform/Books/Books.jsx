import { useState, useEffect } from 'react';

// Book data included directly in the component for demonstration
const booksData = [
  {
    "name": "Advanced Penetration Testing",
    "link": "https://drive.google.com/file/d/19GQo0-ohAX9InQek7x1VzRtSqph8UawI/view?usp=drive_link"
  },
  {
    "name": "The Basics of Web Hacking",
    "link": "https://drive.google.com/file/d/1gym41c9DWUbtNTMH_89UMiO1XpLImE9_/view?usp=drive_link"
  },
  {
    "name": "The Basics of Hacking and Penetration Testing",
    "link": "https://drive.google.com/file/d/1aM8UWjTlBPhX7DTSl5nqnsBXkCQ_WMuv/view?usp=drive_link"
  },
  {
    "name": "The Art of Deception by Kevin Mitnick",
    "link": "https://drive.google.com/file/d/1hNtmje1Z8HsW1oXSioTGoBCuwXL2OL7x/view?usp=drive_link"
  },
  {
    "name": "SQL Injection Attacks and Defense",
    "link": "https://drive.google.com/file/d/1ST2GsPlPiOWR6N8MJwFrQGv2ccIxRPjz/view?usp=drive_link"
  },
  {
    "name": "Metasploit - The Penetration Tester's Guide",
    "link": "https://drive.google.com/file/d/1wwRvbEuD8Zanj0B6lozZGn7jvwb6zSSw/view?usp=drive_link"
  },
  {
    "name": "Ethical Hacking and Penetration Testing Guide",
    "link": "https://drive.google.com/file/d/1piQybIkvTVlJ4wrdZ1Tpp7qfl0CWblFG/view?usp=drive_link"
  },
  {
    "name": "Network Attacks and Exploitation",
    "link": "https://drive.google.com/file/d/1Zk78Zy9ic9o83iukQaOBmkYWA9GKksPN/view?usp=drive_link"
  },
  {
    "name": "Wireshark for Security Professionals",
    "link": "https://drive.google.com/file/d/1cc-VDV8PfkFNtkDDRMpPMecLG8d5HnKc/view?usp=drive_link"
  },
  {
    "name": "The Shellcoder's Handbook",
    "link": "https://drive.google.com/file/d/1wNrotCZgwIgdY3BLxWTlZJw6Mzsubftz/view?usp=drive_link"
  },
  {
    "name": "The Little Black Book of Computer Viruses",
    "link": "https://drive.google.com/file/d/1ZPMo5q4E5WtzsvzB1kzJ6KGjG_8Kb8Ow/view?usp=drive_link"
  },
  {
    "name": "XSS Attacks Cross Site Scripting Exploits and Defense",
    "link": "https://drive.google.com/file/d/1u33LFzTeHEj6RnzALkGmkboVEfT-8ovf/view?usp=drive_link"
  },
  {
    "name": "The Web Application Hacker's Handbook",
    "link": "https://drive.google.com/file/d/1pQDcUDhGicon9YMgvave9Z-IwjmUI5mr/view?usp=drive_link"
  },
  {
    "name": "Ethical Hacking and Countermeasures",
    "link": "https://drive.google.com/file/d/1sWKTsms9m-RiFhSDZs6Ula0cbhcnU1ln/view?usp=drive_link"
  },
  {
    "name": "Reversing - Secrets of Reverse Engineering",
    "link": "https://drive.google.com/file/d/1RaE82kdXcNGwK3jXeWdRmmlj9p9MXlK-/view?usp=drive_link"
  },
  {
    "name": "Network Security Bible",
    "link": "https://drive.google.com/file/d/1GtiW2feZKCep2LJb7XXNqyj9CqAmqxkn/view?usp=drive_link"
  },
  {
    "name": "Hacking Web Applications - Hacking Exposed",
    "link": "https://drive.google.com/file/d/1jWvPudp9-rMom6UZcGPYySlrVf_8oRIv/view?usp=drive_link"
  },
  {
    "name": "Hacking for Dummies",
    "link": "https://drive.google.com/file/d/1qDMHNOI7EFREiUB6nrjDIMoSyI_LeXo_/view?usp=drive_link"
  },
  {
    "name": "Ninja Hacking Unconventional Penetration Testing",
    "link": "https://drive.google.com/file/d/1LHi_l2v0_31l_hZ1PJx8JsaFHztjalF9/view?usp=drive_link"
  },
  {
    "name": "Gray Hat Hacking - The Ethical Hacker's Handbook",
    "link": "https://drive.google.com/file/d/1obMUWDPH5imEh93ZaIPmLbaIITxIr5mZ/view?usp=drive_link"
  },
  {
    "name": "Hack Attacks Testing",
    "link": "https://drive.google.com/file/d/1zN1hCa2PQIqZdSNopikzADjTUcnj3OYC/view?usp=drive_link"
  },
  {
    "name": "Basic Security Testing With Kali Linux",
    "link": "https://drive.google.com/file/d/1sUEKhP8vcNPkANnjmw_8LMb7f7AHOZDb/view?usp=drive_link"
  },
  {
    "name": "Information Security Management Handbook",
    "link": "https://drive.google.com/file/d/1dOJP6T0WuSLqP_xIzrVEpIyuohk_1_x8/view?usp=drive_link"
  },
  {
    "name": "Computer and Information Security Handbook",
    "link": "https://drive.google.com/file/d/1Cj8uvmeqeXqGk8gVsS-CuuzfgUR56W8I/view?usp=drive_link"
  },
  {
    "name": "Computer Security and Cryptography",
    "link": "https://drive.google.com/file/d/1NAgydCxMoATPw3DfP6eYQO5q9wXuaXe0/view?usp=drive_link"
  },
  {
    "name": "Python for Kids",
    "link": "https://drive.google.com/file/d/1LCfISLL9r__SqWMcq7p1PNtHnL87P0Tz/view?usp=drive_link"
  },
  {
    "name": "End to End Network Security - Defense-In-Depth",
    "link": "https://drive.google.com/file/d/18Xm4mQ7-aVdnjk4KTkRZyD27wK6weHzg/view?usp=drive_link"
  },
  {
    "name": "A Guide to Computer Network Security",
    "link": "https://drive.google.com/file/d/1b7dauYX6j8CAkuTD7FivMXMLVkVpa5bp/view?usp=drive_link"
  },
  {
    "name": "Essential Computer Security",
    "link": "https://drive.google.com/file/d/1y8oEdS_H7bE15mxtRIbqTecCkWpsQRI9/view?usp=drive_link"
  },
  {
    "name": "Security in Wireless Mesh Networks",
    "link": "https://drive.google.com/file/d/1h2iCfGmtGGDm2X326dghwDCtJo5libxy/view?usp=drive_link"
  },
  {
    "name": "Hacking Windows XP",
    "link": "https://drive.google.com/file/d/1X3LEvOwi3XCZFlofJUgKtJaBPr9Sg_xf/view?usp=drive_link"
  },
  {
    "name": "Hacking Exposed Windows Security Secrets & Solutions",
    "link": "https://drive.google.com/file/d/1sUCJI3LuZ2N7n816XHRQoTAxIKK2-ndi/view?usp=drive_link"
  },
  {
    "name": "Hacking Exposed Network Security Secrets & Solutions",
    "link": "https://drive.google.com/file/d/1fp8GlQVTZFEOFdBwYmfqjYWvH6GNH29k/view?usp=drive_link"
  },
  {
    "name": "Information Security - Principles and Practice",
    "link": "https://drive.google.com/file/d/1BQjQ-gE6LYICodz-d6IXiEaDuhp9r3OQ/view?usp=drive_link"
  },
  {
    "name": "Nessus, Snort and Ethereal Power Tools",
    "link": "https://drive.google.com/file/d/1NyKBdfmChNwOYV9_4FgtUWnlM3_VClNj/view?usp=drive_link"
  },
  {
    "name": "Active Defense A Comprehensive Guide to Network Security",
    "link": "https://drive.google.com/file/d/1ZYYi57xPJhRri9Koy2mOK9LfeuxSIBuA/view?usp=drive_link"
  },
  {
    "name": "Information Security Fundamentals",
    "link": "https://drive.google.com/file/d/17rtdEl2d90zOxFrlnzFvbnTPJtfdPSQr/view?usp=drive_link"
  },
  {
    "name": "Wireless Network Security",
    "link": "https://drive.google.com/file/d/1PYNaSVLaRJcQwV_7FsPHNw_reJINDDkv/view?usp=drive_link"
  },
  {
    "name": "Red Hat Linux Security and Optimization",
    "link": "https://drive.google.com/file/d/1jGZ5yoYx6p8j84avI0UAovHCLUx2UOtq/view?usp=drive_link"
  },
  {
    "name": "Windows Forensics Analysis",
    "link": "https://drive.google.com/file/d/1sveKt-wq_bsXP5LdO7fCrwabPo1XH7R7/view?usp=drive_link"
  },
  {
    "name": "Mobile and Wireless Network Security and Privacy",
    "link": "https://drive.google.com/file/d/1nu8Q6mrl0sMyxQdckJtQM7X37TttLEwm/view?usp=drive_link"
  },
  {
    "name": "Firewalls and Internet Security",
    "link": "https://drive.google.com/file/d/1q_4FjSN04p_C0ZuZ60Lx0E190f23ZtNZ/view?usp=drive_link"
  },
  {
    "name": "An Introduction To Computer Security - The NIST Handbook",
    "link": "https://drive.google.com/file/d/1rqyCGQejbnoKnqEZ1RueTFPwirsPtjKk/view?usp=drive_link"
  },
  {
    "name": "Unauthorized Access - Physical Penetration Testing for IT Security",
    "link": "https://drive.google.com/file/d/1_xuCzvH9njbffnhBzNkoih3596I3q150/view?usp=drive_link"
  },
  {
    "name": "Testing Web Security",
    "link": "https://drive.google.com/file/d/1WbuIrtneO0ZIIU-deFxkCiEjExrN0evl/view?usp=drive_link"
  },
  {
    "name": "Maximum Security - A Hacker's Guide to Protecting Your Internet",
    "link": "https://drive.google.com/file/d/1mnhsLf38QXfiB5bF1GIArjYqrl4-P0CA/view?usp=drive_link"
  },
  {
    "name": "Information Resource Guide Computer, Internet and Network Systems",
    "link": "https://drive.google.com/file/d/1b9bdxh-EkGaXeQKOQiwzhS0rjmMuW2un/view?usp=drive_link"
  },
  {
    "name": "The Hacker's Underground Handbook",
    "link": "https://drive.google.com/file/d/1-qwWrHQgSmJPzJagdoqy_-dWlhUUM3zY/view?usp=drive_link"
  },
  {
    "name": "Guide to SCADA and Industrial Control Systems Security",
    "link": "https://drive.google.com/file/d/19BhvlFKGI00MOqWFQ85OIkeVnKsQ6BmG/view?usp=drive_link"
  },
  {
    "name": "Sans sec504.1",
    "link": "https://drive.google.com/file/d/1AdqLDAIZYmQsI-VdWzundIy6ArbihCkh/view?usp=drive_link"
  },
  {
    "name": "Sans sec504.2",
    "link": "https://drive.google.com/file/d/1goeLiFbwSgllWHwqzjSM8cfN3H8qOPW3/view?usp=drive_link"
  },
  {
    "name": "Sans sec504.3",
    "link": "https://drive.google.com/file/d/1GYb27sr6TrqiHA5lU3icfAnCVy5EURBl/view?usp=drive_link"
  },
  {
    "name": "Sans sec504.4",
    "link": "https://drive.google.com/file/d/1vAUBppc6PpcpesxsAhWxn6o8M_7Dw_kC/view?usp=drive_link"
  },
  {
    "name": "Sans sec504.5",
    "link": "https://drive.google.com/file/d/1a7SwmvuIp5csPfH4OsXrGpzbVOG5cr3r/view?usp=drive_link"
  },
  {
    "name": "401",
    "link": "https://drive.google.com/file/d/1T0RXJbWHV2k9sxZqY1ILT3LLdcw6hEXv/view?usp=drive_link"
  },
  {
    "name": "401.2 عربي",
    "link": "https://drive.google.com/file/d/1Km-_4bU75uIZnE7AHjPTo-SLUf638BpC/view?usp=drive_link"
  },
  {
    "name": "401.3 عربي",
    "link": "https://drive.google.com/file/d/1Px97SVvuZuPPMo2tBFuZApxHYCCi_Ejd/view?usp=drive_link"
  }
]

export default function BookLibrary() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  useEffect(() => {
    // Simulate loading data from a file
    setTimeout(() => {
      setBooks(booksData);
      setLoading(false);
    }, 500);
    
    // In a real app with external JSON file, you would do:
    // import booksData from './books.json';
    // or
    // fetch('/books.json').then(res => res.json()).then(data => setBooks(data));
  }, []);

  const filteredBooks = books.filter(book =>
    book.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-3xl font-bold text-center mb-8">Cybersecurity Book Library</h1>
      
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search books by title..."
          className="w-full p-3 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredBooks.length === 0 ? (
        <p className="text-center text-gray-500 py-12">No books found matching your search.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBooks.map((book, index) => (
            <BookCard key={index} book={book} />
          ))}
        </div>
      )}
    </div>
  );
}

function BookCard({ book }) {
  const { name, link } = book;
  
  // Extract Google Drive file ID from the link
  const fileId = link.match(/\/d\/([^/]+)/)?.[1] || '';
  
  return (
    <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full border border-gray-600">
      
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold mb-2">{name}</h3>
        
        <div className="mt-auto pt-4">
          <a 
            href={link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center font-medium py-2 px-4 rounded transition-colors duration-300"
          >
            Download Book
          </a>
        </div>
      </div>
    </div>
  );
}