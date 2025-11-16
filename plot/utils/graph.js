export class Graph
{
    /**
     * 
     * @param {HTMLCanvasElement} canvas 
     * @param {Array<Number>} domain 
     * @param {Array<Number>} range 
     */
    constructor(canvas, domain, range, 
        { 
            offsetx=[50, 10], 
            offsety = [30, 50], 
            default_parameters = {font: '10px Arial', background: '#FFFFFF', text_colour: '#000000', label_font: '15px Arial'}
        })
    {
        this._canvas = canvas
        this._context = canvas.getContext('2d')

        this._height = canvas.height
        this._width = canvas.width

        this._domain = domain
        this._range = range

        this._offsetx = offsetx
        this._offsety = offsety

        this._domain_length = domain[1] - domain[0]
        this._range_length = range[1] - range[0]

        this.x_axis_unit = (this._width - (offsetx[0] + offsetx[1]) ) / this._domain_length
        this.y_axis_unit = (this._height - (offsety[0] + offsety[1]) ) / this._range_length

        this._default_colours = ['#ff595e', '#ffca3a', '#8ac926', '#1982c4', '#6a4c93']
        this._default_font = default_parameters['font']
        this._default_background = default_parameters['background']
        this._default_text_colour = default_parameters['text_colour']
        this._default_label_font = default_parameters['label_font']

    }

    /**
     * 
     * @param {Number} x 
     * @param {Number} y 
     * @returns {Array<Number>}
     */
    _get_point_on_canvas(x, y)
    {
        return [
            (x - this._domain[0])*this.x_axis_unit + this._offsetx[0], 
            this._height - (y - this._range[0])*this.y_axis_unit - this._offsety[1]
        ]
    }

}