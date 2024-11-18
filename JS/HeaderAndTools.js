let HeaderAndTools = {
    transitionDuration: 0.3,
    current: "",
    shortHeader: () => {
        console.log("short")

        try {
            document.getElementById("headerSettings").innerHTML = `<svg class="iconMolotok"></svg>`
            document.getElementById("headerSettings").classList.add("square-button")
            document.getElementById("headerSettings").classList.remove("miniButtonWithIcon")
        } catch (e) { }

        document.getElementById("headerMenu").style.display = "flex"

        for (let i of Array.from(document.getElementsByClassName("wideScreen"))) {
            i.style.display = "none"
        }
    },
    longHeader: () => {
        console.log("long")
        try {
            document.getElementById("headerSettings").innerHTML = `<svg class="iconMolotok"></svg>Settings`
            document.getElementById("headerSettings").classList.remove("square-button")
            document.getElementById("headerSettings").classList.add("miniButtonWithIcon")
        } catch (e) { }
        document.getElementById("headerMenu").style.display = "none"

        for (let i of Array.from(document.getElementsByClassName("wideScreen"))) {
            i.style.display = "flex"
        }
    },
    headerUpdate: () => {
        let header = document.getElementsByTagName("header")[0]
        let transitionDuration = HeaderAndTools.transitionDuration
        let current = ""

        if (document.body.offsetWidth <= 1050) {
            current = "shortHeader"
        } else {
            current = "longHeader"
        }

        header.children[0].style.transitionDuration = `${transitionDuration}s`
        if (current !== HeaderAndTools.current) {
            header.children[0].style.scale = "0.7"
            header.children[0].style.opacity = "0"
            setTimeout(() => {
                HeaderAndTools[current]()
                HeaderAndTools.current = current
                header.children[0].style.scale = "1"
                header.children[0].style.opacity = "1"

                for (let i of Array.from(document.getElementsByClassName("initiallyHidden"))) {
                    i.classList.remove("initiallyHidden")
                }
            }, transitionDuration * 1000)
        }
    },
    theme: (type = "") => {
        let root = document.querySelector(':root');
        if (type === "dark") {
            root.style.setProperty('--default-text-color', '#ffffff');
            root.style.setProperty('--default-icon-color', '#ffffff');
            root.style.setProperty('--default-iconContainer-color', '#3a3939');
            root.style.setProperty('--default-btn-color', '#3a3939');
            root.style.setProperty('--body-color', '#191919');
            root.style.setProperty('--tile-color', '#2a2a2a');

            User.basics.theme = "dark"
        } else if (type === "light") {
            root.style.setProperty('--default-text-color', '#1a1a1a');
            root.style.setProperty('--default-icon-color', '#000000');
            root.style.setProperty('--default-iconContainer-color', '#f9f8ff');
            root.style.setProperty('--default-btn-color', '#f9f8ff');
            root.style.setProperty('--body-color', '#f9f8ff');
            root.style.setProperty('--tile-color', '#ffffff');

            User.basics.theme = "light"
        } else {
            root.style.setProperty('--default-text-color', '');
            root.style.setProperty('--default-icon-color', '');
            root.style.setProperty('--default-iconContainer-color', '');
            root.style.setProperty('--default-btn-color', '');
            root.style.setProperty('--body-color', '');
            root.style.setProperty('--tile-color', '');

            User.basics.theme = ""
        }

        storage.edit(User)
    },
    password: () => {

    },
    sports: () => {
        let btn = document.getElementById('headerMenu');
        let modal = new smoothModal("headerMenu", btn);

        modal.modalWindowCSS = `background-color: var(--tile-color); border-radius: 25px; width: 400px; height: 395px; padding: 20px;`
        modal.collapsedElementCloneCSS = `display: flex; align-items: center; justify-content: center; border-radius: 15px; top: 0; left: 0; transition-duration: 0.4s`
        modal.collapsedElementCloneCSSSegueAddition = `border-radius: 25px`
        modal.expandingTime = 0.4
        modal.collapsingTime = 0.4
        modal.collapsedElementCloneHidingTimeout = -0.1
        modal.BtCM = 1

        btn.onclick = () => {
            modal.modalWindowContent = `
            <div class="flex-column" style="gap: 10px">
                <div class="flex-justifyspacebetween" style="gap: 10px; width: 100%">
                    <h3>Menu</h3>
                    <svg id="close" class="iconCross clickable"></svg>
                </div>
                
                <a href="swimming.html">
                    <button class="buttonExercise colorsSwimming clickable bobatron" Bt-CM="0.7" id="buttonSwimming" style="width: 100%; height: 70px">Swimming</button>
                </a>
                <a href="running.html">
                    <button class="buttonExercise colorsRunning clickable bobatron" Bt-CM="0.7" id="buttonRunning" style="width: 100%; height: 70px">Running</button>
                </a>
                <a href="bicycling.html">
                    <button class="buttonExercise colorsBicycling clickable bobatron" Bt-CM="0.7" id="buttonBicycling" style="width: 100%; height: 70px">Bicycling</button>
                </a>
                <a href="climbing.html">
                    <button class="buttonExercise colorsClimbing clickable bobatron" Bt-CM="0.7" id="buttonClimbing" style="width: 100%; height: 70px">Climbing</button>
                </a>
            </div>`

            modal.expand()

            setTimeout(() => {
                bobatron.scanner()

                document.getElementById("close").onclick = () => {
                    modal.collapse()
                }
            }, modal.expandingTime * 1000 + 300)
        }
    },
    settings: () => {
        let btn = document.getElementById('headerSettings');
        let modal = new smoothModal("headerSettings", btn);

        modal.modalWindowCSS = `background-color: var(--tile-color); border-radius: 25px; width: 400px; height: 322px; padding: 20px;`
        modal.collapsedElementCloneCSS = `display: flex; align-items: center; justify-content: center; border-radius: 15px; top: 0; left: 0; transition-duration: 0.4s`
        modal.collapsedElementCloneCSSSegueAddition = `border-radius: 25px`
        modal.expandingTime = 0.4
        modal.collapsingTime = 0.4
        modal.collapsedElementCloneHidingTimeout = -0.1
        modal.BtCM = 1

        btn.onclick = () => {
            modal.modalWindowContent = `
            <div class="flex-column" style="gap: 10px">
                <div class="flex-justifyspacebetween" style="gap: 10px; width: 100%">
                    <h3>Settings</h3>
                    <svg id="close" class="iconCross clickable"></svg>
                </div>
    
                <div class="flex" style="gap: 10px">
                    <div class="iconContainer">
                        <svg class="iconWeight"></svg>
                    </div>
                    <div class="flex-column" style="gap: 10px; width: 100%">
                        <p>Theme</p>
                        <div class="flex" style="gap: 10px; width: 100%">
                            <button onclick="HeaderAndTools.theme('light')">Light</button>
                            <button onclick="HeaderAndTools.theme()">Auto</button>
                            <button onclick="HeaderAndTools.theme('dark')">Dark</button>
                        </div>
                    </div>
                </div>
                
                <div class="flex" style="gap: 10px">
                    <div class="iconContainer">
                        <svg class="iconKey"></svg>
                    </div>
                    <div class="flex-column" style="gap: 10px; width: 100%">
                        <p>Password</p>
                        <div class="flex" style="gap: 10px; width: 100%">
                            <input type="password" id="password" name="password" required="" style="transition-duration: 0.3s" placeholder="${User.basics.pwd.length ? '•'.repeat(User.basics.pwd.length) : "No password"}">
                            <button id="savePassword" style="max-width: 95px">Save</button>
                        </div>
                        <p>Warning! Data is not encrypted!</p>
                    </div>
                </div>
            </div>`
            
            modal.expand()

            setTimeout(() => {
                let savePassword = document.getElementById('savePassword')
                let password = document.getElementById('password')
                savePassword.onclick = () => {
                    User.basics.pwd = password.value
                    password.placeholder = User.basics.pwd.length ? '•'.repeat(User.basics.pwd.length) : "No password"
                    password.classList.add("accepted")
                    storage.edit(User)
                    setTimeout(() => {
                        password.classList.remove("accepted")
                    }, 300)
                }

                document.getElementById("close").onclick = () => {
                    modal.collapse()
                }
            }, modal.expandingTime * 1000)
        }
    }
}