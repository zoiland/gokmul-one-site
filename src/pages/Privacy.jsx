import './Privacy.css'
import Seo from '../components/Seo'
import { useLocale } from '../i18n'

const COPY = {
  en: {
    seoTitle: 'Privacy Policy',
    seoDesc: 'How GOKMUL:ONE collects, uses, and protects personal information submitted through our website.',
    label: 'Legal',
    title: 'Privacy Policy',
    effective: 'Effective date: July 6, 2026',
    intro: 'GOKMUL:ONE ("we", "our") respects your privacy. This policy explains what information we collect through this website, how we use it, and the choices you have.',
    sections: [
      {
        heading: '1. Information We Collect',
        body: [
          'You can browse our website without creating an account or providing any personal information.',
          'We collect personal information only when you voluntarily submit it through our inquiry form. This may include your name, company name, email address, country, and the contents of your message.',
        ],
      },
      {
        heading: '2. How We Use Your Information',
        body: [
          'Information submitted through our inquiry form is used solely to respond to your inquiry, provide requested information about our products and services, and manage our business relationship with you.',
          'We do not sell, rent, or trade your personal information to third parties for marketing purposes.',
        ],
      },
      {
        heading: '3. Service Providers',
        body: [
          'Our inquiry form is processed by Formspree, Inc., a form-processing service that transmits your submission to us by email. Our website is hosted on Vercel. These providers process data on our behalf and are bound by their own privacy and security obligations.',
        ],
      },
      {
        heading: '4. Data Retention',
        body: [
          'We retain inquiry records only as long as necessary to handle your inquiry and maintain our business relationship, or as required by applicable law. You may request deletion of your information at any time.',
        ],
      },
      {
        heading: '5. Your Rights',
        body: [
          'You may request access to, correction of, or deletion of your personal information held by us. To exercise these rights, please contact us using the details below. We will respond within a reasonable period in accordance with applicable law, including the Personal Information Protection Act of the Republic of Korea.',
        ],
      },
      {
        heading: '6. International Visitors',
        body: [
          'GOKMUL:ONE is based in the Republic of Korea. By submitting information through our website, you acknowledge that your information will be processed in the Republic of Korea and in the jurisdictions of our service providers.',
        ],
      },
      {
        heading: '7. Changes to This Policy',
        body: [
          'We may update this policy from time to time. Any changes will be posted on this page with an updated effective date.',
        ],
      },
      {
        heading: '8. Contact',
        body: [
          'For any privacy-related questions or requests, please contact us at zoiland@gokmulone.com.',
        ],
      },
    ],
  },
  ko: {
    seoTitle: '개인정보처리방침',
    seoDesc: '곡물:원이 웹사이트를 통해 수집하는 개인정보의 항목, 이용 목적, 보호 방침을 안내합니다.',
    label: '법적 고지',
    title: '개인정보처리방침',
    effective: '시행일: 2026년 7월 6일',
    intro: '곡물:원(이하 "회사")은 이용자의 개인정보를 소중히 여깁니다. 본 방침은 회사가 웹사이트를 통해 수집하는 정보의 항목과 이용 방법, 이용자의 권리를 설명합니다.',
    sections: [
      {
        heading: '1. 수집하는 개인정보 항목',
        body: [
          '회원가입이나 개인정보 제공 없이도 웹사이트를 자유롭게 이용하실 수 있습니다.',
          '회사는 이용자가 문의 폼을 통해 자발적으로 제출하는 경우에만 개인정보를 수집합니다. 수집 항목은 성함, 회사명, 이메일 주소, 국가, 문의 내용입니다.',
        ],
      },
      {
        heading: '2. 개인정보의 이용 목적',
        body: [
          '문의 폼으로 제출된 정보는 문의 응대, 제품·서비스 관련 정보 제공, 비즈니스 관계 관리 목적으로만 이용됩니다.',
          '회사는 이용자의 개인정보를 마케팅 목적으로 제3자에게 판매, 대여, 제공하지 않습니다.',
        ],
      },
      {
        heading: '3. 개인정보 처리 위탁',
        body: [
          '문의 폼은 폼 처리 서비스인 Formspree, Inc.를 통해 처리되어 이메일로 회사에 전달됩니다. 웹사이트는 Vercel에서 호스팅됩니다. 해당 업체들은 회사를 대신해 데이터를 처리하며, 각자의 개인정보 보호 및 보안 의무를 준수합니다.',
        ],
      },
      {
        heading: '4. 개인정보의 보유 기간',
        body: [
          '회사는 문의 응대 및 비즈니스 관계 유지에 필요한 기간 동안, 또는 관련 법령에서 정한 기간 동안만 문의 기록을 보유합니다. 이용자는 언제든지 본인 정보의 삭제를 요청할 수 있습니다.',
        ],
      },
      {
        heading: '5. 이용자의 권리',
        body: [
          '이용자는 회사가 보유한 본인의 개인정보에 대해 열람, 정정, 삭제를 요청할 수 있습니다. 권리 행사는 아래 연락처로 요청해 주시면, 개인정보 보호법 등 관련 법령에 따라 합리적인 기간 내에 처리해 드립니다.',
        ],
      },
      {
        heading: '6. 국외 이용자 안내',
        body: [
          '곡물:원은 대한민국에 소재한 기업입니다. 웹사이트를 통해 정보를 제출하시면 해당 정보가 대한민국 및 위탁 서비스 제공업체의 관할 지역에서 처리되는 것에 동의하는 것으로 간주됩니다.',
        ],
      },
      {
        heading: '7. 방침의 변경',
        body: [
          '본 방침은 필요 시 개정될 수 있으며, 변경 사항은 시행일과 함께 본 페이지에 게시됩니다.',
        ],
      },
      {
        heading: '8. 문의처',
        body: [
          '개인정보 관련 문의는 zoiland@gokmulone.com 으로 연락해 주시기 바랍니다.',
        ],
      },
    ],
  },
}

export default function Privacy() {
  const locale = useLocale()
  const t = COPY[locale]

  return (
    <>
      <Seo
        title={t.seoTitle}
        path="/privacy"
        description={t.seoDesc}
      />

      <section className="page-hero">
        <div className="container">
          <p className="label">{t.label}</p>
          <h1 className="display privacy-title">{t.title}</h1>
          <p className="privacy-effective">{t.effective}</p>
        </div>
      </section>

      <section className="section">
        <div className="container privacy-body">
          <p className="privacy-intro">{t.intro}</p>

          {t.sections.map(({ heading, body }) => (
            <div key={heading} className="privacy-section">
              <h2>{heading}</h2>
              {body.map((p, i) => <p key={i}>{p}</p>)}
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
