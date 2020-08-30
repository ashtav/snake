const doc = document,
      canvas = doc.querySelector('canvas'),
      ctx = canvas.getContext('2d'),
      scale = 10,
      rows = canvas.height / scale,
      columns = canvas.width / scale

let snake, fruit, isStartGame = false, otw = false

// (function setup(){
    snake = new Snake()
    fruit = new Fruit()

    fruit.pickLocation()

    let speed = 200
    let interval

    function _rungame(time){
        isStartGame = true

        interval = window.setInterval(() => {
    
            if(snake.eat(fruit)){
                fruit.pickLocation()
    
                doc.querySelector('.score').innerText = snake.total
                // doc.getElementById('speed').innerText = (500 - speed)

                if(speed > 0){
                    // speed = speed - 3

                    // if(speed < 0){
                    //     speed = 0
                    // }
    
                    // clearInterval(interval)
                    // _rungame(speed)

                }
            }

            ctx.clearRect(0, 0, canvas.width, canvas.height) // clear canvas

            snake.autoFind()

            fruit.draw()
            snake.draw()
            snake.update()
        },time)

    }

// }())

window.addEventListener('keydown', (e) => {
    const direction = e.key.replace('Arrow', '')
    snake.changeDirection(direction)

    if(e.keyCode == 32){ // on space pressed
        if(isStartGame){
            isStartGame = false
            clearInterval(interval)

            doc.querySelector('.icon').classList.remove('fa-play')
            doc.querySelector('.icon').classList.add('fa-pause')
        }else{
            _rungame(speed)

            doc.querySelector('.icon').classList.remove('fa-pause')
            doc.querySelector('.icon').classList.add('fa-play')
        }
    }
})


function Snake(){
    this.x = 0
    this.y = 0
    this.xSpeed = scale * 1
    this.ySpeed = 0
    this.total = 0
    this.tail = []

    this.draw = function(){

        for (let i = 0; i < this.tail.length; i++) {
            ctx.fillStyle = '#cccccc'

            if(i % 2 == 0){
                ctx.fillStyle = '#999999'
            }

            ctx.fillRect(this.tail[i].x, this.tail[i].y, scale, scale)
        }

        ctx.fillStyle = '#ffffff'
        ctx.fillRect(this.x, this.y, scale, scale)

    }

    this.update = function(){
        for (let i = 0; i < this.tail.length - 1; i++) {
            this.tail[i] = this.tail[i+1]
        }

        this.tail[this.total - 1] = {x: this.x, y: this.y}

        this.x += this.xSpeed // update posisi x
        this.y += this.ySpeed // update posisi y

        if(this.x >= canvas.width){
            this.x = 0
        }

        if(this.y >= canvas.height){
            this.y = 0
        }

        if(this.x < 0){
            this.x = canvas.width
        }

        if(this.y < 0){
            this.y = canvas.height
        }
    }

    this.changeDirection = function(direction){
        switch (direction) {
            case 'Up':
                this.xSpeed = 0
                this.ySpeed = -scale * 1
                break

            case 'Down':
                this.xSpeed = 0
                this.ySpeed = scale * 1
                break
            
            case 'Left':
                this.xSpeed = -scale * 1
                this.ySpeed = 0
                break

            default:
                this.xSpeed = scale * 1
                this.ySpeed = 0
                break
        }
    }

    this.eat = function(fruit){
        if(this.x === fruit.x && this.y === fruit.y){
            this.total++
            otw = false
            return true
        }

        return false
    }

    this.checkCollision = function(){
        for (let i = 0; i < this.tail.length; i++) {
            if(this.x === this.tail[i].x && this.y === this.tail[i].y){
                this.total = 0
                this.tail = []
            }
        }
    }

    this.autoFind = function(){
        let fx = fruit.x, fy = fruit.y
        let sx = snake.x, sy = snake.y

        // autofind & cari jarak terdekat
        let canvasSize = 300 // width & height

        // cari jarak terdekat x antara snake & fruit
        
        // cek apakah s > f atau sebaliknya s < f
        if(sx > fx){
            let x1 = sx - fx, // jarak antara sx dengan fx
                x2 = (canvasSize - sx) + fx // sisa jarak fx dari total lebar canvas + jarak sx

            if(x1 < x2){
                snake.changeDirection('Left')
            }else{
                disY()
            }
        }else{
            let x1 = fx - sx, // jarak antara fx dengan sx
                x2 = (canvasSize - fx) + sx // sisa jarak fx dari total lebar canvas + jarak sx

            if(x1 > x2){ // jika jarak ke kanan lebih jauh dari ke kiri, pilih kiri
                snake.changeDirection('Left')
            }else{
                if(sx == fx){ // jika posisi x antara s & f sama
                    disY()
                }else{
                    snake.changeDirection('Right')
                }
            }
        }

        function disY(){
            // cek apakah s > f atau sebaliknya s < f
            if(sy > fy){
                let y1 = sy - fy,
                    y2 = (canvasSize - sy) + fy

                if(y1 < y2){ // jika jarak ke bawah lebih besar dari ke atas, pilih ke atas
                    snake.changeDirection('Up')
                }else{
                    snake.changeDirection('Down')
                }
            }else{
                let y1 = fy - sy,
                    y2 = (canvasSize - fy) + sy
                
                if(y1 > y2){ // jika jarak ke bawah lebih besar dari ke atas, pilih ke atas
                    snake.changeDirection('Up')
                }else{
                    snake.changeDirection('Down')

                    if(sy == fy){
                        snake.changeDirection('Right')
                    }
                }
            }
        }
    }
}

function Fruit(){
    this.x
    this.y

    this.pickLocation = function(){
        this.x = (Math.floor(Math.random() * rows - 1) + 1) * scale
        this.y = (Math.floor(Math.random() * columns - 1) + 1) * scale
    }

    this.draw = function(){
        ctx.fillStyle = '#4cafab'
        ctx.fillRect(this.x, this.y, scale, scale)
    }

    this.put = function(p){
        this.x = (Math.floor((p.x / 300) * rows - 1) + 1) * scale;
        this.y = (Math.floor((p.y / 300) * rows - 1) + 1) * scale;
    }
}

canvas.addEventListener('click', function(e){
    fruit.put({x: e.offsetX, y: e.offsetY})
    fruit.draw()
    // if(!isStartGame) _rungame(speed)
})
