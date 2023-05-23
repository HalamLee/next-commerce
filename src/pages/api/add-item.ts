import type { NextApiRequest, NextApiResponse } from 'next';
import { Client } from '@notionhq/client';

const notion = new Client({
  auth: process.env.NEXT_PUBLIC_NOTION_KEY,
});

const databaseId = process.env.NEXT_PUBLIC_NOTION_DATABASE_ID;

console.log(process.env.NEXT_PUBLIC_NOTION_KEY);
console.log(databaseId);

async function addItem(name: string) {
  try {
    const response = await notion.pages.create({
      parent: { database_id: `${databaseId}` },
      properties: {
        title: {
          title: [
            {
              text: {
                content: name,
              },
            },
          ],
        },
      },
    });
    console.log(response);
    console.log('Success! Entry added.');
  } catch (error) {
    console.error(JSON.stringify(error));
  }
}

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { name } = req.query;

  if (name == null) {
    return res.status(400).json({ message: 'No name' });
  }

  try {
    await addItem(String(name));
    res.status(200).json({ message: `Success ${name} added` });
  } catch (error) {
    res.status(400).json({ message: `Failed ${name} added` });
  }
}
