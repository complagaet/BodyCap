document.addEventListener('DOMContentLoaded', function() {     
    const progressButton = document.getElementById('progressButton');     
    const feedbackMessage = document.getElementById('feedbackMessage');     
    const feedbackBox = document.getElementById('feedbackBox');     
    const closeFeedback = document.getElementById('closeFeedback');          

    progressButton.addEventListener('click', function() {         
        const ageSelect = document.querySelector('select');         
        const kmRanInput = document.getElementById('kmRanInput');         
        const selectedAge = ageSelect.value;         
        const kmRan = parseFloat(kmRanInput.value); 
        let message = '';          
        let minKm = 0, maxKm = 0;  
        switch (selectedAge) {             
            case '17-21':                 
                minKm = 4; maxKm = 6;
                break;             
            case '22-26':                 
                minKm = 4; maxKm = 5;
                break;             
            case '27-31':                 
                minKm = 3.5; maxKm = 5;
                break;             
            case '32-36':                 
                minKm = 3; maxKm = 4.5;
                break;             
            case '37-41':                 
                minKm = 3; maxKm = 4;
                break;             
            case '42-46':                 
                minKm = 2.5; maxKm = 4;
                break;             
            case '47-51':                 
                minKm = 2; maxKm = 3.5;
                break;             
            case '52-56':                 
                minKm = 2; maxKm = 3;
                break;             
            case '57-61':                 
                minKm = 1.5; maxKm = 3;
                break;             
            case '62+':                 
                minKm = 1; maxKm = 2;
                break;             
            default:                 
                message = "Please select an age category.";         
        }          

        if (kmRan < minKm) {
            feedbackBox.style.backgroundColor = 'red';  
            message = `Keep trying! You ran ${kmRan} km, but you need to run at least ${minKm} km.`;
        } else if (kmRan >= minKm && kmRan <= maxKm) {
            feedbackBox.style.backgroundColor = 'gold';  
            message = `Great job! You ran ${kmRan} km, which is within your recommended range of ${minKm}-${maxKm} km.`;
        } else {
            feedbackBox.style.backgroundColor = 'green';
            message = `Awesome! You ran ${kmRan} km, which is more than the recommended ${maxKm} km. Keep up the great work!`;
        }

        feedbackMessage.innerHTML = message;         
        feedbackBox.style.display = 'block';     
    });      

    closeFeedback.addEventListener('click', function() {         
        feedbackBox.style.display = 'none';     
    }); 
});
