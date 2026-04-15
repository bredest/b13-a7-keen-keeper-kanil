import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function FriendCard({ friend }) {
  const statusColors = {
    'on-track': 'bg-emerald-500 text-white',
    'almost due': 'bg-amber-500 text-white',
    'overdue': 'bg-red-500 text-white'
  };

  return (
    <Link href={`/friend/${friend.id}`} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col items-center hover:shadow-md transition">
      <div className="w-20 h-20 rounded-full overflow-hidden mb-3 bg-gray-200">
        {friend.picture.includes('/assets/faces/') ? (
          <div className="w-full h-full flex items-center justify-center text-gray-500 font-semibold text-2xl bg-gray-100">
            {friend.name.charAt(0)}
          </div>
        ) : (
          <img src={friend.picture} alt={friend.name} className="w-full h-full object-cover" />
        )}
      </div>
      <h3 className="font-bold text-gray-900 text-lg leading-tight">{friend.name}</h3>
      <p className="text-gray-400 text-xs mb-3">{friend.days_since_contact}d ago</p>
      
      <div className="flex flex-wrap gap-1 justify-center mb-3">
        {friend.tags.map(tag => (
          <span key={tag} className="px-2 py-[2px] bg-emerald-100 text-emerald-800 rounded-full text-[10px] font-bold uppercase tracking-wider">
            {tag}
          </span>
        ))}
      </div>
      
      <div className={`px-4 py-1 rounded-full text-xs font-bold ${statusColors[friend.status]}`}>
        {friend.status === 'on-track' ? 'On-Track' : friend.status === 'almost due' ? 'Almost Due' : 'Overdue'}
      </div>
    </Link>
  );
}
