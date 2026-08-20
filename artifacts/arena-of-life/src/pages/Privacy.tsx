import LegalPage from "@/components/LegalPage";

function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="font-display text-lg font-bold text-[hsl(215,65%,16%)] pt-3">{children}</h2>;
}
function P({ children }: { children: React.ReactNode }) {
  return <p className="text-gray-700 text-sm leading-relaxed">{children}</p>;
}

export default function Privacy() {
  return (
    <LegalPage title="Privacy Policy" lastUpdated="August 2026">
      <P>
        The Arena of Life Foundation Inc. ("we," "us," or "the Foundation") respects your privacy. This policy explains
        what information we collect, how we use it, and the choices you have.
      </P>

      <H2>Information We Collect</H2>
      <P>
        We only collect information you choose to give us. This includes the name, email address, phone number (optional),
        and message you submit through our contact form, and the email address you provide if you join our mailing list.
        If you use our website assistant, we also process the question you enter. We do not require you to create an
        account to use this website.
      </P>

      <H2>AI Website Assistant</H2>
      <P>
        Questions submitted to our website assistant are processed by a third-party AI service to route you to verified
        foundation information. Please do not enter medical details, financial information, or other sensitive personal
        information in the assistant. The assistant may make mistakes; use our contact form or phone number when you need
        official or personal guidance.
      </P>

      <H2>Donations</H2>
      <P>
        Donations are processed by trusted third-party payment providers. We do not collect or store your credit card or
        bank account numbers on our servers. When you donate, your payment information is handled directly by the payment
        provider under their own privacy and security policies.
      </P>

      <H2>How We Use Your Information</H2>
      <P>
        We use the information you provide to respond to your inquiries, send updates you have requested, process and
        acknowledge donations, and operate and improve our programs. We do not sell, rent, or trade your personal
        information to anyone.
      </P>

      <H2>Sharing</H2>
      <P>
        We share information only with service providers that help us operate (for example, email, payment, and AI
        providers), and only as needed to perform those services, or when required by law.
      </P>

      <H2>Cookies &amp; Analytics</H2>
      <P>
        Our website uses only the cookies necessary to function and, where applicable, basic analytics to understand how
        the site is used. We do not use this information to identify you personally.
      </P>

      <H2>Your Choices</H2>
      <P>
        You may unsubscribe from our emails at any time, and you may ask us to access, correct, or delete the personal
        information we hold about you by contacting us through the form on our website.
      </P>

      <H2>Children's Privacy</H2>
      <P>
        Our website is intended for adults. We do not knowingly collect personal information from children under 13.
      </P>

      <H2>Contact Us</H2>
      <P>
        Questions about this policy can be sent to us using the contact form at arenaoflifefoundation.org. We are based in
        Naples, Florida.
      </P>
    </LegalPage>
  );
}
