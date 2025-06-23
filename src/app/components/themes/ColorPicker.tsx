import React, { useState, useRef, useEffect } from 'react';
import { Input } from '../../components/ui/shadcn';

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
}

export default function ColorPicker({ color, onChange }: ColorPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);
  
  // Popüler renkler
  const popularColors = [
    // Blues
    "#2563eb", "#3b82f6", "#60a5fa", "#93c5fd",
    // Greens
    "#16a34a", "#22c55e", "#4ade80", "#86efac",
    // Purples
    "#7c3aed", "#8b5cf6", "#a78bfa", "#c4b5fd",
    // Reds
    "#dc2626", "#ef4444", "#f87171", "#fca5a5",
    // Yellows
    "#ca8a04", "#eab308", "#facc15", "#fde047",
    // Cyans
    "#0891b2", "#06b6d4", "#22d3ee", "#67e8f9",
    // Grays
    "#0f172a", "#1e293b", "#334155", "#475569",
    // Backgrounds
    "#f8fafc", "#f1f5f9", "#e2e8f0", "#cbd5e1"
  ];
  
  // Dışarı tıklandığında kapat
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  return (
    <div className="relative" ref={pickerRef}>
      <div className="flex items-center space-x-2">
        <Input
          type="text"
          value={color}
          onChange={(e) => onChange(e.target.value)}
          className="w-32"
          placeholder="#000000"
        />
        <button 
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="h-8 w-8 rounded border shadow-sm"
          style={{ backgroundColor: color }}
          aria-label="Pick a color"
        />
      </div>
      
      {isOpen && (
        <div className="absolute z-10 mt-1 p-3 bg-white rounded-md shadow-lg border">
          <div className="grid grid-cols-8 gap-1">
            {popularColors.map((popularColor, index) => (
              <button
                key={index}
                type="button"
                onClick={() => {
                  onChange(popularColor);
                  setIsOpen(false);
                }}
                className="h-6 w-6 rounded-full border shadow-sm hover:scale-110 transition-transform"
                style={{ backgroundColor: popularColor }}
                aria-label={popularColor}
              />
            ))}
          </div>
          
          <div className="mt-3">
            <Input
              type="color"
              value={color}
              onChange={(e) => onChange(e.target.value)}
              className="w-full h-8"
            />
          </div>
        </div>
      )}
    </div>
  );
}