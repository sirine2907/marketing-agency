/**
 * Single source of truth for anything that needs the deployed URL.
 * Set NEXT_PUBLIC_SITE_URL in the host's env once the domain is live.
 */
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://signal-studio.vercel.app').replace(/\/$/, '')

export const siteName = 'SIGNAL®'

export const siteDescription =
  'SIGNAL is a creative and performance marketing studio. We build brands that are impossible to scroll past, and campaigns that can be measured to the last cent.'
