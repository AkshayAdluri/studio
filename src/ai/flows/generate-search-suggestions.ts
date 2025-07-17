// src/ai/flows/generate-search-suggestions.ts
'use server';

/**
 * @fileOverview Generates AI-powered search suggestions for products.
 *
 * - generateSearchSuggestions - A function that generates search suggestions based on user input.
 * - GenerateSearchSuggestionsInput - The input type for the generateSearchSuggestions function.
 * - GenerateSearchSuggestionsOutput - The return type for the generateSearchSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateSearchSuggestionsInputSchema = z.object({
  searchTerm: z
    .string()
    .describe('The search term entered by the user.'),
  productCategories: z.array(z.string()).describe('The available product categories.'),
});
export type GenerateSearchSuggestionsInput = z.infer<
  typeof GenerateSearchSuggestionsInputSchema
>;

const GenerateSearchSuggestionsOutputSchema = z.object({
  suggestions: z
    .array(z.string())
    .describe('An array of search suggestions related to the search term.'),
});
export type GenerateSearchSuggestionsOutput = z.infer<
  typeof GenerateSearchSuggestionsOutputSchema
>;

export async function generateSearchSuggestions(
  input: GenerateSearchSuggestionsInput
): Promise<GenerateSearchSuggestionsOutput> {
  return generateSearchSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateSearchSuggestionsPrompt',
  input: {schema: GenerateSearchSuggestionsInputSchema},
  output: {schema: GenerateSearchSuggestionsOutputSchema},
  prompt: `You are an AI assistant that provides search suggestions for an e-commerce website.

  The user is searching for products using the term: {{{searchTerm}}}
  Available product categories are: {{#each productCategories}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}

  Generate an array of up to 5 search suggestions that are relevant to the search term and product categories.
  The suggestions should be specific and helpful to the user in finding the products they are looking for.
  Return the suggestions as an array of strings.
  Ensure the suggestions are diverse and cover different aspects of the search term.
  Do not include the original search term in the suggestions.
  Ensure the suggestions are appropriate for an e-commerce website and do not include any inappropriate or offensive content.
  `, 
});

const generateSearchSuggestionsFlow = ai.defineFlow(
  {
    name: 'generateSearchSuggestionsFlow',
    inputSchema: GenerateSearchSuggestionsInputSchema,
    outputSchema: GenerateSearchSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
