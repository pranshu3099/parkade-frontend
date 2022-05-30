import React from "react";
import useFetch from "./useFetch";
import { AiFillCar } from "react-icons/ai";
import { RiCheckboxBlankFill } from "react-icons/ri";
import { Flex } from "@chakra-ui/react";

const Stats = () => {
  const { data, error } = useFetch("Cars");

  return (
    <div className="fcontainer">
      {error && <p>{error}</p>}
      <div>
        {data.length && (
          <div className="fitem">
            <Flex direction="column" padding="4" justifyContent={"space-between"} >
              <p style={{fontSize: "18px"}}> Total Space in Parking</p>
              {/* <p style={{fontSize: "48px"}}> {data[0].TotalCars}</p> */}
              <p style={{fontSize: "48px"}}> {68}</p>

            </Flex>
            <div style={{width: "70%", display: "flex", justifyContent: "center", alignItems: "center"}}>
            <AiFillCar size={"96px"} color="tomato"/>
            </div>
          </div>
        )}
      </div>
      <div>
        {data.length && (
          <div className="fitem">
            <Flex direction={"column"} padding="4" justifyContent={"space-between"} >
              <p style={{fontSize: "18px"}}>Empty Space</p>
              <p style={{fontSize: "48px"}}>{data[0].Freespace}</p>
            </Flex>
            <div style={{width: "70%", display: "flex", justifyContent: "center", alignItems: "center"}}>
            <RiCheckboxBlankFill color="yellowgreen" size={"96px"} />
            </div>
          </div>
        )}
      </div>
      <div>
        {data.length && (
          <div className="fitem">
            <Flex direction={"column"} padding="4" justifyContent={"space-between"} >
              <p style={{fontSize: "18px"}}> Occupied Space</p>
              <p style={{fontSize: "48px"}}>{data[0].Occupiedspace}</p>
            </Flex>
            <div style={{width: "70%", display: "flex", justifyContent: "center", alignItems: "center"}}>
            <RiCheckboxBlankFill color="crimson" size={"96px"} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Stats;
