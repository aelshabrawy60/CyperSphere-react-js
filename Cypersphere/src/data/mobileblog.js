exmobileHtml = `<h1 id="-introduction-to-android-security-"><strong>Introduction to Android Security</strong></h1>
<p>Android is the most widely used mobile operating system, powering billions of devices worldwide. However, due to its open nature, it is also a common target for attackers. This module will introduce you to the fundamental security mechanisms of Android, the risks associated with mobile applications, and best practices for securing Android apps.</p>
<h2 id="-why-is-android-penetration-testing-important-"><strong>Why is Android penetration testing important</strong></h2>
<p>Modern Android applications are used for commercial purposes, healthcare, banking, learning, and more. These mobile applications, apart from holding sensitive information, also contain security vulnerabilities. Penetration testers and developers can find and fix these vulnerabilities and mitigate security risks.</p>
<p>In 2021, the payment application Klarna suffered an application flaw that caused users to log in to random accounts of other customers and expose sensitive personal and credit card information.   </p>
<p>ParkMobile, the company behind an app for cashless parking across the United States, is still battling a class action lawsuit from a 2021 mobile app data breach that affected 21 million users.</p>
<p>With new vulnerabilities surfacing every day, Android penetration testing is necessary to avoid fraud attacks, malware infections, and data leaks. This is vital for any company that wants to go live with a new app without having to worry about legal or security issues.</p>
<p>Mobile penetration testing can also be beneficial for evaluating the developer team’s work and checking the IT team&#39;s responsiveness, as tests can reveal vulnerabilities and misconfigurations in back-end services used by the app.</p>
<h2 id="-overview-of-android-architecture-"><strong>Overview of Android Architecture</strong></h2>
<p>Before diving into Security and Penetration Testing, we want to introduce the the Android environment. There are few key concepts you should be familiar with before getting started.</p>
<p>To begin with, the Android operating system is essentially a Linux operating system. This means, that for this course, it is helpful to be familiar with the basics of Linux, such as file permissions and navigating the filesystem.</p>
<p>You should also be familiar with the differences between normal users and the root user and how groups work in Linux.</p>
<blockquote>
<p>Don&#39;t worry if you are not well versed in Linux, we won&#39;t stray far from the basics and you can find our tutorial with the course section.</p>
<h3 id="-android-framework-"><strong>Android Framework</strong></h3>
</blockquote>
<p>![[androidFramework.png]]</p>
<p>As you can see from this image, there are several general layers in the Android operating system. Each layer has a specialized set of functionalities.</p>
<p>Each layer builds on the layers beneath it, relaying on the security of the lower layers.</p>
<p>While the device security as a whole may rely on the lower layers, the device&#39;s data and functionality need to be protected on multiple layers.</p>
<h4 id="-a-application-layer-"><strong>a) Application Layer</strong></h4>
<p>The <strong>Application</strong> layer is where the individual applications you install and run, reside.</p>
<p>The <strong>Application Framework</strong> layer exposes system APIs for common functionality that is routinely used by many applications. This includes functionality to display visual elements, share data or access things like the telephone or GPS functionality.</p>
<h4 id="-b-libraries-layer-"><strong>b) Libraries Layer</strong></h4>
<p>The <strong>Libraries</strong> layer contains C and C++ libraries which handle low-level processes, such as graphics drawing, network encryption, multimedia playback and image rendering.</p>
<h4 id="-c-android-runtime-layer-"><strong>c) Android Runtime Layer</strong></h4>
<p>The <strong>Android Runtime</strong> layer represents the area of the OS where the VM responsible for running applications.</p>
<p>These libraries consist of the following Java libraries:</p>
<ul>
<li><strong>Dalvik VM Specific Libraries</strong>:<ul>
<li>direct interaction with a Dalvik VM instance.</li>
</ul>
</li>
<li><strong>Java Interoperability Libraries</strong>:<ul>
<li>a subset of standard Java Core Libraries adapted for use in the Dalvik VM.</li>
</ul>
</li>
<li><strong>Android Libraries</strong>:<ul>
<li>libraries directly used in Android application development and responsible for most of the core functionality of applications.<h4 id="-d-linux-kernel-layer-"><strong>d) Linux Kernel Layer</strong></h4>
</li>
</ul>
</li>
</ul>
<p>The Linux Kernel layer is the underlying layer that ties all of the upper layers together. This layer arbitrates all access to the underlying device hardware, via device drivers.</p>
<p>As with any computer, the kernel also handles memory, processes and power management.</p>
<h3 id="-android-virtual-machines-"><strong>Android Virtual Machines</strong></h3>
<p>Virtual machines are abstraction layers between an application and the underlying Android device. Android apps are written in Java, but are compiled into platform independent Dalvik Executable (DEX) bytecode.</p>
<p>Android VM&#39;s run the DEX bytecode directly compiled from the original Java. This handles the translations of the differences between different operating system versions.</p>
<blockquote>
<p>The VM concept, as in Java, exists so developers don&#39;t need to be concerned about writing apps for specific device hardware or OS versions. Developers can write and compile one app and know all devices running a compatible VM will be able to run it.</p>
</blockquote>
<p>Prior to KitKat v.4.4, Android exclusively used the Dalvik VM. With the introduction of KitKat, Android began using a new virtual machine, Android Runtime (ART). Android phased out the Dalvik entirely with Lollipop v.5.0.</p>
<p>Both runtimes work on DEX bytecode, but ART has some new optimization features not previously available.</p>
<p>As previously stated, in Android Studio, apps are compiled into DEX or ODEX (Optimized DEX) bytecode. The apps you download from the Google Play Store, use the DEX format.</p>
<p>The ODEX format is generally only used by OEMs to optimize the apps that run at boot-time, for specific device or architecture.</p>
<p>In general, the Dalvik VM still executes a <code>.dex</code> file, which in turn handles the interaction with the native code.</p>
<p>![[dalvik.png]]</p>
<h3 id="-android-security-model-"><strong>Android Security Model</strong></h3>
<p>In the generalized Android Security Model, there are two distinct layers to the model.</p>
<p>The first is implemented in the operating system and keeps installed applications fundamentally isolated from one another. We will focus on this layer in this section.</p>
<p>The second, is the security layer in the application itself, which:</p>
<ul>
<li>allows the application developers to selectively expose certain application functionalities to other applications.</li>
<li>configures applications capabilities in-line with their risk tolerance and use cases.
This layer will be discussed <strong>later</strong> on this course.</li>
</ul>
<p>In the Android operating system, for security reasons, it is important that applications are isolated from one another. This allows for a separation of data and code execution.</p>
<p>This way, you can have different applications, with different trust-levels, from different developers, all existing on the same device.</p>
<blockquote>
<p>For example, just because you may want a flashlight and banking app on your phone simultaneously, shouldn&#39;t mean that the flashlight app should be able to access your bank account information.</p>
<h4 id="-uid-separation-"><strong>UID Separation</strong></h4>
</blockquote>
<p>In the Android operating system, each application is assigned a specific User ID or <code>UID</code>, which is inherited from the underlying Linux operating system. This assignment is done dynamically on installation and essentially establishes the identity of the application.</p>
<p>Basically, the application can interact with any file owned by its user ID, but no others, unless they are shared with it by another application or the operating system.</p>
<p>The UID separation, forms the foundation of the Android Application Sandbox and prevents anything other than the app itself, certain components of the operating system, or the <code>root</code> user from accessing its data.</p>
<p>In this sippet below, you can see how each application&#39;s files are owned by a distinct user and group.</p>
<p>![[UID-Separation.png]]</p>
<p>The alphanumeric username corresponds directly with a numeric <strong>UID</strong>. This numeric UID is the one used by the Android operating system to determine the ownership of each application&#39;s sandboxed resources.</p>
<p>It should be apparent, at this point, that the Android Sandbox is really just file separation accomplished through Linux permissions.</p>
<h4 id="-sandboxing-"><strong>Sandboxing</strong></h4>
<p>The conceptual Android Application Sandbox, creates a separation of files and code execution between applications on the same devices.</p>
<p>The Android Application Sandbox is implemented in the operating system rather than the VM, which allows the VM to interact with native code in the same application without constraints. This sandboxing is accomplished because each application runs as a separate process under a separate user ID.</p>
<blockquote>
<p>Prior to Android 4.3, this UID separation was the only thing isolating apps from one another and, more importantly, the operating system from privileged users (e.g., root). In earlier Android versions, if the root user account were ever compromised, the entire operating system could be attacked without bounds.</p>
</blockquote>
<p>Android 4.3 began to implement <strong>SELinux</strong>, when it reached Android 5.0, it was fully enforcing its more secure implementation.</p>
<p>Essentially, SELinux denies all process interaction and then creates policies to allow anly the expected or &quot;known good&quot; interactions between them. This is possible, because SELinux does not enforce solely based on the UID or at the kernel level.</p>
<h2 id="-conclusion-"><strong>Conclusion</strong></h2>
<p>In this section, we’ve briefly covered many of the core components of the Android Architecture and how they interconnect.</p>
<p>Now, you should have a better understanding of the underlying operating system, its security mechanisms, and how the different Android VMs are implemented.</p>
<p>In the upcoming sections, we’ll cover various aspects of the Android operating system and applications, highlighting security-relevant topics and features.</p>
<hr>
<h1 id="-setting-up-a-testing-environment-"><strong>Setting up a Testing Environment</strong></h1>
<p>Before diving into Android application security testing, it is essential to set up a proper pentesting environment. This module covers the key aspects of preparing a system for Android penetration testing, including setting up emulators, working with APK files, and understanding the Android file structure.</p>
<p>Penetration testing can be performed on <strong>physical devices</strong> or <strong>emulators</strong>. Each option has advantages depending on the testing scenario.</p>
<h3 id="-physical-android-devices-"><strong>Physical Android Devices</strong></h3>
<p>Testing on a real device provides accurate results, especially when assessing security features like biometrics and hardware-backed encryption. However, physical devices may have limitations such as locked bootloaders or manufacturer restrictions.</p>
<h3 id="-android-emulators-"><strong>Android Emulators</strong></h3>
<p>Emulators provide a flexible way to test applications in a controlled environment. The most common options include:</p>
<ul>
<li><strong>Android Studio Emulator</strong> (Official, supports multiple versions of Android).</li>
<li><strong>Genymotion</strong> (Fast, supports networking and sensor emulation).</li>
<li><strong>AVD (Android Virtual Device)</strong> (Configurable testing devices within Android Studio).</li>
</ul>
<p>Emulators allow testers to simulate different devices, Android versions, and network conditions without needing physical hardware. It also allows us <code>root</code> access to a device without having to leverage an exploit.</p>
<p>There are times where the user of emulators is problematic, mostly because of performance issues, generally can be attributed to:</p>
<ul>
<li>processor virtualization support.</li>
<li>lack of sufficient RAM.</li>
</ul>
<hr>
<h1 id="-android-build-process-"><strong>Android Build Process</strong></h1>
<h2 id="-compiling-apps-"><strong>Compiling Apps</strong></h2>
<p>The building of Android apps runs through two major steps, <strong>compilation and packaging</strong>, and finally <strong>signing</strong>. Code signing will be covered in an upcoming module, so for now, we’ll focus on the <strong>compilation and packaging</strong>.</p>
<p>To start with, you can build Android apps either for testing/debugging or for release to Google Play (or other marketplace). The main difference in these two choices relates to the signing of the applications.</p>
<p>The build process starts by implementing the Android Asset Packaging Tool (<strong>AAPT</strong>) to compile the application resources.</p>
<p>We will discuss this shortly, and that produces an <code>R.java</code> file allowing your code to reference the resources. The process then implements a Java compiler to transform your <code>.java</code> and <code>.aidl</code> files into <code>.class</code> files. The <code>.class</code> files are then compiled, along with any third-party libraries, into a <code>classes.dex</code> file.</p>
<p>Next, your <code>classes.dex</code>, compiled resources, and other resources are run through the <code>apkbuilder</code> to produce an Android Package (<code>.apk</code> file).</p>
<p>The next step is <strong>signing</strong>, but let’s look at the <code>.apk</code> a bit more before diving into that.</p>
<h2 id="-apk-structure-"><strong>APK Structure</strong></h2>
<p>When Android applications are compiled, the resulting output is an Android Package (APK) file. It is a compressed archive containing the resources necessary to run the application. This includes both the code and resources, such as images.</p>
<p>In order to inspect the contents of an APK, you first need to change its extension to <code>.zip</code> and then decompress it. This can be done with any tool capable of opening ordinary zip archives.</p>
<p>You can download and try it by yourself with any of the applications available in the members area.</p>
<h3 id="-apk-contents-"><strong>APK Contents</strong></h3>
<p>Once decompressed, if we look inside the APK contents, we’ll find the following files and directories:</p>
<p>![[apk.png]]</p>
<h3 id="-androidmanifest-xml-"><strong>AndroidManifest.xml</strong></h3>
<p>We will spend a great deal of time throughout this course discussing all the contents of this file. This file holds the keys to most of the security topics we’ll cover.</p>
<p>It dictates many security-related features, such as:</p>
<ul>
<li>Which Android versions the app runs on.</li>
<li>Which apps can communicate with its components and what permissions they require.</li>
<li>Whether data can be stolen via USB, etc.</li>
</ul>
<p>We’ll take a high-level overview of some components now, but don’t worry, we’ll dive deeper into them later.</p>
<p>The <code>AndroidManifest.xml</code> file inside the decompressed APK is a <strong>binary file</strong>, which is <strong>not human-readable</strong>. To properly view it, you need to <strong>convert it to a human-readable XML format</strong>.</p>
<p>We will cover the <strong>conversion process</strong> in the next module, but for now, we’ll show you the <strong>converted contents</strong> to help explain its properties.</p>
<p>This <code>AndroidManifest.xml</code> file is taken from a test app. As you can see from the <code>&lt;package&gt;</code> element, this app is named <code>com.example.helloworld</code>.</p>
<pre><code class="lang-xml"><span class="php"><span class="hljs-meta">&lt;?</span>xml version=<span class="hljs-string">"1.0"</span> encoding=<span class="hljs-string">"utf-8"</span><span class="hljs-meta">?&gt;</span></span>
<span class="hljs-tag">&lt;<span class="hljs-name">manifest</span> <span class="hljs-attr">xmlns:android</span>=<span class="hljs-string">"http://schemas.android.com/apk/res/android"</span>
<span class="hljs-attr">package</span>=<span class="hljs-string">"com.example.helloworld"</span>
<span class="hljs-attr">android:versionCode</span>=<span class="hljs-string">"28"</span>
<span class="hljs-attr">android:versionName</span>=<span class="hljs-string">"4.20"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">uses-sdk</span> <span class="hljs-attr">android:minSdkVersion</span>=<span class="hljs-string">"10"</span> <span class="hljs-attr">android:targetSdkVersion</span>=<span class="hljs-string">"21"</span>/&gt;</span>
...
</code></pre>
<p>The <code>&lt;uses-sdk&gt;</code> element contains the <code>minSdkVersion</code> setting, which tells you the oldest version of the Android operating system this app will run on.</p>
<pre><code class="lang-xml">&lt;uses-sdk <span class="hljs-string">android:</span>minSdkVersion=<span class="hljs-string">"10"</span> <span class="hljs-string">android:</span>targetSdkVersion=<span class="hljs-string">"21"</span>/&gt;
</code></pre>
<p>The <code>targetSdkVersion</code> is the OS version this app was designed for and determines whether to enable compatibility features when running on newer versions.</p>
<pre><code class="lang-xml">&lt;uses-sdk <span class="hljs-string">android:</span>minSdkVersion=<span class="hljs-string">"10"</span> <span class="hljs-string">android:</span>targetSdkVersion=<span class="hljs-string">"21"</span>/&gt;
</code></pre>
<p>Many organizations want to support as many devices as possible in order to allow the largest number of users to use their apps.</p>
<p>Unfortunately, by supporting older OS versions, the app effectively inherits the vulnerabilities that have been identified in those versions, putting the application at risk of being exploited on those devices.</p>
<p>Unlike other mobile devices, the Android ecosystem is open, meaning there are numerous devices from different manufacturers (OEMs). In addition, most of these devices run software customized by mobile carriers (frequently referred to as <strong>“bloatware”</strong>).</p>
<p>Carriers and OEMs each have their own policies regarding whether and when they will release patches for a given device. This means that some users may never have the chance to update to a more secure version. This is such a big problem in the Android world, that some users have actually filed class action lawsuits to get updates. So it is important to strike the right balance between supporting older devices and putting data at risk.</p>
<p>Looking at the snippet below, you&#39;ll see various other element names, like <code>&lt;uses-permission&gt;</code>, <code>&lt;activity&gt;</code>, <code>&lt;action&gt;</code>, <code>&lt;category&gt;</code>, and <code>&lt;intent-filter&gt;</code>.</p>
<pre><code class="lang-xml"><span class="hljs-tag">&lt;<span class="hljs-name">uses-permission</span> <span class="hljs-attr">android:name</span>=<span class="hljs-string">"android.permission.ACCESS_FINE_LOCATION"</span>/&gt;</span>
...
    <span class="hljs-tag">&lt;<span class="hljs-name">activity</span> <span class="hljs-attr">android:name</span>=<span class="hljs-string">".MainActivity"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">intent-filter</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">action</span> <span class="hljs-attr">android:name</span>=<span class="hljs-string">"android.intent.action.MAIN"</span>/&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">category</span> <span class="hljs-attr">android:name</span>=<span class="hljs-string">"android.intent.category.LAUNCHER"</span>/&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">intent-filter</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">activity</span>&gt;</span>
</code></pre>
<p>We&#39;ll discuss these in detail later. For now, just realize that many of the application features, components, and security settings are defined in this one critical file.</p>
<h3 id="-classes-dex-"><strong>Classes.dex</strong></h3>
<p>The Java code written in Android Studio is compiled into a <code>dex</code> file. Although its name comes from the Dalvik VM (Dalvik Executable), it is universal to both the older Dalvik VM and the newer Android Runtime environments.</p>
<p>There is a limit of 65,535 methods that can be stored in a single <code>dex</code> file. Most programs only have a single dex file because the Dalvik VM only supports one per APK. There are different ways to configure support for multiple dex files, depending on the Android versions.</p>
<h3 id="-assets-folder-"><strong>Assets Folder</strong></h3>
<p>In theory, you can store anything in the assets folder. Common files include HTML, fonts, MP3, text, and image files. The importance of this directory depends on the type of files stored and their usage.</p>
<h3 id="-lib-folder-"><strong>Lib Folder</strong></h3>
<p>This directory is used for Storing libraries and precompiled code. You will commonly find directories in <code>/lib</code> which represent different combinations of CPU types and instruction sets, known as Application Binary Interfaces, or ABIs. Examples of these subdirectories are x86, x86_64 and armeabi. In these subdirectories,  you will find Linux shared object (<code>.so</code>) files.</p>
<p>The <code>.so</code> files are libraries, created by the developer or from a third-party. If an attacker found a way to modify or replaces these files, they may achieve arbitrary code execution. However, certain security mechanisms make this difficult under normal conditions.</p>
<h3 id="-meta-inf-folder-"><strong>META-INF Folder</strong></h3>
<p>This directory contains files related to the integrity and authenticity of the application, which we&#39;ll discuss in more detail later:</p>
<ul>
<li><code>MANIFEST.MF</code> - Lists all resource files with their SHA1 hashes.</li>
<li><code>CERT.RSA</code> - Developer&#39;s signing certificate.</li>
<li><code>CERT.SF</code> - A list of resources and their hashes, corresponding to <code>MANIFEST.MF</code>.<h3 id="-res-folder-"><strong>Res Folder</strong></h3>
</li>
</ul>
<p>Within the <code>/res</code> directory are all of the resources, such as images that are not compiled into <code>resources.arsc</code>. Generally, these files have minimal security impact, so they will not be discussed in much detail.</p>
<h3 id="-other-files-"><strong>Other Files</strong></h3>
<p>There are numerous reasons you may find other types of file and directories here. These include, for example:</p>
<ul>
<li>App-specific customization and resources.</li>
<li>Third-party libraries.</li>
<li>HTML template files for WebViews.</li>
</ul>
<p>When auditing the source code of an app, you will want to ensure you take a look at all the files to determine their impact on the security of the application.</p>
<h2 id="-code-signing-"><strong>Code Signing</strong></h2>
<p>As mentioned previously, following the build process, <code>.apk</code> files need to be signed. Android devices will not run unsigned <code>.apk</code> files and whether you&#39;re building for testing or deployment, the process only varies by which keys are used to sign.</p>
<p>Public-key cryptography is a system by which two keys are used. One referred to as private, the other public. The two keys are complementary and basically, one key can decrypt data encrypted by the other.</p>
<blockquote>
<p>It is important that the private key remains secret within an organization, but the public key is intended to be shared.</p>
</blockquote>
<p>As we’ll see, the fact that one key can decrypt data encrypted by the other, can be used to verify authenticity of an encrypted string. This is fundamental to how code signing works.</p>
<p>The public key is often included in a type of digital file, known as a x.509 certificate. This certificate can be used to verify the identity of an entity. The identity is established, because the certificate includes information about the organization it belongs to, including things like the name of the organization.</p>
<p>To understand how this is ensured, you first need to understand how cryptographic hashes work. A cryptographic hash function, is a special case of a general hash function, with the key difference being that a cryptographic hash function intends to output a fixed number of bits, which is theoretically unique for all inputs.</p>
<p>If even a single bit is changed in an input, the cryptographic hashing function will produce a completely different output. This fact is often used to verify something hasn&#39;t been modified or that two inputs are in fact, identical. Applying the notion that a given input will always produce the same, unique, output, a certificate can be hashed to produce a value.</p>
<p>If this unique value is then encrypted with the private key, or &quot;signed&quot;, a person wanting to verify that the certificate is authentic, can decrypt the encrypted hash using the public key and verify the value against their own hash of the certificate. If the two hash values match, you know it&#39;s legitimate and hasn&#39;t been modified, otherwise something has gone wrong.</p>
<p>Android apps are cryptographically signed in a similar fashion using a private key only known to the application developer. This process provides several key security related features by:</p>
<ul>
<li>Validating the identity of the author</li>
<li>Ensuring the code itself has not been modified after compiling</li>
</ul>
<p>There have been several Android vulnerabilities identified related to implementations of this protection, which we will cover later in this course.</p>
<p>Unlike other uses of public-key cryptography, there is no need to use CA (Certificate Authority) issued certificates. Self-signed certificates are just fine and no less secure.</p>
<p>Additionally for Android, the subject name field on a certificate, which usually stores the entity’s name, is not validated as part of the identity, nor is the expiration date considered. Android simply uses the certificate as a binary blob. In part, the need for some of these features is diminished by the way the deployment of applications is accomplished.</p>
<p>The Android code signing process uses public-key cryptography with x.509 certificates, which is very similar to Java’s jar signing process. The actual process of signing the APK is built-in to the Android Studio IDE and largely abstracted from the developer. Despite this fact, it is important for us to understand the details, to know what opportunities exist for abuse and the exact extent of the security it provides.</p>
<p>For our examples, we’ll directly use <code>jarsigner</code> which can accomplish the same tasks outside of the IDE. The tool is located in the bin folder of your java JDK install.</p>
<p>Before signing the app, we first need to generate a private key using <code>keytool</code>. You can do this with the following command:</p>
<pre><code class="lang-bash">keytool -genkey -v -keystore test.keystore -alias myalias -keyalg RSA -keysize <span class="hljs-number">2048</span> -validity <span class="hljs-number">10000</span>
</code></pre>
<p>This example prompts you for passwords for the keystore and key, and to provide the Distinguished Name fields for your key. It then generates the keystore as a file called <code>test.keystore</code>. The keystore contains a single key, valid for 10000 days. The alias is a name that you will use later when signing your app.</p>
<p>The <code>jarsigner</code> tool, which can be used to sign or verify a signature, is the same tool used for a traditional Java JAR file. Let’s see an example to better understand how it works.</p>
<p>Here is the command we will run:</p>
<pre><code class="lang-bash"><span class="hljs-keyword">jarsigner </span>-sigalg <span class="hljs-keyword">SHA1withRSA </span>-<span class="hljs-keyword">digestalg </span><span class="hljs-keyword">SHA1 </span>-keystore test.keystore test.apk myalias
</code></pre>
<ul>
<li><strong>sigalg</strong> specifies the signature algorithm used.</li>
<li><strong>digestalg</strong> specifies the digest algorithm, used when digesting the file entries.</li>
<li><strong>keystore</strong> specifies a keystore file, where the certificate files are stored and lastly, the filename to sign.</li>
<li><strong>myalias</strong> represents the line in the keystore file.</li>
</ul>
<p>If you want to inspect the signing status of an existing APK as a whole, you can also do that using the <code>jarsigner</code> tool, as demonstrated in the example below.</p>
<pre><code class="lang-bash">jarsigner -verify -verbose -certs com<span class="hljs-selector-class">.foo</span><span class="hljs-selector-class">.android</span><span class="hljs-selector-class">.activity</span><span class="hljs-selector-class">.apk</span>
</code></pre>
<pre><code>sm <span class="hljs-number">239</span> Mon Feb <span class="hljs-number">10</span> <span class="hljs-number">11</span>:<span class="hljs-number">18</span>:<span class="hljs-number">54</span> PST <span class="hljs-number">2025</span> assets/airshipconfig.properties
X<span class="hljs-number">.509</span>, O=foo
[certificate <span class="hljs-keyword">is</span> valid <span class="hljs-keyword">from</span> <span class="hljs-number">12</span>/<span class="hljs-number">29</span>/<span class="hljs-number">10</span> <span class="hljs-number">5</span>:<span class="hljs-number">33</span> PM <span class="hljs-keyword">to</span> <span class="hljs-number">12</span>/<span class="hljs-number">16</span>/<span class="hljs-number">60</span> <span class="hljs-number">5</span>:<span class="hljs-number">33</span> PM]
[CertPath <span class="hljs-keyword">not</span> validated: Path <span class="hljs-keyword">does</span> <span class="hljs-keyword">not</span> chain <span class="hljs-keyword">with</span> any <span class="hljs-keyword">of</span> <span class="hljs-keyword">the</span> trust anchors]
...
</code></pre><p>Taking a look at an example of the <code>MANIFEST.MF</code> file, we see the following list of files and hashes (base64 encoded):</p>
<pre><code>Manifest-<span class="hljs-string">Version:</span> <span class="hljs-number">1.0</span>
Created-<span class="hljs-string">By:</span> <span class="hljs-number">1.0</span> (Android)
<span class="hljs-string">Name:</span> res<span class="hljs-regexp">/drawable-hdpi/</span>ab_bg<span class="hljs-number">.9</span>.png
SHA1-<span class="hljs-string">Digest:</span> ihAK6Ph6K890IxHTZTDyU9UyYUc=
<span class="hljs-string">Name:</span> res<span class="hljs-regexp">/drawable-xxhdpi/</span>g7.png
SHA1-<span class="hljs-string">Digest:</span> <span class="hljs-regexp">/zW+RqFe/</span>jC0qd4/<span class="hljs-number">2</span>NeALMCPTUU=
...
</code></pre><p>We can verify the file hashes are correct, by using the <code>openssl</code> tool, as shown below. If the hash matches the hash of the original file, we can be sure it hasn&#39;t been modified.</p>
<pre><code class="lang-bash">openssl sha1 -binary res/drawable-hdpi/ab_bg.<span class="hljs-number">9</span>.png <span class="hljs-string">| openssl base64</span>

<span class="hljs-meta"># ihAK6Ph6K890IxHTZTDyU9UyYUc= (matches value in MANIFEST.MF)</span>
</code></pre>
<p>Taking a look at <code>CERT.RSA</code> file, we see it in a binary format. We can run the following command to convert the format from DER to PEM and output a file named <code>cert.pem</code>. The contents of <code>cert.pem</code> are shown below.</p>
<pre><code class="lang-bash">openssl pkcs7 -inform DER -print_certs -out cert<span class="hljs-selector-class">.pem</span> -<span class="hljs-keyword">in</span> CERT.RSA
</code></pre>
<pre><code><span class="hljs-keyword">subject=/O=foo
</span><span class="hljs-symbol">issuer</span>=/O<span class="hljs-symbol">=foo</span>
-----<span class="hljs-keyword">BEGIN </span>CERTIFICATE-----
<span class="hljs-symbol">MIIBmzCCAQgAwOBAgiETRs4zANBgkqhkiG9w0BAQUFADARMQ8wDQYDVQQKEwZy</span>
<span class="hljs-symbol">ZwRiJ3gwIjECEMNTAMxhj15MTM2MSWmgPMJlA2MDYEITYXKzM2hlzLbExxzANBGNV</span>
<span class="hljs-keyword">BAoTBnJLZGyeDCbnzANBgnkqiKh9vQBQAEFAAOBj0AwgYKCgYEAIv6KT7Lzbdz
</span><span class="hljs-symbol">AFVP</span>+gdnEPBR8/K/gpDAlyPmDFVKRquZXKHGWcaKdmLuohxXCyVKPTLG9TYmSg9u
<span class="hljs-symbol">X70pOfHFIIGOd</span>/PsbCNJSY5RXwy232r340Uqgp+HbLwEvEPljYZa28PA4dFcPf/Nh
<span class="hljs-symbol">HXxb6</span>/i1Gsg6tnzES4lc13JOrrqf9n68CcWEAATANBqkhx+i1KGWoBAQUFAOBgAf
<span class="hljs-symbol">hbc2iyBsCV5</span>+<span class="hljs-number">8</span>Egd/<span class="hljs-keyword">bOApcCbssonNTHR22RRLHgyGBnlxmhkvNzN2llLDjnhoU
</span><span class="hljs-symbol">SBj6NuagelWQrPSChDLfPiM</span>++e0ABH1EXQ6GeUPDJuj20bcqIF36uINB090Ur2Gt
<span class="hljs-symbol">xVbZ2FRqGzk2k4</span>+DjqZor8Bj18oAr/<span class="hljs-number">8</span>]<span class="hljs-number">388</span>n+/P5gvG=
-----<span class="hljs-meta">END</span> CERTIFICATE-----
</code></pre><p>To see the details for the public key in the certificate, we can run the following.</p>
<pre><code class="lang-bash">openssl x509 -<span class="hljs-keyword">in</span> cert<span class="hljs-selector-class">.pem</span> -noout -text
</code></pre>
<p>Taking a look at an example of the <code>CERT.SF</code> file, we see another list of the resource files and more hashes. Note that a hash of the manifest is also included here.</p>
<pre><code>Signature-<span class="hljs-string">Version:</span> <span class="hljs-number">1.0</span>
Created-<span class="hljs-string">By:</span> <span class="hljs-number">1.0</span> (Android)
SHA1-Digest-<span class="hljs-string">Manifest:</span> AeXK7rPjFQU178iionkxrR8X034=
<span class="hljs-string">Name:</span> res<span class="hljs-regexp">/drawable-hdpi/</span>ab_bg<span class="hljs-number">.9</span>.png
SHA1-<span class="hljs-string">Digest:</span> h<span class="hljs-regexp">/8GB05R+rJmh4bouTC/</span><span class="hljs-number">4</span>XnutGA=
<span class="hljs-string">Name:</span> res<span class="hljs-regexp">/drawable-xxhdpi/</span>g7.png
SHA1-<span class="hljs-string">Digest:</span> z/rM+<span class="hljs-number">9</span>o1mHn1r5dFVvfc+<span class="hljs-number">19</span>n6bQ=
...
</code></pre><p>We can verify the manifest&#39;s hash by using the <code>openssl</code> tool and base64 encoding the result, as shown below. This verifies that the manifest itself, including the file hashes it contains, haven&#39;t been modified, since the app was built.</p>
<pre><code class="lang-bash">openssl sha1 -binary MANIFEST.MF <span class="hljs-string">| openssl base64</span>

<span class="hljs-meta"># AeXK7rPjFQU178iionkxrR8X034= (matches value in CERT.SF)</span>
</code></pre>
<p>You may have noticed that there are hashes in both the <code>CERT.SF</code> and <code>MANIFEST.MF</code> files, which seem to reference the same filenames (outside of the manifest), but don’t match one another.</p>
<pre><code class="lang-bash">echo -en <span class="hljs-string">"Name: res/drawable-hdpi/ab_bg.9.png\r<span class="hljs-subst">\n</span>SHA1-Digest: ihAK6Ph6K890IxHTZTDyU9UyYUc=\r<span class="hljs-subst">\n</span>\r<span class="hljs-subst">\n</span>"</span> | openssl sha1 -binary | openssl base64

# h/<span class="hljs-number">8</span>GB05R+rJmh4bouTC/<span class="hljs-number">4</span>XnutGA=
</code></pre>
<p>This is because in <code>MANIFEST.MF</code>, the hashes are of the files themselves, whereas in <code>CERT.SF</code>, we’re seeing hashes of the lines of the <code>MANIFEST.MF</code>, which can be verified as shown below.</p>
<pre><code class="lang-bash">echo -en <span class="hljs-string">"Name: res/drawable-hdpi/ab_bg.9.png\r<span class="hljs-subst">\n</span>SHA1-Digest: ihAK6Ph6K890IxHTZTDyU9UyYUc=\r<span class="hljs-subst">\n</span>\r<span class="hljs-subst">\n</span>"</span>|openssl sha1 -binary | openssl base64

# h/<span class="hljs-number">8</span>GB05R+rJmh4bouTC/<span class="hljs-number">4</span>XnutGA=
</code></pre>
<p>One quirk about Android code signing, is that it requires all the APK entries to be signed by the same certificate(s), which is not typically the case with Java. </p>
<p>Lastly, you may be asking “why do we need to sign all the entries and the APK too?”.</p>
<p>This is due to the way OTA (Over-The-Air) update files are distributed and validated and lack of full-file signatures in the default JAR format. If you want to know more about application signing.</p>
<p>It is extremely important for organizations to protect the private key used to sign their production applications. If it is ever compromised, there is no way for them to recover from this and continue to have their app users receive updates.</p>
<p>If a key is compromised, the organization will have to sign new versions with a different key and the Google Play Store will treat it as a completely different app, since this is how they identify the organization who signs the app.</p>
<p>Additionally, compromise could theoretically allow an attacker to publish malicious apps which would be trusted as if they were signed by the organization. This is particularly damaging if the organization has multiple apps which rely on the signing to verify each other’s identities, which we’ll cover later.</p>
<p>Android Studio has two signing modes: one is <strong>Debug</strong> and the other is <strong>Release</strong>. The Debug mode is for testing purposes and is never used to sign applications which are published to the public. This allows you to run apps directly connected via USB or on emulators. The Release mode is for apps which are bound for consumer devices.</p>
<p>Finally, an APK must be aligned after it is signed, this is done using the <code>zipalign</code> tool, located in following directory:</p>
<pre><code><span class="hljs-params">&lt;sdk_install_location&gt;</span><span class="hljs-meta-keyword">/sdk/</span>build-tools/<span class="hljs-params">&lt;version&gt;</span>/
</code></pre><p>The example below demonstrates this. The purpose of this is to improve the RAM utilization when running the application.</p>
<pre><code class="lang-bash"><span class="hljs-selector-tag">zipalign</span> <span class="hljs-selector-tag">-v</span> 4 <span class="hljs-selector-tag">yourproject_unaligned</span><span class="hljs-selector-class">.apk</span> <span class="hljs-selector-tag">yourproject</span><span class="hljs-selector-class">.apk</span>
</code></pre>
<h2 id="-conclusion-"><strong>Conclusion</strong></h2>
<p>You should now understand more about the Android build process, APK package structure and the protection put in place to ensure the authenticity and integrity of applications under normal circumstances. You should also have a better understanding of how these protective measures can be attacked and potentially circumvented to modify existing applications.</p>
<p>In the next section, we’ll take a look at how to deconstruct APK files back to something closer to what the original source code looked like.</p>
<hr>
<h1 id="-reversing-apks-"><strong>Reversing APKs</strong></h1>
<p>In this section, we’ll discuss the process of reversing Android applications. This is an important skill for anyone who wants to audit the security of third-party applications, when the source code is unavailable.</p>
<p>Reversing also allows you to get a more complete view of the built application, including all libraries and the impact of the building process.</p>
<p>Reversing is the process of transforming a compiled application back to something resembling the original source code. Reversing allows us to look for hard-code secrets in applications, review the code for vulnerabilities and get a deeper understanding of the application’s logic.</p>
<p>In this section we’ll be demonstrating some tools used in reversing APKs. To allow you to work along with these examples, rather than saving them for a redundant lab at the end, we&#39;ve included a file named <code>example.apk</code>.</p>
<blockquote>
<p>![[reverseAPK.apk]]
FLAG =&gt; FLAG{T4i5_iS_tH3_s3CRe7}</p>
<h2 id="-apktool-"><strong>APKTool</strong></h2>
</blockquote>
<p>APKTool is an open-source tool, specifically built for reversing Android APKs. We’ll demonstrate the basic operation and usefulness, to familiarize you with this valuable tool.</p>
<p>To use this tool, you will first need to ensure that your computer has Java installed. Once that’s done, running the following command will show you the possible options <code>APKTool</code> has to offer.</p>
<pre><code class="lang-bash"><span class="hljs-selector-tag">java</span> <span class="hljs-selector-tag">-jar</span> <span class="hljs-selector-tag">apktool_2</span><span class="hljs-selector-class">.11</span><span class="hljs-selector-class">.0</span><span class="hljs-selector-class">.jar</span>
</code></pre>
<p>Once the software is installed you can begin decompiling <code>example.apk</code>. To make it easier, for the Elite or Full edition students, the lab is introduced in the next slide. This allows the student to follow along the lab and the introduction of the tools.</p>
<p>For starters, we&#39;ll run <code>APKTool</code> to reverse a sample APK. To the right, you&#39;ll see the syntax and some sample output.</p>
<pre><code class="lang-shell">apktool d reverseAPK.apk

<span class="hljs-meta"># I: Using Apktool 2.9.3 on reverseAPK.apk</span>
<span class="hljs-meta"># I: Loading resource table...</span>
<span class="hljs-meta"># I: Decoding file-resources...</span>
<span class="hljs-meta"># I: Loading resource table from file: C:\Users\&lt;username&gt;\reverseAPK.apk</span>
<span class="hljs-meta"># I: Decoding values */* XMLs...</span>
<span class="hljs-meta"># I: Decoding AndroidManifest.xml with resources...</span>
<span class="hljs-meta"># I: Regular manifest package...</span>
<span class="hljs-meta"># I: Baksmaling classes.dex...</span>
<span class="hljs-meta"># I: Baksmaling classes3.dex...</span>
<span class="hljs-meta"># I: Baksmaling classes2.dex...</span>
<span class="hljs-meta"># I: Copying assets and libs...</span>
<span class="hljs-meta"># I: Copying unknown files...</span>
<span class="hljs-meta"># I: Copying original files...</span>
<span class="hljs-meta"># I: Copying META-INF/services directory</span>
</code></pre>
<p>The <strong>d</strong> (or decode) option tells the tool to decode the AРК.</p>
<blockquote>
<p>[!note] Note
There is no hyphen prior to the option parameter.</p>
</blockquote>
<p>The resulting output will be a directory with the same name as the source APK. In our case, the directory will be <code>example.apk</code>.</p>
<ul>
<li><code>AndroidManifest.xml</code></li>
<li><code>/assets</code></li>
<li><code>/original</code></li>
<li><code>/smali</code></li>
<li><code>apktool.yml</code></li>
<li><code>/lib</code></li>
<li><code>/res</code></li>
<li><code>/unknown</code></li>
</ul>
<p>We see the contents of that directory. We already discussed some of these files and directories and will cover the bolded ones shortly.</p>
<p>During the decoding process, many of the essential files, including images, layouts, strings and xml are brought back to their original form. This includes making the <code>AndroidManifest.xml</code> more human-readable.</p>
<p>This is extremely useful when you don&#39;t have access to the original source code, such as during a &quot;black-box&quot; security assessment.</p>
<p>Additionally, in source code, you&#39;ll often find several <code>AndroidManifest.xml</code> files, rather than just one, which are merged into one in the final APK. The merging process can be difficult to manually piece together, so it is easier, in many cases, to reverse the APK to examine the final <code>AndroidManifest.xml</code> file.</p>
<h2 id="-dex2jar-"><strong>DEX2JAR</strong></h2>
<p>The <code>dex2jar</code> tool is an open-source project for working with <code>.dex</code> and <code>.class</code> files. For our purposes, we will use it to convert the <code>classes.dex</code> file to a <code>.jar</code> file.</p>
<p>Inside the example.apk directory, locate the <code>classes.dex</code> file, as shown below. By default this will output a file named <code>classes_dex2jar.jar</code> to the current directory, or you can specify the output with the <code>-o</code> parameter.</p>
<pre><code class="lang-bash">./d2j-dex2jar<span class="hljs-selector-class">.sh</span> ../example.apk/classes<span class="hljs-selector-class">.dex</span> -o output_file.jar
</code></pre>
<blockquote>
<p>[!note] Note
You can also run the command directly on the.apk file.
``bash
./d2j-dex2jar.sh ../example.apk -o output_file.jar</p>
</blockquote>
<p>The process of converting from a <code>.dex</code> to a <code>.jar</code> file is important because it allows the use of conventional Java decompiler tools to obtain something that looks <strong>very similar</strong> to the original source code written by the developer.</p>
<p>Next, we&#39;ll take a look at one of the options available for the Java decompiler.</p>
<h2 id="-jd-gui-"><strong>JD-GUI</strong></h2>
<p>JD-GUI is a simple tool capable of decompiling Java <code>.jar</code> files and allowing you to browse through the source code of the <code>.class</code> files contained within.</p>
<p>Once you have JD-GUI installed, use the File menu to open the <code>classes_dex2jar.jar</code> file you created previously. This will show you a hierarchical view of the contents on the left-hand side. You can drill down to the classes, by clicking the triangle icons to the left of the package names.</p>
<p>Here is an example of the HelloWorld source code, compared with its decompiled version. Although this is a very simple application, you can see that the results are very similar to the original source code.</p>
<pre><code class="lang-java"><span class="hljs-comment">// ORIGINAL CODE</span>
<span class="hljs-keyword">package</span> com.example.els.helloworld;

<span class="hljs-keyword">import</span> android.support.v7.app.<span class="hljs-type">AppCompatActivity</span>;
<span class="hljs-keyword">import</span> android.os.<span class="hljs-type">Bundle</span>;

public <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">HelloWorldActivity</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">AppCompatActivity</span> </span>{

    <span class="hljs-meta">@Override</span>
    <span class="hljs-keyword">protected</span> void onCreate(<span class="hljs-type">Bundle</span> savedInstanceState) {
        <span class="hljs-keyword">super</span>.onCreate(savedInstancesState);
        setContentView(<span class="hljs-type">R</span>.layout.activity_hello_world);
    }
}
</code></pre>
<pre><code class="lang-java"><span class="hljs-comment">// DECOMPILED CODE</span>
<span class="hljs-keyword">package</span> com.example.els.helloworld;

<span class="hljs-keyword">import</span> android.os.<span class="hljs-type">Bundle</span>;
<span class="hljs-keyword">import</span> android.support.v7.app.<span class="hljs-type">AppCompatActivity</span>;

public <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">HelloWorldActivity</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">AppCompatActivity</span> </span>{

    <span class="hljs-meta">@Override</span>
    <span class="hljs-keyword">protected</span> void onCreate(<span class="hljs-type">Bundle</span> paramBundle) {
        <span class="hljs-keyword">super</span>.onCreate(paramBundle);
        setContentView(<span class="hljs-number">2130968602</span>);
    }
}
</code></pre>
<p>They differ only in the resource directives. While in the original code, the full name and namespace is used, in the decompiled version the value of the resource is specified in the R class.</p>
<pre><code class="lang-java"><span class="hljs-comment">// R.layout</span>
<span class="hljs-keyword">public</span> <span class="hljs-keyword">static</span> <span class="hljs-keyword">final</span> <span class="hljs-keyword">int</span> activity_hello_world = <span class="hljs-number">2130968602</span>;
</code></pre>
<p>From the File menu, choosing Save All Sources, allows you to save the decompiled files to a <code>zip</code> archive, so you can work with them outside of <code>JD-GUI</code>.</p>
<p>Now it is time to practice what you learned in a hands-on lab!
In this lab you will:</p>
<ul>
<li>Get familiar with reverse engineering Android apps.</li>
<li>Get familiar with various reverse engineering tools.</li>
<li>Decode <code>example.apk</code>.</li>
<li>Decompile <code>example.apk</code>.<h2 id="-smali-baksmali-"><strong>SMALI/Baksmali</strong></h2>
</li>
</ul>
<p><strong>Smali</strong> and <strong>Baksmali</strong> are programs commonly referred to as an assembler and disassembler. If you&#39;re not familiar with assembly languages, the key is that the higher-level languages such as C, C++, or Java, are not what is actually run by the computer. Instead, these are converted into a bytecode, which a computer can easily process, but which is difficult for humans to interpret.</p>
<p>To make things easier for us, this bytecode can be converted, or &quot;disassembled&quot; into a sort of intermediate language, referred to as assembly language. For Android, the bytecode is in <code>.dex</code> format, which, when disassembled by <code>baksmali</code>, produces an assembly language, which is commonly referred to as &quot;smali code&quot;.</p>
<p>Developers do not usually look at the assembly code for a program they&#39;ve written. However, it is common for hackers to use assembly code. They use it because it is much easier to reverse bytecode to assembly, than to get all the way back to the higher-level language the program was originally written in. Plus, it is much easier to understand the <code>smali</code> (or assembly), than the bytecode.</p>
<p>To give you an idea, here is the smali (assembly) code.</p>
<pre><code class="lang-java"><span class="hljs-keyword">.class</span><span class="hljs-keyword"> public</span> <span class="hljs-class">LHelloWorld;</span>
<span class="hljs-keyword">.super</span> <span class="hljs-class">Ljava/lang/Object;</span>

<span class="hljs-keyword">.method</span><span class="hljs-keyword"> public</span><span class="hljs-keyword"> static</span> main([<span class="hljs-class">Ljava/lang/String;</span>)V
<span class="hljs-keyword">    .registers</span> 2

   <span class="hljs-built_in"> sget-object </span>v0, <span class="hljs-class">Ljava/lang/System;</span>-&gt;out:<span class="hljs-class">Ljava/io/PrintStream;</span>

   <span class="hljs-built_in"> const-string </span>   v1, <span class="hljs-string">"Hello World!"</span>

   <span class="hljs-built_in"> invoke-virtual </span>{v0, v1}, <span class="hljs-class">Ljava/io/PrintStream;</span>-&gt;println(<span class="hljs-class">Ljava/lang/String;</span>)V

   <span class="hljs-built_in"> return-void
</span><span class="hljs-keyword">.end method</span>
</code></pre>
<p>In the previous slide, it is pretty clear that the smali looks more like a language you&#39;re used to seeing, such as C or C++. That being said, while harder, it is possible to read and understand the bytecode.</p>
<p>Here is a link if you want to take the time to translate the hex characters to the corresponding <a href="http://pallergabor.uw.hu/androidblog/dalvik_opcodes.html">Dalvik opcodes</a> and learn how they work. While learning assembly language is beyond the scope of this course, understanding it is essential for reversers and could potentially make finding certain types of vulnerabilities easier.</p>
<p>The assembler, smali, basically does the reverse. It takes <code>smali</code> code and creates a <code>.dex</code> file. Combining these two would allow you to disassemble an app, modify it then reassemble it.</p>
<blockquote>
<p>[!Note] 
An app modified in this fashion would not be properly signed, so it would not run as-is on a normal device.</p>
</blockquote>
<h2 id="-obfuscation-"><strong>Obfuscation</strong></h2>
<p><strong>Obfuscation</strong> is the process of intentionally making code harder to read for the purpose of making it more difficult to reverse. This is usually done by developers wanting to protect their intellectual property, namely the code itself, but it is also a side effect of optimizing and minifying the code. <strong>Minifying</strong> is a generic term for reducing the size of the code, which can improve performance and reduce the apps size.</p>
<p>While it may make it harder to reverse an app, <strong>it doesn&#39;t guarantee any security, at all</strong>, against a determined reverser. Ultimately, the computer must be able to parse the obfuscated code to run the app, so given enough time and effort, obfuscation can almost always be rendered ineffective.</p>
<p>There are numerous commercial products which advertise their unique obfuscation capabilities, but their effectiveness should be taken with skepticism and not solely relied on to protect sensitive data.</p>
<p>The use of <strong>ProGuard</strong>, which is free and can be built-in to Android Studio&#39;s build process, will suffice for most realistic use cases.</p>
<p>To be clear, we&#39;re not stating ProGuard is more secure than the commercial products, but rather that when used for the correct purposes, it is on par with those products.</p>
<p>For the most part, ProGuard will change class, field and method names into meaningless values. You may see names that are single letters, or a couple of letters. You may still be able to see, for example, that class &quot;a&quot; has a method &quot;b&quot; that calls method &quot;c&quot; in class &quot;d&quot;, but there is no direct means to infer what their purposes are. The purpose is more to remove the meaningful names and make the code smaller, not to &quot;encrypt&quot;.</p>
<p>If you don&#39;t have access to the original source code, reversing a debug build of the application is usually your best bet. The debug builds are generally not obfuscated, unlike the release builds. If you don&#39;t have the source or a debug build, debugging and monitoring the application at runtime are some of the ways you can begin to decipher what the classes and different methods actually do, but it is a painstaking process.</p>
<h2 id="-additional-apk-contents-"><strong>Additional APK Contents</strong></h2>
<p>Since we&#39;ve already addressed most of the contents of a typical APK file in the previous sections, we&#39;ll just wrap things up and cover some of the less common aspects. With all the flexibility afforded to Android developers, there is potentially no limit to the unique things you may find when reversing applications.</p>
<p>Looking back at the example from earlier, our sample output from apktool includes several directories and a file:</p>
<ul>
<li><strong>original</strong> (folder)</li>
<li><strong>smali</strong> (folder)</li>
<li><strong>apktool.yml</strong> (file)</li>
<li><strong>unkown</strong> (folder)</li>
</ul>
<blockquote>
<p>[!Note]
The results will vary from app to app, but we&#39;ll dive into some of the common results.</p>
</blockquote>
<p>In fact, you&#39;ll find much of what is needed to build the APK other than the source code in this file. This is because the purpose of this file is to allow the rebuilding of an app once it has been disassembled. It has to track various aspects that could otherwise be lost.</p>
<p>The <strong>original</strong> directory contains the original APK&#39;s <code>AndroidManifest.xml</code> file and <code>META-INF</code> directories, which are used in the rebuilding of the APK from the disassembled code.</p>
<p>The <strong>smali</strong> directory contains the individual smali files for all of the decoded <code>.dex</code> files, organized in directories based on the Java package names.</p>
<p>Finally, the <strong>unknown</strong> directory contains all the unknown files, such as language translations and other non-structured data used by the app.</p>
<p>Again, this doesn&#39;t cover every possibility, but rather covers some of the common components.</p>
<hr>
<h1 id="-device-rooting-"><strong>Device Rooting</strong></h1>
<h2 id="-what-is-rooting-"><strong>What is Rooting?</strong></h2>
<p>Fundamentally, rooting is a process by which one obtains &quot;root&quot; or system level access to an Android device. This is equivalent to having a root account on a Linux system. But unlike a typical Linux system, the manufacturers and/or carriers do not intend for the user to have this level of access to their device. Essentially, it&#39;s breaking into your own device, to get more flexibility in customizing it.</p>
<p>Because many OEMs and/or carriers don&#39;t want users to have this access, obtaining root access often requires exploiting a vulnerability on a device. The vulnerability generally needs to be in a process, which itself has system level access. Otherwise, two exploits may be required, one to gain unprivileged access and a second to elevate that access to system or &quot;root&quot; level.</p>
<p>These vulnerabilities are often specific to device, version or specific piece of code, so while there may be a published means to obtain root on one device, there may not be one for another, even if they are of the same generation. Once the exploit is complete, the next step in the process involves copying the Linux <code>su</code> binary to a location specified in the in the user&#39;s PATH environment variable, for example <code>/system/xbin</code>.</p>
<p>The <strong>su</strong> or &quot;substitute user&quot; binary, allows users to become other users, including root. Once su is configured with the proper permissions, another Android app is used to interface with the <strong>su</strong> binary and process requests for superuser or &quot;root&quot; access.</p>
<h2 id="-potential-issues-"><strong>Potential Issues</strong></h2>
<p>The rooting process is filled with potential danger for even the most savvy users. Many times, users are blindly trusting strangers on the Internet to give them quality, secure and non-malicious software in order for them to root their devices.</p>
<p>Even if the developers of the rooting software aren&#39;t deliberately malicious, they make mistakes and could easily cause a user to turn their device into a paperweight, either through poor instructions or by badly designed software/exploits.</p>
<p>If they are malicious, or sloppy about security themselves, well then it&#39;s game over for the user, because they potentially just gave a hacker root access to their device.</p>
<h2 id="-custom-roms-"><strong>Custom ROMs</strong></h2>
<p>Some users also choose to replace the OS that comes with their device with custom firmware. This is usually done to extend the usefulness of an older device, bypass software restrictions put in place by the carriers or OEM, or to gain access to the latest Android code without waiting on the carriers to release an update.</p>
<p><strong>OmniROM</strong> and <strong>LineageOS</strong> are two of the most popular families of customized firmware you&#39;re likely to encounter. In many cases, this requires rooting the device, in order to modify the bootloader which loads the custom ROM firmware.</p>
<p>Some manufacturers however, are open to letting people run custom firmware. They allow the unlocking of their bootloaders in a well-documented, safer and easier fashion. The most notable of these is <strong>Google&#39;s Nexus devices</strong>.</p>
<p>By allowing easy unlocking, Google avoids the need for people to use possibly malicious exploits to gain access to the root functionality. Additionally, Nexus devices do not come with carrier bloatware pre-installed, so there is less desire to root the device.</p>
<h2 id="-implications-of-rooting-"><strong>Implications of Rooting</strong></h2>
<p>Once a device has been rooted, the potential exists that any app on the device could request root access. If a malicious app obtains this capability, either through a vulnerability, social engineering or other method, there is literally no limit to the destruction it can cause to the device&#39;s software and the user&#39;s data.</p>
<p>Remember, the cornerstone of the Android security is the UID separation between apps. The UID is what prevents a normal app from modifying the system configuration as well.</p>
<h2 id="-rooting-for-testing-"><strong>Rooting for Testing</strong></h2>
<p>Unlike normal users, developers and security testers often need root access to devices in order to see what&#39;s going on under the hood. For example, we may need to view what data was written to a protected file, which wouldn&#39;t normally be allowed, even using ADB.</p>
<p>For many cases, the use of an emulator will suffice, because they do allow root access. Even with that, you will occasionally find it either too slow or inconvenient, or incapable of duplicating the scenario you need tested. For these situations, it&#39;s best to have a Nexus device on hand as a test device. This avoids the need for exploits.</p>
<p>You should now have an understanding of the usefulness and potential security impacts of rooting a device. Because each rooting process is different, we aren&#39;t going to dive into the specifics beyond what has already been covered. If you want to see a rooting process in action, there are numerous videos available on the Internet.</p>
<p>Please use caution before installing any software recommended from this course. There is always a chance they could compromise the security of your computer or Android device.</p>
<hr>
<h1 id="-android-application-fundamentals-"><strong>Android Application Fundamentals</strong></h1>
<h2 id="-structure-"><strong>Structure</strong></h2>
<p>As we previously discussed, there are two major components to any Android app:</p>
<ul>
<li>The Java code which makes up the heart of the program.</li>
<li>XML which defines configurations, such as string values and the app&#39;s identity.</li>
</ul>
<p>Now, we&#39;ll take a deeper look at each of these separately and how they fit together.</p>
<h3 id="-java-"><strong>Java</strong></h3>
<p>For most of us, we consider that Android uses Java, end of story. Regardless of the Java flavor, it makes up the core of nearly every Android app. While it is possible to use languages such as C, or C++, using the Android Native Development Kit (NDK) is the best option. Java is used for the majority of apps and their primary components, which we will discuss later.</p>
<h3 id="-androidmanifest-xml-"><strong>AndroidManifest.xml</strong></h3>
<p>In this and some of the following sections, we&#39;ll be taking a deeper dive into the aspects of the <code>AndroidManifest.xml</code> file. Without this file, the Android operating system is unable to run the app.</p>
<p>It defines things such as the name of the app, all its major components, how the components are protected, what versions of Android the app will run on, the UID it will run with and much more.</p>
<p>Each of the configurations is specified in an attribute to one of numerous xml elements. Some of these elements themselves may contain multiple sub-elements as well.</p>
<p>You should be aware that if an attribute begins with a dot (.), it is treated as relative to the package name, specified in the manifest element&#39;s package attribute. For example, if the package named <code>com.example.helloworld</code> had an element attribute specifying <code>.test</code> as the value, it would be equivalent to using <code>com.example.helloworld.test</code>.</p>
<h3 id="-importance-of-sdk-versions-"><strong>Importance of SDK Versions</strong></h3>
<p>Some of the most important items in the <code>AndroidManifest.xml</code> file are those specified in the <code>&lt;uses-sdk&gt;</code> element. It has one or more of the following attributes:</p>
<ul>
<li><strong>minSdkVersion</strong></li>
<li><strong>targetSDKVersion</strong></li>
<li>and/or <strong>maxSdkVersion</strong></li>
</ul>
<p>The <strong>minSdkVersion</strong> specifies the earliest version of Android the app will run on. Failing to specify a value results in a default of <strong>1</strong>, which would allow the app to run on any version of Android, back to the very first.</p>
<p>The issue with supporting these old versions, from a security perspective, is that your app inherits the security vulnerabilities of the Android version it runs on. Without any changes to your code, your app can have dramatically different security postures on different devices, based on their Android versions. If a developer fails, or is unable to account for this in their application design, the app may inherit some serious vulnerabilities.</p>
<blockquote>
<p>Businesses frequently want to support the widest ranges of devices possible, in order to reach the maximum number of consumers. It is important for developers to strike the right balance between compatibility and security. If older versions must be supported to meet business requirements, steps should be taken to engineer around potential vulnerabilities for the versions you wish to support.</p>
</blockquote>
<p>The <strong>targetSdkVersion</strong> specifies which version of Android the application has been tested to be compatible with. This setting controls how compatibility features are applied to the application for Android versions greater than the specified version. If not set, it will fall back to the same value as <em>minSDKVersion</em>.</p>
<p>It is not generally recommended to set the <strong>maxSdkVersion</strong> at all, because it essentially prevents the application from being installed, or may cause it to be removed from, devices which run an Android version newer than the one specified.</p>
<p>In general, neither the <strong>targetSdkVersion</strong> nor <strong>maxSdkVersion</strong> have any significant security impact.</p>
<h2 id="-intents-"><strong>Intents</strong></h2>
<p>Intents are the primary means by which Android apps communicate between their components or with other apps. These message objects can also carry data between apps or components, similar to how GET and POST verbs are commonly used in HTTP communications.</p>
<p>Intents are commonly used to invoke an action or set of actions in the receiving component or application. As we&#39;ll discuss shortly, these can be directed to specific components and/or applications, or can be sent out without a specific recipient designated. This leaves it up to all potential recipients as to whether they are interested in the message.</p>
<h3 id="-implicit-intents-"><strong>Implicit Intents</strong></h3>
<p><strong>Implicit Intents</strong> are those that do not specify a particular app&#39;s component, but rather specify an <strong>Action</strong> to be taken and therefore potentially allow any application to receive and process the intent.</p>
<p>An <strong>Action</strong> is a string that specifies the name of an action to perform, which the receiving component will process based on its configuration. These are specified as <strong>ACTION_X</strong> where <strong>X</strong> describes an action to perform such as <strong>VIEW</strong> or <strong>SEND</strong>. An intent&#39;s action is specified either via the <code>setAction()</code> method or within the Intent constructor itself.</p>
<p>Intents are programmatically created using an Intent constructor like the one shown below.</p>
<pre><code class="lang-java">Intent email = new Intent(<span class="hljs-name">Intent</span>.ACTION_SEND, Uri.parse(<span class="hljs-string">"mailto:"</span>))<span class="hljs-comment">;</span>
</code></pre>
<p>In the above example, the Intent&#39;s name is <strong>email</strong>, the Action is <strong>ACTION_SEND</strong> and it includes an <strong>Extra</strong> of <strong>mailto</strong>, whose type is Uri. This example is used for sending a mailto link to an application which is capable of generating an email message.</p>
<p>An <strong>Extra</strong> is the term for the portion of the Intent which carries data. We&#39;ll cover working with Extras a bit later in the course.</p>
<p>In the receiving app&#39;s manifest, it would be necessary to have a component with an <strong>intent-filter</strong> element, which matches our <strong>action</strong>. In the example below, the component is an Activity and the action&#39;s name attribute is specified in hierarchical form.</p>
<pre><code class="lang-xml"><span class="hljs-tag">&lt;<span class="hljs-name">activity</span> <span class="hljs-attr">android:name</span>=<span class="hljs-string">"ShareActivity"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">intent-filter</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">action</span> <span class="hljs-attr">android:name</span>=<span class="hljs-string">"android.intent.action.SEND"</span>/&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">category</span> <span class="hljs-attr">android:name</span>=<span class="hljs-string">"android.intent.category.DEFAULT"</span>/&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">intent-filter</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">activity</span>&gt;</span>
</code></pre>
<p>In addition to a matching <strong>action</strong>, an intent and its corresponding <strong>intent-filter</strong> in the receiving component, are paired with their <strong>data</strong> and <strong>category</strong>. In order to receive any implicit intent, the app also needs to specify the default category, as in the previous example (<code>android.intent.category.DEFAULT</code>).</p>
<p>From a security perspective, it is very important to recognize that the recipient of an implicit intent is <strong>not</strong> specified by the sending application. This means that any data sent in an implicit intent could trivially be stolen by a malicious app. Developers need to be mindful of the fact that the recipient of this type of intent can never be assured.</p>
<p>The &quot;Intent resolution&quot; process queries the system&#39;s Package Manager process. It is used to determine which apps are capable of handling the Intent based on if they match the category, action and type. The resolution process also considers the <strong>priority</strong> attribute which can be specified in the intent-filter for a component. The app with the higher priority value will be selected if there are multiple matches on the other criterion.</p>
<p>While the documentation suggests the limits for priority values be between -1000 and 1000, at one point, the OS didn&#39;t necessarily enforce this. This allowed apps to use the <strong>SYSTEM_HIGH_PRIORITY</strong> value, which is the system&#39;s maximum possible integer value, allowing them to compete with system apps for intents.</p>
<p>During the Intent resolution process, if a conflict arises, the default behavior is that a &quot;chooser&quot; window appears, which prompts the user to choose the application to use to handle the Intent.</p>
<h3 id="-explicit-intents-"><strong>Explicit Intents</strong></h3>
<p>An explicit intent is one that specifies the class name it is targeting in the intent constructor. This ensures the receiving app is the one you intended and prevents a malicious apр from intercepting or eavesdropping on the intent contents. For internal classes, you&#39;d simply specify the class name in the constructor.</p>
<p>The following is an explicit intent example:</p>
<pre><code class="lang-java">Intent downloadIntent = <span class="hljs-keyword">new</span> Intent(<span class="hljs-keyword">this</span>, DownloadService.<span class="hljs-keyword">class</span>);
</code></pre>
<p>For classes in other applications, you&#39;d use either the <code>setComponent</code> or <code>setClass</code> methods from the Intent constructor.</p>
<p>Explicit intent example:</p>
<pre><code class="lang-java">Intent intent = new Intent()<span class="hljs-comment">;</span>
intent.setClassName (<span class="hljs-string">"com.other.app"</span>, <span class="hljs-string">"com.other.app.ServiceName"</span>)<span class="hljs-comment">;</span>
<span class="hljs-built_in">context</span>.startService(intent)<span class="hljs-comment">;</span>
</code></pre>
<p>Unlike the intents we&#39;ve previously discussed, which are ultimately only received by one app, broadcast intents can received by multiple apps. When sending broadcasts, care needs to be taken so that no sensitive data is leaked in the process.</p>
<p>If you need to ensure that only a select app receives a broadcast, starting with API version 14 (Android 4.0 - Ice Cream Sandwich), you can specify the app, using <code>Intent.setPackage</code>.</p>
<p>Alternatively, you can specify a permission when sending the broadcast. The receiving app(s) would need to specify the <strong>uses-permission</strong> element in their <code>AndroidManifest.xml</code> file, with the permission in its name attribute value.</p>
<p>We&#39;ll discuss how permissions work in a later section.</p>
<h3 id="-broadcast-intents-"><strong>Broadcast Intents</strong></h3>
<p>There are two types of Broadcasts: <strong>Normal</strong> and <strong>Ordered</strong>.</p>
<p><strong>Normal Broadcasts</strong> are asynchronous and can be processed by multiple applications in any order, or potentially simultaneous.</p>
<p><strong>Ordered Broadcasts</strong> are run one at a time, in a daisy-chained fashion. The order is determined by the priority defined within the corresponding receiver element, within the receiving app&#39;s <code>AndroidManifest.xml</code> file. This means that each app can process, then relay, or drop, the Broadcast.</p>
<p>If you need to ensure delivery of the Broadcast, you&#39;ll either need to use the appropriate permissions, or a Normal Broadcast (if the Broadcast isn&#39;t sensitive).</p>
<p>To send a broadcast intent, with a permission specified, you&#39;d use something like the example below:</p>
<pre><code class="lang-java">sendBroadcast(<span class="hljs-name">intent</span>, receiverPermission)<span class="hljs-comment">;</span>
</code></pre>
<p>Keep in mind, that unless the permission you declare is reserved for system level apps, any app could also have declared the same permission. The only protection offered in this situation is at app install time, but as we&#39;ll see later, even that has suffered from vulnerabilities.</p>
<blockquote>
<p>If the Broadcast only needs to be received by components within the same application it is being sent from, you can use the <code>sendBroadcast</code> method from the <code>LocalBroadCastManager</code> class.</p>
</blockquote>
<p>Unlike the <code>sendBroadcast</code> method from the <strong>Context</strong> class, the <code>sendBroadcast</code> method from the <code>LocalBroadCastManager</code> ensures that your broadcast never leaves your app, which also means you don&#39;t have to export a receiver component. Because you don&#39;t export the receiver, you also minimize your application&#39;s attack surface, giving you one less thing that you have to safeguard.</p>
<h3 id="-sticky-broadcast-"><strong>Sticky Broadcast</strong></h3>
<p><strong>Sticky Broadcasts</strong> are similar to Broadcasts in that many apps may receive the data. The significant difference here is that the system maintains these Broadcasts, so they can be accessed long after they were initially sent, instead of in real-time, the way normal Broadcasts are.</p>
<p>Luckily, this functionality was deprecated in API Level 21, but you will still find them used in some apps.</p>
<p>As with any Broadcast, Sticky Broadcasts allow for data leakage when received by a malicious app. But they also allow for malicious apps to modify the data as well.</p>
<p>The lesson here is if you&#39;re reviewing an app and see any method that contains the word &quot;sticky&quot;, like <code>sendStickyBroadcast</code>, <code>sendStickyBroadcastAsUser</code>, etc., you should definitely examine the potential impact and do everything you can to get it removed. If you&#39;re a developer, just forget that this functionality ever existed.</p>
<h3 id="-pending-intents-"><strong>Pending Intents</strong></h3>
<p><strong>Pending Intents</strong> allow other applications to take actions on behalf of your application, using your app&#39;s identity and permissions.</p>
<p>When constructing a <strong>Pending Intent</strong>, developers specify an intent and action to perform. If this intent is not an Explicit Intent, a malicious application could receive it and perform the action on behalf of the victim app. Obviously, allowing a malicious application to perform an action as if it was yours, can have potentially serious security consequences.</p>
<p>As described in CVE-2014-8609, the Android Settings app suffered from a privilege escalation vulnerability, due to its use of an Implicit, rather than Explicit Intent when constructing a Pending Intent. Additionally, the Settings app failed to specify an action, allowing the attacker to control not only the destination, but the action to be performed as well.</p>
<p>Finally, to make matters worse, the Settings app runs with the SYSTEM permission, so nearly unlimited damage could be done by a malicious app, including completely deleting all the user data such as performing a factory reset.</p>
<p>The vulnerable line of code is shown below.</p>
<pre><code class="lang-java">mPendingIntent = PendingIntent.getBroadcast(<span class="hljs-built_in">this</span>, <span class="hljs-number">0</span>, <span class="hljs-keyword">new</span> <span class="hljs-type">Intent</span>(), <span class="hljs-number">0</span>);
</code></pre>
<p>Here the <code>new Intent()</code> is what creates the empty and therefore Implicit intent.
A safe example would replace that section with something like this:</p>
<pre><code class="lang-java"><span class="hljs-keyword">new</span> Intent (SampleAction, SampleUri, <span class="hljs-keyword">this</span>, Example.<span class="hljs-keyword">class</span>)
</code></pre>
<blockquote>
<p>&quot;this&quot; refers to the Context.</p>
<h2 id="-deep-links-"><strong>Deep Links</strong></h2>
</blockquote>
<p><strong>Deep Links</strong> allow you to trigger an Intent via URL, embedded in a website. This allows the app to start and pass in data.</p>
<p>In order to receive the Intent, you need to configure your <code>AndroidManifest.xml</code> to confirm the action, category and data, in the Deep Link&#39;s URL, match up with the <code>intent-filter</code> element for the receiving component. Your intent-filter must also include a <em>category</em> with the following value:</p>
<pre><code>android<span class="hljs-selector-class">.intent</span><span class="hljs-selector-class">.category</span><span class="hljs-selector-class">.BROWSABLE</span>
</code></pre><p>As with any external input, the data carried in an Intent, from a Deep Link, should be validated before being used in the application. You also need to consider the contexts in which the data is used. For example: whether it is used in a WebView and could potentially lead to an XSS, or other vulnerability.</p>
<p>Once the Deep Link Intent reaches the application, there is basically no difference than any other type of Intent, so the data, action, etc. are pulled from it using the same methods you would with any Intent.</p>
<h2 id="-aidl-"><strong>AIDL</strong></h2>
<p><strong>AIDL</strong> (Android Interface Definition Language) is an Android specific IDL, which essentially describes an API offered by a Service to external applications. AIDL enables IPC (InterProcess Communication) by allowing the client to understand what the service is expecting, in terms of primitives. The client app can then create these objects and rely on the underlying operating system to deliver them to the service in another app.</p>
<p>Depending on whether you need multi-threading and concurrency, there are other alternatives as well, which will be covered in upcoming modules.</p>
<p>Services which use AIDL are referred to as <strong>Bound Services</strong> and are a bit more complicated to implement than most components. In the Service&#39;s class you will find an <code>onBind</code> method, which returns the service object to the client app, in the form of an IBinder. It is important to understand that the <code>onBind</code> method is where the client interaction begins with the service.</p>
<p>When looking for potential vulnerabilities, you will want to begin with the <code>onBind</code> method and follow the application&#39;s logic to determine what actions are invoked as a result of the requests from client apps and where the data passed in from these requests are used.</p>
<p>When exposing a service using AIDL, you&#39;ll also need to ensure you&#39;ve properly configured the permissions in the <code>AndroidManifest.xml</code> to limit which apps can connect to it. We&#39;ll discuss these permissions, and services in general, in an upcoming module.</p>
<p>Since we&#39;re mainly concerned with the security implications, we&#39;re not necessarily diving deep into the programming details, but we&#39;d recommend you consult the linked documentation to learn more about how they are constructed.</p>
<h2 id="-messanger-"><strong>Messanger</strong></h2>
<p>A Messenger is another type of IPC mechanism available in Android to share a service with other apps. The client invoking a Messenger receives an IBinder that can be used to send data to the service.</p>
<p>Since a Messenger is also a &quot;Bound Service&quot;, the data passed in from the client app is also processed through the <code>onBind</code> method. When reviewing a class that implements a Messenger interface, you&#39;ll need to begin evaluating this method. This is done by looking for the invocation of sensitive functionality or unsafe handling of data sent from a client app.</p>
<p>Again, we&#39;re not going to focus deeply on the internal workings of a Messenger. For our purposes, it&#39;s sufficient to understand they are meant to pass in data from other apps. It is also the place to begin the process of tracing the execution from source to sink via static code analysis.</p>
<p>As with AIDL services, and other IPC mechanisms meant to expose components to other applications, the first step in securing them and limiting the attack surface, is configuring the permissions properly in the <code>AndroidManifest.xml</code>.</p>
<h2 id="-android-app-components-"><strong>Android App Components</strong></h2>
<p>Components is a generic term used to describe the more commonly used and familiar parts of an Android application. These include <strong>Activities</strong>, <strong>Services</strong>, <strong>Broadcast Receivers</strong> and <strong>Providers</strong>.</p>
<p>Each component type has a unique role to play in an Android application, although they are not all present in every app. They are implemented as needed, depending on the goals of the developer. The implementation of these components is done in Java, but each has a corresponding element in the <code>AndroidManifest.xml</code> file.</p>
<h3 id="-activities-"><strong>Activities</strong></h3>
<p>Activities are the <strong>visual screens</strong> you see in applications. With a few exceptions, every image, button, web page, menu, etc. are implemented via an Activity.</p>
<p>Most applications intentionally expose at least one Activity which can be invoked by an Intent. Remotely invoking an Activity, that just spawns the associated UI elements, is not a real security concern (even if left unprotected). There are however, some special cases, which we&#39;ll take a look at. In addition to supporting Java code, Activities are defined in an activity element in the <code>AndroidManifest.xml</code> file.</p>
<p>Obviously you shouldn&#39;t be able to bypass a &quot;Login&quot; activity and gain access to a protected part of the app, without authenticating. But even if this is possible, its usefulness to an attacker is often questionable. Forcing, or allowing, a user to see a UI element that they should have logged in to see, is not much benefit to an attacker, unless the attacker is the user trying to hack the app (e.g. game cheating).</p>
<p>For this vulnerability to be meaningful, a developer would have to already had to have violated the <strong>cardinal rule of client-side security</strong>: Never rely on client-side code alone to protect data or functionality.</p>
<p>The most direct situations where an improperly protected Activity could be exploited would be those where it returns data to a caller. In order to locate situations where this could occur, you&#39;ll need to examine the Activity code for the <code>setResult</code> method, described here.</p>
<p>The key here is to evaluate what data is passed into the <code>setResult</code> method&#39;s <strong>Intent</strong> parameter. If this data is sensitive in nature, you would have an information leakage vulnerability. This is exploitable by all applications capable of communicating with the Activity.</p>
<h3 id="-services-"><strong>Services</strong></h3>
<p>Services are used to perform long-running processes, even if the user starts using a different application. Services run in the background and therefore don&#39;t provide a UI themselves. In addition to the supporting Java code, Services are defined in a <strong>service</strong> element in the <code>AndroidManifest.xml</code> file.</p>
<p>If the client calls a service using the <code>startService</code> method, it will run indefinitely, until the <code>stopService</code> method is invoked. If the service is only needed as long as the client is connected, the client should &quot;bind&quot; to it using the <code>bindService</code> method.</p>
<p>Depending on how the service is created or started, there are several methods which can receive malicious input and need to be reviewed for vulnerabilities. The first place to look for vulnerabilities, would be from the Intent, passed into the <code>onStartCommand</code> method for &quot;started&quot; services.</p>
<p>You&#39;ll want to look for any sensitive functionality invoked because of this Intent. Or any use of the Extras from the Intent used in a sensitive function, which have not been properly sanitized first.</p>
<p>For a &quot;bound&quot; service, you&#39;ll perform the same process, but you would start with the Intent passed to the <code>onBind</code> method, looking for the same types of issues.</p>
<h3 id="-broadcast-receivers-"><strong>Broadcast Receivers</strong></h3>
<p>Broadcast Receivers are the components which <strong>listen</strong> for Broadcast Intents sent from applications. Broadcast Receivers can be <strong>statically</strong> defined in <code>AndroidManifest.xml</code>, in a receiver element, or <strong>dynamically</strong> defined using the <code>registerReceiver</code> method.</p>
<p>Receivers are primarily used for processing input from other applications. The keys to properly securing them are:</p>
<ul>
<li>validating the data received from other applications.</li>
<li>potentially limiting which application&#39;s broadcasts your receiver accepts.</li>
</ul>
<p>When <strong>statically</strong> defined, you can <strong>limit</strong> which app&#39;s broadcasts you accept through the use of permissions within the receiver element, defined in the <code>AndroidManifest.xml</code>. When <strong>dynamically</strong> defining a receiver, you pass the permission as an argument to the <code>registerReceiver</code> method. We&#39;ll dive into permissions more in another section.</p>
<p>You&#39;ll want to start your examination of potentially tainted data flow. This begins with the Intent passed to the <code>onReceive</code> method in the class that implements the <code>BroadcastReceiver</code>. You should ensure that the data is properly validated and no sensitive functions can be invoked by malicious applications.</p>
<p>Ordered Broadcasts present a unique case because not only can the other receivers of the Broadcast Intent receive and potentially drop it, they also have the ability to modify the contents of the Intent, using one of the setter methods.</p>
<p>Therefore, you need to either ensure that only trusted apps can:</p>
<ul>
<li>Receive the broadcasts via permissions.</li>
<li>and/or ensure that any attempt to read the results via the <code>getResultX</code> <em>getter</em> methods properly validates the data received.</li>
</ul>
<p>You would also want to ensure that the processing of the received data is coded in such a way that bogus (but otherwise valid) data does not open your app up to security vulnerabilities.</p>
<h3 id="-content-providers-"><strong>Content Providers</strong></h3>
<p>Content Providers are the means by which Android apps share structured data, such as relational databases (e.g. SQLite). As with other component types, securing Content Providers begins with determining whether your business requirements allow you to prevent or at least limit other apps from connecting to them.</p>
<p>As previously discussed, this begins with setting the correct <strong>exported</strong> attribute value within the provider element of your <code>AndroidManifest.xml</code> file. Using permissions and the appropriate <strong>protection level limit</strong> the apps which can connect to the Content Providers.</p>
<p>Unlike other elements, Content Providers also have a second layer of permissions which, when present, take precedencе over the <strong>permission</strong> attribute. The <code>readPermission</code> and <code>writePermission</code> attributes specify which permissions an app must have, in order to query the database or make changes to the data.</p>
<p>Content Providers also provide the ability to allow for temporary exceptions to these two layers of permissions. This is accomplished by first, setting the <code>grantUriPermission</code> attribute value to true. Then configuring the appropriate parameters in the <code>grant-uri-permission</code> element, within the provider element, of the app&#39;s <code>AndroidManifest.xml</code> file.</p>
<p>The <code>grant-uri-permission</code> element has three attributes: <strong>path</strong>, <strong>pathPrefix</strong> and <strong>pathPattern</strong>. These are used to specify which paths in the content: URI are available:</p>
<ul>
<li>The <strong>path</strong> attribute allows specifying the entire pathto exclude.</li>
<li>The <strong>pathPrefix</strong> attribute allows you to specify the beginning of the path, in case you need to exclude multiple child paths.</li>
<li>The <strong>pathPattern</strong> allows the use of wildcards and symbolic replacements, to gain more granular control. For example: allowing all URI, which end in a similar value, but are located under different parent paths.</li>
</ul>
<p>Despite the numerous means to limit access to your Content Providers, this may not be sufficient, or even possible in some cases. Usually you still need to ensure that the code protects itself, in order to prevent common vulnerabilities like <strong>data leakage</strong> and <strong>SQL Injection</strong> attacks. </p>
<blockquote>
<p>[!Note]
SQLi in Android does not have the exact same meaning as the one for Web Apps.</p>
</blockquote>
<p>As with any functionality involving potentially tainted data, programmatically creating defenses, such as <strong>whitelists</strong> of expected values, will eliminate many types of vulnerabilities. To prevent SQL Injection attacks, you&#39;ll want to use parameterized queries, as you would with a web application. This however does not prevent injection in where the <strong>select</strong> parameter used in one of the query methods (<strong>query</strong>, <strong>update</strong>, <strong>delete</strong>), is created by concatenation of untrusted data.</p>
<h2 id="-permissions-"><strong>Permissions</strong></h2>
<p>We have mentioned permissions several times in this course, now dive into the different types and their usages. These various usages play an integral part in the security of many aspects of Android applications. The term <strong>Permissions</strong> is repeatedly used to describe several different configurations for Android apps, so we&#39;ve separated the sections to clarify which we are referring to.</p>
<h3 id="-requested-permissions-"><strong>Requested Permissions</strong></h3>
<p>When the average user thinks of Android permissions, they think of the prompts they receive when they install applications, such as access to your Contacts, GPS location and so on. These prompts are a direct result of the configuration of the <code>uses-permission</code> elements in the <code>AndroidManifest.xml</code> file.</p>
<p>The <code>uses-permission</code> element has two attributes, <strong>name</strong> and <strong>maxSdkVersion</strong>. The name attribute will either be standard system permission, in which case it will begin with <code>android.permission</code>, or a custom permission defined in another application. We&#39;ll review how an app can declare these custom permissions in an upcoming section.</p>
<p>Whether the system prompts a user to approve permissions depends on the type of permission requested. We&#39;ll cover these differences in an upcoming section.</p>
<p>In Android version 5.1 and lower, these permissions were only requested at the time of installation, but starting in version 6.0, it is now possible for users to control permissions after installation.</p>
<p>The <code>maxSdkVersion</code> attribute simply stops your app from asking for permission on versions higher than the one specified. This is used if there is a change to the Android operating system, making the request unnecessary after some version.</p>
<h3 id="-custom-permissions-"><strong>Custom Permissions</strong></h3>
<p>When an app needs to expose information or functionality from one of its components, it will export it to make it available. By defining a custom permission, using the <code>permission</code> element, the app can limit access to only those apps that have the specified permission. The app requiring the permission would define the <code>uses-permission</code> element&#39;s <strong>name</strong> attribute, which matched the <strong>name</strong> element in the hosting app&#39;s <strong>permission</strong> element.</p>
<p>The <strong>permissions</strong> element has three attributes which are directly related to security.</p>
<ul>
<li>The <strong>name</strong> attribute is a string identifying the permission.</li>
<li>The <strong>protection-level</strong> attribute, dictate how the permissions are granted. We&#39;ll cover this in the next section.</li>
<li>The <strong>permission-group</strong> attribute, which allows for grouping related permissions.<h3 id="-protection-levels-"><strong>Protection Levels</strong></h3>
</li>
</ul>
<p>Protection levels are specified within the <strong>permission</strong> element for a component and are what ultimately dictate how the permissions are granted. There are four types of protection levels: <strong>Normal</strong>, <strong>Dangerous</strong>, <strong>Signature</strong> and <strong>SignatureOrSystem</strong>. The appropriate protection level is dependent on several factors, including which apps should communicate with the component.</p>
<h4 id="-normal-protection-level-"><strong>Normal Protection Level</strong></h4>
<p><strong>Normal</strong> protection-level is used for many <strong>common</strong> permissions where there are no known threat to the application, user or operating system. The user is not required to approve permissions which use this <strong>protect-level</strong>, because they have been deemed harmless.</p>
<h4 id="-dangerous-protection-level-"><strong>Dangerous Protection Level</strong></h4>
<p><strong>Dangerous</strong> protection-level, implies that this permission will grant the requesting application, elevated access to data or system functionality. Users will <strong>receive</strong> a <strong>prompt</strong> requiring approval whenever an app needs dangerous protection level permission. Permissions of this type are used for system functionality, which is potentially harmful.</p>
<h4 id="-signature-protection-level-"><strong>Signature Protection Level</strong></h4>
<p><strong>Signature</strong> protection-level is used to ensure that only apps signed with the <strong>same certificate</strong>, as the app exporting the component, can be granted permission. This type of protection level is used by organizations to permit their apps to communicate with each other, while preventing others. This is the <strong>strongest</strong> type of protection offered in Android and doesn&#39;t rely on any approval from the user.</p>
<h4 id="-signatureorsystem-protection-level-"><strong>SignatureOrSystem Protection Level</strong></h4>
<p><strong>SignatureOrSystem</strong> protection-level is used to ensure that only apps signed with the <strong>same certificate</strong>, as the app exporting the component, or apps running with system-level access, can be granted permission.</p>
<p>This protection-level is used by applications on the system image and generally not ones which are installed by users. You would likely find this protection level used in apps from OEMs or cellular providers.</p>
<h2 id="-webviews-"><strong>WebViews</strong></h2>
<p><strong>WebViews</strong> are effectively web browsers (aka clients) which are embedded into Android apps. WebViews can render HTML, execute JavaScript and even run active content (version dependent).</p>
<p>The content loaded into WebViews can be pulled from remote sites or files which are already included in the app, such as HTML templates. Developers often opt to use local files to improve the responsiveness of their applications, and use remote content when they need current content or the ability to change the content without updating the client.</p>
<p>Unfortunately, the functionality and flexibility offered by WebViews dramatically expand the attack surface for Android apps. WebViews are potentially vulnerable to all of the same vulnerabilities as any other web browser and may allow exploitation of many of the OWASP Top 10 vulnerabilities in web applications.</p>
<p>Luckily, there are some limitations and configuration options, which can limit the exploitation possibilities, depending on an app&#39;s requirements.</p>
<h3 id="-webview-and-webchrome-clients-"><strong>WebView and WebChrome Clients</strong></h3>
<p>There are two types of WebViews used in Android. The <strong>WebViewClient</strong> is best suited for simple HTML rendering, whereas the <strong>WebChrome client</strong> is effectively a full-fledged Chrome browser.</p>
<p>One key difference for a security tester is that the WebViewClient will not run/display the Javascript <code>alert()</code> function, so many common XSS (Cross-site scripting) tests are rendered invalid and require modification. WebViews have their own cookie jar, without any access to the app&#39;s other cookies by default. To be clear, they also have no access to the native browser&#39;s cookies.</p>
<p>There are several steps involved in creating a functional WebView. They include passing in the URL or content to load, using the <code>loadUrl</code>, <code>loadData</code> or <code>loadDataWithBaseURL</code> methods. You&#39;ll want to ensure that the parameters to these methods are not derived from <strong>unsanitized</strong>, <strong>user-controlled data</strong>.</p>
<p>There are many settings which can potentially impact the security of an app&#39;s WebView(s), primarily by enabling/disabling functionality. These settings are configured through the <code>WebSettings</code> object, obtained via the <code>getSettings</code> method of a WebView. We&#39;ll discuss several of these settings in the following sections.</p>
<p>The general philosophy for WebViews is simply to limit the functionality to only that which is essential to meet business requirements, nothing more. By reducing the attack surface, we have fewer avenues of exploitation.</p>
<h3 id="-javascript-"><strong>Javascript</strong></h3>
<p>One easy way to avoid vulnerabilities is to disable JavaScript on WebViews which don&#39;t require it. JavaScript is enabled/disabled by using the <code>setJavaScriptEnabled</code> method and passing it the value, <strong>true</strong> or <strong>false</strong>.</p>
<p>While not always possible, disabling JavaScript for a WebView completely eliminates the possibility of XSS, which is a huge win from a security perspective. This step can potentially prevent the exploitation of other types of vulnerabilities which rely on JavaScript as well.</p>
<h3 id="-javascript-bridge-"><strong>Javascript Bridge</strong></h3>
<p>The JavaScript &quot;Bridge&quot; functionality is a way to <strong>inject Java objects into a WebView</strong> by making them accessible to JavaScript. In Android version 4.1 and earlier, all public methods in the class passed to <code>addJavascriptInterface</code> were automatically available to the JavaScript in a WebView.</p>
<p>Unfortunately, this would allow malicious JavaScript, loaded into a WebView (with the bridge enabled), to potentially access protected device functionality and bypass the WebView&#39;s <strong>Same Origin Policy</strong>.</p>
<p>Recognizing the potential for abuse, this was changed in later versions. In Android 4.2 and later, methods must be annotated with <code>@JavascriptInterface</code> in order to be accessible to the Javascript running in the WebView, provided the <code>targetSdkVersion</code> is set to 17 or higher as well, in the <code>AndroidManifest.xml</code>.</p>
<h3 id="-content-provider-access-"><strong>Content Provider Access</strong></h3>
<p>WebViews can be allowed to access Content Providers via <code>content://</code> URLs by passing true to the <code>setAllowContentAccess</code> function. This can pose a security risk if the data in the Content Provider is sensitive and the WebView loads malicious content, or if an attacker can control the <code>content://</code> URL, causing malicious data to be loaded into the WebView.</p>
<p>Passing <strong>false</strong> to set <code>AllowContentAccess</code>, prevents the WebView from opening <code>content://</code> URLs, eliminating the chance for exploitation. If access must be allowed, then it is critical to ensure the <code>content://</code> URL is not unsafely influenced by attacker controlled input.</p>
<h3 id="-file-system-access-"><strong>File System Access</strong></h3>
<p>Local files within the app, can be accessed via <code>file://</code> URLs by default. This could potentially allow the loading of malicious data into a WebView. If the attacker can influence the URL in some way. Depending on the context from which the request is made, there are multiple settings which can disable the WebView&#39;s ability to access files.</p>
<p>Passing <strong>false</strong> to <code>setAllowFileAccess</code> prevents access to the filesystem, with the exceptions of assets and resources via <code>file:///android_asset</code> and <code>file:///android_res</code>. These paths only should be used for non-sensitive data, such as images, if the app is constructed properly, this should generally be safe.</p>
<p>There are two additional related methods which can control the ability for a WebView to access <code>file://</code> URLs: </p>
<ul>
<li><code>setAllowFileAccessFromFileURLs</code> </li>
<li><code>setAllowUniversalAccessFromFileURLs</code></li>
</ul>
<p>Both methods take a single Boolean argument.</p>
<p>If the <code>getter</code> method (corresponding to the setter methods above) for <code>getAllowUniversalAccessFromFileURLs</code> returns true, the <code>getAllowFileAccessFromFileURLs</code> method&#39;s return value is ignored.</p>
<p>In Android 4.0.3 and below, the default returned value of true, is unsafe for <code>getAllowFileAccessFromFileURLs</code>. This is because it allows malicious JavaScript loaded in a WebView, in a file URL context, to access any files from the filesystem available via a <code>file://</code> URL. To be exploitable, an attacker would need to control which file is loaded in the WebView and its contents.</p>
<p>The <code>setAllowUniversalAccessFromFileURLs</code> method controls whether JavaScript, running in a <code>file://</code> URL context, can access content from any origin. The default setting value of true, for Android 4.0.3 and below, is unsafe. Because it would allow an attacker who controls a file loaded in the WebView to access content from any other domain loaded.</p>
<h3 id="-owasp-top-10-"><strong>OWASP Top 10</strong></h3>
<p>OWASP (Open Web Application Security Project) is an organization devoted to sharing information on application security. As part ofthis effort, they publish frequent ranked lists of most commonly found vulnerability classes.</p>
<p>While they do have a Mobile Top 10 list as well, we wanted to stress the importance of the Web Top 10, where WebViews are concerned.</p>
<p>Since WebViews are essentially browsers themselves, they suffer from all the client-side security issues as browsers that run as independent apps. In particular, you need to be mindful of Cross-site Scripting issues (XSS) and Cross-site Request Forgery (CSRF).</p>
<p>In addition to the specific configuration options we mentioned previously, there are some other considerations regarding XSS in apps. The first, is that by default, WebViews have their own cookie storage, separate from the rest of the application. Unless a developer modifies this, an XSS will not have access to the cookies used by the other parts of the app.</p>
<p>As a developer, you may also want to store local HTML templates, which can be accessed from <code>file://</code> URLs, rather than loading everything remotely. Not only does this speed up the app, but it changes the origin in terms of the Same Origin Policy for Javascript, limiting the potential damage an XSS may cause.</p>
<p>On a side note, if you do opt to use local HTML templates, you should create a means to update them dynamically (without the user having to download an updated app version). This allows you to have the client automatically request a new copy of the template, in case there is a vulnerability discovered.</p>
<h2 id="-conclusion-"><strong>Conclusion</strong></h2>
<p>We have covered a lot of important material in this section. Hopefully, you&#39;re not feeling too overwhelmed at this point. If so, take some time to re-read any sections that are unclear. <strong>This section is the core to your understanding of how Android applications function</strong>. Once you feel you have a good grasp on the topics discussed, you&#39;ll be ready to build on the knowledge you&#39;ve acquired so far.</p>
<hr>
<h1 id="-network-traffic-"><strong>Network Traffic</strong></h1>
<p>Mobile devices are unique in how they use networks. They are almost exclusively wireless and are often bouncing between cellular and Wi-Fi networks. To lower cellular data traffic, some cellular carriers provide Wi-Fi hotspots for their customers. Bad guys know this and will often set up fake Wi-Fi networks, tricking the devices into connecting.</p>
<p>Also, people will frequently connect to public Wi-Fi networks, such as at coffee shops, often putting them network-adjacent to attackers. To protect themselves, it is critical that devices always use secure network communication.</p>
<h2 id="-tls-usage-"><strong>TLS Usage</strong></h2>
<p>It cannot be stressed enough that virtually all requests sent from a mobile app should be using encryption. This is typically HTTPS (HTTP over TLS). Put another way, there are no real reasons not to encrypt. Sometimes you will hear people say that there are performance impacts either on the client or server sides, which limit full adoption.</p>
<p>The truth is, if you research the subject, you’ll find that most objections are not well founded, but based on outdated information or simply a result of poor design or implementation.</p>
<p>First of all, unlike desktops, all mobile devices consist of relatively new hardware, capable of handling the computation required for strong encryption algorithms. This eliminates much of the performance concerns on the client-side.</p>
<p>Secondly, the network overhead and server-side latencies are not substantial, despite what you may hear. Facebook, Google and many other large companies have documented their success and strategies for converting all of their traffic to TLS, so it is possible, at any scale.</p>
<h2 id="-certificate-validation-"><strong>Certificate Validation</strong></h2>
<p>Good cryptography, usually provides 3 things: <strong>confidentiality</strong>, <strong>integrity</strong> and <strong>authenticity</strong>. When most people think about TLS, they automatically, and usually exclusively, think about the confidentiality offered by encryption. What often gets overlooked is the authenticity component, provided by <strong>x.509</strong> certificates.</p>
<p>Basically, x.509 certificates verify who is actually performing the encryption. If you think about it, little would be gained by allowing an attacker to encrypt your data, since they would then be able to unencrypt (decrypt) it as well.</p>
<p>At a high level, organizations have certificates created for them. This is done to establish their digital identity and prevent impostors, including attackers from attempting to perform <strong>Man-in-the-Middle</strong> attacks.</p>
<p>Certificates are created by generating a public/private key pair, then sending the public key to a <strong>Certificate Authority</strong> (aka CA), along with information about the offline identity of the requestor, and the sites and/or domains to be protected, in what is known as a Certificate Signing Request (aka <strong>CSR</strong>).</p>
<p>It is up to the CA to properly verify the real-world identity of the person requesting the signing and that they should be authorized to represent the digital identity referred to in the CSR. For TLS purposes, the digital identity being validated by the certificate would be in the form of one or more DNS hostnames.</p>
<p>Once the signing process is complete and the requestor receives the signed certificate, they can begin to present the certificate to software clients requesting verification of their identity.</p>
<p>The CAs themselves act as a “trustworthy” third party, much like a real-life notary. That being said, not all CAs are trusted equally, for various reasons. Every piece of software, that is responsible for certificate validation, decides for itself which authorities it wants to trust. A large percentage of CAs are trusted by default by most software, for the convenience of the consumer.</p>
<p>When a piece of TLS client software needs to validate the certificate it received is authentic, a few things must be verified. One is that the identity stated in the certificate matches the DNS hostname requested by the network client. This can be a one-to-one, one-of-many or a wildcard match.</p>
<p>The hostname is checked against the Subject field&#39;s <strong>Common Name</strong> attribute or the <strong>Subject Alternative Name</strong> field in the x.509 certificate. If it matches, the connection should proceed, otherwise an error should be thrown and ideally no further communication should occur. In a browser, a mismatched name usually results in a red or broken padlock icon.</p>
<p>The second major component of certificate validation is to verify that the certificate was <strong>properly signed</strong> by CA in the software&#39;s trusted Certificate Authority list. When apps receive a certificate, they need to verify the signature using the CA&#39;s public key. If it fails to verify properly, the client should return an error, and ideally all communication would cease.</p>
<p>Clearly, if just anyone could sign a certificate, for ay <code>www.google.com</code> and have your software accept it, there wouldn&#39;t be any value to signing it at all. There are additional validation steps including, verifying the certificate has not been revoked and is not expired.</p>
<p>If the certificate was revoked or expired, the expectation is again that the connection should not continue and the client should return an error. In the real-world, many organizations use domains in testing that don’t match the public domains their apps connect to and/or don’t have valid certificates on the testing servers.</p>
<p>Unfortunately, rather than creating a well-designed testing environment and using real certificates, many developers will simply configure their software to ignore the certificate warnings or not even check them. While this is fine for the development phase, without thorough quality and/or security testing, vulnerable apps like these end up on consumer devices.</p>
<p>To be clear, apps that fail to validate certificates properly will leave their users vulnerable to having their data stolen as it transits the network. In order to exploit these weaknesses, an attacker, somewhere on the network between the user and the site they’re trying to connect to, will usually return fake ARP or DNS responses. This causes the victim’s traffic to route to/through the attacker’s network. The attacker then would return the fraudulent certificate and subsequently be able to encrypt and decrypt the traffic.</p>
<p>In order to exploit the lack of hostname validation, the attacker needs to first have a CA trusted by the device, that signs a certificate generated by the attacker. Since they can specify any hostname in the CSR they send to the CA, the CA would have no reason to refuse signing it.</p>
<p>The attacker could theoretically register the domain <code>attacker.com</code>, prove that that they own it and the CA would rightfully sign the certificate. The other validation failure is even easier to exploit. If the CA is not validated, the attacker can make and sign their own certificate. Because there is no need to use a CA, and specifically no need to consider which CAs are trusted by the device, there is literally no barrier to exploiting this situation.</p>
<p>Detecting these vulnerabilities in Android applications is relatively straight-forward. If you are performing static code analysis, there are a few areas to focus on. In the following examples, you’ll see vulnerable design patterns frequently discussed by developers to disable certificate validation.</p>
<p>One example includes creating an <strong>X509TrustManager</strong>, which does not result in an exception for invalid certificates, due to the issuer (CA) not being trusted. The following slide shows an excerpt from just such an implementation.</p>
<p>Example of an insecure X509TrustManager:</p>
<pre><code class="lang-java">TrustManager[] trustAllCerts = <span class="hljs-keyword">new</span> TrustManager[] {
    <span class="hljs-keyword">new</span> X509TrustManager() {
        <span class="hljs-keyword">public</span> X509Certificate[] getAcceptedIssuers() {
            <span class="hljs-keyword">return</span> <span class="hljs-keyword">null</span>;
        }
    }
    <span class="hljs-meta">@Override</span>
    <span class="hljs-keyword">public</span> <span class="hljs-function"><span class="hljs-keyword">void</span> <span class="hljs-title">checkServerTrusted</span><span class="hljs-params">(X509Certificate[] arg0, String arg1)</span> <span class="hljs-keyword">throws</span> CertificateException </span>{
    <span class="hljs-comment">// Not implemented</span>
    }
</code></pre>
<p>A common way in which developers will configure their code to ignore the fact that the DNS hostname doesn’t match any of the allowed values on the certificates, is to create an insecure <code>HostNameVerifier</code>.</p>
<p>The following is an example of an insecure <code>HostNameVerifier</code> configuration:</p>
<pre><code class="lang-java"><span class="hljs-params">...</span>
SSLSocketFactory sf = <span class="hljs-literal">new</span> CustomSSLSocketFactory(trustStore);
sf.setHostnameVerifier(SSLSocketFactory.ALLOW_ALL_HOSTNAME_VERIFIER);
<span class="hljs-params">...</span>
</code></pre>
<p>Because there are several ways in which developers can write code which would result in improper certificate validation, it is sometimes more expedient to test a running app, rather than examining the code. One way this can be done is by using a proxy, such as <strong>BurpSuite</strong>, which allows you to modify the settings for certificates which are returned. You will learn more about how to configure a device to use a proxy and how to modify its settings in the next section.</p>
<h2 id="-proxy-configuration-"><strong>Proxy Configuration</strong></h2>
<p>Being able to monitor the network requests which come from an application is a critical part of understanding how it works. This understanding will greatly improve your ability to test the security of both the client and the server.</p>
<p>How you configure your device to use a proxy will vary from device to device. Some devices may not even allow you to manually configure a proxy at all. In this case you’d need to use actual Man-In-The-Middle type attacks (ARP or DNS response forging) to get the traffic to your proxy. Luckily, I’ve yet to encounter an Android device that prevented the setting of a proxy, so this should not be an issue for you.</p>
<p>In <strong>Burpsuite</strong>, clicking on the <strong>Proxy</strong> tab and then clicking the <strong>Options</strong> on the navigation bar below, you will see the following <em>Proxy Listener</em> configuration section.</p>
<blockquote>
<p>For the purpose of this section, we assume both your mobile device and computer running Burp Suite are on the same wireless network. We also assume that your mobile device can freely communicate with the computer running Burp Suite, without being blocked by firewalls or other network limitations.</p>
</blockquote>
<p>You’ll need to ensure that Burp Suite is listening on the actual wireless network (not just the loopback) interface. The port number is irrelevant, so long as it is not blocked, or in use. Keeping in mind that some operating systems may require admin/root privileges to open a reserved port.</p>
<p>To configure the proxy, click the row in the center, then click the <strong>Edit</strong> button. The <strong>Binding</strong> tab allows you to edit the port and interface(s) used by the listener.</p>
<p>The <strong>Certificate</strong> tab allows you to configure the certificates returned for HTTPS traffic. The default setting below, generates a new certificate, to match any requested domain(s) and is signed by Burp Suite’s built-in “Portswigger” CA.</p>
<p>Android devices can usually be configured to use the proxy by going to <strong>Settings &gt; Wi-Fi</strong> then long-tap your WLAN’s SSID until a menu appears. The last option on this menu will be <strong>Modify Network</strong>. Tapping this will bring up another screen, which will allow you to expand the <strong>Advanced options</strong> menu. From there, you’d expand the Proxy menu and select <strong>Manual</strong>. You would then need to specify the IP address or DNS hostname (of the computer running Burp Suite) in the Proxy <strong>hostname</strong> field, along with the correct port in the <strong>Proxy port</strong> field, corresponding to your Burp Suite’s <em>Proxy Listener</em> settings.</p>
<p>Once you’ve completed the proxy configuration, you can test it by navigating to a website using the device’s browser. If it is over plain-text HTTP, you should see the traffic in Burp Suite’s <em>Proxy &gt; HTTP history</em> window. Any HTTPS traffic you see would likely signal the app(s) generating the traffic have a security flaw. Can you guess what it is?</p>
<p>Remember, the CA used to sign the returned certificate, is the PortSwigger CA, which is unique to your Burp Suite installation, so it definitely hasn’t been pre-trusted by your device. This means any HTTPS traffic should fail, unless the app is not validating the CA signing the certificate.</p>
<p>Under normal circumstances, in order to intercept HTTPS traffic, you have to install the Portswigger CA certificate on your device. Different devices have different processes for installing a CA certificate and may take different certificate formats.</p>
<p>Generally, the process includes ensuring that the certificate format is correct or converting it, copying the certificate to the device and then installing it from local storage.</p>
<p>On the latest Android devices, certificates are installed to the device’s trust store (the list of trusted CAs) by navigating to <strong>Settings &gt; Security &gt; Install from storage</strong> then navigating the device’s file system and locating the certificate. Note that if the format is incorrect, it may not display and definitely won’t install.</p>
<p>Once properly installed, even properly secured HTTPS traffic should be visible in the proxy. For all apps unless they are implementing an additional layer of security, known as certificate pinning which will be explained in a later section.</p>
<blockquote>
<p>A major change in Android&#39;s network security is that from Android 7.0 onwards user-installed certificate authorities and those installed through Device Admin APIs are no longer trusted by default for apps targeting API Level 24+. This means that you may not be able to capture network traffic deriving from applications targeting API Level 24+, even with your proxy&#39;s certificate successfully installed in your device.</p>
</blockquote>
<p>To overcome this obstacle you will have to leverage another change in Android&#39;s network security, called <strong>Network Security Config</strong>. As Google states Network Security Config lets apps customize their network security settings in a safe, declarative configuration file without modifying app code. Using this configuration file you can trust a custom set of CAs instead of the platform default.</p>
<p>So in order to be able to capture traffic deriving from applications targeting API Level 24+, you should do the following:</p>
<ul>
<li>Decode the application using <code>apktool</code></li>
<li>Introduce a <code>network_security_config.xml</code> file at <code>res/xml</code> folder of the application</li>
<li>Add the self-signed or non-public CA certificate, in PEM or DER format, to <code>res/raw/name_of_your_choice</code> folder of the application</li>
<li>Repackage and sign the application</li>
</ul>
<p>We’ve shown by not installing the Portswigger CA certificate on your device, how you can test whether an app is properly validating the CA certificate. In order to test for the other common failure related to certificate validation, you can simply enter a domain name, other than the one you’re testing, in the Proxy Listener’s <strong>Generate a CA-signed certificate with a specific hostname</strong> field.</p>
<p>As an example, I would suggest entering something like <code>example.com</code>, then saving it. This ensures that it is technically a valid domain, but not one the app you’re testing is likely to be using.</p>
<p>While you have the incorrect domain in this field, any HTTPS traffic you see, for a domain, other than the one specified, is a result of the app failing to validate the hostname in the certificate. This is because, in this configuration, the certificate returned by Burp Suite specifies the Common Name (CN) as whatever you have specified in this field.</p>
<h2 id="-certificate-pinning-"><strong>Certificate Pinning</strong></h2>
<p>It is possible for multiple certificates to be issued for a domain simultaneously. It is also possible that these certificates could be issued from multiple certificate authorities. Certificate pinning is a mechanism by which an app can be configured to only trust one, or a set of, specific certificates, public keys and/or issuers.</p>
<p>Because of this, if an attacker compromises a legitimate certificate authority, they could potentially issue an unauthorized certificate for a domain that they wish to attack. While this is an extraordinary type of attack, it has happened before.</p>
<p>In Android apps, it is possible to limit the number of certificates your app will accept. By doing this, you hard-code the accepted certificates, public keys and/or issuers into your app.</p>
<p>In the cases of certificates or public keys, all the values necessary are known to you ahead of time. This is because they are part of what you generate and install on the servers which support your app. By pinning to a specific certificate or public key, you’re effectively saying that all other certificates or public keys will be refused, if offered during the TLS handshake process.</p>
<p>Even if a certificate authority was compromised, your app would not accept the unauthorized certificates or public keys as valid, since they would not have been “pre-approved”. This is because your app would only be trusting specific certificates or public keys.</p>
<p>This also allows you to use self-signed certificates in your apps, bypassing the use of external CAs altogether. A well-known security expert, by the name of Moxie Marlinspike, describes the details here. There are some downsides to pinning however, generally associated with key/certificate management and testing which need to be considered.</p>
<p>Because of the way application updates work in Android, should your private key ever become compromised, it would be difficult to update all of your clients securely. In the event of a private key compromise, you’d need to rotate the corresponding certificate and public key on your servers. This would break the apps pinning to them, causing users to fail to connect.</p>
<p>One strategy to avoid this issue would be to simultaneously allow a list of public keys or certificates in the app. Then, in the event of compromise, the update would be to remove the compromised key from the list. The key to this strategy is to ensure your backup key(s) or certificate(s) are extremely well protected when not in use. Ideally, this would include storing them off-line in an air-gapped system until they are needed.</p>
<p>Another similar strategy is to only trust a single CA (or small number of them). This way the app is protected from the compromise of all CAs, other than the one you normally issue certificates from (and therefore have configured the app to trust). While not as secure overall, it allows for a much simpler management of the keys and eliminates concerns over other CAs that are breached or less trustworthy.</p>
<h2 id="-overcoming-certificate-pinning-"><strong>Overcoming Certificate Pinning</strong></h2>
<p>Clearly, if an app is implementing certificate pinning properly, you ordinarily would not be able to intercept network requests in a testing proxy, such as Burp Suite, unless you had a certificate permitted by the application. While this is in essence, the intention of pinning, you’d still usually want to have the ability to assess the security of an application.</p>
<p>Distributing valid certificates and keys to all the people in an organization who need to proxy the app only increases the likelihood of then being compromised. Additionally, if you’re testing third-party apps, it is very unlikely that they would want to give you their keys and certificates.</p>
<p>Luckily, there are ways to disable certificate pinning, when required for testing. For the code you control, you could simply develop the app in such a way as to disable the pinning through a setting, potentially hidden for consumers and “on” by default. Then you could disable/enable pinning at the press of a button.</p>
<p>Otherwise, you can disable certificate pinning by reverse engineering the application and patching the class responsible for the certificate validation procedure. The actual patching is going to be executed at <code>.smali</code> files level. Then, all you have to do is repackage the application and install it in your device.</p>
<hr>
<h1 id="-device-and-data-security-"><strong>Device and Data Security</strong></h1>
<p>How securely data is stored on mobile devices has become a hot topic lately. In fact, Insecure Data Storage is the ninth most common vulnerability, according to the OWASP Mobile Top Ten. With desktop computers, it was generally held that if you allowed someone unrestricted access to your computer, it was no longer your computer.</p>
<p>This was because there were/are so many ways in which a local attacker could completely compromise the system. Because mobile devices are more prone to being lost, stolen or seized, it is widely accepted that data should remain secure, even when the owner loses physical possession.</p>
<p>As a general rule, the best way to secure data in a mobile app is simply not to retain it at all. For security reasons, as soon as data is no longer needed, it should be removed from a device.</p>
<p>One example would be to clear the local data whenever the app is closed or a user signs out. In practice however, this often comes into conflict with a developer’s desire for lessening network requests to improve application performance. When sensitive data is stored on a mobile device, it is recommended that encryption be used to prevent accidental disclosure.</p>
<p>Encryption comes with a performance impact as well and raises the question of, if and how to store the de/encryption key securely. Lastly, it is important that whenever an app does store data locally, access to it is protected appropriately, so that it cannot be stolen when the app is in use. In this section, we will cover the common data storage options and potential pitfalls associated with each.</p>
<h3 id="-internal-storage-"><strong>Internal Storage</strong></h3>
<p>The Android file system is configured much like any Linux system, but with an additional directory structure for Android. Conceptually, it is broken down into two major storage areas, <strong>internal</strong> and <strong>external</strong> storage.</p>
<p>By default, apps are installed in internal storage, in a directory that is not accessible directly by other apps. This restriction is enforced by Linux file permissions, only granting access to the app’s own UID. Normally apps can be found in the <code>/data/app</code> directory, in a subdirectory corresponding with the app name.</p>
<p>System apps are installed in either <code>/system/app</code> or <code>/system/priv-app</code>. The latter being mounted as read-only, for particularly sensitive system apps. By default, there is no means for you to navigate into any of these directories, unless you are using a rooted device or an emulator. If you are using a rooted device or emulator, you can view all the file contents using either a root-aware file browsing app, or ADB, the Android Debugger. We’ll discuss ADB in more detail, in a later chapter.</p>
<p>Files created on internal storage are accessible only to the app itself. Prior to API 17, when creating a file, or using <strong>sharedPreferences</strong>, the developer had a few different options to set the context of the file:</p>
<ul>
<li><strong>MODE_PRIVATE</strong>: default mode where the created file can only be accessed by the calling application or by an application with the same user ID</li>
<li><strong>MODE_WORLD_READABLE</strong> (deprecated): all other applications have read access to the file</li>
<li><strong>MODE_WORLD_WRITEABLE</strong> (deprecated): all other applications have write access to the file</li>
<li><strong>MODE_APPEND</strong>: if the file already exists, write data to the end<h3 id="-external-storage-"><strong>External Storage</strong></h3>
</li>
</ul>
<p>Many Android devices come with removable SD cards. This allows the owners to transfer files between devices or to a personal computer. For devices which do not have a physical SD card, the operating system emulates one, presumably for compatibility reasons. Either way, the real or pseudo external storage is usually located at <code>/sdcard</code> or <code>/mnt/sdcard</code>.</p>
<p>Prior to Android 1, all files on SD cards were world-writable and prior to 4.1 they were world-readable. In Android versions 1 through 4.3, in order to write files to external storage, an app needed the <code>WRITE_EXTERNAL_STORAGE</code> permission.</p>
<p>Clearly, these provided several opportunities for an attacker. The most obvious vulnerability is information leakage, especially if an application stores sensitive information on the world-readable SD card. Alternatively, a malicious app could destroy a victim app’s data, or write malicious data to a file. If an app doesn’t properly validate the data in a world-writable file, it becomes a vector for injection attacks.</p>
<p>Starting with Android 4.4, the SD card has a directory structure, which limits access from an app, to the directory which is created specifically for that app. This prevents a malicious application from gaining read or write access to another app’s files. For other Android versions, care needs to be taken to not place sensitive data in these files and to properly validate data read from them.</p>
<h2 id="-third-party-code-"><strong>Third-Party Code</strong></h2>
<h3 id="-sdk-"><strong>SDK</strong></h3>
<p>Software Development Kits or SDKs are generally classes or <code>.jar</code> files, which make it easier for developers to interface with code written by third-parties. These files are directly included into other apps which use them.</p>
<p>One popular example is the <strong>Facebook SDK</strong>, which among other things, allows apps to implement a “Login with Facebook” functionality. This allows Facebook to guide third-parties into integrating with them the way Facebook prefers. This helps grow their ecosystem and can give them better insight into how their APIs are being used and by whom.</p>
<p>While a developer could implement the same code from scratch, they would have to either get the full documentation of the app they want to work with, or reverse engineer it. Additionally, if a developer creates code to integrate with another app, without the use of an SDK, there is no guarantee that the other app will continue to be compatible with future releases.</p>
<p>The ease of use of SDKs can come with a cost to security, since developers rarely question the security of SDKs, from a “reputable” source. When reviewing applications, it is important to understand which SDKs are included in them and what additional functionalities they offer or known vulnerabilities which may be present. The <strong>Baidu</strong> and <strong>Dropbox</strong> SDKs are both examples of where SDKs introduced vulnerabilities into apps that were using them.</p>
<h3 id="-libraries-"><strong>Libraries</strong></h3>
<p>The use of third-party libraries is very common, if not ubiquitous in applications. In fact, there are estimates that apps are 80-90% reused code. In much the same way SDKs can introduce vulnerabilities, so can third-party libraries.</p>
<p>It is therefore important that organizations and testers track the use of these libraries in their applications. Furthermore, it is important to subscribe to mailing lists and bug trackers for these libraries, to keep up-to-date for any newly discovered issues. It is usually recommended that these libraries be updated regularly, but often developers are reluctant to do so, for fear of breaking functionality.</p>
<p>When testing applications, it is highly recommended that an inventory of all third-party libraries be completed and at a minimum, an Internet search should be performed to look for any known security issues in those libraries. Some examples of vulnerabilities introduced by third-party libraries, include the well-known <strong>Heartbleed</strong> bug and several which were found in the <strong>Apache Cordova</strong> framework.</p>
<hr>
<h1 id="-static-code-analysis-"><strong>Static Code Analysis</strong></h1>
<p>Static Code Analysis is a process for programmatically examining the application code on the disk, rather than while it is running. There are numerous, scientifically rigorous approaches to the problems of validating that code is free of errors.</p>
<p>Even so, it is widely accepted that it is unlikely that any method of programmatic inspection will find all possible bugs or vulnerabilities, partly because it is not possible to test all possible inputs.</p>
<p>If you think of software as a flow of calls from certain entry points through a series of functions to an eventual termination, it is possible to verify that you have partially exercised each route to obtain full “code coverage”.</p>
<p>Static code analysis is simply a process of mapping the <strong>sources</strong> of potentially attacker controlled input. This is done through a series of intermediate processing steps to determine whether the input eventually, even conditionally, encounters a sensitive function or <strong>sink</strong>.</p>
<p>The imaginary line, between the user (or other apps on the device) and the internal portions of the application, is what is referred to in threat modeling, as a “trust boundary”. Inside the application, all of the components trust one another, because they were written by the same author. The user (or attacker) supplied data instead, should not be trusted to be safe.</p>
<p>If the intermediate processing does not sufficiently modify or constrain the input, then it is likely a vulnerability. The trick in application security is to fully identify all the sources, determine what all the sinks are, and which intermediate steps will properly sanitize the inputs to prevent a vulnerability.</p>
<p>To identify all the dangerous sources, you will often begin by creating a threat model for the application, determining where the trust boundary or boundaries are. For Android apps, this starts with enumerating the insufficiently protected exported components and tracking <strong>Intents</strong> and <strong>Extras</strong> through the app.</p>
<p>The <code>AndroidManifest.xml</code> does the following:</p>
<ul>
<li>defines the <strong>Intents</strong> and <strong>Extras</strong> that will be accepted as input by our apps, from other apps on the device.</li>
<li>defines the behavior of the <strong>WebViews</strong>, <strong>file storage</strong> and which <strong>components</strong> are exposed to attack.</li>
</ul>
<p>It is clearly fundamental in defining the majority of what we would consider trust boundaries.</p>
<p>To be clear, there can be multiple trust boundaries in an application. In addition to <strong>Intents</strong> and <strong>Extras</strong>, the most common source of untrusted input in an Android application is the active content rendered in WebViews. The active content is usually in the form of JavaScript or Flash. If this active content is loaded from a third-party site, or from a trusted site, but over an unencrypted transport layer, we have to consider it as an untrusted and potentially malicious input.</p>
<h2 id="-sql-injection-"><strong>SQL Injection</strong></h2>
<p>SQL injection is a common and well-known vulnerability. It follows the same source-sink dynamic as our previous example, but in this case the sink is the query itself.</p>
<p>Whenever a query takes user-controllable input, the potential for exploitation exists if the queries are not constructed properly and/or if the input is not properly sanitized. This vulnerability arises from the data entered into a query being able to alter the query itself, even potentially adding additional queries.</p>
<p>Traditionally, defending against these types of attacks involves sanitizing data to remove special characters and/or creating pre-compiled queries, known as parameterized queries.</p>
<p>In an SQL query, you generally have two major sections, the <strong>projection</strong> and the <strong>selection</strong>. The <strong>projection</strong> is where the <em>columns</em> are chosen in the query and the <strong>selection</strong> is where the <em>rows</em> are chosen.</p>
<pre><code class="lang-sql"><span class="hljs-built_in">SELECT</span> * FROM Users <span class="hljs-built_in">WHERE</span> Name = foo <span class="hljs-keyword">AND</span> Pass = <span class="hljs-built_in">bar</span>;
<span class="hljs-meta"># * -&gt; projection</span>
<span class="hljs-meta"># foo, bar -&gt; selection</span>
</code></pre>
<p>If the developer constructs the selection string with user-controlled input, despite the method being parameterized, it will be vulnerable to SQL injection. Parameterized queries (aka prepared statements) are usually easy to spot because their structure, specifically, utilizes question mark placeholders.</p>
<pre><code class="lang-java">String custname = request.getParameter(<span class="hljs-string">"customerName"</span>)<span class="hljs-comment">;</span>
String query = <span class="hljs-string">"SELECT account_balance FROM user_data WHERE user_name = ? "</span><span class="hljs-comment">;</span>
PreparedStatement pstmt = connection.prepareStatement( query )<span class="hljs-comment">;</span>
pstmt.setString( <span class="hljs-number">1</span>, custname)<span class="hljs-comment">;</span>
ResultSet results = pstmt.executeQuery()<span class="hljs-comment">;</span>
</code></pre>
<p>Parameterized queries basically prevent SQL injection by creating and compiling the query first, then inserting the parameters. This way, the query logic cannot be broken.</p>
<p><em>Vulnerable Flow - Directly Using User Input</em></p>
<ul>
<li>User supplied input injected → Query compiled, including input → Query executed</li>
</ul>
<p><em>Vulnerable Flow - Partial Parameterization</em></p>
<ul>
<li>Partial query compiled → User supplied input injected → Query executed</li>
</ul>
<p><em>Safe Flow - Full Parameterization</em></p>
<ul>
<li>Full query compiled → User supplied input injected → Query executed</li>
</ul>
<p>Suppose we have the following query used to validate a username and password:</p>
<pre><code class="lang-sql">"<span class="hljs-keyword">SELECT</span> * <span class="hljs-keyword">FROM</span> <span class="hljs-keyword">Users</span> <span class="hljs-keyword">WHERE</span> <span class="hljs-keyword">Name</span> = <span class="hljs-string">'" + uName + "'</span> <span class="hljs-keyword">AND</span> Pass = <span class="hljs-string">'" + uPass + " '</span> <span class="hljs-string">";</span>
</code></pre>
<p>If the <code>uName</code> or <code>uPass</code> variables are derived from, or influenced by, user input, the query could be vulnerable. An attacker might input something like: <code>admin&#39;--</code>.</p>
<p>This would cause the query to look like:</p>
<pre><code class="lang-sql">"<span class="hljs-keyword">SELECT</span> * <span class="hljs-keyword">FROM</span> <span class="hljs-keyword">Users</span> <span class="hljs-keyword">WHERE</span> <span class="hljs-keyword">Name</span> =<span class="hljs-string">'admin'</span><span class="hljs-comment">-- ' AND Pass ='" + uPass + "' ";</span>
</code></pre>
<p>Since the <code>--</code> causes everything from that point to be considered as a comment, this effectively results in:</p>
<pre><code class="lang-sql"><span class="hljs-keyword">SELECT</span> * <span class="hljs-keyword">FROM</span> <span class="hljs-keyword">Users</span> <span class="hljs-keyword">WHERE</span> <span class="hljs-keyword">Name</span> =<span class="hljs-string">'admin'</span>;
</code></pre>
<p>This would cause the user lookup query to ignore the password portion of the query and allow the attacker to login as the <em>admin</em> user without even knowing the password.</p>
<p>With (fully) parameterized queries, our previous attack <strong>fails</strong> to match any records, because no user <code>admin&#39;--</code> exists:</p>
<pre><code class="lang-sql">"<span class="hljs-keyword">SELECT</span> * <span class="hljs-keyword">FROM</span> <span class="hljs-keyword">Users</span> <span class="hljs-keyword">WHERE</span> <span class="hljs-keyword">Name</span> = <span class="hljs-string">' " admin'</span><span class="hljs-comment">-- " ' AND Pass =' " " ' ";</span>
</code></pre>
<p>There are many subtleties to SQL injection, which are beyond the scope of this course, so we recommend diving into sources such as OWASP documentation for a more thorough understanding.</p>
<p>A <strong>ContentResolver</strong> is the object, which acts on the incoming URI received by an application and connects the &quot;CRUD&quot; (create, retrieve, update, and delete) functions to the underlying ContentProvider. All of these operations are available via specific <em>content</em> URIs.</p>
<p>The content URI is broken down as follows:</p>
<pre><code><span class="hljs-symbol">content:</span>//<span class="hljs-keyword">com</span>.example.provider.CredentialProvider/credentials/<span class="hljs-number">1</span>
</code></pre><ul>
<li><strong>Scheme</strong>: <code>content://</code></li>
<li><strong>Authorities</strong>: <code>com.example.provider.CredentialProvider</code></li>
<li><strong>Path</strong> (<em>Table</em>): <code>/credentials</code></li>
<li><strong>Index</strong>: <code>/1</code></li>
</ul>
<p>It can be time consuming to ensure you enumerate all the possible content URI in an app. One shortcut is to extract the <code>classes.dex</code> file from the built APK and search within it for them.</p>
<p>In the example below, the <strong>strings</strong> command, (which extracts printable strings from binary files), and the grep command, (which allows you to search for a specific series of characters), are combined via the | operator to locate strings containing <code>content://</code> which are most likely our content URI(s).</p>
<pre><code class="lang-bash">strings classes.dex | <span class="hljs-keyword">grep</span> <span class="hljs-string">"content://"</span>
# Mconten<span class="hljs-variable">t:</span>//<span class="hljs-keyword">com</span>.example.provider.CredentialProvider/credentials
</code></pre>
<p>This vulnerable Content Provider should be exported (implicitly) and third-party apps require no specific permissions to interact with it, as the example of the manifest file shows below.</p>
<pre><code class="lang-xml"><span class="hljs-tag">&lt;<span class="hljs-name">provider</span> <span class="hljs-attr">android:name</span>=<span class="hljs-string">".CredentialProvider"</span>
    <span class="hljs-attr">android:authorities</span>=<span class="hljs-string">"com.example.provider.CredentialProvider"</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">provider</span>&gt;</span>
</code></pre>
<p>In the real world, these attacks are commonly used to dump databases to obtain their secret data. Generally, this is done by finding ways to append additional queries to the original. For our purposes, it is important to realize that these vulnerabilities can manifest themselves in the Content Providers in Android applications.</p>
<h2 id="-directory-traversal-"><strong>Directory Traversal</strong></h2>
<p>Another type of vulnerability that affects content providers (as well as services) is the <strong>directory traversal</strong> vulnerability.</p>
<p>If the app allows file reads without specifying permissions, other apps can exploit this vulnerability to read data from the vulnerable app.</p>
<p>An app affected by this vulnerability was the Adobe Reader app. The app exposed a content provider (<code>com.adobe.reader.fileprovider</code>) that allowed other apps to read files. Since the input is not properly sanitized and the method has no permissions set, a malicious user might be able to read files by exploiting a directory traversal:</p>
<pre><code><span class="hljs-symbol">content:</span>//<span class="hljs-keyword">com</span>.adobe.reader.fileprovider/../../file_to_read
</code></pre><h2 id="-vulnerable-activities-"><strong>Vulnerable Activities</strong></h2>
<p>Activities are the visual elements, or screens, that you see when interacting with Android applications as a user. Activities can be vulnerable to attack when they allow access to user data without proper authentication. Meaningful examples of this are rare, since this requires physical access to an unlocked, or unlockable device.</p>
<p>When access is allowed to user data without proper authentication, generally, you’d be able to simply pull the data directly from the device anyway. When it does occur, this vulnerability can be mitigated by ensuring that Activities are not exported unnecessarily and by implementing encryption for data, and decrypting only after authentication.</p>
<p>Within the normal expected flow of a vulnerable application, you may see a <strong>Login</strong> screen. The intention being that you&#39;d need to enter your credentials, before accessing any information saved in the application. When not protected properly however, you may be able to bypass the login requirement.</p>
<p>The example below, from an <code>AndroidManifest.xml</code> file, shows an Activity that is exported, with no <code>android:permission</code> set. This permits any application to send an intent to this application and spawn this activity. If it contained sensitive information, an attacker could be able to bypass the app&#39;s authentication and view it.</p>
<pre><code class="lang-xml"><span class="hljs-tag">&lt;<span class="hljs-name">activity</span> <span class="hljs-attr">android:name</span>=<span class="hljs-string">"com.example.insecureactivities.SecretActivity"</span> <span class="hljs-attr">android:label</span>=<span class="hljs-string">"secret"</span> <span class="hljs-attr">android:exported</span>=<span class="hljs-string">"true"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">intent-filter</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">action</span> <span class="hljs-attr">android:name</span>=<span class="hljs-string">"android.example.insecureactivities.bypass"</span>/&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">category</span> <span class="hljs-attr">android:name</span>=<span class="hljs-string">"android.intent.category.DEFAULT"</span>/&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">intent-filter</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">activity</span>&gt;</span>
</code></pre>
<p><activity android:name="com.elearnsecurity.insecureactivities.SecretActivity"
android:label="secret" android:exported="true"></p>
<p><intent-filter>
    <action android:name="android.elearnsecurity.insecureactivities.bypass"/>
    <category android:name="android.intent.category.DEFAULT"/>
</intent-filter>
</activity>
In order for an exploitable condition to arise for an activity which returns data via the <code>setResult</code> method, the Activity would need to be exported without permission requirements being specified. Such as the example below.</p>
<pre><code class="lang-xml"><span class="hljs-tag">&lt;<span class="hljs-name">activity</span> <span class="hljs-attr">android:name</span>=<span class="hljs-string">"com.example.insecureactivities.LeakyActivity"</span>
<span class="hljs-attr">android:label</span>=<span class="hljs-string">"leaky"</span> <span class="hljs-attr">android:exported</span>=<span class="hljs-string">"true"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">intent-filter</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">action</span> <span class="hljs-attr">android:name</span>=<span class="hljs-string">"android.example.insecureactivities.leaky"</span>/&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">category</span> <span class="hljs-attr">android:name</span>=<span class="hljs-string">"android.intent.category.DEFAULT"</span>/&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">intent-filter</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">activity</span>&gt;</span>
</code></pre>
<p>This class corresponds with the exported and unprotected Activity from the manifest show previously. In this example, you can see the call to the <code>setResult</code> method towards the bottom.</p>
<pre><code class="lang-java">public <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">LeakyActivity</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Activity</span> </span>{
    <span class="hljs-type">EditText</span> editTextMessage;
    <span class="hljs-meta">@Override</span>
    <span class="hljs-keyword">protected</span> void onCreate(<span class="hljs-type">Bundle</span> savedInstanceState)
    {
        <span class="hljs-keyword">super</span>.onCreate(savedInstanceState);
        setContentView(<span class="hljs-type">R</span>.layout.layout2);
        <span class="hljs-comment">// Get the Reference of Edit Text</span>
        <span class="hljs-comment">// get the Entered message</span>
        <span class="hljs-type">String</span> secret = <span class="hljs-string">"This is a super secret string"</span>;
        <span class="hljs-type">Intent</span> intentMessage = <span class="hljs-keyword">new</span> <span class="hljs-type">Intent</span>();

        <span class="hljs-comment">// put the message to return as result in Intent</span>
        intentMessage.putExtra(<span class="hljs-string">"SECRET"</span>, secret);
        <span class="hljs-comment">// Set The Result in Intent</span>
        setResult(<span class="hljs-number">2</span>, intentMessage);
        <span class="hljs-comment">//Log.v("SUCCESS", intentMessage.getStringExtra("SECRET"));</span>
        <span class="hljs-comment">// finish The activity</span>
        finish();
    }
}
</code></pre>
<p>This will return an <em>Intent</em> named <em>intentMessage</em>, which contains the <em>Extra</em>, whose value is “This is a super-secret string”. Any app sending the appropriate Intent to this vulnerable app would be able to receive that string, leaking sensitive information.</p>
<h2 id="-vulnerable-receivers-"><strong>Vulnerable Receivers</strong></h2>
<p>The intention of Receivers is to receive data. Vulnerabilities arise when they are inadvertently exported, lack permissions, expose sensitive internal functionality and/or leak sensitive data.</p>
<p>In the example below, we see that the receiver is exported without any permissions being required.</p>
<pre><code class="lang-xml"><span class="hljs-tag">&lt;<span class="hljs-name">receiver</span> <span class="hljs-attr">android:name</span>=<span class="hljs-string">".VulnerableReceiver"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">intent-filter</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">action</span> <span class="hljs-attr">android:name</span>=<span class="hljs-string">"com.example.vulnerablereceiver.CHANGEPW"</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">intent-filter</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">receiver</span>&gt;</span>
</code></pre>
<p>After locating the corresponding class, we see this receiver extracts an <em>Extra</em>, named <em>PASSWORD</em>, for the Intent received. It then sends an Intent to <em>MainActivity</em>, passing the received password along as an <em>Extra</em>.</p>
<pre><code class="lang-java"><span class="hljs-keyword">public</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">VulnerableReceiver</span> <span class="hljs-keyword"><span class="hljs-keyword">extends</span> <span class="hljs-type">BroadcastReceiver</span></span> </span>{
    @Override
    <span class="hljs-keyword">public</span> void onReceive(Context context, Intent intent) {
        <span class="hljs-keyword">String</span> <span class="hljs-keyword">new</span><span class="hljs-type">pass</span> = intent.getStringExtra(<span class="hljs-string">"PASSWORD"</span>);
        Log.v(<span class="hljs-string">"RECEIVED:"</span>,<span class="hljs-keyword">new</span><span class="hljs-type">pass</span>);
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">new</span><span class="hljs-type">pass</span>!=<span class="hljs-literal">null</span> &amp;&amp; !<span class="hljs-keyword">new</span><span class="hljs-type">pass</span>.isEmpty()){
            Intent chpw = <span class="hljs-keyword">new</span> <span class="hljs-type">Intent</span>(context,MainActivity.class);
            chpw.setFlags(chpw.FLAG_ACTIVITY_NEW_TASK);
            chpw.putExtra(<span class="hljs-string">"NEWPASS"</span>,<span class="hljs-keyword">new</span><span class="hljs-type">pass</span>);
            context.startActivity(chpw);
            Log.v(<span class="hljs-string">"CHANGED"</span>,<span class="hljs-string">"Password changed to "</span> + <span class="hljs-keyword">new</span><span class="hljs-type">pass</span>);
        }
    }
}
</code></pre>
<p>In the <em>MainActivity</em> class, we see that there is already a long random password generated. However, looking further down the class, we see if an Intent is received with an <em>Extra</em>, the <em>password</em> is reset.</p>
<pre><code class="lang-java">SecureRandom random = <span class="hljs-keyword">new</span> <span class="hljs-type">SecureRandom</span>();
<span class="hljs-keyword">String</span> password = <span class="hljs-keyword">new</span> <span class="hljs-type">BigInteger</span>(<span class="hljs-number">130</span>, random).toString(<span class="hljs-number">32</span>);
protected void onCreate(Bundle savedInstanceState) {
    <span class="hljs-keyword">super</span>.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);
    Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
    setSupportActionBar(toolbar);

    Log.v(<span class="hljs-string">"PASSWORD"</span>, password);
    <span class="hljs-keyword">String</span> <span class="hljs-keyword">new</span><span class="hljs-type">Password</span> = getIntent().getStringExtra(<span class="hljs-string">"NEWPASS"</span>);
    <span class="hljs-keyword">if</span>(<span class="hljs-keyword">new</span><span class="hljs-type">Password</span> != <span class="hljs-literal">null</span> &amp;&amp; !<span class="hljs-keyword">new</span><span class="hljs-type">Password</span>.isEmpty()){
        password = <span class="hljs-keyword">new</span><span class="hljs-type">Password</span>;
    }
}
</code></pre>
<p>It should be clear now that we can work around this password prompt, using the exported Receiver. You&#39;ll exploit this later, in the Dynamic Analysis section.</p>
<h2 id="-vulnerable-services-"><strong>Vulnerable Services</strong></h2>
<p>Let&#39;s look at a service which has been purposefully exported, but has a subtle flaw, which results in a significant vulnerability.</p>
<p>When started, this service will write a file called <code>private.txt</code>, located in the following directory: <code>/data/data/com.example.sillyservice/files/</code>. This file is intended to be inaccessible from this point forward.</p>
<p>The service however does run a shell command, called <em>find</em>, which is used to search for files. In this case, it allows another app to send an Intent to verify the file exists.</p>
<p>As shown in the <code>AndroidManifest.xml</code> file, you can see the <code>&lt;service&gt;</code> element, towards the bottom, and the exported attribute being set to <strong>true</strong>.</p>
<pre><code class="lang-xml"><span class="hljs-tag">&lt;<span class="hljs-name">manifest</span> <span class="hljs-attr">xmlns:android</span>=<span class="hljs-string">"http://schemas.android.com/apk/res/android"</span>
    <span class="hljs-attr">package</span>=<span class="hljs-string">"com.example.sillyservice"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">permission</span> <span class="hljs-attr">android:name</span>=<span class="hljs-string">"WRITE_EXTERNAL_STORAGE"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">permission</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">permission</span> <span class="hljs-attr">android:name</span>=<span class="hljs-string">"READ_EXTERNAL_STORAGE"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">permission</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">permission</span> <span class="hljs-attr">android:name</span>=<span class="hljs-string">"WRITE_INTERNAL_STORAGE"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">permission</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">permission</span> <span class="hljs-attr">android:name</span>=<span class="hljs-string">"READ_INTERNAL_STORAGE"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">permission</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">application</span>
        <span class="hljs-attr">android:allowBackup</span>=<span class="hljs-string">"true"</span>
        <span class="hljs-attr">android:icon</span>=<span class="hljs-string">"@mipmap/ic_launcher"</span>
        <span class="hljs-attr">android:label</span>=<span class="hljs-string">"@string/app_name"</span>
        <span class="hljs-attr">android:supportsRtl</span>=<span class="hljs-string">"true"</span>
        <span class="hljs-attr">android:theme</span>=<span class="hljs-string">"@style/AppTheme"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">activity</span> <span class="hljs-attr">android:name</span>=<span class="hljs-string">".MainActivity"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">intent-filter</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">action</span> <span class="hljs-attr">android:name</span>=<span class="hljs-string">"android.intent.action.MAIN"</span> /&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">category</span> <span class="hljs-attr">android:name</span>=<span class="hljs-string">"android.intent.category.LAUNCHER"</span> /&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">intent-filter</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">activity</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">service</span> <span class="hljs-attr">android:name</span>=<span class="hljs-string">".SillyService"</span> <span class="hljs-attr">android:exported</span>=<span class="hljs-string">"true"</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">service</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">application</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">manifest</span>&gt;</span>
</code></pre>
<p>By looking at the <em>SillyService</em> class, we can follow the flow through the <code>onStartCommand</code> method. This is called when an Intent is received to start or connect to the service.</p>
<pre><code class="lang-java">public <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">SillyService</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Service</span> </span>{
    <span class="hljs-meta">@Override</span>
    public <span class="hljs-type">IBinder</span> onBind(<span class="hljs-type">Intent</span> arg0) {
        <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>;
    }

    <span class="hljs-meta">@Override</span>
    public int onStartCommand(<span class="hljs-type">Intent</span> intent, int flags, int startId) {
        <span class="hljs-comment">// Let it continue running until it is stopped.</span>
        <span class="hljs-type">Toast</span>.makeText(<span class="hljs-keyword">this</span>, <span class="hljs-string">"Service Started"</span>, <span class="hljs-type">Toast</span>.<span class="hljs-type">LENGTH_LONG</span>).show();
        <span class="hljs-keyword">try</span> {
            <span class="hljs-type">String</span> errorLine;
            <span class="hljs-type">String</span> outLine;
            <span class="hljs-type">String</span> cmdExtra = intent.getStringExtra(<span class="hljs-string">"COMMAND"</span>);
            <span class="hljs-type">String</span> secret = getString(<span class="hljs-type">R</span>.string.private_data);
            <span class="hljs-type">WriteData</span>(secret);
            <span class="hljs-keyword">if</span> (cmdExtra.startsWith(<span class="hljs-string">"find"</span>)) {
                <span class="hljs-type">System</span>.out.println(<span class="hljs-string">"TOTALLY SECURE"</span>);
                <span class="hljs-type">String</span>[] cmd = {<span class="hljs-string">"sh"</span>, <span class="hljs-string">"-c"</span>, cmdExtra};
            }
        } <span class="hljs-keyword">catch</span> (<span class="hljs-type">Exception</span> e) {
            e.printStackTrace();
        }
        <span class="hljs-keyword">return</span> <span class="hljs-type">START_STICKY</span>;
    }
}
</code></pre>
<p>Looking at the line where the <em>cmdExtra</em> variable is instantiated, we see its value is drawn from an Extra with the name <strong>COMMAND</strong>.</p>
<pre><code class="lang-java"><span class="hljs-attribute">String cmdExtra</span> = intent.getStringExtra(<span class="hljs-string">"COMMAND"</span>);
</code></pre>
<p>Toward the bottom, we see an <strong>if</strong> statement, which ensures that the command received starts with the string find. In other words, the developer intends for users to find the file, to verify it is there.</p>
<pre><code class="lang-java"><span class="hljs-built_in">if</span> (cmdExtra.startsWith(<span class="hljs-string">"find"</span>)) {
    System.out.<span class="hljs-built_in">println</span>(<span class="hljs-string">"TOTALLY SECURE"</span>);
    <span class="hljs-keyword">String</span>[] cmd = {<span class="hljs-string">"sh"</span>, <span class="hljs-string">"-c"</span>, cmdExtra};
}
</code></pre>
<p>If that check passes, the value of the Extra is then passed to <strong>String Array</strong> cmd. Once the String Array <em>cmd</em> is compiled, it is passed to the <strong>exec</strong> method of the <strong>Runtime</strong> object. This allows binary executable files to be spawned as a separate process, just as if they were run from a terminal window/command prompt.</p>
<p>Putting it all together, we take an Intent which any app could send us, extract a value and use it to run a shell command.</p>
<pre><code class="lang-java">if (cmdExtra.startsWith(<span class="hljs-string">"find"</span>)) {
    System.out.println(<span class="hljs-string">"TOTALLY SECURE"</span>);

    String[] <span class="hljs-keyword">cmd</span><span class="bash"> = {<span class="hljs-string">"sh"</span>, <span class="hljs-string">"-c"</span>, cmdExtra};
</span>
    Process p = Runtime.getRuntime().exec(<span class="hljs-keyword">cmd</span><span class="bash">);</span>
</code></pre>
<p>Ordinarily, the pattern of untrusted input ends up in a sensitive function, likely executing arbitrary commands. This is a recipe for disaster, that is unless the input is somehow limited.</p>
<p>In this case, our shell command will only execute if it begins with “find”. On the surface, it would seem this is pretty safe, but as we’ll see in the Dynamic Code Analysis section, there is a devastating vulnerability here.</p>
<h2 id="-shared-preferences-"><strong>Shared Preferences</strong></h2>
<p>Android provides several ways to store data locally. One of these is in a directory commonly referred to as the Shared Preferences file. The name demonstrates the intended functionality, namely to store key value pairs of application preferences. This directory is found at:</p>
<pre><code>/<span class="hljs-class"><span class="hljs-keyword">data</span>/<span class="hljs-keyword">data</span>/&lt;package_name&gt;/shared_prefs</span>
</code></pre><p>The XML file storing the values can be specified by the developer.</p>
<p>Commonly, this file is a place to find unencrypted sensitive values that developers fail to protect. Unless the file permissions are modified, under normal conditions, only the app that created the files in this directory can access it.</p>
<p>That being said, an attacker could potentially retrieve this data with either local access, through some type of backup mechanism, or possibly <strong>adb</strong>. While it doesn’t take much skill to “hack” this, it is definitely worth looking at for potential issues.</p>
<p>The code below shows the basic structure of a Shared Preferences file. To view the contents, you can simply run the command <code>cat &lt;filename&gt;</code> from an <code>adb</code> shell.</p>
<pre><code class="lang-xml">[/com.android.email/shared_prefs/MailAppProvider.xml]
<span class="php"><span class="hljs-meta">&lt;?</span>xml version=<span class="hljs-string">'1.0'</span> encoding=<span class="hljs-string">'utf-8'</span> standalone=<span class="hljs-string">'yes'</span> <span class="hljs-meta">?&gt;</span></span>
<span class="hljs-tag">&lt;<span class="hljs-name">map</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">string</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"accountList"</span>&gt;</span>[]<span class="hljs-tag">&lt;/<span class="hljs-name">string</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">map</span>&gt;</span>
</code></pre>
<h2 id="-local-databases-"><strong>Local Databases</strong></h2>
<p>Many applications store their information using database files. The databases are stored in the <code>/databases</code> subdirectory of an application’s parent folder. To interact with them, we can use the <code>sqlite3</code> tool.</p>
<p>The sqlite3 binary can be found in the <code>../Android/sdk/platform-tools/</code> directory of the Android Studio installation path, or if it is pre-installed on your device, in the <code>/system/xbin/</code> directory. If you want to run this from your computer, rather than directly on a device, you’ll need to pull the <code>db</code> files from the device to operate on them locally.</p>
<p>It is not uncommon to find sensitive data located in these databases. To view the content of a database, you must first mount it using the <code>sqlite3</code> command, as shown below.</p>
<pre><code class="lang-shell"><span class="hljs-title">root</span>@generic_x86: # sqlite3 /<span class="hljs-class"><span class="hljs-keyword">data</span>/<span class="hljs-keyword">data</span>/com.android.email/databases/<span class="hljs-type">EmailProvider</span>.db</span>
</code></pre>
<p>Once open, you can access a list of the available commands using the <code>.help</code> command (note the period prior to the command).</p>
<pre><code class="lang-bash"><span class="hljs-selector-tag">SQLite</span> <span class="hljs-selector-tag">version</span> 3<span class="hljs-selector-class">.35</span><span class="hljs-selector-class">.0</span> 2025<span class="hljs-selector-tag">-02-22</span> 18<span class="hljs-selector-pseudo">:17</span><span class="hljs-selector-pseudo">:19</span>
<span class="hljs-selector-tag">Enter</span> "<span class="hljs-selector-class">.help</span>" <span class="hljs-selector-tag">for</span> <span class="hljs-selector-tag">usage</span> <span class="hljs-selector-tag">hints</span>.
<span class="hljs-selector-tag">sqlite</span>&gt;
</code></pre>
<p>From here, it is simply a matter of searching around until you either find something interesting or not. This might include passwords, credit card information, API credentials, private data or something similar. This usually starts with listing which tables are available.</p>
<pre><code class="lang-bash">sqlite&gt; <span class="hljs-selector-class">.tables</span>
Account           Mailbox              Message_Deletes    android_metadata
Attachment        Message              Message_Updates      
Credential        MessageMove          Policy               
HostAuth          MessageStateChange   QuickResponse
</code></pre>
<p>The <code>.dump</code> command will dump the entire database schema, but that can be a bit too much text to parse. If you specify the table name (i.e. <code>.dump &lt;table_name&gt;</code>), the command will limit the output to that table, as shown below.</p>
<pre><code class="lang-bash">sqlite&gt; .dump Account
PRAGMA foreign_keys=OFF<span class="hljs-comment">;</span>
<span class="hljs-keyword">BEGIN </span>TRANSACTION<span class="hljs-comment">;</span>
CREATE TABLE Account (_id INTEGER PRIMARY KEY AUTOINCREMENT, <span class="hljs-keyword">displayName </span>TEXT, emailAddress TEXT, <span class="hljs-keyword">syncKey </span>TEXT, <span class="hljs-keyword">syncInterval </span>INTEGER, <span class="hljs-keyword">syncIntervalText, </span>...
COMMIT<span class="hljs-comment">;</span>
</code></pre>
<p>By default, the output can be difficult to read. If you prefer to organize it in an easier to read fashion, setting your <em>sqlite3</em> preferences as shown below can help. The output of the first query gives no information about what column the value came from. After setting the <em>sqlite3</em> preferences, you see the output is much more readable.</p>
<pre><code>sql sqlite&gt; <span class="hljs-keyword">SELECT</span> * FROM android_metadata;
en_US
sqlite&gt; .<span class="hljs-keyword">header</span> <span class="hljs-keyword">on</span>
sqlite&gt; .mode column
sqlite&gt; .timer <span class="hljs-keyword">on</span> sqlite&gt; <span class="hljs-keyword">SELECT</span> * FROM android_metadata;
<span class="hljs-built_in">locale</span>
</code></pre><h2 id="-tools-"><strong>Tools</strong></h2>
<h3 id="-drozer-"><strong>Drozer</strong></h3>
<p>One tool that many mobile application testers find useful is <code>Drozer</code> from MWR Labs. This tool allows for:</p>
<ul>
<li>enumeration of an application’s attack surface.</li>
<li>interaction with the various app components.</li>
<li>the ability to install BusyBox on the device.</li>
<li>and tools for exploiting vulnerable applications.</li>
</ul>
<p>While this is a useful tool, after you understand the topics we’ve covered in this course, it is possible you may find using ADB and other tools just as effective. Unfortunately, many of the most interesting aspects of this tool are the least documented and have remained so for years.</p>
<p>Despite the less-than-thorough documentation, you may find some tasks easier to accomplish using Drozer than the other tools at your disposal. This may lead to you switching between tools. If so inclined, you may be able to learn the more complex aspects by carefully parsing the tool’s error messages, help menus and/or by searching the Internet for examples of its use in various scenarios.</p>
<p>Download Drozer and use it on an app of your choice, from the Google Play Store. You should be able to follow some of the examples in the User Guide found <a href="https://github.com/WithSecureLabs/drozer">here</a>. For each functionality offered, try to duplicate it using ADB and what you’ve learned thus far in this course. Make note of which functionalities are easier, or more flexible using Drozer or just using ADB directly.</p>
<hr>
<h1 id="-dynamic-code-analysis-"><strong>Dynamic Code Analysis</strong></h1>
<p>Dynamic Code Analysis is the process by which code is reviewed for vulnerabilities by executing some or all of the code. This execution can occur in a normal environment, virtualized environment or in a debugger.</p>
<p>Because the program is actually executing, you can directly examine the changes made to memory or the file system as they occur. This type of inspection also allows you to directly observe network requests, interactions with other applications and the results of any error conditions encountered.</p>
<p>While much of the testing can be accomplished with software, there will always be a level of manual effort required, particularly for configuration and reviewing the findings.</p>
<h2 id="-debugging-"><strong>Debugging</strong></h2>
<p>While there are numerous methods to debug applications, for Android apps, the most common way is to use Android Studio’s built-in debugger. Because it is so well documented, we will leave getting familiar with that as an exercise to you. This approach works best for apps where you have, or can obtain, the original source, but not so well if you can’t get a buildable copy.</p>
<p>Without a buildable copy, you will only see debug data from an app, if its <strong>application</strong> element sets the value of its <code>android:debuggable</code> attribute to <strong>true</strong>. Since this can leak information in the event that someone steals a victim’s device and connects it to a computer, under normal circumstances it is usually disabled.</p>
<p>We’ll set a breakpoint in the application to stop execution prior to writing data to the database. You might use this technique to obtain values that are normally encrypted in the database but don’t appear, or are hard to locate or read, in the static code.</p>
<p>Debugging is commonly used in security to verify the conditions needed to reach a known vulnerable piece of code, or for proof-of-concept exploit development.</p>
<p>A breakpoint can be set, by opening a class and clicking in the bar, just to the left of the code. You should see a red dot appear on the left-hand bar. The breakpoint(s) can be removed by simply clicking on the red circle again. There are two ways to debug an app, depending on whether it has already been started or not. Clicking the “bug” icon will attach a debugger and start the program. Clicking the phone icon with the smaller bug, will attach a debugger to a program that has already been started.</p>
<h2 id="-android-debug-bridge-"><strong>Android Debug Bridge</strong></h2>
<p>The Android Debug Bridge, commonly referred to as ADB, is an invaluable tool, which allows you to interact with a running application and/or an Android device itself. ADB can be used with either a physical device or an emulator. In order to connect to a physical device, you’ll need to connect your device to your computer using a USB cable. To connect to an emulator, you simply need to start the emulator.</p>
<p>ADB consists of three components, a client, a server and a <strong>daemon</strong>. The client and server both run on your computer, while the daemon runs on the device or emulator. The client is the program you directly interact with. The server manages communication between the client and daemon on the physical or virtual device. The daemon runs in the background on the device or emulator and executes the commands, passed via the server, from the client.</p>
<p>On Windows PCs, ADB can be started from a command prompt, like this:</p>
<pre><code>C:<span class="hljs-symbol">\U</span>sers<span class="hljs-symbol">\&lt;</span>username&gt;<span class="hljs-symbol">\A</span>ppData<span class="hljs-symbol">\L</span>ocal<span class="hljs-symbol">\A</span>ndroid<span class="hljs-symbol">\s</span>dk<span class="hljs-symbol">\p</span>latform-tools<span class="hljs-symbol">\a</span>db.exe
</code></pre><p>On Linux or OSX, ADB can be started from a Terminal like this:</p>
<pre><code><span class="hljs-regexp">/Users/</span>&lt;username&gt;<span class="hljs-regexp">/Library/</span>Android<span class="hljs-regexp">/sdk/</span>platform-tools<span class="hljs-regexp">/adb</span>
</code></pre><p>Running the <strong>adb</strong> executable without arguments will cause the help menu to be displayed. You should spend some time reviewing the output to familiarize yourself with the options available.</p>
<p>The following list of commonly used commands are ones we’ve found to be extremely useful. You have the choice of running commands directly from a terminal on your computer, or spawning a CLI environment on the device, using the <code>adb shell</code> command.</p>
<p>If you run ADB directly from your terminal, without instantiating a persistent <code>adb shell</code>, you’ll need to preface each of your commands with <code>adb shell</code>. The results of the commands are generally the same, regardless of which method you use to input them.</p>
<p>Since we can communicate with several devices or emulators, we need to be able to distinguish which one we want to connect to. Running the <code>adb devices</code> command lists all instances.</p>
<p>Each instance is identified by a serial number (type-port) and the output includes their current state. Note that the first time we run this command, it will start the adb server on port 5037. All communication from our client to any devices will go through this port.</p>
<p>Below is an example of the command and its output.</p>
<pre><code class="lang-shell">adb devices
<span class="hljs-meta"># List of devices attached</span>
<span class="hljs-meta"># emulator-5554 device</span>
<span class="hljs-meta"># emulator-5556 device</span>
<span class="hljs-meta"># emulator-5558 device</span>
</code></pre>
<p>The “device” status in the second column indicates that ADB is communicating with the instance. If there were issues, it would either say “offline” or “no device”.</p>
<p>The snippet below shows the <code>adb shell</code> command, connecting to a specific device by <strong>serial number</strong>. Once connected, we run the <code>ls -al</code> command to verify our connection.</p>
<pre><code class="lang-shell">els: adb -s GM1G21SAXL shell
shell@shamu:/ $ ls -al
# drwxr-xr-x root root 1970<span class="hljs-string">-03</span><span class="hljs-string">-05</span> 21:03 acct
# drwxrwx--- system cache 1970<span class="hljs-string">-02</span><span class="hljs-string">-09</span> 11:35 cache
# lrwxrwxrwx root root 1969<span class="hljs-string">-12</span><span class="hljs-string">-31</span> 16:00 charger -&gt; /sbin/healthd
# dr-x------ root root 1970<span class="hljs-string">-03</span><span class="hljs-string">-05</span> 21:03 config
# lrwxrwxrwx root root 1970<span class="hljs-string">-03</span><span class="hljs-string">-05</span> 21:03 d -&gt; /sys/kernel/debug
# drwxrwxrwx system system 2016<span class="hljs-string">-09</span><span class="hljs-string">-04</span> 18:31 data
# -rw-r--r-- root root 684 1969<span class="hljs-string">-12</span><span class="hljs-string">-31</span> 16:00 default.prop
# drwxr-xr-x root root 2016<span class="hljs-string">-09</span><span class="hljs-string">-04</span> 18:31 dev
# lrwxrwxrwx root root 1970<span class="hljs-string">-03</span><span class="hljs-string">-05</span> 21:03 etc -&gt; /system/etc
# -rw-r--r-- root root 21775 1969<span class="hljs-string">-12</span><span class="hljs-string">-31</span> 16:00 file_contexts
</code></pre>
<p>The main difference, between the two input methods is that if you don’t instantiate a persistent shell, you can use the programs on your computer to interact with the output directly.</p>
<p>The snippet below show examples of the two input methods.</p>
<pre><code><span class="hljs-attribute">els</span>: adb shell
root<span class="hljs-variable">@generic_x86</span>:/ # pm list packages
<span class="hljs-attribute">package</span>:com.android.smoketest
<span class="hljs-attribute">package</span>:com.example.android.livecubes
<span class="hljs-attribute">package</span>:com.android.providers.telephony
<span class="hljs-attribute">package</span>:com.google.android.googlequicksearchbox
<span class="hljs-attribute">package</span>:com.example.vulnerableviews
</code></pre><pre><code>els: adb shell pm list packages
package:com<span class="hljs-selector-class">.android</span><span class="hljs-selector-class">.smoketest</span>
package:com<span class="hljs-selector-class">.example</span><span class="hljs-selector-class">.android</span><span class="hljs-selector-class">.livecubes</span>
package:com<span class="hljs-selector-class">.android</span><span class="hljs-selector-class">.providers</span><span class="hljs-selector-class">.telephony</span>
package:com<span class="hljs-selector-class">.google</span><span class="hljs-selector-class">.android</span><span class="hljs-selector-class">.googlequicksearchbox</span>
package:com<span class="hljs-selector-class">.example</span><span class="hljs-selector-class">.vulnerableviews</span>
</code></pre><blockquote>
<p>[!Note] 
Keep in mind that the files and directories are protected by permissions. You will not be able to operate on all of them without rooting your device or using an emulator. To become the root user on a rooted device or emulator, you’ll need to use the <code>su</code> command.</p>
</blockquote>
<p>Directly from a terminal:</p>
<pre><code class="lang-shell">adb <span class="hljs-built_in">shell</span> <span class="hljs-string">"su -c '[your command goes here]'"</span>
</code></pre>
<p>Alternatively, from a persistent shell, simply type: <code>su</code> and you will become the root user for all your commands. As we mentioned earlier, you have the choice of running commands from a terminal on your computer, or spawning a CLI environment on the device, using the <code>adb shell</code> command. If you run it from your terminal, without instantiating an <code>adb shell</code>, you’ll need to preface each of your commands with <code>adb shell</code>.</p>
<p><strong>Extremely useful commands: </strong></p>
<ul>
<li><code>adb devices</code>: lists all the physical devices or emulators adb can connect to.</li>
<li><code>adb shell</code>: starts the interactive shell.</li>
<li><code>(adb shell)</code>pm list packages: shows all installed apks.</li>
<li><code>(adb shell) pm path &lt;package name&gt;</code>: returns path to the apps files.</li>
<li><code>(adb shell) am start</code>: starts an activity ( hit Enter to see options).</li>
<li><code>(adb shell) am startservice</code>: starts a service.</li>
<li><code>(adb shell) am broadcast</code>: sends a broadcast.</li>
<li><code>(adb shell) input [text|keyevent]</code>: sends keystrokes to device.</li>
<li><code>adb pull &lt;device path&gt; &lt;local path&gt;</code>: copies a file from your machine to the device.</li>
<li><code>adb push &lt;local file&gt; &lt;device file&gt;</code>: copies a file from the device to your machine.</li>
<li><code>adb install &lt;apk_file&gt;</code>: pushes and installs an application to the device.</li>
<li><code>adb uninstall &lt;application name&gt;</code>: uninstalls an application from the device.</li>
<li><code>exit</code>: terminates the persistent shell.</li>
</ul>
<p>You can list all the available options and a brief description of their functionalities, by running <code>adb help</code>. This will print the help menu, as shown below.</p>
<pre><code class="lang-shell">els: adb <span class="hljs-keyword">help</span>
Android Debug Bridge <span class="hljs-keyword">version</span> <span class="hljs-number">1.0</span><span class="hljs-number">.41</span>
<span class="hljs-keyword">Version</span> <span class="hljs-number">35.0</span><span class="hljs-number">.1</span><span class="hljs-number">-11580240</span>

-a                   - directs adb <span class="hljs-keyword">to</span> listen <span class="hljs-keyword">on</span> all interfaces <span class="hljs-keyword">for</span> a <span class="hljs-keyword">connection</span>
-d                   - directs command <span class="hljs-keyword">to</span> the <span class="hljs-keyword">only</span> connected USB device
                       <span class="hljs-keyword">returns</span> an <span class="hljs-keyword">error</span> <span class="hljs-keyword">if</span> more <span class="hljs-keyword">than</span> one USB device <span class="hljs-keyword">is</span> present.
-e                   - directs command <span class="hljs-keyword">to</span> the <span class="hljs-keyword">only</span> running emulator.
                       <span class="hljs-keyword">returns</span> an <span class="hljs-keyword">error</span> <span class="hljs-keyword">if</span> more <span class="hljs-keyword">than</span> one emulator <span class="hljs-keyword">is</span> running.
-s &lt;specific device&gt; - directs command <span class="hljs-keyword">to</span> the device <span class="hljs-keyword">or</span> emulator <span class="hljs-keyword">with</span> the given
                       <span class="hljs-built_in">serial</span> <span class="hljs-built_in">number</span> <span class="hljs-keyword">or</span> qualifier. Overrides ANDROID_SERIAL
</code></pre>
<p>If we have more than one device attached, we can decide to interact with a specific device using the <code>-s</code> option followed by the device serial number and the command. For example, with the following command we can obtain the state of the device <code>emulator-5554</code>:</p>
<pre><code class="lang-shell">adb -s emulator<span class="hljs-number">-5554</span> get-<span class="hljs-section">state</span>
</code></pre>
<h3 id="-activity-manager-"><strong>Activity Manager</strong></h3>
<p>As we have already seen in the previous slides, if we want to manually execute similar operations, we can use the option <code>am</code> (Activity Manager). This allows us to perform various operations: start an activity, stop a process, broadcast intents, etc.</p>
<pre><code class="lang-shell"><span class="hljs-keyword">el</span><span class="hljs-variable">s:</span> adb <span class="hljs-keyword">shell</span> <span class="hljs-keyword">am</span>
usage:  <span class="hljs-keyword">am</span> [subcommand] [<span class="hljs-keyword">options</span>]
usage:  <span class="hljs-keyword">am</span> start [-D] [-W] [-<span class="hljs-keyword">P</span> <span class="hljs-symbol">&lt;FILE&gt;</span>] [--start-profiler <span class="hljs-symbol">&lt;FILE&gt;</span>]
                [--sampling INTERVAL] [-R COUNT] [-S] [--opengl-trace]
                [-user <span class="hljs-symbol">&lt;USER_ID&gt;</span>] [-<span class="hljs-keyword">c</span> <span class="hljs-symbol">&lt;CATEGORY&gt;</span> ...] [-<span class="hljs-keyword">a</span> <span class="hljs-symbol">&lt;ACTION&gt;</span>]
        <span class="hljs-keyword">am</span>  startservice [--user <span class="hljs-symbol">&lt;USER_ID&gt;</span> | current] <span class="hljs-symbol">&lt;INTENT&gt;</span>
        <span class="hljs-keyword">am</span> stopservice [--user <span class="hljs-symbol">&lt;USER_ID&gt;</span> | current] <span class="hljs-symbol">&lt;INTENT&gt;</span>
        <span class="hljs-keyword">am</span> force-<span class="hljs-keyword">stop</span> [--user <span class="hljs-symbol">&lt;USER_ID&gt;</span> | <span class="hljs-keyword">all</span> | current] <span class="hljs-symbol">&lt;PACKAGE&gt;</span>
        <span class="hljs-keyword">am</span> kill [--user <span class="hljs-symbol">&lt;USER_ID&gt;</span> | <span class="hljs-keyword">all</span>| current] <span class="hljs-symbol">&lt;PACKAGE&gt;</span>
        <span class="hljs-keyword">am</span> kill-<span class="hljs-keyword">all</span>
        <span class="hljs-keyword">am</span> broadcast [--user <span class="hljs-symbol">&lt;USER_ID&gt;</span> | <span class="hljs-keyword">all</span> | current] <span class="hljs-symbol">&lt;INTENT&gt;</span>
</code></pre>
<p>As we can see from the help menu, we can run many different options:</p>
<ul>
<li>start an activity</li>
<li>send broadcast intents</li>
<li>or monitor the interaction the system has with the application by using the Instrumentation option.</li>
</ul>
<p>Let’s look at some examples of how we can start a specific activity. This could be useful later on in order to bypass or access an app specific activity.</p>
<h2 id="-tools-"><strong>Tools</strong></h2>
<h3 id="-interacting-with-databases-"><strong>Interacting with Databases</strong></h3>
<p>Many applications store their information using database files. The databases are stored in the <code>/databases</code> subdirectory of an application’s parent folder. To interact with them, we can use the <code>sqlite3</code> tool.</p>
<p>The <code>sqlite3</code> binary can be found in the: <code>../Android/sdk/platform-tools/</code> directory of the Android Studio installation path, or if it is pre-installed on your device, in the <code>/system/xbin/</code> directory. If you want to run this from your computer, rather than directly on a device, you’ll need to pull the <strong>db</strong> files from the device to operate on them locally.</p>
<p>To open a database, simply pass its path to the <code>sqlite3</code> commands as an argument. For example:</p>
<pre><code class="lang-shell">sqlite3 /data/data/com<span class="hljs-selector-class">.android</span><span class="hljs-selector-class">.providers</span><span class="hljs-selector-class">.calendar</span>/databases/calendars.db
</code></pre>
<p>Notice how the prompt changed. We will now be able to interact with the database. We can list tables, execute queries, read or edit data and so on.</p>
<h3 id="-android-device-monitor-"><strong>Android Device Monitor</strong></h3>
<p>Within Android Studio, there is a useful tool, called the <em>Android Device Monitor</em>. This tool can be launched from the top toolbar. This tool consolidates debug logging, file browsing, memory monitoring and process visibility into one convenient view.</p>
<p>Spend a moment to experiment with using applications and monitoring functionality and how they impact the memory and network utilization. This tool also allows you to simulate various telephony and SMS related settings, in the Emulator Control tab.</p>
<p>In Android 4.0 (Ice Cream Sandwich), the system log files were world-readable by any application with the READ_LOG permission. This was a source of information leakage for many applications.</p>
<p>In later versions, the system log file access for an application is limited to its own logs. If an application you’re reviewing supports a vulnerable older versions, it is a good idea to monitor the logs for potentially sensitive data, such as passwords or authentication tokens.</p>
<h3 id="-frida-"><strong>Frida</strong></h3>
<p>Frida is a dynamic instrumentation toolkit that allows you to inject snippets of JavaScript into native applications on Windows, macOS, Linux, iOS, and Android. It is an invaluable tool for reverse engineering, debugging, and modifying the behavior of applications at runtime.</p>
<p>Frida lets you inject JavaScript code into running processes and hook any function, intercepting calls and reading/writing memory. It works seamlessly across multiple platforms including Android, making it a versatile tool for mobile application testing.</p>
<p>The use of JavaScript makes it easy to write scripts for various tasks such as API monitoring, data interception, and more.</p>
<p>You can hook into specific functions within an app to monitor their behavior or modify their functionality. If an app uses encryption, Frida can help you hook into the decryption routines to capture the plaintext data. Frida can be used to bypass certain security mechanisms like root detection or license checks.</p>
<p>Here’s a simple example of a Frida script that hooks into a function and logs its arguments:</p>
<pre><code class="lang-js"><span class="hljs-selector-tag">Interceptor</span><span class="hljs-selector-class">.attach</span>(<span class="hljs-selector-tag">Module</span><span class="hljs-selector-class">.findExportByName</span>("<span class="hljs-selector-tag">libexample</span><span class="hljs-selector-class">.so</span>", "<span class="hljs-selector-tag">target_function</span>"), {
    <span class="hljs-attribute">onEnter</span>: <span class="hljs-built_in">function</span>(args) {
        console.<span class="hljs-built_in">log</span>(<span class="hljs-string">"target_function called with arg1 = "</span> + args[0].toInt32());
    }
});
</code></pre>
<p>Frida is a powerful tool that can significantly enhance your capabilities in Android app pentesting. Its flexibility and ease of use make it a go-to choice for many security researchers and penetration testers.</p>
<hr>
<h1 id="-labs-"><strong>Labs</strong></h1>
<p>This Android application was created to showcase various Intent attack surfaces that could be exposed by an Android application.</p>
<p>![[io.hextree.attacksurface.apk]]</p>
<blockquote>
<p>[!Note]
<strong>Do not modify or hook the target app.</strong> If not stated differently, the intended solution is to develop a malicious attack app.</p>
</blockquote>
<p>This app offers various challenges to learn about different Android topics. Together with the relevant courses you can learn everything you need to know about Android app hacking:  </p>
<ul>
<li>Activity</li>
<li>ActivityResult</li>
<li>Implicit Intent</li>
<li>Deeplink and Chrome Intents</li>
<li>Broadcast Receiver</li>
<li>Pending Intent</li>
<li>Service</li>
<li>Content Provider</li>
<li>File Provider</li>
<li>WebView and CustomTabs</li>
</ul>
<p>The app displays a list of challenges intended to be solved by attacking the app. The most relevant class to start reverse engineering a challenge is shown as well.</p>
<p>To find flags you need to call the <code>success()</code> method by implementing an attack. So when reverse engineering the relevant classes, always look at how <code>success()</code> could be called. If <code>success()</code> gets executed by the correct conditions, the app should display the flag. If not, check the <code>logcat</code> output, the flag should be there as well.</p>
<p>For most challenges you should develop an attack app.</p>
<h3 id="-additional-resources-labs-"><strong>Additional Resources &amp; Labs</strong></h3>
<p>For additional lab, check out these github repos.</p>
<ol>
<li><a href="https://github.com/hafiz-ng/Beetlebug">Beetlebug</a></li>
<li><a href="https://github.com/oversecured/ovaa">ovaa</a></li>
<li><a href="https://github.com/t0thkr1s/allsafe">allsafe</a></li>
<li><a href="https://github.com/B3nac/InjuredAndroid">InjuredAndroid</a></li>
</ol>
<p>And For more resource, check out these platforms.</p>
<ol>
<li><a href="https://www.mobilehackinglab.com/">MobileHackingLabs</a></li>
<li><a href="https://app.hextree.io/">Hextree.io</a></li>
</ol>
`