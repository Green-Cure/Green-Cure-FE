"use client";

import React from "react";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

export default function TermsConditions() {
  return (
    <>
      <div className="bg-gradient-to-br from-gcNeutrals-baseWhite to-gcPrimary-basePrimary">
        <Navbar />
        <section className="pt-16 flex md:flex-row flex-col gap-10 px-6">
          <div className="max-w-4xl mx-auto p-6 bg-gcNeutrals-baseWhite shadow-lg mt-10 rounded-lg">
            <h1 className="gcHeading3p mb-6 text-gcPrimary-600">Terms and Conditions for Green Cure</h1>

            <p className="mb-4 gcContentBody3p">
              Welcome to <strong className={"gcHeading4p text-gcPrimary-1000"}>Green Cure</strong>. By accessing or using our website and services, you agree to comply with and be bound by the following terms and conditions. Please read
              these terms carefully. If you do not agree with any part of these terms, please do not use our services.
            </p>

            <h2 className="gcContentAccent6p text-gcPrimary-1000 mb-4">1. Acceptance of Terms</h2>
            <p className="mb-4 gcContentBody3p">
              By using Green Cure, you agree to be legally bound by these Terms and Conditions, which will take effect immediately on your first use of the website. If you do not agree to be bound by all of the following terms, please do
              not access or use the Green Cure website.
            </p>

            <h2 className="gcContentAccent6p text-gcPrimary-1000 mb-4">2. Use of Our Services</h2>
            <p className="mb-4 gcContentBody3p">
              <strong className={"gcHeading4p text-gcPrimary-1000"}>Eligibility:</strong> You must be at least 18 years old or have the consent of a parent or legal guardian to use Green Cure.
            </p>
            <p className="mb-4 gcContentBody3p">
              <strong className={"gcHeading4p text-gcPrimary-1000"}>Account Creation:</strong> When creating an account, you agree to provide accurate, current, and complete information. You are responsible for maintaining the
              confidentiality of your account information and password.
            </p>
            <p className="mb-4 gcContentBody3p">
              <strong className={"gcHeading4p text-gcPrimary-1000"}>Prohibited Activities:</strong> You agree not to misuse the services of Green Cure, including but not limited to:
            </p>
            <ul className="gcContentBody3p list-disc list-inside mb-4">
              <li>Engaging in any illegal or unauthorized activity.</li>
              <li>{`Attempting to gain unauthorized access to our systems or another user's account.`}</li>
              <li>Uploading or distributing any harmful or malicious software.</li>
            </ul>

            <h2 className="gcContentAccent6p text-gcPrimary-1000 mb-4">3. Content and Intellectual Property</h2>
            <p className="mb-4 gcContentBody3p">
              All content on the Green Cure website, including text, graphics, logos, and software, is the property of Green Cure or its licensors and is protected by copyright and intellectual property laws.
            </p>
            <p className="mb-4 gcContentBody3p">{`You may not reproduce, distribute, or exploit any part of the website's content without our express written permission.`}</p>
            <p className="mb-4 gcContentBody3p">
              You retain ownership of any data or content you provide to Green Cure, but by submitting it, you grant us a worldwide, royalty-free, and non-exclusive license to use, distribute, modify, and display it in connection with
              providing our services.
            </p>

            <h2 className="gcContentAccent6p text-gcPrimary-1000 mb-4">4. Health Information Disclaimer</h2>
            <p className="mb-4 gcContentBody3p">Green Cure provides information for general health and wellness purposes only. Any health-related content is not intended to replace professional medical advice, diagnosis, or treatment.</p>
            <p className="mb-4 gcContentBody3p">Always seek the advice of your physician or qualified healthcare provider before making any decisions based on the information provided by Green Cure.</p>

            <h2 className="gcContentAccent6p text-gcPrimary-1000 mb-4">5. Limitation of Liability</h2>
            <p className="mb-4 gcContentBody3p">{`Green Cure is provided on an "as is" and "as available" basis without any warranties, express or implied.`}</p>
            <p className="mb-4 gcContentBody3p">We do not guarantee that the website will be error-free, uninterrupted, or free of harmful components.</p>
            <p className="mb-4 gcContentBody3p">
              Green Cure and its affiliates, officers, directors, and employees shall not be liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use the services.
            </p>

            <h2 className="gcContentAccent6p text-gcPrimary-1000 mb-4">6. Changes to the Terms</h2>
            <p className="mb-4 gcContentBody3p">
              Green Cure reserves the right to update or modify these Terms and Conditions at any time without prior notice. We will notify users of any material changes by posting the updated terms on our website. Continued use of the
              website after such modifications constitutes your acceptance of the revised terms.
            </p>

            <h2 className="gcContentAccent6p text-gcPrimary-1000 mb-4">7. Termination</h2>
            <p className="mb-4 gcContentBody3p">We reserve the right to suspend or terminate your access to the Green Cure website at any time, without prior notice or liability, for any reason, including breach of these terms.</p>

            <h2 className="gcContentAccent6p text-gcPrimary-1000 mb-4">8. Governing Law</h2>
            <p className="mb-4 gcContentBody3p">
              These Terms and Conditions are governed by and construed in accordance with the laws of Indonesia, and you agree to submit to the exclusive jurisdiction of the courts in that jurisdiction for any disputes arising out of or
              relating to the use of Green Cure.
            </p>

            <h2 className="gcContentAccent6p text-gcPrimary-1000 mb-4">9. Contact Us</h2>
            <p className="mb-4 gcContentBody3p">If you have any questions or concerns regarding these Terms and Conditions, please contact us at:</p>
            <p className="mb-4 gcContentBody3p">
              <strong className={"gcHeading4p text-gcPrimary-1000"}>Green Cure Support</strong>
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
