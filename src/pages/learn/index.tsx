import React from 'react';
import Link from 'next/link';
import { BookOpen, Video, FileText, Lightbulb, Award } from 'lucide-react';
import { api } from '~/trpc/server';

const LearningResource = ({ icon: Icon, title, description, link }) => (
  <Link
    href={link}
    className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 mb-4"
  >
    <div className="flex items-center mb-2">
      <Icon className="mr-2 text-blue-500" size={24} />
      <h3 className="text-xl font-semibold">{title}</h3>
    </div>
    <p className="text-gray-600">{description}</p>
  </Link>
);

export default async function LearnPage() {
  const resources = await api.learn.getLearningResources();
  const workshops = await api.learn.getWorkshops();
  const successStories = await api.learn.getSuccessStories();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-6 text-center">Learn & Grow 🚀</h1>
      <p className="text-xl text-center mb-8">
        Fuel your entrepreneurial journey with our curated resources. Let's make
        learning fun and impactful!
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <Video className="mr-2 text-purple-500" />
            Video Masterclasses
          </h2>
          {resources
            .filter((r) => r.type === 'video')
            .map((resource) => (
              <LearningResource
                key={resource.id}
                icon={Video}
                title={resource.title}
                description={resource.description}
                link={`/learn/resource/${resource.id}`}
              />
            ))}
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <FileText className="mr-2 text-green-500" />
            Must-Read Articles
          </h2>
          {resources
            .filter((r) => r.type === 'article')
            .map((resource) => (
              <LearningResource
                key={resource.id}
                icon={FileText}
                title={resource.title}
                description={resource.description}
                link={`/learn/resource/${resource.id}`}
              />
            ))}
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <Lightbulb className="mr-2 text-yellow-500" />
          Interactive Workshops
        </h2>
        {workshops.map((workshop) => (
          <div
            key={workshop.id}
            className="bg-gradient-to-r from-purple-400 to-pink-500 text-white rounded-lg p-6 mb-8"
          >
            <h3 className="text-2xl font-bold mb-2">{workshop.title}</h3>
            <p className="mb-4">{workshop.description}</p>
            <Link
              href={`/learn/workshop/${workshop.id}`}
              className="bg-white text-purple-500 font-bold py-2 px-4 rounded hover:bg-gray-100 transition-colors duration-300"
            >
              Learn More
            </Link>
          </div>
        ))}
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <Award className="mr-2 text-red-500" />
          Success Stories
        </h2>
        {successStories.map((story) => (
          <div key={story.id} className="bg-gray-100 rounded-lg p-6 mb-4">
            <h3 className="text-xl font-semibold mb-2">{story.title}</h3>
            <p className="mb-4">{story.summary}</p>
            <Link
              href={`/learn/success-story/${story.id}`}
              className="text-blue-500 hover:underline"
            >
              Read the full story →
            </Link>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <h2 className="text-2xl font-bold mb-4">
          Ready to Start Your Journey?
        </h2>
        <Link
          href="/auth/signin"
          className="inline-block bg-blue-500 text-white font-bold py-3 px-6 rounded-full hover:bg-blue-600 transition-colors duration-300"
        >
          Apply for Funding Now
        </Link>
      </div>
    </div>
  );
}
