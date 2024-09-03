export default function AboutPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">About Go Human Fund</h1>
      <p className="mb-4">
        Go Human Fund is a micro-seed fund investing in humans building useful
        stuff for humanity. We know the struggle is real when you're just
        starting out, and that's where we come in!
      </p>
      <h2 className="text-2xl font-bold mb-2">What We Do</h2>
      <p className="mb-4">
        We provide micro-seed funding, mentorship, and support to young
        innovators and entrepreneurs with mind-blowingly awesome ideas but
        limited resources.
      </p>
      <h2 className="text-2xl font-bold mb-2">How We Help</h2>
      <ul className="list-disc list-inside mb-4">
        <li>Micro-seed funding (typically starting at $100)</li>
        <li>Mentorship and guidance</li>
        <li>Networking opportunities</li>
        <li>Emotional support</li>
      </ul>
      <h2 className="text-2xl font-bold mb-2">Who We're Looking For</h2>
      <p className="mb-4">
        Passionate young innovators with ideas across various fields, including
        AI, Blockchain, Hardware, SaaS, Health Tech, and more!
      </p>
      <p>
        Ready to change the world?{' '}
        <a href="/auth/signin" className="text-blue-500 hover:underline">
          Apply for funding
        </a>{' '}
        or{' '}
        <a
          href="mailto:hello@gohuman.fund"
          className="text-blue-500 hover:underline"
        >
          contact us
        </a>{' '}
        to learn more!
      </p>
    </div>
  );
}
