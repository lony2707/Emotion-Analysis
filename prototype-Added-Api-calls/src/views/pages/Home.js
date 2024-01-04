import { Link } from "react-router-dom";
import feature1 from "../../dist/images/feature-icon-01.svg";
import feature2 from "../../dist/images/feature-icon-02.svg";
import feature3 from "../../dist/images/feature-icon-03.svg";
import feature4 from "../../dist/images/feature-icon-04.svg";
import feature5 from "../../dist/images/feature-icon-05.svg";
import feature6 from "../../dist/images/feature-icon-06.svg";
import heroImg from '../../dist/images/hero_img.png'

const Home = () => {
  return (
    <>
      <section className="hero">
        <div className="container">
          <div className="hero-inner">
            <div className="hero-copy">
              <h1 className="hero-title mt-0">
              Social Media Emotion Analyzer
              </h1>
              <p className="hero-paragraph">
                No need of dozones of Physiatrist sessions. 
                Use emotion analyzer tools to make sense of unstructured data, like tweets, Facebook comments, and Instagram posts. 
                Gain actionable insights that can help to make intelligent decisions.
              </p>
              <div className="hero-cta">
                <Link className="button button-primary" to="/dashboard/">
                  Start your Analysis
                </Link>
                <Link className="button" to="/help/">
                  Product Demo
                </Link>
              </div>
            </div>
            <div className="hero-figure anime-element">
             <img src={heroImg} alt="" srcset="" />
            </div>
          </div>
        </div>
      </section>


   

      <section className="pricing section">
        <div className="container-sm">
          <div className="pricing-inner section-inner">
            <div className="pricing-tables-wrap">
              <div className="pricing-table">
                <div className="pricing-table-inner1 is-revealing-1">
                  <div className="pricing-table-main">
                    <div className="pricing-table-header pb-24">
                      <div className="pricing-table-price">
                        <span className="pricing-table-price-amount h1">
                          Features
                        </span>
                        <span className="text-xs"> / Scopes</span>
                      </div>
                    </div>
                    <div className="pricing-table-features-title text-xs pt-24 pb-24">
                      What you will get
                    </div>
                    <ul className="pricing-table-features list-reset text-xs">
                      <li>
                        <span>
                          Twitter parsing
                        </span>
                      </li>
                      <li>
                        <span>
                          Instagram, Facebook, post and comments analysis
                        </span>
                      </li>
                      <li>
                        <span>
                          Realtime parsing
                        </span>
                      </li>
                      <li>
                        <span>
                          Feature rich dashboard
                        </span>
                      </li>
                      <li>
                        <span>
                          Mental condition of a person over a period of time.
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div className="pricing-table-cta mb-8">
                    <Link
                      className="button button-primary button-shadow button-block"
                      Link
                      to="/dashboard/"
                    >
                      Start Using it
                    </Link>
                  </div>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pricing section">
        <div className="container">
          <div className="pricing-inner section-inner">
              <div className="hero-inner">
                <div>
                  <h2 className="section-title mt-0">How your loved ones are feeling?</h2>
                  <p className="section-paragraph mb-0" style={{padding: 0}}>
                  Emotions are often triggered by social events: 
                  we are sad when we miss someone, happy when we meet loved
                   ones, or angry when someone unhappy.
                  </p>
                </div>
                <div className="">
                  <img
                    src="https://camo.githubusercontent.com/e0b7d7ec4c1869e74abb67a55a28a909b1e5903b533e572bf8ddb479058d83be/68747470733a2f2f696d616765732e756e73706c6173682e636f6d2f70686f746f2d313536313231303539362d3338333436346134326265333f697869643d4d6e77784d6a4133664442384d48787761473930627931775957646c664878386647567566444238664878382669786c69623d72622d312e322e31266175746f3d666f726d6174266669743d63726f7026773d36333426713d3830"
                    alt="" srcset="" style={{borderRadius: '8px' }} />
                </div>
              </div>
          </div>
        </div>
      </section>

      <section className="features1 section">
        <div className="container">
        
          <div className="features-inner section-inner ">
            <div className="features-wrap">
              <div className="feature text-center is-revealing-1">
                <div className="feature-inner">
                  <div className="feature-icon">
                    <img src={feature1} alt="Feature 01" />
                  </div>
                  <h4 className="feature-title mt-24">Post Emotion</h4>
                  <p className="text-sm mb-0">
                  Analyzing and understanding the emotion linked with social media content. 
                  </p>
                </div>
              </div>
              <div className="feature text-center is-revealing-1">
                <div className="feature-inner">
                  <div className="feature-icon">
                    <img src={feature2} alt="Feature 02" />
                  </div>
                  <h4 className="feature-title mt-24">Socail Media</h4>
                  <p className="text-sm mb-0">
                  Collecting and analyzing information on how people talk about different things on social media.
                  </p>
                </div>
              </div>
              <div className="feature text-center is-revealing-1">
                <div className="feature-inner">
                  <div className="feature-icon">
                    <img src={feature3} alt="Feature 03" />
                  </div>
                  <h4 className="feature-title mt-24">How to Login</h4>
                  <p className="text-sm mb-0">
                    Login into the system using your credential then go to
                    dashboard and parse post with url or write post.
                  </p>
                </div>
              </div>
              <div className="feature text-center is-revealing-1">
                <div className="feature-inner">
                  <div className="feature-icon">
                    <img src={feature4} alt="Feature 04" />
                  </div>
                  <h4 className="feature-title mt-24">Evaluate emotions</h4>
                  <p className="text-sm mb-0">
                  This can be done through a variety of methods, including text analysis, sentiment analysis image analysis and
                  real time post feedback.
                  </p>
                </div>
              </div>
              <div className="feature text-center is-revealing-1">
                <div className="feature-inner">
                  <div className="feature-icon">
                    <img src={feature5} alt="Feature 05" />
                  </div>
                  <h4 className="feature-title mt-24">Why</h4>
                  <p className="text-sm mb-0">
                    This project allows showing the real time analysis of social media content. 
                    It can be useful to find what kind of mental state a person is going through.
                  </p>
                </div>
              </div>
              <div className="feature text-center is-revealing-1">
                <div className="feature-inner">
                  <div className="feature-icon">
                    <img src={feature6} alt="Feature 06" />
                  </div>
                  <h4 className="feature-title mt-24">Future Scope</h4>
                  <p className="text-sm mb-0">
                   It is based on ML based classifier which provides you expression of a person. Can give you emotion graph based on timeline, average, find mental pressure. 
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


    

      <section className="cta section" style={{ marginBottom: "3em" }}>
        <div className="container">
          <div className="cta-inner section-inner">
            <h3 className="section-title mt-0">Don't have account?</h3>
            <div className="cta-cta">
              <Link
                className="button button-primary button-wide-mobile"
                to="/signup/"
              >
                Create Account
              </Link>
            </div>
          </div>
        </div>
      </section> 

    </>
  );
};

export default Home;
