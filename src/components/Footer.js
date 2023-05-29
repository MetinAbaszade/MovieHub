import React from 'react'

export default function Footer() {
  return (
      <footer className="footer">
          <div className="container">
              <div className="row">
                  <div className="col-lg-3 col-sm-6">
                      <div className="widget">
                          <img src="/img/logo.png" alt="about" />
                          <p>7th Harley Place, London W1G 8LZ United Kingdom</p>
                          <h6><span>Call us: </span>(+880) 111 222 3456</h6>
                      </div>
                  </div>
                  <div className="col-lg-3 col-sm-6">
                      <div className="widget">
                          <h4>Legal</h4>
                          <ul>
                              <li><a href="/">Terms of Use</a></li>
                              <li><a href="/">Privacy Policy</a></li>
                              <li><a href="/">Security</a></li>
                          </ul>
                      </div>
                  </div>
                  <div className="col-lg-3 col-sm-6">
                      <div className="widget">
                          <h4>Account</h4>
                          <ul>
                              <li><a href="/">My Account</a></li>
                              <li><a href="/">Watchlist</a></li>
                              <li><a href="/">Collections</a></li>
                              <li><a href="/">User Guide</a></li>
                          </ul>
                      </div>
                  </div>
                  <div className="col-lg-3 col-sm-6">
                      <div className="widget">
                          <h4>Newsletter</h4>
                          <p>Subscribe to our newsletter system now to get latest news from us.</p>
                          <form action="#">
                              <input type="text" placeholder="Enter your email.." />
                              <button>SUBSCRIBE NOW</button>
                          </form>
                      </div>
                  </div>
              </div>
              <hr />
          </div>
          <div className="copyright">
              <div className="container">
                  <div className="row">
                      <div className="col-lg-6 text-center text-lg-left">
                          <div className="copyright-content">
                              <p><a target="_blank" href="https://www.templateshub.net" rel="noreferrer">Templates Hub</a></p>
                          </div>
                      </div>
                      <div className="col-lg-6 text-center text-lg-right">
                          <div className="copyright-content">
                              <a href="/" className="scrollToTop">
                                  Back to top<i className="icofont icofont-arrow-up"></i>
                              </a>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </footer>
  )
}
