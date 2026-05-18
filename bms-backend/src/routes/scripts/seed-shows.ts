import mongoose from "mongoose";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

import { MovieModel } from "../../modules/movie/movie.model";
import { TheaterModel } from "../../modules/theater/theater.model";
import { ShowModel } from "../../show/show.model";
import { config } from "../../config/config";
import { generateSeatLayout } from "../../utils/index";

// 💰 Price Map
const generatePriceMap = () =>
  new Map([
    ["PREMIUM", 510],
    ["EXECUTIVE", 290],
    ["NORMAL", 270],
  ]);

// 🎬 Formats
const formats = ["2D", "3D", "IMAX", "PVR PXL"];

// ⏰ Fixed time slots
const fixedTimeSlots = [
  { start: "09:00 AM", end: "11:30 AM" },
  { start: "12:30 PM", end: "03:00 PM" },
  { start: "04:00 PM", end: "06:30 PM" },
  { start: "07:30 PM", end: "10:00 PM" },
  { start: "10:30 PM", end: "01:00 AM" },
];

export const seedShow = async () => {
  const movies = await MovieModel.find({});
  const theatres = await TheaterModel.find({});

  if (!movies.length || !theatres.length) {
    console.error("❌ Movies or theatres not found in DB.");
    return;
  }

  const today = dayjs().startOf("day");

  for (const movie of movies) {
    for (const theatre of theatres) {

      // 🔥 8 days (today + next 7 days)
      for (let d = 0; d < 30; d++) {

        const showDate = today.add(d, "day");
        const formattedDate = showDate.format("DD-MM-YYYY");

        // 🎯 All slots (no missing)
        for (const slot of fixedTimeSlots) {

          const newShow = new ShowModel({
            movie: movie._id,
            theater: theatre._id,
            location: theatre.state,
            format: formats[Math.floor(Math.random() * formats.length)],
            audioType: "Dolby 7.1",
            startTime: slot.start,
            date: formattedDate, // ⚠️ IMPORTANT (DD-MM-YYYY)
            priceMap: generatePriceMap(),
            seatLayout: generateSeatLayout(),
          });

          await newShow.save();

          console.log(
            `🎬 ${movie.title} | ${theatre.name} | ${formattedDate} | ${slot.start}`
          );
        }
      }
    }
  }

  console.log("✅ Show seeding completed successfully.");
};

// 🚀 RUN SCRIPT
mongoose
  .connect(config.databaseUrl as string)
  .then(async () => {
    console.log("✅ DB connected");

    // 🧹 Purana data delete
    await ShowModel.deleteMany({});
    console.log("🗑 Old shows deleted");

    await seedShow();

    await mongoose.disconnect();
    console.log("🔌 DB disconnected");
  })
  .catch((err) => console.log("❌ DB Error:", err));