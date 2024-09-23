"use client";

import React from "react";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

export default function PrivacyPolicy() {
  return (
    <>
      <div className="bg-gradient-to-br from-gcNeutrals-baseWhite to-gcPrimary-basePrimary">
        <Navbar />
        <section className="pt-16 flex md:flex-row flex-col gap-10 px-6">
          <div className="max-w-4xl mx-auto p-6 bg-gcNeutrals-baseWhite shadow-lg mt-10 rounded-lg">
            <h1 className="gcHeading3p mb-6 text-gcPrimary-600">Privacy Policy for Green Cure</h1>

            <p className="mb-4 gcContentBody3p">
              At <strong className="gcHeading4p text-gcPrimary-1000">Green Cure</strong>, we prioritize the privacy of our users. This Privacy Policy outlines how we collect, use, and safeguard your personal information when you use our
              services through the Green Cure website and applications.
            </p>

            <h2 className="gcContentAccent6p text-gcPrimary-1000 mb-4">1. Information We Collect</h2>
            <p className="mb-4 gcContentBody3p">We may collect the following types of information when you use Green Cure:</p>
            <ul className="gcContentBody3p list-disc list-inside mb-4">
              <li>
                <strong className="gcHeading4p text-gcPrimary-1000">Personal Information:</strong> This may include your name, email address, phone number, and other contact details when you sign up or fill out a form.
              </li>
              <li>
                <strong className="gcHeading4p text-gcPrimary-1000">Health Information:</strong> If applicable, any health-related data you provide in relation to our services.
              </li>
              <li>
                <strong className="gcHeading4p text-gcPrimary-1000">Usage Data:</strong> We collect information about how you interact with our website, including IP address, browser type, pages visited, and time spent on the site.
              </li>
              <li>
                <strong className="gcHeading4p text-gcPrimary-1000">Cookies and Tracking Technologies:</strong> We may use cookies and similar technologies to improve your experience on our site.
              </li>
            </ul>

            <h2 className="gcContentAccent6p text-gcPrimary-1000 mb-4">2. How We Use Your Information</h2>
            <p className="mb-4 gcContentBody3p">Green Cure uses the information we collect in the following ways:</p>
            <ul className="gcContentBody3p list-disc list-inside mb-4">
              <li>To provide and maintain our services.</li>
              <li>To communicate with you regarding updates, services, or customer support.</li>
              <li>To personalize your experience on the website.</li>
              <li>To improve our website and service offerings.</li>
              <li>To comply with legal obligations or prevent fraud.</li>
            </ul>

            <h2 className="gcContentAccent6p text-gcPrimary-1000 mb-4">3. Sharing Your Information</h2>
            <p className="mb-4 gcContentBody3p">We do not share, sell, or distribute your personal information to third parties, except in the following situations:</p>
            <ul className="gcContentBody3p list-disc list-inside mb-4">
              <li>With your consent.</li>
              <li>To third-party service providers that assist us in operating our website, such as hosting and analytics services.</li>
              <li>If required by law or legal process, or to protect the rights and safety of Green Cure, our users, or others.</li>
            </ul>

            <h2 className="gcContentAccent6p text-gcPrimary-1000 mb-4">4. Data Security</h2>
            <p className="mb-4 gcContentBody3p">
              We are committed to ensuring that your information is secure. We implement a variety of security measures to maintain the safety of your personal data, including encryption, secure data storage, and restricted access.
            </p>

            <h2 className="gcContentAccent6p text-gcPrimary-1000 mb-4">5. Your Choices</h2>
            <p className="mb-4 gcContentBody3p">You have the right to:</p>
            <ul className="gcContentBody3p list-disc list-inside mb-4">
              <li>Access or request correction of your personal data.</li>
              <li>Opt-out of receiving marketing communications from us.</li>
              <li>Request the deletion of your personal information from our records.</li>
            </ul>

            <h2 className="gcContentAccent6p text-gcPrimary-1000 mb-4">6. Third-Party Links</h2>
            <p className="mb-4 gcContentBody3p">
              Our website may contain links to third-party sites. Green Cure is not responsible for the privacy practices or content of these third-party websites. We encourage you to review the privacy policies of any site you visit.
            </p>

            <h2 className="gcContentAccent6p text-gcPrimary-1000 mb-4">7. Changes to This Privacy Policy</h2>
            <p className="mb-4 gcContentBody3p">
              Green Cure reserves the right to modify this Privacy Policy at any time. We will notify users of any changes by posting the updated policy on our website, and the changes will become effective immediately.
            </p>

            <h2 className="gcContentAccent6p text-gcPrimary-1000 mb-4">8. Contact Us</h2>
            <p className="mb-4 gcContentBody3p">If you have any questions or concerns regarding this Privacy Policy, please contact us at:</p>
            <p className="mb-4 gcContentBody3p">
              <strong className="gcHeading4p text-gcPrimary-1000">Green Cure Support</strong>
              <br />
              Email:{" "}
              <a href="mailto:support@greencure.com" className="text-gcPrimary-600 gcContentBody2p underline">
                support@greencure.com
              </a>
              <br />
              Phone: +123456789
            </p>
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
}
