import { useEffect, useState, type FormEvent } from 'react'
import { BookingModal, ProductModal } from './components/Modals'
import { featuredItems, menuItems, navLinks } from './data/menu'
import { useMatchaMotion } from './hooks/useMatchaMotion'
import './index.css'

const heroTitleLines = ['一席抹茶', '擺滿整張餐桌']

export default function App() {
  const [openId, setOpenId] = useState<string | null>(null)
  const [booking, setBooking] = useState(false)
  const [sent, setSent] = useState(false)

  useMatchaMotion(true)

  const openItem = featuredItems.find((item) => item.id === openId) ?? null

  useEffect(() => {
    const locked = Boolean(openItem || booking)
    document.body.style.overflow = locked ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [openItem, booking])

  const openBooking = () => {
    setBooking(true)
    setSent(false)
    setOpenId(null)
  }

  const closeBooking = () => {
    setBooking(false)
    setSent(false)
  }

  const submitBooking = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <div className="page">
      <header className="site-header">
        <div className="header-inner">
          <div className="brand">
            <span className="brand-name">青翠</span>
            <span className="brand-sub">matcha atelier</span>
          </div>
          <nav className="nav" aria-label="主要導覽">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
          </nav>
        </div>
        <div data-bar className="progress-bar" />
      </header>

      <section className="hero">
        <div className="hero-copy">
          <p className="mono season-tag">season 2026 / uji harvest</p>
          <h1 className="serif hero-title">
            {heroTitleLines.map((line) => (
              <span key={line} className="title-line">
                {[...line].map((char, i) => (
                  <span key={`${line}-${i}`}>{char}</span>
                ))}
              </span>
            ))}
          </h1>
          <p className="hero-lead">
            從宇治石磨抹茶到大納言紅豆，十二道甜點以同一片綠色串起。每一季我們只做一桌，端上來的時候，桌布也是這個顏色。
          </p>
          <div className="hero-ctas">
            <a href="#menu" className="btn btn-solid">
              看今季品項
            </a>
            <button type="button" className="btn btn-outline" onClick={openBooking}>
              預約茶席
            </button>
          </div>
        </div>

        <figure data-shutter className="hero-figure">
          <img
            data-pan
            src="/hero.png"
            alt="抹茶甜點全桌"
            width={1180}
            height={740}
          />
        </figure>
        <figcaption className="hero-caption">the whole table, 12 pieces</figcaption>
      </section>

      <section id="season" className="section season">
        <div className="section-inner">
          <div className="section-head">
            <h2 data-wipe className="serif">
              今季三款招牌
            </h2>
            <span className="mono">01 — 03</span>
          </div>

          <div className="cards">
            {featuredItems.map((item) => (
              <article data-reveal key={item.id} className="card">
                <div className="card-shot" style={{ background: item.swatch }}>
                  <span>
                    product shot
                    <br />
                    {item.name}
                  </span>
                </div>
                <h3 className="serif">{item.name}</h3>
                <p>{item.summary}</p>
                <div className="card-meta">
                  <span className="mono">{item.price}</span>
                  <button
                    type="button"
                    className="btn btn-ghost"
                    onClick={() => setOpenId(item.id)}
                  >
                    看細節
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="craft" className="section craft">
        <div className="section-inner craft-grid">
          <div>
            <p data-reveal className="mono craft-label">
              craft
            </p>
            <h2 data-wipe className="serif craft-title">
              石磨一小時
              <br />
              只得四十克
            </h2>
            <p data-reveal className="craft-text">
              茶園採的是四月第一批覆下茶，蒸青、乾燥、去莖，再以石臼低速研磨。轉快了會生熱，熱了就苦。
            </p>
            <p data-reveal className="craft-text">
              所有甜點在開店前三小時內完成，不隔夜。當日沒賣完的，我們自己吃。
            </p>
            <div className="stats">
              <div>
                <div className="stat-value serif">
                  <span data-count>40</span>
                  <span className="stat-unit">g</span>
                </div>
                <div className="mono stat-label">每小時產量</div>
              </div>
              <div>
                <div className="stat-value serif">
                  <span data-count>12</span>
                </div>
                <div className="mono stat-label">今季品項</div>
              </div>
              <div>
                <div className="stat-value serif">
                  <span data-count>3</span>
                  <span className="stat-unit">h</span>
                </div>
                <div className="mono stat-label">開店前完成</div>
              </div>
            </div>
          </div>
          <div data-shutter className="craft-shot">
            <span>
              process shot
              <br />
              石磨與茶筅
            </span>
          </div>
        </div>
      </section>

      <div className="ribbons" aria-hidden="true">
        <div className="ribbon ribbon-l">
          <span>
            宇治覆下<span className="mono">01</span>石臼低速
            <span className="mono">02</span>大納言紅豆
            <span className="mono">03</span>當日現做
            <span className="mono">04</span>
          </span>
          <span>
            宇治覆下<span className="mono">01</span>石臼低速
            <span className="mono">02</span>大納言紅豆
            <span className="mono">03</span>當日現做
            <span className="mono">04</span>
          </span>
        </div>
        <div className="ribbon ribbon-r">
          <span className="mono">
            <span>stone milled</span>
            <span>kyoto uji</span>
            <span>no preservatives</span>
            <span>made daily</span>
            <span>taipei</span>
            <span>stone milled</span>
            <span>kyoto uji</span>
            <span>no preservatives</span>
            <span>made daily</span>
            <span>taipei</span>
          </span>
          <span className="mono">
            <span>stone milled</span>
            <span>kyoto uji</span>
            <span>no preservatives</span>
            <span>made daily</span>
            <span>taipei</span>
            <span>stone milled</span>
            <span>kyoto uji</span>
            <span>no preservatives</span>
            <span>made daily</span>
            <span>taipei</span>
          </span>
        </div>
      </div>

      <section id="menu" className="section menu">
        <div data-reveal className="menu-panel">
          <div className="section-head">
            <h2 data-wipe className="serif">
              全席品項
            </h2>
            <span className="mono">menu / 2026 autumn</span>
          </div>
          <ul>
            {menuItems.map((item) => (
              <li data-row key={item.name}>
                <span>{item.name}</span>
                <span className="mono">{item.price}</span>
              </li>
            ))}
          </ul>
          <p className="menu-note">
            單位：新台幣。整席預訂請於三日前來電，內用附一碗自點抹茶。
          </p>
        </div>
      </section>

      <section id="visit" className="section visit">
        <div className="section-inner visit-grid">
          <div data-reveal>
            <h2 data-wipe className="serif">
              來店
            </h2>
            <p className="visit-text">
              台北市大安區永康街 12 巷 5 號
              <br />
              週三至週日 12:00 — 19:00
              <br />
              02-2708-0412
            </p>
          </div>
          <div data-reveal className="visit-cta">
            <p className="mono eyebrow">reservation</p>
            <p className="visit-text">
              四人以上茶席請預約，每日兩席，14:00 與 17:00。
            </p>
            <button type="button" className="btn btn-solid" onClick={openBooking}>
              預約茶席
            </button>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <span>青翠 matcha atelier</span>
        <span>taipei — est. 2019</span>
      </footer>

      {openItem && (
        <ProductModal
          item={openItem}
          onClose={() => setOpenId(null)}
          onBook={openBooking}
        />
      )}
      {booking && (
        <BookingModal sent={sent} onClose={closeBooking} onSubmit={submitBooking} />
      )}
    </div>
  )
}
