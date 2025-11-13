import React from "react";
import {
    Bar,
    BarChart,
    ResponsiveContainer,
    XAxis,
    YAxis,
    Tooltip,
} from "recharts";
import styles from "./BarChart.module.css";

const BarChartComponent = ({ data }) => {
    return (
        <div className={styles.expenseChart}>
            
            <h2>Top Expenses</h2>

            <div className={styles.barWrapper}>
                <ResponsiveContainer width="100%" height={280}>
                    <BarChart data={data} layout="vertical">
                        <XAxis type="number" axisLine={false} display="none" />
                        <YAxis
                            type="category"
                            width={100}
                            dataKey="name"
                            axisLine={false}
                        />
                        
                        <Tooltip 
                            cursor={{ fill: 'transparent' }} 
                            separator=": "
                            formatter={(value) => [`$${value.toFixed(2)}`, 'Amount']} 
                        />
                        
                        <Bar dataKey="value" fill="#8884d8" barSize={25} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default BarChartComponent;