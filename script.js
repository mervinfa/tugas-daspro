const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const GRAVITASI = 9.8; // m/s^2
const DENSITAS_UDARA = 1.225; // kg/m^3
const KOEFISIEN_DRAG = 0.47; // koefisien drag bola
const JARI_JARI_BOLA = 0.11; // meter

const kecepatanAwal = 30; // m/s
const sudut = 45; // derajat
const waktuDelta = 0.1; // waktu delta dalam detik

const luasPenampang = Math.PI * Math.pow(JARI_JARI_BOLA, 2); // menghitung luas penampang bola

function hitungGayaDrag(kecepatan, luasPenampang, koefisienDrag) {
    return 0.5 * DENSITAS_UDARA * luasPenampang * koefisienDrag * Math.pow(kecepatan, 2);
}

function hitungPosisiParabolaDenganDrag(kecepatanAwal, sudut, waktuDelta) {
    const radianSudut = sudut * (Math.PI / 180);
    let Vox = kecepatanAwal * Math.cos(radianSudut);
    let Voy = kecepatanAwal * Math.sin(radianSudut);

    let posisiX = 0;
    let posisiY = canvas.height - 20; // Memulai dari bawah canvas
    let waktu = 0;

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const gayaDragX = hitungGayaDrag(Vox, luasPenampang, KOEFISIEN_DRAG);
        const gayaDragY = hitungGayaDrag(Voy, luasPenampang, KOEFISIEN_DRAG);

        Vox -= (gayaDragX / kecepatanAwal) * waktuDelta;
        Voy -= (GRAVITASI + (gayaDragY / kecepatanAwal)) * waktuDelta;

        posisiX += Vox * waktuDelta * 10; // faktor skala untuk visualisasi
        posisiY -= Voy * waktuDelta * 10; // faktor skala untuk visualisasi

        ctx.beginPath();
        ctx.arc(posisiX, posisiY, 10, 0, Math.PI * 2); // menggambar bola
        ctx.fillStyle = 'blue';
        ctx.fill();

        waktu += waktuDelta;

        if (posisiY < canvas.height - 10 && posisiX < canvas.width - 10) {
            requestAnimationFrame(animate);
        }
    }

    animate();
}

hitungPosisiParabolaDenganDrag(kecepatanAwal, sudut, waktuDelta);
