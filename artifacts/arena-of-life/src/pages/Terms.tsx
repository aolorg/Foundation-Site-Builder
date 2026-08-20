import LegalPage from "@/components/LegalPage";

function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="font-display text-lg font-bold text-[hsl(215,65%,16%)] pt-3">{children}</h2>;
}
function P({ children }: { children: React.ReactNode }) {
  return <p className="text-gray-700 text-sm leading-relaxed">{children}</p>;
}

export default function Terms() {
  return (
    <LegalPage title="Terms of Use" lastUpdated="June 2026">
      <P>
        Welcome to the website of The Arena of Life Foundation Inc. By using this website, you agree to these Terms of
        Use. If you do not agree, please do not use the site.
      </P>

      <H2>About the Foundation</H2>
      <P>
        The Arena of Life Foundation Inc. is a Naples, Florida nonprofit organization. Its application for 501(c)(3)
        tax-exempt status is pending.
      </P>

      <H2>Donations</H2>
      <P>
        All donations are voluntary. While the foundation's 501(c)(3) application is pending, tax-deductibility has not
        been confirmed; please consult your own tax advisor. Donations are generally non-refundable; if you believe a
        donation was made in error, contact us and we will work with you in good faith.
      </P>

      <H2>Not Professional Advice</H2>
      <P>
        The Foundation provides community, encouragement, and support resources. Nothing on this website is medical,
        psychological, legal, or financial advice, and it is not a substitute for care from a qualified professional. If
        you or someone you love is in crisis, please contact a licensed provider or emergency services.
      </P>

      <H2>Intellectual Property</H2>
      <P>
        The content, logos, and materials on this site are owned by the Foundation or used with permission and may not be
        copied or used commercially without our written consent.
      </P>

      <H2>Third-Party Links &amp; Services</H2>
      <P>
        Our site may link to or rely on third-party services, such as payment processors. We are not responsible for the
        content or practices of those third parties.
      </P>

      <H2>Limitation of Liability</H2>
      <P>
        This website is provided "as is." To the fullest extent permitted by law, the Foundation is not liable for any
        damages arising from your use of the site.
      </P>

      <H2>Changes</H2>
      <P>
        We may update these Terms from time to time. Continued use of the site after changes are posted means you accept
        the updated Terms.
      </P>

      <H2>Governing Law</H2>
      <P>These Terms are governed by the laws of the State of Florida.</P>

      <H2>Contact Us</H2>
      <P>Questions about these Terms can be sent through the contact form at arenaoflifefoundation.org.</P>
    </LegalPage>
  );
}
