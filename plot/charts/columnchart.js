import { Graph } from "../utils/graph.js";

export class ColumnChart extends Graph 
{
    constructor(canvas, domain, range, { options={}})
    {
        super(canvas, domain, range, options)
    }

    plot_column(data, {colours=this._default_colours, labels=[], label_offset=10, bar_width=30})
    {
        const column_width = this._domain_length/data.length
        bar_width = Math.min(column_width*this.x_axis_unit, bar_width)
        
        for (let d2 in data)
        {
            let value = data[d2]
            value = Math.min(this._range[1], value)

            const prev_column = column_width*d2
            const middle_of_column = column_width/2
            const current_column = prev_column + middle_of_column

            const [bar_x, start_y] = this._get_point_on_canvas(current_column, this._range[0])
            const [nobody_cares_about_you_x, end_y] = this._get_point_on_canvas(current_column, value)
            const [label, colour] = [labels[d2], colours[d2 % colours.length]]
            this._context.fillStyle = colour
            // 1 is so the border and rectangle dont overlap
            this._context.fillRect(bar_x - bar_width/2, start_y - 1, bar_width, end_y - start_y)
            this._context.fillStyle = this._default_text_colour
            this._context.font = this._default_font
            this._context.fillText(label == undefined ? `${d2}`: label, bar_x, start_y + label_offset)
        }
    }
}