import React, { useState, useMemo } from 'react';

export default function App() {
  // Hours (01 - 12)
  const hoursList = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0'));
  // Minutes (00 - 59)
  const minutesList = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0'));

  // Day 1 State
  const [d1InH, setD1InH] = useState('09');
  const [d1InM, setD1InM] = useState('00');
  const [d1InP, setD1InP] = useState('AM');
  const [d1OutH, setD1OutH] = useState('05');
  const [d1OutM, setD1OutM] = useState('00');
  const [d1OutP, setD1OutP] = useState('PM');

  // Day 2 State
  const [d2InH, setD2InH] = useState('09');
  const [d2InM, setD2InM] = useState('00');
  const [d2InP, setD2InP] = useState('AM');
  const [d2OutH, setD2OutH] = useState('05');
  const [d2OutM, setD2OutM] = useState('00');
  const [d2OutP, setD2OutP] = useState('PM');

  // Day 3 State
  const [d3InH, setD3InH] = useState('09');
  const [d3InM, setD3InM] = useState('00');
  const [d3InP, setD3InP] = useState('AM');

  const parseToMinutes = (hStr, mStr, period) => {
    let h = parseInt(hStr, 10);
    const m = parseInt(mStr, 10);
    if (isNaN(h) || isNaN(m)) return null;

    if (period === 'PM' && h < 12) h += 12;
    if (period === 'AM' && h === 12) h = 0;

    return h * 60 + m;
  };

  const formatHHMM = (totalMins) => {
    if (totalMins === null || isNaN(totalMins)) return '--:--';
    const absMins = Math.abs(totalMins);
    const h = Math.floor(absMins / 60);
    const m = absMins % 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
  };

  const format12Hour = (totalMins) => {
    if (totalMins === null || isNaN(totalMins)) return '--:-- --';
    let mins = (totalMins % 1440 + 1440) % 1440;
    let h = Math.floor(mins / 60);
    const m = mins % 60;
    const period = h >= 12 ? 'PM' : 'AM';
    h = h % 12;
    if (h === 0) h = 12;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')} ${period}`;
  };

  const calcShiftMins = (hIn, mIn, pIn, hOut, mOut, pOut) => {
    const start = parseToMinutes(hIn, mIn, pIn);
    const end = parseToMinutes(hOut, mOut, pOut);
    if (start === null || end === null) return 0;
    let diff = end - start;
    if (diff < 0) diff += 1440; // Handles overnight shifts
    return diff;
  };

  const d1Duration = useMemo(() => calcShiftMins(d1InH, d1InM, d1InP, d1OutH, d1OutM, d1OutP), [d1InH, d1InM, d1InP, d1OutH, d1OutM, d1OutP]);
  const d2Duration = useMemo(() => calcShiftMins(d2InH, d2InM, d2InP, d2OutH, d2OutM, d2OutP), [d2InH, d2InM, d2InP, d2OutH, d2OutM, d2OutP]);

  const targetMins = 1260; // 21 Hours
  const loggedBeforeD3 = d1Duration + d2Duration;
  const reqD3Mins = Math.max(0, targetMins - loggedBeforeD3);

  const predictedD3ExitMins = useMemo(() => {
    const start = parseToMinutes(d3InH, d3InM, d3InP);
    if (start === null) return null;
    return start + reqD3Mins;
  }, [d3InH, d3InM, d3InP, reqD3Mins]);

  // Reusable Time Selector Component
  const TimePicker = ({ hour, setHour, min, setMin, period, setPeriod }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
      <select value={hour} onChange={(e) => setHour(e.target.value)} style={selectStyle}>
        {hoursList.map((h) => <option key={h} value={h}>{h}</option>)}
      </select>
      <span style={{ fontWeight: 'bold' }}>:</span>
      <select value={min} onChange={(e) => setMin(e.target.value)} style={selectStyle}>
        {minutesList.map((m) => <option key={m} value={m}>{m}</option>)}
      </select>
      <button 
        type="button" 
        onClick={() => setPeriod(p => p === 'AM' ? 'PM' : 'AM')} 
        style={periodBtnStyle}
      >
        {period}
      </button>
    </div>
  );

  return (
    <div style={{ maxWidth: '420px', margin: '0 auto', padding: '16px', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '16px', color: '#0f172a' }}>21H Work Tracker</h2>
      
      {/* Day 1 */}
      <div style={cardStyle}>
        <div style={cardHeaderStyle}>
          <span>Day 1</span>
          <span style={{ color: '#4f46e5' }}>{formatHHMM(d1Duration)}</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div>
            <label style={labelStyle}>Entry Time</label>
            <TimePicker hour={d1InH} setHour={setD1InH} min={d1InM} setMin={setD1InM} period={d1InP} setPeriod={setD1InP} />
          </div>
          <div>
            <label style={labelStyle}>Exit Time</label>
            <TimePicker hour={d1OutH} setHour={setD1OutH} min={d1OutM} setMin={setD1OutM} period={d1OutP} setPeriod={setD1OutP} />
          </div>
        </div>
      </div>

      {/* Day 2 */}
      <div style={cardStyle}>
        <div style={cardHeaderStyle}>
          <span>Day 2</span>
          <span style={{ color: '#4f46e5' }}>{formatHHMM(d2Duration)}</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div>
            <label style={labelStyle}>Entry Time</label>
            <TimePicker hour={d2InH} setHour={setD2InH} min={d2InM} setMin={setD2InM} period={d2InP} setPeriod={setD2InP} />
          </div>
          <div>
            <label style={labelStyle}>Exit Time</label>
            <TimePicker hour={d2OutH} setHour={setD2OutH} min={d2OutM} setMin={setD2OutM} period={d2OutP} setPeriod={setD2OutP} />
          </div>
        </div>
      </div>

      {/* Day 3 Predictor */}
      <div style={{ ...cardStyle, background: '#e0e7ff', borderColor: '#c7d2fe' }}>
        <div style={cardHeaderStyle}>
          <span>Day 3 Exit Predictor</span>
          <span style={{ color: '#4338ca' }}>Req: {formatHHMM(reqD3Mins)}</span>
        </div>
        <div>
          <label style={{ ...labelStyle, color: '#4338ca' }}>Day 3 Entry Time</label>
          <TimePicker hour={d3InH} setHour={setD3InH} min={d3InM} setMin={setD3InM} period={d3InP} setPeriod={setD3InP} />
        </div>
        <div style={{ marginTop: '12px', background: '#4f46e5', color: 'white', padding: '10px', borderRadius: '8px', textAlign: 'center' }}>
          <span style={{ fontSize: '0.8rem', display: 'block', opacity: 0.9 }}>Required Leave Time:</span>
          <strong style={{ fontSize: '1.25rem' }}>{format12Hour(predictedD3ExitMins)}</strong>
        </div>
      </div>
    </div>
  );
}

// Inline Styles
const cardStyle = { background: '#ffffff', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' };
const cardHeaderStyle = { display: 'flex', justifyBetween: 'space-between', justifyContent: 'space-between', fontWeight: 'bold', marginBottom: '12px', fontSize: '0.9rem' };
const labelStyle = { fontSize: '0.75rem', color: '#64748b', display: 'block', marginBottom: '4px' };
const selectStyle = { padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1', background: '#f8fafc', fontSize: '0.9rem', fontWeight: '600' };
const periodBtnStyle = { padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', background: '#0f172a', color: 'white', fontWeight: 'bold', fontSize: '0.8rem', cursor: 'pointer', marginLeft: '4px' };