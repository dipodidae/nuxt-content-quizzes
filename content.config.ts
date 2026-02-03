/**
 * We model quizzes as a bounded content domain:
 *
 * /content/quizzes/{slug}/
 *   - index.md        → quiz aggregate root (title, intro, meta)
 *   - questions/*.yml → atomic question entities
 *   - score.yml      → scoring rules for the quiz
 *
 * Collections:
 * - quizzes: metadata + intro content
 * - questions: one question per file, grouped per quiz
 * - scores: scoring ranges per quiz
 *
 * This structure must support:
 * - scalable editing
 * - per-question analytics
 * - future CMS migration
 * - no embedded JSON blobs
 */

import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    quizzes: defineCollection({
      type: 'page',
      source: 'quizzes/**/index.md',
      schema: z.object({
        title: z.string(),
        description: z.string().optional(),
        timeLimit: z.number().optional(),
      }),
    }),

    questions: defineCollection({
      type: 'data',
      source: 'quizzes/**/questions/*.yml',
      schema: z.object({
        id: z.string(),
        question: z.string(),
        answers: z.array(z.string()),
        correct: z.number(),
        image: z.string().optional(),
        type: z.enum(['multiple-choice', 'boolean', 'image']).optional(),
        difficulty: z.enum(['easy', 'medium', 'hard']).optional(),
        points: z.number().optional(),
        explanation: z.object({
          text: z.string(),
          video: z.string().optional(),
        }).optional(),
      }),
    }),

    scores: defineCollection({
      type: 'data',
      source: 'quizzes/**/score.yml',
      schema: z.object({
        ranges: z.array(
          z.object({
            min: z.number(),
            max: z.number(),
            title: z.string(),
            text: z.string(),
          }),
        ),
      }),
    }),
  },
})
