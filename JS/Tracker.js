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

    basicsWindow.modalWindowCSS = `background-color: var(--tile-color); border-radius: 25px; width: 400px; height: 322px; padding: 20px;`
    basicsWindow.collapsedElementCloneCSS = `display: flex; align-items: center; justify-content: center; border-radius: 15px; top: 0; left: 0; transition-duration: 0.4s`
    basicsWindow.collapsedElementCloneCSSSegueAddition = `border-radius: 25px`
    basicsWindow.expandingTime = 0.4
    basicsWindow.collapsingTime = 0.4
    basicsWindow.collapsedElementCloneHidingTimeout = -0.1
    basicsWindow.BtCM = 1

    btn.onclick = () => {
        basicsWindow.modalWindowContent = `
            <div class="flex-column" style="gap: 10px;" id="basicsWindow">
                <div class="flex-justifyspacebetween" style="gap: 10px; width: 100%">
                    <h3>Weight &amp; Height</h3>
                    <svg id="close" class="iconCross clickable"></svg>
                </div>
    
                <div class="flex" style="gap: 10px">
                    <div class="iconContainer">
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
                    <div class="iconContainer">
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
                        input.classList.add("mistake", "shake");
                        setTimeout(() => {
                            input.classList.remove("shake")
                        }, 300)
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

let stepsAndGoalEdit = () => {
    let btn = document.getElementById("buttonStepsGoal");
    let stepsWindow = new smoothModal("stepsButton", btn);

    stepsWindow.modalWindowCSS = `background-color: var(--tile-color); border-radius: 25px; width: 400px; height: 322px; padding: 20px;`;
    stepsWindow.collapsedElementCloneCSS = `display: flex; align-items: center; justify-content: center; border-radius: 15px; top: 0; left: 0; transition-duration: 0.4s`;
    stepsWindow.collapsedElementCloneCSSSegueAddition = `border-radius: 25px`;
    stepsWindow.expandingTime = 0.4;
    stepsWindow.collapsingTime = 0.4;
    stepsWindow.collapsedElementCloneHidingTimeout = -0.1;
    stepsWindow.BtCM = 1;

    btn.onclick = () => {
        const date = new Date();
        let currentDate = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
        let todayStats = User.activity.steps.stats.find(entry => entry.date === currentDate);
        let currentSteps = todayStats ? todayStats.steps : 0;

        stepsWindow.modalWindowContent = `
            <div class="flex-column" style="gap: 10px;" id="stepsWindow">
                <div class="flex-justifyspacebetween" style="gap: 10px; width: 100%">
                    <h3>Steps &amp; Goal</h3>
                    <svg id="close" class="iconCross clickable"></svg>
                </div>
    
                <div class="flex" style="gap: 10px">
                    <div class="iconContainer">
                        <svg class="iconSneaker"></svg>
                    </div>
                    <div class="flex-column" style="gap: 10px; width: 100%">
                        <p>Steps Today</p>
                        <div class="flex" style="gap: 10px; width: 100%">
                            <button id="decreaseSteps" class="clickable">-</button>
                            <input type="text" id="steps" name="steps" required value="${currentSteps}">
                            <button id="increaseSteps" class="clickable">+</button>
                        </div>
                    </div>
                </div>
                
                <div class="flex" style="gap: 10px">
                    <div class="iconContainer">
                        <svg class="iconGoal"></svg>
                    </div>
                    <div class="flex-column" style="gap: 10px; width: 100%">
                        <p>Steps Goal</p>
                        <div class="flex" style="gap: 10px; width: 100%">
                            <input type="text" id="goal" name="goal" required value="${User.activity.steps.goal}">
                            <p style="min-width: 40px; align-self: center">st.</p>
                        </div>
                    </div>
                </div>
                
                <button class="clickable" id="save">Save!</button>
            </div>
        `;
        stepsWindow.expand();

        setTimeout(() => {
            document.getElementById("close").onclick = () => {
                stepsWindow.collapse();
            };

            document.getElementById("decreaseSteps").onclick = () => {
                let stepsInput = document.getElementById("steps");
                let stepsValue = parseInt(stepsInput.value) || 0;
                stepsInput.value = Math.max(0, stepsValue - 100); // Decrease by 100 steps
            };

            document.getElementById("increaseSteps").onclick = () => {
                let stepsInput = document.getElementById("steps");
                let stepsValue = parseInt(stepsInput.value) || 0;
                stepsInput.value = stepsValue + 100; // Increase by 100 steps
            };

            document.getElementById("save").onclick = () => {
                let pass = true;
                let stepsInput = document.getElementById("steps");
                let goalInput = document.getElementById("goal");

                // Validate Steps Input
                let stepsValue = parseInt(stepsInput.value);
                if (stepsValue >= 0 && Number.isInteger(stepsValue)) {
                    stepsInput.classList.remove("mistake");
                } else {
                    stepsInput.classList.add("mistake", "shake");
                    setTimeout(() => { stepsInput.classList.remove("shake"); }, 300);
                    pass = false;
                }

                // Validate Goal Input
                let goalValue = parseInt(goalInput.value);
                if (goalValue > 0 && Number.isInteger(goalValue)) {
                    goalInput.classList.remove("mistake");
                } else {
                    goalInput.classList.add("mistake", "shake");
                    setTimeout(() => { goalInput.classList.remove("shake"); }, 300);
                    pass = false;
                }

                if (pass) {
                    // Update today's stats or add a new record
                    if (todayStats) {
                        todayStats.steps = stepsValue;
                    } else {
                        User.activity.steps.stats.push({ date: currentDate, steps: stepsValue });
                    }

                    // Update goal
                    User.activity.steps.goal = goalValue;

                    storage.edit(User);
                    updateDashboard();

                    sounds.click.play().then(r => undefined);
                    stepsWindow.collapse();
                } else {
                    sounds.error.play().then(r => undefined);
                }
            };
        }, stepsWindow.expandingTime * 1000);
    };
};

let updateDashboard = () => {
    let basics = {
        weight: User.basics.weight.length > 0 ? getLast(User.basics.weight)[0] : 0,
        height: User.basics.height.length > 0 ? getLast(User.basics.height)[0] : 0,
    };

    let steps = {
        current: User.activity.steps.stats.length > 0 ? getLast(User.activity.steps.stats).steps : 0,
        goal: User.activity.steps.goal > 0 ? User.activity.steps.goal : 10000,
    };

    // Update Weight and Height
    document.getElementById("dashboardWeight").innerHTML = `${basics.weight} kg`;
    document.getElementById("dashboardHeight").innerHTML = `${basics.height} cm`;

    // BMI Calculation and Chart Update
    let BMI = basics.weight / Math.pow(basics.height / 100, 2);
    let BMImax = 40;
    let BMIColor = "#656565";

    if (BMI === 0 || !BMI) { BMIColor = "#656565"; }
    else if (BMI < 16) { BMIColor = "#fd9f41"; }
    else if (BMI < 18.5) { BMIColor = "#ffee14"; }
    else if (BMI < 25) { BMIColor = "#85f146"; }
    else if (BMI < 30) { BMIColor = "#f18c6d"; }
    else if (BMI < 35) { BMIColor = "#f34c2f"; }
    else if (BMI >= 35) { BMIColor = "#ff1d00"; }

    let dashboardBMIChart = document.getElementById("dashboardBMIChart");
    document.getElementById("dashboardBMI").innerHTML = `${Math.round(BMI) || 0}`;
    dashboardBMIChart.style.cssText = `--p: ${(BMI / BMImax) * 100}; --c: ${BMIColor}`;
    dashboardBMIChart.classList.remove("animate");
    setTimeout(() => { dashboardBMIChart.classList.add("animate"); }, 10);

    // Steps Progress Calculation and Chart Update
    let stepsProgress = (steps.current / steps.goal) * 100;
    let stepsColor = stepsProgress >= 100 ? "#85f146" : "#f18c6d";

    let dashboardStepsChart = document.getElementById("dashboardStepsChart");
    dashboardStepsChart.innerHTML = `<h1>${steps.current}</h1>`
    document.getElementById("dashboardSteps").innerHTML = `${steps.current} st.`;
    document.getElementById("dashboardGoal").innerHTML = `${steps.goal} st.`;
    dashboardStepsChart.style.cssText = `--p: ${Math.min(stepsProgress, 100)}; --c: ${stepsColor}`;
    dashboardStepsChart.classList.remove("animate");
    setTimeout(() => { dashboardStepsChart.classList.add("animate"); }, 10);
};



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

let launch = () => {
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
    stepsAndGoalEdit()
    updateWeightChart()

    HeaderAndTools.headerUpdate()
    HeaderAndTools.settings()
    HeaderAndTools.sports()

    window.addEventListener('resize', () => {
        HeaderAndTools.headerUpdate()
    })
}

window.addEventListener("DOMContentLoaded", () => {
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

    window.scrollTo(0, 0)
    HeaderAndTools.theme(User.basics.theme)

    if (User.basics.pwd) {
        let passwordWindow = new smoothModal("passwordWindow", document.getElementById('passwordWindow'))

        passwordWindow.modalWindowCSS = `background-color: var(--tile-color); border-radius: 25px; width: 400px; height: 160px; padding: 20px;`
        passwordWindow.collapsedElementCloneCSS = `display: flex; align-items: center; justify-content: center; border-radius: 15px; top: 0; left: 0; transition-duration: 0.4s`
        passwordWindow.collapsedElementCloneCSSSegueAddition = `border-radius: 25px !important`
        passwordWindow.expandingTime = 0.4
        passwordWindow.collapsingTime = 0.4
        passwordWindow.collapsedElementCloneHidingTimeout = 0.7
        passwordWindow.BtCM = 1
        passwordWindow.escCollapse = false

        passwordWindow.modalWindowContent = `
            <div class="flex-column" style="gap: 10px;" id="basicsWindow">
                <div class="flex-justifyspacebetween" style="gap: 10px; width: 100%">
                    <h3>Tracker is locked!</h3>
                </div>
                
                <div class="flex" style="gap: 10px">
                    <div class="iconContainer">
                        <svg class="iconKey"></svg>
                    </div>
                    <div class="flex-column" style="gap: 10px; width: 100%">
                        <p>Enter password</p>
                        <div class="flex" style="gap: 10px; width: 100%">
                            <input type="password" id="password" name="password" required="" placeholder="Password...">
                            <button style="max-width: 95px" id="login">Login</button>
                        </div>
                    </div>
                </div>
            </div>
        `

        passwordWindow.expand()

        let attemptOnEnter = (ev) => {
            if (ev.key === "Enter") {
                attemptLogin()
            }
        }

        let attemptLogin = () => {
            let password = document.getElementById('password')

            if (User.basics.pwd === password.value) {
                document.removeEventListener("keydown", attemptOnEnter)
                passwordWindow.collapse()
                launch()
            } else {
                password.classList.add("mistake");
                let windowFrame = document.getElementById('BobatronModal_passwordWindow').children[0]
                windowFrame.classList.add("shake")
                setTimeout(() => {
                    windowFrame.classList.remove("shake")
                }, 300)
            }
        }

        setTimeout(() => {
            document.addEventListener("keydown", attemptOnEnter)

            document.getElementById('login').onclick = () => {
                attemptLogin()
            }

        }, passwordWindow.expandingTime * 1000)
    } else { launch() }
})
