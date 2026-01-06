'use client';

import { useEffect, useRef } from 'react';

interface ParallaxCanvasProps {
  children?: React.ReactNode;
  intensity?: number;
  className?: string;
}

export default function ParallaxCanvas({ 
  children, 
  intensity = 0.3,
  className = '' 
}: ParallaxCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    const drawGrid = () => {
      if (!canvas || !ctx) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = 'rgba(32, 178, 170, 0.08)';
      ctx.lineWidth = 1;

      const gridSize = 50;
      const maxOffset = 15;

      const xOffset = ((mouseX / window.innerWidth) - 0.5) * maxOffset * intensity;
      const yOffset = ((mouseY / window.innerHeight) - 0.5) * maxOffset * intensity;

      // Draw vertical lines
      for (let x = -gridSize; x < canvas.width + gridSize; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x + xOffset, 0);
        ctx.lineTo(x + xOffset, canvas.height);
        ctx.stroke();
      }

      // Draw horizontal lines
      for (let y = -gridSize; y < canvas.height + gridSize; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y + yOffset);
        ctx.lineTo(canvas.width, y + yOffset);
        ctx.stroke();
      }
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawGrid();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      drawGrid();
    };

    resizeCanvas();
    drawGrid();

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [intensity]);

  return (
    <div 
      className={`fixed inset-0 pointer-events-none z-0 ${className}`}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
      {children && (
        <div className="relative z-10">
          {children}
        </div>
      )}
    </div>
  );
}
