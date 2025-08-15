'use client';
import { useMemo, useState } from 'react';

function daysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

export default function DateDiff() {
  const today = new Date().toISOString().slice(0,10);
  const [start, setStart] = useState('2020-01-01');
  const [end, setEnd] = useState(today);
  const [inclusive, setInclusive] = useState(false);

  const res = useMemo(() => {
    const a = new Date(`${start}T00:00:00`);
    const b = new Date(`${end}T00:00:00`);
    if (isNaN(a.getTime()) || isNaN(b.getTime())) return null;

    let from = a, to = b, sign = 1;
    if (a > b) { from = b; to = a; sign = -1; }

    let y = to.getFullYear() - from.getFullYear();
    let m = to.getMonth() - from.getMonth();
    let d = to.getDate() - from.getDate();

    if (d < 0) {
      const pmYear = to.getMonth() === 0 ? to.getFullYear() - 1 : to.getFullYear();
      const pm = to.getMonth() === 0 ? 11 : to.getMonth() - 1;
      d += daysInMonth(pmYear, pm);
      m--;
    }
    if (m < 0) { y--; m += 12; }

    const msPerDay = 86_400_000;
    const deltaDays = Math.floor((to.getTime() - from.getTime()) / msPerDay) + (inclusive ? 1 : 0);
    const weeks = Math.floor(deltaDays / 7);
    const remDays = deltaDays % 7;

    return { sign, y, m, d, deltaDays, weeks, remDays };
  }, [start, end, inclusive]);

  return (
    <div className="max-w-3xl mx-auto">
      <div className="rounded-2xl border p-4 md:p-6 bg-white">
        <h1 className="text-2xl md:text-3xl font-semibold mb-2">Date Difference</h1>
        <p className="text-gray-600 mb-6">Days between two dates with exact Y/M/D breakdown.</p>

        <div className="grid md:grid-cols-3 gap-4 items-end">
          <label className="block">
            <span className="block text-sm font-medium mb-1">Start date</span>
            <input type="date" value={start} onChange={e=>setStart(e.target.value)}
              className="w-full rounded-xl border px-3 py-2"/>
          </label>
          <label className="block">
            <span className="block text-sm font-medium mb-1">End date</span>
            <input type="date" value={end} onChange={e=>setEnd(e.target.value)}
              className="w-full rounded-xl border px-3 py-2"/>
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={inclusive} onChange={e=>setInclusive(e.target.checked)} />
            <span className="text-sm">Inclusive (count end day)</span>
          </label>
        </div>

        {res && (
          <div className="grid md:grid-cols-3 gap-4 mt-6">
            <div className="rounded-xl bg-gray-50 p-4">
              <div className="text-sm uppercase text-gray-500 mb-1">Total Days</div>
              <div className="text-xl md:text-2xl font-semibold">{res.deltaDays.toLocaleString()}</div>
            </div>
            <div className="rounded-xl bg-gray-50 p-4">
              <div className="text-sm uppercase text-gray-500 mb-1">Weeks + Days</div>
              <div className="text-xl md:text-2xl font-semibold">{res.weeks} w {res.remDays} d</div>
            </div>
            <div className="rounded-xl bg-gray-50 p-4">
              <div className="text-sm uppercase text-gray-500 mb-1">Exact Y / M / D</div>
              <div className="text-xl md:text-2xl font-semibold">{res.y} y, {res.m} m, {res.d} d</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
