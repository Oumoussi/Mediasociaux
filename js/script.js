function count(values, row) {
  let i = 0;
  let one = 0;
  let two = 0;
  let three = 0;
  let four = 0;
  let f = 0;
  let ins = 0;
  let sn = 0;
  let x = 0;
  let l = 0;
  let j = 0;
  let k = 0;
  for (let index = 0; index < values.length; index++) {
    const valueLower = values[index][row];
    switch (valueLower) {
      case "Oui":
        i++;
        break;
      case "Non":
        j++;
        break;
      case "Facebook":
        f++;
        break;
      case "Instagram":
        ins++;
        break;  
      case "LinkedIn":
        l++;
        break; 
      case "X (Twitter)":
        x++;
        break; 
      case "Snapchat":
        sn++;
        break; 
      case "Other":
        k++;
        break; 
      case "[0h - 2h]":
        one++;
        break; 
      case "[2h - 5h]":
        two++;
        break; 
      case "[5h - 8h]":
        three++;
        break; 
      case "[8h - 12h]":
        four++;
        break; 
      case "Très confiance":
        one++;
        break; 
      case "Moyennement confiance":
        two++;
        break; 
      case "Peu confiance":
        three++;
        break; 
      case "Pas du tout confiance":
        four++;
        break;  
      default:
        break;
    }
  }
  
  return { i, j, k, f, ins, l, sn, x, one, two, three, four };
}
async function loadData() {
  const response = await fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vSArT1IoXvWDtV0J9S56b7TNYA6Wdctjg4HeiQMh_l92HaM3LHkPeytY21t5OySb37QmI-qJeDc_Uev/pub?output=csv');
  const data = await response.text()
  // Parse CSV data into an array
  const rows = data.split('\n');
  const labels = data.split('\r\n')[0].split(',')
  const values = []
  for (let i = 1; i < rows.length; i++) {
    const row = rows[i].split(',');
    values.push(row);
  }
  return { labels, values };
}

function piechart (fulldata, i, chartId,charts){
  const labels = [fulldata.labels[i], fulldata.labels[i + 1]];
  let data = [];
  let titles = [];
  let colors = ['blue','orange','green', 'yellow'];
  if(i === 2 || i === 3 || i === 22){
    switch (i) {
      case 2:
        colors.push('purple','Gray');
        titles = ['Facebook','Instagram','X (Twitter)','LinkedIn','Snapchat','Other'];
        data.push(count(fulldata.values, i).f,count(fulldata.values, i).ins,count(fulldata.values, i).x,
        count(fulldata.values, i).l, count(fulldata.values, i).sn, count(fulldata.values, i).k);
        break;
      case 3:
        titles = ['[0h - 2h]','[2h - 5h]','[5h - 8h]','[8h - 12h]'];
        data.push(count(fulldata.values, i).one,count(fulldata.values, i).two,count(fulldata.values, i).three,
        count(fulldata.values, i).four);
        break;
      case 22:
        titles = ['Très confiance','Moyennement confiance','Peu confiance','Pas du tout confiance']; 
        data.push(count(fulldata.values, i).one,count(fulldata.values, i).two,count(fulldata.values, i).three,
        count(fulldata.values, i).four);
        break;
      default:
        break;
    }
    
  }
  const chartData = {
    labels: titles,
    datasets: [
      {
        label: labels[0],
        data,
        backgroundColor: colors,
        borderWidth: 1,
      },
    ],
  };
  const chartConfig ={
    type: 'pie',
    data: chartData,
  };
  // Create a canvas element for each chart
  const canvas = document.createElement('canvas');
  canvas.id = `myChart${i / 2}`; 
  document.getElementById(chartId).appendChild(canvas);
  
  charts.push(new Chart(canvas, chartConfig));
  
  
  
}

function barchart (fulldata, i, chartId,charts){
    
    const labels = [fulldata.labels[i], fulldata.labels[i + 1]];
    let data = [count(fulldata.values, i).i, count(fulldata.values, i).j];
   
    let titles = ['Oui','Non'];
    if(i === 25 || i == 24){
      
      data.push(count(fulldata.values, i).k);
      
      switch (i) {
        case 25:
          titles.push('Peut-être');
          break;
        case 24:
          titles.push('Pas sûr');
          break;
        default:
          break;
      }
      
    }
    const chartData = {
      labels: titles,
      datasets: [
        {
          label: labels[0],
          data,
          backgroundColor: [
            'rgba(255, 26, 104, 0.2)',
            'rgba(54, 162, 235, 0.2)',
          ],
          borderColor: [
            'rgba(255, 26, 104, 1)',
            'rgba(54, 162, 235, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };
    const chartConfig = {
      type: 'bar',
      data: chartData,
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    };
    // Create a canvas element for each chart
    const canvas = document.createElement('canvas');
    canvas.id = `myChart${i / 2}`; 
    document.getElementById(chartId).appendChild(canvas);
    
    charts.push(new Chart(canvas, chartConfig));
    
    
    
}

function showbarchart(fulldata,heading){
  let charts = [];
  switch (heading) {
    case "social":
      barchart(fulldata, 1, 'chartContainer',charts);
      piechart(fulldata, 2, 'chartContainer',charts);
      piechart(fulldata, 3, 'chartContainer',charts);
      break;
    case "private":
      barchart(fulldata, 4, 'chartContainer1',charts);
      barchart(fulldata, 5, 'chartContainer1',charts);
      break;
    case "politiques":
      barchart(fulldata, 6, 'chartContainer2',charts);
      barchart(fulldata, 7, 'chartContainer2',charts);
      break;
    case "connaissance":
      barchart(fulldata, 8, 'chartContainer3',charts);
      barchart(fulldata, 9, 'chartContainer3',charts);
      barchart(fulldata, 10, 'chartContainer3',charts);
      break;
    case "security":
      barchart(fulldata, 11, 'chartContainer4',charts);
      barchart(fulldata, 12, 'chartContainer4',charts);
      barchart(fulldata, 13, 'chartContainer4',charts);
      break;
    case "protection":
      barchart(fulldata, 14, 'chartContainer5',charts);
      barchart(fulldata, 15, 'chartContainer5',charts);
      barchart(fulldata, 16, 'chartContainer5',charts);
      break;
    case "supp":
      barchart(fulldata, 17, 'chartContainer6',charts);
      barchart(fulldata, 19, 'chartContainer6',charts);
      break;
    
    case "autre":
      barchart(fulldata, 18, 'chartContainer7',charts);
      barchart(fulldata, 20, 'chartContainer7',charts);
      barchart(fulldata, 21, 'chartContainer7',charts);
      piechart(fulldata, 22, 'chartContainer7',charts);
      barchart(fulldata, 23, 'chartContainer7',charts);
      barchart(fulldata, 24, 'chartContainer7',charts);
      barchart(fulldata, 25, 'chartContainer7',charts);
      barchart(fulldata, 26, 'chartContainer7',charts);
      barchart(fulldata, 27, 'chartContainer7',charts);
      barchart(fulldata, 28, 'chartContainer7',charts);
      break;
    default:
      break;
  }

}


document.addEventListener("DOMContentLoaded", function() {
  const navLinks = document.querySelectorAll(".nav-link");
  const contentDivs = document.querySelectorAll(".content");
  let data = [];
  loadData().then((fulldata) => {
    createAndAppendCards(fulldata);
    data = fulldata;
  });
  contentDivs.forEach(div => {
      div.style.display = "none";
  });

  const profilContentDiv = document.getElementById("profil");
  profilContentDiv.style.display = "block";
  const cardContainer = document.getElementById("card-container");

  function createCard(dataRow) {
      const card = document.createElement('div');
      card.classList.add('card');
      
      const backgroundImageURL = dataRow[29].replace("open?", "uc?export=view&");
      
      const cardImageDiv = document.createElement('div');
      cardImageDiv.classList.add('card-image');
      cardImageDiv.style.backgroundImage = `url(${backgroundImageURL})`;
      card.appendChild(cardImageDiv);
      
      const cardNomComplet = document.createElement('p');
      cardNomComplet.textContent = dataRow[30];
      card.appendChild(cardNomComplet);

      return card;
  }

  function createAndAppendCards(data) {
      for (let i = 0; i < data.values.length; i++) {
          const dataRow = data.values[i];
          const card = createCard(dataRow);
          cardContainer.appendChild(card);
      }
  }
  
  let currentTargetId = null;

  navLinks.forEach(link => {
      link.addEventListener("click", function(e) {
          e.preventDefault();
  
          const targetId = this.getAttribute("data-target");
  
          if (targetId !== currentTargetId) {
              contentDivs.forEach(div => {
                  div.style.display = "none";
              });
  
              document.getElementById(targetId).style.display = "block";
  
              currentTargetId = targetId;
              
              showbarchart(data, targetId);
          } else {
            
          }
      });
  });
  
  
  
});
