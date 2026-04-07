import { IUser } from "./user.interface";
import { userModel } from "./user.model";

// Create User
export const createUser = async (user: IUser): Promise<IUser> => {
  const newUser = new userModel(user);
  return await newUser.save();
};

// Get All Users
export const getAllUsers = async (): Promise<IUser[]> => {
  return await userModel.find();
};

// Get User by ID
export const getUserById = async (id: string): Promise<IUser | null> => {
  return await userModel.findById(id);
};

// Get User by Email
export const getUserByEmail = async (email: string): Promise<IUser | null> => {
  return await userModel.findOne({ email });
};

// Activate User
export const activateUser = async (
  id: string,
  updateData: Partial<IUser>
): Promise<IUser | null> => {
  const updatedUser = await userModel.findByIdAndUpdate(
    id,
    updateData,
    { new: true }
  );

  if (!updatedUser) {
    throw new Error("User not found");
  }

  return updatedUser;
};