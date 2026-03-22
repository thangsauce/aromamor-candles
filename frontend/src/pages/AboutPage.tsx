import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function AboutPage() {
  return (
    <>
      <Header />
      <main style={{ width: "100%" }}>

        {/* Hero */}
        <section className="hero">
          <div className="wrap hero-card">
            <p className="kicker">🕯️ Our Story</p>
            <h2>Made with intention,<br />poured with love.</h2>
            <p className="muted">
              Aromamor was born from a love of travel and the belief that a single
              scent can transport you anywhere in the world.
            </p>
          </div>
        </section>

        <div className="wrap" style={{ paddingTop: 0 }}>
          <div className="about-layout">

            {/* Founder section */}
            <section className="about-card about-founder">
              <div className="about-avatar">
                <span>✈️</span>
              </div>
              <div className="about-founder-text">
                <h3>Hi, I'm the founder of Aromamor</h3>
                <p>
                  Every candle in our collection is inspired by a place I've dreamed
                  of — or been lucky enough to visit. I started Aromamor because I
                  wanted a way to hold onto those memories, to bring a little piece
                  of the world into my home.
                </p>
                <p>
                  Each scent is carefully crafted to capture not just a location, but
                  a feeling — the warmth of a Parisian café on a rainy afternoon, the
                  salt air of the Amalfi Coast at sunrise, the calm of a first-class
                  lounge before a big trip.
                </p>
                <p>
                  I hand-pour every candle in small batches using a clean soy blend,
                  and I obsess over every note in every fragrance until it feels just
                  right. This is more than a candle brand — it's a passport for your
                  senses.
                </p>
                <div className="about-signature">— The Founder</div>
              </div>
            </section>

            {/* Values grid */}
            <section className="about-section">
              <h3 className="about-section-title">What we stand for</h3>
              <div className="about-values-grid">
                {[
                  {
                    icon: "🌿",
                    title: "Clean Ingredients",
                    desc: "100% soy wax blend, phthalate-free fragrance oils, and cotton wicks. Nothing that shouldn't be in your home.",
                  },
                  {
                    icon: "🤲",
                    title: "Hand-Poured",
                    desc: "Every candle is poured in small batches by hand. No factories, no shortcuts — just care in every pour.",
                  },
                  {
                    icon: "✈️",
                    title: "Travel-Inspired",
                    desc: "Our scents are rooted in real places and real memories. Each one tells a story.",
                  },
                  {
                    icon: "💛",
                    title: "Community First",
                    desc: "We're a small business and every order means the world to us. Your support keeps us going.",
                  },
                ].map((v) => (
                  <div key={v.title} className="about-value-card">
                    <div className="about-value-icon">{v.icon}</div>
                    <h4>{v.title}</h4>
                    <p className="muted">{v.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Candle care */}
            <section className="about-section">
              <h3 className="about-section-title">Candle Care Tips</h3>
              <div className="about-care-grid">
                {[
                  {
                    icon: "🕯️",
                    title: "First Burn",
                    desc: "Always burn until the wax pool reaches the edge of the jar on the first use. This prevents tunneling and maximizes your burn time.",
                  },
                  {
                    icon: "✂️",
                    title: "Trim Your Wick",
                    desc: "Trim the wick to ¼ inch before every burn. This keeps the flame clean and your scent true.",
                  },
                  {
                    icon: "⏱️",
                    title: "Burn Time",
                    desc: "Never burn for more than 4 hours at a time. Let the candle cool for 2 hours before relighting.",
                  },
                  {
                    icon: "🚫",
                    title: "Safety First",
                    desc: "Keep away from drafts, children, and pets. Never leave a burning candle unattended.",
                  },
                ].map((tip) => (
                  <div key={tip.title} className="about-care-card">
                    <span className="about-care-icon">{tip.icon}</span>
                    <div>
                      <h4>{tip.title}</h4>
                      <p className="muted">{tip.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* CTA */}
            <section className="about-cta">
              <div className="about-cta-inner">
                <h3>Ready to find your destination?</h3>
                <p className="muted">
                  Browse our full collection and find the scent that takes you there.
                </p>
                <div className="about-cta-btns">
                  <Link className="btn primary" to="/">
                    ✈️ Shop All Candles
                  </Link>
                  <Link className="btn" to="/reviews">
                    ⭐ Read Reviews
                  </Link>
                </div>
              </div>
            </section>

          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
