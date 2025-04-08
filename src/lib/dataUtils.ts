// src/lib/dataUtils.ts
import { ratingHistoryData } from './staticData';
import type { ChartData, ChartDataset } from 'chart.js'; // Import Chart.js types

// --- Type Definitions ---

// Type definition for a single rating point array from staticData
type RatingPoint = [number, number, number, number]; // year, month(0-11), day, rating

// Type for the processed overall stats
interface OverallStats {
  highestRating: number;
  lowestRating: number;
  averageRating: number;
  totalGames: number; // Total games tracked across relevant modes
}

// Type for a dummy game entry
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

// Function to extract all ratings from specified game types in staticData
function getAllRatings(gameTypes: string[]): number[] {
  let allRatings: number[] = [];
  ratingHistoryData.forEach(gameMode => {
    // Check if the game mode is in the specified list and has points
    if (gameTypes.includes(gameMode.name) && gameMode.points.length > 0) {
      // Extract the 4th element (rating) from each point array
      const ratings = gameMode.points.map(point => point[3]);
      allRatings = allRatings.concat(ratings);
    }
  });
  return allRatings;
}


// --- Exported Data Processing Functions ---

/**
 * Calculates Overall Stats (High, Low, Average Rating, Total Games)
 * across Bullet & Blitz ratings from the static data.
 */
export function calculateOverallStats(): OverallStats {
  const relevantRatings = getAllRatings(['Bullet', 'Blitz']);

  if (relevantRatings.length === 0) {
    // Handle case with no data to avoid errors (e.g., dividing by zero)
    return { highestRating: 0, lowestRating: 0, averageRating: 0, totalGames: 0 };
  }

  const highestRating = Math.max(...relevantRatings);
  const lowestRating = Math.min(...relevantRatings);
  const sumOfRatings = relevantRatings.reduce((sum, rating) => sum + rating, 0);
  // Calculate average and round to nearest whole number
  const averageRating = Math.round(sumOfRatings / relevantRatings.length);
  // Each rating point represents the rating *after* a game in that mode
  const totalGames = relevantRatings.length;

  return { highestRating, lowestRating, averageRating, totalGames };
}

/**
 * Formats rating history data for a specific game type ('Bullet' or 'Blitz')
 * into the structure required by Chart.js line charts.
 * Includes updated date formatting (M/D/YY).
 * @param gameTypeName The name of the game type ('Bullet' or 'Blitz').
 * @returns ChartData object for react-chartjs-2.
 */
export function formatDataForChart(gameTypeName: 'Bullet' | 'Blitz'): ChartData<'line'> {
  const gameMode = ratingHistoryData.find(mode => mode.name === gameTypeName);

  if (!gameMode || gameMode.points.length === 0) {
    // Return empty structure if no data found for the game type
    return { labels: [], datasets: [] };
  }

  // Sort points chronologically just in case they aren't
  const sortedPoints = [...gameMode.points].sort((a, b) => {
    // Compare year, then month (0-indexed), then day
    if (a[0] !== b[0]) return a[0] - b[0];
    if (a[1] !== b[1]) return a[1] - b[1];
    return a[2] - b[2];
  });

  // Create labels (dates) and data points (ratings)
  const labels = sortedPoints.map(point => {
    // Format date as M/D/YY using US locale
    const date = new Date(point[0], point[1], point[2]); // Create Date object
    return date.toLocaleDateString("en-US", {
        year: '2-digit',
        month: 'numeric',
        day: 'numeric'
    }); // e.g., "4/8/25"
  });

  const data = sortedPoints.map(point => point[3]); // Get the rating value

  // Define the dataset structure for the line chart
  // Colors and specific styling will be applied in the Chart component itself
  const datasets: ChartDataset<'line'>[] = [
    {
      label: `${gameTypeName} Rating`, // Used in tooltips
      data: data,
      fill: false, // Whether to fill area under the line
      tension: 0.2, // Line smoothing (0 = straight lines)
      pointRadius: 0, // Hide points by default
      pointHoverRadius: 5, // Size of data points on hover
      borderWidth: 2, // Thickness of the line
    }
  ];

  return { labels, datasets };
}


// --- Dummy Game Data Generation ---

// Constants for generating random dummy data
const sampleOpenings = [
    "King's Pawn Opening", "Sicilian Defense", "Queen's Gambit", "Ruy Lopez",
    "Italian Game", "Caro-Kann Defense", "Pirc Defense", "French Defense",
    "Scandinavian Defense", "English Opening", "Nimzo-Indian Defense", "King's Indian Defense"
];
const results: DummyGame['result'][] = ['Win', 'Loss', 'Draw'];
const modes: DummyGame['mode'][] = ['Bullet', 'Blitz', 'Rapid'];
const colors: DummyGame['myColor'][] = ['White', 'Black'];

/**
 * Generates an array of placeholder DummyGame objects.
 * @param count The number of dummy games to generate.
 * @returns An array of DummyGame objects.
 */
export function generateDummyGames(count: number): DummyGame[] {
  const games: DummyGame[] = [];
  const now = new Date(); // Use current time as reference

  for (let i = 0; i < count; i++) {
    // Create a date sometime in the past relative to the loop index
    const gameDate = new Date(now.getTime() - i * Math.random() * 1000 * 60 * 60 * 24); // Random time within the last 'i' days (roughly)

    games.push({
      id: `game_${i + 1}_${Math.random().toString(16).slice(2)}`, // Simple unique-ish ID
      result: results[Math.floor(Math.random() * results.length)],
      opponentName: `Opponent_${Math.floor(Math.random() * 500) + 1}`, // Random opponent ID
      opponentRating: 1500 + Math.floor(Math.random() * 600), // Random rating between 1500-2100
      mode: modes[Math.floor(Math.random() * modes.length)],
      myColor: colors[Math.floor(Math.random() * colors.length)],
      opening: sampleOpenings[Math.floor(Math.random() * sampleOpenings.length)],
      date: gameDate,
    });
  }
  // Sort games by date descending (most recent first) for typical display
  return games.sort((a, b) => b.date.getTime() - a.date.getTime());
}
