import React, { ReactNode, createContext, useContext, useState } from "react";

interface ClassTypeContextType {
  classCategoryType: number;
  updateCategory: (value: number) => void;
}
const inistialState: ClassTypeContextType = {
  classCategoryType: 0,
  updateCategory: () => {},
};

const ClassCategoryContext = createContext<ClassTypeContextType>(inistialState);

type ClassTypeProviderType = {
  children: ReactNode;
};

export const ClassTypeProvider = ({ children }: ClassTypeProviderType) => {
  const [classCategory, setClassCategory] = useState<number>(
    inistialState.classCategoryType
  );

  const updateCategory = (value: number) => {
    setClassCategory(value);
  };

  return (
    <ClassCategoryContext.Provider
      value={{ classCategoryType: classCategory, updateCategory }}
    >
      {children}
    </ClassCategoryContext.Provider>
  );
};

export const useClassCategory = () => {
  return useContext(ClassCategoryContext);
};
