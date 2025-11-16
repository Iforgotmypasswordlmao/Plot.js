import { Graph } from "../utils/graph.js";

export class BarChart extends Graph 
{
    constructor(canvas, domain, range, { options={}})
    {
        super(canvas, domain, range, options)
    }

    /**
     * 
     * @param {Array<Number>} data 
     */
    plot_bar(data, {colours=this._default_colours, labels=[], label_offset=20, bar_width=20})
    {
        const row_height = this._range_length/data.length
        bar_width = Math.min(bar_width, row_height*this.y_axis_unit)
        for (let d1 in data)
        {
            let value = data[d1]
            value = Math.min(this._domain[1], value)

            const prev_rows = row_height*d1
            const middle_of_row = row_height/2
            const current_row = prev_rows + middle_of_row

            const [end_x, bar_y] = this._get_point_on_canvas(value, current_row)
            const [start_x, nobody_cares_about_you_y] = this._get_point_on_canvas(this._domain[0], current_row)
            const [label, colour] = [labels[d1], colours[d1 % colours.length]]
            this._context.fillStyle = colour
            // 1 is so the border and rectangle dont overlap
            this._context.fillRect(start_x + 1, bar_y + bar_width/2, end_x-start_x, -bar_width)
            this._context.fillStyle = this._default_text_colour
            this._context.font = this._default_font
            this._context.fillText(label == undefined ? `${d1}`: label, start_x - label_offset ,bar_y)
        }
    }
}