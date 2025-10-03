
type InfoProps = {
  score: number;
  timeLeft: number;
};

export default function Info({ score, timeLeft }: InfoProps) {
  return (
    <div className="flex justify-between mb-4 text-white font-bold text-lg w-80 my-4">
      <p>Score: {score}</p>
      <p>Time: {timeLeft}s</p>
    </div>
  );
}
