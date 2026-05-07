import { useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight, Mail, Menu, PlayCircle, Sparkles, X } from 'lucide-react'
import { poojas } from './data/poojas.js'

function Header({ page, setPage }) {
  const [open, setOpen] = useState(false)
  const nav = [
    ['home', 'Home'],
    ['about', 'About'],
    ['seva', 'Pooja Seva'],
    ['contact', 'Contact Us']
  ]

  return (
    <header className="header">
      <div className="brand" onClick={() => setPage('home')}>
        <div className="brandMark">ॐ</div>
        <div>
          <div className="brandTitle">PanditJi</div>
          <div className="brandSub">by Dharma Path USA</div>
        </div>
      </div>

      <nav className="nav desktopNav">
        {nav.map(([key, label]) => (
          <button key={key} className={page === key ? 'active' : ''} onClick={() => setPage(key)}>
            {label}
          </button>
        ))}
      </nav>

      <button className="menuBtn" onClick={() => setOpen(true)}><Menu size={24} /></button>

      {open && (
        <div className="mobilePanel">
          <button className="closeBtn" onClick={() => setOpen(false)}><X /></button>
          {nav.map(([key, label]) => (
            <button key={key} onClick={() => { setPage(key); setOpen(false) }}>
              {label}
            </button>
          ))}
        </div>
      )}
    </header>
  )
}

function Home({ setPage }) {
  return (
    <main>
      <section className="hero">
        <div className="heroText">
          <div className="eyebrow"><Sparkles size={18} /> Guided Vedic Pooja Seva</div>
          <h1>Bring sacred Vedic rituals into your home with guided devotion.</h1>
          <p>
            PanditJi offers clear priest-led video guidance, samagri checklists, mantras, and step-by-step support so families can perform pooja with faith and confidence.
          </p>
          <div className="heroActions">
            <button className="primary" onClick={() => setPage('seva')}>Explore Pooja Seva</button>
            <button className="secondary" onClick={() => setPage('about')}>Learn More</button>
          </div>
        </div>
        <div className="heroCard">
          <div className="lamp">🪔</div>
          <h3>Available Pooja Seva</h3>
          <h2>Satyanarayan Pooja</h2>
          <p>Follow the complete pooja sequence with devotion, preparation, mantras, and guided video steps.</p>
          <button className="primary wide" onClick={() => setPage('seva')}>Start Pooja</button>
        </div>
      </section>

      <section className="features">
        <div><strong>Sacred sequence</strong><span>Follow each part of the pooja in the right order.</span></div>
        <div><strong>Priest-led guidance</strong><span>Watch and follow every step with clarity.</span></div>
        <div><strong>Devotional support</strong><span>Prepare, perform, and complete pooja with confidence.</span></div>
      </section>
    </main>
  )
}

function About() {
  return (
    <main className="pageWrap">
      <section className="contentCard">
        <h1>About Dharma Path & PanditJi</h1>
        <p>
          Dharma Path USA is dedicated to preserving and sharing Vedic traditions, spiritual wisdom,
          and devotional practices with families and communities.
        </p>
        <p>
          PanditJi is a virtual pooja guide created to help devotees perform sacred rituals at home
          with clarity, devotion, and confidence. Through step-by-step priest-led videos, families can
          follow each part of the pooja in an organized and respectful way.
        </p>
        <p>
          The purpose is not to replace devotion, but to support it — making traditional
          Vedic rituals more accessible for families, especially when a priest is not physically available.
        </p>
      </section>
    </main>
  )
}

function Seva({ openPooja }) {
  const pooja = poojas[0]
  return (
    <main className="pageWrap">
      <div className="sectionTitle">
        <h1>Pooja Seva</h1>
        <p>Choose a guided pooja experience. Begin with the available guided pooja seva. More sacred rituals will be added soon.</p>
      </div>
      <div className="poojaGrid">
        <article className="poojaCard">
          <div className="poojaIcon">{pooja.image}</div>
          <div className="tag">Available Now</div>
          <h2>{pooja.title}</h2>
          <p>{pooja.description}</p>
          <div className="meta"><span>{pooja.duration}</span><span>{pooja.level}</span></div>
          <button className="primary wide" onClick={() => openPooja(pooja.id)}>
            <PlayCircle size={18} /> Begin Guided Pooja
          </button>
        </article>
        {['Ganesh Pooja', 'Griha Pravesh', 'Navagraha Shanti'].map((name) => (
          <article className="poojaCard muted" key={name}>
            <div className="poojaIcon">🌺</div>
            <div className="tag mutedTag">Coming Soon</div>
            <h2>{name}</h2>
            <p>Guided seva for this pooja will be available soon.</p>
          </article>
        ))}
      </div>
    </main>
  )
}

function PoojaPlayer({ poojaId, goBack }) {
  const pooja = poojas.find((p) => p.id === poojaId) || poojas[0]
  const [stepIndex, setStepIndex] = useState(0)
  const step = pooja.steps[stepIndex]
  const progress = useMemo(() => Math.round(((stepIndex + 1) / pooja.steps.length) * 100), [stepIndex, pooja.steps.length])

  return (
    <main className="playerWrap">
      <div className="playerTop">
        <button className="textBtn" onClick={goBack}><ChevronLeft size={18} /> Back to Pooja Seva</button>
        <div className="progressText">Step {stepIndex + 1} of {pooja.steps.length}</div>
      </div>

      <div className="progressBar"><span style={{ width: `${progress}%` }} /></div>

      <section className="playerGrid">
        <div className="videoCard">
          <iframe src={step.videoUrl} title={step.title} allowFullScreen />
        </div>

        <aside className="stepPanel">
          <div className="tag">{pooja.title}</div>
          <h1>{step.title}</h1>
          <p>{step.description}</p>
          {step.mantra && <div className="mantra"><strong>Mantra</strong><span>{step.mantra}</span></div>}
          <div className="controls">
            <button className="secondary" disabled={stepIndex === 0} onClick={() => setStepIndex(stepIndex - 1)}>
              <ChevronLeft size={18} /> Previous
            </button>
            <button className="primary" disabled={stepIndex === pooja.steps.length - 1} onClick={() => setStepIndex(stepIndex + 1)}>
              Next <ChevronRight size={18} />
            </button>
          </div>
        </aside>
      </section>

      <section className="contentCard samagri">
        <h2>Samagri Checklist</h2>
        <div className="checkGrid">
          {pooja.samagri.map((item) => <label key={item}><input type="checkbox" /> {item}</label>)}
        </div>
      </section>
    </main>
  )
}

function Contact() {
  return (
    <main className="pageWrap">
      <section className="contentCard contactCard">
        <h1>Contact Us</h1>
        <p>For pooja seva questions, feedback, or community collaboration, please contact Dharma Path USA.</p>
        <a href="mailto:seva@dharmpathusa.com"><Mail size={18} /> seva@dharmpathusa.com</a>
      </section>
    </main>
  )
}

export default function App() {
  const [page, setPage] = useState('home')
  const [activePooja, setActivePooja] = useState(null)

  if (activePooja) {
    return <><Header page="seva" setPage={(p) => { setActivePooja(null); setPage(p) }} /><PoojaPlayer poojaId={activePooja} goBack={() => setActivePooja(null)} /></>
  }

  return (
    <>
      <Header page={page} setPage={setPage} />
      {page === 'home' && <Home setPage={setPage} />}
      {page === 'about' && <About />}
      {page === 'seva' && <Seva openPooja={setActivePooja} />}
      {page === 'contact' && <Contact />}
      <footer>© {new Date().getFullYear()} Dharma Path USA Foundation • PanditJi</footer>
    </>
  )
}
