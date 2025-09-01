import { ExamType, ExamTypeListResponse, ExamTypeListParams } from './types';

// Allowed exam type slugs for the application
const ALLOWED_EXAM_TYPE_SLUGS = ['mock', 'quiz', 'self-assessment', 'sjmme', 'sje'] as const;

export type AllowedExamTypeSlug = typeof ALLOWED_EXAM_TYPE_SLUGS[number];

/**
 * Filters exam types to only include allowed types
 */
export const filterAllowedExamTypes = (examTypes: ExamType[]): ExamType[] => {
  return examTypes.filter((examType) => 
    examType.ExamTypeSlug && ALLOWED_EXAM_TYPE_SLUGS.includes(examType.ExamTypeSlug as AllowedExamTypeSlug)
  );
};

/**
 * Gets exam type name by ID
 */
export const getExamTypeNameById = (examTypes: ExamType[], examTypeId: string | number): string => {
  const examType = examTypes.find(type => type.ExamTypeID.toString() === examTypeId.toString());
  return examType?.ExamTypeName || 'Unknown';
};

/**
 * Validates if an exam type slug is allowed
 */
export const isAllowedExamTypeSlug = (slug: string | null): slug is AllowedExamTypeSlug => {
  return slug !== null && ALLOWED_EXAM_TYPE_SLUGS.includes(slug as AllowedExamTypeSlug);
};
