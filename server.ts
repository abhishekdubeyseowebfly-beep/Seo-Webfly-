import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini AI Client lazily
  let genAI: GoogleGenAI | null = null;
  function getGeminiClient() {
    if (!genAI && process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'MY_GEMINI_API_KEY') {
      try {
        genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      } catch (err) {
        console.warn('Gemini client initialization failed, fallback engine will be used.', err);
      }
    }
    return genAI;
  }

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', agency: 'SEOWebFly', version: '2.0.0' });
  });

  // Free AI Website & SEO Audit API Endpoint
  app.post('/api/audit', async (req, res) => {
    try {
      const { url } = req.body;
      if (!url || typeof url !== 'string') {
        return res.status(400).json({ error: 'Please provide a valid website URL or domain name.' });
      }

      const cleanUrl = url.trim().replace(/^https?:\/\//, '').replace(/\/$/, '');
      const client = getGeminiClient();

      if (client) {
        try {
          const prompt = `You are a Chief SEO Strategist and Web Technical Architect at SEOWebFly Agency.
Analyze the following website or brand domain: "${cleanUrl}".
Provide a concise, highly strategic, realistic digital audit JSON object.
Return ONLY valid JSON with no markdown formatting around it (no markdown code blocks, just raw JSON).
JSON Schema:
{
  "url": "${cleanUrl}",
  "overallScore": number (60-95),
  "seoScore": number (55-92),
  "performanceScore": number (65-98),
  "aiReadinessScore": number (50-90),
  "quickWins": [3 concise actionable quick win bullet strings],
  "technicalIssues": [3 technical or SEO bottleneck strings],
  "projectedRevenueIncrease": string (e.g. "+$45,000 / mo" or "+180% Organic ROI"),
  "keywordOpportunityCount": number (e.g. 120-450),
  "summary": string (2 sentences describing growth potential with SEOWebFly strategies)
}`;

          const response = await client.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
          });

          let text = response.text || '';
          text = text.replace(/```json/g, '').replace(/```/g, '').trim();

          try {
            const auditData = JSON.parse(text);
            return res.json(auditData);
          } catch (jsonErr) {
            console.warn('Failed to parse Gemini JSON response, falling back to smart engine', jsonErr);
          }
        } catch (aiErr) {
          console.warn('Gemini API call failed, falling back to rule-based engine:', aiErr);
        }
      }

      // Rule-Based Smart Fallback Generator
      const domainHash = cleanUrl.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
      const overallScore = 68 + (domainHash % 22);
      const seoScore = 62 + (domainHash % 26);
      const performanceScore = 70 + (domainHash % 24);
      const aiReadinessScore = 55 + (domainHash % 30);
      const kwCount = 140 + (domainHash % 220);
      const projRev = `+$${((domainHash % 45) + 25) * 1000} / mo`;

      const auditFallback = {
        url: cleanUrl,
        overallScore,
        seoScore,
        performanceScore,
        aiReadinessScore,
        quickWins: [
          `Fix JavaScript rendering & schema markup for core pages on ${cleanUrl}`,
          `Target high-intent non-branded keyword gaps currently ranking on pages 2-4`,
          `Implement headless CDN caching & image webp conversion to achieve <1.2s LCP`
        ],
        technicalIssues: [
          `Missing structured JSON-LD Organization & Product schema`,
          `Unoptimized Core Web Vitals on mobile viewport`,
          `Sub-optimal internal link siloing across main services`
        ],
        projectedRevenueIncrease: projRev,
        keywordOpportunityCount: kwCount,
        summary: `Analysis of ${cleanUrl} indicates significant uncaptured organic traffic. Implementing SEOWebFly's Growth Loop framework can expand first-page keyword footprint by up to 3x within 90 days.`
      };

      return res.json(auditFallback);
    } catch (err: any) {
      console.error('Audit handler error:', err);
      res.status(500).json({ error: 'Internal server error while auditing domain.' });
    }
  });

  // Vite development middleware vs Production static serving
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`SEOWebFly server running at http://localhost:${PORT}`);
  });
}

startServer();
