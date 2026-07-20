import { useForm, ValidationError } from '@formspree/react'
import './Contact.css'
import Seo from '../components/Seo'
import { useLocale } from '../i18n'

const COPY = {
  en: {
    seoTitle: 'Contact',
    seoDesc: 'Contact GOKMUL:ONE for product inquiries, pricing & MOQ, OEM / custom packaging and global distribution partnerships.',
    label: 'Get in Touch',
    title: "Let's Work Together.",
    desc: "Whether you're sourcing for the first time or looking to expand your Korean grain portfolio, our team is ready to help.",
    headOffice: 'Head Office',
    company: 'GOKMUL:ONE',
    ceo: 'CEO: Kim Kang',
    address: <>511, 5F, Annex Building A,<br />12 Gaetbeol-ro, Yeonsu-gu,<br />Incheon 21999, Republic of Korea</>,
    contactDetails: 'Contact Details',
    email: 'Email',
    phone: 'Phone',
    phoneDisplay: '+82-507-0443-0003',
    bizInfo: 'Business Info',
    bizReg: 'Business Reg. No.',
    ecomReg: 'E-commerce Reg. No.',
    ecomRegValue: '2024-Incheon Yeonsu-0854',
    hours: 'Business Hours',
    hoursRows: [
      ['Mon – Fri', '09:00 – 18:00 KST'],
      ['Sat', 'By appointment'],
      ['Sun / Holidays', 'Closed'],
    ],
    successTitle: 'Thank you for your inquiry.',
    successBody: "We've received your message and will respond within 1–2 business days.",
    formTitle: 'Send an Inquiry',
    nameLabel: 'Full Name *',
    namePh: 'Jane Smith',
    companyLabel: 'Company *',
    companyPh: 'Acme Foods Ltd.',
    emailLabel: 'Email Address *',
    emailPh: 'jane@acmefoods.com',
    countryLabel: 'Country',
    countryPh: 'United States',
    typeLabel: 'Inquiry Type',
    typePh: 'Select a topic…',
    types: ['Product Inquiry', 'Pricing & MOQ', 'Custom Packaging / OEM', 'Distribution Partnership', 'Other'],
    messageLabel: 'Message *',
    messagePh: 'Tell us about your sourcing needs, quantities, target market, etc.',
    note: '* Required fields. We respect your privacy and will never share your information.',
    sending: 'Sending…',
    submit: 'Send Inquiry',
  },
  ko: {
    seoTitle: '문의하기',
    seoDesc: '곡물:원에 제품, 가격 및 대량 구매, OEM/맞춤 패키징, 유통 파트너십을 문의하세요.',
    label: '문의하기',
    title: '무엇이든 물어보세요.',
    desc: '제품이 궁금한 개인 고객부터 납품·제휴를 원하는 기업 고객까지, 어떤 문의든 환영합니다.',
    headOffice: '본사',
    company: '곡물:원 (GOKMUL:ONE)',
    ceo: '대표: 김강',
    address: <>인천광역시 연수구 갯벌로 12,<br />별관 A동 5층 511호 (21999)</>,
    contactDetails: '연락처',
    email: '이메일',
    phone: '전화',
    phoneDisplay: '0507-0443-0003',
    bizInfo: '사업자 정보',
    bizReg: '사업자등록번호',
    ecomReg: '통신판매업신고',
    ecomRegValue: '2024-인천연수구-0854',
    hours: '운영 시간',
    hoursRows: [
      ['월 – 금', '09:00 – 18:00'],
      ['토', '사전 예약'],
      ['일 / 공휴일', '휴무'],
    ],
    successTitle: '문의가 접수되었습니다.',
    successBody: '보내주신 내용을 확인 후 영업일 기준 1–2일 내에 답변드리겠습니다.',
    formTitle: '문의 보내기',
    nameLabel: '성함 *',
    namePh: '홍길동',
    companyLabel: '회사명 *',
    companyPh: '(주)회사명',
    emailLabel: '이메일 *',
    emailPh: 'name@company.com',
    countryLabel: '국가',
    countryPh: '대한민국',
    typeLabel: '문의 유형',
    typePh: '문의 유형을 선택하세요…',
    types: ['제품 문의', '가격 및 대량 구매', '맞춤 패키징 / OEM', '유통 파트너십', '기타'],
    messageLabel: '문의 내용 *',
    messagePh: '필요하신 제품, 수량, 활용 계획 등을 자유롭게 적어주세요.',
    note: '* 필수 항목입니다. 개인정보는 문의 응대 목적으로만 사용됩니다.',
    sending: '전송 중…',
    submit: '문의 보내기',
  },
}

export default function Contact() {
  const locale = useLocale()
  const t = COPY[locale]
  const [state, handleSubmit] = useForm('mzdlpvvp')

  return (
    <>
      <Seo title={t.seoTitle} path="/contact" description={t.seoDesc} />
      {/* ─── 페이지 헤더 ─── */}
      <section className="page-hero">
        <div className="container">
          <p className="label">{t.label}</p>
          <h1 className="display contact-title">{t.title}</h1>
          <p className="contact-hero-desc">{t.desc}</p>
        </div>
      </section>

      <section className="section">
        <div className="container contact-layout">

          {/* ─── 왼쪽: 연락처 정보 ─── */}
          <aside className="contact-info">
            <div className="contact-info__block">
              <p className="label">{t.headOffice}</p>
              <address>
                <p>{t.company}</p>
                <p>{t.ceo}</p>
                <p>{t.address}</p>
              </address>
            </div>

            <div className="contact-info__block">
              <p className="label">{t.contactDetails}</p>
              <ul>
                <li>
                  <span>{t.email}</span>
                  <a href="mailto:zoiland@gokmulone.com">zoiland@gokmulone.com</a>
                </li>
                <li>
                  <span>{t.email}</span>
                  <a href="mailto:river@gokmulone.com">river@gokmulone.com</a>
                </li>
                <li>
                  <span>{t.phone}</span>
                  <a href="tel:05070443003">{t.phoneDisplay}</a>
                </li>
              </ul>
            </div>

            <div className="contact-info__block">
              <p className="label">{t.bizInfo}</p>
              <ul>
                <li><span>{t.bizReg}</span><span>638-13-02161</span></li>
                <li><span>{t.ecomReg}</span><span>{t.ecomRegValue}</span></li>
              </ul>
            </div>

            <div className="contact-info__block">
              <p className="label">{t.hours}</p>
              <ul>
                {t.hoursRows.map(([k, v]) => (
                  <li key={k}><span>{k}</span><span>{v}</span></li>
                ))}
              </ul>
            </div>
          </aside>

          {/* ─── 오른쪽: 문의 폼 ─── */}
          <div className="contact-form-wrap">
            {state.succeeded ? (
              <div className="contact-success">
                <div className="contact-success__icon">✓</div>
                <h2 className="heading-md">{t.successTitle}</h2>
                <p>{t.successBody}</p>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <h2 className="heading-md contact-form__heading">{t.formTitle}</h2>

                <input type="hidden" name="_cc" value="river@gokmulone.com" />
                <input type="hidden" name="_subject" value="[GOKMUL:ONE] New Inquiry from Website" />

                <div className="form-row">
                  <div className="form-field">
                    <label htmlFor="name">{t.nameLabel}</label>
                    <input
                      id="name" name="name" type="text"
                      placeholder={t.namePh} required
                    />
                    <ValidationError field="name" errors={state.errors} className="form-error" />
                  </div>
                  <div className="form-field">
                    <label htmlFor="company">{t.companyLabel}</label>
                    <input
                      id="company" name="company" type="text"
                      placeholder={t.companyPh} required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-field">
                    <label htmlFor="email">{t.emailLabel}</label>
                    <input
                      id="email" name="email" type="email"
                      placeholder={t.emailPh} required
                    />
                    <ValidationError field="email" errors={state.errors} className="form-error" />
                  </div>
                  <div className="form-field">
                    <label htmlFor="country">{t.countryLabel}</label>
                    <input
                      id="country" name="country" type="text"
                      placeholder={t.countryPh}
                    />
                  </div>
                </div>

                <div className="form-field">
                  <label htmlFor="type">{t.typeLabel}</label>
                  <select id="type" name="type">
                    <option value="">{t.typePh}</option>
                    {t.types.map(x => (
                      <option key={x} value={x}>{x}</option>
                    ))}
                  </select>
                </div>

                <div className="form-field">
                  <label htmlFor="message">{t.messageLabel}</label>
                  <textarea
                    id="message" name="message"
                    rows={5}
                    placeholder={t.messagePh}
                    required
                  />
                  <ValidationError field="message" errors={state.errors} className="form-error" />
                </div>

                <p className="form-note">{t.note}</p>

                <button type="submit" className="btn btn-primary contact-form__submit" disabled={state.submitting}>
                  {state.submitting ? t.sending : t.submit}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
