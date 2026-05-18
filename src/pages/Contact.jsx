import { useState } from 'react'
import './Contact.css'

const INQUIRY_TYPES = [
  'Product Inquiry',
  'Pricing & MOQ',
  'Custom Packaging / OEM',
  'Distribution Partnership',
  'Other',
]

export default function Contact() {
  const [form, setForm] = useState({
    name: '', company: '', email: '', country: '',
    type: '', message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = e =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  // 정적 사이트이므로 실제 전송 없이 완료 UI만 표시
  // 추후 Formspree / EmailJS 등으로 연동 가능
  const handleSubmit = e => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <>
      {/* ─── 페이지 헤더 ─── */}
      <section className="page-hero">
        <div className="container">
          <p className="label">Get in Touch</p>
          <h1 className="display contact-title">Let's Work Together.</h1>
          <p className="contact-hero-desc">
            Whether you're sourcing for the first time or looking to expand your
            Korean grain portfolio, our team is ready to help.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container contact-layout">

          {/* ─── 왼쪽: 연락처 정보 ─── */}
          <aside className="contact-info">
            <div className="contact-info__block">
              <p className="label">Head Office</p>
              <address>
                <p>GOKMUL:ONE Co., Ltd.</p>
                <p>곡물:원 주식회사</p>
                <p>123, Grainway-ro, Jeonju-si,<br />Jeollabuk-do, Republic of Korea</p>
              </address>
            </div>

            <div className="contact-info__block">
              <p className="label">Contact Details</p>
              <ul>
                <li>
                  <span>Email</span>
                  <a href="mailto:contact@gokmulone.com">contact@gokmulone.com</a>
                </li>
                <li>
                  <span>Phone</span>
                  <a href="tel:+8202000000000">+82-2-0000-0000</a>
                </li>
                <li>
                  <span>WeChat / KakaoTalk</span>
                  <span>@gokmulone</span>
                </li>
              </ul>
            </div>

            <div className="contact-info__block">
              <p className="label">Business Hours</p>
              <ul>
                <li><span>Mon – Fri</span><span>09:00 – 18:00 KST</span></li>
                <li><span>Sat</span><span>By appointment</span></li>
                <li><span>Sun / Holidays</span><span>Closed</span></li>
              </ul>
            </div>

            <div className="contact-info__block">
              <p className="label">Follow Us</p>
              <div className="contact-social">
                <a href="#" aria-label="LinkedIn">LinkedIn</a>
                <a href="#" aria-label="Instagram">Instagram</a>
              </div>
            </div>
          </aside>

          {/* ─── 오른쪽: 문의 폼 ─── */}
          <div className="contact-form-wrap">
            {submitted ? (
              <div className="contact-success">
                <div className="contact-success__icon">✓</div>
                <h2 className="heading-md">Thank you for your inquiry.</h2>
                <p>We've received your message and will respond within 1–2 business days.</p>
                <button className="btn btn-outline" onClick={() => setSubmitted(false)}>
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit} noValidate>
                <h2 className="heading-md contact-form__heading">Send an Inquiry</h2>

                <div className="form-row">
                  <div className="form-field">
                    <label htmlFor="name">Full Name *</label>
                    <input
                      id="name" name="name" type="text"
                      value={form.name} onChange={handleChange}
                      placeholder="Jane Smith" required
                    />
                  </div>
                  <div className="form-field">
                    <label htmlFor="company">Company *</label>
                    <input
                      id="company" name="company" type="text"
                      value={form.company} onChange={handleChange}
                      placeholder="Acme Foods Ltd." required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-field">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      id="email" name="email" type="email"
                      value={form.email} onChange={handleChange}
                      placeholder="jane@acmefoods.com" required
                    />
                  </div>
                  <div className="form-field">
                    <label htmlFor="country">Country</label>
                    <input
                      id="country" name="country" type="text"
                      value={form.country} onChange={handleChange}
                      placeholder="United States"
                    />
                  </div>
                </div>

                <div className="form-field">
                  <label htmlFor="type">Inquiry Type</label>
                  <select id="type" name="type" value={form.type} onChange={handleChange}>
                    <option value="">Select a topic…</option>
                    {INQUIRY_TYPES.map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                <div className="form-field">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message" name="message"
                    value={form.message} onChange={handleChange}
                    rows={5}
                    placeholder="Tell us about your sourcing needs, quantities, target market, etc."
                    required
                  />
                </div>

                <p className="form-note">
                  * Required fields. We respect your privacy and will never share your information.
                </p>

                <button type="submit" className="btn btn-primary contact-form__submit">
                  Send Inquiry
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
