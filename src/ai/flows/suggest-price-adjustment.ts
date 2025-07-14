'use server';

/**
 * @fileOverview A price adjustment suggestion AI agent.
 *
 * - suggestPriceAdjustment - A function that suggests price adjustments based on demand and stock.
 * - SuggestPriceAdjustmentInput - The input type for the suggestPriceAdjustment function.
 * - SuggestPriceAdjustmentOutput - The return type for the suggestPriceAdjustment function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestPriceAdjustmentInputSchema = z.object({
  productName: z.string().describe('The name of the product.'),
  currentStock: z.number().describe('The current stock level of the product.'),
  forecastedDemand: z.number().describe('The forecasted demand for the product.'),
});
export type SuggestPriceAdjustmentInput = z.infer<typeof SuggestPriceAdjustmentInputSchema>;

const SuggestPriceAdjustmentOutputSchema = z.object({
  suggestedPriceAdjustment: z
    .string()
    .describe(
      'A suggestion for price adjustment, including the percentage and whether to increase or decrease the price.'
    ),
  reasoning: z.string().describe('The reasoning behind the suggested price adjustment.'),
});
export type SuggestPriceAdjustmentOutput = z.infer<typeof SuggestPriceAdjustmentOutputSchema>;

export async function suggestPriceAdjustment(
  input: SuggestPriceAdjustmentInput
): Promise<SuggestPriceAdjustmentOutput> {
  return suggestPriceAdjustmentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestPriceAdjustmentPrompt',
  input: {schema: SuggestPriceAdjustmentInputSchema},
  output: {schema: SuggestPriceAdjustmentOutputSchema},
  config: {
    safetySettings: [
        {
          category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
          threshold: 'BLOCK_ONLY_HIGH',
        },
    ],
  },
  prompt: `You are an AI pricing specialist that helps retailers optimize their prices. Your response MUST be a valid JSON object.

  Based on the current stock level and forecasted demand for a product, you will suggest a price adjustment.

  Product Name: {{{productName}}}
  Current Stock: {{{currentStock}}}
  Forecasted Demand: {{{forecastedDemand}}}

  Consider the following when suggesting a price adjustment:
  - If the current stock is significantly higher than the forecasted demand, suggest a price decrease to clear excess inventory.
  - If the current stock is significantly lower than the forecasted demand, suggest a price increase to maximize revenue.
  - If the current stock is roughly equal to the forecasted demand, suggest maintaining the current price.

  The suggestedPriceAdjustment should include the percentage and whether to increase or decrease the price (e.g., "+10%", "-5%").
  Also, include a short reasoning for the suggested price adjustment.
  
  Provide your response as a JSON object matching this exact format:
  {
    "suggestedPriceAdjustment": "string",
    "reasoning": "string"
  }
  `,
});

const suggestPriceAdjustmentFlow = ai.defineFlow(
  {
    name: 'suggestPriceAdjustmentFlow',
    inputSchema: SuggestPriceAdjustmentInputSchema,
    outputSchema: SuggestPriceAdjustmentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    
    if (!output) {
      return {
        suggestedPriceAdjustment: 'N/A',
        reasoning: 'Could not generate a suggestion at this time. The model returned an empty response.',
      };
    }
    
    // The model output should be a JSON object now.
    // No parsing needed as genkit handles it with the output schema.
    return output;
  }
);
