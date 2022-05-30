import Navbar from "./Navbar";
import useFetch from "./useFetch";
import Sidebar from "./Sidebar";
import { AiFillCar } from "react-icons/ai";
import { RiCheckboxBlankFill } from "react-icons/ri";
const Grid = () => {
  const { data: block, error: Error } = useFetch("blocks");
  let hash = block[0]?.blocklist;
  console.log(hash);
  return (
    <Sidebar>
      <div className="grid-box">
        <div className="box">
          {hash ? (
            [...new Array(67)].map((_, i) => (
              <div
                className={`parking-space ${
                  hash[i + 1]["blockstatus"] ? "bg-green" : "bg-red"
                }`}
                key={i}
              >
                {i + 1}
                {hash[i + 1]["blockstatus"] ? (
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <RiCheckboxBlankFill color="yellowgreen" size={"40px"} />
                  </div>
                ) : (
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <AiFillCar size={"40px"} color="tomato" />
                  </div>
                )}
              </div>
            ))
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </div>
    </Sidebar>
  );
};

export default Grid;
