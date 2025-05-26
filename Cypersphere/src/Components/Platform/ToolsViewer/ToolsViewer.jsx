import React, { useState } from 'react';
import { ChevronLeft, ExternalLink, Shield, Search, Terminal } from 'lucide-react';

const toolsData = {
  "Multi-paradigm Frameworks": [
    { name: "Metasploit", description: "Software for offensive security teams to help verify vulnerabilities and manage security assessments.", category: "Framework" },
    { name: "Armitage", description: "Java-based GUI front-end for the Metasploit Framework.", category: "Framework" },
    { name: "Faraday", description: "Multiuser integrated pentesting environment for red teams performing cooperative penetration tests, security audits, and risk assessments.", category: "Framework" },
    { name: "ExploitPack", description: "Graphical tool for automating penetration tests that ships with many pre-packaged exploits.", category: "Framework" },
    { name: "Pupy", description: "Cross-platform (Windows, Linux, macOS, Android) remote administration and post-exploitation tool.", category: "Framework" },
    { name: "AutoSploit", description: "Automated mass exploiter, which collects target by employing the Shodan.io API and programmatically chooses Metasploit exploit modules based on the Shodan query.", category: "Framework" },
    { name: "Decker", description: "Penetration testing orchestration and automation framework, which allows writing declarative, reusable configurations capable of ingesting variables and using outputs of tools it has run as inputs to others.", category: "Framework" },
    { name: "EaST", description: "«Exploits And Security Tools» penetration testing framework.", category: "Framework" }
  ],
  "Network Vulnerability Scanners": [
    { name: "Netsparker Application Security Scanner", description: "Application security scanner to automatically find security flaws.", category: "Scanner" },
    { name: "Nexpose", description: "Commercial vulnerability and risk management assessment engine that integrates with Metasploit, sold by Rapid7.", category: "Scanner" },
    { name: "Nessus", description: "Commercial vulnerability management, configuration, and compliance assessment platform, sold by Tenable.", category: "Scanner" },
    { name: "OpenVAS", description: "Free software implementation of the popular Nessus vulnerability assessment system.", category: "Scanner" },
    { name: "Vuls", description: "Agentless vulnerability scanner for GNU/Linux and FreeBSD, written in Go.", category: "Scanner" }
  ],
  "Static Analyzers": [
    { name: "Brakeman", description: "Static analysis security vulnerability scanner for Ruby on Rails applications.", category: "Static Analysis" },
    { name: "cppcheck", description: "Extensible C/C++ static analyzer focused on finding bugs.", category: "Static Analysis" },
    { name: "FindBugs", description: "Free software static analyzer to look for bugs in Java code.", category: "Static Analysis" },
    { name: "sobelow", description: "Security-focused static analysis for the Phoenix Framework.", category: "Static Analysis" },
    { name: "bandit", description: "Security oriented static analyser for python code.", category: "Static Analysis" },
    { name: "Progpilot", description: "Static security analysis tool for PHP code.", category: "Static Analysis" },
    { name: "RegEx-DoS", description: "Analyzes source code for Regular Expressions susceptible to Denial of Service attacks.", category: "Static Analysis" }
  ],
  "Web Vulnerability Scanners": [
    { name: "Nikto", description: "Noisy but fast black box web server and web application vulnerability scanner.", category: "Web Scanner" },
    { name: "Arachni", description: "Scriptable framework for evaluating the security of web applications.", category: "Web Scanner" },
    { name: "w3af", description: "Web application attack and audit framework.", category: "Web Scanner" },
    { name: "Wapiti", description: "Black box web application vulnerability scanner with built-in fuzzer.", category: "Web Scanner" },
    { name: "SecApps", description: "In-browser web application security testing suite.", category: "Web Scanner" },
    { name: "WebReaver", description: "Commercial, graphical web application vulnerability scanner designed for macOS.", category: "Web Scanner" },
    { name: "WPScan", description: "Black box WordPress vulnerability scanner.", category: "Web Scanner" },
    { name: "cms-explorer", description: "Reveal the specific modules, plugins, components and themes that various websites powered by content management systems are running.", category: "Web Scanner" },
    { name: "joomscan", description: "Joomla vulnerability scanner.", category: "Web Scanner" },
    { name: "ACSTIS", description: "Automated client-side template injection (sandbox escape/bypass) detection for AngularJS.", category: "Web Scanner" },
    { name: "SQLmate", description: "A friend of sqlmap that identifies sqli vulnerabilities based on a given dork and website (optional).", category: "Web Scanner" },
    { name: "JCS", description: "Joomla Vulnerability Component Scanner with automatic database updater from exploitdb and packetstorm.", category: "Web Scanner" },
    { name: "Netsparker Application Security Scanner", description: "Application security scanner to automatically find security flaws.", category: "Web Scanner" },
    { name: "tulpar", description: "Web Vulnerability Scanner.", category: "Web Scanner" },
    { name: "V3n0m Scanner", description: "Popular Pentesting scanner in Python3.6 for SQLi/XSS/LFI/RFI and other Vulns.", category: "Web Scanner" },
    { name: "golismero", description: "The Web Knife.", category: "Web Scanner" },
    { name: "sqliv", description: "Massive SQL injection vulnerability scanner.", category: "Web Scanner" },
    { name: "Striker", description: "Striker is an offensive information and vulnerability scanner.", category: "Web Scanner" },
    { name: "BlackWidow", description: "A Python based web application scanner to gather OSINT and fuzz for OWASP vulnerabilities on a target website.", category: "Web Scanner" },
    { name: "twa", description: "A tiny web auditor with strong opinions.", category: "Web Scanner" },
    { name: "CMSeek", description: "CMS Detection and Exploitation suite - Scan WordPress, Joomla, Drupal and 130 other CMSs.", category: "Web Scanner" },
    { name: "RapidScan", description: "The Multi-Tool Web Vulnerability Scanner.", category: "Web Scanner" }
  ],
  "Network Tools": [
    { name: "pig", description: "GNU/Linux packet crafting tool.", category: "Network" },
    { name: "Network-Tools.com", description: "Website offering an interface to numerous basic network utilities like ping, traceroute, whois, and more.", category: "Network" },
    { name: "Intercepter-NG", description: "Multifunctional network toolkit.", category: "Network" },
    { name: "SPARTA", description: "Graphical interface offering scriptable, configurable access to existing network infrastructure scanning and enumeration tools.", category: "Network" },
    { name: "Zarp", description: "Network attack tool centered around the exploitation of local networks.", category: "Network" },
    { name: "dsniff", description: "Collection of tools for network auditing and pentesting.", category: "Network" },
    { name: "scapy", description: "Python-based interactive packet manipulation program & library.", category: "Network" },
    { name: "Printer Exploitation Toolkit (PRET)", description: "Tool for printer security testing capable of IP and USB connectivity, fuzzing, and exploitation of PostScript, PJL, and PCL printer language features.", category: "Network" },
    { name: "Praeda", description: "Automated multi-function printer data harvester for gathering usable data during security assessments.", category: "Network" },
    { name: "routersploit", description: "Open source exploitation framework similar to Metasploit but dedicated to embedded devices.", category: "Network" },
    { name: "CrackMapExec", description: "Swiss army knife for pentesting networks.", category: "Network" },
    { name: "impacket", description: "Collection of Python classes for working with network protocols.", category: "Network" },
    { name: "dnstwist", description: "Domain name permutation engine for detecting typo squatting, phishing and corporate espionage.", category: "Network" },
    { name: "THC Hydra", description: "Online password cracking tool with built-in support for many network protocols, including HTTP, SMB, FTP, telnet, ICQ, MySQL, LDAP, IMAP, VNC, and more.", category: "Network" },
    { name: "IKEForce", description: "Command line IPSEC VPN brute forcing tool for Linux that allows group name/ID enumeration and XAUTH brute forcing capabilities.", category: "Network" },
    { name: "hping3", description: "Network tool able to send custom TCP/IP packets.", category: "Network" },
    { name: "rshijack", description: "TCP connection hijacker, Rust rewrite of shijack.", category: "Network" },
    { name: "NetworkMiner", description: "A Network Forensic Analysis Tool (NFAT).", category: "Network" },
    { name: "Paros", description: "A Java-based HTTP/HTTPS proxy for assessing web application vulnerability.", category: "Network" },
    { name: "mitmsocks4j", description: "Man-in-the-middle SOCKS Proxy for Java.", category: "Network" },
    { name: "Charles Proxy", description: "A cross-platform GUI web debugging proxy to view intercepted HTTP and HTTPS/SSL live traffic.", category: "Network" },
    { name: "Habu", description: "Python Network Hacking Toolkit.", category: "Network" },
    { name: "Wifi Jammer", description: "Free program to jam all wifi clients in range.", category: "Network" },
    { name: "Firesheep", description: "Free program for HTTP session hijacking attacks.", category: "Network" },
    { name: "BruteX", description: "Automatically brute force all services running on a target.", category: "Network" }
  ],
  "Forensic Tools": [
    { name: "Autopsy", description: "A digital forensics platform and graphical interface to The Sleuth Kit and other digital forensics tools.", category: "Forensics" },
    { name: "sleuthkit", description: "A library and collection of command-line digital forensics tools.", category: "Forensics" },
    { name: "EnCase", description: "The shared technology within a suite of digital investigations products by Guidance Software.", category: "Forensics" },
    { name: "malzilla", description: "Malware hunting tool.", category: "Forensics" },
    { name: "PEview", description: "A quick and easy way to view the structure and content of 32-bit Portable Executable (PE) and Component Object File Format (COFF) files.", category: "Forensics" },
    { name: "HxD", description: "A hex editor which, additionally to raw disk editing and modifying of main memory (RAM), handles files of any size.", category: "Forensics" },
    { name: "WinHex", description: "A hexadecimal editor, helpful in the realm of computer forensics, data recovery, low-level data processing, and IT security.", category: "Forensics" },
    { name: "BinText", description: "A small, very fast and powerful text extractor that will be of particular interest to programmers.", category: "Forensics" }
  ],
  "Cryptography Tools": [
    { name: "xortool", description: "A tool to analyze multi-byte XOR cipher.", category: "Cryptography" }
  ],
  "Exfiltration Tools": [
    { name: "DET", description: "Proof of concept to perform data exfiltration using either single or multiple channel(s) at the same time.", category: "Exfiltration" },
    { name: "pwnat", description: "Punches holes in firewalls and NATs.", category: "Exfiltration" },
    { name: "tgcd", description: "Simple Unix network utility to extend the accessibility of TCP/IP based network services beyond firewalls.", category: "Exfiltration" },
    { name: "Iodine", description: "Tunnel IPv4 data through a DNS server; useful for exfiltration from networks where Internet access is firewalled, but DNS queries are allowed.", category: "Exfiltration" }
  ],
  "Network Reconnaissance Tools": [
    { name: "zmap", description: "Open source network scanner that enables researchers to easily perform Internet-wide network studies.", category: "Reconnaissance" },
    { name: "nmap", description: "Free security scanner for network exploration & security audits.", category: "Reconnaissance" },
    { name: "scanless", description: "Utility for using websites to perform port scans on your behalf so as not to reveal your own IP.", category: "Reconnaissance" },
    { name: "DNSDumpster", description: "Online DNS recon and search service.", category: "Reconnaissance" },
    { name: "CloudFail", description: "Unmask server IP addresses hidden behind Cloudflare by searching old database records and detecting misconfigured DNS.", category: "Reconnaissance" },
    { name: "dnsenum", description: "Perl script that enumerates DNS information from a domain, attempts zone transfers, performs a brute force dictionary style attack, and then performs reverse look-ups on the results.", category: "Reconnaissance" },
    { name: "dnsmap", description: "Passive DNS network mapper.", category: "Reconnaissance" },
    { name: "dnsrecon", description: "DNS enumeration script.", category: "Reconnaissance" },
    { name: "dnstracer", description: "Determines where a given DNS server gets its information from, and follows the chain of DNS servers.", category: "Reconnaissance" },
    { name: "passivedns-client", description: "Library and query tool for querying several passive DNS providers.", category: "Reconnaissance" },
    { name: "passivedns", description: "Network sniffer that logs all DNS server replies for use in a passive DNS setup.", category: "Reconnaissance" },
    { name: "Mass Scan", description: "TCP port scanner, spews SYN packets asynchronously, scanning entire Internet in under 5 minutes.", category: "Reconnaissance" },
    { name: "smbmap", description: "Handy SMB enumeration tool.", category: "Reconnaissance" },
    { name: "XRay", description: "Network (sub)domain discovery and reconnaissance automation tool.", category: "Reconnaissance" },
    { name: "ACLight", description: "Script for advanced discovery of sensitive Privileged Accounts - includes Shadow Admins.", category: "Reconnaissance" },
    { name: "ScanCannon", description: "Python script to quickly enumerate large networks by calling masscan to quickly identify open ports and then nmap to gain details on the systems/services on those ports.", category: "Reconnaissance" },
    { name: "fierce", description: "Python3 port of the original fierce.pl DNS reconnaissance tool for locating non-contiguous IP space.", category: "Reconnaissance" },
    { name: "ctfr", description: "Domain enumeration, it just abuses of Certificate Transparency logs.", category: "Reconnaissance" },
    { name: "badkarma", description: "badKarma is an open source GUI based network reconnaissance toolkit which aims to assist penetration testers during network infrastructure assessments..", category: "Reconnaissance" },
    { name: "Vanquish", description: "Vanquish is a Kali Linux based Enumeration Orchestrator built in Python. Vanquish leverages the opensource enumeration tools on Kali to perform multiple active information gathering phases.", category: "Reconnaissance" },
    { name: "Reconnoitre", description: "A security tool for multithreaded information gathering and service enumeration whilst building directory structures to store results, along with writing out recommendations for further testing.", category: "Reconnaissance" }
  ],
  "Protocol Analyzers and Sniffers": [
    { name: "tcpdump/libpcap", description: "Common packet analyzer that runs under the command line.", category: "Protocol Analysis" },
    { name: "Wireshark", description: "Widely-used graphical, cross-platform network protocol analyzer.", category: "Protocol Analysis" },
    { name: "netsniff-ng", description: "Swiss army knife for for network sniffing.", category: "Protocol Analysis" },
    { name: "Dshell", description: "Network forensic analysis framework.", category: "Protocol Analysis" },
    { name: "Debookee", description: "Simple and powerful network traffic analyzer for macOS.", category: "Protocol Analysis" },
    { name: "Dripcap", description: "Caffeinated packet analyzer.", category: "Protocol Analysis" },
    { name: "Netzob", description: "Reverse engineering, traffic generation and fuzzing of communication protocols.", category: "Protocol Analysis" },
    { name: "sniffglue", description: "Secure multithreaded packet sniffer.", category: "Protocol Analysis" }
  ],
  "Proxies and MITM Tools": [
    { name: "dnschef", description: "Highly configurable DNS proxy for pentesters.", category: "MITM" },
    { name: "mitmproxy", description: "Interactive TLS-capable intercepting HTTP proxy for penetration testers and software developers.", category: "MITM" },
    { name: "Morpheus", description: "Automated ettercap TCP/IP Hijacking tool.", category: "MITM" },
    { name: "mallory", description: "HTTP/HTTPS proxy over SSH.", category: "MITM" },
    { name: "SSH MITM", description: "Intercept SSH connections with a proxy; all plaintext passwords and sessions are logged to disk.", category: "MITM" },
    { name: "evilgrade", description: "Modular framework to take advantage of poor upgrade implementations by injecting fake updates.", category: "MITM" },
    { name: "Ettercap", description: "Comprehensive, mature suite for machine-in-the-middle attacks.", category: "MITM" },
    { name: "BetterCAP", description: "Modular, portable and easily extensible MITM framework.", category: "MITM" },
    { name: "MITMf", description: "Framework for Man-In-The-Middle attacks.", category: "MITM" },
    { name: "Lambda-Proxy", description: "Utility for testing SQL Injection vulnerabilities on AWS Lambda serverless functions.", category: "MITM" }
  ],
  "Wireless Network Tools": [
    { name: "Aircrack-ng", description: "Set of tools for auditing wireless networks.", category: "Wireless" },
    { name: "Kismet", description: "Wireless network detector, sniffer, and IDS.", category: "Wireless" },
    { name: "Reaver", description: "Brute force attack against WiFi Protected Setup.", category: "Wireless" },
    { name: "Wifite", description: "Automated wireless attack tool.", category: "Wireless" },
    { name: "Fluxion", description: "Suite of automated social engineering based WPA attacks.", category: "Wireless" },
    { name: "Airgeddon", description: "Multi-use bash script for Linux systems to audit wireless networks.", category: "Wireless" },
    { name: "Cowpatty", description: "Brute-force dictionary attack against WPA-PSK.", category: "Wireless" },
    { name: "BoopSuite", description: "Suite of tools written in Python for wireless auditing.", category: "Wireless" },
    { name: "Bully", description: "Implementation of the WPS brute force attack, written in C.", category: "Wireless" },
    { name: "infernal-twin", description: "Automated wireless hacking tool.", category: "Wireless" },
    { name: "krackattacks-scripts", description: "WPA2 Krack attack scripts.", category: "Wireless" },
    { name: "KRACK Detector", description: "Detect and prevent KRACK attacks in your network.", category: "Wireless" },
    { name: "wifi-arsenal", description: "Resources for Wi-Fi Pentesting.", category: "Wireless" },
    { name: "WiFi-Pumpkin", description: "Framework for rogue Wi-Fi access point attack.", category: "Wireless" }
  ],
  "Transport Layer Security Tools": [
    { name: "SSLyze", description: "Fast and comprehensive TLS/SSL configuration analyzer to help identify security mis-configurations.", category: "TLS/SSL" },
    { name: "tls_prober", description: "Fingerprint a server's SSL/TLS implementation.", category: "TLS/SSL" },
    { name: "testssl.sh", description: "Command line tool which checks a server's service on any port for the support of TLS/SSL ciphers, protocols as well as some cryptographic flaws.", category: "TLS/SSL" },
    { name: "crackpkcs12", description: "Multithreaded program to crack PKCS#12 files (.p12 and .pfx extensions), such as TLS/SSL certificates.", category: "TLS/SSL" }
  ],
  "Web Exploitation": [
    { name: "OWASP Zed Attack Proxy (ZAP)", description: "Feature-rich, scriptable HTTP intercepting proxy and fuzzer for penetration testing web applications.", category: "Web Exploitation" },
    { name: "Fiddler", description: "Free cross-platform web debugging proxy with user-friendly companion tools.", category: "Web Exploitation" },
    { name: "Burp Suite", description: "Integrated platform for performing security testing of web applications.", category: "Web Exploitation" },
    { name: "autochrome", description: "Easy to install a test browser with all the appropriate setting needed for web application testing with native Burp support, from NCCGroup.", category: "Web Exploitation" },
    { name: "Browser Exploitation Framework (BeEF)", description: "Command and control server for delivering exploits to commandeered Web browsers.", category: "Web Exploitation" },
    { name: "Offensive Web Testing Framework (OWTF)", description: "Python-based framework for pentesting Web applications based on the OWASP Testing Guide.", category: "Web Exploitation" },
    { name: "Wordpress Exploit Framework", description: "Ruby framework for developing and using modules which aid in the penetration testing of WordPress powered websites and systems.", category: "Web Exploitation" },
    { name: "WPSploit", description: "Exploit WordPress-powered websites with Metasploit.", category: "Web Exploitation" },
    { name: "SQLmap", description: "Automatic SQL injection and database takeover tool.", category: "Web Exploitation" },
    { name: "tplmap", description: "Automatic server-side template injection and Web server takeover tool.", category: "Web Exploitation" },
    { name: "weevely3", description: "Weaponized web shell.", category: "Web Exploitation" },
    { name: "Wappalyzer", description: "Wappalyzer uncovers the technologies used on websites.", category: "Web Exploitation" },
    { name: "WhatWeb", description: "Website fingerprinter.", category: "Web Exploitation" },
    { name: "BlindElephant", description: "Web application fingerprinter.", category: "Web Exploitation" },
    { name: "wafw00f", description: "Identifies and fingerprints Web Application Firewall (WAF) products.", category: "Web Exploitation" },
    { name: "fimap", description: "Find, prepare, audit, exploit and even Google automatically for LFI/RFI bugs.", category: "Web Exploitation" },
    { name: "Kadabra", description: "Automatic LFI exploiter and scanner.", category: "Web Exploitation" },
    { name: "Kadimus", description: "LFI scan and exploit tool.", category: "Web Exploitation" },
    { name: "liffy", description: "LFI exploitation tool.", category: "Web Exploitation" },
    { name: "Commix", description: "Automated all-in-one operating system command injection and exploitation tool.", category: "Web Exploitation" },
    { name: "DVCS Ripper", description: "Rip web accessible (distributed) version control systems: SVN/GIT/HG/BZR.", category: "Web Exploitation" },
    { name: "GitTools", description: "Automatically find and download Web-accessible .git repositories.", category: "Web Exploitation" },
    { name: "sslstrip", description: "Demonstration of the HTTPS stripping attacks.", category: "Web Exploitation" },
    { name: "sslstrip2", description: "SSLStrip version to defeat HSTS.", category: "Web Exploitation" },
    { name: "NoSQLmap", description: "Automatic NoSQL injection and database takeover tool.", category: "Web Exploitation" },
    { name: "VHostScan", description: "A virtual host scanner that performs reverse lookups, can be used with pivot tools, detect catch-all scenarios, aliases and dynamic default pages.", category: "Web Exploitation" },
    { name: "FuzzDB", description: "Dictionary of attack patterns and primitives for black-box application fault injection and resource discovery.", category: "Web Exploitation" },
    { name: "EyeWitness", description: "Tool to take screenshots of websites, provide some server header info, and identify default credentials if possible.", category: "Web Exploitation" },
    { name: "webscreenshot", description: "A simple script to take screenshots of list of websites.", category: "Web Exploitation" },
    { name: "recursebuster", description: "Content discovery tool to perform directory and file bruteforcing.", category: "Web Exploitation" },
    { name: "Raccoon", description: "High performance offensive security tool for reconnaissance and vulnerability scanning.", category: "Web Exploitation" },
    { name: "WhatWaf", description: "Detect and bypass web application firewalls and protection systems.", category: "Web Exploitation" },
    { name: "badtouch", description: "Scriptable network authentication cracker.", category: "Web Exploitation" },
    { name: "Shiva", description: "Improved DOS exploit for wordpress websites (CVE-2018-6389).", category: "Web Exploitation" }
  ],
  "Hex Editors": [
    { name: "HexEdit.js", description: "Browser-based hex editing.", category: "Hex Editor" },
    { name: "Hexinator", description: "World's finest (proprietary, commercial) Hex Editor.", category: "Hex Editor" },
    { name: "Frhed", description: "Binary file editor for Windows.", category: "Hex Editor" },
    { name: "0xED", description: "Native macOS hex editor that supports plug-ins to display custom data types.", category: "Hex Editor" },
    { name: "Hex Fiend", description: "Fast, open source, hex editor for macOS with support for viewing binary diffs.", category: "Hex Editor" },
    { name: "Bless", description: "High quality, full featured, cross-platform graphical hex editor written in Gtk#.", category: "Hex Editor" },
    { name: "wxHexEditor", description: "Free GUI hex editor for GNU/Linux, macOS, and Windows.", category: "Hex Editor" },
    { name: "hexedit", description: "Simple, fast, console-based hex editor.", category: "Hex Editor" }
  ],
  "File Format Analysis Tools": [
    { name: "Kaitai Struct", description: "File formats and network protocols dissection language and web IDE, generating parsers in C++, C#, Java, JavaScript, Perl, PHP, Python, Ruby.", category: "File Analysis" },
    { name: "Veles", description: "Binary data visualization and analysis tool.", category: "File Analysis" },
    { name: "Hachoir", description: "Python library to view and edit a binary stream as tree of fields and tools for metadata extraction.", category: "File Analysis" }
  ],
  "Anti-virus Evasion Tools": [
    { name: "Veil", description: "Generate metasploit payloads that bypass common anti-virus solutions.", category: "AV Evasion" },
    { name: "shellsploit", description: "Generates custom shellcode, backdoors, injectors, optionally obfuscates every byte via encoders.", category: "AV Evasion" },
    { name: "Hyperion", description: "Runtime encryptor for 32-bit portable executables (\"PE .exes\").", category: "AV Evasion" },
    { name: "AntiVirus Evasion Tool (AVET)", description: "Post-process exploits containing executable files targeted for Windows machines to avoid being recognized by antivirus software.", category: "AV Evasion" },
    { name: "peCloak.py", description: "Automates the process of hiding a malicious Windows executable from antivirus (AV) detection.", category: "AV Evasion" },
    { name: "peCloakCapstone", description: "Multi-platform fork of the peCloak.py automated malware antivirus evasion tool.", category: "AV Evasion" },
    { name: "UniByAv", description: "Simple obfuscator that takes raw shellcode and generates Anti-Virus friendly executables by using a brute-forcable, 32-bit XOR key.", category: "AV Evasion" },
    { name: "Shellter", description: "Dynamic shellcode injection tool, and the first truly dynamic PE infector ever created.", category: "AV Evasion" }
  ],
  "Hash Cracking Tools": [
    { name: "John the Ripper", description: "Fast password cracker.", category: "Password Cracking" },
    { name: "Hashcat", description: "The more fast hash cracker.", category: "Password Cracking" },
    { name: "CeWL", description: "Generates custom wordlists by spidering a target's website and collecting unique words.", category: "Password Cracking" },
    { name: "JWT Cracker", description: "Simple HS256 JWT token brute force cracker.", category: "Password Cracking" },
    { name: "Rar Crack", description: "RAR bruteforce cracker.", category: "Password Cracking" },
    { name: "BruteForce Wallet", description: "Find the password of an encrypted wallet file (i.e. wallet.dat).", category: "Password Cracking" },
    { name: "StegCracker", description: "Steganography brute-force utility to uncover hidden data inside files.", category: "Password Cracking" },
    { name: "Cr3d0v3r", description: "Know the dangers of credential reuse attacks.", category: "Password Cracking" },
    { name: "HashBuster", description: "Crack hashes in seconds.", category: "Password Cracking" }
  ],
  "Windows Utilities": [
    { name: "Sysinternals Suite", description: "The Sysinternals Troubleshooting Utilities.", category: "Windows Utility" },
    { name: "Windows Credentials Editor", description: "Inspect logon sessions and add, change, list, and delete associated credentials, including Kerberos tickets.", category: "Windows Utility" },
    { name: "mimikatz", description: "Credentials extraction tool for Windows operating system.", category: "Windows Utility" },
    { name: "PowerSploit", description: "PowerShell Post-Exploitation Framework.", category: "Windows Utility" },
    { name: "Windows Exploit Suggester", description: "Detects potential missing patches on the target.", category: "Windows Utility" },
    { name: "Responder", description: "Link-Local Multicast Name Resolution (LLMNR), NBT-NS, and mDNS poisoner.", category: "Windows Utility" },
    { name: "Bloodhound", description: "Graphical Active Directory trust relationship explorer.", category: "Windows Utility" },
    { name: "Empire", description: "Pure PowerShell post-exploitation agent.", category: "Windows Utility" },
    { name: "Fibratus", description: "Tool for exploration and tracing of the Windows kernel.", category: "Windows Utility" },
    { name: "wePWNise", description: "Generates architecture independent VBA code to be used in Office documents or templates and automates bypassing application control and exploit mitigation software.", category: "Windows Utility" },
    { name: "redsnarf", description: "Post-exploitation tool for retrieving password hashes and credentials from Windows workstations, servers, and domain controllers.", category: "Windows Utility" },
    { name: "Magic Unicorn", description: "Shellcode generator for numerous attack vectors, including Microsoft Office macros, PowerShell, HTML applications (HTA), or certutil (using fake certificates).", category: "Windows Utility" },
    { name: "DeathStar", description: "Python script that uses Empire's RESTful API to automate gaining Domain Admin rights in Active Directory environments.", category: "Windows Utility" },
    { name: "RID_ENUM", description: "Python script that can enumerate all users from a Windows Domain Controller and crack those user's passwords using brute-force.", category: "Windows Utility" },
    { name: "MailSniper", description: "Modular tool for searching through email in a Microsoft Exchange environment, gathering the Global Address List from Outlook Web Access (OWA) and Exchange Web Services (EWS), and more.", category: "Windows Utility" },
    { name: "Ruler", description: "Abuses client-side Outlook features to gain a remote shell on a Microsoft Exchange server.", category: "Windows Utility" },
    { name: "SCOMDecrypt", description: "Retrieve and decrypt RunAs credentials stored within Microsoft System Center Operations Manager (SCOM) databases.", category: "Windows Utility" },
    { name: "LaZagne", description: "Credentials recovery project.", category: "Windows Utility" },
    { name: "Active Directory and Privilege Escalation (ADAPE)", description: "Umbrella script that automates numerous useful PowerShell modules to discover security misconfigurations and attempt privilege escalation against Active Directory.", category: "Windows Utility" },
    { name: "Invoke-Apex", description: "PowerShell-based toolkit consisting of a collection of techniques and tradecraft for use in red team, post-exploitation, adversary simulation, or other offensive security tasks.", category: "Windows Utility" }
  ],
  "GNU/Linux Utilities": [
    { name: "Linux Exploit Suggester", description: "Heuristic reporting on potentially viable exploits for a given GNU/Linux system.", category: "Linux Utility" },
    { name: "Lynis", description: "Auditing tool for UNIX-based systems.", category: "Linux Utility" },
    { name: "unix-privesc-check", description: "Shell script to check for simple privilege escalation vectors on UNIX systems.", category: "Linux Utility" },
    { name: "Hwacha", description: "Post-exploitation tool to quickly execute payloads via SSH on one or more Linux systems simultaneously.", category: "Linux Utility" },
    { name: "checksec.sh", description: "Shell script designed to test what standard Linux OS and PaX security features are being used.", category: "Linux Utility" },
    { name: "punk.py", description: "unix SSH post-exploitation 1337 tool.", category: "Linux Utility" }
  ],
  "macOS Utilities": [
    { name: "Bella", description: "Pure Python post-exploitation data mining and remote administration tool for macOS.", category: "macOS Utility" },
    { name: "EvilOSX", description: "Modular RAT that uses numerous evasion and exfiltration techniques out-of-the-box.", category: "macOS Utility" }
  ],
  "DDoS Tools": [
    { name: "LOIC", description: "Open source network stress tool for Windows.", category: "DDoS" },
    { name: "JS LOIC", description: "JavaScript in-browser version of LOIC.", category: "DDoS" },
    { name: "SlowLoris", description: "DoS tool that uses low bandwidth on the attacking side.", category: "DDoS" },
    { name: "HOIC", description: "Updated version of Low Orbit Ion Cannon, has 'boosters' to get around common counter measures.", category: "DDoS" },
    { name: "T50", description: "Faster network stress tool.", category: "DDoS" },
    { name: "UFONet", description: "Abuses OSI layer 7 HTTP to create/manage 'zombies' and to conduct different attacks using; GET/POST, multithreading, proxies, origin spoofing methods, cache evasion techniques, etc.", category: "DDoS" },
    { name: "Memcrashed", description: "DDoS attack tool for sending forged UDP packets to vulnerable Memcached servers obtained using Shodan API.", category: "DDoS" }
  ],
  "Social Engineering Tools": [
    { name: "Social Engineer Toolkit (SET)", description: "Open source pentesting framework designed for social engineering featuring a number of custom attack vectors to make believable attacks quickly.", category: "Social Engineering" },
    { name: "King Phisher", description: "Phishing campaign toolkit used for creating and managing multiple simultaneous phishing attacks with custom email and server content.", category: "Social Engineering" },
    { name: "Evilginx", description: "MITM attack framework used for phishing credentials and session cookies from any Web service.", category: "Social Engineering" },
    { name: "Evilginx2", description: "Standalone man-in-the-middle attack framework.", category: "Social Engineering" },
    { name: "wifiphisher", description: "Automated phishing attacks against WiFi networks.", category: "Social Engineering" },
    { name: "Catphish", description: "Tool for phishing and corporate espionage written in Ruby.", category: "Social Engineering" },
    { name: "Beelogger", description: "Tool for generating keylooger.", category: "Social Engineering" },
    { name: "FiercePhish", description: "Full-fledged phishing framework to manage all phishing engagements.", category: "Social Engineering" },
    { name: "SocialFish", description: "Social media phishing framework that can run on an Android phone or in a Docker container.", category: "Social Engineering" },
    { name: "ShellPhish", description: "Social media site cloner and phishing tool built atop SocialFish.", category: "Social Engineering" },
    { name: "Gophish", description: "Open-source phishing framework.", category: "Social Engineering" },
    { name: "phishery", description: "TLS/SSL enabled Basic Auth credential harvester.", category: "Social Engineering" },
    { name: "ReelPhish", description: "Real-time two-factor phishing tool.", category: "Social Engineering" },
    { name: "Modlishka", description: "Flexible and powerful reverse proxy with real-time two-factor authentication.", category: "Social Engineering" }
  ],
  "OSINT Tools": [
    { name: "Maltego", description: "Proprietary software for open source intelligence and forensics, from Paterva.", category: "OSINT" },
    { name: "theHarvester", description: "E-mail, subdomain and people names harvester.", category: "OSINT" },
    { name: "SimplyEmail", description: "Email recon made fast and easy.", category: "OSINT" },
    { name: "creepy", description: "Geolocation OSINT tool.", category: "OSINT" },
    { name: "metagoofil", description: "Metadata harvester.", category: "OSINT" },
    { name: "Google Hacking Database", description: "Database of Google dorks; can be used for recon.", category: "OSINT" },
    { name: "GooDork", description: "Command line Google dorking tool.", category: "OSINT" },
    { name: "dork-cli", description: "Command line Google dork tool.", category: "OSINT" },
    { name: "Censys", description: "Collects data on hosts and websites through daily ZMap and ZGrab scans.", category: "OSINT" },
    { name: "Shodan", description: "World's first search engine for Internet-connected devices.", category: "OSINT" },
    { name: "recon-ng", description: "Full-featured Web Reconnaissance framework written in Python.", category: "OSINT" },
    { name: "sn0int", description: "Semi-automatic OSINT framework and package manager.", category: "OSINT" },
    { name: "github-dorks", description: "CLI tool to scan GitHub repos/organizations for potential sensitive information leaks.", category: "OSINT" },
    { name: "vcsmap", description: "Plugin-based tool to scan public version control systems for sensitive information.", category: "OSINT" },
    { name: "Spiderfoot", description: "Multi-source OSINT automation tool with a Web UI and report visualizations.", category: "OSINT" },
    { name: "BinGoo", description: "GNU/Linux bash based Bing and Google Dorking Tool.", category: "OSINT" },
    { name: "fast-recon", description: "Perform Google dorks against a domain.", category: "OSINT" },
    { name: "snitch", description: "Information gathering via dorks.", category: "OSINT" },
    { name: "Sn1per", description: "Automated Pentest Recon Scanner.", category: "OSINT" },
    { name: "Threat Crowd", description: "Search engine for threats.", category: "OSINT" },
    { name: "Virus Total", description: "Free service that analyzes suspicious files and URLs and facilitates the quick detection of viruses, worms, trojans, and all kinds of malware.", category: "OSINT" },
    { name: "PacketTotal", description: "Simple, free, high-quality packet capture file analysis facilitating the quick detection of network-borne malware (using Bro and Suricata IDS signatures under the hood).", category: "OSINT" },
    { name: "DataSploit", description: "OSINT visualizer utilizing Shodan, Censys, Clearbit, EmailHunter, FullContact, and Zoomeye behind the scenes.", category: "OSINT" },
    { name: "AQUATONE", description: "Subdomain discovery tool utilizing various open sources producing a report that can be used as input to other tools.", category: "OSINT" },
    { name: "Intrigue", description: "Automated OSINT & Attack Surface discovery framework with powerful API, UI and CLI.", category: "OSINT" },
    { name: "ZoomEye", description: "Search engine for cyberspace that lets the user find specific network components.", category: "OSINT" },
    { name: "gOSINT", description: "OSINT tool with multiple modules and a telegram scraper.", category: "OSINT" },
    { name: "OWASP Amass", description: "Subdomain enumeration via scraping, web archives, brute forcing, permutations, reverse DNS sweeping, TLS certificates, passive DNS data sources, etc.", category: "OSINT" },
    { name: "Hunter.io", description: "Data broker providing a Web search interface for discovering the email addresses and other organizational details of a company.", category: "OSINT" },
    { name: "FOCA (Fingerprinting Organizations with Collected Archives)", description: "Automated document harvester that searches Google, Bing, and DuckDuckGo to find and extrapolate internal company organizational structures.", category: "OSINT" },
    { name: "dorks", description: "Google hack database automation tool.", category: "OSINT" },
    { name: "image-match", description: "Quickly search over billions of images.", category: "OSINT" },
    { name: "OSINT-SPY", description: "Performs OSINT scan on email addresses, domain names, IP addresses, or organizations.", category: "OSINT" },
    { name: "pagodo", description: "Automate Google Hacking Database scraping.", category: "OSINT" },
    { name: "surfraw", description: "Fast UNIX command line interface to a variety of popular WWW search engines.", category: "OSINT" },
    { name: "GyoiThon", description: "GyoiThon is an Intelligence Gathering tool using Machine Learning.", category: "OSINT" },
    { name: "dcrawl", description: "Simple, but smart, multi-threaded web crawler for randomly gathering huge lists of unique domain names.", category: "OSINT" },
    { name: "gitminer", description: "Tool for advanced mining for content on Github.", category: "OSINT" },
    { name: "emailHarvester", description: "Email addresses harvester.", category: "OSINT" },
    { name: "Photon", description: "Incredibly fast crawler designed for OSINT.", category: "OSINT" }
  ],
  "Anonymity Tools": [
    { name: "Tor", description: "Free software and onion routed overlay network that helps you defend against traffic analysis.", category: "Anonymity" },
    { name: "OnionScan", description: "Tool for investigating the Dark Web by finding operational security issues introduced by Tor hidden service operators.", category: "Anonymity" },
    { name: "I2P", description: "The Invisible Internet Project.", category: "Anonymity" },
    { name: "Nipe", description: "Script to redirect all traffic from the machine to the Tor network.", category: "Anonymity" },
    { name: "What Every Browser Knows About You", description: "Comprehensive detection page to test your own Web browser's configuration for privacy and identity leaks.", category: "Anonymity" },
    { name: "dos-over-tor", description: "Proof of concept denial of service over Tor stress test tool.", category: "Anonymity" },
    { name: "oregano", description: "Python module that runs as a machine-in-the-middle (MITM) accepting Tor client requests.", category: "Anonymity" },
    { name: "kalitorify", description: "Transparent proxy through Tor for Kali Linux OS.", category: "Anonymity" }
  ],
  "Reverse Engineering Tools": [
    { name: "Interactive Disassembler (IDA Pro)", description: "Proprietary multi-processor disassembler and debugger for Windows, GNU/Linux, or macOS; also has a free version, IDA Free.", category: "Reverse Engineering" },
    { name: "WDK/WinDbg", description: "Windows Driver Kit and WinDbg.", category: "Reverse Engineering" },
    { name: "OllyDbg", description: "x86 debugger for Windows binaries that emphasizes binary code analysis.", category: "Reverse Engineering" },
    { name: "Radare2", description: "Open source, crossplatform reverse engineering framework.", category: "Reverse Engineering" },
    { name: "x64dbg", description: "Open source x64/x32 debugger for windows.", category: "Reverse Engineering" },
    { name: "Immunity Debugger", description: "Powerful way to write exploits and analyze malware.", category: "Reverse Engineering" },
    { name: "Evan's Debugger", description: "OllyDbg-like debugger for GNU/Linux.", category: "Reverse Engineering" },
    { name: "Medusa", description: "Open source, cross-platform interactive disassembler.", category: "Reverse Engineering" },
    { name: "plasma", description: "Interactive disassembler for x86/ARM/MIPS. Generates indented pseudo-code with colored syntax code.", category: "Reverse Engineering" },
    { name: "peda", description: "Python Exploit Development Assistance for GDB.", category: "Reverse Engineering" },
    { name: "dnSpy", description: "Tool to reverse engineer .NET assemblies.", category: "Reverse Engineering" },
    { name: "binwalk", description: "Fast, easy to use tool for analyzing, reverse engineering, and extracting firmware images.", category: "Reverse Engineering" },
    { name: "PyREBox", description: "Python scriptable Reverse Engineering sandbox by Cisco-Talos.", category: "Reverse Engineering" },
    { name: "Voltron", description: "Extensible debugger UI toolkit written in Python.", category: "Reverse Engineering" },
    { name: "Capstone", description: "Lightweight multi-platform, multi-architecture disassembly framework.", category: "Reverse Engineering" },
    { name: "rVMI", description: "Debugger on steroids; inspect userspace processes, kernel drivers, and preboot environments in a single tool.", category: "Reverse Engineering" },
    { name: "Frida", description: "Dynamic instrumentation toolkit for developers, reverse-engineers, and security researchers.", category: "Reverse Engineering" },
    { name: "boxxy", description: "Linkable sandbox explorer.", category: "Reverse Engineering" },
    { name: "pwndbg", description: "GDB plug-in that eases debugging with GDB, with a focus on features needed by low-level software developers, hardware hackers, reverse-engineers, and exploit developers.", category: "Reverse Engineering" },
    { name: "nudge4j", description: "Java tool to let the browser talk to the JVM.", category: "Reverse Engineering" },
    { name: "dex2jar", description: "Tools to work with Android .dex and Java .class files.", category: "Reverse Engineering" },
    { name: "JD-GUI", description: "A standalone graphical utility that displays Java source codes of “.class” files.", category: "Reverse Engineering" },
    { name: "procyon", description: "A modern open-source Java decompiler.", category: "Reverse Engineering" },
    { name: "androguard", description: "Reverse engineering, malware and goodware analysis of Android applications.", category: "Reverse Engineering" },
    { name: "JAD", description: "JAD Java Decompiler (closed-source, unmaintained).", category: "Reverse Engineering" },
    { name: "dotPeek", description: "a free-of-charge .NET decompiler from JetBrains.", category: "Reverse Engineering" },
    { name: "ILSpy", description: "an open-source .NET assembly browser and decompiler.", category: "Reverse Engineering" },
    { name: "de4dot", description: ".NET deobfuscator and unpacker.", category: "Reverse Engineering" },
    { name: "antinet", description: ".NET anti-managed debugger and anti-profiler code.", category: "Reverse Engineering" },
    { name: "UPX", description: "the Ultimate Packer for eXecutables.", category: "Reverse Engineering" },
    { name: "Hopper", description: "A OS X and Linux Disassembler/Decompiler for 32/64-bit Windows/Mac/Linux/iOS executables.", category: "Reverse Engineering" },
    { name: "ScratchABit", description: "Easily retargetable and hackable interactive disassembler with IDAPython-compatible plugin API.", category: "Reverse Engineering" }
  ],
  "Physical Access Tools": [
    { name: "LAN Turtle", description: "Covert \"USB Ethernet Adapter\" that provides remote access, network intelligence gathering, and MITM capabilities when installed in a local network.", category: "Physical Access" },
    { name: "USB Rubber Ducky", description: "Customizable keystroke injection attack platform masquerading as a USB thumbdrive.", category: "Physical Access" },
    { name: "Poisontap", description: "Siphons cookies, exposes internal (LAN-side) router and installs web backdoor on locked computers.", category: "Physical Access" },
    { name: "WiFi Pineapple", description: "Wireless auditing and penetration testing platform.", category: "Physical Access" },
    { name: "Proxmark3", description: "RFID/NFC cloning, replay, and spoofing toolkit often used for analyzing and attacking proximity cards/readers, wireless keys/keyfobs, and more.", category: "Physical Access" },
    { name: "PCILeech", description: "Uses PCIe hardware devices to read and write from the target system memory via Direct Memory Access (DMA) over PCIe.", category: "Physical Access" },
    { name: "AT Commands", description: "Use AT commands over an Android device's USB port to rewrite device firmware, bypass security mechanisms, exfiltrate sensitive information, perform screen unlocks, and inject touch events.", category: "Physical Access" },
    { name: "Bash Bunny", description: "Local exploit delivery tool in the form of a USB thumbdrive in which you write payloads in a DSL called BunnyScript.", category: "Physical Access" },
    { name: "Packet Squirrel", description: "Ethernet multi-tool designed to enable covert remote access, painless packet captures, and secure VPN connections with the flip of a switch.", category: "Physical Access" }
  ],
  "Industrial Control and SCADA Systems": [
    { name: "Industrial Exploitation Framework (ISF)", description: "Metasploit-like exploit framework based on routersploit designed to target Industrial Control Systems (ICS), SCADA devices, PLC firmware, and more.", category: "ICS/SCADA" },
    { name: "s7scan", description: "Scanner for enumerating Siemens S7 PLCs on a TCP/IP or LLC network.", category: "ICS/SCADA" }
  ],
  "Side-channel Tools": [
    { name: "ChipWhisperer", description: "Complete open-source toolchain for side-channel power analysis and glitching attacks.", category: "Side-channel" }
  ],
  "CTF Tools": [
    { name: "ctf-tools", description: "Collection of setup scripts to install various security research tools easily and quickly deployable to new machines.", category: "CTF" },
    { name: "Pwntools", description: "Rapid exploit development framework built for use in CTFs.", category: "CTF" },
    { name: "RsaCtfTool", description: "Decrypt data enciphered using weak RSA keys, and recover private keys from public keys using a variety of automated attacks.", category: "CTF" },
    { name: "shellpop", description: "Easily generate sophisticated reverse or bind shell commands to help you save time during penetration tests.", category: "CTF" }
  ],
  "Penetration Testing Report Templates": [
    { name: "Public Pentesting Reports", description: "Curated list of public penetration test reports released by several consulting firms and academic security groups.", category: "Reporting" },
    { name: "T&VS Pentesting Report Template", description: "Pentest report template provided by Test and Verification Services, Ltd.", category: "Reporting" },
    { name: "Web Application Security Assessment Report Template", description: "Sample Web application security assessment reporting template provided by Lucideus.", category: "Reporting" }
  ],
  "General Security Tools": [
    { name: "Target Scanner", description: "Target Scanner is a penetration testing utility that quickly automates common tasks when assessing a target.", category: "General Security" },
    { name: "exploit-db-search", description: "Exploitdb Search.", category: "General Security" },
    { name: "Freedom Fighting Mode (FFM)", description: "FFM is a hacking harness that you can use during the post-exploitation phase of a red-teaming engagement.", category: "General Security" },
    { name: "vault", description: "Swiss army knife for hackers.", category: "General Security" }
  ]
};

const ToolCard = ({ category, onExplore }) => {
  const getIconForCategory = (category) => {
    if (category.toLowerCase().includes('network')) return <Shield className="w-6 h-6" />;
    if (category.toLowerCase().includes('web')) return <ExternalLink className="w-6 h-6" />;
    if (category.toLowerCase().includes('wireless')) return <Search className="w-6 h-6" />;
    return <Terminal className="w-6 h-6" />;
  };

  return (
    <div className="bg-gray-800 flex flex-col justify-between p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 border border-gray-700 hover:border-blue-500">
      <div className="flex items-center mb-3">
        {getIconForCategory(category)}
        <h3 className="text-xl font-semibold text-gray-100 ml-3">{category}</h3>
      </div>
      <p className="text-gray-400 text-sm mb-4">
        {toolsData[category]?.length || 0} tools available
      </p>
      <div className="mt-4">
        <button 
          onClick={() => onExplore(category)}
          className="bg-blue-600 text-gray-100 px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300 w-full font-medium"
        >
          Explore Tools
        </button>
      </div>
    </div>
  );
};

const ToolDetailCard = ({ tool }) => {
  return (
    <div className="bg-gray-700 p-4 rounded-lg border border-gray-600 hover:border-blue-500 transition-colors duration-300">
      <div className="flex items-start justify-between mb-2">
        <h4 className="text-lg font-semibold text-gray-100">{tool.name}</h4>
        <span className="bg-blue-600 text-xs px-2 py-1 rounded text-gray-100">
          {tool.category}
        </span>
      </div>
      <p className="text-gray-300 text-sm leading-relaxed">{tool.description}</p>
    </div>
  );
};

const ToolsViewer = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const categories = Object.keys(toolsData);

  const handleExploreTools = (category) => {
    setSelectedCategory(category);
  };

  const handleBackToCategories = () => {
    setSelectedCategory(null);
    setSearchTerm('');
  };

  const filteredTools = selectedCategory && toolsData[selectedCategory] 
    ? toolsData[selectedCategory].filter(tool =>
        tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  if (selectedCategory) {
    return (
      <div className="p-8 min-h-screen">
        <div className="mb-6">
          <button
            onClick={handleBackToCategories}
            className="flex items-center text-blue-400 hover:text-blue-300 transition-colors duration-300 mb-4"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            Back to Categories
          </button>
          <h2 className="text-3xl font-bold text-gray-100 mb-2">{selectedCategory}</h2>
          <p className="text-gray-400">{filteredTools.length} tools found</p>
        </div>

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search tools..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 placeholder-gray-400 focus:border-blue-500 focus:outline-none transition-colors duration-300"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool, index) => (
            <ToolDetailCard key={index} tool={tool} />
          ))}
        </div>

        {filteredTools.length === 0 && searchTerm && (
          <div className="text-center py-12">
            <Search className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">No tools found matching "{searchTerm}"</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="p-8 min-h-screen">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-100 mb-2">Kali Linux Tools</h2>
        <p className="text-gray-400">Explore our comprehensive collection of penetration testing tools</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {categories.map((category) => (
          <ToolCard 
            key={category}
            category={category}
            onExplore={handleExploreTools}
          />
        ))}
      </div>
    </div>
  );
};

export default ToolsViewer;