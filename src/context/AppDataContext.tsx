"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import friendsData from '../data/friends.json';

export type InteractionType = 'Call' | 'Text' | 'Video';
export type FriendStatus = 'overdue' | 'almost due' | 'on-track';

export interface Friend {
  id: number;
  name: string;
  picture: string;
  email: string;
  days_since_contact: number;
  status: FriendStatus;
  tags: string[];
  bio: string;
  goal: number;
  next_due_date: string;
}

export interface TimelineEntry {
  id: string;
  friendId: number;
  friendName: string;
  date: string;
  type: InteractionType;
}

interface AppContextType {
  friends: Friend[];
  timeline: TimelineEntry[];
  addInteraction: (friendId: number, type: InteractionType) => void;
  updateFriendGoal: (friendId: number, newGoal: number) => void;
  deleteFriend: (friendId: number) => void;
}

const AppDataContext = createContext<AppContextType | undefined>(undefined);

export const AppDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [friends, setFriends] = useState<Friend[]>([]);
  const [timeline, setTimeline] = useState<TimelineEntry[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Initialize from JSON or LocalStorage
  useEffect(() => {
    const version = localStorage.getItem('app_version');
    const CURRENT_VERSION = 'v1.1'; // Bumping version to force data reload with new images
    
    if (version !== CURRENT_VERSION) {
      localStorage.clear();
      setFriends(friendsData as Friend[]);
      localStorage.setItem('friends', JSON.stringify(friendsData));
      localStorage.setItem('app_version', CURRENT_VERSION);
    } else {
      const savedFriends = localStorage.getItem('friends');
      if (savedFriends) {
        setFriends(JSON.parse(savedFriends));
      } else {
        setFriends(friendsData as Friend[]);
      }

      const savedTimeline = localStorage.getItem('timeline');
      if (savedTimeline) {
        setTimeline(JSON.parse(savedTimeline));
      }
    }
    setIsLoaded(true);
  }, []);

  // Sync to local storage on change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('friends', JSON.stringify(friends));
      localStorage.setItem('timeline', JSON.stringify(timeline));
    }
  }, [friends, timeline, isLoaded]);

  const addInteraction = (friendId: number, type: InteractionType) => {
    const friend = friends.find(f => f.id === friendId);
    if (!friend) return;

    // Create a new timeline entry
    const newEntry: TimelineEntry = {
      id: Math.random().toString(36).substring(2, 9),
      friendId,
      friendName: friend.name,
      date: new Date().toISOString(),
      type,
    };

    setTimeline([newEntry, ...timeline]);

    // Update friend status
    const updatedFriends = friends.map(f => {
      if (f.id === friendId) {
        return {
          ...f,
          days_since_contact: 0,
          status: 'on-track' as FriendStatus
        };
      }
      return f;
    });

    setFriends(updatedFriends);
  };

  const updateFriendGoal = (friendId: number, newGoal: number) => {
    setFriends(friends.map(f => f.id === friendId ? { ...f, goal: newGoal } : f));
  };

  const deleteFriend = (friendId: number) => {
    setFriends(friends.filter(f => f.id !== friendId));
    // Optional: remove timeline interactions for deleted friend
    // setTimeline(timeline.filter(t => t.friendId !== friendId));
  };

  return (
    <AppDataContext.Provider value={{ friends, timeline, addInteraction, updateFriendGoal, deleteFriend }}>
      {children}
    </AppDataContext.Provider>
  );
};

export const useAppData = () => {
  const context = useContext(AppDataContext);
  if (context === undefined) {
    throw new Error('useAppData must be used within an AppDataProvider');
  }
  return context;
};
