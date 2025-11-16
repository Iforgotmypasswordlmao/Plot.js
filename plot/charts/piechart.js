import { Graph } from "../utils/graph.js";

export class PieChart extends Graph 
{
    constructor(canvas, domain, range, { options={}})
    {
        super(canvas, domain, range, options)
    }

    /**
     * 
     * @param {Array<Number>} data 
     */
    plot_pie(data, {radius=this.y_axis_unit*this._range_length/2.5, hollow=false, hollow_radius=radius/1.5, colours=this._default_colours})
    {
        const [middle_x, middle_y] = this._get_point_on_canvas(this._domain_length/2, this._range_length/2)

        const colours_length = colours.length
        let sum_of_values = 0
        for (let d1 in data)
        {
            sum_of_values += data[d1]
        }
        
        let start = 0
        let end = 0
        
        for (let d2 in data)
        {
            const value = data[d2]
            const [percentage, colour] = [value/sum_of_values, colours[d2 % colours_length]]
            end = percentage*Math.PI*2 + start
            this._context.beginPath()
            this._context.fillStyle = colour
            this._context.strokeStyle = this._default_background
            this._context.moveTo(middle_x, middle_y)
            this._context.arc(middle_x, middle_y, radius, start, end)
            this._context.fill()
            this._context.stroke()
            start = end
        }

        if (hollow)
        {
            this._context.beginPath()
            this._context.fillStyle = this._default_background
            this._context.strokeStyle = this._default_background
            this._context.arc(middle_x, middle_y, hollow_radius, 0, 2*Math.PI)
            this._context.fill()
            this._context.stroke()
        }
        
    }
}