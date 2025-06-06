"use client";

import Head from "next/head";
import { useEffect } from "react";    // ← import useEffect
import Link from "next/link";
import Navbar from "../../../../components/Navbar";
import Footer from "../../../../components/Footer";
import ContactCardForm from "../../../../components/ContactCardForm";

export default function ContactPage() {
  
 useEffect(() => {
    if (typeof window !== "undefined") {
      const loader = document.getElementById("ftco-loader");
      if (loader) {
        loader.classList.remove("show");
      }
    }
  }, []);

  return (
    <>
      <Navbar />

      {/* Hero section */}
      <section
        className="hero-wrap hero-wrap-2 js-fullheight"
        style={{ backgroundImage: "url('/images/img6-min.jpg')" }}
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
                </span>{" "}
                <span>
                  Contact <i className="ion-ios-arrow-forward"></i>
                </span>
              </p>
              <h1 className="mb-3 bread">Contact us</h1>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info + Form */}
      <section className="ftco-section contact-section pt-5 pb-5">
        <div className="container">
          {/* ─── Why Choose Us ───────────────────────────────────────────────────── */}
          <div className="row justify-content-center mb-5">
            <div className="col-md-8 text-center">
              <h2 className="mb-3">We’re Here To Help</h2>
              <p className="text-muted">
                Express Postals, delivering packages safely and on time. 
                Whether it's a simple letter or a heavy freight, our 24/7 support team and nationwide network ensure your shipment arrives exactly when you need it.
              </p>
            </div>
          </div>

          {/* ─── Contact Info + Map ─────────────────────────────────────────────────── */}
          <div className="row justify-content-center mb-5">
            <div className="col-md-10">
              <div className="row mb-4">
                {/* Address Card */}
                <div className="col-md-4 d-flex flex-column align-items-center text-center mb-4 mb-md-0">
                  <div className="card shadow-sm rounded w-100 h-100">
                    <div className="card-body py-4">
                      <div className="icon mb-3 animate__animated animate__fadeInUp">
                        <span className="icon-map-o fa-2x text-primary"></span>
                      </div>
                      <h5 className="card-title mb-2">Address</h5>
                      <p className="card-text mb-0 text-muted">
                        310 7th Ave <br />South Charleston, WV 25303
                      </p>
                    </div>
                  </div>
                </div>

                {/* Phone Card */}
                <div className="col-md-4 d-flex flex-column align-items-center text-center mb-4 mb-md-0">
                  <div className="card shadow-sm rounded w-100 h-100">
                    <div className="card-body py-4">
                      <div className="icon mb-3 animate__animated animate__fadeInUp">
                        <span className="icon-mobile-phone fa-2x text-primary"></span>
                      </div>
                      <h5 className="card-title mb-2">Phone</h5>
                      <p className="card-text mb-0">
                        <a href="tel:+19086767264" className="text-decoration-none text-muted">
                            +1223-307-8767
                        </a>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Email Card */}
                <div className="col-md-4 d-flex flex-column align-items-center text-center">
                  <div className="card shadow-sm rounded w-100 h-100">
                    <div className="card-body py-4">
                      <div className="icon mb-3 animate__animated animate__fadeInUp">
                        <span className="icon-envelope-o fa-2x text-primary"></span>
                      </div>
                      <h5 className="card-title mb-2">Email</h5>
                      <p className="card-text mb-0">
                        <a href="mailto:help@expresspostals.com" className="text-decoration-none text-muted">
                          help@expresspostals.com
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Embedded Map */}
              <div className="row mb-5">
                <div className="col-md-12">
                  <div className="card shadow-sm rounded overflow-hidden">
                    <div className="card-body p-0">
                      <iframe
                      title="Our Location"
                      src="https://maps.google.com/maps?q=310%207th%20Ave%20South%20Charleston%2C%20WV%2025303&amp;z=15&amp;output=embed"
                      width="100%"
                      height="250"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                    />

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <ContactCardForm />
        </div>
      </section>

      

      <Footer />

      {/* loader */}
      <div id="ftco-loader" className="show fullscreen">
        <svg className="circular" width="48px" height="48px">
          <circle
            className="path-bg"
            cx="24"
            cy="24"
            r="22"
            fill="none"
            strokeWidth="4"
            stroke="#eeeeee"
          />
          <circle
            className="path"
            cx="24"
            cy="24"
            r="22"
            fill="none"
            strokeWidth="4"
            strokeMiterlimit="10"
            stroke="#F96D00"
          />
        </svg>
      </div>
      
    </>
  );
}
