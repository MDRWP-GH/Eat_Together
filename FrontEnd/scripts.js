import { createIcons, icons } from 'lucide';

document.addEventListener("DOMContentLoaded", function() {
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

    console.log("Scripts loaded successfully!");

    // ตรวจสอบเมื่อมีการเลื่อนหน้า
    window.addEventListener("scroll", fadeInOnScroll);
    
    // เรียกใช้ฟังก์ชันตอนโหลดหน้า
    fadeInOnScroll();
});
