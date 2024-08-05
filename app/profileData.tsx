import { createContext, useContext, useState } from "react";

const ProfileDataContext = createContext<any>(null);
export const useProfileData = () => useContext(ProfileDataContext);