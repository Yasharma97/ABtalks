import React from 'react';

const NODES = [
  { id: 1, x: 15, y: 190, day: 1, isMilestone: true, label: "Day 01" },
  { id: 2, x: 22, y: 180, day: 2 },
  { id: 3, x: 30, y: 172, day: 5, twinkle: true },
  { id: 4, x: 40, y: 165, day: 8 },
  { id: 5, x: 50, y: 158, day: 12 },
  { id: 6, x: 58, y: 150, day: 15, isMilestone: true, label: "Day 15" },
  { id: 7, x: 65, y: 140, day: 18, twinkle: true },
  { id: 8, x: 72, y: 130, day: 22 },
  { id: 9, x: 78, y: 120, day: 26 },
  { id: 10, x: 80, y: 110, day: 30, isMilestone: true, label: "Day 30" },
  { id: 11, x: 78, y: 98, day: 33, twinkle: true },
  { id: 12, x: 70, y: 88, day: 36 },
  { id: 13, x: 58, y: 80, day: 40 },
  { id: 14, x: 46, y: 72, day: 45, isMilestone: true, label: "Day 45" },
  { id: 15, x: 34, y: 65, day: 48, twinkle: true },
  { id: 16, x: 24, y: 58, day: 52 },
  { id: 17, x: 18, y: 50, day: 55 },
  { id: 18, x: 15, y: 40, day: 58 },
  { id: 19, x: 20, y: 30, day: 60, isMilestone: true, label: "Day 60" },
  
  // Organic branch decoration stars (Desktop only, hidden on mobile for low density)
  { id: 20, x: 35, y: 188, day: 3, isDecor: true },
  { id: 21, x: 68, y: 158, day: 14, isDecor: true },
  { id: 22, x: 88, y: 125, day: 28, isDecor: true },
  { id: 23, x: 55, y: 92, day: 38, isDecor: true },
  { id: 24, x: 18, y: 68, day: 47, isDecor: true },
  { id: 25, x: 30, y: 42, day: 56, isDecor: true }
];

const CONNECTIONS = [
  // Main path links
  [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 9], [9, 10],
  [10, 11], [11, 12], [12, 13], [13, 14], [14, 15], [15, 16], [16, 17], [17, 18], [18, 19],
  
  // Decorative offshoot connections
  [2, 20], [6, 21], [9, 22], [12, 23], [14, 24], [17, 25]
];

export default function ConstellationBackground({ currentDay = 0, opacityMultiplier = 1.0 }) {
  const getNodeById = (id) => NODES.find(n => n.id === id);

  return (
    <div className="constellation-wrapper" style={{ opacity: opacityMultiplier }}>
      {/* 🌌 ATMOSPHERIC AURORA SLOW MORPHING LAYERS */}
      <div className="aurora-layer aurora-one" />
      <div className="aurora-layer aurora-two" />
      <div className="aurora-layer aurora-three" />

      {/* Cinematic radial cosmic back-gradients */}
      <div className="constellation-radial-glow" />

      <svg 
        className="constellation-svg" 
        viewBox="0 0 100 200" 
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Draw Constellation lines */}
        {CONNECTIONS.map(([fromId, toId], idx) => {
          const fromNode = getNodeById(fromId);
          const toNode = getNodeById(toId);
          
          if (!fromNode || !toNode) return null;

          // Determine line activation state
          const isFromActive = fromNode.day <= currentDay;
          const isToActive = toNode.day <= currentDay;
          const isActive = isFromActive && isToActive;
          
          const isBranchConnection = fromNode.isDecor || toNode.isDecor;

          return (
            <line
              key={`line-${idx}`}
              x1={fromNode.x}
              y1={fromNode.y}
              x2={toNode.x}
              y2={toNode.y}
              className={`constellation-line ${isActive ? 'active' : 'dim'} ${isBranchConnection ? 'decor-desktop' : ''}`}
            />
          );
        })}

        {/* Draw Constellation point stars */}
        {NODES.map((node) => {
          const isMilestone = node.isMilestone;
          const isCompleted = node.day < currentDay;
          const isActiveCurrent = node.day === currentDay && currentDay > 0 && !node.isDecor;
          
          let nodeClass = "dim";
          let radius = 0.6; // default dim star radius

          if (isActiveCurrent) {
            nodeClass = "active-current";
            radius = 1.5;
          } else if (isMilestone && node.day <= currentDay) {
            nodeClass = "active-milestone";
            radius = 1.2;
          } else if (isCompleted) {
            nodeClass = "completed-step";
            radius = 0.9;
          } else {
            nodeClass = node.twinkle ? "dim twinkle" : "dim";
            radius = isMilestone ? 1.0 : 0.6;
          }

          return (
            <g key={`node-${node.id}`} className={node.isDecor ? 'decor-desktop' : ''}>
              <circle
                cx={node.x}
                cy={node.y}
                r={radius}
                className={`constellation-node ${nodeClass}`}
              />
              
              {/* Subtle Milestone Text labels (unobtrusive and only visible for milestones) */}
              {isMilestone && (
                <text
                  x={node.x + 2}
                  y={node.y + 1}
                  fill={node.day <= currentDay ? "var(--color-cyan)" : "rgba(255,255,255,0.15)"}
                  fontSize="2"
                  fontFamily="var(--font-display)"
                  fontWeight="bold"
                  pointerEvents="none"
                  style={{ opacity: 0.6 }}
                >
                  {node.label}
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
