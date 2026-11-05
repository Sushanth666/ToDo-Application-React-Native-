import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
  Keyboard,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Category, Priority } from '../types/todo';

interface TaskInputProps {
  onAddTask: (title: string, category: Category, priority: Priority) => void;
}

const CATEGORIES: Category[] = ['Work', 'Personal', 'Study', 'Health', 'Other'];
const PRIORITIES: { label: string; value: Priority; color: string }[] = [
  { label: 'Low', value: 'low', color: '#10b981' },
  { label: 'Medium', value: 'medium', color: '#f59e0b' },
  { label: 'High', value: 'high', color: '#ef4444' },
];

export const TaskInput: React.FC<TaskInputProps> = ({ onAddTask }) => {
  const [text, setText] = useState('');
  const [category, setCategory] = useState<Category>('Personal');
  const [priority, setPriority] = useState<Priority>('medium');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleAdd = () => {
    const trimmed = text.trim();
    if (!trimmed) return;

    onAddTask(trimmed, category, priority);
    setText('');
    setIsExpanded(false);
    Keyboard.dismiss();
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="What do you need to do?"
          placeholderTextColor="#9ca3af"
          value={text}
          onChangeText={setText}
          onFocus={() => setIsExpanded(true)}
          onSubmitEditing={handleAdd}
          returnKeyType="done"
        />

        <TouchableOpacity
          style={[styles.addButton, !text.trim() && styles.addButtonDisabled]}
          onPress={handleAdd}
          disabled={!text.trim()}
          activeOpacity={0.8}
        >
          <Ionicons name="add" size={24} color="#ffffff" />
        </TouchableOpacity>
      </View>

      {/* Options Panel shown when input is active or non-empty */}
      {isExpanded && (
        <View style={styles.optionsContainer}>
          <Text style={styles.sectionLabel}>Category</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.chipRow}
          >
            {CATEGORIES.map((cat) => {
              const isSelected = category === cat;
              return (
                <TouchableOpacity
                  key={cat}
                  style={[styles.chip, isSelected && styles.chipSelected]}
                  onPress={() => setCategory(cat)}
                  activeOpacity={0.7}
                >
                  <Text
                    style={[
                      styles.chipText,
                      isSelected && styles.chipTextSelected,
                    ]}
                  >
                    {cat}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          <Text style={styles.sectionLabel}>Priority</Text>
          <View style={styles.priorityRow}>
            {PRIORITIES.map((p) => {
              const isSelected = priority === p.value;
              return (
                <TouchableOpacity
                  key={p.value}
                  style={[
                    styles.priorityChip,
                    isSelected && {
                      backgroundColor: p.color,
                      borderColor: p.color,
                    },
                  ]}
                  onPress={() => setPriority(p.value)}
                  activeOpacity={0.7}
                >
                  <Text
                    style={[
                      styles.priorityText,
                      isSelected && { color: '#ffffff' },
                    ]}
                  >
                    {p.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    paddingHorizontal: 12,
    paddingVertical: 6,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#111827',
    paddingVertical: 8,
  },
  addButton: {
    backgroundColor: '#3b82f6',
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  addButtonDisabled: {
    backgroundColor: '#93c5fd',
  },
  optionsContainer: {
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    padding: 12,
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6b7280',
    marginBottom: 6,
    marginTop: 4,
    textTransform: 'uppercase',
  },
  chipRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  chip: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: '#e5e7eb',
  },
  chipSelected: {
    backgroundColor: '#3b82f6',
  },
  chipText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4b5563',
  },
  chipTextSelected: {
    color: '#ffffff',
  },
  priorityRow: {
    flexDirection: 'row',
    gap: 8,
  },
  priorityChip: {
    flex: 1,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#d1d5db',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  priorityText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4b5563',
  },
});

