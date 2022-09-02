import type { NextApiRequest, NextApiResponse } from 'next';

const expenses = async (req: NextApiRequest, res: NextApiResponse) => {
    res.status(200).json('ok');
};

export default expenses;
