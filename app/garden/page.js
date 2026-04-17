'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';

function GardenContent() {
  const searchParams = useSearchParams();
  const [count, setCount] = useState(0);

  const totalBlocks = 12;
  const rows = 3;
  const cols = 4;

  useEffect(() => {
    const urlCount = parseInt(searchParams.get('count') || '0');

    if (urlCount > 0) {
      setCount(urlCount);
    } else {
      const userData = localStorage.getItem('userData');

      if (userData) {
        const { email } = JSON.parse(userData);

        fetch(`https://sharebite-backend-ylpd.onrender.com/api/donations/count/${email}`)
          .then((res) => res.json())
          .then((data) => setCount(data.count || 0))
          .catch((err) => console.error('Failed to fetch count', err));
      }
    }
  }, [searchParams]);

  const getImageSrc = (index) => {
    const row = Math.floor(index / cols);
    const col = index % cols;

    return index < count
      ? `/tree-puzzle/color/block_${row}_${col}.jpg`
      : `/tree-puzzle/gray/block_${row}_${col}.jpg`;
  };

  return (
    <div className="min-h-screen bg-green-100 flex flex-col items-center justify-center py-10">
      <h1 className="text-3xl font-bold text-green-700 mb-8">
        🌳 Your Donation Garden
      </h1>

      <div
        className="grid gap-1 border-4 border-green-600 rounded"
        style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
      >
        {Array.from({ length: totalBlocks }).map((_, i) => (
          <Image
            key={i}
            src={getImageSrc(i)}
            alt={`Block ${i}`}
            width={150}
            height={150}
            className="transition-opacity duration-700 rounded"
          />
        ))}
      </div>

      <p className="mt-6 text-lg text-green-800">
        You’ve donated <strong>{count}</strong> time(s). Keep going to reveal the full tree!
      </p>
    </div>
  );
}

export default function GardenPage() {
  return (
    <Suspense fallback={<div className="p-10 text-xl">Loading Garden...</div>}>
      <GardenContent />
    </Suspense>
  );
}