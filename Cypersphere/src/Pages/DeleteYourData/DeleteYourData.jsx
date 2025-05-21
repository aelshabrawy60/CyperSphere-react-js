import React from 'react';

const DeleteYourData = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 flex items-center justify-center">
      <div className="max-w-2xl w-full bg-gray-800 p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-red-500 mb-4">🗑 Delete Your Data</h1>
        <p className="mb-4">
          We respect your privacy. If you would like to request the deletion of your data from our app,
          please follow the steps below.
        </p>

        <h2 className="text-2xl font-semibold text-blue-400 mb-2">🔹 How to Request Data Deletion</h2>
        <p className="mb-2">
          Send an email to <span className="font-bold text-blue-500">support@yourdomain.com</span> with the following details:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>Your full name</li>
          <li>The email address linked to your Facebook account</li>
          <li>A clear request to delete all your personal data</li>
        </ul>

        <p className="mb-2">
          We will process your request within 7 business days and confirm once completed.
        </p>
        <p>Thank you for trusting us.</p>
      </div>
    </div>
  );
};

export default DeleteYourData;
