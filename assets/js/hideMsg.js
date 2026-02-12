const success = document.querySelector('.success');
const loader = document.querySelector('.loader-section');

if(success){
    setTimeout(() => {
        success.style.display = 'none';
    }, 5000);
}

if(loader){
    setTimeout(() => {
        loader.style.display = 'none';
    }, 4000);
}
