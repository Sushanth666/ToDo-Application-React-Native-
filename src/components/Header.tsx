import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface HeaderProps {
  totalTasks: number;
  completedTasks: number;
  onClearCompleted: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  totalTasks,
  completedTasks,
  onClearCompleted,
}) => {
  const percentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  
  const today = new Date().toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  });

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <View>
          <Text style={styles.dateText}>{today}</Text>
          <Text style={styles.title}>My Tasks</Text>
        </View>

        {completedTasks > 0 && (
          <TouchableOpacity
            style={styles.clearButton}
            onPress={onClearCompleted}
            activeOpacity={0.7}
          >
            <Ionicons name="trash-outline" size={16} color="#ef4444" />
            <Text style={styles.clearButtonText}>Clear Done</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.progressCard}>
        <View style={styles.progressRow}>
          <Text style={styles.progressLabel}>
            {completedTasks} of {totalTasks} completed
          </Text>
          <Text style={styles.progressPercent}>{percentage}%</Text>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressBarTrack}>
          <View style={[styles.progressBarFill, { width: `${percentage}%` }]} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  dateText: {
    fontSize: 13,
    color: '#6b7280',
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
    marginTop: 2,
  },
  clearButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: '#fee2e2',
  },
  clearButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#ef4444',
  },
  progressCard: {
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    padding: 12,
  },
  progressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#374151',
  },
  progressPercent: {
    fontSize: 13,
    fontWeight: '700',
    color: '#3b82f6',
  },
  progressBarTrack: {
    height: 8,
    backgroundColor: '#e5e7eb',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#3b82f6',
    borderRadius: 4,
  },
});

