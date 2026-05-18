import { Types } from "mongoose";
import {
  generateSeatLayout,
  groupShowsByTheatreAndMovie
} from "../utils";
import { IShow } from "./show.interface";
import { ShowModel } from "./show.model";

// 1. Create a Show
export const createShow = async (showData: IShow) => {
  const seatLayout = generateSeatLayout();
  const showToCreate = { ...showData, seatLayout };

  return await ShowModel.create(showToCreate);
};

// 2. Get shows by movie, date & location
export const getShowsByMovieDateLocation = async (
  movieID: string,
  location: string,
  date: string
) => {
  const query: any = {
    movie: new Types.ObjectId(movieID),
  };

  // ✅ FIX 1: flexible location match
  if (location) {
    query.location = { $regex: new RegExp(location, "i") };
  }

  // ✅ FIX 2: flexible date match (format issue solved)
  if (date) {
  query.date = { $regex: new RegExp(date.split("-").reverse().join("-")) };
}

  const shows = await ShowModel.find(query)
    .populate("movie theater")
    .sort({ startTime: 1 });

  return groupShowsByTheatreAndMovie(shows);
};

// 3. Get show by ID
export const getShowById = async (showId: string) => {
  return await ShowModel.findById(showId).populate("movie theater");
};

// 4. Update seat status
export const updateSeatStatus = async (
  showId: string,
  row: string,
  seatNumber: number,
  status: "AVAILABLE" | "BOOKED" | "BLOCKED"
) => {
  return await ShowModel.updateOne(
    {
      _id: new Types.ObjectId(showId),
      "seatLayout.row": row,
    },
    {
      $set: {
        "seatLayout.$.seats.$[elem].status": status,
      },
    },
    {
      arrayFilters: [{ "elem.number": seatNumber }],
    }
  );
};