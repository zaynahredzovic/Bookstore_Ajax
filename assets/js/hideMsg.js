function hideMsg() {
    const alert = document.querySelector('.alert');
    //const loader = document.querySelector('.loader-section');
    
    if(alert){
        setTimeout(() => {
            alert.style.display = 'none';
        }, 5000);
    }
    
    // necessaz for the course, annoying while testing
    // if(loader){
    //     setTimeout(() => {
    //         loader.style.display = 'none';
    //     }, 4000);
    // }
    
}

hideMsg();