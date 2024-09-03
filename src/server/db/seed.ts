import { conn, db } from '~/server/db/index';
import { users, learningResources, workshops, successStories } from './schema';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';

async function seed() {
  console.log('Seeding database...');

  // Create admin user
  const adminPassword = 'adminpassword123';
  const adminPasswordHash = await bcrypt.hash(adminPassword, 10);
  const adminId = uuidv4();

  await db.insert(users).values({
    id: adminId,
    name: 'Admin User',
    email: 'admin@example.com',
    passwordHash: adminPasswordHash,
    admin: true,
  });

  // Create regular user
  const userPassword = 'userpassword123';
  const userPasswordHash = await bcrypt.hash(userPassword, 10);
  const userId = uuidv4();

  await db.insert(users).values({
    id: userId,
    name: 'Regular User',
    email: 'user@example.com',
    passwordHash: userPasswordHash,
    admin: false,
  });

  // Create learning resources
  await db.insert(learningResources).values([
    {
      type: 'video',
      title: 'Introduction to Entrepreneurship',
      description: 'Learn the basics of starting your own business',
      content: 'Video content here...',
      link: 'https://example.com/intro-to-entrepreneurship',
    },
    {
      type: 'article',
      title: 'Writing a Business Plan',
      description: 'A step-by-step guide to creating a solid business plan',
      content: 'Article content here...',
      link: 'https://example.com/business-plan-guide',
    },
    {
      type: 'video',
      title: 'Financial Management for Startups',
      description: 'Essential financial skills for new entrepreneurs',
      content: 'Video content about financial management...',
      link: 'https://example.com/startup-finances',
    },
    {
      type: 'article',
      title: 'Building a Strong Team',
      description: 'How to recruit and manage talent for your startup',
      content: 'Article content about team building...',
      link: 'https://example.com/startup-team-building',
    },
    {
      type: 'video',
      title: 'Product Development Lifecycle',
      description: 'Understanding the stages of product development',
      content: 'Video content about product development...',
      link: 'https://example.com/product-development',
    },
  ]);

  // Create workshops
  await db.insert(workshops).values([
    {
      title: 'Funding Strategies for Startups',
      description: 'Learn about different funding options for your startup',
      date: new Date('2024-06-15T14:00:00Z'),
      registrationLink: 'https://example.com/register-funding-workshop',
    },
    {
      title: 'Marketing on a Budget',
      description: 'Effective marketing strategies for small businesses',
      date: new Date('2024-07-20T10:00:00Z'),
      registrationLink: 'https://example.com/register-marketing-workshop',
    },
  ]);

  // Create success stories
  await db.insert(successStories).values([
    {
      title: 'From Garage to Global: The TechInnovate Story',
      summary: 'How a small tech startup became a global leader',
      content: 'Full success story content here...',
      founderName: 'Jane Doe',
    },
    {
      title: "Sustainable Success: GreenGrow's Journey",
      summary: "An eco-friendly startup's path to profitability",
      content: 'Full success story content here...',
      founderName: 'John Smith',
    },
    {
      title: 'Disrupting the Fashion Industry: StyleTech Revolution',
      summary: 'How a tech-savvy fashion startup changed the industry',
      content: 'Full success story about StyleTech Revolution...',
      founderName: 'Emma Johnson',
    },
    {
      title: 'From Local to National: FoodDelight Expansion',
      summary: 'A small restaurant chain that grew into a national brand',
      content: 'Full success story about FoodDelight...',
      founderName: 'Michael Chen',
    },
    {
      title: 'Solving Urban Transportation: ZipCommute Success',
      summary: 'An innovative startup tackling city commute problems',
      content: 'Full success story about ZipCommute...',
      founderName: 'Sarah Rodriguez',
    },
  ]);

  console.log('Seeding complete!');

  // Close the database connection
  await conn.end();
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});
