async function init() {
   const xs = []
   const ys = []

   const response = await fetch('ZonAnn.Ts+dSST.csv')
   const data = await response.text()
   const table = data.split('\n').slice(1)

   table.forEach(row => {
      const cell = row.split(',')
      const [year, temperature] = cell
      xs.push(year)
      ys.push(parseFloat(temperature) + 14)
   })
   drawChart(xs, ys)
}


function drawChart(xs, ys) {
   const ctx = document.getElementById('myChart').getContext('2d')
   let myChart = new Chart(ctx, {
      type: 'line',
      data: {
         labels: [...xs],
         datasets: [
            {
               label: 'Years',
               fill: false,
               backgroundColor: 'rgba(255, 99, 132, 0.2)',
               borderColor: 'rgba(255, 99, 132, 1)',
               borderWidth: 1,
               data: [...ys]
            }]
      },
      options: {
         legend: {
            labels: {
               boxWidth: 0,
            },
            padding: {
               left: 0,
               right: 0,
               top: 0,
               bottom: 0
            },
            position: "bottom",
         },
         title: {
            display: true,
            text: 'Chart Of Zonal Annual Means In °C'
         },
         scales: {
            yAxes: [{
               ticks: {
                  callback: function (value, index, values) {
                     return value + '°';
                  }
               }
            }]
         }
      }
   })
}

init()
