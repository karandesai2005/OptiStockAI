'use server';

/**
 * @fileOverview An AI agent that forecasts demand for the next 30 days by product category.
 *
 * - forecastDemand - A function that handles the demand forecasting process.
 * - ForecastDemandInput - The input type for the forecastDemand function.
 * - ForecastDemandOutput - The return type for the forecastDemand function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ForecastDemandInputSchema = z.object({
  productCategories: z
    .array(z.string())
    .describe('An array of product categories to forecast demand for.'),
  pastSalesData: z.string().describe('Past sales data for each product category.'),
});
export type ForecastDemandInput = z.infer<typeof ForecastDemandInputSchema>;

const ForecastDemandOutputSchema = z.array(
  z.object({
    category: z.string().describe('The product category.'),
    demand: z.number().describe('The forecasted demand for the next 30 days.'),
  })
);
export type ForecastDemandOutput = z.infer<typeof ForecastDemandOutputSchema>;

export async function forecastDemand(input: ForecastDemandInput): Promise<ForecastDemandOutput> {
  return forecastDemandFlow(input);
}

const prompt = ai.definePrompt({
  name: 'forecastDemandPrompt',
  input: {schema: ForecastDemandInputSchema},
  output: {schema: ForecastDemandOutputSchema},
  prompt: `You are an AI assistant that forecasts demand for the next 30 days by product category, given past sales data. Provide a numerical demand forecast for each category.

Product Categories: {{{productCategories}}}
Past Sales Data: {{{pastSalesData}}}

Forecasted Demand (next 30 days):`,
});

const forecastDemandFlow = ai.defineFlow(
  {
    name: 'forecastDemandFlow',
    inputSchema: ForecastDemandInputSchema,
    outputSchema: ForecastDemandOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
