import { useState } from 'react'
import './Contact.css'

const INQUIRY_TYPES = [
  'Product Inquiry',
  'Pricing & MOQ',
  'Custom Packaging / OEM',
  'Distribution Partnership',
  'Other',
]

const FORMSPREE_ID = 'YOUR_FORM_ID'

export default function Contact() {
  const [form, setForm] = useState({
    name: '', company: '', email: '', country: '',
    type: '', message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState(false)

  const handleChange = e =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    setError(false)
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          _cc: 'river@gokmulone.com',
          _subject: `[GOKMUL:ONE] New Inquiry — ${form.type || 'General'}`,
        }),
      })
      if (res.ok) setSubmitted(true)
      else setError(true)
    } catch {
      setError(true)
    }
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
                <p>곡물:원 (GOKMUL:ONE)</p>
                <p>CEO: 김강</p>
                <p>511ho, 5F, Annex Bldg. A,<br />12 Gaetbeol-ro, Yeonsu-gu,<br />Incheon 21999, Republic of Korea</p>
              </address>
            </div>

            <div className="contact-info__block">
              <p className="label">Contact Details</p>
              <ul>
                <li>
                  <span>Email</span>
                  <a href="mailto:zoiland@gokmulone.com">zoiland@gokmulone.com</a>
                </li>
                <li>
                  <span>Email</span>
                  <a href="mailto:river@gokmulone.com">river@gokmulone.com</a>
                </li>
                <li>
                  <span>Phone</span>
                  <a href="tel:05070443003">0507-0443-0003</a>
                </li>
              </ul>
            </div>

            <div className="contact-info__block">
              <p className="label">Business Info</p>
              <ul>
                <li><span>사업자등록번호</span><span>638-13-02161</span></li>
                <li><span>통신판매업번호</span><span>2024-인천연수구-0854</span></li>
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

                {error && (
                  <p className="form-error">Something went wrong. Please email us directly at zoiland@gokmulone.com</p>
                )}

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
