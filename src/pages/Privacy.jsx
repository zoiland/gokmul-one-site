import './Privacy.css'
import Seo from '../components/Seo'

const SECTIONS = [
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
]

export default function Privacy() {
  return (
    <>
      <Seo
        title="Privacy Policy"
        path="/privacy"
        description="How GOKMUL:ONE collects, uses, and protects personal information submitted through our website."
      />

      <section className="page-hero">
        <div className="container">
          <p className="label">Legal</p>
          <h1 className="display privacy-title">Privacy Policy</h1>
          <p className="privacy-effective">Effective date: July 6, 2026</p>
        </div>
      </section>

      <section className="section">
        <div className="container privacy-body">
          <p className="privacy-intro">
            GOKMUL:ONE (&ldquo;we&rdquo;, &ldquo;our&rdquo;) respects your privacy.
            This policy explains what information we collect through this website,
            how we use it, and the choices you have.
          </p>

          {SECTIONS.map(({ heading, body }) => (
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
