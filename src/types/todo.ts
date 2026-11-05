export type Priority = 'low' | 'medium' | 'high';

export type Category = 'Work' | 'Personal' | 'Study' | 'Health' | 'Other';

export type FilterType = 'all' | 'active' | 'completed';

export interface TodoItem {
  id: string;
  title: string;
  category: Category;
  priority: Priority;
  completed: boolean;
  createdAt: number;
}

