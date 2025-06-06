"use client";

import Navbar from "../../../../components/Navbar";
import Footer from "../../../../components/Footer";
import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section
        className="hero-wrap hero-wrap-2 js-fullheight"
        style={{ backgroundImage: "url('/images/privacy.jpg')" }}
        data-stellar-background-ratio="0.5"
      >
        <div className="overlay"></div>
        <div className="container">
          <div className="row no-gutters slider-text js-fullheight align-items-end justify-content-start">
            <div className="col-md-9 animate__animated animate__fadeIn pb-5">
              <p className="breadcrumbs">
                <span className="mr-2">
                  <Link href="/">
                    Home <i className="ion-ios-arrow-forward"></i>
                  </Link>
                </span>
                <span>
                  Privacy Policy <i className="ion-ios-arrow-forward"></i>
                </span>
              </p>
              <h1 className="mb-3 bread text-white">Privacy Policy</h1>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy Policy Content */}
      <section className="ftco-section bg-light py-5">
        <div className="container">
          {/* Introduction */}
          <div className="row justify-content-center mb-5">
            <div className="col-md-8 text-center">
              <h2 className="mb-4">Privacy Policy</h2>
              <p className="text-muted">
                <strong>June 2025</strong>
              </p>
              <p className="lead text-dark">
                At <strong>Express Postals</strong>, we value your privacy and are committed to
                protecting your personal information. This Privacy Policy outlines how we collect,
                use, and share your data when you visit our website or use our services.
              </p>
            </div>
          </div>

          {/* Section 1: Information We Collect */}
          <div className="row mb-4">
            <div className="col-md-12">
              <div className="card shadow-sm border-0 mb-4">
                <div className="card-body">
                  <h3 className="card-title mb-3">1. Information We Collect</h3>
                  <p className="text-dark">
                    We may collect the following types of information:
                  </p>
                  <h5 className="mt-4 text-primary">1.1. Personal Information</h5>
                  <ul className="pl-4 list-unstyled">
                    <li className="mb-1">• Name</li>
                    <li className="mb-1">• Email address</li>
                    <li className="mb-1">• Phone number</li>
                    <li className="mb-1">• Billing and shipping addresses</li>
                    <li className="mb-1">• Payment information (e.g., credit card details)</li>
                  </ul>
                  <h5 className="mt-4 text-primary">1.2. Non-Personal Information</h5>
                  <ul className="pl-4 list-unstyled">
                    <li className="mb-1">• IP address</li>
                    <li className="mb-1">• Browser type and version</li>
                    <li className="mb-1">• Device information</li>
                    <li className="mb-1">• Pages visited and time spent on the Site</li>
                    <li className="mb-1">• Referring website or search engine</li>
                  </ul>
                  <h5 className="mt-4 text-primary">1.3. Cookies and Tracking Technologies</h5>
                  <p className="text-dark">
                    We use cookies and similar technologies to enhance your experience on our Site.
                    Cookies are small files stored on your device that help us analyze website traffic
                    and improve our Services.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: How We Use Your Information */}
          <div className="row mb-4">
            <div className="col-md-12">
              <div className="card shadow-sm border-0 mb-4">
                <div className="card-body">
                  <h3 className="card-title mb-3">2. How We Use Your Information</h3>
                  <p className="text-dark">
                    We use the information we collect for the following purposes:
                  </p>
                  <ul className="pl-4 list-unstyled">
                    <li className="mb-1">• To process and fulfill your orders</li>
                    <li className="mb-1">• To provide real-time shipment tracking</li>
                    <li className="mb-1">• To communicate with you about your orders, inquiries, or support requests</li>
                    <li className="mb-1">• To improve our Site, Services, and user experience</li>
                    <li className="mb-1">• To comply with legal obligations</li>
                    <li className="mb-1">• To send promotional emails or newsletters (you can opt out at any time)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: How We Share Your Information */}
          <div className="row mb-4">
            <div className="col-md-12">
              <div className="card shadow-sm border-0 mb-4">
                <div className="card-body">
                  <h3 className="card-title mb-3">3. How We Share Your Information</h3>
                  <p className="text-dark">
                    We do not sell or rent your personal information to third parties. However, we may share
                    your information with:
                  </p>
                  <h5 className="mt-4 text-primary">3.1. Service Providers</h5>
                  <p className="text-dark">
                    We may share your information with trusted third-party service providers who assist us in operating
                    our business, such as:
                  </p>
                  <ul className="pl-4 list-unstyled">
                    <li className="mb-1">• Payment processors</li>
                    <li className="mb-1">• Shipping and logistics partners</li>
                    <li className="mb-1">• IT and hosting providers</li>
                  </ul>
                  <h5 className="mt-4 text-primary">3.2. Legal Compliance</h5>
                  <p className="text-dark">
                    We may disclose your information if required to do so by law or if we believe such action is necessary to:
                  </p>
                  <ul className="pl-4 list-unstyled">
                    <li className="mb-1">• Comply with legal obligations</li>
                    <li className="mb-1">• Protect and defend our rights or property</li>
                    <li className="mb-1">• Prevent fraud or abuse</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Section 4: Data Security */}
          <div className="row mb-4">
            <div className="col-md-12">
              <div className="card shadow-sm border-0 mb-4">
                <div className="card-body">
                  <h3 className="card-title mb-3">4. Data Security</h3>
                  <p className="text-dark">
                    We implement industry-standard security measures to protect your personal information, including:
                  </p>
                  <ul className="pl-4 list-unstyled">
                    <li className="mb-1">• Encryption of sensitive data (e.g., payment information)</li>
                    <li className="mb-1">• Secure servers and firewalls</li>
                    <li className="mb-1">• Regular security audits and updates</li>
                  </ul>
                  <p className="mt-3 text-dark">
                    However, no method of transmission over the internet or electronic storage is 100% secure.
                    While we strive to protect your data, we cannot guarantee absolute security.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 5: Your Rights */}
          <div className="row mb-4">
            <div className="col-md-12">
              <div className="card shadow-sm border-0 mb-4">
                <div className="card-body">
                  <h3 className="card-title mb-3">5. Your Rights</h3>
                  <p className="text-dark">
                    Depending on your location, you may have the following rights regarding your personal information:
                  </p>
                  <h5 className="mt-4 text-primary">5.1. Access and Correction</h5>
                  <p className="text-dark">
                    You have the right to access the personal information we hold about you and request corrections if it is inaccurate or incomplete.
                  </p>
                  <h5 className="mt-4 text-primary">5.2. Data Deletion</h5>
                  <p className="text-dark">
                    You may request that we delete your personal information, subject to legal and contractual obligations.
                  </p>
                  <h5 className="mt-4 text-primary">5.3. Opt-Out</h5>
                  <p className="text-dark">
                    You can opt out of receiving promotional emails by clicking the “unsubscribe” link in our emails or contacting us directly.
                  </p>
                  <h5 className="mt-4 text-primary">5.4. Data Portability</h5>
                  <p className="text-dark">
                    You may request a copy of your personal information in a structured, machine-readable format.
                  </p>
                  <p className="mt-3">
                    To exercise these rights, please contact us at <a href="mailto:help@expresspostals.com">help@expresspostals.com</a>.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 6: Cookies and Tracking */}
          <div className="row mb-4">
            <div className="col-md-12">
              <div className="card shadow-sm border-0 mb-4">
                <div className="card-body">
                  <h3 className="card-title mb-3">6. Cookies and Tracking</h3>
                  <p className="text-dark">We use cookies to:</p>
                  <ul className="pl-4 list-unstyled">
                    <li className="mb-1">• Analyze website traffic and usage</li>
                    <li className="mb-1">• Remember your preferences</li>
                    <li className="mb-1">• Provide personalized content and advertisements</li>
                  </ul>
                  <p className="mt-3 text-dark">
                    You can manage your cookie preferences through your browser settings. Note that disabling cookies may affect the functionality of our Site.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 7: Third-Party Links */}
          <div className="row mb-4">
            <div className="col-md-12">
              <div className="card shadow-sm border-0 mb-4">
                <div className="card-body">
                  <h3 className="card-title mb-3">7. Third-Party Links</h3>
                  <p className="text-dark">
                    Our Site may contain links to third-party websites. We are not responsible for the privacy practices or content of these websites.
                    We encourage you to review their privacy policies before providing any personal information.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 8: Children's Privacy */}
          <div className="row mb-4">
            <div className="col-md-12">
              <div className="card shadow-sm border-0 mb-4">
                <div className="card-body">
                  <h3 className="card-title mb-3">8. Children's Privacy</h3>
                  <p className="text-dark">
                    Our Site and Services are not intended for children under the age of 13. We do not knowingly collect personal information from children.
                    If you believe we have collected information from a child, please contact us immediately at <a href="mailto:help@expresspostals.com">help@expresspostals.com</a>.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 9: Changes to This Privacy Policy */}
          <div className="row mb-4">
            <div className="col-md-12">
              <div className="card shadow-sm border-0 mb-4">
                <div className="card-body">
                  <h3 className="card-title mb-3">9. Changes to This Privacy Policy</h3>
                  <p className="text-dark">
                    We may update this Privacy Policy from time to time. Any changes will be posted on this page with the updated effective date.
                    We encourage you to review this Privacy Policy periodically to stay informed about how we protect your information.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 10: Contact Us */}
          <div className="row">
            <div className="col-md-12">
              <div className="card shadow-sm border-0 mb-4">
                <div className="card-body">
                  <h3 className="card-title mb-3">10. Contact Us</h3>
                  <p className="text-dark">
                    If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at:
                  </p>
                  <p className="text-dark">
                    <strong>Express Postals</strong>
                    <br />
                    310 7th Ave South Charleston, WV 25303
                    <br />
                    Phone: <a href="tel:+12233078767">+1 223-307-8767</a>
                    <br />
                    Email: <a href="mailto:help@expresspostals.com">help@expresspostals.com</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* Scoped CSS */}
      <style jsx>{`
        .hero-wrap {
          position: relative;
        }
        .hero-wrap .overlay {
          background: rgba(0, 0, 0, 0.5);
        }
        .hero-wrap h1.bread {
          font-size: 3rem;
        }
        .ftco-section h2 {
          font-weight: 700;
        }
        .card-title {
          color: #333;
          font-weight: 600;
          border-left: 4px solid #fc983c;
          padding-left: 0.75rem;
        }
        .card-body p,
        .card-body ul {
          font-size: 0.95rem;
          color: #555;
        }
        .card-body ul li {
          margin-bottom: 0.5rem;
        }
        .card-body h5 {
          font-weight: 600;
          color: #007bff;
        }
        .breadcrumbs a,
        .breadcrumbs span {
          color: #fff;
        }
        .breadcrumbs i {
          margin-left: 0.25rem;
        }
      `}</style>
    </>
  );
}
