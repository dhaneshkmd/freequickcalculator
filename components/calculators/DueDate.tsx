'use client';
import { useMemo, useState } from 'react';

export default function DueDate() {
  const [lmp, setLmp] = useState('2024-01-01');
  const [cycle, setCycle] = useState(28); // days

  const due = useMemo(() => {
    const base = new Date(lmp + 'T00:00:00');
    if (isNaN(base.getTime())) return null;
    const adjust = cycle - 28;        // Naegele's rule with cycle adjustment
    const ms = (280 + adjust) * 86400000;
    return new Date(base.getTime() + ms);
  }, [lmp, cycle]);

  return (
    <div className="max-w-xl mx-auto">
      <div className="rounded-2xl border p-4 md:p-6 bg-white">
        <h1 className="text-2xl md:text-3xl font-semibold mb-2">Pregnancy Due Date</h1>
        <p className="text-gray-600 mb-6">Based on last menstrual period (LMP). Educational estimate only.</p>

        <div className="grid md:grid-cols-2 gap-4">
          <label className="block"><span className="text-sm">LMP date</span>
            <input type="date" value={lmp} onChange={e=>setLmp(e.target.value)} className="w-full rounded-xl border px-3 py-2"/></label>
          <label className="block"><span className="text-sm">Cycle length (days)</span>
            <input type="number" min={20} max={45} value={cycle} onChange={e=>setCycle(Number(e.target.value))} className="w-full rounded-xl border px-3 py-2"/></label>
        </div>

        {due && (
          <div className="rounded-xl bg-gray-50 p-4 mt-6">
            <div className="text-sm text-gray-500">Estimated due date</div>
            <div className="text-xl md:text-2xl font-semibold">{due.toDateString()}</div>
          </div>
        )}
      </div>
    </div>
  );
}
