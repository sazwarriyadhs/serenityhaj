'use server';

/**
 * @fileOverview Generates initial draft itineraries for Umroh or Hajj trips.
 *
 * - generateInitialItinerary - A function that generates the itinerary.
 * - GenerateInitialItineraryInput - The input type for the generateInitialItinerary function.
 * - GenerateInitialItineraryOutput - The return type for the generateInitialItinerary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateInitialItineraryInputSchema = z.object({
  startDate: z.string().describe('The starting date of the trip (YYYY-MM-DD).'),
  endDate: z.string().describe('The ending date of the trip (YYYY-MM-DD).'),
  numberOfPilgrims: z.number().describe('The number of pilgrims on the trip.'),
  preferences: z
    .string()
    .optional()
    .describe(
      'Any specific preferences or requests for the itinerary, such as preferred hotels or activities.'
    ),
});
export type GenerateInitialItineraryInput = z.infer<
  typeof GenerateInitialItineraryInputSchema
>;

const GenerateInitialItineraryOutputSchema = z.object({
  itinerary: z.string().describe('The generated itinerary for the trip.'),
});
export type GenerateInitialItineraryOutput = z.infer<
  typeof GenerateInitialItineraryOutputSchema
>;

export async function generateInitialItinerary(
  input: GenerateInitialItineraryInput
): Promise<GenerateInitialItineraryOutput> {
  return generateInitialItineraryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateInitialItineraryPrompt',
  input: {schema: GenerateInitialItineraryInputSchema},
  output: {schema: GenerateInitialItineraryOutputSchema},
  prompt: `You are an expert travel agent specializing in creating itineraries for Umroh and Hajj pilgrimages.

  Based on the following information, generate a detailed itinerary for the trip:

  Start Date: {{{startDate}}}
  End Date: {{{endDate}}}
  Number of Pilgrims: {{{numberOfPilgrims}}}
  Preferences: {{{preferences}}}

  The itinerary should include daily activities, prayer times, visits to important sites, and travel arrangements. Be specific about locations and times.
  `,
});

const generateInitialItineraryFlow = ai.defineFlow(
  {
    name: 'generateInitialItineraryFlow',
    inputSchema: GenerateInitialItineraryInputSchema,
    outputSchema: GenerateInitialItineraryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
