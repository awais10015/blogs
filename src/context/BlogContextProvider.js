"use client";
import { createContext, useContext, useState } from "react";
import blogContext from "./blogContext";
const BlogContextProvider = ({children}) => {
    const fixedBlogs = [
    {
      id: 0,
      Title: "Blog One",
      Subtitle: "This is Blog One",
      Description:
        "The ultimate platform designed to turn your vision into reality...",
      Image: "/blog1.avif",
    },
    {
      id: 1,
      Title: "Blog Two",
      Subtitle: "This is Blog Two",
      Description:
        "The ultimate platform designed to turn your vision into reality...",
      Image: "/blog2.avif",
    },
    {
      id: 2,
      Title: "Blog Three",
      Subtitle: "This is Blog Three",
      Description:
        "The ultimate platform designed to turn your vision into reality...",
      Image: "/blog3.avif",
    },
    {
      id: 3,
      Title: "Blog Four",
      Subtitle: "This is Blog Four",
      Description:
        "The ultimate platform designed to turn your vision into reality...",
      Image: "/blog4.avif",
    },
  ];

  const [blogs, setBlogs] = useState([...fixedBlogs]);

  return(
    <blogContext.Provider value={{blogs , setBlogs}}>
        {children}
    </blogContext.Provider>
  )
}
export  {BlogContextProvider};

