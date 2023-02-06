import React, { useEffect, useState } from 'react'
import Chart, {
    Series,
    ZoomAndPan,
    ScrollBar,
    ArgumentAxis,
    Label
} from "devextreme-react/chart";


const HOST = "https://demo.questdb.io";



export const QuestData = () => {
    const [data, setData] = useState({});
    const [fetchLimit, setFetchLimit] = useState({
        lowerlimit: 0,
        upperlimit: 20
    });

    useEffect(() => {
        run();
    }, []);

    let transformedData, tempData;

    if (transformedData === undefined) {
        transformedData = data.dataset?.map(function (a) {
            var o = {};
            a.forEach(function (value, index) {
                o[data.columns[index].name] = value;
            });
            return o;
        });
    } else {
        tempData = data.dataset?.map(function (a) {
            var o = {};
            a.forEach(function (value, index) {
                o[data.columns[index].name] = value;
            });
            return o;
        });
        transformedData = { ...transformedData, ...tempData };
    }


    const visualRange = {
        startValue: "2009-01-01T00:00:00.000000Z",
        endValue: "2009-01-01T00:00:10.000000Z"
    };
    const handleChange = (e) => {
        console.log(e);
        if (e.fullName === 'argumentAxis.visualRange') {
            const currentStart = e.value.startValue;
            const currentEnd = e.value.endValue;
            console.log(currentStart)
            console.log(currentEnd)
          }



    };
    const wholeRange = {
        startValue: "2009-01-01T00:00:00.000000Z",
        endValue: "2009-01-01T10:00:00.000000Z"
    };

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
        <div>
            <Chart
        id="chart"
        palette="Harmony Light"
        title="Trip Distance by Pickup DateTime"
        dataSource={transformedData}
        onOptionChanged={handleChange}
      >
        <Series argumentField="pickup_datetime" valueField="trip_distance" >
        <Label visible={true} /></Series>
        
        <ArgumentAxis
          visualRangeUpdateMode="keep"
          defaultVisualRange={visualRange}
          wholeRange={wholeRange}
          argumentType="datetime"
        />
        <ScrollBar visible={true} />
        <ZoomAndPan argumentAxis="both" />
      </Chart>
        </div>
    )
}
