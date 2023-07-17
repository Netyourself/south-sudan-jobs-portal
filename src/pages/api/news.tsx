import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  news: string[];
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ news: ['Jobs updates'] });
}
