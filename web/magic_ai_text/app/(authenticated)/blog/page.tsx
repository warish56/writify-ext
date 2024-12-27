import React from 'react';
import { Box, Container, Typography, Grid, Card, CardContent, CardMedia, CardActionArea, Chip, Stack } from '@mui/material';
import { AccessTime } from '@mui/icons-material';

const BlogPage = () => {
  const blogPosts = [
    {
      title: 'Getting Started with AI Prompt Search',
      description: `Learn how to maximize your productivity with our browser extension's AI-powered search capabilities.`,
      image: '/api/placeholder/800/400',
      date: 'Dec 20, 2024',
      readTime: '5 min read',
      category: 'Tutorial'
    },
    {
      title: 'Top 10 Pre-defined Prompts for Content Creation',
      description: 'Discover the most effective pre-defined prompts that can enhance your content creation workflow.',
      image: '/api/placeholder/800/400',
      date: 'Dec 18, 2024',
      readTime: '8 min read',
      category: 'Tips & Tricks'
    },
    {
      title: 'Customizing AI Prompts for Different Use Cases',
      description: 'A comprehensive guide to creating and optimizing custom prompts for various scenarios.',
      image: '/api/placeholder/800/400',
      date: 'Dec 15, 2024',
      readTime: '6 min read',
      category: 'Guide'
    },
    {
      title: 'The Future of AI-Assisted Browsing',
      description: 'Explore how AI browser extensions are revolutionizing the way we interact with web content.',
      image: '/api/placeholder/800/400',
      date: 'Dec 12, 2024',
      readTime: '7 min read',
      category: 'Industry'
    },
    {
      title: 'Best Practices for AI Prompt Engineering',
      description: 'Expert tips on crafting effective AI prompts that deliver precise and relevant results.',
      image: '/api/placeholder/800/400',
      date: 'Dec 10, 2024',
      readTime: '10 min read',
      category: 'Best Practices'
    },
    {
      title: 'How AI is Transforming Research and Writing',
      description: 'Insights into the impact of AI tools on academic and professional writing workflows.',
      image: '/api/placeholder/800/400',
      date: 'Dec 8, 2024',
      readTime: '9 min read',
      category: 'Research'
    }
  ];

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 8 }}>
      <Container maxWidth="lg">
        <Typography variant="h1" sx={{ 
          color: 'primary.main',
          textAlign: 'center',
          mb: 2
        }}>
          Blog
        </Typography>
        
        <Typography variant="h2" sx={{ 
          color: 'text.secondary',
          textAlign: 'center',
          mb: 6
        }}>
          Insights, Updates, and Guides
        </Typography>

        <Grid container spacing={4}>
          {blogPosts.map((post, index) => (
            <Grid item xs={12} md={6} lg={4} key={index}>
              <Card sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s',
                '&:hover': { 
                  transform: 'translateY(-4px)',
                  boxShadow: 4
                }
              }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="200"
                    image={post.image}
                    alt={post.title}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                      <Chip 
                        label={post.category}
                        size="small"
                        sx={{ 
                          bgcolor: 'primary.main',
                          color: 'white',
                          fontWeight: 500
                        }}
                      />
                    </Stack>
                    <Typography variant="h3" sx={{ mb: 1 }}>
                      {post.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {post.description}
                    </Typography>
                    <Stack 
                      direction="row" 
                      spacing={2}
                      alignItems="center"
                      sx={{ 
                        color: 'text.secondary',
                        fontSize: '0.875rem'
                      }}
                    >
                      <Typography variant="caption">
                        {post.date}
                      </Typography>
                      <Stack 
                        direction="row" 
                        spacing={0.5}
                        alignItems="center"
                      >
                        <AccessTime sx={{ fontSize: 16 }} />
                        <Typography variant="caption">
                          {post.readTime}
                        </Typography>
                      </Stack>
                    </Stack>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default BlogPage;