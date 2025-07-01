// adjust-itinerary.ts
'use server';
/**
 * @fileOverview Adjusts pilgrim itineraries based on external events such as flight delays or weather changes.
 *
 * - adjustItinerary - A function that adjusts the itinerary based on external events.
 * - AdjustItineraryInput - The input type for the adjustItinerary function.
 * - AdjustItineraryOutput - The return type for the adjustItinerary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AdjustItineraryInputSchema = z.object({
  currentItinerary: z
    .string()
    .describe('The current itinerary of the pilgrim as a text.'),
  externalEvent: z
    .string()
    .describe(
      'A description of the external event that may impact the itinerary, such as flight delays or weather changes.'
    ),
});
export type AdjustItineraryInput = z.infer<typeof AdjustItineraryInputSchema>;

const AdjustItineraryOutputSchema = z.object({
  adjustedItinerary: z
    .string()
    .describe('The adjusted itinerary based on the external event.'),
  reasoning: z
    .string()
    .describe('The reasoning behind the adjustments made to the itinerary.'),
});
export type AdjustItineraryOutput = z.infer<typeof AdjustItineraryOutputSchema>;

export async function adjustItinerary(input: AdjustItineraryInput): Promise<AdjustItineraryOutput> {
  return adjustItineraryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'adjustItineraryPrompt',
  input: {schema: AdjustItineraryInputSchema},
  output: {schema: AdjustItineraryOutputSchema},
  prompt: `You are an expert travel agent specializing in Hajj and Umrah pilgrimages.

You are responsible for adjusting pilgrim itineraries based on real-time events such as flight delays or weather changes.

Given the current itinerary and the external event, adjust the itinerary to ensure a smooth and timely execution of travel plans with minimal manual intervention.

Current Itinerary: {{{currentItinerary}}}
External Event: {{{externalEvent}}}

Provide the adjusted itinerary and the reasoning behind the adjustments.

Adjusted Itinerary:
Reasoning: `,
});

const adjustItineraryFlow = ai.defineFlow(
  {
    name: 'adjustItineraryFlow',
    inputSchema: AdjustItineraryInputSchema,
    outputSchema: AdjustItineraryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
