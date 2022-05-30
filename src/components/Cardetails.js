import Navbar from "./Navbar";
import useFetch from "./useFetch";
import Sidebar from "./Sidebar";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
const Cardetails = () => {
  const { data, error } = useFetch("plates");

  return (
    <Sidebar>
      <div className="allcarlist">
        {error && <p>{error}</p>}
        <Table variant="striped">
          <Thead>
            <Tr>
              <Th>NumberPlate</Th>
              <Th>Time in</Th>
              <Th>Time out</Th>
              <Th>Blocknumber</Th>
              <Th>Status</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data &&
              data.map((x) => {
                let timein = "";
                let timeout = "";
                let arr = x.Time;
                let timelist;
                if (arr.length % 2 == 0) {
                  timelist = arr.slice(Math.max(arr.length - 2));
                  timein = new Date(
                    timelist[0].In.seconds * 1000 +
                      timelist[0].In.nanoseconds / 1000000
                  ).toLocaleString();
                  timeout = new Date(
                    timelist[1].Out.seconds * 1000 +
                      timelist[1].Out.nanoseconds / 1000000
                  ).toLocaleString();
                } else {
                  timelist = arr.slice(Math.max(arr.length - 1));
                  timein = new Date(
                    timelist[0].In.seconds * 1000 +
                      timelist[0].In.nanoseconds / 1000000
                  ).toLocaleString();
                }

                return (
                  <Tr key={x.NumberPlate}>
                    <Td>
                      <Link
                        to={`/history/${x.NumberPlate}`}
                        style={{ color: "blue" }}
                      >
                        {x.NumberPlate}
                      </Link>
                    </Td>
                    <Td>{timein}</Td>
                    <Td>{timeout}</Td>
                    <Td>{x.BlockNumber}</Td>
                    <Td>{x.status}</Td>
                  </Tr>
                );
              })}
          </Tbody>
        </Table>
      </div>
    </Sidebar>
  );
};

export default Cardetails;
