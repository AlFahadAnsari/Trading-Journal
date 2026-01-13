"use client";

import { useEffect, useState } from "react";
import {
    PieChart as RechartsPieChart,
    Pie,
    Label,
    ResponsiveContainer,
} from "recharts";

const journalData: {
    monthly: { [key: string]: { profit: number; loss: number } };
    daily: { [key: string]: { profit: number; loss: number } };
} = {
    monthly: {
        "2024-01": { profit: 12000, loss: 4000 },
        "2024-02": { profit: 9000, loss: 6500 },
        "2024-03": { profit: 15000, loss: 3000 },
        "2024-04": { profit: 7000, loss: 9000 },
    },
    daily: {
        "2024-01-02": { profit: 2000, loss: 500 },
        "2024-01-03": { profit: 0, loss: 1200 },
        "2024-02-10": { profit: 3000, loss: 0 },
    },
};

export default function PieChart() {
    const [mounted, setMounted] = useState(false);
    const [viewMode, setViewMode] = useState<"monthly" | "daily">("monthly");
    const [selectedMonth, setSelectedMonth] = useState("2024-01");
    const [selectedDay, setSelectedDay] = useState("2024-01-02");

    useEffect(() => setMounted(true), []);
    if (!mounted) return null;

    const dataForChart =
        viewMode === "monthly"
            ? journalData.monthly[selectedMonth] ?? { profit: 0, loss: 0 }
            : journalData.daily[selectedDay] ?? { profit: 0, loss: 0 };

    const pieData = [
        { name: "Profit", value: dataForChart.profit, fill: "#22c55e" },
        { name: "Loss", value: dataForChart.loss, fill: "#ef4444" },
    ];

    const net = dataForChart.profit - dataForChart.loss;

    return (
        <div className="w-full max-w-md mx-auto">
            <h1 className="text-lg font-semibold mb-4 text-center">
                {viewMode === "monthly"
                    ? "Monthly Profit vs Loss"
                    : "Daily Profit vs Loss"}
            </h1>

            <div className="flex gap-4 justify-center mb-4">
                <button
                    className={`px-3 py-1 rounded ${
                        viewMode === "monthly"
                            ? "bg-black text-white"
                            : "bg-gray-300"
                    }`}
                    onClick={() => setViewMode("monthly")}
                >
                    Monthly
                </button>
                <button
                    className={`px-3 py-1 rounded ${
                        viewMode === "daily"
                            ? "bg-black text-white"
                            : "bg-gray-300"
                    }`}
                    onClick={() => setViewMode("daily")}
                >
                    Daily
                </button>
            </div>

            {viewMode === "monthly" ? (
                <div className="mb-4 flex justify-center">
                    <input
                        type="month"
                        value={selectedMonth}
                        onChange={(e) => setSelectedMonth(e.target.value)}
                        className="border rounded px-3 py-2"
                    />
                </div>
            ) : (
                <div className="mb-4 flex justify-center">
                    <input
                        type="date"
                        value={selectedDay}
                        onChange={(e) => setSelectedDay(e.target.value)}
                        className="border rounded px-3 py-2"
                    />
                </div>
            )}

            <div className="w-full h-[320px] flex justify-center items-center">
                <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                        <Pie
                            data={pieData}
                            dataKey="value"
                            innerRadius={80}
                            outerRadius={120}
                            strokeWidth={4}
                        >
                            <Label
                                content={({ viewBox }) => {
                                    if (!viewBox || !("cx" in viewBox)) return null;
                                    return (
                                        <text
                                            x={viewBox.cx}
                                            y={viewBox.cy}
                                            textAnchor="middle"
                                            dominantBaseline="middle"
                                        >
                                            <tspan className="text-xl font-bold">
                                                ₹{net.toLocaleString()}
                                            </tspan>
                                            <tspan
                                                x={viewBox.cx}
                                                dy={22}
                                                className="text-sm fill-gray-500"
                                            >
                                                Net
                                            </tspan>
                                        </text>
                                    );
                                }}
                            />
                        </Pie>
                    </RechartsPieChart>
                </ResponsiveContainer>
            </div>

            <div className="mt-4 text-center text-lg space-y-1">
                <p className="text-green-600 font-medium">
                    Profit : ₹{dataForChart.profit.toLocaleString()}
                </p>
                <p className="text-red-600 font-medium">
                    Loss : ₹{dataForChart.loss.toLocaleString()}
                </p>
            </div>
        </div>
    );
}
