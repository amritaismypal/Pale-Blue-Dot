import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  studioHost: 'pale-blue-dot',
  api: {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '1l5o2tjb',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  },
  deployment: {
    autoUpdates: true,
  },
})
