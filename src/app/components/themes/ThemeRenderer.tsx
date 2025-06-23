"use client";

import React from 'react';
import { useAgencySettings } from '@/hooks/useAgencySettings';
import ModernTheme from '@/app/Dashboard/ModernThema/page';
// import ClassicTheme from './ClassicTheme';
// import LuxuryTheme from './LuxuryTheme';
// import NatureTheme from './NatureTheme';

interface ThemeRendererProps {
  themeId: number;
  tours?: any[];
  testimonials?: any[];
}

const themeComponents = {
  1: ModernTheme,
//   2: ClassicTheme,
//   3: LuxuryTheme,
//   4: NatureTheme,
};

export default function ThemeRenderer({ themeId, tours = [], testimonials = [] }: ThemeRendererProps) {
  const { settings, isLoading } = useAgencySettings();
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  const ThemeComponent = themeComponents[themeId as keyof typeof themeComponents] || ModernTheme;
  
  return (
    <ThemeComponent 
      tours={tours} 
      testimonials={testimonials}
      settings={settings}
    />
  );
}