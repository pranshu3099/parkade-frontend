import { Link } from "react-router-dom";
import { Input } from "@chakra-ui/react";
import { useState } from "react";
import useFetch from "./useFetch";
import Search from "./Search";

const Navbar = () => {
  const { data, error } = useFetch("Cars");
  const { data: carData, error: carError } = useFetch("plates");
  const [value, setValue] = useState("");
  const handleChange = (event) => setValue(event.target.value);
  console.log(value);

  return (
    <>
      <div className="main-nav">
        <div className="navbar">
          <ul className="list">
            <Link to="/dashboard">
              <li className="logo">Parkade</li>
            </Link>
            <Input
              variant="filled"
              placeholder="Search"
              width={400}
              borderRadius={20}
              value={value}
              onChange={handleChange}
            />
          </ul>
          <Search searchValue={value} />

          <div className="fcontainer">
            {error && <p>{error}</p>}
            <div className="temp">
              {data.length && (
                <div className="fitem Cars">
                  <p className="text"> Total Cars</p>
                  <p className="data"> {data[0].TotalCars}</p>
                  <img src={""} alt="" className="car" />
                </div>
              )}
            </div>
            <div className="temp">
              {data.length && (
                <div className="fitem Empty">
                  <p className="text">Empty Space</p>
                  <p className="data">{data[0].Freespace}</p>
                  <img src={""} alt="" className="car" />
                </div>
              )}
            </div>
            <div className="temp">
              {data.length && (
                <div className="fitem Space">
                  <p className="text"> Occupied Space</p>
                  <p className="data">{data[0].Occupiedspace}</p>
                  <img src={""} alt="" className="car" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
