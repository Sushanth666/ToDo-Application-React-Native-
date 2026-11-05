import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TodoItem, Priority } from '../types/todo';

interface TaskItemProps {
  item: TodoItem;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const PRIORITY_COLORS: Record<Priority, { bg: string; text: string }> = {
  high: { bg: '#fee2e2', text: '#b91c1c' },
  medium: { bg: '#fef3c7', text: '#b45309' },
  low: { bg: '#dcfce7', text: '#15803d' },
};

export const TaskItem: React.FC<TaskItemProps> = ({ item, onToggle, onDelete }) => {
  const priorityStyle = PRIORITY_COLORS[item.priority] || PRIORITY_COLORS.medium;

  return (
    <View style={[styles.card, item.completed && styles.cardCompleted]}>
      {/* Checkbox */}
      <TouchableOpacity
        style={styles.checkboxTouch}
        onPress={() => onToggle(item.id)}
        activeOpacity={0.7}
      >
        <View
          style={[
            styles.checkbox,
            item.completed && styles.checkboxCompleted,
          ]}
        >
          {item.completed && (
            <Ionicons name="checkmark" size={14} color="#ffffff" />
          )}
        </View>
      </TouchableOpacity>

      {/* Content */}
      <View style={styles.content}>
        <Text
          style={[
            styles.title,
            item.completed && styles.titleCompleted,
          ]}
          numberOfLines={2}
        >
          {item.title}
        </Text>

        <View style={styles.metadataRow}>
          {/* Category Tag */}
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{item.category}</Text>
          </View>

          {/* Priority Badge */}
          <View
            style={[
              styles.priorityBadge,
              { backgroundColor: priorityStyle.bg },
            ]}
          >
            <Text
              style={[
                styles.priorityText,
                { color: priorityStyle.text },
              ]}
            >
              {item.priority.toUpperCase()}
            </Text>
          </View>
        </View>
      </View>

      {/* Delete Action */}
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => onDelete(item.id)}
        activeOpacity={0.6}
      >
        <Ionicons name="trash-outline" size={18} color="#9ca3af" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    marginVertical: 4,
    padding: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  cardCompleted: {
    backgroundColor: '#f9fafb',
    borderColor: '#f3f4f6',
    opacity: 0.8,
  },
  checkboxTouch: {
    padding: 4,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#9ca3af',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxCompleted: {
    backgroundColor: '#10b981',
    borderColor: '#10b981',
  },
  content: {
    flex: 1,
    marginHorizontal: 12,
  },
  title: {
    fontSize: 15,
    fontWeight: '500',
    color: '#1f2937',
    marginBottom: 6,
  },
  titleCompleted: {
    textDecorationLine: 'line-through',
    color: '#9ca3af',
  },
  metadataRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  categoryBadge: {
    backgroundColor: '#eff6ff',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  categoryText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#2563eb',
  },
  priorityBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  priorityText: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  deleteButton: {
    padding: 8,
  },
});

