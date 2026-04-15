"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import friendsData from '../data/friends.json';

const AppDataContext = createContext(undefined);

export function AppDataProvider({ children }) {
  const [friends, setFriends] = useState([]);
  const [timeline, setTimeline] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Initialize from JSON or LocalStorage
  useEffect(() => {
    const version = localStorage.getItem('app_version');
    const CURRENT_VERSION = 'v1.1';
    
    if (version !== CURRENT_VERSION) {
      localStorage.clear();
      setFriends(friendsData);
      localStorage.setItem('friends', JSON.stringify(friendsData));
      localStorage.setItem('app_version', CURRENT_VERSION);
    } else {
      const savedFriends = localStorage.getItem('friends');
      if (savedFriends) {
        setFriends(JSON.parse(savedFriends));
      } else {
        setFriends(friendsData);
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

  const addInteraction = (friendId, type) => {
    const friend = friends.find(f => f.id === friendId);
    if (!friend) return;

    const newEntry = {
      id: Math.random().toString(36).substring(2, 9),
      friendId,
      friendName: friend.name,
      date: new Date().toISOString(),
      type,
    };

    setTimeline([newEntry, ...timeline]);

    const updatedFriends = friends.map(f => {
      if (f.id === friendId) {
        return {
          ...f,
          days_since_contact: 0,
          status: 'on-track'
        };
      }
      return f;
    });

    setFriends(updatedFriends);
  };

  const updateFriendGoal = (friendId, newGoal) => {
    setFriends(friends.map(f => f.id === friendId ? { ...f, goal: newGoal } : f));
  };

  const deleteFriend = (friendId) => {
    setFriends(friends.filter(f => f.id !== friendId));
  };

  return (
    <AppDataContext.Provider value={{ friends, timeline, addInteraction, updateFriendGoal, deleteFriend }}>
      {children}
    </AppDataContext.Provider>
  );
}

export function useAppData() {
  const context = useContext(AppDataContext);
  if (context === undefined) {
    throw new Error('useAppData must be used within an AppDataProvider');
  }
  return context;
}
