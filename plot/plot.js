import { ScatterPlot } from "./charts/scatterplot.js";
import { BarChart } from "./charts/barchart.js";
import { ColumnChart } from "./charts/columnchart.js"
import { LineChart } from "./charts/linechart.js"
import { PieChart } from "./charts/piechart.js"
import { Graph } from "./utils/graph.js";

export class Plot extends Graph
{
    constructor(canvas, domain, range, { options={}})
    {
        super(canvas, domain, range, options)

        const default_params = [0, 100]
        this.ScatterPlot = new ScatterPlot(canvas, domain, range, {options: options})

        this.BarChart = new BarChart(canvas, domain, default_params, {options: options})

        this.ColumnChart = new ColumnChart(canvas, default_params, range, {options: options})

        this.LineChart = new LineChart(canvas, domain, range, {options: options})

        this.PieChart = new PieChart(canvas, default_params, default_params, {options: options})

        this._context.textAlign = "center"
        this._context.textBaseline = "middle"

        this._title = "Graph"
        this._context.fillStyle = "#FFFFFF"
        this._context.fillRect(0, 0, this._width, this._height)
        this._context.fillStyle = "#000000"
    }

    add_border()
    {
        const graph_corners = [
            [this._domain[0], this._range[0]],
            [this._domain[1], this._range[0]],
            [this._domain[1], this._range[1]],
            [this._domain[0], this._range[1]],
            [this._domain[0], this._range[0]]
        ]

        for (let corners in graph_corners)
        {
            const [corner_x, corner_y] = graph_corners[corners]
            const [lazy_x, lazy_y] = this._get_point_on_canvas(corner_x, corner_y)
            this._context.lineTo(lazy_x, lazy_y)
        }
        this._context.stroke()
    }

    // might create a 'tick' data struct, this is way too long
    add_x_axis({ticks=3, subticks=4, length=5, label="x axis"})
    {
        this._context.font = '10px Arial'

        const x_subticks_interval = this._domain_length/(( subticks +1)*(ticks-1))
        let x_subticks_count = 0
        for (let x2 = this._domain[0]; x2 <= this._domain[1]; x2 += x_subticks_interval)
        {
            const [graph_x2, graph_y2] = this._get_point_on_canvas(x2, this._range[0])
            this._context.moveTo(graph_x2, graph_y2)
            if (x_subticks_count % (subticks + 1) == 0)
            {
                this._context.lineTo(graph_x2, graph_y2 + 2*length)
                this._context.fillText(`${x2}`, graph_x2, graph_y2 + 4*length)
            }
            else
            {
                this._context.lineTo(graph_x2, graph_y2 + 1.25*length)
            }
            x_subticks_count += 1
        }

        this._context.stroke()

        const [middle_x, useless_y] = this._get_point_on_canvas(this._domain_length/2, this._range[0])
        this._context.font = this._default_label_font
        this._context.fillText(label, middle_x, this._height - 2*length)
    }

    add_y_axis({ticks=3, subticks=4, length=5, label="y axis"})
    {
        this._context.font = '10px Arial'

        const y_subticks_interval = this._range_length/((subticks +1)*(ticks-1))
        let y_subticks_count = 0
        for (let y3 = this._range[0]; y3 <= this._range[1]; y3 += y_subticks_interval)
        {
            const [graph_x3, graph_y3] = this._get_point_on_canvas(this._domain[0], y3)
            this._context.moveTo(graph_x3, graph_y3)
            if (y_subticks_count % (subticks + 1) == 0)
            {
                this._context.lineTo(graph_x3 - 2*length, graph_y3)
                this._context.fillText(`${y3}`, graph_x3 - 4*length, graph_y3)
            }
            else
            {
                this._context.lineTo(graph_x3 - 1.25*length, graph_y3)
            }
            y_subticks_count += 1
        }
        this._context.stroke()
    }

    /**
     * 
     * @param {string} title 
     */
    add_title(title, {font='20px Arial', x=this._width/2, y=this._offsety[0]/2})
    {
        this._context.font = font
        this._title = title
        this._context.fillText(title, x, y)
    }

    download()
    {
        const link = document.createElement('a');
        link.download = `${this._title}.png`;
        link.href = this._canvas.toDataURL()
        link.click();
    }
}