
        // Theme Toggle Logic
        const themeToggleBtn = document.getElementById('theme-toggle');
        const darkIcon = document.getElementById('theme-icon-dark');
        const lightIcon = document.getElementById('theme-icon-light');

        themeToggleBtn.addEventListener('click', () => {
            if (document.documentElement.classList.contains('dark')) {
                document.documentElement.classList.remove('dark');
                localStorage.setItem('theme', 'light');
                darkIcon.classList.remove('hidden');
                lightIcon.classList.add('hidden');
            } else {
                document.documentElement.classList.add('dark');
                localStorage.setItem('theme', 'dark');
                darkIcon.classList.add('hidden');
                lightIcon.classList.remove('hidden');
            }
        });

        // Typing Header Animation
        const phrases = ["MERN Stack Web Apps", "Gen AI Integration", "RESTful APIs & JWT Auth", "Interactive React UIs"];
        let phraseIdx = 0;
        let charIdx = 0;
        let isDeleting = false;
        const typingElement = document.getElementById('typing-text');

        function typeEffect() {
            const currentPhrase = phrases[phraseIdx];
            if (isDeleting) {
                typingElement.textContent = currentPhrase.substring(0, charIdx - 1);
                charIdx--;
            } else {
                typingElement.textContent = currentPhrase.substring(0, charIdx + 1);
                charIdx++;
            }

            let typeSpeed = isDeleting ? 40 : 80;

            if (!isDeleting && charIdx === currentPhrase.length) {
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIdx === 0) {
                isDeleting = false;
                phraseIdx = (phraseIdx + 1) % phrases.length;
                typeSpeed = 500;
            }

            setTimeout(typeEffect, typeSpeed);
        }
        typeEffect();

        // Project Filter Functionality
        const filterBtns = document.querySelectorAll('.project-filter-btn');
        const projectCards = document.querySelectorAll('.project-card');

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => {
                    b.classList.remove('bg-brand-500', 'text-white', 'shadow-lg');
                    b.classList.add('glass-card', 'text-slate-700', 'dark:text-slate-300');
                });
                btn.classList.remove('glass-card', 'text-slate-700', 'dark:text-slate-300');
                btn.classList.add('bg-brand-500', 'text-white', 'shadow-lg');

                const filter = btn.getAttribute('data-filter');
                projectCards.forEach(card => {
                    if (filter === 'all' || card.getAttribute('data-category').includes(filter)) {
                        card.style.display = 'flex';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });

        // Modal Logic & Data
        const projectsData = {
            project1: {
                title: "CollabSphere - Collaboration Platform (Mini GitHub + Notion)",
                body: `<p class="mb-3">Full-stack collaboration platform integrating project management, code collaboration, workspace dashboards, and Gemini AI assistance.</p>
                       <ul class="list-disc list-inside space-y-1 mb-3 text-xs">
                           <li><strong>Architecture:</strong> Model-View-Controller (MVC) structure (config, models, controllers, routes, middleware, utils).</li>
                           <li><strong>Security:</strong> JWT-based authentication storing encrypted credentials in MongoDB.</li>
                           <li><strong>AI Features:</strong> Integrated Gemini AI for dynamic workspace recommendations and instant Q&A.</li>
                       </ul>`,
                link: "https://netlify.com"
            },
            project2: {
                title: "Ask Gemini - Gen AI Web App",
                body: `<p class="mb-3">Generative AI web application built with HTML, CSS, JavaScript frontend and Node.js backend integration with Gemini API.</p>
                       <ul class="list-disc list-inside space-y-1 mb-3 text-xs">
                           <li><strong>Dark UI:</strong> Custom question prompt input with animated response containers.</li>
                           <li><strong>Utility:</strong> 1-click output copying feature for effortless answer retrieval.</li>
                           <li><strong>Deployment:</strong> Deployed live on Netlify.</li>
                       </ul>`,
                link: "https://netlify.com"
            },
            project3: {
                title: "Mini Authentication System",
                body: `<p class="mb-3">RESTful Authentication API built with Node.js, Express.js, and MongoDB.</p>
                       <ul class="list-disc list-inside space-y-1 mb-3 text-xs">
                           <li>Implemented JWT token generation and validation middleware.</li>
                           <li>Stored and retrieved user records securely in MongoDB.</li>
                           <li>Live endpoint deployed on Netlify.</li>
                       </ul>`,
                link: "https://netlify.com"
            },
            project4: {
                title: "Markdown Notes Manager",
                body: `<p class="mb-3">RESTful CRUD API designed for managing Markdown notes.</p>
                       <ul class="list-disc list-inside space-y-1 mb-3 text-xs">
                           <li>Full CRUD routes (Create, Read, Edit, Delete).</li>
                           <li>Built using Express.js and deployed on Netlify.</li>
                       </ul>`,
                link: "https://netlify.com"
            },
            project5: {
                title: "Water-Stress Web App (Team Project)",
                body: `<p class="mb-3">Collaborative web application for monitoring and analyzing water-stress indicators.</p>
                       <ul class="list-disc list-inside space-y-1 mb-3 text-xs">
                           <li><strong>My Role:</strong> Engineered the React frontend interface and client state handling.</li>
                           <li><strong>Backend Team:</strong> Teammates handled data logic and MongoDB/Node endpoints.</li>
                       </ul>`,
                link: "https://netlify.com"
            }
        };

        function openModal(id) {
            const data = projectsData[id];
            if (!data) return;
            document.getElementById('modal-title').textContent = data.title;
            document.getElementById('modal-body').innerHTML = data.body;
            document.getElementById('modal-live-btn').setAttribute('href', data.link);
            const modal = document.getElementById('project-modal');
            modal.classList.remove('hidden');
            modal.classList.add('flex');
        }

        function closeModal() {
            const modal = document.getElementById('project-modal');
            modal.classList.add('hidden');
            modal.classList.remove('flex');
        }

        // Copy Clipboard & Toast Utility
        function copyToClipboard(text, msg) {
            const tempInput = document.createElement('input');
            tempInput.value = text;
            document.body.appendChild(tempInput);
            tempInput.select();
            document.execCommand('copy');
            document.body.removeChild(tempInput);
            showToast(msg);
        }

        function showToast(msg) {
            const toast = document.getElementById('toast');
            document.getElementById('toast-msg').textContent = msg;
            toast.classList.remove('hidden');
            setTimeout(() => {
                toast.classList.add('hidden');
            }, 3000);
        }

        // Contact Form Handling
        function handleFormSubmit(e) {
            e.preventDefault();
            showToast("Thank you! Your message has been sent successfully.");
            document.getElementById('contact-form').reset();
        }

        // Mobile Menu Toggle
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        document.querySelectorAll('.mobile-nav-link').forEach(link => {
            link.addEventListener('click', () => mobileMenu.classList.add('hidden'));
        });

        // Particle Canvas Background
        const canvas = document.getElementById('bg-canvas');
        const ctx = canvas.getContext('2d');
        let particles = [];

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 0.5;
                this.speedX = Math.random() * 0.6 - 0.3;
                this.speedY = Math.random() * 0.6 - 0.3;
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                if (this.x > canvas.width) this.x = 0;
                if (this.x < 0) this.x = canvas.width;
                if (this.y > canvas.height) this.y = 0;
                if (this.y < 0) this.y = canvas.height;
            }
            draw() {
                ctx.fillStyle = '#8b5cf6';
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        function initParticles() {
            particles = [];
            const count = Math.floor((canvas.width * canvas.height) / 18000);
            for (let i = 0; i < count; i++) {
                particles.push(new Particle());
            }
        }
        initParticles();

        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 100) {
                        ctx.strokeStyle = `rgba(139, 92, 246, ${1 - dist / 100})`;
                        ctx.lineWidth = 0.4;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
            requestAnimationFrame(animateParticles);
        }

        window.onload = function() {
            animateParticles();
        };
