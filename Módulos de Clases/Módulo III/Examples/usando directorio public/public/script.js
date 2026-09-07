const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
let mouse = { x: null, y: null };
let width, height;

const PARTICLE_COUNT = 60;
const CONNECT_DISTANCE = 140;
const MOUSE_DISTANCE = 180;
const COLORS = ['rgba(97, 218, 251, ', 'rgba(168, 85, 247, ', 'rgba(255, 215, 0, '];

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

function createParticles() {
    particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.4,
            radius: Math.random() * 2 + 1,
            color: COLORS[Math.floor(Math.random() * COLORS.length)],
            opacity: Math.random() * 0.5 + 0.2
        });
    }
}
createParticles();

window.addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
});

function animate() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        p.x = Math.max(0, Math.min(width, p.x));
        p.y = Math.max(0, Math.min(height, p.y));

        if (mouse.x !== null) {
            const dx = mouse.x - p.x;
            const dy = mouse.y - p.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < MOUSE_DISTANCE) {
                const force = (MOUSE_DISTANCE - dist) / MOUSE_DISTANCE * 0.5;
                p.vx -= dx / dist * force;
                p.vy -= dy / dist * force;
            }
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color + p.opacity + ')';
        ctx.fill();
    });

    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < CONNECT_DISTANCE) {
                const opacity = (1 - dist / CONNECT_DISTANCE) * 0.15;
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.strokeStyle = `rgba(97, 218, 251, ${opacity})`;
                ctx.lineWidth = 0.5;
                ctx.stroke();
            }
        }
    }

    requestAnimationFrame(animate);
}
animate();

document.querySelectorAll('.cmd-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
        const cmd = btn.dataset.cmd;
        const original = btn.textContent;
        btn.textContent = '> Ejecutando...';
        btn.style.borderColor = '#61dafb';
        try {
            await eval(cmd);
            btn.textContent = '✓ Listo - mira la consola (F12)';
            btn.style.borderColor = '#22c55e';
        } catch (e) {
            btn.textContent = '✗ Error - mira la consola';
            btn.style.borderColor = '#ef4444';
        }
        setTimeout(() => {
            btn.textContent = original;
            btn.style.borderColor = '';
        }, 3000);
    });
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.card').forEach(card => {
    card.style.animationPlayState = 'paused';
    observer.observe(card);
});