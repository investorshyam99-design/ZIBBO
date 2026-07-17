import React from 'react';
import SEO from '../components/SEO';

export default function PrivacyPolicyView() {
  return (
    <div className="min-h-[60vh] bg-white py-16 px-4">
      <SEO 
        title="Privacy Policy | ZIBBO"
        description="Learn more about Privacy Policy at ZIBBO."
        type="website"
      />
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-black text-brand-navy tracking-tight mb-8">Privacy Policy</h1>
        <div className="prose prose-sm md:prose-base max-w-none text-gray-600">
          <p>Welcome to the Privacy Policy page. This section is currently being updated with our latest policies and information.</p>
        </div>
      </div>
    </div>
  );
}
