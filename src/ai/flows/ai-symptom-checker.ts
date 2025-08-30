'use server';
/**
 * @fileOverview This file defines a Genkit flow for an AI-powered symptom checker.
 *
 * It allows users to input their symptoms and receive a list of potential diseases.
 *
 * @file AISymptomChecker
 * @param {AISymptomCheckerInput} input - The input for the symptom checker.
 * @returns {Promise<AISymptomCheckerOutput>} - A promise that resolves to the output of the symptom checker.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AISymptomCheckerInputSchema = z.object({
  symptoms: z
    .string()
    .describe(
      'A description of the symptoms experienced by the user, either typed or spoken.'
    ),
});
export type AISymptomCheckerInput = z.infer<typeof AISymptomCheckerInputSchema>;

const AISymptomCheckerOutputSchema = z.object({
  possibleDiseases: z
    .string()
    .describe(
      'A list of potential diseases based on the symptoms provided by the user.'
    ),
});
export type AISymptomCheckerOutput = z.infer<typeof AISymptomCheckerOutputSchema>;

export async function aiSymptomChecker(
  input: AISymptomCheckerInput
): Promise<AISymptomCheckerOutput> {
  return aiSymptomCheckerFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiSymptomCheckerPrompt',
  input: {schema: AISymptomCheckerInputSchema},
  output: {schema: AISymptomCheckerOutputSchema},
  prompt: `You are an AI-powered symptom checker. Based on the symptoms provided by the user, you will provide a list of potential diseases.

Symptoms: {{{symptoms}}}

Possible Diseases:`,
});

const aiSymptomCheckerFlow = ai.defineFlow(
  {
    name: 'aiSymptomCheckerFlow',
    inputSchema: AISymptomCheckerInputSchema,
    outputSchema: AISymptomCheckerOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
