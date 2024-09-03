import { api } from '~/trpc/server';

export default async function ResourcePage({
  params,
}: {
  params: { id: string };
}) {
  const resource = await api.learn.getLearningResourceById({
    id: parseInt(params.id),
  });

  if (!resource) {
    return <div>Resource not found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{resource.title}</h1>
      <p className="mb-4">{resource.description}</p>
      <div dangerouslySetInnerHTML={{ __html: resource.content }} />
      {resource.link && (
        <a
          href={resource.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          View original content
        </a>
      )}
    </div>
  );
}
