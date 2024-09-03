import { api } from '~/trpc/server';

export default async function SuccessStoryPage({
  params,
}: {
  params: { id: string };
}) {
  const story = await api.learn.getSuccessStoryById({
    id: parseInt(params.id),
  });

  if (!story) {
    return <div>Success story not found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{story.title}</h1>
      <p className="mb-4">Founder: {story.founderName}</p>
      <div dangerouslySetInnerHTML={{ __html: story.content }} />
    </div>
  );
}
