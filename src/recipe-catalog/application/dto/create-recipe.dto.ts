export interface CreateRecipeDto {
  id: string;
  title: string;
  difficulty: 'easy' | 'medium' | 'hard';
  totalMinutes: number;
  requiresAdult: boolean;
  ingredients: string[];
  utensils: string[];
}
