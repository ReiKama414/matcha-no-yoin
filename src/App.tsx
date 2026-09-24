import { useEffect, useState, type FormEvent } from 'react'
import { BookingModal, ProductModal } from './components/Modals'
import { featuredItems, menuItems, navLinks } from './data/menu'
import { useMatchaMotion } from './hooks/useMatchaMotion'
import './index.css'

export default function App() {
  const [openId, setOpenId] = useState<string | null>(null)
  const [booking, setBooking] = useState(false)
  const [sent, setSent] = useState(false)

  useMatchaMotion(true)
  const openItem = featuredItems.find((item) => item.id === openId) ?? null

  useEffect(() => {
    document.body.style.overflow = openItem || booking ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
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
        <a className="brand" href="#top" aria-label="青埜首頁">
          <span className="brand-mark">青埜</span><span className="brand-sub">Matcha Atelier</span>
        </a>
        <nav className="nav" aria-label="主要導覽">
          {navLinks.map((link) => <a key={link.href} href={link.href}>{link.label}</a>)}
        </nav>
        <div className="header-actions">
          <a className="version-switch mono" href="/legacy.html">切換舊版</a>
          <button type="button" className="header-book" onClick={openBooking}>茶席預約</button>
        </div>
        <div data-bar className="progress-bar" />
      </header>

      <main>
        <section id="top" className="hero">
          <div className="hero-kicker mono" data-hero-copy>UJI / TAIPEI<br />SEASON 2026</div>
          <div className="hero-title-wrap" data-hero-copy>
            <p className="hero-jp">一席、十五味</p>
            <h1 className="serif">一席抹茶<br /><span>擺滿整張餐桌</span></h1>
          </div>
          <figure className="hero-figure" data-hero-image>
            <div className="image-mask"><img data-parallax src="/hero.png?v=4" alt="青埜本季抹茶甜點全席" width={1280} height={720} /></div>
            <figcaption className="mono">THE WHOLE TABLE — SEASONAL PIECES</figcaption>
          </figure>
          <div className="hero-note" data-hero-copy>
            <p>從宇治石磨抹茶到大納言紅豆，十二道甜點以同一片綠色串起。每一季我們只做一桌，端上來的時候，桌布也是這個顏色。</p>
            <div className="hero-actions">
              <a className="text-link" href="#season">看今季品項</a>
              <button className="text-link quiet" type="button" onClick={openBooking}>預約茶席</button>
            </div>
          </div>
          <span className="hero-index mono">01</span>
        </section>

        <section id="season" className="section signatures">
          <header className="editorial-head" data-reveal>
            <p className="mono section-no">01 / SIGNATURES</p>
            <h2 className="serif">今季，三款招牌</h2>
            <p>風味各有性格，抹茶的清苦始終是主線。</p>
          </header>
          <div className="signature-list">
            {featuredItems.map((item, index) => (
              <article className={`signature signature-${index + 1}`} key={item.id} data-product>
                <button className="product-image" type="button" onClick={() => setOpenId(item.id)} aria-label={`查看${item.name}細節`}>
                  <span className="image-mask"><img src={item.image} alt={item.name} width={864} height={1152} /></span>
                </button>
                <div className="product-copy">
                  <span className="mono product-no">0{index + 1}</span>
                  <p className="mono product-en">{item.en}</p>
                  <h3 className="serif">{item.name}</h3>
                  <p className="product-summary">{item.summary}</p>
                  <div className="product-meta">
                    <span className="mono">{item.price}</span>
                    <button className="text-link" type="button" onClick={() => setOpenId(item.id)}>閱讀細節</button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="craft" className="section craft">
          <div className="craft-image" data-image-reveal>
            <div className="image-mask"><img data-craft-parallax src="/craft.png" alt="石磨抹茶與茶筅" width={1024} height={1024} /></div>
            <span className="mono vertical-caption">STONE MILLED / KYOTO UJI</span>
          </div>
          <div className="craft-copy">
            <p className="mono section-no" data-reveal>02 / THE CRAFT</p>
            <h2 className="serif" data-title-reveal>石磨一小時<br /><em>只得四十克</em></h2>
            <div className="craft-body" data-reveal>
              <p>茶園採的是四月第一批覆下茶，蒸青、乾燥、去莖，再以石臼低速研磨。轉快了會生熱，熱了就苦。</p>
              <p>所有甜點在開店前三小時內完成，不隔夜。當日沒賣完的，我們自己吃。</p>
            </div>
            <dl className="stats" data-reveal>
              <div><dt><span data-count>40</span><small>g</small></dt><dd>每小時產量</dd></div>
              <div><dt><span data-count>15</span></dt><dd>今季品項</dd></div>
              <div><dt><span data-count>3</span><small>h</small></dt><dd>開店前完成</dd></div>
            </dl>
          </div>
        </section>

        <section id="menu" className="section menu">
          <header className="menu-head" data-reveal>
            <p className="mono section-no">03 / MENU</p>
            <div><h2 className="serif">全席品項</h2><p className="mono">2026 AUTUMN</p></div>
          </header>
          <div className="menu-body">
            <p className="menu-intro" data-reveal>十五款當日甜點與茶品。<br />數量有限，售完為止。</p>
            <ol className="menu-list">
              {menuItems.map((item, index) => (
                <li key={item.name} data-menu-row>
                  <span className="mono">{String(index + 1).padStart(2, '0')}</span>
                  <span>{item.name}</span>
                  <span className="mono">{item.price}</span>
                </li>
              ))}
            </ol>
          </div>
          <p className="menu-note">單位：新台幣。整席預訂請於三日前來電，內用附一碗自點抹茶。</p>
        </section>

        <section id="visit" className="section visit">
          <div className="visit-title" data-title-reveal>
            <p className="mono section-no">04 / VISIT</p>
            <h2 className="serif">留一席，<br />給午後的茶。</h2>
          </div>
          <div className="visit-info" data-reveal>
            <p className="mono label">ADDRESS</p>
            <address>台北市青葉區<br />茶園路一段 8 巷 3 號</address>
            <p className="mono label">OPEN</p>
            <p>週三至週日 12:00 — 19:00<br />02-0000-0412</p>
          </div>
          <div className="visit-book" data-reveal>
            <p>四人以上茶席請預約，<br />每日兩席，14:00 與 17:00。</p>
            <button type="button" className="round-link" onClick={openBooking}>預約茶席 <span>↗</span></button>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div><strong className="serif">青埜</strong><span className="mono">MATCHA ATELIER</span></div>
        <p className="mono">TAIPEI — EST. 2019</p><a className="mono" href="#top">BACK TO TOP ↑</a>
      </footer>

      {openItem && <ProductModal item={openItem} onClose={() => setOpenId(null)} onBook={openBooking} />}
      {booking && <BookingModal sent={sent} onClose={closeBooking} onSubmit={submitBooking} />}
    </div>
  )
}
