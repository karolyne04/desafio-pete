"use client"; 

import { useState, useEffect, useRef } from 'react';

export default function Home() {
  const [technicalScore, setTechnicalScore] = useState(5);
  const [executionScore, setExecutionScore] = useState(5);
  const [resultMessage, setResultMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [inputPositions, setInputPositions] = useState<{ [key: string]: { top: string, left: string } }>({
    technical: { top: '40%', left: '35%' },
    execution: { top: '60%', left: '35%' }
  });
  const [buttonPosition, setButtonPosition] = useState({ top: '50%', left: '50%' });

  const buttonRef = useRef<HTMLButtonElement>(null);

  
  useEffect(() => {
    const interval = setInterval(() => {
      setButtonPosition({
        top: `${Math.random() * 80 + 10}%`,
        left: `${Math.random() * 80 + 10}%`
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  
  const moveInput = (inputKey: string) => {
    setInputPositions((prevPositions) => ({
      ...prevPositions,
      [inputKey]: {
        top: `${Math.random() * 80 + 10}%`,
        left: `${Math.random() * 80 + 10}%`
      }
    }));
  };

  const handleSubmit = () => {
    if (!technicalScore || !executionScore) {
      setResultMessage("Por favor, insira valores válidos para ambas as pontuações.");
      return;
    }

    setLoading(true);
    setResultMessage('');

    setTimeout(() => {
      const totalScore = technicalScore + executionScore;

      if (totalScore < 10) {
        setResultMessage(`Pontuação baixa: ${totalScore}. Tente melhorar.`);
      } else if (totalScore < 15) {
        setResultMessage(`Pontuação moderada: ${totalScore}. Bom trabalho!`);
      } else {
        setResultMessage(`Excelente pontuação: ${totalScore}!`);
      }

      setLoading(false);
    }, Math.random() * 3000 + 1000);
  };

  return (
    <div className="relative h-screen flex flex-col items-center justify-between p-8 bg-red-500">
      <div className="relative w-full h-full flex flex-col items-center justify-center">
        {/* Slider Técnico */}
        <div
          className="absolute"
          style={{ top: inputPositions.technical.top, left: inputPositions.technical.left }}
          onMouseEnter={() => moveInput('technical')} // Mover input quando o mouse se aproxima
        >
          <label className="block mb-2 text-sm font-medium text-white">
            Pontuação Técnica: {technicalScore}
          </label>
          <input
            type="range"
            min="0"
            max="10"
            step="1"
            value={technicalScore}
            onChange={(e) => setTechnicalScore(Number(e.target.value))}
            className="w-64"
          />
        </div>

        {/* Slider Execução */}
        <div
          className="absolute"
          style={{ top: inputPositions.execution.top, left: inputPositions.execution.left }}
          onMouseEnter={() => moveInput('execution')} // Mover input quando o mouse se aproxima
        >
          <label className="block mb-2 text-sm font-medium text-white">
            Pontuação de Execução: {executionScore}
          </label>
          <input
            type="range"
            min="0"
            max="10"
            step="1"
            value={executionScore}
            onChange={(e) => setExecutionScore(Number(e.target.value))}
            className="w-64"
          />
        </div>
      </div>

      
      <button
        ref={buttonRef}
        onClick={loading ? undefined : handleSubmit}
        className={`w-48 py-2 px-4 rounded absolute transform -translate-y-1/2 ${
          loading ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-700'
        } text-white`}
        style={{ top: buttonPosition.top, left: buttonPosition.left }}
        disabled={loading}
      >
        {loading ? 'Processando...' : 'Enviar Pontuação'}
      </button>

      {/* Mensagem de Resultado */}
      {resultMessage && (
        <p className="absolute bottom-0 left-0 right-0 p-4 bg-yellow-300 text-black text-center">
          {resultMessage}
        </p>
      )}
    </div>
  );
}
