import { config } from 'dotenv';
config();

import '@/ai/flows/forecast-demand.ts';
import '@/ai/flows/suggest-price-adjustment.ts';