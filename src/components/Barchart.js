import React from "react";
import { Pie, Bar } from "react-chartjs-2";
import useFetch from "./useFetch";
import "chart.js/auto";

const Barchart = () => {
  const { data, error } = useFetch("Cars");
  const { data: cardata, error: carerror } = useFetch("plates");
  let incoming = 0;
  let outgoing = 0;
  if (cardata.length && cardata[0].Time) {
    cardata.forEach((x) => {
      let timelist = x.Time;
      let len = timelist?.length;
      if (len % 2 === 0) {
        let timeout = new Date(
          timelist[len - 1].Out.seconds * 1000 +
            timelist[len - 1].Out.nanoseconds / 1000000
        ).toLocaleString();
        let arr = timeout.split(",");
        let timearr = arr[0].split("/");
        let d = new Date();
        d.setDate(d.getDate() - 1);
        let y = d.toString();
        let newarr = y.split(" ");

        if (newarr[2] === timearr[0]) {
          outgoing++;
          incoming++;
        }
      } else {
        let timein = new Date(
          timelist[len - 1].In.seconds * 1000 +
            timelist[len - 1].In.nanoseconds / 1000000
        ).toLocaleString();
        let arr = timein.split(",");
        let timearr = arr[0].split("/");
        let d = new Date();
        d.setDate(d.getDate() - 1);
        let y = d.toString();
        let newarr = y.split(" ");
        if (newarr[2] === timearr[0]) {
          incoming++;
        }
      }
    });
  }

  let x = "NA",
    y = "NA",
    z = "NA";
  if (data.length) {
    x = data[0].TotalCars;
    y = data[0].Freespace;
    z = data[0].Occupiedspace;
  }

  return (
    <div className="chart-container">
      <div className="pie">
        <Pie
          data={{
            labels: ["Freespace", "Occupiedspace", "Totalcars"],
            datasets: [
              {
                label: "Parking Information",
                data: [y, z, x],
                backgroundColor: [
                  "rgba(255,159,64,1)",
                  "rgba(54,162,235,1)",
                  "rgba(255,206,86,1)",
                ],
              },
            ],
          }}
        />
      </div>
      <div className="bar">
        <Bar
          data={{
            labels: ["Incoming", "Outgoing"],
            datasets: [
              {
                label: "Parking Information of previous day",
                data: [incoming, outgoing],
                backgroundColor: ["rgba(255,159,64,1)", "rgba(54,162,235,1)"],
              },
            ],
          }}
        />
      </div>
    </div>
  );
};

export default Barchart;
