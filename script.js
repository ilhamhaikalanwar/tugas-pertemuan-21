// --- ANIMASI PARTIKEL KURSOR (Tetap sama seperti kode awal Anda) ---
const canvas = document.getElementById('cursor-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
window.addEventListener('resize', resize); resize();

class Particle {
    constructor(x, y) {
        this.x = x; this.y = y;
        this.size = Math.random() * 4 + 1;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.color = `#00d2ff`;
        this.opacity = 1;
    }
    update() { this.x += this.speedX; this.y += this.speedY; this.opacity -= 0.02; }
    draw() { ctx.globalAlpha = this.opacity; ctx.fillStyle = this.color; ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.fill(); }
}
window.addEventListener('mousemove', (e) => { for (let i = 0; i < 2; i++) { particles.push(new Particle(e.clientX, e.clientY)); } });
function animate() { ctx.clearRect(0, 0, canvas.width, canvas.height); particles.forEach((p, i) => { p.update(); p.draw(); if (p.opacity <= 0) particles.splice(i, 1); }); requestAnimationFrame(animate); }
animate();

// --- LOGIKA MERGE SORT ---
document.getElementById('btnSort').addEventListener('click', function() {
    const input = document.getElementById('inputData').value;
    let nilai = input.split(',').map(n => parseInt(n.trim())).filter(n => !isNaN(n));

    if (nilai.length === 0) {
        Swal.fire('Oops!', 'Masukkan angka yang benar ya.', 'error');
        return;
    }

    const resultArea = document.getElementById('result-area');
    resultArea.innerHTML = "";

    // Fungsi untuk menambah tampilan langkah ke UI
    function logStep(msg, type) {
        const div = document.createElement('div');
        div.className = 'step-item';
        if(type === 'merge') div.style.borderLeft = '3px solid #ff4757';
        div.innerHTML = msg;
        resultArea.appendChild(div);
    }

    // Fungsi Utama Merge Sort
    function mergeSort(arr) {
        if (arr.length <= 1) return arr;

        const mid = Math.floor(arr.length / 2);
        const left = arr.slice(0, mid);
        const right = arr.slice(mid);

        logStep(`<strong>DIVIDE:</strong> [${left.join(', ')}] | [${right.join(', ')}]`, 'divide');

        return merge(mergeSort(left), mergeSort(right));
    }

    function merge(left, right) {
        let resultArray = [], leftIndex = 0, rightIndex = 0;

        while (leftIndex < left.length && rightIndex < right.length) {
            if (left[leftIndex] < right[rightIndex]) {
                resultArray.push(left[leftIndex]);
                leftIndex++;
            } else {
                resultArray.push(right[rightIndex]);
                rightIndex++;
            }
        }

        const res = resultArray.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
        logStep(`<strong>MERGE:</strong> [${res.join(', ')}]`, 'merge');
        return res;
    }

    const sortedData = mergeSort(nilai);
    
    Swal.fire({
        title: 'Selesai!',
        text: `Data Terurut: ${sortedData.join(', ')}`,
        icon: 'success',
        confirmButtonText: 'Mantap'
    });
});