'use client';
import { useMemo, useState } from 'react';

function isLeap(y: number) {
  if (y % 400 === 0) return true;
  if (y % 100 === 0) return false;
  return y % 4 === 0;
}

export default function LeapYear() {
  const [year, setYear] = useState(new Date().getFullYear());
  const leap = useMemo(()=>isLeap(year), [year]);

  return (
    <div className="max-w-3xl mx-auto">
      <div className="rounded-2xl border p-4 md:p-6 bg-white">
        <h1 className="text-2xl md:text-3xl font-semibold mb-2">Leap Year Checker</h1>
        <p className="text-gray-600 mb-6">Divisible by 4, except centuries not divisible by 400.</p>

        <label className="block max-w-xs">
          <span className="block text-sm font-medium mb-1">Year</span>
          <input type="number" value={year} onChange={e=>setYear(Number(e.target.value))}
            className="w-full rounded-xl border px-3 py-2"/>
        </label>

        <div className={`mt-6 rounded-xl p-4 ${leap ? 'bg-green-50 border border-green-200 text-green-800' : 'bg-yellow-50 border border-yellow-200 text-yellow-800'}`}>
          {year} {leap ? 'is' : 'is NOT'} a leap year.
        </div>
      </div>
    </div>
  );
}
