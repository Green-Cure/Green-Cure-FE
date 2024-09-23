"use client";

import React from "react";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

export default function CookiePolicy() {
  return (
    <>
      <div className="bg-gradient-to-br from-gcNeutrals-baseWhite to-gcPrimary-basePrimary">
        <Navbar />
        <section className="pt-16 flex md:flex-row flex-col gap-10 px-6">
          <div className="max-w-4xl mx-auto p-6 bg-gcNeutrals-baseWhite shadow-lg mt-10 rounded-lg">
            <h1 className="gcHeading3p mb-6 text-gcPrimary-600">Cookie Policy for Green Cure</h1>

            <p className="mb-4 gcContentBody3p">
              This is the Cookie Policy for <strong className={"gcHeading4p text-gcPrimary-1000"}>Green Cure</strong>, accessible from our website. This policy explains what cookies are, how we use them, and your choices regarding cookies.
            </p>

            <h2 className="gcContentAccent6p text-gcPrimary-1000 mb-4">1. What Are Cookies?</h2>
            <p className="mb-4 gcContentBody3p">
              {`Cookies are small text files that are stored on your device when you visit websites. They help the website remember your preferences and actions over time, so you don't have to re-enter them whenever you return to the site.`}
            </p>

            <h2 className="gcContentAccent6p text-gcPrimary-1000 mb-4">2. How We Use Cookies</h2>
            <p className="mb-4 gcContentBody3p">We use cookies for various purposes, including:</p>
            <ul className="gcContentBody3p list-disc list-inside mb-4">
              <li>
                <strong className={"gcHeading4p text-gcPrimary-1000"}>Essential Cookies:</strong> These are necessary for the proper functioning of our website.
              </li>
              <li>
                <strong className={"gcHeading4p text-gcPrimary-1000"}>Performance Cookies:</strong> These cookies help us understand how visitors interact with our website, allowing us to improve its performance.
              </li>
              <li>
                <strong className={"gcHeading4p text-gcPrimary-1000"}>Functionality Cookies:</strong> These cookies allow the website to remember choices you have made in the past, such as your language or preferences.
              </li>
              <li>
                <strong className={"gcHeading4p text-gcPrimary-1000"}>Advertising Cookies:</strong> These cookies are used to deliver ads that are more relevant to you and your interests.
              </li>
            </ul>

            <h2 className="gcContentAccent6p text-gcPrimary-1000 mb-4">3. Types of Cookies We Use</h2>
            <p className="mb-4 gcContentBody3p">The cookies we use can be categorized as follows:</p>
            <ul className="gcContentBody3p list-disc list-inside mb-4">
              <li>
                <strong className={"gcHeading4p text-gcPrimary-1000"}>Session Cookies:</strong> These cookies are temporary and are erased when you close your browser.
              </li>
              <li>
                <strong className={"gcHeading4p text-gcPrimary-1000"}>Persistent Cookies:</strong> These remain on your device for a set period of time or until you manually delete them.
              </li>
              <li>
                <strong className={"gcHeading4p text-gcPrimary-1000"}>First-party Cookies:</strong> These are set by our website and can only be read by us.
              </li>
              <li>
                <strong className={"gcHeading4p text-gcPrimary-1000"}>Third-party Cookies:</strong> These are set by third-party services that we use, such as Google Analytics or advertisers.
              </li>
            </ul>

            <h2 className="gcContentAccent6p text-gcPrimary-1000 mb-4">4. Managing Cookies</h2>
            <p className="mb-4 gcContentBody3p">You can manage or delete cookies at any time by adjusting your browser settings. However, please note that disabling certain types of cookies may affect your experience on our website.</p>
            <p className="mb-4 gcContentBody3p">{`Here's how to manage cookies on popular browsers:`}</p>
            <ul className="gcContentBody3p list-disc list-inside mb-4">
              <li>
                <a href="https://support.google.com/chrome/answer/95647?hl=en" target="_blank" className="text-gcPrimary-600 underline">
                  Google Chrome
                </a>
              </li>
              <li>
                <a href="https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences" target="_blank" className="text-gcPrimary-600 underline">
                  Mozilla Firefox
                </a>
              </li>
              <li>
                <a href="https://support.apple.com/en-us/HT201265" target="_blank" className="text-gcPrimary-600 underline">
                  Apple Safari
                </a>
              </li>
              <li>
                <a href="https://support.microsoft.com/en-us/help/17442/windows-internet-explorer-delete-manage-cookies" target="_blank" className="text-gcPrimary-600 underline">
                  Microsoft Internet Explorer
                </a>
              </li>
            </ul>

            <h2 className="gcContentAccent6p text-gcPrimary-1000 mb-4">5. Third-party Cookies</h2>
            <p className="mb-4 gcContentBody3p">
              We may also allow third-party services to place cookies on your device through our website. These cookies are subject to the respective privacy policies of these third parties. For example, we use Google Analytics to help us
              understand how users engage with our website, and it sets cookies to track your activity on our site.
            </p>

            <h2 className="gcContentAccent6p text-gcPrimary-1000 mb-4">6. Changes to This Cookie Policy</h2>
            <p className="mb-4 gcContentBody3p">
              We may update this Cookie Policy from time to time to reflect changes in technology, legislation, or our operations. Any changes will be posted on this page, and your continued use of our website after any modifications
              constitutes your acceptance of the updated policy.
            </p>

            <h2 className="gcContentAccent6p text-gcPrimary-1000 mb-4">7. Contact Us</h2>
            <p className="mb-4 gcContentBody3p">If you have any questions about this Cookie Policy, please contact us at:</p>
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
