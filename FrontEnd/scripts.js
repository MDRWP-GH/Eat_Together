import { createIcons, icons } from 'lucide';
const API_BASE_URL = "http://localhost:5000";

fetch(API_BASE_URL + "/api/restaurants")
    .then(response => response.json())
    .then(data => {
        data.forEach(restaurant => {
            const img = document.createElement("img");
            img.src = API_BASE_URL + "/uploads/" + restaurant.image; // ดึงรูปจาก Backend
            document.body.appendChild(img);
        });
    });

document.addEventListener("DOMContentLoaded", function() {
    fetchRestaurants(); // ดึงข้อมูลร้านอาหารเมื่อหน้าเว็บโหลดเสร็จ
    // ทำให้หน้าเว็บค่อยๆ แสดงขึ้น
    document.body.style.opacity = "1";

    const fadeSections = document.querySelectorAll(".fade-section");

    const fadeInOnScroll = () => {
        fadeSections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (sectionTop < windowHeight - 50) {
                section.classList.add("fade-in");
            }
        });
    };

    function fetchRestaurants() {
        fetch("http://localhost:5000/api/restaurants") // เรียก API จาก Backend
            .then(response => response.json())
            .then(data => {
                displayRestaurants(data);
            })
            .catch(error => console.error("Error fetching data:", error));
    }

    function displayRestaurants(restaurants) {
        const container = document.getElementById("restaurant-list");
        container.innerHTML = ""; // ล้างข้อมูลเดิมก่อน
    
        restaurants.forEach(restaurant => {
            const div = document.createElement("div");
            div.classList.add("restaurant-card");
    
            div.innerHTML = `
                <h3>${restaurant.name}</h3>
                <img src="http://localhost:5000/uploads/${restaurant.image}" alt="${restaurant.name}" class="restaurant-image">
                <p>คะแนน: ${restaurant.rating} ⭐</p>
                <p>${restaurant.description}</p>
            `;
    
            container.appendChild(div);
        });
    }

    console.log("Scripts loaded successfully!");

    // ตรวจสอบเมื่อมีการเลื่อนหน้า
    window.addEventListener("scroll", fadeInOnScroll);
    
    // เรียกใช้ฟังก์ชันตอนโหลดหน้า
    fadeInOnScroll();
});
