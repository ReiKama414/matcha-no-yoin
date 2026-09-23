import type { FormEvent } from 'react'
import type { ProductItem } from '../data/menu'

type ProductModalProps = {
  item: ProductItem
  onClose: () => void
  onBook: () => void
}

export function ProductModal({ item, onClose, onBook }: ProductModalProps) {
  return (
    <div className="overlay" onClick={onClose} role="presentation">
      <div
        className="sheet product-sheet"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={item.name}
      >
        <div className="product-shot" style={{ background: item.swatch }}>
          <span>
            product shot
            <br />
            {item.name}
          </span>
        </div>
        <div className="product-body">
          <div>
            <p className="mono eyebrow">{item.en}</p>
            <h3 className="serif">{item.name}</h3>
          </div>
          <p className="body-text">{item.desc}</p>
          <dl className="specs">
            {item.specs.map((row) => (
              <div key={row.k} className="spec-row">
                <dt>{row.k}</dt>
                <dd>{row.v}</dd>
              </div>
            ))}
          </dl>
          <div className="product-actions">
            <span className="mono price">{item.price}</span>
            <button type="button" className="btn btn-solid" onClick={onBook}>
              預約茶席
            </button>
          </div>
        </div>
        <button
          type="button"
          className="close-btn"
          aria-label="關閉"
          onClick={onClose}
        >
          ✕
        </button>
      </div>
    </div>
  )
}

type BookingModalProps = {
  sent: boolean
  onClose: () => void
  onSubmit: (e: FormEvent<HTMLFormElement>) => void
}

export function BookingModal({ sent, onClose, onSubmit }: BookingModalProps) {
  return (
    <div className="overlay booking-overlay" onClick={onClose} role="presentation">
      <div
        className="sheet booking-sheet"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="預約茶席"
      >
        <p className="mono eyebrow">reservation</p>
        <h3 className="serif">預約茶席</h3>

        {!sent ? (
          <form className="booking-form" onSubmit={onSubmit}>
            <label>
              date
              <input type="date" required />
            </label>
            <label>
              time
              <select required defaultValue="14:00 茶席">
                <option>14:00 茶席</option>
                <option>17:00 茶席</option>
              </select>
            </label>
            <label>
              guests
              <select required defaultValue="4 位">
                <option>4 位</option>
                <option>5 位</option>
                <option>6 位</option>
                <option>7 位以上（來電）</option>
              </select>
            </label>
            <label>
              name
              <input type="text" required placeholder="王小滿" />
            </label>
            <label className="span-all">
              phone
              <input type="tel" required placeholder="0912 345 678" />
            </label>
            <label className="span-all">
              note
              <textarea rows={3} placeholder="想預留的品項、飲食禁忌" />
            </label>
            <button type="submit" className="btn btn-solid span-all start">
              送出預約
            </button>
            <p className="hint span-all">
              每日兩席，各限一組。送出後我們會於營業時間內電話確認。
            </p>
          </form>
        ) : (
          <div className="sent-block">
            <p className="body-text">
              已收到預約，我們會在營業時間內回電確認。當日請提早五分鐘到店，茶席準時開始。
            </p>
            <button type="button" className="btn btn-ghost" onClick={onClose}>
              回到網站
            </button>
          </div>
        )}

        <button
          type="button"
          className="close-btn"
          aria-label="關閉"
          onClick={onClose}
        >
          ✕
        </button>
      </div>
    </div>
  )
}
