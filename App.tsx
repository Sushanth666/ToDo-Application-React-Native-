import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { TodoItem, Category, Priority, FilterType } from './src/types/todo';
import { loadTodos, saveTodos } from './src/utils/storage';
import { Header } from './src/components/Header';
import { TaskInput } from './src/components/TaskInput';
import { FilterBar } from './src/components/FilterBar';
import { TaskItem } from './src/components/TaskItem';

export default function App() {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [filter, setFilter] = useState<FilterType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Load saved todos on initial mount
  useEffect(() => {
    async function init() {
      const saved = await loadTodos();
      setTodos(saved);
      setIsLoading(false);
    }
    init();
  }, []);

  // Save todos to storage whenever state updates (after initial load)
  useEffect(() => {
    if (!isLoading) {
      saveTodos(todos);
    }
  }, [todos, isLoading]);

  // Handler: Add a new task
  const handleAddTask = (title: string, category: Category, priority: Priority) => {
    const newTask: TodoItem = {
      id: Date.now().toString(),
      title,
      category,
      priority,
      completed: false,
      createdAt: Date.now(),
    };
    setTodos((prev) => [newTask, ...prev]);
  };

  // Handler: Toggle completed status
  const handleToggle = (id: string) => {
    setTodos((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  // Handler: Delete single task
  const handleDelete = (id: string) => {
    setTodos((prev) => prev.filter((item) => item.id !== id));
  };

  // Handler: Clear all completed tasks with confirmation
  const handleClearCompleted = () => {
    Alert.alert(
      'Clear Completed Tasks',
      'Are you sure you want to remove all completed tasks?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: () => {
            setTodos((prev) => prev.filter((item) => !item.completed));
          },
        },
      ]
    );
  };

  // Compute counts for filter tabs
  const counts = {
    all: todos.length,
    active: todos.filter((t) => !t.completed).length,
    completed: todos.filter((t) => t.completed).length,
  };

  // Filter & Search logic
  const filteredTodos = todos.filter((item) => {
    // Filter tab
    if (filter === 'active' && item.completed) return false;
    if (filter === 'completed' && !item.completed) return false;

    // Search query
    if (searchQuery.trim().length > 0) {
      const matchesTitle = item.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCategory = item.category
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return matchesTitle || matchesCategory;
    }

    return true;
  });

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
        <StatusBar style="dark" />
        <KeyboardAvoidingView
          style={styles.keyboardContainer}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          {/* Header with stats and progress */}
          <Header
            totalTasks={counts.all}
            completedTasks={counts.completed}
            onClearCompleted={handleClearCompleted}
          />

          {/* New Task Input Component */}
          <TaskInput onAddTask={handleAddTask} />

          {/* Filter & Search Bar */}
          <FilterBar
            currentFilter={filter}
            onChangeFilter={setFilter}
            searchQuery={searchQuery}
            onChangeSearch={setSearchQuery}
            counts={counts}
          />

          {/* Task List */}
          <FlatList
            data={filteredTodos}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TaskItem
                item={item}
                onToggle={handleToggle}
                onDelete={handleDelete}
              />
            )}
            contentContainerStyle={styles.listContent}
            keyboardDismissMode="on-drag"
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Ionicons
                  name={
                    searchQuery
                      ? 'search-outline'
                      : filter === 'completed'
                      ? 'checkmark-done-circle-outline'
                      : 'checkbox-outline'
                  }
                  size={52}
                  color="#d1d5db"
                />
                <Text style={styles.emptyTitle}>
                  {searchQuery
                    ? 'No matching tasks'
                    : filter === 'completed'
                    ? 'No completed tasks yet'
                    : 'No tasks found'}
                </Text>
                <Text style={styles.emptySubtitle}>
                  {searchQuery
                    ? 'Try adjusting your search terms'
                    : 'Add a new task above to get started!'}
                </Text>
              </View>
            }
          />
        </KeyboardAvoidingView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  keyboardContainer: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 24,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
    paddingHorizontal: 24,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6b7280',
  },
  emptySubtitle: {
    fontSize: 13,
    color: '#9ca3af',
    marginTop: 4,
    textAlign: 'center',
  },
});
