'use client';
import { useMemo, useState } from 'react';

const ZONES = [
  'UTC','America/New_York','America/Los_Angeles','Europe/London','Europe/Paris',
  'Europe/Berlin','Asia/Kolkata','Asia/Tokyo','Asia/Singapore','Australia/Sydney'
];

function tzOffsetMinutes(timeZone: string, date: Date) {
  const dtf = new Intl.DateTimeFormat('en-US', {
    timeZone, year:'numeric', month:'2-digit', day:'2-digit', hour:'2-digit', minute:'2-digit', hour12:false
  });
  const parts = dtf.formatToParts(date);
  const get = (t:string)=>Number(parts.find(p=>p.type===t)?.value);
  const y = get('year');
  const m = get('month') - 1;
  const d = get('day');
  const hh = get('hour');
  const mm = get('minute');
  // time in that TZ interpreted as UTC:
  const asUTC = Date.UTC(y, m, d, hh, mm);
  return (asUTC - date.getTime()) / 60000;
}

export default function TimeZone() {
  const now = new Date();
  const [from, setFrom] = useState('UTC');
  const [to, setTo] = useState('Asia/Kolkata');
  const [local, setLocal] = useState(now.toISOString().slice(0,16)); // yyyy-mm-ddThh:mm

  const out = useMemo(() => {
    const [Y,M,D,h,m] = local.split(/\D/).map(Number);
    const wallUTC = new Date(Date.UTC(Y, M-1, D, h, m));
    const fromOffset = tzOffsetMinutes(from, wallUTC);
    const instant = new Date(wallUTC.getTime() - fromOffset*60000);
    const fmt = new Intl.DateTimeFormat(undefined, { timeZone: to, dateStyle:'full', timeStyle:'short' });
    return fmt.format(instant);
  }, [local, from, to]);

  return (
    <div className="max-w-3xl mx-auto">
      <div className="rounded-2xl border p-4 md:p-6 bg-white">
        <h1 className="text-2xl md:text-3xl font-semibold mb-2">Time Zone Converter</h1>
        <p className="text-gray-600 mb-6">Convert a date & time between zones.</p>

        <div className="grid md:grid-cols-3 gap-4 items-end">
          <label className="block"><span className="text-sm">From time zone</span>
            <select value={from} onChange={e=>setFrom(e.target.value)} className="w-full rounded-xl border px-3 py-2">{ZONES.map(z=><option key={z} value={z}>{z}</option>)}</select>
          </label>
          <label className="block"><span className="text-sm">Local time in “From” zone</span>
            <input type="datetime-local" value={local} onChange={e=>setLocal(e.target.value)} className="w-full rounded-xl border px-3 py-2"/></label>
          <label className="block"><span className="text-sm">To time zone</span>
            <select value={to} onChange={e=>setTo(e.target.value)} className="w-full rounded-xl border px-3 py-2">{ZONES.map(z=><option key={z} value={z}>{z}</option>)}</select>
          </label>
        </div>

        <div className="rounded-xl bg-gray-50 p-4 mt-6">
          <div className="text-sm text-gray-500">Converted time</div>
          <div className="text-xl md:text-2xl font-semibold">{out}</div>
        </div>
      </div>
    </div>
  );
}
