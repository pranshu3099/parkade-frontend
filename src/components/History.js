import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import useFetch from "./useFetch";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Table, Tbody, Tr, Th, Td } from "@chakra-ui/react";

const History = () => {
  const { data, error } = useFetch("plates");
  const { id } = useParams();
  let filteredData = data.find(
    (item) => item.NumberPlate.toLowerCase() === id.toLowerCase()
  );
  let timeList = [];
  if (filteredData) {
    timeList = filteredData.Time.reduce((acc, curr) => {
      console.log(curr);
      if (curr.In) {
        acc.push({
          in: curr.In.seconds * 1000 + curr.In.nanoseconds / 1000000,
          blocknumber: curr.BlockNumber,
        });
      } else if (curr.Out) {
        acc[acc.length - 1].out =
          curr.Out.seconds * 1000 + curr.Out.nanoseconds / 1000000;
      }
      return acc;
    }, []);
  }
  return (
    <Sidebar>
      <div className="history">
        {error && <p>{error}</p>}
        <h1 className="heading">{id}</h1>
        <Table variant={"striped"}>
          <Tr>
            <Th>Time in</Th>
            <Th>Time out</Th>
            <Th>BlockNumber</Th>
          </Tr>
          <Tbody>
            {timeList.map((item) => (
              <Tr>
                <Td>{new Date(item.in).toLocaleString()}</Td>
                <Td>
                  {item.out ? new Date(item.out).toLocaleString() : "N/A"}
                </Td>
                <Td>{item.blocknumber}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </div>
    </Sidebar>
  );
};

export default History;
