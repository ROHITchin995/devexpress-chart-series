import React, { useEffect, useState } from 'react'



const HOST = "https://demo.questdb.io";



export const QuestData = () => {
    const [data, setData] = useState({});

    useEffect(() => {
        run();
      }, []);

    async function run() {
        try {
          const query = `SELECT pickup_datetime,trip_distance from trips LIMIT ${fetchLimit.lowerlimit},${fetchLimit.upperlimit};`;
    
          const response = await fetch(
            `${HOST}/exec?query=${encodeURIComponent(query)}`
          );
          const json = await response.json();
    
          setData(json);
          // console.log(json);
        } catch (error) {
          console.log(error);
        }
      }

  return (
    <div>QuestData</div>
  )
}
