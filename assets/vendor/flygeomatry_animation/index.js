
function calcNewPoint(dist, angle, ref) {
    return {
        x: ref.x + dist * Math.cos(Math.PI/180 * angle),
        y: ref.y + dist * Math.sin(Math.PI/180 * angle)
    }
}
class Polygon
{
    constructor(ctx, data = {}) {
        this.ctx = ctx
        this.center = !data.center ? {x: 0, y: 0} : data.center
        this.radius = !data.radius ? 20 : data.radius
        this.rotation = !data.rotation ? 0 : data.rotation
        this.edges = !data.edges ? 3 : data.edges
        this.lineWidth = !data.lineWidth ? 3 : data.lineWidth
        this.color = !data.color ? '#000' : data.color
        this.fill = !data.fill ? false :  true
        this.x_dir = Math.random() * 2 - 1;
        this.y_dir = Math.random() * 2 - 1;
        this.speed = Math.random();
        this.rotation_speed = Math.random() + 0.5;
    }
    draw() {
        // Setting intial angle for rotation
        let angle = this.rotation + 90;
        let angle_diff = 360 / this.edges;
        // Initiating angle at top point of traingle to initiate drawing
        let calculatePoint = calcNewPoint(this.radius, angle, this.center)
        // Styling
        this.ctx.strokeStyle = this.color
        this.ctx.fillStyle = this.color
        this.ctx.lineWidth = this.lineWidth

        this.ctx.beginPath()
        this.ctx.moveTo(calculatePoint.x, calculatePoint.y)
        angle += angle_diff;
        for(let i = 0; i < this.edges; i++) {   
            // Calculating every 3 point of triangle         
            calculatePoint = calcNewPoint(this.radius, 1*angle, this.center)
            this.ctx.lineTo(calculatePoint.x, calculatePoint.y) 
            angle += angle_diff;                   
        }
        this.ctx.closePath()
        if(!this.fill) {
            this.ctx.stroke()
        } else {
            this.ctx.fill()
        }

    }
    animate() {
        this.center.x += this.x_dir * this.speed;
        this.center.y += this.y_dir * this.speed;
        this.rotation += this.rotation_speed
        if(this.center.x > this.ctx.canvas.width + 50 || this.center.x < -50) {
            this.x_dir *= -1;
        } 
        if(this.center.y > this.ctx.canvas.height + 50 || this.center.y < -50) {
            this.y_dir *= -1;
        } 
        this.draw()
    }
}
class Circle {
    constructor(ctx, data = {}) {
        this.ctx = ctx
        this.center = !data.center ? {x: 0, y: 0} : data.center
        this.radius = !data.radius ? 20 : data.radius
        this.lineWidth = !data.lineWidth ? 3 : data.lineWidth
        this.color = !data.color ? "#000" : data.color
        this.fill = !data.fill ? false : true
        this.x_dir = Math.random() * 2 - 1;
        this.y_dir = Math.random() * 2 - 1;
        this.speed = Math.random();
    }
    draw() {
        this.ctx.strokeStyle = this.color
        this.ctx.fillStyle = this.color
        this.ctx.lineWidth = this.lineWidth

        //Start Drawing
        this.ctx.beginPath()
        this.ctx.arc(this.center.x, this.center.y, this.radius, 0, 2 * Math.PI)
        if(!this.fill) {
            this.ctx.stroke()
        } else {
            this.ctx.fill()
        }
    }
    animate() {
        this.center.x += this.x_dir * this.speed;
        this.center.y += this.y_dir * this.speed;

        if(this.center.x > this.ctx.canvas.width || this.center.x < 0) {
            this.x_dir = this.x_dir * -1;
        } 
        if(this.center.y > this.ctx.canvas.height || this.center.y < 0) {
            this.y_dir *= -1;
        } 
        this.draw()
    }
}
function makeFlyingGeometry(data) {
    data.element.innerHTML = `<canvas class="flyingGeometryCanvas"></canvas>`+data.element.innerHTML
    var cHeight = data.element.clientHeight;
    var cWidth = data.element.clientWidth;
    var canvas = document.querySelector(".flyingGeometryCanvas")
    data.element.style.position = 'relative'
    canvas.style.position = 'absolute'
    canvas.style.left = '0px'
    canvas.style.top = '0px'
    var context = canvas.getContext("2d")
    canvas.height = cHeight;
    canvas.width = cWidth;

    window.addEventListener('resize', () => {
        canvas.height = data.element.clientHeight;
        canvas.width = data.element.clientWidth;
    })
    var triangle = new Polygon(context, {  
        edges: 3, 
        center: { x: 50, y: 50 }, 
        radius: 20, 
        rotation: 140,
        lineWidth: 3,
        color: 'red',
        fill: false
    })

    let shapes = initPage(context, cHeight, cWidth, {
        n_triangles: data.objectCount / 2,
        n_circles: data.objectCount / 2,
        colors: data.colors
    })
    console.log(shapes)
    animatePage(context, shapes)
}
// function generateSpreadedRandomSpot (num, height, width, displacement = 5) {
//     let sqrt = Math.ceil(Math.sqrt(num))
//     let x_diff_offset = (width - displacement * sqrt) / (sqrt * 2)
//     let y_diff_offset = (height - displacement * sqrt) / (sqrt * 2)
//     let randoms = []
//     for(let y = 0; y < sqrt; y++) {
//         for(let x = 0; x < sqrt; x++) {
//             randoms.push({
//                 x: Math.random() * (x + 1) * ((width / sqrt) - x_diff_offset) + (x * ((width / sqrt) + x_diff_offset)),
//                 y: Math.random() * (y + 1) * ((height / sqrt) - y_diff_offset) + (y * ((height / sqrt) + y_diff_offset))
//             })
//         }
//     }
//     return randoms
// }
function initPage(context, pageHeight, pageWidth, config) {
    // For controlled random spawn
    // This is help to spread shape all across the page

    let triangles = [], circles = []
    let triangleNumbers = !config.n_triangles ? 10 : config.n_triangles
    let circleNumbers = !config.n_circles ? 10 : config.n_circles
    for(let i = 0; i < triangleNumbers; i++) {
        triangles.push(
            new Polygon(context, {
                edges: Math.random() * 5 + 3,
                center: {x: Math.random() * pageWidth, y: Math.random() * pageHeight},
                color: config.colors[Math.floor(Math.random() * (config.colors.length - 1))],
                fill: Math.round(Math.random()) === 1 ? true : false
            })
        )

        triangles[i].draw()
    }
    for(let i = 0; i < circleNumbers; i++) {
        // currentRandomRange.x = Math.random() * pageWidth
        // currentRandomRange.y = Math.random() * pageHeight
        circles.push(
            new Circle(context, {
                center: {x: Math.random() * pageWidth, y: Math.random() * pageHeight},
                color: config.colors[Math.floor(Math.random() * (config.colors.length - 1))]
            })
        )

        circles[i].draw()
    }
    return { triangles, circles };
}
function animatePage(ctx, shapes) {
    requestAnimationFrame(() => animatePage(ctx, shapes))  
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    shapes.triangles.forEach(triangle => {
        triangle.animate()
    })
    shapes.circles.forEach(circle => {
        circle.animate()
    })
    
}