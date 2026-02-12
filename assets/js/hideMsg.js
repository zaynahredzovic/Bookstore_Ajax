const success = document.querySelector('.success');
const loader = document.querySelector('.loader-section');

if(success){
    setTimeout(() => {
        success.style.display = 'none';
    }, 5000);
}

// necessaz for the course, annoying while testing
// if(loader){
//     setTimeout(() => {
//         loader.style.display = 'none';
//     }, 4000);
// }
