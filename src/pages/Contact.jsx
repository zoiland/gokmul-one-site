import { useForm, ValidationError } from '@formspree/react'
import './Contact.css'
import Seo from '../components/Seo'

const INQUIRY_TYPES = [
  'Product Inquiry',
  'Pricing & MOQ',
  'Custom Packaging / OEM',
  'Distribution Partnership',
  'Other',
]

export default function Contact() {
  const [state, handleSubmit] = useForm('mzdlpvvp')

  return (
    <>
      <Seo title="Contact" path="/contact" description="Contact GOKMUL:ONE for product inquiries, pricing & MOQ, OEM / custom packaging and global distribution partnerships." />
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
                <p>GOKMUL:ONE</p>
                <p>CEO: Kim Kang</p>
                <p>511, 5F, Annex Building A,<br />12 Gaetbeol-ro, Yeonsu-gu,<br />Incheon 21999, Republic of Korea</p>
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
                  <a href="tel:05070443003">+82-507-0443-0003</a>
                </li>
              </ul>
            </div>

            <div className="contact-info__block">
              <p className="label">Business Info</p>
              <ul>
                <li><span>Business Reg. No.</span><span>638-13-02161</span></li>
                <li><span>E-commerce Reg. No.</span><span>2024-Incheon Yeonsu-0854</span></li>
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
            {state.succeeded ? (
              <div className="contact-success">
                <div className="contact-success__icon">✓</div>
                <h2 className="heading-md">Thank you for your inquiry.</h2>
                <p>We've received your message and will respond within 1–2 business days.</p>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <h2 className="heading-md contact-form__heading">Send an Inquiry</h2>

                <input type="hidden" name="_cc" value="river@gokmulone.com" />
                <input type="hidden" name="_subject" value="[GOKMUL:ONE] New Inquiry from Website" />

                <div className="form-row">
                  <div className="form-field">
                    <label htmlFor="name">Full Name *</label>
                    <input
                      id="name" name="name" type="text"
                      placeholder="Jane Smith" required
                    />
                    <ValidationError field="name" errors={state.errors} className="form-error" />
                  </div>
                  <div className="form-field">
                    <label htmlFor="company">Company *</label>
                    <input
                      id="company" name="company" type="text"
                      placeholder="Acme Foods Ltd." required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-field">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      id="email" name="email" type="email"
                      placeholder="jane@acmefoods.com" required
                    />
                    <ValidationError field="email" errors={state.errors} className="form-error" />
                  </div>
                  <div className="form-field">
                    <label htmlFor="country">Country</label>
                    <input
                      id="country" name="country" type="text"
                      placeholder="United States"
                    />
                  </div>
                </div>

                <div className="form-field">
                  <label htmlFor="type">Inquiry Type</label>
                  <select id="type" name="type">
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
                    rows={5}
                    placeholder="Tell us about your sourcing needs, quantities, target market, etc."
                    required
                  />
                  <ValidationError field="message" errors={state.errors} className="form-error" />
                </div>

                <p className="form-note">
                  * Required fields. We respect your privacy and will never share your information.
                </p>

                <button type="submit" className="btn btn-primary contact-form__submit" disabled={state.submitting}>
                  {state.submitting ? 'Sending…' : 'Send Inquiry'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
