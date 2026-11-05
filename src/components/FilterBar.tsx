import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FilterType } from '../types/todo';

interface FilterBarProps {
  currentFilter: FilterType;
  onChangeFilter: (filter: FilterType) => void;
  searchQuery: string;
  onChangeSearch: (query: string) => void;
  counts: {
    all: number;
    active: number;
    completed: number;
  };
}

export const FilterBar: React.FC<FilterBarProps> = ({
  currentFilter,
  onChangeFilter,
  searchQuery,
  onChangeSearch,
  counts,
}) => {
  const filters: { key: FilterType; label: string; count: number }[] = [
    { key: 'all', label: 'All', count: counts.all },
    { key: 'active', label: 'Active', count: counts.active },
    { key: 'completed', label: 'Done', count: counts.completed },
  ];

  return (
    <View style={styles.container}>
      {/* Search Input */}
      <View style={styles.searchBox}>
        <Ionicons name="search-outline" size={18} color="#9ca3af" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search tasks..."
          placeholderTextColor="#9ca3af"
          value={searchQuery}
          onChangeText={onChangeSearch}
          clearButtonMode="while-editing"
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => onChangeSearch('')}>
            <Ionicons name="close-circle" size={18} color="#9ca3af" />
          </TouchableOpacity>
        )}
      </View>

      {/* Filter Tabs */}
      <View style={styles.tabContainer}>
        {filters.map((filter) => {
          const isActive = currentFilter === filter.key;
          return (
            <TouchableOpacity
              key={filter.key}
              style={[styles.tab, isActive && styles.tabActive]}
              onPress={() => onChangeFilter(filter.key)}
              activeOpacity={0.7}
            >
              <Text style={[styles.tabText, isActive && styles.tabTextActive]}>
                {filter.label}
              </Text>
              <View
                style={[
                  styles.countBadge,
                  isActive && styles.countBadgeActive,
                ]}
              >
                <Text
                  style={[
                    styles.countText,
                    isActive && styles.countTextActive,
                  ]}
                >
                  {filter.count}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 10,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#111827',
    padding: 0,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#f3f4f6',
    borderRadius: 10,
    padding: 4,
    gap: 4,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 8,
    gap: 6,
  },
  tabActive: {
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  tabText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6b7280',
  },
  tabTextActive: {
    color: '#111827',
  },
  countBadge: {
    backgroundColor: '#e5e7eb',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 1,
  },
  countBadgeActive: {
    backgroundColor: '#dbeafe',
  },
  countText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#6b7280',
  },
  countTextActive: {
    color: '#2563eb',
  },
});

