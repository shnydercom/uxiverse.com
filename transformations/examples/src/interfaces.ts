/**
 * a return type for matching algorithms running over typescript programs. Contains the exports that match, as well as 'others'
 */
export interface ExportsMatcherSummary {
  matchingExports: string[];
  otherExports: string[];
}
