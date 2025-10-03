type ModalResultProps = {
  score: number;
  onResetGame: () => void;
};

export default function ModalResult({ score, onResetGame }: ModalResultProps) {
  const getMessage = (currentScore: number): string => {
    if (currentScore === 0) return "Keep trying!";
    if (currentScore < 5) return "Good start!";
    if (currentScore < 10) return "Great job!";
    return "Amazing!";
  };

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-30">
      <div className="bg-white rounded-2xl p-8 max-w-sm w-full mx-4 shadow-2xl transform animate-scale-in">
        <div className="text-center">
          <div className="mb-8">
            <p className="text-gray-600 text-lg mb-2">Your Points</p>
            <div className="text-6xl font-bold text-red-900 mb-2">{score}</div>
            <p className="text-gray-500">{getMessage(score)}</p>
          </div>

          <button
            onClick={onResetGame}
            className="w-full bg-red-900 hover:bg-red-800 text-white font-bold py-4 px-8 rounded-xl transition-all transform hover:scale-105 shadow-lg cursor-pointer"
          >
            Retry
          </button>
        </div>
      </div>
    </div>
  );
}
