import type { Metadata } from 'next'

export const RootMetaData: Metadata = {
  // Basic Metadata
  title: 'AI Magic Text - AI Prompt Search Browser Extension',
  description: 'Enhance your browsing with AI-powered prompt search. Select text and instantly get AI prompts. Free plan with 25 daily credits, Pro & Elite plans for power users.',
  
  // Open Graph
  openGraph: {
    title: 'AI Magic Text - Smart AI Prompt Search Extension',
    description: 'Transform your browsing experience with instant AI prompts. Select text and get intelligent prompt suggestions. Start free with 25 daily credits.',
    url: 'https://aimagictext.in',
    siteName: 'AI Magic Text',
    images: [
      {
        url: '/og-image.png', // Make sure to add your OG image
        width: 1200,
        height: 630,
        alt: 'AI Magic Text Browser Extension',
      }
    ],
    type: 'website',
    locale: 'en_US',
  },

  // Twitter
  twitter: {
    card: 'summary_large_image',
    title: 'AI Magic Text - Browser Extension for AI Prompts',
    description: 'Get instant AI prompts for any selected text. Free plan available. Built for Chrome, Firefox & Edge.',
    images: ['/twitter-image.png'], // Add your Twitter card image
    creator: '@aimagictext', // Add your Twitter handle if you have one
  },

  // Additional Metadata
  keywords: [
    'AI prompt generator',
    'browser extension',
    'AI writing assistant',
    'prompt search tool',
    'AI text tools',
    'Chrome extension',
    'Firefox addon',
    'Edge extension',
    'AI prompt suggestions',
    'text selection tool',
    'writing productivity',
    'AI writing prompts',
    'custom AI prompts',
    'free AI tool',
    'prompt search engine'
  ],
  
  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  // Additional tags
  alternates: {
    canonical: 'https://aimagictext.in',
  },
  
  category: 'technology',
  
  // App specific metadata
  applicationName: 'AI Magic Text',
  generator: 'AI Magic Text',
  
  authors: [
    { name: 'AI Magic Text Team' }
  ],

}