import { api } from '~/trpc/server';

export default async function WorkshopPage({
  params,
}: {
  params: { id: string };
}) {
  const workshop = await api.learn.getWorkshopById({
    id: parseInt(params.id),
  });

  if (!workshop) {
    return <div>Workshop not found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{workshop.title}</h1>
      <p className="mb-4">{workshop.description}</p>
      <p className="mb-4">Date: {new Date(workshop.date).toLocaleString()}</p>
      {workshop.registrationLink && (
        <a
          href={workshop.registrationLink}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600"
        >
          Register Now
        </a>
      )}
    </div>
  );
}
