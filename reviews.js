import Swiper from '.swiper';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';


const section = document.querySelector(".reviews-section");

if(section){
    const list = section.querySelector(".reviews-items");
    const backButton = section.querySelector(".reviews-button-prev");
    const nextButton = section.querySelector(".reviews-button-next");


    async function getReviews(value){
        const BASE_URL = "https://portfolio-js.b.goit.study/api"
        const END_POINT = "/reviews";

        const url = BASE_URL + END_POINT;

        try{
         const res = await fetch(url);

         return res.json()
        }catch (err){
            console.log(err);
            iziToast.error({
                position: "topRight",
                message: "Not Found",
            });
            return[];
        }
    }


    function renderCardReview(data){
        return data 
        .map(review => `
            <li class="reviews-card swiper-slide">
            <img class="reviews-card-img" src="${review.avatar_url}" alt="${review.author}'s avatar">
            <div class="reviews-card-data">
              <h3 class="reviews-card-name">${review.author}</h3>
              <p class="review-text">${review.review}</p>
            </div>
          </li> 
            `).join("");
    }

async function renderCardReview(){
    try{
        const data = await getReviews();

        if(data.length > 0){
            const markup = renderCardReview(data);
            list.insertAdjacentHTML("beforeend", markup);

         const $swiper = new Swiper(section.querySelector(".swiper"), {
            modules: [Navigation, Autoplay],

            breakpoints: {
                320: {
                    slidePerView: 1,
                    loop: false,
                },
                768: {
                    slidePerView: 2,
                    spaceBetween: 16,
                    loop: false,
                },
                1440: {
                    slidePerView: 4,
                    spaceBetween: 16,
                    loop: false,
                },
            },

            autoplay: {
                delay: 3000,
                disableOnInteraction: true,
                pauseOnMouse: true,
            },
            keyboard: {
                enable: true,
                onlyInViewport: true,
                pageUpDown: true,
            },
            navigation: {
                nextEl: ".reviews-button-nex",
                prevEl: ".reviews-button-prev",
            },
         });
     document.addEventListener("keydown", event =>{ 
if( event.key === "ArrowRight"){
    $swiper.slideNext();
}else if(event.key === "Tab"){
    const focusedElement = document.activeElement;
    if(focusedElement === prevButton){
        event.preventDefault();
        nextButton.focus();
    }else if(focusedElement === nextButton){
        event.preventDefault();
        prevButton.focus();
    }
   }
 });
}else{
    console.log("No reviews to display");
}
}catch(err){
    console.log(err);
    iziToast.error({
        position: "topRight",
        message: "Failed to load reviews",
    });
}
}
renderCardReview();

}



