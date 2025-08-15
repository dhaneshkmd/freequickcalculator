'use client';
import { useMemo, useState } from 'react';

function daysInMonth(year: number, monthIndex: number) {
  return new Date(year, monthIndex + 1, 0).getDate();
}

export default function Age() {
  const todayISO = new Date().toISOString().slice(0, 10);
  const [dob, setDob] = useState<string>('1990-01-01');

  const result = useMemo(() => {
    if (!dob) return null;
    const birth = new Date(`${dob}T00:00:00`);
    const now = new Date();
    if (isNaN(birth.getTime()) || birth > now) return null;

    // years / months / days
    let y = now.getFullYear() - birth.getFullYear();
    let m = now.getMonth() - birth.getMonth();
    let d = now.getDate() - birth.getDate();

    if (d < 0) {
      const pmYear = now.getMonth() === 0 ? now.getFullYear() - 1 : now.getFullYear();
      const pm = now.getMonth() === 0 ? 11 : now.getMonth() - 1;
      d += daysInMonth(pmYear, pm);
      m--;
    }
    if (m < 0) { y--; m += 12; }

    const ms = now.getTime() - birth.getTime();
    const totalDays = Math.floor(ms / 86_400_000);
    const totalHours = Math.floor(ms / 3_600_000);
    const totalMinutes = Math.floor(ms / 60_000);
    const totalSeconds = Math.floor(ms / 1000);
    const totalMonths = y * 12 + m;

    // next birthday (Feb 29 → Feb 28 on non-leap years)
    let nextYear = now.getFullYear();
    const hadBday =
      now.getMonth() > birth.getMonth() ||
      (now.getMonth() === birth.getMonth() && now.getDate() >= birth.getDate());
    if (hadBday) nextYear++;
    const nbDay = Math.min(birth.getDate(), daysInMonth(nextYear, birth.getMonth()));
    const nextBirthday = new Date(nextYear, birth.getMonth(), nbDay);

    const midnightNow = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const daysToNextBirthday = Math.ceil((nextBirthday.getTime() - midnightNow.getTime()) / 86_400_000);
    const weekday = nextBirthday.toLocaleDateString(undefined, { weekday: 'long' });

    return { y, m, d, totalMonths, totalDays, totalHours, totalMinutes, totalSeconds, nextBirthday, daysToNextBirthday, weekday };
  }, [dob]);

  return (
    <div className="max-w-3xl mx-auto">
      <div className="rounded-2xl border p-4 md:p-6 bg-white">
        <h1 className="text-2xl md:text-3xl font-semibold mb-2">Age Calculator</h1>
        <p className="text-gray-600 mb-6">Find your exact age from your birthdate.</p>

        <div className="grid gap-4 md:grid-cols-[240px_auto] items-end">
          <label className="block">
            <span className="block text-sm font-medium mb-1">Date of Birth</span>
            <input
              type="date"
              value={dob}
              max={todayISO}
              onChange={(e) => setDob(e.target.value)}
              className="w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-describedby="dob-hint"
            />
            <span id="dob-hint" className="mt-1 block text-xs text-gray-500">
              Calculated with your device’s local time zone.
            </span>
          </label>

          <div className="flex gap-2">
            <button onClick={() => setDob('1990-01-01')} className="rounded-xl border px-3 py-2 hover:bg-gray-50">Reset demo</button>
            <button onClick={() => setDob(new Date().toISOString().slice(0,10))} className="rounded-xl border px-3 py-2 hover:bg-gray-50">Use today</button>
          </div>
        </div>

        {result && (
          <div className="mt-6 grid gap-4">
            <div className="rounded-xl bg-gray-50 p-4">
              <div className="text-sm uppercase text-gray-500 mb-1">Exact Age</div>
              <div className="text-xl md:text-2xl font-semibold">
                {result.y} years, {result.m} months, {result.d} days
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="rounded-xl border p-4">
                <div className="text-sm text-gray-500 mb-1">Next Birthday</div>
                <div className="font-semibold">
                  {result.nextBirthday.toLocaleDateString()} ({result.weekday})
                </div>
                <div className="text-gray-600">{result.daysToNextBirthday} days to go</div>
              </div>
              <div className="rounded-xl border p-4">
                <div className="text-sm text-gray-500 mb-1">Age in Months</div>
                <div className="font-semibold">{result.totalMonths.toLocaleString()}</div>
              </div>
              <div className="rounded-xl border p-4">
                <div className="text-sm text-gray-500 mb-1">Age in Days</div>
                <div className="font-semibold">{result.totalDays.toLocaleString()}</div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="rounded-xl border p-4"><div className="text-sm text-gray-500 mb-1">Hours</div><div className="font-semibold">{result.totalHours.toLocaleString()}</div></div>
              <div className="rounded-xl border p-4"><div className="text-sm text-gray-500 mb-1">Minutes</div><div className="font-semibold">{result.totalMinutes.toLocaleString()}</div></div>
              <div className="rounded-xl border p-4"><div className="text-sm text-gray-500 mb-1">Seconds</div><div className="font-semibold">{result.totalSeconds.toLocaleString()}</div></div>
            </div>

            <p className="text-xs text-gray-500">*Feb 29 birthdays: in non-leap years we use Feb 28 for “next birthday”.</p>
          </div>
        )}
      </div>
    </div>
  );
}
