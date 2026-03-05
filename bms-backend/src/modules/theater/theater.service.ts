import { TheaterModel } from "./theater.model";
import { ITheater } from "./theater.interface";

// 1. Create Theater
export const createTheater = async (data: ITheater): Promise<ITheater> => {
    return await TheaterModel.create(data);
};

// 2. Get All Theaters
export const getAllTheaters = async (): Promise<ITheater[]> => {
    return await TheaterModel.find();
};

// 3. Get Theater By ID
export const getTheaterById = async (id: string): Promise<ITheater | null> => {
    return await TheaterModel.findById(id);
};

// 4. Get Theaters By State
export const getTheaterByState = async (state: string): Promise<ITheater[]> => {
    return await TheaterModel.find({ state: { $regex: state, $options: "i" } });
};
