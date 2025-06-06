"use client";

import Head from "next/head";
import { useEffect, useState, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import CountUp from "react-countup";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import ContactSection from "../../../components/ContactSection";

const FeatureCard = ({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) => (
  <div className="col-md-3 mb-4">
    <div className="feature-card h-100 text-center p-4">
      <div className="icon">
        <span className={icon}></span>
      </div>
      <h5 className="mb-2">{title}</h5>
      <p className="small text-muted">{description}</p>
    </div>
  </div>
);

const TestimonialCard = ({
  image,
  name,
  position,
  text,
}: {
  image: string;
  name: string;
  position: string;
  text: string;
}) => (
  <div className="item">
    <div className="testimony-wrap text-center py-4 pb-5">
      <div
        className="user-img mb-4"
        style={{ backgroundImage: `url(${image})` }}
      ></div>
      <div className="text pt-4">
        <p className="mb-4">{text}</p>
        <p className="name">{name}</p>
        <span className="position">{position}</span>
      </div>
    </div>
  </div>
);

export default function Home() {
  // Grab the current pathname so we can “key” our root container
  const pathname = usePathname();
  const router = useRouter();

  // Form + tracking state
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropOffLocation, setDropOffLocation] = useState("");
  const [senderName, setSenderName] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [trackingNumber, setTrackingNumber] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [queried, setQueried] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // For stats animation
  const [startCount, setStartCount] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  // Run on *every* mount to hide the loader
  useEffect(() => {
    if (typeof window !== "undefined") {
      const loader = document.getElementById("ftco-loader");
      if (loader) {
        loader.classList.remove("show");
      }
    }
  }, []); // no dependencies → runs on each mount

  // IntersectionObserver for stats
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStartCount(true);
        }
      },
      { threshold: 0.5 }
    );
    if (statsRef.current) {
      observer.observe(statsRef.current);
    }
    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current);
      }
    };
  }, []);

  // Handle “track shipment” form
  async function handleTrack(e: React.FormEvent) {
    e.preventDefault();
    if (!trackingNumber) return;

    setQueried(true);
    setStatus(null);
    setError(null);
    try {
      const res = await fetch(
        `/api/shipments/track/${encodeURIComponent(trackingNumber)}`
      );
      if (!res.ok) {
        if (res.status === 404) {
          setError("No shipments match that tracking ID.");
        } else {
          setError("Error fetching status. Please try again.");
        }
      } else {
        const { shipment } = await res.json();
        setStatus(shipment.status);
      }
    } catch {
      setError("Network error. Please try again.");
    }
  }

  // Handle “place order” form
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);

    const params = new URLSearchParams({
      pickupLocation,
      dropOffLocation,
      senderName,
      recipientName,
    }).toString();

    // Push to add-details page
    router.push(`/add-details?${params}`);
  }

  return (
    // ************ HERE is the important part: we “key” by pathname ************
    <div key={pathname}>
      <Navbar />

      {/* Hero Section */}
      <div
        className="hero-wrap"
        style={{ backgroundImage: "url('/images/img2-min.jpg')" }}
        data-stellar-background-ratio="0.5"
      >
        <div className="overlay"></div>
        <div className="container">
          <div className="row no-gutters slider-text justify-content-start align-items-center">
            <div className="col-lg-6 col-md-6 animate__animated animate__fadeIn animate__delay-1s d-flex align-items-end">
              <div className="text">
                <h1 className="mb-4">
                  Logistics <span>& Cargo</span> <span>For Businesses</span>
                </h1>
                <p style={{ fontSize: "18px" }}>
                  Global logistics and transport solutions tailored to your needs—from
                  port pickup to final delivery.
                </p>
              </div>
            </div>
            <div className="col-lg-2 col"></div>
            <div className="col-lg-4 col-md-6 mt-0 mt-md-5 d-flex">
              <form
                onSubmit={handleSubmit}
                className="request-form animate__animated animate__fadeIn animate__delay-1s w-100"
              >
                <h2>Place a delivery order!</h2>

                <div className="form-group">
                  <label className="label">Sender Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Sender Name"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    required
                    spellCheck="false"
                  />
                </div>

                <div className="form-group">
                  <label className="label">Pick-up location</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="City, Airport, Station, etc"
                    value={pickupLocation}
                    onChange={(e) => setPickupLocation(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="label">Recipient Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Recipient Name"
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    required
                    spellCheck="false"
                  />
                </div>

                <div className="form-group">
                  <label className="label">Drop-off location</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="City, Airport, Station, etc"
                    value={dropOffLocation}
                    onChange={(e) => setDropOffLocation(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <button
                    type="submit"
                    className="btn btn-primary py-3 px-4"
                    disabled={submitting}
                  >
                    {submitting ? (
                      <span
                        className="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                      ></span>
                    ) : (
                      "Enter Additional Details →"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <section className="ftco-section py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-12 heading-section text-center animate__animated animate__fadeIn mb-5">
              <span className="subheading">What We Offer</span>
              <h2 className="mb-2">Why Choose Us</h2>
            </div>
          </div>
          <div className="row">
            <FeatureCard
              icon="flaticon-customer-support"
              title="Cost Optimization"
              description="Flexible pricing tailored to your needs."
            />
            <FeatureCard
              icon="flaticon-dashboard"
              title="Reduced Transit Time"
              description="Fast, reliable delivery windows."
            />
            <FeatureCard
              icon="flaticon-backpack"
              title="Warehouse Operations"
              description="Secure, climate-controlled storage."
            />
            <FeatureCard
              icon="flaticon-route"
              title="Real-Time Tracking"
              description="Monitor shipments every step of the way."
            />
          </div>
        </div>
      </section>

      {/* Tracking Section */}
      <section id="tracking" className="ftco-section bg-light py-5">
        <div className="container">
          <div className="row justify-content-center mb-4">
            <div className="col-md-8 text-center heading-section">
              <span className="subheading">Real-Time Updates</span>
              <h2 className="mb-3">Track Your Shipment</h2>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-md-6">
              <form
                onSubmit={handleTrack}
                className="form-inline justify-content-center"
              >
                <div className="form-group mb-2 mr-2 flex-grow-1">
                  <label htmlFor="track_number" className="sr-only">
                    Tracking Number
                  </label>
                  <input
                    type="text"
                    id="track_number"
                    name="trackingNumber"
                    className="form-control w-100"
                    placeholder="Enter Tracking Number"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary mb-2">
                  Track
                </button>
              </form>

              {queried && (
                <div className="mt-3 text-center">
                  {status ? (
                    <div>
                      <h5>Status:</h5>
                      <p className="font-weight-bold">
                        {status.replace(/_/g, " ").toUpperCase()}
                      </p>
                      {status === "pending" && (
                        <p className="text-info">
                          Your shipment is being prepared. Please check back later
                          for updates.
                        </p>
                      )}
                      {status === "in_transit" && (
                        <p className="text-info">
                          Your shipment is on its way. Stay tuned for delivery
                          updates!
                        </p>
                      )}
                      {status === "delivered" && (
                        <p className="text-success">
                          Your shipment has been delivered. Thank you for choosing
                          us!
                        </p>
                      )}
                      {status === "cancelled" && (
                        <p className="text-danger">
                          Your shipment has been cancelled. Please contact support
                          for assistance.
                        </p>
                      )}
                    </div>
                  ) : (
                    <p className="text-danger">{error}</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="ftco-section" id="services">
        <div className="container">
          <div className="row justify-content-center mb-5">
            <div className="col-md-7 heading-section text-center animate__animated animate__fadeIn">
              <span className="subheading">Services</span>
              <h2>Our Services</h2>
            </div>
          </div>
          <div className="row d-flex">
            <div className="col-md-4 d-flex animate__animated animate__fadeIn">
              <div className="blog-entry justify-content-end">
                <a
                  href="#"
                  className="block-20"
                  style={{ backgroundImage: "url('/images/sev1-min.jpg')" }}
                ></a>
                <div className="text pt-4">
                  <h3 className="heading mt-2">
                    <a href="#">Sea freight</a>
                  </h3>
                  <p>
                    Efficient and cost-effective sea freight solutions for
                    large-scale shipments across the globe.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4 d-flex animate__animated animate__fadeIn">
              <div className="blog-entry justify-content-end">
                <a
                  href="#"
                  className="block-20"
                  style={{ backgroundImage: "url('/images/sev6-min.jpg')" }}
                ></a>
                <div className="text pt-4">
                  <h3 className="heading mt-2">
                    <a href="#">Air freight</a>
                  </h3>
                  <p>
                    Fast and reliable air freight services to meet your urgent
                    delivery needs worldwide.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4 d-flex animate__animated animate__fadeIn">
              <div className="blog-entry">
                <a
                  href="#"
                  className="block-20"
                  style={{ backgroundImage: "url('/images/sev11-min.jpg')" }}
                ></a>
                <div className="text pt-4">
                  <h3 className="heading mt-2">
                    <a href="#">Road service</a>
                  </h3>
                  <p>
                    Comprehensive road transport services for local and regional
                    deliveries with real-time tracking.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section
        className="ftco-section services-section img animate__animated animate__fadeInUp"
        id="how-it-works"
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
            <div className="col-md-3 d-flex align-self-stretch animate__animated animate__fadeIn">
              <div className="media block-6 services services-2">
                <div className="media-body py-md-4 text-center">
                  <div className="icon d-flex align-items-center justify-content-center">
                    <span>
                      <i
                        className="fa-solid fa-arrow-pointer"
                        style={{ color: "#ffffff" }}
                      ></i>
                    </span>
                  </div>
                  <h3>Enter your product Details</h3>
                  <p>
                    Provide accurate details about your shipment to ensure smooth
                    processing and delivery.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-3 d-flex align-self-stretch animate__animated animate__fadeIn">
              <div className="media block-6 services services-2">
                <div className="media-body py-md-4 text-center">
                  <div className="icon d-flex align-items-center justify-content-center">
                    <span>
                      <i
                        className="fa-solid fa-route"
                        style={{ color: "#ffffff" }}
                      ></i>
                    </span>
                  </div>
                  <h3>Enter location details</h3>
                  <p>
                    Specify the pick-up and drop-off locations for your shipment
                    to streamline logistics.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-3 d-flex align-self-stretch animate__animated animate__fadeIn">
              <div className="media block-6 services services-2">
                <div className="media-body py-md-4 text-center">
                  <div className="icon d-flex align-items-center justify-content-center">
                    <span>
                      <i
                        className="fa-regular fa-credit-card"
                        style={{ color: "#ffffff" }}
                      ></i>
                    </span>
                  </div>
                  <h3>Pay your service charges</h3>
                  <p>
                    Complete your payment securely to confirm your order and
                    initiate the delivery process.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-3 d-flex align-self-stretch animate__animated animate__fadeIn">
              <div className="media block-6 services services-2">
                <div className="media-body py-md-4 text-center">
                  <div className="icon d-flex align-items-center justify-content-center">
                    <span>
                      <i
                        className="fa-solid fa-box"
                        style={{ color: "#ffffff" }}
                      ></i>
                    </span>
                  </div>
                  <h3>Ready to send your goods</h3>
                  <p>
                    Once everything is set, your shipment will be on its way to
                    the destination.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section
        className="ftco-section stats-section bg-light py-5"
        ref={statsRef}
      >
        <div className="container">
          <div className="row justify-content-center mb-5">
            <div className="col-md-7 text-center heading-section animate__animated animate__fadeIn">
              <span className="subheading">Track Record</span>
              <h2 className="mb-3">By the Numbers</h2>
              <p>
                We take pride in delivering exceptional logistics services. Here
                are some of our key milestones:
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-3 text-center animate__animated animate__fadeIn">
              <div className="stat-card">
                <h3 className="stat-number text-primary">
                  {startCount && (
                    <CountUp end={10000} duration={2.5} separator="," />
                  )}
                  +
                </h3>
                <p className="stat-label">Successful Deliveries</p>
              </div>
            </div>
            <div className="col-md-3 text-center animate__animated animate__fadeIn">
              <div className="stat-card">
                <h3 className="stat-number text-primary">
                  {startCount && (
                    <CountUp end={5000} duration={2.5} separator="," />
                  )}
                  +
                </h3>
                <p className="stat-label">Happy Clients</p>
              </div>
            </div>
            <div className="col-md-3 text-center animate__animated animate__fadeIn">
              <div className="stat-card">
                <h3 className="stat-number text-primary">
                  {startCount && <CountUp end={50} duration={2.5} />}
                  +
                </h3>
                <p className="stat-label">Countries Served</p>
              </div>
            </div>
            <div className="col-md-3 text-center animate__animated animate__fadeIn">
              <div className="stat-card">
                <h3 className="stat-number text-primary">
                  {startCount && <CountUp end={24} duration={2.5} />} / 7
                </h3>
                <p className="stat-label">Customer Support</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="ftco-section py-5 animate__animated animate__fadeup"
        style={{
          background: "url('/images/img4-min.jpg') center/cover no-repeat",
        }}
      >
        <div className="overlay-dark"></div>
        <div className="container position-relative">
          {/* Heading */}
          <div className="row justify-content-center mb-5">
            <div className="col-12 text-center heading-section">
              <span className="subheading d-block text-white text-uppercase mb-2">
                About Us
              </span>
              <h2 className="text-white mb-3">Your Trusted Logistics Partner</h2>
              <p className="text-white-75 mb-4">
                We make shipping simple, fast, and reliable. Simplify your freight
                and logistics needs with a personal approach. Explore state of the art
                logistics technology with Express Postal Services. Fast and Reliable.
              </p>
            </div>
          </div>

          {/* Features Grid */}
          <div className="row features">
            <div className="col-sm-6 col-lg-3 mb-4">
              <div className="feature-card animate__fadeIn">
                <i className="fas fa-shipping-fast fa-2x icon mb-3"></i>
                <h5 className="text-white mb-1">Fast Delivery</h5>
                <small className="text-white-50">On-time, every time</small>
              </div>
            </div>

            <div className="col-sm-6 col-lg-3 mb-4">
              <div className="feature-card">
                <i className="fas fa-box-open fa-2x icon mb-3"></i>
                <h5 className="text-white mb-1">Secure Handling</h5>
                <small className="text-white-50">Packages protected</small>
              </div>
            </div>

            <div className="col-sm-6 col-lg-3 mb-4">
              <div className="feature-card">
                <i className="fas fa-route fa-2x icon mb-3"></i>
                <h5 className="text-white mb-1">Real-Time Tracking</h5>
                <small className="text-white-50">Stay informed</small>
              </div>
            </div>

            <div className="col-sm-6 col-lg-3 mb-4">
              <div className="feature-card">
                <i className="fas fa-headset fa-2x icon mb-3"></i>
                <h5 className="text-white mb-1">24/7 Support</h5>
                <small className="text-white-50">We’re here to help</small>
              </div>
            </div>
          </div>

          <div className="text-center">
            <a href="/contact" className="btn btn-primary mt-3">
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <ContactSection />

      {/* FOOTER */}
      <Footer />

      {/* Loader Div (will reappear on every remount) */}
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
    </div>
  );
}
