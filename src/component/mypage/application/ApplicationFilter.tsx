import React from "react";

type IfilterProp = {
  setFilter: (filter: string) => void;
};
export const ApplicationFilter = ({ setFilter }: IfilterProp) => {
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    console.log(selectedValue);
    setFilter(selectedValue);
  };
  return (
    <div>
      <select
        name="filter"
        id="myappfilter"
        className="border-2 border-solid px-1 py-1
        rounded-md focus:border-blue-300  outline-blue-400"
        onChange={handleFilterChange}
      >
        <option value="all">전체</option>
        <option value="cart">장바구니</option>
        <option value="likeClass">관심강의</option>
        <option value="paymented">구매내역</option>
        <option value="mento" disabled>
          멘토링 신청내역
        </option>
      </select>
    </div>
  );
};
