// src/lib/dataUtils.ts
import { ratingHistoryData } from './staticData';
import type { ChartData, ChartDataset } from 'chart.js';

// --- Type Definitions ---

// REMOVED - Unused type definition
// type RatingPoint = [number, number, number, number];

interface OverallStats {
  highestRating: number;
  lowestRating: number;
  averageRating: number;
  totalGames: number;
}

export interface DummyGame {
  id: string;
  result: 'Win' | 'Loss' | 'Draw';
  opponentName: string;
  opponentRating: number;
  mode: 'Bullet' | 'Blitz' | 'Rapid';
  myColor: 'White' | 'Black';
  opening: string;
  date: Date;
}

// --- Helper Functions ---
function getAllRatings(gameTypes: string[]): number[] {
  // ... (function remains the same)
    let allRatings: number[] = [];
    ratingHistoryData.forEach(gameMode => {
        if (gameTypes.includes(gameMode.name) && gameMode.points.length > 0) {
            const ratings = gameMode.points.map(point => point[3]);
            allRatings = allRatings.concat(ratings);
        }
    });
    return allRatings;
}

// --- Exported Data Processing Functions ---
export function calculateOverallStats(): OverallStats {
  // ... (function remains the same)
    const relevantRatings = getAllRatings(['Bullet', 'Blitz']);
    if (relevantRatings.length === 0) {
        return { highestRating: 0, lowestRating: 0, averageRating: 0, totalGames: 0 };
    }
    const highestRating = Math.max(...relevantRatings);
    const lowestRating = Math.min(...relevantRatings);
    const sumOfRatings = relevantRatings.reduce((sum, rating) => sum + rating, 0);
    const averageRating = Math.round(sumOfRatings / relevantRatings.length);
    const totalGames = relevantRatings.length;
    return { highestRating, lowestRating, averageRating, totalGames };
}

export function formatDataForChart(gameTypeName: 'Bullet' | 'Blitz'): ChartData<'line'> {
  // ... (function remains the same)
    const gameMode = ratingHistoryData.find(mode => mode.name === gameTypeName);
    if (!gameMode || gameMode.points.length === 0) {
        return { labels: [], datasets: [] };
    }
    const sortedPoints = [...gameMode.points].sort((a, b) => {
        if (a[0] !== b[0]) return a[0] - b[0];
        if (a[1] !== b[1]) return a[1] - b[1];
        return a[2] - b[2];
    });
    const labels = sortedPoints.map(point => {
        const date = new Date(point[0], point[1], point[2]);
        return date.toLocaleDateString("en-US", { year: '2-digit', month: 'numeric', day: 'numeric' });
    });
    const data = sortedPoints.map(point => point[3]);
    const datasets: ChartDataset<'line'>[] = [ { label: `${gameTypeName} Rating`, data: data, fill: false, tension: 0.2, pointRadius: 0, pointHoverRadius: 5, borderWidth: 2, } ];
    return { labels, datasets };
}

// --- Dummy Game Data Generation ---
const sampleOpenings = [ /* ... */ "King's Pawn Opening", "Sicilian Defense", "Queen's Gambit", "Ruy Lopez", "Italian Game", "Caro-Kann Defense", "Pirc Defense", "French Defense", "Scandinavian Defense", "English Opening", "Nimzo-Indian Defense", "King's Indian Defense" ];
const results: DummyGame['result'][] = ['Win', 'Loss', 'Draw'];
const modes: DummyGame['mode'][] = ['Bullet', 'Blitz', 'Rapid'];
const colors: DummyGame['myColor'][] = ['White', 'Black'];

export function generateDummyGames(count: number): DummyGame[] {
  // ... (function remains the same)
    const games: DummyGame[] = [];
    const now = new Date();
    for (let i = 0; i < count; i++) {
        const gameDate = new Date(now.getTime() - i * Math.random() * 1000 * 60 * 60 * 24);
        games.push({
            id: `game_${i + 1}_${Math.random().toString(16).slice(2)}`,
            result: results[Math.floor(Math.random() * results.length)],
            opponentName: `Opponent_${Math.floor(Math.random() * 500) + 1}`,
            opponentRating: 1500 + Math.floor(Math.random() * 600),
            mode: modes[Math.floor(Math.random() * modes.length)],
            myColor: colors[Math.floor(Math.random() * colors.length)],
            opening: sampleOpenings[Math.floor(Math.random() * sampleOpenings.length)],
            date: gameDate,
        });
    }
    return games.sort((a, b) => b.date.getTime() - a.date.getTime());
}
