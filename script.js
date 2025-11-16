import { Plot } from "./plot/plot.js"

function main()
{
    const [domain_demo, range_demo] = [[0, 100], [0, 100]]
    const data_demo = [1, 1, 2, 3, 5, 8, 13, 21, 34]
    const point_demo = [ [1, 1], [2, 1], [3, 2], [4, 5], [5, 8], [6, 13], [7, 21], [8, 34]]

    const bar_demo = document.getElementById('bar')
    const bar_demo_plot = new Plot(bar_demo, domain_demo, range_demo, {})
    bar_demo_plot.add_border()
    bar_demo_plot.add_title('Bar Chart Demo', {})
    bar_demo_plot.add_x_axis({})
    bar_demo_plot.BarChart.plot_bar(data_demo, {})

    const scatter_demo = document.getElementById('scatter')
    const scatter_demo_plot = new Plot(scatter_demo, domain_demo, range_demo, {})
    scatter_demo_plot.add_border()
    scatter_demo_plot.add_title('Scatter Plot Demo', {})
    scatter_demo_plot.add_x_axis({})
    scatter_demo_plot.add_y_axis({})
    scatter_demo_plot.ScatterPlot.plot_points(point_demo, {})

    const line_demo = document.getElementById('line')
    const line_demo_plot = new Plot(line_demo, domain_demo, range_demo, {})
    line_demo_plot.add_border()
    line_demo_plot.add_title('Line Chart Demo', {})
    line_demo_plot.add_x_axis({})
    line_demo_plot.add_y_axis({})
    line_demo_plot.LineChart.plot_points(point_demo, {})

    const column_demo = document.getElementById('column')
    const column_demo_plot = new Plot(column_demo, domain_demo, range_demo, {})
    column_demo_plot.add_border()
    column_demo_plot.add_title('Column Chart Demo', {})
    column_demo_plot.add_y_axis({})
    column_demo_plot.ColumnChart.plot_column(data_demo, {})

    const pie_demo = document.getElementById('pie')
    const pie_demo_plot = new Plot(pie_demo, domain_demo, range_demo, {options: {offsetx: [50, 50], offsety: [50, 50]}})
    pie_demo_plot.add_border()
    pie_demo_plot.add_title('Pie Chart Demo', {})
    pie_demo_plot.PieChart.plot_pie(data_demo, {})
    
    
}

window.onload = () => {
    main()
}