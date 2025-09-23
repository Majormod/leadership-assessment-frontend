// In components/LmsLayout.js

import Head from 'next/head';
import Script from 'next/script';
import { useEffect } from 'react';

const LmsLayout = ({ children }) => {
    // In components/LmsLayout.js

// In components/LmsLayout.js

useEffect(() => {
    // A short delay to ensure React has rendered everything.
    setTimeout(() => {
        // We are ONLY calling our new, safe function.
        if (typeof window.reinitializeLmsHeader === 'function') {
            window.reinitializeLmsHeader();
        }
    }, 100); 
}, []);

    return (
        <>
            <Head>
                <title>The Marketing Influence Quotient™</title>
                <link rel="shortcut icon" type="image/x-icon" href="/assets/images/favicon.png" />

                {/* All CSS files from your LMS */}
                <link rel="stylesheet" href="/assets/css/vendor/bootstrap.min.css" />
                <link rel="stylesheet" href="/assets/css/vendor/slick.css" />
                <link rel="stylesheet" href="/assets/css/plugins/feather.css" />
                <link rel="stylesheet" href="/assets/css/plugins/fontawesome.min.css" />
                {/* ... add any other necessary CSS links from your original header here ... */}
                <link rel="stylesheet" href="/assets/css/styles.css" />
            </Head>

            <div className="rbt-header-sticky">
                {/* ▼▼▼ PASTE YOUR FULL HEADER HTML HERE ▼▼▼ */}
                <>
  {/* Start Header Area */}
  <header className="rbt-header rbt-header-10">
    <div className="rbt-sticky-placeholder" />
    {/* Start Header Top  */}
    <div className="rbt-header-top rbt-header-top-1 header-space-betwween bg-not-transparent bg-color-darker top-expended-activation">
      <div className="container-fluid">
        <div className="top-expended-wrapper">
          <div className="top-expended-inner rbt-header-sec align-items-center ">
            <div className="rbt-header-sec-col rbt-header-left d-none d-xl-block">
              <div className="rbt-header-content">
                {/* Start Header Information List  */}
                <div className="header-info">
                  <ul className="rbt-information-list">
                    <li>
                      <a href="#">
                        <i className="fab fa-instagram" />
                        100k{" "}
                        <span className="d-none d-xxl-block">Followers</span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fab fa-facebook-square" />
                        500k{" "}
                        <span className="d-none d-xxl-block">Followers</span>
                      </a>
                    </li>
                  </ul>
                </div>
                {/* End Header Information List  */}
              </div>
            </div>
            <div className="rbt-header-sec-col rbt-header-center">
              <div className="rbt-header-content justify-content-start justify-content-xl-center">
                <div className="header-info">
                  <div className="rbt-header-top-news">
                    <div className="inner">
                      <div className="content">
                        <span className="rbt-badge variation-02 bg-color-primary color-white radius-round">
                          Just In
                        </span>
                        <span className="news-text">
                          <img
                            src="assets/images/icons/hand-emojji.svg"
                            alt="Hand Emojji Images"
                          />{" "}
                          Intro price. Get Leadership Accelerator for Big Sale
                          -15% off.
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="rbt-header-sec-col rbt-header-right mt_md--10 mt_sm--10">
              <div className="rbt-header-content justify-content-start justify-content-lg-end">
                <div className="header-info d-none d-xl-block">
                  <ul className="social-share-transparent">
                    <li>
                      <a href="#">
                        <i className="fab fa-facebook-f" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fab fa-twitter" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fab fa-linkedin-in" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fab fa-instagram" />
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="rbt-separator d-none d-xl-block" />
                <div className="header-info">
                  <ul className="rbt-dropdown-menu currency-menu">
                    <li className="has-child-menu">
                      <a href="#">
                        <span className="menu-item">INR</span>
                        <i className="right-icon feather-chevron-down" />
                      </a>
                      <ul className="sub-menu hover-reverse">
                        <li>
                          <a href="#">
                            <span className="menu-item">USD</span>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <span className="menu-item">EUR</span>
                          </a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="header-info">
            <div className="top-bar-expended d-block d-lg-none">
              <button className="topbar-expend-button rbt-round-btn">
                <i className="feather-plus" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* End Header Top  */}
    <div className="rbt-header-wrapper header-space-betwween header-sticky">
      <div className="container-fluid">
        <div className="mainbar-row rbt-navigation-center align-items-center">
          <div className="header-left rbt-header-content">
            <div className="header-info">
              <div className="logo logo-dark">
                <a href="index.html">
                  <img
                    src="assets/images/logo/logo.png"
                    alt="Education Logo Images"
                  />
                </a>
              </div>
              <div className="logo d-none logo-light">
                <a href="index.html">
                  <img
                    src="assets/images/dark/logo/logo-light.png"
                    alt="Education Logo Images"
                  />
                </a>
              </div>
            </div>
            <div className="header-info">
              <div className="rbt-category-menu-wrapper rbt-category-update">
                <div className="rbt-category-btn">
                  <div className="rbt-offcanvas-trigger md-size icon">
                    <span className="d-none d-xl-block">
                      <i className="feather-grid" />
                    </span>
                    <i
                      title="Category"
                      className="feather-grid d-block d-xl-none"
                    />
                  </div>
                </div>
                {/* Start category Area  */}
                <div className="category-dropdown-menu d-none d-xl-block">
                  <div className="category-menu-item">
                    <div className="rbt-vertical-nav">
                      <ul className="rbt-vertical-nav-list-wrapper vertical-nav-menu">
                        <li className="vertical-nav-item active">
                          <a href="#tab1">Courses</a>
                        </li>
                        <li className="vertical-nav-item">
                          <a href="#tab2">For Leaders</a>
                        </li>
                        <li className="vertical-nav-item">
                          <a href="#tab3">For Learners</a>
                        </li>
                        <li className="vertical-nav-item">
                          <a href="#tab4">By Position</a>
                        </li>
                      </ul>
                    </div>
                    <div className="rbt-vertical-nav-content">
                      {/* Start One Item  */}
                      <div
                        className="rbt-vertical-inner tab-content"
                        id="tab1"
                        style={{ display: "block" }}
                      >
                        <div className="rbt-vertical-single">
                          <div className="row">
                            <div className="col-lg-6 col-sm-6 col-6">
                              <div className="vartical-nav-content-menu">
                                <h3 className="rbt-short-title">
                                  Course Title
                                </h3>
                                <ul className="rbt-vertical-nav-list-wrapper">
                                  <li>
                                    <a href="#">C-Level</a>
                                  </li>
                                  <li>
                                    <a href="#">Management</a>
                                  </li>
                                  <li>
                                    <a href="#">Operations</a>
                                  </li>
                                  <li>
                                    <a href="#">Human Resource</a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <div className="col-lg-6 col-sm-6 col-6">
                              <div className="vartical-nav-content-menu">
                                <h3 className="rbt-short-title">
                                  Course Title
                                </h3>
                                <ul className="rbt-vertical-nav-list-wrapper">
                                  <li>
                                    <a href="#">C-Level</a>
                                  </li>
                                  <li>
                                    <a href="#">Management</a>
                                  </li>
                                  <li>
                                    <a href="#">Operations</a>
                                  </li>
                                  <li>
                                    <a href="#">Human Resource</a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* End One Item  */}
                      {/* Start One Item  */}
                      <div className="rbt-vertical-inner tab-content" id="tab2">
                        <div className="rbt-vertical-single">
                          <div className="row">
                            <div className="col-lg-6">
                              <div className="vartical-nav-content-menu">
                                <h3 className="rbt-short-title">
                                  Course Title
                                </h3>
                                <ul className="rbt-vertical-nav-list-wrapper">
                                  <li>
                                    <a href="#">C-Level</a>
                                  </li>
                                  <li>
                                    <a href="#">Management</a>
                                  </li>
                                  <li>
                                    <a href="#">Operations</a>
                                  </li>
                                  <li>
                                    <a href="#">Human Resource</a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <div className="vartical-nav-content-menu">
                                <h3 className="rbt-short-title">
                                  Course Title
                                </h3>
                                <ul className="rbt-vertical-nav-list-wrapper">
                                  <li>
                                    <a href="#">C-Level</a>
                                  </li>
                                  <li>
                                    <a href="#">Management</a>
                                  </li>
                                  <li>
                                    <a href="#">Operations</a>
                                  </li>
                                  <li>
                                    <a href="#">Human Resource</a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* End One Item  */}
                      {/* Start One Item  */}
                      <div className="rbt-vertical-inner tab-content" id="tab3">
                        <div className="rbt-vertical-single">
                          <div className="row">
                            <div className="col-lg-12">
                              <div className="vartical-nav-content-menu">
                                <h3 className="rbt-short-title">
                                  Course Title
                                </h3>
                                <ul className="rbt-vertical-nav-list-wrapper">
                                  <li>
                                    <a href="#">C-Level</a>
                                  </li>
                                  <li>
                                    <a href="#">Management</a>
                                  </li>
                                  <li>
                                    <a href="#">Operations</a>
                                  </li>
                                  <li>
                                    <a href="#">Human Resource</a>
                                  </li>
                                </ul>
                                <div className="read-more-btn">
                                  <a className="rbt-btn-link" href="#">
                                    Learn More
                                    <i className="feather-arrow-right" />
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* End One Item  */}
                      {/* Start One Item  */}
                      <div className="rbt-vertical-inner tab-content" id="tab4">
                        <div className="rbt-vertical-single">
                          <div className="row">
                            <div className="col-lg-12">
                              <div className="vartical-nav-content-menu">
                                <h3 className="rbt-short-title">
                                  Course Title
                                </h3>
                                <ul className="rbt-vertical-nav-list-wrapper">
                                  <li>
                                    <a href="#">C-Level</a>
                                  </li>
                                  <li>
                                    <a href="#">Management</a>
                                  </li>
                                  <li>
                                    <a href="#">Operations</a>
                                  </li>
                                  <li>
                                    <a href="#">Human Resource</a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* End One Item  */}
                    </div>
                  </div>
                </div>
                {/* End category Area  */}
              </div>
            </div>
          </div>
          <div className="rbt-main-navigation d-none d-xl-block">
            <nav className="mainmenu-nav">
              <ul className="mainmenu">
                {/*
                          <li class="with-megamenu has-menu-child-item position-static">
                              <a href="index.html">Home</a>
                          </li>
                          */}
                <li className="with-megamenu has-menu-child-item">
                  <a href="#">
                    Assessments <i className="feather-chevron-down" />
                  </a>
                  {/* Start Mega Menu  */}
                  <div className="rbt-megamenu grid-item-2">
                    <div className="wrapper">
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="mega-top-banner-4">
                            <div className="content">
                              <h4 className="title color-white">
                                The Leadership Assessment
                              </h4>
                              <p className="description color-white">
                                True leadership starts within. Our assessments
                                reveal the strengths and blind spots that shape
                                your impact.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row row--15">
                        <div className="col-lg-12 col-xl-6 col-xxl-6 single-mega-item">
                          <h5 className="title">Leadership Assessments</h5>
                          <p className="b4">
                            <a href="assessment-the-leadership-quotient-test.html">
                              The Leadership Quotient Test™
                            </a>
                            <br />
                            <br />
                            <a href="assessment-the-management-mastery-index.html">
                              The Management Mastery Index™
                            </a>
                            <br />
                            <br />
                            <a href="assessment-the-marketing-influence-quotient.html">
                              The Marketing Influence Quotient™
                            </a>
                            <br />
                            <br />
                            <a href="assessment-the-sales-performance-index.html">
                              The Sales Performance Index™
                            </a>
                            <br />
                            <br />
                          </p>
                          <a
                            className="rbt-btn btn-border-gradient radius-round btn-sm hover-transform-none"
                            href="assessment.html"
                          >
                            <span data-text="Enroll Now">
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Take Assessments Now
                            </span>
                          </a>
                        </div>
                        <div className="col-lg-12 col-xl-6 col-xxl-6 single-mega-item">
                          <h5 className="title">&nbsp;</h5>
                          <p className="b4">
                            <a href="assessment-the-communication-impact-quotient.html">
                              The Communication Impact Quotient™
                            </a>
                            <br />
                            <br />
                            <a href="assessment-the-human-capital-impact-quotient.html">
                              The Human Capital Impact Quotient™
                            </a>
                            <br />
                            <br />
                            <a href="assessment-the-mindset-mastery-index.html">
                              The Mindset Mastery Index™
                              <br />
                            </a>
                            <br />
                            <a href="assessment-the-strategy-execution-quotient.html">
                              The Strategy Execution Quotient™
                            </a>
                            <br />
                            <br />
                            <a href="assessment-the-gravitas-and-presence-assessment.html">
                              The Gravitas &amp; Presence Assessment™
                            </a>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* End Mega Menu  */}
                </li>
                <li className="with-megamenu has-menu-child-item">
                  <a href="#">
                    Courses <i className="feather-chevron-down" />
                  </a>
                  {/* Start Mega Menu  */}
                  <div className="rbt-megamenu grid-item-2">
                    <div className="wrapper">
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="mega-top-banner-3">
                            <div className="content">
                              <h4 className="title color-white">
                                Courses - The Leadership Forge
                              </h4>
                              <p className="description color-white">
                                Build real skills. Drive real impact. Transform
                                your career.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row row--15">
                        <div className="col-lg-12 col-xl-12 col-xxl-12 single-mega-item">
                          <h5 className="title">Leadership Courses</h5>
                          <p className="description">
                            Learn from the best. Master leadership. Accelerate
                            growth.
                          </p>
                          <a
                            className="rbt-btn btn-border-gradient radius-round btn-sm hover-transform-none"
                            href="schools.html"
                          >
                            <span data-text="Enroll Now">Explore Schools</span>
                          </a>
                          <a
                            className="rbt-btn btn-border-gradient radius-round btn-sm hover-transform-none"
                            href="explore-courses.html"
                          >
                            <span data-text="Enroll Now">Explore Courses</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* End Mega Menu  */}
                </li>
                <li className="with-megamenu has-menu-child-item">
                  <a href="#">
                    For Individuals <i className="feather-chevron-down" />
                  </a>
                  {/* Start Mega Menu  */}
                  <div className="rbt-megamenu grid-item-2">
                    <div className="wrapper">
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="mega-top-banner mb--0">
                            <div className="content">
                              <h4 className="title">For Individuals</h4>
                              <p className="description">
                                For those who refuse stagnation - we turn
                                ambition into career impact.
                              </p>
                            </div>
                          </div>
                          {/* Start Card Area */}
                          <div className="row row--15">
                            {/* Start Single Card  */}
                            <div
                              className="col-lg-12 col-md-12 col-sm-12 col-12 mt--30"
                              data-sal-delay={150}
                              data-sal="slide-up"
                              data-sal-duration={800}
                            >
                              <div className="rbt-card variation-01 rbt-hover card-list-2">
                                <div className="rbt-card-img">
                                  <a href="#">
                                    <img
                                      src="assets/images/team/team-10.jpg"
                                      alt="Card image"
                                    />
                                  </a>
                                </div>
                                <div className="rbt-card-body">
                                  <div className="rbt-card-top">
                                    <div className="rbt-review">
                                      <div className="rating">
                                        <i className="fas fa-star" />
                                        <i className="fas fa-star" />
                                        <i className="fas fa-star" />
                                        <i className="fas fa-star" />
                                        <i className="fas fa-star" />
                                      </div>
                                      <span className="rating-count">
                                        {" "}
                                        (6000+ Reviews)
                                      </span>
                                    </div>
                                    <div className="rbt-bookmark-btn">
                                      <a
                                        className="rbt-round-btn"
                                        title="Bookmark"
                                        href="#"
                                      >
                                        <i className="feather-bookmark" />
                                      </a>
                                    </div>
                                  </div>
                                  <h4
                                    className="rbt-card-title"
                                    style={{ fontSize: 16 }}
                                  >
                                    <a href="#">
                                      Fast Track Your Career With Leadership
                                      Accelerator
                                    </a>
                                  </h4>
                                  <ul className="rbt-meta">
                                    <li>
                                      <i className="feather-book" />
                                      120 Lessons
                                    </li>
                                    <li>
                                      <i className="feather-users" />
                                      10000+ Students
                                    </li>
                                  </ul>
                                  <p className="rbt-card-text">
                                    Master strategic leadership, influence, and
                                    decision-making.
                                  </p>
                                  <div className="rbt-card-bottom">
                                    <a
                                      className="rbt-btn btn-border-gradient radius-round btn-sm hover-transform-none"
                                      href="for-individuals.html"
                                    >
                                      <span data-text="Enroll Now">
                                        Know More
                                      </span>
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {/* End Single Card  */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* End Mega Menu  */}
                </li>
                <li className="with-megamenu has-menu-child-item">
                  <a href="#">
                    For Organizations <i className="feather-chevron-down" />
                  </a>
                  {/* Start Mega Menu  */}
                  <div className="rbt-megamenu grid-item-2">
                    <div className="wrapper">
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="mega-top-banner-2 mb--0">
                            <div className="content">
                              <h4 className="title color-white">
                                For Organizations
                              </h4>
                              <p className="description color-white">
                                Stronger leaders. Sharper teams. Resilient
                                cultures. We align growth with your
                                organisation’s biggest goals.
                              </p>
                            </div>
                          </div>
                          {/* Start Card Area */}
                          <div className="row row--15">
                            {/* Start Single Card  */}
                            <div
                              className="col-lg-12 col-md-12 col-sm-12 col-12 mt--30"
                              data-sal-delay={150}
                              data-sal="slide-up"
                              data-sal-duration={800}
                            >
                              <div className="rbt-card variation-01 rbt-hover card-list-2">
                                <div className="rbt-card-img">
                                  <a href="#">
                                    <img
                                      src="assets/images/team/team-04.jpg"
                                      alt="Card image"
                                    />
                                  </a>
                                </div>
                                <div className="rbt-card-body">
                                  <div className="rbt-card-top">
                                    <div className="rbt-review">
                                      <div className="rating">
                                        <i className="fas fa-star" />
                                        <i className="fas fa-star" />
                                        <i className="fas fa-star" />
                                        <i className="fas fa-star" />
                                        <i className="fas fa-star" />
                                      </div>
                                      <span className="rating-count">
                                        {" "}
                                        (6000+ Reviews)
                                      </span>
                                    </div>
                                    <div className="rbt-bookmark-btn">
                                      <a
                                        className="rbt-round-btn"
                                        title="Bookmark"
                                        href="#"
                                      >
                                        <i className="feather-bookmark" />
                                      </a>
                                    </div>
                                  </div>
                                  <h4
                                    className="rbt-card-title"
                                    style={{ fontSize: 16 }}
                                  >
                                    <a href="#">
                                      Fast Track Your Career With Leadership
                                      Accelerator
                                    </a>
                                  </h4>
                                  <ul className="rbt-meta">
                                    <li>
                                      <i className="feather-book" />
                                      120 Lessons
                                    </li>
                                    <li>
                                      <i className="feather-users" />
                                      10000+ Students
                                    </li>
                                  </ul>
                                  <p className="rbt-card-text">
                                    Master strategic leadership, influence, and
                                    decision-making.
                                  </p>
                                  <div className="rbt-card-bottom"></div>
                                </div>
                              </div>
                            </div>
                            {/* End Single Card  */}
                            <div className="rbt-card-bottom">
                              <a
                                className="rbt-btn btn-border-gradient radius-round btn-sm hover-transform-none"
                                href="for-organizations-programs.html"
                              >
                                <span data-text="Enroll Now">Programs</span>
                              </a>
                              <a
                                className="rbt-btn btn-border-gradient radius-round btn-sm hover-transform-none"
                                href="for-organizations-leadership-consulting.html"
                              >
                                <span data-text="Enroll Now">
                                  Leadership Consulting
                                </span>
                              </a>
                              <a
                                className="rbt-btn btn-border-gradient radius-round btn-sm hover-transform-none"
                                href="for-organizations-speaking.html"
                              >
                                <span data-text="Enroll Now">Speaking</span>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* End Mega Menu  */}
                  </div>
                </li>
                <li className="has-dropdown has-menu-child-item">
                  <a href="the-masterclass.html">The MasterClass™</a>
                </li>
                <li className="with-megamenu has-menu-child-item position-static">
                  <a href="books.html">Books</a>
                </li>
              </ul>
            </nav>
          </div>
          <div className="header-right">
            {/* Navbar Icons */}
            <ul className="quick-access">
              <li className="access-icon">
                <a className="search-trigger-active rbt-round-btn" href="#">
                  <i className="feather-search" />
                </a>
              </li>
              <li className="access-icon rbt-mini-cart">
                <a
                  className="rbt-cart-sidenav-activation rbt-round-btn"
                  href="#"
                >
                  <i className="feather-shopping-cart" />
                  <span className="rbt-cart-count">4</span>
                </a>
              </li>
              <li className="account-access rbt-user-wrapper d-none d-xl-block">
                <a id="nav-login-link" className="d-none" href="login.html">
                  <i className="feather-user" /> Login
                </a>
                <a id="nav-user-link" className="d-none" href="#">
                  <i className="feather-user" />{" "}
                  <span id="nav-user-name">User</span>
                </a>
                <div className="rbt-user-menu-list-wrapper">
                  <div className="inner">
                    <div className="rbt-admin-profile">
                      <div className="admin-thumbnail">
                        <img
                          id="nav-user-avatar-desktop"
                          className="nav-user-avatar-img"
                          src="assets/images/team/avatar.jpg"
                          alt="User Avatar"
                        />
                      </div>
                      <div className="admin-info">
                        <span id="nav-user-name-dropdown" className="name">
                          User Name
                        </span>
                        <a
                          className="rbt-btn-link color-primary"
                          href="profile.html"
                        >
                          View Profile
                        </a>
                      </div>
                    </div>
                    <ul className="user-list-wrapper">
                      <li id="nav-bookmark-link">
                        <a href="#">
                          <i className="feather-bookmark" />
                          <span>Bookmark</span>
                        </a>
                      </li>
                      <li id="nav-reviews-link">
                        <a href="#">
                          <i className="feather-star" />
                          <span>Reviews</span>
                        </a>
                      </li>
                      <li>
                        <a href="instructor-settings.html">
                          <i className="feather-settings" />
                          <span>Settings</span>
                        </a>
                      </li>
                      <li className="instructor-only-link">
                        <a href="instructor-dashboard.html">
                          <i className="feather-home" />
                          <span>My Dashboard</span>
                        </a>
                      </li>
                      <li className="student-only-link">
                        <a href="student-dashboard.html">
                          <i className="feather-home" />
                          <span>My Dashboard</span>
                        </a>
                      </li>
                      <li className="student-only-link">
                        <a href="student-enrolled-courses.html">
                          <i className="feather-shopping-bag" />
                          <span>Enrolled Courses</span>
                        </a>
                      </li>
                    </ul>
                    <hr className="mt--10 mb--10" />
                    <ul className="user-list-wrapper">
                      <li>
                        <a className="logout-btn" href="#">
                          <i className="feather-log-out" />
                          <span>Logout</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
              <li className="access-icon rbt-user-wrapper d-block d-xl-none">
                <a className="rbt-round-btn" href="#">
                  <i className="feather-user" />
                </a>
                <div className="rbt-user-menu-list-wrapper">
                  <div className="inner">
                    <div className="rbt-admin-profile">
                      <div className="admin-thumbnail">
                        <img
                          id="nav-user-avatar-mobile"
                          className="nav-user-avatar-img"
                          src="assets/images/team/avatar.jpg"
                          alt="User Images"
                        />
                      </div>
                      <div className="admin-info">
                        <span className="name">RainbowIT</span>
                        <a
                          className="rbt-btn-link color-primary"
                          href="profile.html"
                        >
                          View Profile
                        </a>
                      </div>
                    </div>
                    <ul className="user-list-wrapper">
                      <li>
                        <a href="instructor-dashboard.html">
                          <i className="feather-home" />
                          <span>My Dashboard</span>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="feather-bookmark" />
                          <span>Bookmark</span>
                        </a>
                      </li>
                      <li>
                        <a href="instructor-enrolled-courses.html">
                          <i className="feather-shopping-bag" />
                          <span>Enrolled Courses</span>
                        </a>
                      </li>
                      <li>
                        <a href="instructor-wishlist.html">
                          <i className="feather-heart" />
                          <span>Wishlist</span>
                        </a>
                      </li>
                      <li>
                        <a href="instructor-reviews.html">
                          <i className="feather-star" />
                          <span>Reviews</span>
                        </a>
                      </li>
                      <li>
                        <a href="instructor-my-quiz-attempts.html">
                          <i className="feather-list" />
                          <span>My Quiz Attempts</span>
                        </a>
                      </li>
                      <li>
                        <a href="instructor-order-history.html">
                          <i className="feather-clock" />
                          <span>Order History</span>
                        </a>
                      </li>
                      <li>
                        <a href="instructor-quiz-attempts.html">
                          <i className="feather-message-square" />
                          <span>Question &amp; Answer</span>
                        </a>
                      </li>
                    </ul>
                    <hr className="mt--10 mb--10" />
                    <ul className="user-list-wrapper">
                      <li>
                        <a href="#">
                          <i className="feather-book-open" />
                          <span>Getting Started</span>
                        </a>
                      </li>
                    </ul>
                    <hr className="mt--10 mb--10" />
                    <ul className="user-list-wrapper">
                      <li>
                        <a href="instructor-settings.html">
                          <i className="feather-settings" />
                          <span>Settings</span>
                        </a>
                      </li>
                      <li>
                        <a href="index.html">
                          <i className="feather-log-out" />
                          <span>Logout</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
            </ul>
            <div className="rbt-btn-wrapper d-none d-xl-block">
              <a
                className="rbt-btn btn-border-gradient radius-round btn-sm hover-transform-none"
                href="#"
              >
                <span data-text="Enroll Now">Start Now</span>
              </a>
            </div>
            {/* Start Mobile-Menu-Bar */}
            <div className="mobile-menu-bar d-block d-xl-none">
              <div className="hamberger">
                <button className="hamberger-button rbt-round-btn">
                  <i className="feather-menu" />
                </button>
              </div>
            </div>
            {/* Start Mobile-Menu-Bar */}
          </div>
        </div>
      </div>
      {/* Start Search Dropdown  */}
      <div className="rbt-search-dropdown">
        <div className="wrapper">
          <div className="row">
            <div className="col-lg-12">
              <form action="#" id="main-search-form">
                <input
                  id="main-search-input"
                  type="text"
                  placeholder="What are you looking for?"
                />
                <div className="submit-btn">
                  <button type="submit" className="rbt-btn btn-gradient btn-md">
                    Search
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="rbt-separator-mid">
            <hr className="rbt-separator m-0" />
          </div>
          <div
            id="search-dropdown-courses-container"
            className="row g-4 pt--30 pb--60"
          >
            <div className="col-lg-12">
              <div className="section-title">
                <h5 className="rbt-title-style-2">Our Top Courses</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End Search Dropdown  */}
    </div>
    {/* Start Side Vav */}
    <div className="rbt-offcanvas-side-menu rbt-category-sidemenu">
      <div className="inner-wrapper">
        <div className="inner-top">
          <div className="inner-title">
            <h4 className="title">Course Category</h4>
          </div>
          <div className="rbt-btn-close">
            <button className="rbt-close-offcanvas rbt-round-btn">
              <i className="feather-x" />
            </button>
          </div>
        </div>
        <nav className="side-nav w-100">
          <ul className="rbt-vertical-nav-list-wrapper vertical-nav-menu">
            <li className="vertical-nav-item">
              <a href="#">Course School</a>
              <div className="vartical-nav-content-menu-wrapper">
                <div className="vartical-nav-content-menu">
                  <h3 className="rbt-short-title">Course Title</h3>
                  <ul className="rbt-vertical-nav-list-wrapper">
                    <li>
                      <a href="#">C-Level</a>
                    </li>
                    <li>
                      <a href="#">Management</a>
                    </li>
                    <li>
                      <a href="#">Operations</a>
                    </li>
                    <li>
                      <a href="#">Human Resource</a>
                    </li>
                  </ul>
                </div>
                <div className="vartical-nav-content-menu">
                  <h3 className="rbt-short-title">Course Title</h3>
                  <ul className="rbt-vertical-nav-list-wrapper">
                    <li>
                      <a href="#">C-Level</a>
                    </li>
                    <li>
                      <a href="#">Management</a>
                    </li>
                    <li>
                      <a href="#">Operations</a>
                    </li>
                    <li>
                      <a href="#">Human Resource</a>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
            <li className="vertical-nav-item">
              <a href="#">Online School</a>
              <div className="vartical-nav-content-menu-wrapper">
                <div className="vartical-nav-content-menu">
                  <h3 className="rbt-short-title">Course Title</h3>
                  <ul className="rbt-vertical-nav-list-wrapper">
                    <li>
                      <a href="#">C-Level</a>
                    </li>
                    <li>
                      <a href="#">Management</a>
                    </li>
                    <li>
                      <a href="#">Operations</a>
                    </li>
                    <li>
                      <a href="#">Human Resource</a>
                    </li>
                  </ul>
                </div>
                <div className="vartical-nav-content-menu">
                  <h3 className="rbt-short-title">Course Title</h3>
                  <ul className="rbt-vertical-nav-list-wrapper">
                    <li>
                      <a href="#">C-Level</a>
                    </li>
                    <li>
                      <a href="#">Management</a>
                    </li>
                    <li>
                      <a href="#">Operations</a>
                    </li>
                    <li>
                      <a href="#">Human Resource</a>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
            <li className="vertical-nav-item">
              <a href="#">kindergarten</a>
              <div className="vartical-nav-content-menu-wrapper">
                <div className="vartical-nav-content-menu">
                  <h3 className="rbt-short-title">Course Title</h3>
                  <ul className="rbt-vertical-nav-list-wrapper">
                    <li>
                      <a href="#">C-Level</a>
                    </li>
                    <li>
                      <a href="#">Management</a>
                    </li>
                    <li>
                      <a href="#">Operations</a>
                    </li>
                    <li>
                      <a href="#">Human Resource</a>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
            <li className="vertical-nav-item">
              <a href="#">Classic LMS</a>
              <div className="vartical-nav-content-menu-wrapper">
                <div className="vartical-nav-content-menu">
                  <h3 className="rbt-short-title">Course Title</h3>
                  <ul className="rbt-vertical-nav-list-wrapper">
                    <li>
                      <a href="#">C-Level</a>
                    </li>
                    <li>
                      <a href="#">Management</a>
                    </li>
                    <li>
                      <a href="#">Operations</a>
                    </li>
                    <li>
                      <a href="#">Human Resource</a>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
          </ul>
          <div className="read-more-btn">
            <div className="rbt-btn-wrapper mt--20">
              <a
                className="rbt-btn btn-border-gradient radius-round btn-sm hover-transform-none w-100 justify-content-center text-center"
                href="#"
              >
                <span>Learn More</span>
              </a>
            </div>
          </div>
        </nav>
        <div className="rbt-offcanvas-footer"></div>
      </div>
    </div>
    {/* End Side Vav */}
    <a className="rbt-close_side_menu" href="javascript:void(0);" />
  </header>
  {/* Mobile Menu Section */}
  <div className="popup-mobile-menu">
    <div className="inner-wrapper">
      <div className="inner-top">
        <div className="content">
          <div className="logo">
            <div className="logo logo-dark">
              <a href="index.html">
                <img
                  src="assets/images/logo/logo.png"
                  alt="Education Logo Images"
                />
              </a>
            </div>
            <div className="logo d-none logo-light">
              <a href="index.html">
                <img
                  src="assets/images/dark/logo/logo-light.png"
                  alt="Education Logo Images"
                />
              </a>
            </div>
          </div>
          <div className="rbt-btn-close">
            <button className="close-button rbt-round-btn">
              <i className="feather-x" />
            </button>
          </div>
        </div>
        <p className="description">Leadership Accelerator</p>
        <ul className="navbar-top-left rbt-information-list justify-content-start">
          <li>
            <a href="mailto:hello@example.com">
              <i className="feather-mail" />
              example@example.com
            </a>
          </li>
          <li>
            <a href="#">
              <i className="feather-phone" />
              +91 99456 91103
            </a>
          </li>
        </ul>
      </div>
      <nav className="mainmenu-nav">
        <ul className="mainmenu">
          <li className="with-megamenu has-menu-child-item position-static">
            <a href="index.html">Home</a>
          </li>
          <li className="with-megamenu has-menu-child-item">
            <a href="#">
              Courses <i className="feather-chevron-down" />
            </a>
            {/* Start Mega Menu  */}
            <div className="rbt-megamenu grid-item-2">
              <div className="wrapper">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="mega-top-banner">
                      <div className="content">
                        <h4 className="title">The Leadership Forgeˀ</h4>
                        <p className="description">
                          A journey to – Elevate, Transform &amp; Lead by
                          Leadership &amp; Business Coaches
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row row--15">
                  <div className="col-lg-12 col-xl-6 col-xxl-6 single-mega-item">
                    <h3 className="rbt-short-title">Course Layout</h3>
                    <ul className="mega-menu-item">
                      <li>
                        <a href="explore-courses.html">Filter One Toggle</a>
                      </li>
                      <li>
                        <a href="explore-courses.html">Filter One Open</a>
                      </li>
                      <li>
                        <a href="course-filter-two-toggle.html">
                          Filter Two Toggle
                        </a>
                      </li>
                      <li>
                        <a href="course-filter-two-open.html">
                          Filter Two Open
                        </a>
                      </li>
                      <li>
                        <a href="course-with-tab.html">Course With Tab</a>
                      </li>
                      <li>
                        <a href="course-with-tab-two.html">
                          Course With Tab Two
                        </a>
                      </li>
                      <li>
                        <a href="course-card-2.html">Course Card Two</a>
                      </li>
                      <li>
                        <a href="course-card-3.html">Course Card Three</a>
                      </li>
                      <li>
                        <a href="course-masonry.html">Course Masonry</a>
                      </li>
                      <li>
                        <a href="course-with-sidebar.html">
                          Course With Sidebar
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="col-lg-12 col-xl-6 col-xxl-6 single-mega-item">
                    <h3 className="rbt-short-title">Course Layout</h3>
                    <ul className="mega-menu-item">
                      <li>
                        <a href="course-details.html">Course Details</a>
                      </li>
                      <li>
                        <a href="course-details-2.html">Course Details Two</a>
                      </li>
                      <li>
                        <a href="course-details-3.html">Course Details Three</a>
                      </li>
                      <li>
                        <a href="course-details-4.html">Course Details Four</a>
                      </li>
                      <li>
                        <a href="course-details-5.html">Course Details Five</a>
                      </li>
                      <li>
                        <a href="course-details-6.html">Course Details Six</a>
                      </li>
                      <li>
                        <a href="course-details-7.html">Course Details Seven</a>
                      </li>
                      <li>
                        <a href="course-details-8.html">Course Details Eight</a>
                      </li>
                      <li>
                        <a href="lesson.html">
                          Course Lesson{" "}
                          <span className="rbt-badge-card">New</span>
                        </a>
                      </li>
                      <li>
                        <a href="create-course.html">
                          Create Course{" "}
                          <span className="rbt-badge-card">New</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12">
                    <ul className="nav-quick-access">
                      <li>
                        <a href="#">
                          <i className="feather-folder-minus" /> Quick Start
                          Guide
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="feather-folder-minus" /> For Open Source
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="feather-folder-minus" /> Course Status
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="feather-folder-minus" /> Support
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            {/* End Mega Menu  */}
          </li>
          <li className="has-dropdown has-menu-child-item">
            <a href="the-masterclass.html">The MasterClass™</a>
          </li>
          <li className="with-megamenu has-menu-child-item position-static">
            <a href="books.html">Books</a>
          </li>
        </ul>
      </nav>
      <div className="mobile-menu-bottom">
        <div className="rbt-btn-wrapper mb--20">
          <a
            className="rbt-btn btn-border-gradient radius-round btn-sm hover-transform-none w-100 justify-content-center text-center"
            href="#"
          >
            <span>Enroll Now</span>
          </a>
        </div>
        <div className="social-share-wrapper">
          <span className="rbt-short-title d-block">Find With Us</span>
          <ul className="social-icon social-default transparent-with-border justify-content-start mt--20">
            <li>
              <a href="https://www.facebook.com/">
                <i className="feather-facebook" />
              </a>
            </li>
            <li>
              <a href="https://www.twitter.com">
                <i className="feather-twitter" />
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/">
                <i className="feather-instagram" />
              </a>
            </li>
            <li>
              <a href="https://www.linkdin.com/">
                <i className="feather-linkedin" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  {/* Start Side Vav */}
  <div className="rbt-cart-side-menu">
    <div className="inner-wrapper">
      <div className="inner-top">
        <div className="content">
          <div className="title">
            <h4 className="title mb--0">Your cart</h4>
          </div>
          <div className="rbt-btn-close" id="btn_sideNavClose">
            <button className="minicart-close-button rbt-round-btn">
              <i className="feather-x" />
            </button>
          </div>
        </div>
      </div>
      <nav className="side-nav w-100">
        <ul className="rbt-minicart-wrapper"></ul>
      </nav>
      <div className="rbt-minicart-footer">
        <hr className="mb--0" />
        <div className="rbt-cart-subttotal">
          <p className="subtotal">
            <strong>Subtotal:</strong>
          </p>
          <p className="price">$0</p>
        </div>
        <hr className="mb--0" />
        <div className="rbt-minicart-bottom mt--20">
          <div className="view-cart-btn">
            <a
              className="rbt-btn btn-border-gradient hover-icon-reverse radius-round w-100 text-center"
              href="checkout.html"
            >
              <span className="btn-text">Checkout</span>
              <span className="btn-icon">
                <i className="feather-arrow-right" />
              </span>
            </a>
          </div>
          <div className="checkout-btn mt--20">
            <a
              className="rbt-btn btn-border-gradient hover-icon-reverse radius-round w-100 text-center"
              href="cart.html"
            >
              <span className="btn-text">View Cart</span>
              <span className="btn-icon">
                <i className="feather-arrow-right" />
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* End Side Vav */}
  <a className="close_side_menu" href="javascript:void(0);" />
</>

                {/* ▲▲▲ END OF HEADER HTML ▲▲▲ */}

                <main className="rbt-main-wrapper">
                    {children}
                </main>

                {/* ▼▼▼ PASTE YOUR FULL FOOTER HTML HERE ▼▼▼ */}
                <>
  {/* Start Footer aera */}
  <footer className="rbt-footer footer-style-1">
    <div className="footer-top">
      <div className="container">
        <div className="row row--15 mt_dec--30">
          <div className="col-lg-4 col-md-6 col-sm-6 col-12 mt--30">
            <div className="footer-widget">
              <div className="logo logo-dark logo-footer">
                <a href="index.html">
                  <img src="assets/images/logo/logo.png" alt="Edu-cause" />
                </a>
              </div>
              <div className="logo d-none logo-light logo-footer">
                <a href="index.html">
                  <img
                    src="assets/images/dark/logo/logo-light.png"
                    alt="Edu-cause"
                  />
                </a>
              </div>
              <p className="description mt--20">
                We help individuals and businesses master critical and essential
                skills to stay ahead in rapidly changing business dynamics.
              </p>
              <div className="contact-btn mt--30">
                <a
                  className="rbt-btn hover-icon-reverse btn-border-gradient radius-round"
                  href="#"
                >
                  <div className="icon-reverse-wrapper">
                    <span className="btn-text">Connect With Us</span>
                    <span className="btn-icon">
                      <i className="feather-arrow-right" />
                    </span>
                    <span className="btn-icon">
                      <i className="feather-arrow-right" />
                    </span>
                  </div>
                </a>
              </div>
            </div>
          </div>
          <div className="offset-lg-1 col-lg-2 col-md-6 col-sm-6 col-12 mt--30">
            <div className="footer-widget">
              <h5 className="ft-title">Useful Links</h5>
              <ul className="ft-link">
                <li>
                  <a href="about-us.html">About Us</a>
                </li>
                <li>
                  <a href="careers.html">Careers</a>
                </li>
                <li>
                  <a href="resources.html">Resources</a>
                </li>
                <li>
                  <a href="contact.html">Contact Us</a>
                </li>
                <li>
                  <a href="faqs.html">FAQs</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-2 col-md-6 col-sm-6 col-12 mt--30">
            <div className="footer-widget">
              <h5 className="ft-title">Our Company</h5>
              <ul className="ft-link">
                <li>
                  <a href="contact.html">Contact Us</a>
                </li>
                <li>
                  <a href="join-our-global-faculty.html">
                    Join Our Global Faculty
                  </a>
                </li>
                <li>
                  <a href="instructor.html">Instructor</a>
                </li>
                <li>
                  <a href="customer-love.html">Customer Love</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-6 col-12 mt--30">
            <div className="footer-widget">
              <h5 className="ft-title">Get Contact</h5>
              <ul className="ft-link">
                <li>
                  <span>E-mail:</span>{" "}
                  <a href="mailto:info@leadershipaccel.com">
                    info@leadershipaccel.com
                  </a>
                </li>
              </ul>
              <ul className="social-icon social-default icon-naked justify-content-start mt--20">
                <li>
                  <a href="https://www.facebook.com/">
                    <i className="feather-facebook" />
                  </a>
                </li>
                <li>
                  <a href="https://www.twitter.com">
                    <i className="feather-twitter" />
                  </a>
                </li>
                <li>
                  <a href="https://www.instagram.com/">
                    <i className="feather-instagram" />
                  </a>
                </li>
                <li>
                  <a href="https://www.linkdin.com/">
                    <i className="feather-linkedin" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
  {/* End Footer aera */}
  <div className="rbt-separator-mid">
    <div className="container">
      <hr className="rbt-separator m-0" />
    </div>
  </div>
  {/* Start Copyright Area  */}
  <div className="copyright-area copyright-style-1 ptb--20">
    <div className="container">
      <div className="row align-items-center">
        <div className="col-xxl-5 col-xl-5 col-lg-5 col-md-12 col-12">
          <p className="rbt-link-hover text-center text-lg-start">
            Copyright © 2025{" "}
            <a href="https://majormod.com">Leadership Accelerator.</a> All
            Rights Reserved
          </p>
        </div>
        <div className="col-xxl-7 col-xl-7 col-lg-7 col-md-12 col-12">
          <ul className="copyright-link rbt-link-hover justify-content-center justify-content-lg-end mt_sm--10 mt_md--10">
            <li className="small">
              <a href="terms-and-conditions.html">Terms of service</a>
            </li>
            <li className="small">
              <a href="privacy-policy.html">Privacy policy</a>
            </li>
            <li className="small">
              <a href="refund-and-cancellation-policy.html">
                Refund &amp; Cancellation Policy
              </a>
            </li>
            <li className="small">
              <a href="shipping-and-delivery-policy.html">
                Shipping &amp; Delivery Policy
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  {/* End Copyright Area  */}
</>

                {/* ▲▲▲ END OF FOOTER HTML ▲▲▲ */}
            </div>

            {/* In components/LmsLayout.js */}
<Script src="/assets/js/vendor/jquery.js" strategy="beforeInteractive" />
<Script src="/assets/js/vendor/bootstrap.min.js" strategy="lazyOnload" />

{/* ADD THIS LINE */}
<Script src="/assets/js/vendor/sal.js" strategy="lazyOnload" />

{/* Your other scripts */}
<Script src="/assets/js/main.js" strategy="lazyOnload" />
<Script src="/assets/js/nav.js" strategy="lazyOnload" />
        </>
    );
};

export default LmsLayout;