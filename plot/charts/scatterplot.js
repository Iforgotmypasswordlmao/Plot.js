import { Grid } from "../utils/grid.js"

export class ScatterPlot extends Grid
{
    constructor(canvas, domain, range, { options={}})
    {
        super(canvas, domain, range, {options: options})
    }

    /**
     * 
     * @param {Array<Array<Number>>} data_points 
     */
    plot_points(data_points, {options = {}})
    {
        for (let p in data_points)
        {
            const [point_x, point_y] = data_points[p]         
            this._plot_point(point_x, point_y, options)
        }
        
    }

}