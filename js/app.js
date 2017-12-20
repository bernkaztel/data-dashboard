//La fuente del evento, es el select con el id de "Filter"
var source = document.getElementById("filter");
//console.log(source);
//Declaramos que estamos "listening for events" 
source.addEventListener("change", getData);
//Creamos la función getData que va a obtener la data con la que se va a trabajar
//Dependiendo de qué opción del filtro sea seleccionada.
function getData(event) {
    // Esta línea de código, identifica el index seleccionado
    var selectedIndex = event.target.selectedIndex;
    //console.log(selectedIndex);
    //Esta línea busca cuál es el año seleccionada
    var selectedYear = event.target[selectedIndex].dataset.year;
    //console.log(selectedYear);
    //Esta linea busca cuál es la sede seleccionada
    var selectedCity = event.target.value;
    //console.log(selectedCity);
    //! Obtenemos el array conteniendo a las estudiantes activas
    var arrayStudent = data[selectedCity][selectedYear]["students"];
    var arrayStudents = [];
    var dropoutCounter1 = 0;
    for (var i = 0; i < arrayStudent.length; i++) {
        if (arrayStudent[i].active === true) {
            (dropoutCounter1 += 1);
            arrayStudents.push(arrayStudent[i])
        }
    }
    //!ENROLLMENT
    //*CURRENTLY ENROLLED
    //Obtenemos el número de estudiantes que están activas
    var arrayStudentsLength = arrayStudents.length;
    console.log('El total de estudiantes enrolados es de ' + arrayStudentsLength);
    //Buscamos el número de estudiantes no activos 
    var dropoutCounter = 0;
    for (var i = 0; i < arrayStudentsLength; i++) {
        if (arrayStudents[i].active == !true) {
            (dropoutCounter += 1);
        }
    }
    console.log('El total de estudiantes no activos es de ' + dropoutCounter);
    //Buscamos al padre que tendrá el span.
    var enrollmentParent1 = document.getElementById("enrolled-number");
    //Quitamos hijo
    enrollmentParent1.removeChild(enrollmentParent1.lastChild);
    //Creamos un nuevo elemento, un span. 
    var enrollmentNewElement = document.createElement("div");
    //Colocamos el nuevo hijo dentro del padre.
    enrollmentParent1.appendChild(enrollmentNewElement);
    //Agregamos la clase
    enrollmentNewElement.classList.add("enrollment");
    //Ponemos el texto dentro
    enrollmentNewElement.innerText = "#" + arrayStudentsLength;
    //*DROPOUTRATE
    //Sacamos el numero de estudiantes activas y no activas comparando los dos arrays
    var dropoutNumber = arrayStudent.length - arrayStudents.length;
    //Sacamos el porcentaje de deserción. 
    var dropoutPercentage = ((dropoutNumber * 100) / arrayStudent.length);
    console.log("El porcentaje de deserción es de " + dropoutPercentage);
    //Buscamos al padre que tendrá el span.
    var dropoutParent = document.getElementById("dropout-percentage");
    //Quitamos hijo
    dropoutParent.removeChild(dropoutParent.lastChild);
    //Creamos un nuevo elemento, un span. 
    var dropoutNewElement = document.createElement("div");
    //Colocamos el nuevo hijo dentro del padre.
    dropoutParent.appendChild(dropoutNewElement);
    if (dropoutPercentage < 60) {
        //Agregamos la clase
        dropoutNewElement.classList.add("dropout-red");
    }
    if (dropoutPercentage > 60) {
        //Agregamos la clase
        dropoutNewElement.classList.add("dropout-green");
    }
    dropoutNewElement.innerText = (dropoutPercentage.toFixed([2]) + "%");

    //! ACHIEVEMENT
    //Sacamos el número de estudiantes que cumplen con los objetivos
    //*AVERAGE POINTS
    // TODO: VARIABLES DECLARADAS DE TECH Y HSE
    var studentAboveScore = 0;
    var studentsTechAboveScorePercentage = 0;
    var ss = 0;
    var ss2 = 0;
    //Creamos un for que itere por todos los estudiantes
    for (var i2 = 0; i2 < arrayStudentsLength; i2++) {
        //console.log(arrayStudents[0][0]);
        //console.log(arrayStudents[0].sprints);
        var numberSprints = arrayStudents[i2].sprints;
        var numberSprintsLength = numberSprints.length;
        var sprintsTechScore = 0;
        var sprintsHseScore = 0;
        //Creamos otro for que itere por el número de sprints
        for (var i = 0; i < numberSprintsLength; i++) {
            sprintsTechScore += (arrayStudents[i2].sprints[i].score.tech);
            sprintsHseScore += (arrayStudents[i2].sprints[i].score.hse);
        }
        var averageSprintsTechScore = sprintsTechScore / numberSprintsLength;
        var averageSprintsHseScore = sprintsHseScore / numberSprintsLength;
        //Cuanto es el número correcto de puntos totales y el 70%
        //TODO: Revisar el máximo de puntos posibles
        if (averageSprintsTechScore >= 1260 && averageSprintsHseScore >= 840) {
            studentAboveScore++;
        }
    }
    //Buscamos el número de estudiantes que no pasaron
    var nopass = arrayStudentsLength - studentAboveScore;
    //*ACHIEVEMENT NUMBER
    console.log("El numero de estudiantes por encima del 70% es de " + studentAboveScore);
    //Buscamos al padre que tendrá el span.
    var achievementParent = document.getElementById("achievement-parent");
    //Quitamos hijo
    achievementParent.removeChild(achievementParent.lastChild);
    //Creamos un nuevo elemento, un span. 
    var achievementNewElement = document.createElement("div");
    //Colocamos el nuevo hijo dentro del padre.
    achievementParent.appendChild(achievementNewElement);
    achievementNewElement.innerText = "#" + studentAboveScore;
    //*ACHIEVEMENT PERCENTAGE
    console.log("El porcentaje de estudiantes por encima del 70% es de " + studentAboveScorePercentage);
    //Buscamos el porcentaje de estudiantes que cumplen con el objetivo
    var studentAboveScorePercentage = ((studentAboveScore * 100) / arrayStudentsLength);
    //Buscamos al padre que tendrá el span.
    var achievementParent2 = document.getElementById("achievement-percentage");
    //Quitamos hijo
    achievementParent2.removeChild(achievementParent2.lastChild);
    //Creamos un nuevo elemento, un span. 
    var achievementNewElement2 = document.createElement("div");
    //Colocamos el nuevo hijo dentro del padre.
    achievementParent2.appendChild(achievementNewElement2);
    if (studentAboveScorePercentage < 70) {
        //Agregamos la clase
        achievementNewElement2.classList.add("dropout-red");
    }
    if (studentAboveScorePercentage > 70) {
        //Agregamos la clase
        achievementNewElement2.classList.add("dropout-green");
    }
    achievementNewElement2.innerText = studentAboveScorePercentage.toFixed([2]) + "%"
    //!NPS
    //Buscamos el porcentaje de NPS
    var arrayRatings = data[selectedCity][selectedYear]["ratings"];
    //Sacamos un nuevo array que contenga únicamente los ratings
    var arrayRatingsLength = arrayRatings.length;
    var promotersPercentSum = 0;
    var passivePercentSum = 0;
    var detractorsPercentSum = 0;
    //Creamos un for que vaya iterando por el número de rating por cada sprint
    for (var i = 0; i < arrayRatingsLength; i++) {
        var promotersNumber = (arrayRatings[i]["nps"]["promoters"]);
        var passiveNumber = (arrayRatings[i]["nps"]["passive"]);
        var detractorsNumber = (arrayRatings[i]["nps"]["detractors"]);
        var totalNumber = promotersNumber + passiveNumber + detractorsNumber;
        var promotersPercent = ((promotersNumber * 100) / totalNumber);
        var detractorsPercent = ((detractorsNumber * 100) / totalNumber);
        var passivePercent = ((passiveNumber * 100) / totalNumber);
        var promotersPercentSum = promotersPercent + promotersPercentSum;
        var passivePercentSum = passivePercent + passivePercentSum;
        var detractorsPercentSum = detractorsPercent + detractorsPercentSum;
    }
    //Sacamos los porcentajes
    var promotersPercentTotal = promotersPercentSum / arrayRatingsLength;
    var passivePercentTotal = passivePercentSum / arrayRatingsLength;
    var detractorsPercentTotal = detractorsPercentSum / arrayRatingsLength;
    console.log("El porcentaje de promoters es " + promotersPercentTotal);
    console.log("El porcentaje de passives es " + passivePercentTotal);
    console.log("El porcentaje de detractors es " + detractorsPercentTotal);
    //Buscamos al padre que tendrá el span.
    var promotersParent = document.getElementById("promoters-percentage");
    //Quitamos hijo
    promotersParent.removeChild(promotersParent.lastChild);
    //Creamos un nuevo elemento, un span. 
    var promotersNewElement = document.createElement("span");
    //Colocamos el nuevo hijo dentro del padre.
    promotersParent.appendChild(promotersNewElement);
    promotersNewElement.innerText = promotersPercentTotal.toFixed([2]) + "%" + "PROMOTERS"
    //Buscamos al padre que tendrá el span.
    var passivesParent = document.getElementById("passives-percentage");
    //Quitamos hijo
    passivesParent.removeChild(passivesParent.lastChild);
    //Creamos un nuevo elemento, un span. 
    var passivesNewElement = document.createElement("span");
    //Colocamos el nuevo hijo dentro del padre.
    passivesParent.appendChild(passivesNewElement);
    passivesNewElement.innerText = passivePercentTotal.toFixed([2]) + "%" + " PASSIVES"
    //Buscamos al padre que tendrá el span.
    var detractorsParent = document.getElementById("detractors-percentage");
    //Quitamos hijo
    detractorsParent.removeChild(detractorsParent.lastChild);
    //Creamos un nuevo elemento, un span. 
    var detractorsNewElement = document.createElement("span");
    //Colocamos el nuevo hijo dentro del padre.
    detractorsParent.appendChild(detractorsNewElement);
    detractorsNewElement.innerText = detractorsPercentTotal.toFixed([2]) + "%" + " DETRACTORS"
    var npsTotal = (promotersPercentTotal) - (detractorsPercentTotal)
    //Buscamos al padre que tendrá el span.
    var npsTotalParent = document.getElementById("npsacumulative-number");
    //Quitamos hijo
    npsTotalParent.removeChild(npsTotalParent.lastChild);
    //Creamos un nuevo elemento, un span. 
    var npsTotalNewElement = document.createElement("span");
    //Colocamos el nuevo hijo dentro del padre.
    npsTotalParent.appendChild(npsTotalNewElement);
    if (npsTotal < 70) {
        //Agregamos la clase
        npsTotalNewElement.classList.add("acu-red");
    }
    if (npsTotal > 70) {
        //Agregamos la clase
        npsTotalNewElement.classList.add("acu-green");
    }
    npsTotalNewElement.innerText = npsTotal.toFixed([2]) + "%"
    //!EXPERIENCE SATISFACTION
    //Buscamos la satisfacción de la experiencia
    // TODO:  colocar otros datos si hay tiempo
    //Declaramos las variables fuera del for
    var failsNumber = 0;
    var fulfillNumber = 0;
    var failsAcu = 0;
    var fulfAcu = 0;
    //Creamos un for que itere por el rating de cada uno de los sprints
    for (var i = 0; i < arrayRatingsLength; i++) {
        var failsNumber = (arrayRatings[i]["nps"]["detractors"]);
        var fulfillNumber = (arrayRatings[i]["nps"]["promoters"]);
        //Buscamos los factores acumulados
        failsAcu += failsNumber;
        fulfAcu += fulfillNumber;
    }
    //Sacamos los porcentajes
    var npsFail = ((failsAcu / 100) * 100)
    var npssFul = ((fulfAcu / 100) * 100)
    var npsfinal = ((npssFul - npsFail) / 3);
    //Buscamos el porcentaje por cada uno de los sprints
    var fails1 = (arrayRatings[0]["nps"]["detractors"])
    var fulfill1 = (arrayRatings[0]["nps"]["promoters"])
    var ff = fulfill1 - fails1;
    var fails2 = (arrayRatings[1]["nps"]["detractors"])
    var fulfill2 = (arrayRatings[1]["nps"]["promoters"])
    var ff2 = fulfill2 - fails2;
    var fails3 = (arrayRatings[2]["nps"]["detractors"])
    var fulfill3 = (arrayRatings[2]["nps"]["promoters"])
    var ff3 = fulfill3 - fails3;
    //Buscamos al padre que tendrá el span.
    var satisfactionParent = document.getElementById("satisfaction-percentage");
    //Quitamos hijo
    satisfactionParent.removeChild(satisfactionParent.lastChild);
    //Creamos un nuevo elemento, un span. 
    var satisfactionNewElement = document.createElement("span");
    //Colocamos el nuevo hijo dentro del padre.
    satisfactionParent.appendChild(satisfactionNewElement);
    if (npsfinal < 70) {
        //Agregamos la clase
        satisfactionNewElement.classList.add("acu-red");
    }
    if (npsfinal > 70) {
        //Agregamos la clase
        satisfactionNewElement.classList.add("acu-green");
    }
    satisfactionNewElement.innerText = npsfinal.toFixed([2]) + "%"
    //!TEACHERS RATING
    //Buscamos la calficación de los maestros
    var totalRating = 0;
    //Creamos un for que itere por los sprint
    for (var i = 0; i < arrayRatingsLength; i++) {
        var teacherRating = (arrayRatings[i]["teacher"]);
        var totalRating = teacherRating + totalRating;
        var averageRating = (totalRating / arrayRatingsLength)
    }
    //Sacamos los ratings por sprint
    var ratings1 = arrayRatings[0]["teacher"]
    var ratings2 = arrayRatings[1]["teacher"]
    var ratings3 = arrayRatings[2]["teacher"]
    console.log("La calificación promedio de maestros es de " + averageRating);
    //Buscamos al padre que tendrá el span.
    var averageRatingParent = document.getElementById("teacher-percentage");
    //Quitamos hijo
    averageRatingParent.removeChild(averageRatingParent.lastChild);
    //Creamos un nuevo elemento, un span. 
    var averageRatingNewElement = document.createElement("span");
    //Colocamos el nuevo hijo dentro del padre.
    averageRatingParent.appendChild(averageRatingNewElement);
    averageRatingNewElement.innerText = averageRating.toFixed([2]);
    //!JEDIS RATING
    var totalRating2 = 0;
    for (var i = 0; i < arrayRatingsLength; i++) {
        var teacherRating2 = (arrayRatings[i]["jedi"]);
        var totalRating2 = teacherRating2 + totalRating2;
        var averageRating2 = (totalRating2 / arrayRatingsLength)
    }
    var ratings1j = arrayRatings[0]["jedi"]
    var ratings2j = arrayRatings[1]["jedi"]
    var ratings3j = arrayRatings[2]["jedi"]
    console.log("La calificación promedio de jedis es de " + averageRating2);
    //Buscamos al padre que tendrá el span.
    var averageRating2Parent = document.getElementById("jedi-percentage");
    //Quitamos hijo
    averageRating2Parent.removeChild(averageRating2Parent.lastChild);
    //Creamos un nuevo elemento, un span. 
    var averageRating2NewElement = document.createElement("span");
    //Colocamos el nuevo hijo dentro del padre.
    averageRating2Parent.appendChild(averageRating2NewElement);
    averageRating2NewElement.innerText = averageRating2.toFixed([1]);
    //!TECH SKILLS
    //La fuente del evento, es el select con el id de "Filter"
    var source2 = document.getElementById("filter2");
    //console.log(source);
    //Declaramos que estamos "listening for events" 
    source2.addEventListener("change", getDataTech);
    //Creamos la función getData que va a obtener la data con la que se va a trabajar
    //Dependiendo de qué opción del filtro sea seleccionada.
    function getDataTech(event) {
        // Esta línea de código, identifica el index seleccionado
        var selectedIndex2 = event.target.selectedIndex;
        //console.log(selectedIndex);
        //Esta línea busca cuál es el sprint seleccionado
        var selectedSprint = event.target[selectedIndex2].dataset.sprint;
        //! Obtenemos el array conteniendo las calificaciones TECH del sprint seleccionado
        var sprintTechScore = 0;
        var studentsTechAboveScore = 0;
        for (var i2 = 0; i2 < arrayStudents.length; i2++) {
            sprintTechScore = (arrayStudents[i2].sprints[selectedSprint].score.tech)
            if (sprintTechScore >= 1260) {
                studentsTechAboveScore++;
            }

        }
        console.log("El numero de estudiantes que en TECH pasan el 70% es de " + studentsTechAboveScore);
        //Sacamos el porcentaje de estudiantes por encima del puntaje
        var studentsTechAboveScorePercentage = ((studentsTechAboveScore * 100) / arrayStudentsLength);
        //Sacamos el porcentaje
        var ss = 100 - studentsTechAboveScorePercentage;
        console.log('El porcentaje de estudiantes que en TECH tiene más del 70% es de ' + studentsTechAboveScorePercentage);
        //Buscamos al padre que tendrá el span.
        var studentsTechAboveScoreParent = document.getElementById("techskills-number");
        //Quitamos hijo
        studentsTechAboveScoreParent.removeChild(studentsTechAboveScoreParent.lastChild);
        //Creamos un nuevo elemento, un span. 
        var studentsTechAboveScoreNewElement = document.createElement("span");
        //Colocamos el nuevo hijo dentro del padre.
        studentsTechAboveScoreParent.appendChild(studentsTechAboveScoreNewElement);
        studentsTechAboveScoreNewElement.innerText = studentsTechAboveScore;
        //Buscamos al padre que tendrá el span.
        var studentsTechAboveScoreParent2 = document.getElementById("techskills-percentage");
        //Quitamos hijo
        studentsTechAboveScoreParent2.removeChild(studentsTechAboveScoreParent2.lastChild);
        //Creamos un nuevo elemento, un span. 
        var studentsTechAboveScoreNewElement2 = document.createElement("span");
        //Colocamos el nuevo hijo dentro del padre.
        studentsTechAboveScoreParent2.appendChild(studentsTechAboveScoreNewElement2);
        if (studentsTechAboveScorePercentage < 70) {
            //Agregamos la clase
            studentsTechAboveScoreNewElement2.classList.add("acu-red");
        }
        if (studentsTechAboveScorePercentage > 70) {
            //Agregamos la clase
            studentsTechAboveScoreNewElement2.classList.add("acu-green");
        }
        studentsTechAboveScoreNewElement2.innerText = ((studentsTechAboveScorePercentage.toFixed([1])) + "%");
        // Colocamos la funcionabilidad de google charts
        google.charts.load('current', {
            'packages': ['corechart']
        });
        google.charts.setOnLoadCallback(drawChart);
        // Dibujamos el chart con los valores
        function drawChart() {
            //Create the data table4
            var data4 = google.visualization.arrayToDataTable([
                ['', ''],
                ['Above Score', studentsTechAboveScorePercentage],
                ['Under Score', ss],
            ]);
            // Optional; add a title and set the width and height of the chart
            var options = {
                'width': 390,
                'height': 290,
                is3D: true,
                colors: ['#FFC107', "#FF8F00", '#FFD54F', '#FFECB3'],
                backgroundColor: {
                    fill: 'transparent'
                }
            };
            //Creamos el gráfico
            var chart4 = new google.visualization.PieChart(document.getElementById('piechart4'));
            chart4.draw(data4, options);
        }
    }
    //!HSE SKILLS
    //La fuente del evento, es el select con el id de "Filter"
    var source3 = document.getElementById("filter3");
    //console.log(source);
    //Declaramos que estamos "listening for events" 
    source3.addEventListener("change", getDataHse);
    //Creamos la función getData que va a obtener la data con la que se va a trabajar
    //Dependiendo de qué opción del filtro sea seleccionada.
    function getDataHse(event) {
        // Esta línea de código, identifica el index seleccionado
        var selectedIndex3 = event.target.selectedIndex;
        //console.log(selectedIndex);
        //Esta línea busca cuál es el sprint seleccionado
        var selectedSprint2 = event.target[selectedIndex3].dataset.sprint;
        //! Obtenemos el array conteniendo las calificaciones TECH del sprint seleccionado
        var sprintHseScore = 0;
        var studentsHseAboveScore = 0;
        for (var i2 = 0; i2 < arrayStudents.length; i2++) {
            sprintHseScore = (arrayStudents[i2].sprints[selectedSprint2].score.hse);
            if (sprintHseScore >= 840) {
                studentsHseAboveScore++;
            }
        }
        var percent = studentsHseAboveScore;
        var ss2 = arrayStudents.length - studentsHseAboveScore;
        console.log("El numero de estudiantes que en HSE pasan el 70% es de " + studentsHseAboveScore);
        //Sacamos el porcentaje que está por encima del score
        var studentsHseAboveScorePercentage = ((studentsHseAboveScore * 100) / arrayStudentsLength);
        console.log('El porcentaje de estudiantes que en HSE tiene más del 70% es de ' + studentsHseAboveScorePercentage);
        //Buscamos al padre que tendrá el span.
        var studentsHseAboveScoreParent = document.getElementById("lifeskills-number");
        //Quitamos hijo
        studentsHseAboveScoreParent.removeChild(studentsHseAboveScoreParent.lastChild);
        //Creamos un nuevo elemento, un span. 
        var studentsHseAboveScoreNewElement = document.createElement("span");
        //Colocamos el nuevo hijo dentro del padre.
        studentsHseAboveScoreParent.appendChild(studentsHseAboveScoreNewElement);
        studentsHseAboveScoreNewElement.innerText = studentsHseAboveScore;
        //Buscamos al padre que tendrá el span.
        var studentsHseAboveScoreParent2 = document.getElementById("lifeskills-percentage");
        //Quitamos hijo
        studentsHseAboveScoreParent2.removeChild(studentsHseAboveScoreParent2.lastChild);
        //Creamos un nuevo elemento, un span. 
        var studentsHseAboveScoreNewElement2 = document.createElement("span");
        //Colocamos el nuevo hijo dentro del padre.
        studentsHseAboveScoreParent2.appendChild(studentsHseAboveScoreNewElement2);
        if (studentsHseAboveScorePercentage < 70) {
            //Agregamos la clase
            studentsHseAboveScoreNewElement2.classList.add("acu-red");
        }
        if (studentsHseAboveScorePercentage > 70) {
            //Agregamos la clase
            studentsHseAboveScoreNewElement2.classList.add("acu-green");
        }
        studentsHseAboveScoreNewElement2.innerText = ((studentsHseAboveScorePercentage.toFixed([1])) + "%");
        // Cargamos la funcionabilidad de google
        google.charts.load('current', {
            'packages': ['corechart']
        });
        google.charts.setOnLoadCallback(drawChart);
        // Draw the chart and set the chart values
        function drawChart() {
            //Create the data table5
            var data5 = google.visualization.arrayToDataTable([
                ['', ''],
                ['Above Score', studentsHseAboveScore],
                ['Under Score', ss2],
            ]);
            // Optional; add a title and set the width and height of the chart
            var options = {
                'width': 390,
                'height': 290,
                is3D: true,
                colors: ['#FFC107', "#FF8F00", '#FFD54F', '#FFECB3'],
                backgroundColor: {
                    fill: 'transparent'
                }
            };
            //Dibujamos el nuevo gráfico
            var chart5 = new google.visualization.PieChart(document.getElementById('piechart5'));
            chart5.draw(data5, options);
        }
    }
    /*Añadimos la sección para cambiar de pestaña*/
    var addAndHide = function (event) {
        var tabSeleccionado = event.target.dataset.tabSelect;
        var overview = document.getElementById('section-overview2');
        var students = document.getElementById('section-students');
        var teachers = document.getElementById('section-teachers');
        if (tabSeleccionado === 'section-overview2') { 
            students.style.display = 'none';
            teachers.style.display = 'none';
            overview.style.display = 'block';
        } else if (tabSeleccionado === 'section-students') { 
            students.style.display = 'block';
            teachers.style.display = 'none';
            overview.style.display = 'none';
        } else if (tabSeleccionado === 'section-teachers') { 
            students.style.display = 'none';
            teachers.style.display = 'block';
            overview.style.display = 'none';
        }
    };
    //Creamos la función para cambiar de sección
    var changeSection = function () {
        var tab = document.getElementsByClassName('tab');
        for (var i = 0; i < tab.length; i++) {
            tab[i].addEventListener('click', addAndHide);
        }
    };
    //Llamamos la función
    changeSection();
    // Cargamos la funcionabilidad de google
    google.charts.load('current', {
        'packages': ['corechart']
    });
    google.charts.setOnLoadCallback(drawChart);
    // Draw the chart and set the chart values
    function drawChart() {
        //Create the data table
        var data = google.visualization.arrayToDataTable([
            ['', ''],
            ['Students that meet the target', studentAboveScore],
            ['students that doesnt meet the target', nopass],
        ]);
        //Create the data table2
        var data2 = google.visualization.arrayToDataTable([
            ['', ''],
            ['Promoters', promotersPercentTotal],
            ['Passive', passivePercentTotal],
            ['Detractors', detractorsPercentTotal],
        ]);
        //Create the data table3
        var data3 = google.visualization.arrayToDataTable([
            ['', ''],
            ['Dropout', dropoutNumber],
            ['Active', arrayStudentsLength]
        ]);
        //Create the data table3
        var data7 = google.visualization.arrayToDataTable([
            ['', ''],
            ['Sprint 1', ratings1],
            ['Sprint 2', ratings2],
            ['Sprint 3', ratings3],
        ]);
        //Create the data table3
        var data8 = google.visualization.arrayToDataTable([
            ['', ''],
            ['Sprint 1', ratings1j],
            ['Sprint 2', ratings2j],
            ['Sprint 3', ratings3j],
        ]);
        //Create the data table3
        var data9 = google.visualization.arrayToDataTable([
            ['', ''],
            ['Sprint 1', ff],
            ['Sprint 2', ff2],
            ['Sprint 3', ff3],
        ]);
        // Creamos las opciones
        var options = {
            'width': 390,
            'height': 290,
            is3D: true,
            colors: ['#FFC107', "#FF8F00", '#FFD54F', '#FFECB3'],
            backgroundColor: {
                fill: 'transparent'
            }
        };
        // Creamos las opciones
        var options2 = {
            'width': 390,
            'height': 290,
            pieHole: 0.4,
            colors: ['#FFC107', "#FF8F00", '#FFD54F', '#FFECB3'],
            backgroundColor: {
                fill: 'transparent'
            }
        };
        // Dibujamos los gráficos
        var chart = new google.visualization.PieChart(document.getElementById('piechart'));
        chart.draw(data, options);
        var chart2 = new google.visualization.BarChart(document.getElementById('piechart2'));
        chart2.draw(data2, options);
        var chart3 = new google.visualization.PieChart(document.getElementById('piechart3'));
        chart3.draw(data3, options2);
        var chart7 = new google.visualization.AreaChart(document.getElementById('piechart7'));
        chart7.draw(data7, options);
        var chart8 = new google.visualization.AreaChart(document.getElementById('piechart8'));
        chart8.draw(data8, options);
        var chart9 = new google.visualization.AreaChart(document.getElementById('piechart9'));
        chart9.draw(data9, options);
    }
}
//Para ejecutar el modal al inicio
//Buscamos el modal, el ícono de close y el botón de login
var modal = document.getElementById("myModal");
var close = document.getElementById("close")
var login = document.getElementById("login")
//console.log(source);
//Declaramos que estamos "listening for events" 
//Que el evento se tiene que ejecutar cuando se cargue la página
modal.addEventListener(onload, showModal);
function showModal(event) {
    modal.style.display = "block";
    close.onclick = function () {
        modal.style.display = "none";
    }
    login.onclick = function () {
        modal.style.display = "none";
    }
}

