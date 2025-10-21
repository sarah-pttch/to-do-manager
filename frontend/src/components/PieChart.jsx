import { Chart, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'

Chart.register(ArcElement, Tooltip, Legend)

export default function PieChart({ completedTasks }) {

    console.log(completedTasks)
    const tasksPerCategory = completedTasks.reduce((acc, task) => {
        acc[task.category] = (acc[task.category] || 0) + 1
        return acc;
    }, {})

    const labels = Object.keys(tasksPerCategory)
    const values = Object.values(tasksPerCategory)
    const backgroundColors = labels.map((_, index) =>
        `hsl(${(index * 360) / labels.length}, 70%, 60%)`
    );

    console.log(values)

    const data = {
        labels,
            datasets: [
            {
                label: 'Completed tasks per category',
                data: values,
                backgroundColor: backgroundColors,
                borderWidth: 1
            }
        ]
    }

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
            },
        },
    };

    return (
        <div style={{ height: 200, width: 200 }}>
            <Pie data={data} options={options}/>
        </div>
    )
}