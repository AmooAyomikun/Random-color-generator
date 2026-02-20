const colorDisplayEl = document.getElementById('color-display')
const colorCode = document.getElementById('color-code')
const generateBtn = document.getElementById('generateBtn')
const copyBtn = document.getElementById('copy-code')
const toggleBtnEl = document.getElementById('toggleBtn')
const historyContainer = document.getElementById('color-history')

let currentMode = 'hex'

let colorHistory = []

function hexColor(){
    let char = "#"
    let hexChar = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F']
    let loopNum = 6

    for (let i = 0; i < loopNum; i++) {
        const randomIndex = Math.floor(Math.random() * hexChar.length)
        let randomColor = hexChar[randomIndex]
        char += randomColor
    }

    colorDisplayEl.style.backgroundColor = char
    colorCode.textContent = char
    colorHistory.push(char)
    renderHistory()
}

function rgbColor(){
    let red = Math.floor(Math.random() * 256)
    let green = Math.floor(Math.random() * 256)
    let blue = Math.floor(Math.random() * 256)

    let rgbColorGenerated = `rgb(${red}, ${green}, ${blue})`

    colorDisplayEl.style.backgroundColor = rgbColorGenerated
    colorCode.textContent = rgbColorGenerated

    colorHistory.push(rgbColorGenerated)
    renderHistory()
}

function renderHistory(){
    historyContainer.innerHTML = "";

    colorHistory.slice(-25).forEach(function(color){
        const colorBox = document.createElement('div')
        colorBox.classList.add('history-item')
        colorBox.style.backgroundColor = color
        colorBox.title = color

        colorBox.addEventListener('click', function(){
            colorDisplayEl.style.backgroundColor = color
            colorCode.innerText = color
        })

        historyContainer.appendChild(colorBox)
    })

    
}


generateBtn.addEventListener('click', function(){
    if(currentMode === "hex"){
        hexColor()
    }else{
        rgbColor()
    }


})

toggleBtnEl.addEventListener('click', function(){
    if(currentMode === 'hex'){
        currentMode = 'rgb';
        toggleBtnEl.textContent = "Switch to Hex mode" 
    }else{
        currentMode = 'hex'
        toggleBtnEl.textContent = "Switch to RGB mode"
    }
})


copyBtn.addEventListener('click', function(){
    if(!colorCode.textContent){
        copyBtn.innerText = 'Generate color first';
        copyBtn.style.color = 'red';
        setTimeout(() => {
            copyBtn.innerText = 'Copy Code'
            copyBtn.style.color = ''
        }, 2000)
        return
    }else{
        navigator.clipboard.writeText(colorCode.textContent)
        copyBtn.innerText = "copied"
        copyBtn.style.color ='green'
        setTimeout(() => {
            copyBtn.innerText = 'Copy Code'
            copyBtn.style.color = ''
        }, 2000)
    }
})






