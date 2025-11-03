import React, { useState } from "react";

interface NameInputProps {
  playerName: string;
  setPlayerName: (name: string) => void;
}

export const NameInput: React.FC<NameInputProps> = ({
  playerName,
  setPlayerName,
}) => {
  const [tempName, setTempName] = useState(playerName);
  const [confirmed, setConfirmed] = useState(!!playerName);

  const handleConfirm = () => {
    if (!tempName.trim()) return; // ignore blank
    setPlayerName(tempName.trim());
    setConfirmed(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleConfirm();
  };

  if (confirmed) {
    return <strong className="ml-2 text-secondary">{playerName}</strong>;
  }

  return (
    <span className="inline-name-input flex flex-wrap items-center gap-1 sm:gap-2 mt-2">
      <input
        type="text"
        placeholder="Your name, Brichan?"
        value={tempName}
        onChange={(e) => setTempName(e.target.value)}
        onKeyDown={handleKeyDown}
        className="min-w-32 bg-transparent border-b border-gray-400 text-white px-2 focus:outline-none"
      />
      <button
        type="button"
        onClick={handleConfirm}
        className="text-sm text-gray-300 hover:text-white transition-colors whitespace-nowrap"
      >
        Confirm
      </button>
    </span>
  );
};
