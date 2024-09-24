import React from 'react';

import Chart, {
    ArgumentAxis,
    Series,
    Legend
} from 'devextreme-react/chart';

const data = [{
    arg: 1990,
    val: 5320816667
}, {
    arg: 2000,
    val: 6127700428
}, {
    arg: 2010,
    val: 6916183482
}];

const DevExtreme = () => {
    return (
        <div className="row">
            <div className="col-xl-12 col-md-12">
                <Chart dataSource={data}>
                    <ArgumentAxis tickInterval={10} />
                    <Series type="bar" />
                    <Legend visible={false} />
                </Chart>
            </div>

        </div>
    )
};

export default DevExtreme;