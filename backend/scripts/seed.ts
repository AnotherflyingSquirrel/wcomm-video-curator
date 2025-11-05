import '../src/loadEnv.js';
import { connectDB } from '../src/db/mongoose.js';
import { Topic } from '../src/models/topic.js';
import { TOPICS } from '@video-curator/shared';

async function main() {
  await connectDB();
  for (const t of TOPICS) {
    await Topic.updateOne(
      { slug: t.slug },
      { $set: { name: t.name, description: t.description ?? undefined, slug: t.slug } },
      { upsert: true }
    );
  }
  console.log('Seeded topics:', TOPICS.length);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    process.exit(0);
  });
