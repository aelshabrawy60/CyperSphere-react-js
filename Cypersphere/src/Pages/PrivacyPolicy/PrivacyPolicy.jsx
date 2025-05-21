import React from 'react'

function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10 text-gray-200 rounded-lg shadow-lg dark:text-gray-200">
      {/* English Section */}
      <section className="space-y-4">
        <h1 className="text-3xl font-bold mb-2">Privacy Policy - Cyber Sphere</h1>
        <p className="text-sm text-gray-400">Last updated: <strong>May 20, 2025</strong></p>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">1. Introduction</h2>
          <p>We respect your privacy and are committed to protecting your personal data.</p>

          <h2 className="text-xl font-semibold">2. Data We Collect</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>Personal identification information (Name, email, etc.)</li>
            <li>Usage data and cookies</li>
          </ul>

          <h2 className="text-xl font-semibold">3. How We Use Your Data</h2>
          <p>To provide and improve our services, respond to inquiries, and comply with legal obligations.</p>

          <h2 className="text-xl font-semibold">4. Sharing Data</h2>
          <p>We do not sell your personal data to third parties.</p>

          <h2 className="text-xl font-semibold">5. Security</h2>
          <p>We take reasonable measures to protect your information.</p>

          <h2 className="text-xl font-semibold">6. Your Rights</h2>
          <p>You can access, modify, or delete your data by contacting us.</p>

          <h2 className="text-xl font-semibold">7. Contact Us</h2>
          <p>Email: <strong>eldeeba124@gmail.com</strong></p>
        </div>
      </section>

      <hr className="my-10 border-gray-700" />

      {/* Arabic Section */}
      <section dir="rtl" className="space-y-4">
        <h1 className="text-3xl font-bold mb-2">سياسة الخصوصية - Cyber Sphere</h1>
        <p className="text-sm text-gray-400">آخر تحديث: <strong>20 مايو 2025</strong></p>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">1. مقدمة</h2>
          <p>نحن نحترم خصوصيتك ونلتزم بحماية بياناتك الشخصية.</p>

          <h2 className="text-xl font-semibold">2. البيانات التي نجمعها</h2>
          <ul className="list-disc list-inside pr-4 space-y-1">
            <li>معلومات التعريف الشخصية (الاسم، البريد الإلكتروني، إلخ)</li>
            <li>بيانات الاستخدام والكوكيز</li>
          </ul>

          <h2 className="text-xl font-semibold">3. كيف نستخدم بياناتك</h2>
          <p>لتقديم خدماتنا وتحسينها، والرد على الاستفسارات، والامتثال للالتزامات القانونية.</p>

          <h2 className="text-xl font-semibold">4. مشاركة البيانات</h2>
          <p>لا نبيع بياناتك الشخصية لأي طرف ثالث.</p>

          <h2 className="text-xl font-semibold">5. الأمان</h2>
          <p>نتخذ تدابير معقولة لحماية معلوماتك.</p>

          <h2 className="text-xl font-semibold">6. حقوقك</h2>
          <p>يمكنك الوصول إلى بياناتك وتعديلها أو حذفها عن طريق الاتصال بنا.</p>

          <h2 className="text-xl font-semibold">7. تواصل معنا</h2>
          <p>البريد الإلكتروني: <strong>eldeeba124@gmail.com</strong></p>
        </div>
      </section>
    </div>
  )
}

export default PrivacyPolicy
