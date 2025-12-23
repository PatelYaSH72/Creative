import React, { createContext, useEffect, useState } from 'react';
import {teamDetail} from "../assets/assets.js";
import {servicesDetail} from "../assets/assets.js";

// 1. Context Create Karein
export const MyContext = createContext();

// 2. Provider Component Banayein
export const MyProvider = ({ children }) => {
  const [team, setTeam] = useState(null);
  const [services, setServices] = useState(null);

   useEffect(()=>{
      setTeam(teamDetail),
      setServices(servicesDetail)
   },[team])

  console.log(team);
  
  const value = {
    team,
    services
  };

  return (
    <MyContext.Provider value={value}>
      {children}
    </MyContext.Provider>
  );
};