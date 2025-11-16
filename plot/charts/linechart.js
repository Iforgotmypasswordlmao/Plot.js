import { Grid } from "../utils/grid.js"

export class LineChart extends Grid
{
    constructor(canvas, domain, range, { options={}})
    {
        super(canvas, domain, range, options)
    }

    /**
     * 
     * @param {Array<Array<Number>>} data_points 
     */
    plot_points(data_points, {options = {colour: "#00AAFF"}})
    {
        const line_points = []
        for (let p in data_points)
        {
            const [point_x, point_y] = data_points[p]         
            const [graph_x, graph_y] = this._plot_point(point_x, point_y, options)
            line_points.push([graph_x, graph_y])
        }

        this._context.strokeStyle = options['colour']
        this._context.beginPath()
        for (let lp in line_points)
        {
            const [line_x, line_y] = line_points[lp]
            this._context.lineTo(line_x, line_y)
        }
        this._context.stroke()
    }
}