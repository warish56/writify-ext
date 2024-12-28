
import React from 'react';
import {
  Box,
} from '@mui/material';

import { UseCasesSection } from './UseCasesSection';
import { CtaSection } from './CtaSection';
import { HowItWorksSection } from './HowItWorksSection';
import { FeaturesSection } from './FeaturesSection';
import { HeroSection } from './HeroSection';


export const MarketingPage = () => {

  return (
    <Box>
      <HeroSection/>
      <FeaturesSection/>
      <HowItWorksSection/>
      <UseCasesSection/>
      <CtaSection />
    </Box>
  );
};
