import React from "react";

const widthOfLabel = (label: string) => {
  const length = label.replace(".", "").length;
  const hasDecimal = label.includes(".");
  return 8 * length + (hasDecimal ? 5 : 0);
};

const rangeLabelStyle = { fontSize: 12, opacity: "50%" };

const CamRect = ({
  onClick,
  color,
  stroke,
  x,
  y,
  width,
  height,
  label,
  blurred,
  onHover,
  onMouseLeave,
  showRange,
  rangeMin,
  rangeMax,
  yAxisLabel,
  showYAxisLabel
}: {
  onClick: () => unknown;
  color: string;
  stroke: string;
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
  blurred: boolean;
  onHover: () => unknown;
  onMouseLeave: () => unknown;
  showRange?: boolean;
  rangeMin: number;
  rangeMax: number;
  yAxisLabel: string;
  showYAxisLabel: boolean;
}) => {
  const textY = y + height / 2 + 4;
  const labelOffset = 5 + (showRange ? widthOfLabel(rangeMax + "mm") : 0);

  return (
    <g
      style={{ cursor: "pointer" }}
      onMouseEnter={onHover}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      <rect
        fill={color}
        stroke={stroke}
        x={x}
        width={width}
        y={y}
        height={height}
        opacity={blurred ? 0.3 : 1}
      />
      <text x={x + width + labelOffset} y={textY} style={{ fontSize: 13 }}>
        {label}
      </text>
      {showRange ? (
        <>
          <text
            x={x - widthOfLabel(rangeMin + "mm")}
            y={textY}
            style={rangeLabelStyle}
          >
            {rangeMin}mm
          </text>
          <text x={x + width + 5} y={textY} style={rangeLabelStyle}>
            {rangeMax}mm
          </text>
        </>
      ) : (
        showYAxisLabel && (
          <text
            x={x - widthOfLabel(yAxisLabel + "kN")}
            y={textY}
            style={rangeLabelStyle}
          >
            {yAxisLabel}
          </text>
        )
      )}
    </g>
  );
};

export default CamRect;
