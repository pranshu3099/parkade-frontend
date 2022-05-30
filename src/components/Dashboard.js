import useFetch from "./useFetch";
import { Container, SimpleGrid, Text, Flex } from "@chakra-ui/react";
import Barchart from "./Barchart";
import Sidebar from "./Sidebar";
import Stats from "./Stats";
import Latest from "./Latest";

const AdminDashboard = () => {
  // const { data, error } = useFetch("Cars");
  // console.log(data);
  const { data: carData, error: carError } = useFetch("plates");
  console.log(carData);
  let lastestEntry = null;
  carData.forEach((data) => {
    if (!lastestEntry) {
      lastestEntry = data;
    } else {
      if (data.Time[0].In.seconds > lastestEntry.Time[0].In.seconds) {
        lastestEntry = data;
      }
    }
  });

  let time = "";
  if (lastestEntry) {
    time = new Date(
      lastestEntry.Time[0].In.seconds * 1000 +
        lastestEntry.Time[0].In.nanoseconds / 1000000
    ).toLocaleString();
  }

  return (
    <>
      <Sidebar>
        <Stats />
        <Barchart />
      </Sidebar>
    </>
  );
};

export default AdminDashboard;
