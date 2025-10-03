type FooterProps = {
  gameStarted: boolean;
  gameOver: boolean;
};

export default function Rules({ gameStarted, gameOver }: FooterProps) {
  return (
    <div
      className={`mb-8 text-center text-white text-sm  ${
        !gameStarted && !gameOver ? "visible" : "invisible"
      }`}
    >
      <p>Use arrow keys or buttons to move the blue tile</p>
      <p>Stack blue tile on yellow tile to score points!</p>
      <p className="mt-1 font-bold">Game starts when you move!</p>
    </div>
  );
}
