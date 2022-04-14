const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

let particleArray=[];
const maxParticles = 200;

const mouse = {
    x:null,
    y:null
}
addEventListener('resize',()=>{
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    init();
})
addEventListener('mousemove', (e)=>{
    mouse.x = e.x;
    mouse.y = e.y;
});
setInterval(() => {
    mouse.x = undefined;
    mouse.y= undefined;
}, 200);


class Particle{
    constructor(x,y,size,color,weight){
        this.x = x;
        this.y = y;
        this.color = color;
        this.size = size;
        this.weight = weight
    }
    draw(){
        c.beginPath();
        c.arc(this.x,this.y,this.size,0,Math.PI*2,false);
        c.fillStyle = this.color;
        c.fill();
    }
    update(){
        this.draw();
        this.size -=0.05;
        if(this.size < 0){
            this.x = mouse.x +((Math.random()-0.5) *10);
            this.y = mouse.y +((Math.random()-0.5) *10);
            this.weight = Math.random()
            this.size = (Math.random() * 10) +2; 
        }
        this.y += this.weight;
        this.weight+=0.2;

    }
}

function init(){
    particleArray =[]
    for(let i = 0; i < maxParticles;i++){
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        let size = (Math.random() * 5);
        let weight = 1;
        let color = 'yellow';
        particleArray.push(new Particle(x,y,size,color,weight));
    }
}

function animate(){
    c.fillStyle = 'black'
    c.fillRect(0,0,canvas.width,canvas.height)
    particleArray.forEach(particle =>{
        particle.update();
    })
    requestAnimationFrame(animate);
}

init();
animate();