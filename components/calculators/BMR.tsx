'use client';
import { useMemo, useState } from 'react';

type Sex = 'male' | 'female';
type Activity = '1.2'|'1.375'|'1.55'|'1.725'|'1.9';

export default function BMR() {
  const [sex, setSex] = useState<Sex>('male');
  const [age, setAge] = useState<number>(30);
  const [heightCm, setHeightCm] = useState<number>(175);
  const [weightKg, setWeightKg] = useState<number>(70);
  const [activity, setActivity] = useState<Activity>('1.55');

  const { bmr, tdee } = useMemo(() => {
    // Mifflin–St Jeor
    const b = sex === 'male'
      ? 10 * weightKg + 6.25 * heightCm - 5 * age + 5
      : 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
    const t = b * Number(activity);
    return { bmr: Math.max(0, b), tdee: Math.max(0, t) };
  }, [sex, age, heightCm, weightKg, activity]);

  return (
    <div className="max-w-3xl mx-auto">
      <div className="rounded-2xl border p-4 md:p-6 bg-white">
        <h1 className="text-2xl md:text-3xl font-semibold mb-2">BMR Calculator</h1>
        <p className="text-gray-600 mb-6">Basal Metabolic Rate & estimated daily calories (TDEE).</p>

        <div className="grid md:grid-cols-2 gap-4">
          <label className="block">
            <span className="block text-sm font-medium mb-1">Sex</span>
            <select value={sex} onChange={(e)=>setSex(e.target.value as Sex)} className="w-full rounded-xl border px-3 py-2">
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </label>
          <label className="block">
            <span className="block text-sm font-medium mb-1">Age (years)</span>
            <input type="number" min={1} max={120} value={age} onChange={e=>setAge(Number(e.target.value))} className="w-full rounded-xl border px-3 py-2"/>
          </label>
          <label className="block">
            <span className="block text-sm font-medium mb-1">Height (cm)</span>
            <input type="number" min={100} max={250} value={heightCm} onChange={e=>setHeightCm(Number(e.target.value))} className="w-full rounded-xl border px-3 py-2"/>
          </label>
          <label className="block">
            <span className="block text-sm font-medium mb-1">Weight (kg)</span>
            <input type="number" min={20} max={300} step="0.1" value={weightKg} onChange={e=>setWeightKg(Number(e.target.value))} className="w-full rounded-xl border px-3 py-2"/>
          </label>
          <label className="block md:col-span-2">
            <span className="block text-sm font-medium mb-1">Activity level (for TDEE)</span>
            <select value={activity} onChange={(e)=>setActivity(e.target.value as Activity)} className="w-full rounded-xl border px-3 py-2">
              <option value="1.2">Sedentary (1.2)</option>
              <option value="1.375">Light (1.375)</option>
              <option value="1.55">Moderate (1.55)</option>
              <option value="1.725">Active (1.725)</option>
              <option value="1.9">Very Active (1.9)</option>
            </select>
          </label>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mt-6">
          <div className="rounded-xl bg-gray-50 p-4">
            <div className="text-sm uppercase text-gray-500 mb-1">BMR</div>
            <div className="text-xl md:text-2xl font-semibold">{Math.round(bmr).toLocaleString()} kcal/day</div>
          </div>
          <div className="rounded-xl bg-gray-50 p-4">
            <div className="text-sm uppercase text-gray-500 mb-1">TDEE</div>
            <div className="text-xl md:text-2xl font-semibold">{Math.round(tdee).toLocaleString()} kcal/day</div>
          </div>
        </div>

        <p className="text-xs text-gray-500 mt-4">
          *BMR via Mifflin–St Jeor; TDEE = BMR × activity factor. Estimates only.
        </p>
      </div>
    </div>
  );
}
