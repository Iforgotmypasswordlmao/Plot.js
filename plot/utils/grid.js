import { Graph } from "./graph.js";

export class Grid extends Graph
{
    constructor(canvas, domain, range, { options={}})
    {
        super(canvas, domain, range, options)
    }

    /**
     * 
     * @param {Number} x 
     * @param {Number} y 
     * @returns {Array<Number>}
     */
    _plot_point(x, y, {radius=1, label=false, text_offset_x=0, text_offset_y=10, colour="#000000"})
    {
        this._context.font = '10px Arial'
        this._context.fillStyle = colour
        this._context.strokeStyle = colour

        const [graph_x, graph_y] = this._get_point_on_canvas(x, y)
        this._context.beginPath();
        this._context.arc(graph_x, graph_y, radius, 0, 2 * Math.PI);
        this._context.fill()
        if (label)
        {
            this._context.fillText(`(${x}, ${y})`, graph_x - text_offset_x, graph_y - text_offset_y)
        }
        this._context.stroke();
        return [graph_x, graph_y]
    }

    /**
     * 
     * @param {Function} func 
     */
    plot_function(func, {func_domain=this._domain, func_range=this._range, interval=5, colour="#000000"})
    {
        this._context.strokeStyle = colour
        this._context.beginPath()
        for (let x1 = func_domain[0]; x1 <= func_domain[1]; x1 += interval)
        {
            const y1 = func(x1)
            
            if (y1 < func_range[0] || y1 > func_range[1])
            {
                continue
            }
            const [graph_x1, graph_y1] = this._get_point_on_canvas(x1, y1)
            
            
            this._context.lineTo(graph_x1, graph_y1)
        }
        this._context.stroke()
    }
}