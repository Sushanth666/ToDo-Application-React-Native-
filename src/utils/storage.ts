import AsyncStorage from '@react-native-async-storage/async-storage';
import { TodoItem } from '../types/todo';

const STORAGE_KEY = '@todos_key_v1';

/**
 * Loads todos from persistent device storage.
 */
export async function loadTodos(): Promise<TodoItem[]> {
  try {
    const rawData = await AsyncStorage.getItem(STORAGE_KEY);
    if (!rawData) {
      // Default starter items for a beginner to see right away
      return [
        {
          id: '1',
          title: 'Welcome to your React Native To-Do App! 👋',
          category: 'Personal',
          priority: 'high',
          completed: false,
          createdAt: Date.now() - 3600000,
        },
        {
          id: '2',
          title: 'Tap the circle to mark this task complete',
          category: 'Study',
          priority: 'medium',
          completed: false,
          createdAt: Date.now() - 1800000,
        },
        {
          id: '3',
          title: 'Add your first custom task below 🚀',
          category: 'Work',
          priority: 'low',
          completed: true,
          createdAt: Date.now(),
        },
      ];
    }
    return JSON.parse(rawData);
  } catch (error) {
    console.error('Error loading todos from storage:', error);
    return [];
  }
}

/**
 * Saves todos to persistent device storage.
 */
export async function saveTodos(todos: TodoItem[]): Promise<void> {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  } catch (error) {
    console.error('Error saving todos to storage:', error);
  }
}

