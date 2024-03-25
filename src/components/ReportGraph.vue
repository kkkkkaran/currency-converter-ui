<template>
    <div>
      <canvas id="myChart"></canvas>
    </div>
  </template>
  
  <script>
  import { onMounted } from 'vue';
  import axios from 'axios';
  import { Chart, LineController, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';
    
  Chart.register(LineController, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);
  
  export default {
    props: ['fileUrl'],
    setup(props) {
      onMounted(async () => {
        console.log(props.fileUrl)
        const response = await axios.get(props.fileUrl);
        const csvData = response.data;
        const data = parseCsvData(csvData);
  
        const ctx = document.getElementById('myChart').getContext('2d');
        const myChart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: data.labels,
            datasets: [{
              label: 'Rate',
              data: data.values,
            }]
          },
        });
      });
  
      function parseCsvData(csvData) {
        const lines = csvData.split('\n');

        let labels = [];
        let values = [];
        
        for (let i = 1; i < lines.length; i++) {
            if (!lines[i]) continue; 
            const columns = lines[i].split(',');

            labels.push(columns[0]);
            values.push(parseFloat(columns[1]));
        }    
        
        return { labels, values };
      }
    }
  }
  </script>
  