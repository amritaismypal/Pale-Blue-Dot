import type { NextApiRequest, NextApiResponse } from 'next'

export default function disableDraftMode(_req: NextApiRequest, res: NextApiResponse) {
  res.clearPreviewData()
  res.redirect(307, '/')
}
