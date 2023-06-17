// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from 'next';
import MemberModel from '@/models/members/model';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { uid, email, displayName, photoURL } = req.body;
  if (uid === undefined || uid === null) {
    res.status(400).json({ result: false, message: 'uid가 없습니다.' });
  }
  if (email === undefined || email === null) {
    res.status(400).json({ result: false, message: 'email가 없습니다.' });
  }

  const addResult = await MemberModel.add({ uid, email, displayName, photoURL });
  if (addResult.result === true) {
    return res.status(200).json(addResult);
  }
  res.status(500).json(addResult);
}
