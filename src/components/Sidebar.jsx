import NextPiece from './NextPiece.jsx';

function StatRow({ label, value }) {
  return (
    <div className="mb-4">
      <p className="text-gray-400 text-xs uppercase tracking-widest">{label}</p>
      <p className="text-white text-2xl font-mono font-bold">{value}</p>
    </div>
  );
}

export default function Sidebar({ score, level, lines, nextPiece }) {
  return (
    <div className="flex flex-col gap-6 w-28">
      <StatRow label="Score" value={score} />
      <StatRow label="Level" value={level} />
      <StatRow label="Lines" value={lines} />
      <NextPiece type={nextPiece} />
      <div className="mt-4">
        <p className="text-gray-500 text-xs uppercase tracking-widest mb-1">Controls</p>
        <ul className="text-gray-500 text-xs space-y-0.5">
          <li>← → Move</li>
          <li>↓ Soft drop</li>
          <li>↑ / X Rotate</li>
          <li>Space Hard drop</li>
          <li>P Pause</li>
          <li>R Restart</li>
        </ul>
      </div>
    </div>
  );
}
