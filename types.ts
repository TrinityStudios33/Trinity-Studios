import { LucideIcon } from 'lucide-react';

export interface ServiceItem {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface PortfolioItem {
  id: number;
  title: string;
  category: 'Vídeo' | 'IA' | '3D' | 'Design' | 'Documentários' | 'Comerciais';
  imageUrl: string;
}

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
  icon: LucideIcon;
}