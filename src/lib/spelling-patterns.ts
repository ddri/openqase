/**
 * US to UK English spelling patterns
 * Used for content validation to ensure consistent UK English usage
 */

export interface SpellingPattern {
  pattern: RegExp;
  usSpelling: string;
  ukSpelling: string;
  category: 'ize-ise' | 'or-our' | 'er-re' | 'se-ce' | 'og-ogue' | 'l-ll';
}

/**
 * Common US to UK spelling patterns
 * Patterns are case-insensitive (gi flag)
 */
export const US_TO_UK_PATTERNS: SpellingPattern[] = [
  // -ize to -ise
  { pattern: /\boptimize\b/gi, usSpelling: 'optimize', ukSpelling: 'optimise', category: 'ize-ise' },
  { pattern: /\boptimization\b/gi, usSpelling: 'optimization', ukSpelling: 'optimisation', category: 'ize-ise' },
  { pattern: /\bminimize\b/gi, usSpelling: 'minimize', ukSpelling: 'minimise', category: 'ize-ise' },
  { pattern: /\bmaximize\b/gi, usSpelling: 'maximize', ukSpelling: 'maximise', category: 'ize-ise' },
  { pattern: /\banalyze\b/gi, usSpelling: 'analyze', ukSpelling: 'analyse', category: 'ize-ise' },
  { pattern: /\brealize\b/gi, usSpelling: 'realize', ukSpelling: 'realise', category: 'ize-ise' },
  { pattern: /\borganize\b/gi, usSpelling: 'organize', ukSpelling: 'organise', category: 'ize-ise' },
  { pattern: /\brecognize\b/gi, usSpelling: 'recognize', ukSpelling: 'recognise', category: 'ize-ise' },

  // -or to -our
  { pattern: /\bcolor\b/gi, usSpelling: 'color', ukSpelling: 'colour', category: 'or-our' },
  { pattern: /\bbehavior\b/gi, usSpelling: 'behavior', ukSpelling: 'behaviour', category: 'or-our' },

  // -er to -re
  { pattern: /\bcenter\b/gi, usSpelling: 'center', ukSpelling: 'centre', category: 'er-re' },
  { pattern: /\bfiber\b/gi, usSpelling: 'fiber', ukSpelling: 'fibre', category: 'er-re' },

  // -se to -ce
  { pattern: /\bdefense\b/gi, usSpelling: 'defense', ukSpelling: 'defence', category: 'se-ce' },
  { pattern: /\blicense\b/gi, usSpelling: 'license', ukSpelling: 'licence', category: 'se-ce' },

  // -og to -ogue
  { pattern: /\bcatalog\b/gi, usSpelling: 'catalog', ukSpelling: 'catalogue', category: 'og-ogue' },
  { pattern: /\bdialog\b/gi, usSpelling: 'dialog', ukSpelling: 'dialogue', category: 'og-ogue' },

  // Single l to double l
  { pattern: /\btraveling\b/gi, usSpelling: 'traveling', ukSpelling: 'travelling', category: 'l-ll' },
  { pattern: /\bmodeling\b/gi, usSpelling: 'modeling', ukSpelling: 'modelling', category: 'l-ll' },
  { pattern: /\bsignaling\b/gi, usSpelling: 'signaling', ukSpelling: 'signalling', category: 'l-ll' },
];

/**
 * Find US spelling patterns in text
 * Returns matches with their UK equivalents
 */
export function findUSSpellings(text: string): Array<{
  usSpelling: string;
  ukSpelling: string;
  matches: string[];
  category: string;
}> {
  const findings: Array<{
    usSpelling: string;
    ukSpelling: string;
    matches: string[];
    category: string;
  }> = [];

  for (const spellingPattern of US_TO_UK_PATTERNS) {
    const matches = text.match(spellingPattern.pattern);
    if (matches && matches.length > 0) {
      // Get unique matches
      const uniqueMatches = [...new Set(matches)];

      findings.push({
        usSpelling: spellingPattern.usSpelling,
        ukSpelling: spellingPattern.ukSpelling,
        matches: uniqueMatches,
        category: spellingPattern.category,
      });
    }
  }

  return findings;
}

/**
 * Replace US spellings with UK equivalents
 */
export function replaceUSSpellings(text: string): string {
  let result = text;

  for (const spellingPattern of US_TO_UK_PATTERNS) {
    result = result.replace(spellingPattern.pattern, spellingPattern.ukSpelling);
  }

  return result;
}
