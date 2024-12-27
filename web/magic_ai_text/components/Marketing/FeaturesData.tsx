import {
    Extension,
    Search,
    AutoAwesome,
    Edit,
    Speed,
  } from '@mui/icons-material';

export const features = [
    {
      icon: <Search sx={{ fontSize: 40 }} />,
      title: 'Smart Selection Search',
      description: 'Simply select any text on your browser and let AI analyze and enhance it instantly.',
    },
    {
      icon: <AutoAwesome sx={{ fontSize: 40 }} />,
      title: 'Pre-defined Prompts',
      description: 'Access a curated library of prompts for common tasks like summarization, analysis, and more.',
    },
    {
      icon: <Edit sx={{ fontSize: 40 }} />,
      title: 'Custom Prompts',
      description: 'Create and save your own custom prompts tailored to your specific needs.',
    },
    {
      icon: <Speed sx={{ fontSize: 40 }} />,
      title: 'Lightning Fast',
      description: 'Get AI-powered responses in seconds, right within your browser.',
    },
  ];

  export const useCases = [
    {
      title: 'Research',
      description: 'Quickly analyze and summarize academic papers, articles, and research materials.',
    },
    {
      title: 'Content Creation',
      description: 'Generate ideas, outlines, and variations for your content.',
    },
    {
      title: 'Learning',
      description: `Get explanations and insights about any topic you're studying.`,
    },
    {
      title: 'Professional Work',
      description: 'Enhance emails, reports, and business documents with AI assistance.',
    },
  ];