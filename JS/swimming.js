let sounds = {
    click: new Audio('../WAV/mixkit-click.wav'),
    error: new Audio('../WAV/mixkit-error.wav'),
}

document.addEventListener('DOMContentLoaded', function() {     
    const progressButton = document.getElementById('progressButton');     
    const feedbackMessage = document.getElementById('feedbackMessage');     
    const feedbackBox = document.getElementById('feedbackBox');     
    const closeFeedback = document.getElementById('closeFeedback');          

    progressButton.addEventListener('click', function() { 
        sounds.click.play();        
        const ageSelect = document.querySelector('select');         
        const metersSwamInput = document.getElementById('metersSwamInput');         
        const selectedAge = ageSelect.value;         
        const metersSwam = parseFloat(metersSwamInput.value);
        let message = '';          
        let minMeters = 0, maxMeters = 0;
        
        switch (selectedAge) {             
            case '17-21':                 
                minMeters = 500; maxMeters = 800;
                break;             
            case '22-26':                 
                minMeters = 450; maxMeters = 700;
                break;             
            case '27-31':                 
                minMeters = 400; maxMeters = 650;
                break;             
            case '32-36':                 
                minMeters = 350; maxMeters = 600;
                break;             
            case '37-41':                 
                minMeters = 300; maxMeters = 550;
                break;             
            case '42-46':                 
                minMeters = 250; maxMeters = 500;
                break;             
            case '47-51':                 
                minMeters = 200; maxMeters = 450;
                break;             
            case '52-56':                 
                minMeters = 150; maxMeters = 400;
                break;             
            case '57-61':                 
                minMeters = 100; maxMeters = 350;
                break;             
            case '62+':                 
                minMeters = 50; maxMeters = 200;
                break;             
            default:                 
                message = "Please select an age category.";         
        }          

        if (metersSwam < minMeters) {
            feedbackBox.style.backgroundColor = 'white';  
            message = `Keep trying! You swam ${metersSwam} meters, but you need to swim at least ${minMeters} meters.`;
        } else if (metersSwam >= minMeters && metersSwam <= maxMeters) {
            feedbackBox.style.backgroundColor = 'white';  
            message = `Great job! You swam ${metersSwam} meters, which is within your recommended range of ${minMeters}-${maxMeters} meters.`;
        } else {
            feedbackBox.style.backgroundColor = 'white';  
            message = `Awesome! You swam ${metersSwam} meters, which is more than the recommended ${maxMeters} meters. Keep up the great work!`;
        }

        feedbackMessage.innerHTML = message;         
        feedbackBox.style.display = 'block';     
    });      

    closeFeedback.addEventListener('click', function() {         
        feedbackBox.style.display = 'none';     
    }); 
});
