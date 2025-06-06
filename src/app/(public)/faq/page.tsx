"use client";

import Navbar from "../../../../components/Navbar";
import Footer from "../../../../components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

export default function FAQPage() {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section
        className="hero-wrap hero-wrap-2 js-fullheight"
        style={{ backgroundImage: "url('/images/faq2.jpg')" }}
        data-stellar-background-ratio="0.5"
      >
        <div className="overlay"></div>
        <div className="container">
          <div className="row no-gutters slider-text js-fullheight align-items-end justify-content-start">
            <div className="col-md-9 animate__animated animate__fadeIn pb-5">
              <p className="breadcrumbs">
                <span className="mr-2">
                  <a href="/">
                    Home <i className="ion-ios-arrow-forward"></i>
                  </a>
                </span>
                <span>
                  FAQ <i className="ion-ios-arrow-forward"></i>
                </span>
              </p>
              <h1 className="mb-3 bread">Frequently Asked Questions</h1>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="ftco-section bg-light py-5">
        <div className="container">
          <div className="row justify-content-center mb-5">
            <div className="col-md-8 text-center">
              <h2 className="mb-4">How Can We Help You?</h2>
              <p className="text-muted">
                Below are some of the most common questions we receive. If you
                don’t find your answer here, feel free to contact us.
              </p>
            </div>
          </div>

          <div className="accordion" id="faqAccordion">
            {/* Question 1 */}
            <div className="accordion-item mb-3 shadow-sm">
              <h2 className="accordion-header" id="faqHeadingOne">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#faqCollapseOne"
                  aria-expanded="false"
                  aria-controls="faqCollapseOne"
                >
                  1. How do I track my shipment?
                </button>
              </h2>
              <div
                id="faqCollapseOne"
                className="accordion-collapse collapse"
                aria-labelledby="faqHeadingOne"
                data-bs-parent="#faqAccordion"
              >
                <div className="accordion-body">
                  You can track your shipment by entering your tracking number
                  on our{" "}
                  <a href="/#tracking" className="text-primary">
                   Tracking
                  </a>{" "}
                  page. You’ll receive real-time updates on the status of your
                  delivery.
                </div>
              </div>
            </div>

            {/* Question 2 */}
            <div className="accordion-item mb-3 shadow-sm">
              <h2 className="accordion-header" id="faqHeadingTwo">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#faqCollapseTwo"
                  aria-expanded="false"
                  aria-controls="faqCollapseTwo"
                >
                  2. What items are prohibited from shipping?
                </button>
              </h2>
              <div
                id="faqCollapseTwo"
                className="accordion-collapse collapse"
                aria-labelledby="faqHeadingTwo"
                data-bs-parent="#faqAccordion"
              >
                <div className="accordion-body">
                  Prohibited items include hazardous materials, illegal
                  substances, perishable goods (unless explicitly agreed upon),
                  and items restricted by local, national, or international
                  laws. For a full list, please refer to our{" "}
                  <a href="/terms-&-conditions" className="text-primary">
                    Terms and Conditions
                  </a>
                  .
                </div>
              </div>
            </div>

            {/* Question 3 */}
            <div className="accordion-item mb-3 shadow-sm">
              <h2 className="accordion-header" id="faqHeadingThree">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#faqCollapseThree"
                  aria-expanded="false"
                  aria-controls="faqCollapseThree"
                >
                  3. How do I calculate shipping costs?
                </button>
              </h2>
              <div
                id="faqCollapseThree"
                className="accordion-collapse collapse"
                aria-labelledby="faqHeadingThree"
                data-bs-parent="#faqAccordion"
              >
                <div className="accordion-body">
                  Shipping costs are calculated based on the weight, dimensions,
                  and destination of your shipment. You can get an estimate by
                  contacting our support team.
                </div>
              </div>
            </div>

            {/* Question 4 */}
            <div className="accordion-item mb-3 shadow-sm">
              <h2 className="accordion-header" id="faqHeadingFour">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#faqCollapseFour"
                  aria-expanded="false"
                  aria-controls="faqCollapseFour"
                >
                  4. What should I do if my shipment is delayed?
                </button>
              </h2>
              <div
                id="faqCollapseFour"
                className="accordion-collapse collapse"
                aria-labelledby="faqHeadingFour"
                data-bs-parent="#faqAccordion"
              >
                <div className="accordion-body">
                  If your shipment is delayed, please check the tracking
                  information for updates. If the delay persists, contact our
                  customer support team at{" "}
                  <a href="mailto:help@expresspostals.com" className="text-primary">
                    help@expresspostals.com
                  </a>{" "}
                  or call us at{" "}
                  <a href="tel:+12233078767" className="text-primary">
                    +1 223-307-8767
                  </a>
                  .
                </div>
              </div>
            </div>

            {/* Question 5 */}
            <div className="accordion-item mb-3 shadow-sm">
              <h2 className="accordion-header" id="faqHeadingFive">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#faqCollapseFive"
                  aria-expanded="false"
                  aria-controls="faqCollapseFive"
                >
                  5. How do I cancel or modify my shipment?
                </button>
              </h2>
              <div
                id="faqCollapseFive"
                className="accordion-collapse collapse"
                aria-labelledby="faqHeadingFive"
                data-bs-parent="#faqAccordion"
              >
                <div className="accordion-body">
                  To cancel or modify your shipment, please contact our support
                  team as soon as possible. Note that changes may not be
                  possible if the shipment is already in transit.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* Scoped CSS */}
      <style jsx>{`
        /* Override Bootstrap’s “primary” color to #fc983c */
        .text-primary {
          color: #fc983c !important;
        }
        .text-primary:hover {
          color: #e87729 !important;
        }

        /* Style for accordion items */
        .accordion-item {
          border: 1px solid #e6e6e6;
          border-radius: 4px;
        }
        .accordion-item + .accordion-item {
          margin-top: 1rem;
        }

        /* When collapsed (default), button background is white, text dark */
        .accordion-button.collapsed {
          background-color: #ffffff;
          color: #333333;
        }
        .accordion-button.collapsed:hover {
          background-color: rgba(252, 152, 60, 0.1);
        }

        /* When expanded (not collapsed), use #fc983c background with white text */
        .accordion-button:not(.collapsed) {
          background-color: #fc983c;
          color: #ffffff;
        }
        .accordion-button:not(.collapsed)::after {
          filter: invert(1);
        }

        /* Adjust the arrow color */
        .accordion-button::after {
          color: #555555;
        }
        .accordion-button:not(.collapsed)::after {
          color: #ffffff;
        }

        /* Accordion body styling */
        .accordion-body {
          background-color: #fff;
          border-top: 1px solid #fc983c;
        }

        /* Hero breadcrumbs link hover */
        .breadcrumbs a {
          color: #ffffff;
        }
        .breadcrumbs a:hover {
          color: #fc983c;
        }

        /* Section headings in FAQ */
        .ftco-section h2 {
          color: #333333;
        }
        .ftco-section .text-muted {
          color: #666666;
        }
      `}</style>

      {/* Global Style to Remove Underlines From All Links */}
      <style jsx global>{`
        a {
          text-decoration: none !important;
        }
      `}</style>
    </>
  );
}
