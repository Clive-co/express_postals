"use client";

export default function Footer() {
  return (
    <footer className="ftco-footer ftco-bg-dark ftco-section animate__animated animate__fadeup">
      <div className="container">
        <div className="row mb-5">
          <div className="col-md">
            <div className="ftco-footer-widget mb-4">
              <h2 className="ftco-heading-2">About Express Postals</h2>
              <p>Express Postals is dedicated to providing reliable and efficient logistics solutions, ensuring your shipments reach their destination on time, every time.</p>
              {/*<ul className="ftco-footer-social list-unstyled float-md-left float-lft mt-5">
                <li className="animate__animated animate__fadeIn"><a href="#"><span className="icon-twitter"></span></a></li>
                <li className="animate__animated animate__fadeIn"><a href="#"><span className="icon-facebook"></span></a></li>
                <li className="animate__animated animate__fadeIn"><a href="#"><span className="icon-instagram"></span></a></li>
              </ul>*/}
            </div>
          </div>
          <div className="col-md">
            <div className="ftco-footer-widget mb-4 ml-md-5">
              <h2 className="ftco-heading-2">Information</h2>
              <ul className="list-unstyled">
                <li><a href="/about" className="py-2 d-block">About</a></li>
                <li><a href="/#services" className="py-2 d-block">Services</a></li>
                <li><a href="/terms-&-conditions" className="py-2 d-block">Term and Conditions</a></li>
                <li><a href="/icy" className="py-2 d-block">Privacy &amp; Cookies Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="col-md">
            <div className="ftco-footer-widget mb-4">
              <h2 className="ftco-heading-2">Customer Support</h2>
              <ul className="list-unstyled">
                <li><a href="/faq" className="py-2 d-block">FAQ</a></li>
                {/*<li><a href="#" className="py-2 d-block">Payment Option</a></li>*/}
                <li><a href="/#how-it-works" className="py-2 d-block">How it works</a></li>
                <li><a href="/contact" className="py-2 d-block">Contact Us</a></li>
              </ul>
            </div>
          </div>
          <div className="col-md">
            <div className="ftco-footer-widget mb-4">
              <h2 className="ftco-heading-2">Have a Questions?</h2>
              <div className="block-23 mb-3">
                <ul>
                  <li><span className="icon icon-map-marker"></span><span className="text">310 7th Ave South Charleston, WV 25303</span></li>
                  <li><a href="tel:+12233078767"><span className="icon icon-phone"></span>+1223-307-8767</a></li>
                  <li><a href="mailto:help@expresspostals.com"><span className="icon icon-envelope"></span>help@expresspostals.com</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 text-center">
            <p>
              &copy; {new Date().getFullYear()} All rights reserved.
              <br />
              <a
                href="https://colorlib.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: '0.8em', color: '#999' }}
              >
                powered by Colorlib
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}