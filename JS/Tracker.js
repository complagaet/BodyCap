const storage = new Storage("BodyCap", User)
User = storage.data
let charts = {}
let sounds = {
    click: new Audio('../WAV/mixkit-click.wav'),
    error: new Audio('../WAV/mixkit-error.wav'),
}


let getLast = (arr) => {
    return arr[arr.length - 1]
}

let basicsEdit = () => {
    let btn = document.getElementById("buttonBasics")
    let basicsWindow = new smoothModal("basicsButton", btn);

    basicsWindow.modalWindowCSS = `background-color: white; border-radius: 25px; width: 400px; height: 322px; padding: 20px;`
    basicsWindow.collapsedElementCloneCSS = `display: flex; align-items: center; justify-content: center; border-radius: 15px; top: 0; left: 0; transition-duration: 0.4s`
    basicsWindow.collapsedElementCloneCSSSegueAddition = `border-radius: 25px`
    basicsWindow.expandingTime = 0.4
    basicsWindow.collapsingTime = 0.4
    basicsWindow.collapsedElementHidingTimeout = -0.1
    basicsWindow.BtCM = 1

    btn.onclick = () => {
        basicsWindow.modalWindowContent = `
            <div class="flex-column" style="gap: 10px">
                <div class="flex-justifyspacebetween" style="gap: 10px; width: 100%">
                    <h3>Weight &amp; Height</h3>
                    <svg id="close" class="iconCross clickable"></svg>
                </div>
    
                <div class="flex" style="gap: 10px">
                    <div class="iconContainer" style="background-color: #f9f8ff">
                        <svg class="iconWeight"></svg>
                    </div>
                    <div class="flex-column" style="gap: 10px; width: 100%">
                        <p>Weight</p>
                        <div class="flex" style="gap: 10px; width: 100%">
                            <input type="text" id="weight" name="weight" required="" value="${User.basics.weight.length > 0 ? getLast(User.basics.weight)[0] : 0}">
                            <p style="min-width: 40px; align-self: center">kg</p>
                        </div>
                    </div>
                </div>
                
                <div class="flex" style="gap: 10px">
                    <div class="iconContainer" style="background-color: #f9f8ff">
                        <svg class="iconHeight"></svg>
                    </div>
                    <div class="flex-column" style="gap: 10px; width: 100%">
                        <p>Height</p>
                        <div class="flex" style="gap: 10px; width: 100%">
                            <input type="text" id="height" name="height" required="" value="${User.basics.height.length > 0 ? getLast(User.basics.height)[0] : 0}">
                            <p style="min-width: 40px; align-self: center">cm</p>
                        </div>
                    </div>
                </div>
                
                <button class="clickable" id="save">Save!</button>
            </div>
        `
        basicsWindow.expand()

        setTimeout(() => {
            document.getElementById("close").onclick = () => {
                basicsWindow.collapse();
            }

            const date = new Date();
            let currentDate = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;

            let ids = ["weight", "height"]
            let data = {
                weight: [0, ""],
                height: [0, ""],
            }
            document.getElementById("save").onclick = () => {
                let pass = true
                for (let i of ids) {
                    let input = document.getElementById(i)
                    input.value = input.value.replace(",", ".")
                    let isFloat = /^\d*(\.\d+)?$/.test(document.getElementById(i).value);
                    let isPositive = parseFloat(document.getElementById(i).value) > 0
                    if (isFloat && isPositive) {
                        input.classList.remove("mistake");
                        data[i][0] = parseFloat(input.value);
                        data[i][1] = currentDate;
                        pass *= true
                    } else {
                        input.classList.add("mistake");
                        pass *= false
                    }
                }

                if (pass) {
                    User.basics.weight.push(data.weight)
                    User.basics.height.push(data.height)
                    storage.edit(User)
                    updateDashboard()
                    updateWeightChart()
                    sounds.click.play().then(r => undefined);
                    basicsWindow.collapse()
                } else {
                    sounds.error.play().then(r => undefined);
                }
            }
        }, basicsWindow.expandingTime * 1000)
    }
}

let updateDashboard = () => {
    let basics = {
        weight: User.basics.weight.length > 0 ? getLast(User.basics.weight)[0] : 0,
        height: User.basics.height.length > 0 ? getLast(User.basics.height)[0] : 0
    }
    document.getElementById("dashboardWeight").innerHTML = `${basics.weight} kg`
    document.getElementById("dashboardHeight").innerHTML = `${basics.height} cm`

    // BMI = kg/m2
    let BMI = basics.weight / Math.pow((basics.height / 100), 2)
    let BMImax = 40
    let BMIColor = "#656565"
    if (BMI === 0 || !BMI) { BMIColor = "#656565"; }
    else if (BMI < 16) { BMIColor = "#fd9f41"; }
    else if (BMI < 18.5) { BMIColor = "#ffee14"; }
    else if (BMI < 25) { BMIColor = "#85f146"; }
    else if (BMI < 30) { BMIColor = "#f18c6d"; }
    else if (BMI < 35) { BMIColor = "#f34c2f"; }
    else if (BMI >= 35) { BMIColor = "#ff1d00"; }

    let dashboardBMIChart = document.getElementById("dashboardBMIChart")
    document.getElementById("dashboardBMI").innerHTML = `${Math.round(BMI) ? Math.round(BMI) : 0}`
    dashboardBMIChart.style.cssText = `--p: ${BMI / BMImax * 100}; --c: ${BMIColor}`
    dashboardBMIChart.classList.remove("animate")
    setTimeout(() => { dashboardBMIChart.classList.add("animate") }, 10)
}

let updateWeightChart = () => {
    const data = User.basics.weight.map(entry => entry[0])
    const labels = User.basics.weight.map(entry => entry[1])

    charts.weight.data = {
        labels: labels,
        datasets: [
            {
                tension: 0.4,
                label: 'Weight',
                data: data,
                backgroundColor: "#1a1a1a",
                borderColor: "#1a1a1a",
            }
        ]
    }
    charts.weight.options.scales.y = {
        suggestedMin: Math.min(...data) - 0.5,
        suggestedMax: Math.max(...data) + 0.5
    }

    charts.weight.update();
}

window.addEventListener("load", () => {
    charts = {
        weight: new Chart(document.getElementById('chartWeight'), {
            type: "line",
            options: {
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        })
    }

    let sections = document.getElementsByTagName("section")
    window.scrollTo(0, 0)
    for (let i = 0; i < sections.length; i++) {
        let section = sections[i]
        section.style.transform = "translateY(0)"
        section.style.opacity = "1"
        section.style.transitionDelay = `${0.1 * i}s`
        setTimeout(() => { window.scrollTo(0, 0) }, 0.1 * i * 1000)
    }

    bobatron.scanner()
    window.addEventListener("resize", () => {
        bobatron.scanner()
    })

    updateDashboard()
    basicsEdit()
    updateWeightChart()
})
