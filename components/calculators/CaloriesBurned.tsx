'use client';
import { useMemo, useState } from 'react';

type Activity = { name: string; MET: number };
const ACTIVITIES: Activity[] = [
  { name: 'Walking (3 mph / 4.8 km/h)', MET: 3.3 },
  { name: 'Jogging (6 mph / 9.7 km/h)', MET: 9.8 },
  { name: 'Running (8 mph / 12.9 km/h)', MET: 11.8 },
  { name: 'Cycling (moderate)', MET: 7.5 },
  { name: 'Swimming (moderate)', MET: 6 },
  { name: 'Yoga', MET: 3 },
  { name: 'Strength training', MET: 6 },
  { name: 'House cleaning', MET: 3.5 },
  { name: 'Basketball game', MET: 8 },
  { name: 'Sleeping', MET: 0.95 },
];

export default function CaloriesBurned() {
  const [weightKg, setWeightKg] = useState(70);
  const [minutes, setMinutes] = useState(30);
  const [selected, setSelected] = useState<Activity>(ACTIVITIES[0]);
  const [customMET, setCustomMET] = useState<number | ''>('');

  const MET = customMET === '' ? selected.MET : Number(customMET);

  const kcal = useMemo(() => {
    const hours = minutes / 60;
    return Math.max(0, MET * weightKg * hours);
  }, [MET, weightKg, minutes]);

  return (
    <div className="max-w-3xl mx-auto">
      <div className="rounded-2xl border p-4 md:p-6 bg-white">
        <h1 className="text-2xl md:text-3xl font-semibold mb-2">Calories Burned</h1>
        <p className="text-gray-600 mb-6">kcal = MET × weight (kg) × hours</p>

        <div className="grid md:grid-cols-2 gap-4">
          <label className="block">
            <span className="block text-sm font-medium mb-1">Activity</span>
            <select
              value={selected.name}
              onChange={e => setSelected(ACTIVITIES.find(a=>a.name===e.target.value) || ACTIVITIES[0])}
              className="w-full rounded-xl border px-3 py-2"
            >
              {ACTIVITIES.map(a => <option key={a.name} value={a.name}>{a.name} ({a.MET} MET)</option>)}
            </select>
          </label>
          <label className="block">
            <span className="block text-sm font-medium mb-1">Custom MET (optional)</span>
            <input type="number" min={0} step="0.1" value={customMET}
              onChange={e=>setCustomMET(e.target.value===''?'':Number(e.target.value))}
              className="w-full rounded-xl border px-3 py-2"/>
          </label>
          <label className="block">
            <span className="block text-sm font-medium mb-1">Weight (kg)</span>
            <input type="number" min={20} max={300} step="0.1" value={weightKg}
              onChange={e=>setWeightKg(Number(e.target.value))}
              className="w-full rounded-xl border px-3 py-2"/>
          </label>
          <label className="block">
            <span className="block text-sm font-medium mb-1">Duration (minutes)</span>
            <input type="number" min={1} max={600} value={minutes}
              onChange={e=>setMinutes(Number(e.target.value))}
              className="w-full rounded-xl border px-3 py-2"/>
          </label>
        </div>

        <div className="rounded-xl bg-gray-50 p-4 mt-6">
          <div className="text-sm uppercase text-gray-500 mb-1">Estimated Calories</div>
          <div className="text-xl md:text-2xl font-semibold">{kcal.toFixed(0)} kcal</div>
        </div>

        <p className="text-xs text-gray-500 mt-4">
          *MET values are approximate; intensity and technique affect results.
        </p>
      </div>
    </div>
  );
}
