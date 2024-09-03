export default function CommunityPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Community</h1>
      <p className="mb-4">
        Welcome to the Go Human Fund community! Connect with other young
        innovators, share your experiences, and find support in your
        entrepreneurial journey.
      </p>
      <h2 className="text-2xl font-bold mb-2">Get Involved</h2>
      <ul className="list-disc list-inside mb-4">
        <li>Join our monthly virtual meetups</li>
        <li>Participate in our online forum discussions</li>
        <li>Attend workshops and webinars</li>
        <li>Showcase your project in our community spotlight</li>
      </ul>
      <h2 className="text-2xl font-bold mb-2">Featured Projects</h2>
      <div className="mb-4">
        <h3 className="text-xl font-semibold">Sodium BMS</h3>
        <p>
          Researching sodium battery science for cost-effective electric vehicle
          BMS networks.
        </p>
        <p>Founder: Vibhuti Bafna (Shilpa)</p>
      </div>
      <div className="mb-4">
        <h3 className="text-xl font-semibold">Leapflow</h3>
        <p>
          AI-driven agents for workflow automation and business scalability.
        </p>
        <p>Founder: Suhas Sumukh</p>
      </div>
      <p>
        Want to join our community?{' '}
        <a href="/auth/signup" className="text-blue-500 hover:underline">
          Sign up
        </a>{' '}
        to get started!
      </p>
    </div>
  );
}
