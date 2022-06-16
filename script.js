
// burger bar
let navigation = document.getElementById('nav-block');
let burgerButton = document.getElementById('burger-bar');
let topChild = document.getElementById('top-child');
let middleChild = document.getElementById('middle-child');
let bottomChild = document.getElementById('bottom-child');

burgerButton.addEventListener('click', function(){
    navigation.classList.toggle('activeNavigation');
    topChild.classList.toggle('top');
    middleChild.classList.toggle('middle');
    bottomChild.classList.toggle('bottom');
});



