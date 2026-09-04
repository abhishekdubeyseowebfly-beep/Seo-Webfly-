export type PortfolioTemplateId = 'velocity' | 'cyber' | 'editorial' | 'bento';

export interface PortfolioTemplate {
  id: PortfolioTemplateId;
  name: string;
  tagline: string;
  description: string;
  badge: string;
  themeClass: string;
  headerStyle: string;
  cardStyle: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  client: string;
  country: string;
  countryFlag: string;
  category: 'SEO' | 'Web Dev' | 'eCommerce' | 'AI Automation' | 'PPC';
  subtitle: string;
  summary: string;
  beforeMetrics: {
    traffic?: string;
    keywordsPage1?: string;
    rankings?: string;
    conversion?: string;
    leads?: string;
    bounceRate?: string;
    roas?: string;
  };
  afterMetrics: {
    traffic?: string;
    keywordsPage1?: string;
    rankings?: string;
    conversion?: string;
    leads?: string;
    bounceRate?: string;
    roas?: string;
  };
  highlightStat: string;
  highlightLabel: string;
  keyTakeaway: string;
  technicalDetails: string[];
  toolsUsed: string[];
  featuredImage: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  category: string;
  icon: string;
  description: string;
  tags: string[];
  features: string[];
  impactMetric: string;
  image?: string;
}

export interface GrowthLoopStep {
  stepNumber: number;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  deliverables: string[];
  keyTools: string[];
}

export interface ConsultationFormData {
  coreObjectives: string[];
  companyName: string;
  websiteUrl: string;
  industry: string;
  monthlyTraffic: string;
  budgetRange: string;
  targetTimeline: string;
  fullName: string;
  email: string;
  phone: string;
  preferredDate: string;
  preferredTime: string;
  projectNotes: string;
  wantFreeAiAudit: boolean;
}

export interface AuditResult {
  url: string;
  overallScore: number;
  seoScore: number;
  performanceScore: number;
  aiReadinessScore: number;
  quickWins: string[];
  technicalIssues: string[];
  projectedRevenueIncrease: string;
  keywordOpportunityCount: number;
  summary: string;
}

export interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
  size?: string;
  modifiedTime?: string;
  webViewLink?: string;
  iconLink?: string;
  thumbnailLink?: string;
  owners?: { displayName: string; emailAddress?: string; photoLink?: string }[];
  parents?: string[];
}

export interface DriveFolder {
  id: string;
  name: string;
}
