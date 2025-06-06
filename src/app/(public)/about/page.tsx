"use client";

import { useEffect } from 'react';
import Navbar from "../../../../components/Navbar";
import Footer from "../../../../components/Footer";
import Link from "next/link";

export default function About() {
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

      {/* Hero Section */}
      <section 
        className="hero-wrap hero-wrap-2 js-fullheight" 
        style={{ backgroundImage: "url('/images/img5-min.jpg')" }}
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
                <span>About us <i className="ion-ios-arrow-forward"></i></span>
              </p>
              <h1 className="mb-3 bread">About Us</h1>
            </div>
          </div>
        </div>
      </section>

      <section className="ftco-section animate__animated animate__fadeIn">
      <div className="container">
        <div className="row align-items-center">
          {/*** Left Side: Two “pillar” images ***/}
          <div className="col-md-6">
            <div className="row">
              {/*
                On md+:
                  • Each pillar is in a col-6, with a small gutter (px-1).
                  • We use CSS aspect-ratio to get a 2:3 vertical rectangle.
                  • First pillar sits flush; second pillar is shifted down by 40px (overlap).

                On sm ( < 768px ):
                  • Both become full width (col-12), each with a fixed smaller height (250px).
                  • They stack vertically with a small gap.
              */}

              <div className="col-6 px-1 mb-3 mb-md-0">
                <div
                  className="pillar-img"
                  style={{
                    backgroundImage: "url('/images/about-1.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    borderRadius: "8px",
                    boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
                    position: "relative",
                    top: "0",

                    /* Use aspect-ratio for a 2:3 rectangle on desktop, but override on small */
                    aspectRatio: "1 / 2",
                  }}
                />
              </div>

              <div className="col-6 px-1">
                <div
                  className="pillar-img"
                  style={{
                    backgroundImage: "url('/images/about-2.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    borderRadius: "8px",
                    boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
                    position: "relative",

                    /* Shift down on desktop for overlap */
                    top: "40px",

                    /* Same aspect-ratio on desktop */
                    aspectRatio: "1 / 2",
                  }}
                />
              </div>
            </div>
          </div>

          {/*** Right Side: Text + Feature Cards ***/}
          {/*** Right Side: Text + Feature Cards ***/}
       <div className="col-md-6 pl-md-5">
        {/* Subheading */}
        <span className="subheading" style={{ color: "#fc983c" }}>
          About Us
        </span>

        {/* Main Title */}
        <h2 className="mt-2 mb-4">
          Expert Logistics Solutions, Anywhere You Need
        </h2>

        {/* Paragraph */}
        <p className="mb-5 text-gray-600">
          At Express Postals, we believe every package matters. From small parcels to oversized freight, our passion for efficient delivery drives us to exceed expectations. Wherever your goods need to go—across town or around the globe—we have the network, technology, and expertise to get them there safely and on schedule.
        </p>

        {/* Feature #1: Global Reach */}
        <div className="d-flex mb-4 align-items-start">
          <div className="text-orange-500 mr-3">
            <i className="fas fa-globe-americas"></i>
          </div>
          <div>
            <h4 className="feature-title">Global Reach</h4>
            <p className="feature-text">
              Leveraging our international network, we offer seamless end-to-end shipping solutions. Whether by air, sea, or land, our worldwide partners ensure reliable transit and live tracking from origin to destination.
            </p>
          </div>
        </div>

        {/* Feature #2: Local Expertise */}
        <div className="d-flex align-items-start">
          <div className="text-orange-500 mr-3">
            <i className="fas fa-map-marker-alt"></i>
          </div>
          <div>
            <h4 className="feature-title">Local Expertise</h4>
            <p className="feature-text">
              As your neighborhood logistics partner, we understand local regulations, traffic patterns, and unique delivery challenges. From same-day courier pickups to scheduled routes, our local teams guarantee on-time deliveries with personalized support.
            </p>
          </div>
        </div>

      </div>
        </div>
      </div>
    </section>

      {/* Services Section */}
      <section className="ftco-section">
        <div className="container">
          <div className="row justify-content-center mb-5">
            <div className="col-md-7 heading-section text-center animate__animated animate__fadeIn">
              <span className="subheading">services</span>
              <h2>Our Services</h2>
            </div>
          </div>
          <div className="row d-flex">
            <div className="col-md-4 d-flex animate__animated animate__fadeInUp">
              <div className="blog-entry justify-content-end">
                <p className="block-20 animate__animated animate__fadeIn" style={{ backgroundImage: "url('/images/sev1-min.jpg')" }}>
                </p>
                <div className="text pt-4">
                  <h3 className="heading mt-2"><a href="#">Sea freight</a></h3>
                  <p>Efficient and cost-effective sea freight solutions for large-scale shipments across the globe.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 d-flex animate__animated animate__fadeInUp">
              <div className="blog-entry justify-content-end">
                <p className="block-20" style={{ backgroundImage: "url('/images/sev6-min.jpg')" }}>
                </p>
                <div className="text pt-4">
                  <h3 className="heading mt-2"><a href="#">Air freight</a></h3>
                  <p>Fast and reliable air freight services to meet your urgent delivery needs worldwide.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 d-flex animate__animated animate__fadeInUp">
              <div className="blog-entry">
                <p className="block-20" style={{ backgroundImage: "url('/images/sev11-min.jpg')" }}>
                </p>
                <div className="text pt-4">
                  <h3 className="heading mt-2"><a href="#">Road service</a></h3>
                  <p>Comprehensive road transport services for local and regional deliveries with real-time tracking.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Work Flow Section */}
      <section 
        className="ftco-section services-section img" 
        style={{ backgroundImage: "url('/images/img3-min.jpg')" }}
      >
        <div className="overlay"></div>
        <div className="container">
          <div className="row justify-content-center mb-5">
            <div className="col-12 col-sm-8 col-md-7 text-center heading-section heading-section-white animate__animated animate__fadeIn mx-auto">
              <span className="subheading">Work flow</span>
              <h2 className="mb-3">How it works</h2>
            </div>
          </div>
          <div className="row">
            {/* Work Flow Steps */}
            <div className="col-md-3 d-flex align-self-stretch animate__animated animate__fadeIn">
              <div className="media block-6 services services-2">
                <div className="media-body py-md-4 text-center">
                  <div className="icon d-flex align-items-center justify-content-center">
                    <span><i className="fa-solid fa-arrow-pointer" style={{ color: '#ffffff' }}></i></span>
                  </div>
                  <h3>Enter your product Details</h3>
                  <p>Provide accurate details about your shipment to ensure smooth processing and delivery.</p>
                </div>
              </div>      
            </div>
            <div className="col-md-3 d-flex align-self-stretch animate__animated animate__fadeIn">
              <div className="media block-6 services services-2">
                <div className="media-body py-md-4 text-center">
                  <div className="icon d-flex align-items-center justify-content-center">
                    <span><i className="fa-solid fa-route" style={{ color: '#ffffff' }}></i></span>
                  </div>
                  <h3>Enter location details</h3>
                  <p>Specify the pick-up and drop-off locations for your shipment to streamline logistics.</p>
                </div>
              </div>      
            </div>
            <div className="col-md-3 d-flex align-self-stretch animate__animated animate__fadeIn">
              <div className="media block-6 services services-2">
                <div className="media-body py-md-4 text-center">
                  <div className="icon d-flex align-items-center justify-content-center">
                    <span><i className="fa-regular fa-credit-card" style={{ color: '#ffffff' }}></i></span>
                  </div>
                  <h3>Pay your service charges</h3>
                  <p>Complete your payment securely to confirm your order and initiate the delivery process.</p>
                </div>
              </div>      
            </div>
            <div className="col-md-3 d-flex align-self-stretch animate__animated animate__fadeIn">
              <div className="media block-6 services services-2">
                <div className="media-body py-md-4 text-center">
                  <div className="icon d-flex align-items-center justify-content-center">
                    <span><i className="fa-solid fa-box" style={{ color: '#ffffff' }}></i></span>
                  </div>
                  <h3>Ready to send your goods</h3>
                  <p>Once everything is set, your shipment will be on its way to the destination.</p>
                </div>
              </div>      
            </div>
          </div>
        </div>
      </section>

      <Footer />
      
      {/* Loader */}
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