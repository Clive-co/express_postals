"use client";

// Extend the Window interface to include the bootstrap property
declare global {
  interface Window {
    bootstrap?: {
      Collapse: new (element: HTMLElement, options?: { toggle?: boolean }) => { show: () => void };
    };
  }
}

import { useEffect } from "react";
import Navbar from "../../../../components/Navbar";
import Footer from "../../../../components/Footer";
import Link from "next/link";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

export default function TermsAndConditions() {
  useEffect(() => {
    const tocLinks = document.querySelectorAll<HTMLAnchorElement>(
      'a[href^="#section-"]'
    );

    tocLinks.forEach((link) => {
      const handler = (e: MouseEvent) => {
        e.preventDefault();
        const href = link.getAttribute("href")!;
        const targetId = href.substring(1);
        const parts = targetId.split("-");
        const num = parts[parts.length - 1];

        const collapseElem = document.getElementById(`collapse-${num}`);
        const sectionElem = document.getElementById(targetId);

        const hasBootstrapCollapse =
          typeof window.bootstrap !== "undefined" &&
          typeof window.bootstrap.Collapse === "function";

        if (
          hasBootstrapCollapse &&
          collapseElem &&
          !collapseElem.classList.contains("show")
        ) {
          // @ts-ignore
          const bsCollapse = new window.bootstrap.Collapse(collapseElem, {
            toggle: false,
          });
          bsCollapse.show();

          collapseElem.addEventListener(
            "shown.bs.collapse",
            () => {
              sectionElem?.scrollIntoView({ behavior: "smooth", block: "start" });
            },
            { once: true }
          );
        } else {
          sectionElem?.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      };

      link.addEventListener("click", handler);
      link.dataset["handlerAttached"] = "true";
    });

    return () => {
      tocLinks.forEach((link) => {
        if (link.dataset["handlerAttached"] === "true") {
          link.replaceWith(link.cloneNode(true));
        }
      });
    };
  }, []);

  return (
    <>
      <Navbar />

      {/* ─── Hero Section ───────────────────────────────────────────────────── */}
      <section
        className="hero-wrap hero-wrap-2 js-fullheight"
        style={{ backgroundImage: "url('/images/terms.jpg')" }}
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
                  Terms and Conditions <i className="ion-ios-arrow-forward"></i>
                </span>
              </p>
              <h1 className="mb-3 bread">Terms and Conditions</h1>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Terms and Conditions Section ───────────────────────────────────── */}
      <section className="ftco-section bg-light py-5">
        <div className="container">
          {/* ─── Page Intro ────────────────────────────────────────────────── */}
          <div className="row justify-content-center mb-5">
            <div className="col-md-8 text-center">
              <p className="text-muted">
               June 2025
              </p>
              <p>
                Welcome to <strong>Express Postals</strong>. By accessing or using our
                website and services, you agree to comply with and be bound by the following
                terms and conditions. If you do not agree to these Terms, please discontinue
                use immediately.
              </p>
            </div>
          </div>

          <div className="row">
            {/* ─── TOC SIDEBAR for Desktop ──────────────────────────────────── */}
            <aside className="col-lg-3 d-none d-lg-block">
              <div className="card sticky-top border-0 shadow-sm" style={{ top: "100px" }}>
                <div className="card-body">
                  <h6 className="text-uppercase text-secondary mb-3">On this page</h6>
                  <nav className="nav flex-column">
                    <a href="#section-1" className="nav-link py-1 text-dark">
                      1. Introduction
                    </a>
                    <a href="#section-2" className="nav-link py-1 text-dark">
                      2. Services
                    </a>
                    <a href="#section-3" className="nav-link py-1 text-dark">
                      3. User Responsibilities
                    </a>
                    <a href="#section-4" className="nav-link py-1 text-dark">
                      4. Payment Terms
                    </a>
                    <a href="#section-5" className="nav-link py-1 text-dark">
                      5. Shipping and Delivery
                    </a>
                    <a href="#section-6" className="nav-link py-1 text-dark">
                      6. Tracking
                    </a>
                    <a href="#section-7" className="nav-link py-1 text-dark">
                      7. Liability
                    </a>
                    <a href="#section-8" className="nav-link py-1 text-dark">
                      8. Cancellations and Refunds
                    </a>
                    <a href="#section-9" className="nav-link py-1 text-dark">
                      9. Intellectual Property
                    </a>
                    <a href="#section-10" className="nav-link py-1 text-dark">
                      10. Privacy
                    </a>
                    <a href="#section-11" className="nav-link py-1 text-dark">
                      11. Termination
                    </a>
                    <a href="#section-12" className="nav-link py-1 text-dark">
                      12. Governing Law
                    </a>
                    <a href="#section-13" className="nav-link py-1 text-dark">
                      13. Changes to Terms
                    </a>
                    <a href="#section-14" className="nav-link py-1 text-danger">
                      14. Contact Us
                    </a>
                  </nav>
                </div>
              </div>
            </aside>

            {/* ─── Main Content (including mobile TOC) ──────────────────────── */}
            <div className="col-lg-9">
              {/* ─── Mobile TOC Collapse ────────────────────────────────────── */}
              <div className="d-lg-none mb-4">
                <button
                  className="btn btn-outline-warning w-100"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#mobileToc"
                  aria-expanded="false"
                >
                  Table of Contents
                </button>
                <div className="collapse mt-2" id="mobileToc">
                  <nav className="nav flex-column">
                    <a href="#section-1" className="nav-link py-1 ps-3">
                      1. Introduction
                    </a>
                    <a href="#section-2" className="nav-link py-1 ps-3">
                      2. Services
                    </a>
                    <a href="#section-3" className="nav-link py-1 ps-3">
                      3. User Responsibilities
                    </a>
                    <a href="#section-4" className="nav-link py-1 ps-3">
                      4. Payment Terms
                    </a>
                    <a href="#section-5" className="nav-link py-1 ps-3">
                      5. Shipping and Delivery
                    </a>
                    <a href="#section-6" className="nav-link py-1 ps-3">
                      6. Tracking
                    </a>
                    <a href="#section-7" className="nav-link py-1 ps-3">
                      7. Liability
                    </a>
                    <a href="#section-8" className="nav-link py-1 ps-3">
                      8. Cancellations and Refunds
                    </a>
                    <a href="#section-9" className="nav-link py-1 ps-3">
                      9. Intellectual Property
                    </a>
                    <a href="#section-10" className="nav-link py-1 ps-3">
                      10. Privacy
                    </a>
                    <a href="#section-11" className="nav-link py-1 ps-3">
                      11. Termination
                    </a>
                    <a href="#section-12" className="nav-link py-1 ps-3">
                      12. Governing Law
                    </a>
                    <a href="#section-13" className="nav-link py-1 ps-3">
                      13. Changes to Terms
                    </a>
                    <a href="#section-14" className="nav-link py-1 ps-3 text-danger">
                      14. Contact Us
                    </a>
                  </nav>
                </div>
              </div>

              {/* ─── Accordion Sections ──────────────────────────────────────── */}
              <div className="accordion" id="termsAccordion">
                {/* Section 1 */}
                <div className="accordion-item mb-3" id="section-1">
                  <h2 className="accordion-header" id="heading-1">
                    <button
                      className="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapse-1"
                      aria-expanded="true"
                      aria-controls="collapse-1"
                    >
                      1. Introduction
                    </button>
                  </h2>
                  <div
                    id="collapse-1"
                    className="accordion-collapse collapse show"
                    aria-labelledby="heading-1"
                    data-bs-parent="#termsAccordion"
                  >
                    <div className="accordion-body">
                      <p>
                        <strong>1.1.</strong> These Terms govern your use of the Site and
                        Services provided by Express Postals, including but not limited to
                        logistics, shipping, and delivery solutions.
                      </p>
                      <p>
                        <strong>1.2.</strong> By using our Site or Services, you confirm
                        that you are at least 18 years old or have the consent of a legal
                        guardian.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Section 2 */}
                <div className="accordion-item mb-3" id="section-2">
                  <h2 className="accordion-header" id="heading-2">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapse-2"
                      aria-expanded="false"
                      aria-controls="collapse-2"
                    >
                      2. Services
                    </button>
                  </h2>
                  <div
                    id="collapse-2"
                    className="accordion-collapse collapse"
                    aria-labelledby="heading-2"
                    data-bs-parent="#termsAccordion"
                  >
                    <div className="accordion-body">
                      <p>
                        <strong>2.1.</strong> Express Postals provides logistics and
                        delivery services, including but not limited to real‐time
                        tracking, secure handling, and 24/7 customer support.
                      </p>
                      <p>
                        <strong>2.2.</strong> All shipments are subject to availability and
                        operational feasibility.
                      </p>
                      <p>
                        <strong>2.3.</strong> We reserve the right to refuse service to
                        anyone for any reason at any time.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Section 3 */}
                <div className="accordion-item mb-3" id="section-3">
                  <h2 className="accordion-header" id="heading-3">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapse-3"
                      aria-expanded="false"
                      aria-controls="collapse-3"
                    >
                      3. User Responsibilities
                    </button>
                  </h2>
                  <div
                    id="collapse-3"
                    className="accordion-collapse collapse"
                    aria-labelledby="heading-3"
                    data-bs-parent="#termsAccordion"
                  >
                    <div className="accordion-body">
                      <p>
                        <strong>3.1.</strong> You agree to provide accurate and complete
                        information when placing an order or using our Services.
                      </p>
                      <p>
                        <strong>3.2.</strong> You are responsible for ensuring that the
                        contents of your shipment comply with all applicable laws and
                        regulations.
                      </p>
                      <p>
                        <strong>3.3.</strong> Prohibited items include, but are not limited
                        to:
                      </p>
                      <ul className="mb-0 ps-3">
                        <li>Hazardous materials</li>
                        <li>Illegal substances</li>
                        <li>Perishable goods (unless explicitly agreed upon)</li>
                        <li>Items restricted by local, national, or international laws</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Section 4 */}
                <div className="accordion-item mb-3" id="section-4">
                  <h2 className="accordion-header" id="heading-4">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapse-4"
                      aria-expanded="false"
                      aria-controls="collapse-4"
                    >
                      4. Payment Terms
                    </button>
                  </h2>
                  <div
                    id="collapse-4"
                    className="accordion-collapse collapse"
                    aria-labelledby="heading-4"
                    data-bs-parent="#termsAccordion"
                  >
                    <div className="accordion-body">
                      <p>
                        <strong>4.1.</strong> All payments must be made in full at the time
                        of placing an order unless otherwise agreed upon.
                      </p>
                      <p>
                        <strong>4.2.</strong> We accept payment via [list payment methods,
                        e.g., credit card, PayPal, etc.].
                      </p>
                      <p>
                        <strong>4.3.</strong> Failure to make payment may result in the
                        cancellation of your order.
                      </p>
                      <p>
                        <strong>4.4.</strong> All fees are non‐refundable unless explicitly
                        stated otherwise.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Section 5 */}
                <div className="accordion-item mb-3" id="section-5">
                  <h2 className="accordion-header" id="heading-5">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapse-5"
                      aria-expanded="false"
                      aria-controls="collapse-5"
                    >
                      5. Shipping and Delivery
                    </button>
                  </h2>
                  <div
                    id="collapse-5"
                    className="accordion-collapse collapse"
                    aria-labelledby="heading-5"
                    data-bs-parent="#termsAccordion"
                  >
                    <div className="accordion-body">
                      <p>
                        <strong>5.1.</strong> Delivery timelines are estimates and may
                        vary due to unforeseen circumstances, including but not limited to
                        weather, customs delays, or operational issues.
                      </p>
                      <p>
                        <strong>5.2.</strong> Express Postals is not liable for delays
                        caused by factors beyond our control.
                      </p>
                      <p>
                        <strong>5.3.</strong> You are responsible for ensuring that the
                        recipient is available to receive the shipment at the specified
                        delivery address.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Section 6 */}
                <div className="accordion-item mb-3" id="section-6">
                  <h2 className="accordion-header" id="heading-6">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapse-6"
                      aria-expanded="false"
                      aria-controls="collapse-6"
                    >
                      6. Tracking
                    </button>
                  </h2>
                  <div
                    id="collapse-6"
                    className="accordion-collapse collapse"
                    aria-labelledby="heading-6"
                    data-bs-parent="#termsAccordion"
                  >
                    <div className="accordion-body">
                      <p>
                        <strong>6.1.</strong> Our real‐time tracking feature allows you to
                        monitor the status of your shipment.
                      </p>
                      <p>
                        <strong>6.2.</strong> Tracking information is provided for convenience
                        and may not always reflect the exact location or status of your
                        shipment.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Section 7 */}
                <div className="accordion-item mb-3" id="section-7">
                  <h2 className="accordion-header" id="heading-7">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapse-7"
                      aria-expanded="false"
                      aria-controls="collapse-7"
                    >
                      7. Liability
                    </button>
                  </h2>
                  <div
                    id="collapse-7"
                    className="accordion-collapse collapse"
                    aria-labelledby="heading-7"
                    data-bs-parent="#termsAccordion"
                  >
                    <div className="accordion-body">
                      <p>
                        <strong>7.1.</strong> Express Postals is not liable for:
                      </p>
                      <ul className="mb-0 ps-3">
                        <li>
                          Loss or damage to shipments caused by improper packaging or
                          labeling by the sender.
                        </li>
                        <li>
                          Delays or failures caused by events beyond our reasonable
                          control, including but not limited to natural disasters, strikes,
                          or government actions.
                        </li>
                      </ul>
                      <p>
                        <strong>7.2.</strong> Our liability for loss or damage to shipments
                        is limited to the declared value of the shipment or the maximum
                        liability permitted by applicable law, whichever is lower.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Section 8 */}
                <div className="accordion-item mb-3" id="section-8">
                  <h2 className="accordion-header" id="heading-8">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapse-8"
                      aria-expanded="false"
                      aria-controls="collapse-8"
                    >
                      8. Cancellations and Refunds
                    </button>
                  </h2>
                  <div
                    id="collapse-8"
                    className="accordion-collapse collapse"
                    aria-labelledby="heading-8"
                    data-bs-parent="#termsAccordion"
                  >
                    <div className="accordion-body">
                      <p>
                        <strong>8.1.</strong> Orders may be canceled prior to shipment. Once
                        the shipment is in transit, cancellations are not permitted.
                      </p>
                      <p>
                        <strong>8.2.</strong> Refunds will only be issued in cases where
                        Express Postals is at fault, such as failure to deliver due to
                        operational errors.
                      </p>
                      <p>
                        <strong>8.3.</strong> Refund requests must be submitted within
                        [insert time frame, e.g., 14 days] of the issue.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Section 9 */}
                <div className="accordion-item mb-3" id="section-9">
                  <h2 className="accordion-header" id="heading-9">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapse-9"
                      aria-expanded="false"
                      aria-controls="collapse-9"
                    >
                      9. Intellectual Property
                    </button>
                  </h2>
                  <div
                    id="collapse-9"
                    className="accordion-collapse collapse"
                    aria-labelledby="heading-9"
                    data-bs-parent="#termsAccordion"
                  >
                    <div className="accordion-body">
                      <p>
                        <strong>9.1.</strong> All content on the Site, including but not
                        limited to text, graphics, logos, and images, is the property of
                        Express Postals or its licensors and is protected by copyright and
                        trademark laws.
                      </p>
                      <p>
                        <strong>9.2.</strong> You may not reproduce, distribute, or use any
                        content from the Site without prior written permission.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Section 10 */}
                <div className="accordion-item mb-3" id="section-10">
                  <h2 className="accordion-header" id="heading-10">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapse-10"
                      aria-expanded="false"
                      aria-controls="collapse-10"
                    >
                      10. Privacy
                    </button>
                  </h2>
                  <div
                    id="collapse-10"
                    className="accordion-collapse collapse"
                    aria-labelledby="heading-10"
                    data-bs-parent="#termsAccordion"
                  >
                    <div className="accordion-body">
                      <p>
                        <strong>10.1.</strong> Your use of the Site and Services is subject to
                        our Privacy Policy.
                      </p>
                      <p>
                        <strong>10.2.</strong> By using our Services, you consent to the
                        collection, use, and sharing of your information as described in the
                        Privacy Policy.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Section 11 */}
                <div className="accordion-item mb-3" id="section-11">
                  <h2 className="accordion-header" id="heading-11">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapse-11"
                      aria-expanded="false"
                      aria-controls="collapse-11"
                    >
                      11. Termination
                    </button>
                  </h2>
                  <div
                    id="collapse-11"
                    className="accordion-collapse collapse"
                    aria-labelledby="heading-11"
                    data-bs-parent="#termsAccordion"
                  >
                    <div className="accordion-body">
                      <p>
                        <strong>11.1.</strong> We reserve the right to terminate or suspend
                        your access to the Site or Services at our sole discretion, without
                        notice, for conduct that we believe violates these Terms or is
                        harmful to Express Postals or other users.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Section 12 */}
                <div className="accordion-item mb-3" id="section-12">
                  <h2 className="accordion-header" id="heading-12">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapse-12"
                      aria-expanded="false"
                      aria-controls="collapse-12"
                    >
                      12. Governing Law
                    </button>
                  </h2>
                  <div
                    id="collapse-12"
                    className="accordion-collapse collapse"
                    aria-labelledby="heading-12"
                    data-bs-parent="#termsAccordion"
                  >
                    <div className="accordion-body">
                      <p>
                        <strong>12.1.</strong> These Terms are governed by and construed in
                        accordance with the laws of [insert jurisdiction].
                      </p>
                      <p>
                        <strong>12.2.</strong> Any disputes arising from these Terms or your
                        use of the Site or Services will be resolved exclusively in the
                        courts of [insert jurisdiction].
                      </p>
                    </div>
                  </div>
                </div>

                {/* Section 13 */}
                <div className="accordion-item mb-3" id="section-13">
                  <h2 className="accordion-header" id="heading-13">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapse-13"
                      aria-expanded="false"
                      aria-controls="collapse-13"
                    >
                      13. Changes to Terms
                    </button>
                  </h2>
                  <div
                    id="collapse-13"
                    className="accordion-collapse collapse"
                    aria-labelledby="heading-13"
                    data-bs-parent="#termsAccordion"
                  >
                    <div className="accordion-body">
                      <p>
                        <strong>13.1.</strong> We reserve the right to update or modify these
                        Terms at any time without prior notice.
                      </p>
                      <p>
                        <strong>13.2.</strong> Your continued use of the Site or Services
                        after any changes to the Terms constitutes your acceptance of the
                        revised Terms.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Section 14 */}
                <div className="accordion-item mb-3" id="section-14">
                  <h2 className="accordion-header" id="heading-14">
                    <button
                      className="accordion-button collapsed d-flex align-items-center"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapse-14"
                      aria-expanded="false"
                      aria-controls="collapse-14"
                      style={{
                        backgroundColor: "#fc983c",
                        color: "#fff",
                        fontSize: "1.1rem",
                      }}
                    >
                      14. Contact Us
                    </button>
                  </h2>
                  <div
                    id="collapse-14"
                    className="accordion-collapse collapse"
                    aria-labelledby="heading-14"
                    data-bs-parent="#termsAccordion"
                  >
                    <div
                      className="accordion-body"
                      style={{
                        backgroundColor: "#fff",
                        border: "1px solid #fc983c",
                        borderTop: "none",
                        borderRadius: "0 0 0.25rem 0.25rem",
                        padding: "1.5rem",
                      }}
                    >
                      <p className="mb-3">
                        If you have any questions or concerns about these Terms, please reach out:
                      </p>
                      <ul className="list-unstyled">
                        <li className="mb-2">
                          <strong>Express Postals</strong>
                        </li>
                        <li className="mb-2">
                          {/* Building icon */}
                          <i className="fas fa-building me-2" aria-hidden="true"></i>
                          310 7th Ave South Charleston, WV 25303
                        </li>
                        <li className="mb-2">
                          {/* Phone icon */}
                          <i className="fas fa-phone me-2" aria-hidden="true"></i>
                          <a
                            href="tel:+12233078767"
                            style={{ color: "#fc983c", textDecoration: "none" }}
                          >
                            +1 223-307-8767
                          </a>
                        </li>
                        <li>
                          {/* Envelope icon */}
                          <i className="fas fa-envelope me-2" aria-hidden="true"></i>
                          <a
                            href="mailto:help@expresspostals.com"
                            style={{ color: "#fc983c", textDecoration: "none" }}
                          >
                            help@expresspostals.com
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* ─── Scoped CSS for Minor Tweaks ───────────────────────────────────── */}
      <style jsx>{`
        /*** 1) Ensure that clicking a TOC link scrolls well above each section. ***/
        .accordion-item {
          /* Approximate navbar height = 80px. Adjust if your Navbar is taller/shorter. */
          scroll-margin-top: 80px;
        }

        /* Smooth scroll for in‐page anchors */
        html {
          scroll-behavior: smooth;
        }

        /* Accordion header font-size and weight */
        .accordion-button {
          font-size: 1rem;
          font-weight: 600;
          color: #333;
        }
        .accordion-button:not(.collapsed) {
          background-color: #fc983c;
          color: #fff;
        }
        .accordion-button:focus {
          box-shadow: 0 0 0 0.2rem rgba(252, 152, 60, 0.5);
        }

        /* Slightly smaller text for accordion bodies */
        .accordion-body p,
        .accordion-body ul {
          font-size: 0.95rem;
          line-height: 1.6;
          color: #555;
        }

        .accordion-body ul li {
          margin-bottom: 0.5rem;
        }

        /* Sidebar title */
        .text-secondary {
          color: #fc983c !important;
        }

        /* Sidebar links */
        .nav-link {
          color: #333;
          transition: color 0.2s;
        }
        .nav-link:hover {
          color: #fc983c !important;
        }

        /* Mobile TOC button */
        .btn-outline-warning {
          border-color: #fc983c;
          color: #fc983c;
        }
        .btn-outline-warning:hover {
          background-color: #fc983c;
          color: #fff;
        }
      `}</style>

      {/* ─── Global override so footer links never have underlines ───────────────────────────────────── */}
      <style jsx global>{`
        footer a {
          text-decoration: none !important;
        }
      `}</style>
    </>
  );
}
