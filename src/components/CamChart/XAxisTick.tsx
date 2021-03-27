import React from "react";

const height = 15;

const XAxisTick = ({ x, label }: { x: number, label: string }) => (
    <>
        <text x={x} y={-5} style={{ fontSize: 10 }}>{label}</text>
        <line x1={x} x2={x} y1={0} y2={height} stroke="black" />
    </>
);

export default XAxisTick;
