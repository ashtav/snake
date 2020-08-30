let range = doc.getElementById('range'),
    isMouseDown = false, clientY = 0, offsetT = 0

range.addEventListener('mousedown', (e) => {
    isMouseDown = true
    offsetT = range.offsetTop
    clientY = e.clientY

    clearInterval(interval)
})

window.addEventListener('mouseup', (e) => {
    clientY = e.clientY

    if(isMouseDown){
        _rungame(speed)
    }

    isMouseDown = false
})

window.addEventListener('mousemove', (e) => {
    if(isMouseDown){
        let posY = clientY - e.clientY,
            thumb = 140 - (offsetT - posY)

        range.style.bottom = thumb <= 0 ? '0px' : thumb >= 140 ? '140px' : thumb+'px'
        
        let _speed = 150 - thumb
        speed = _speed > 150 ? 150 : _speed <= 0 ? 0 : _speed

        doc.getElementById('speed').innerText = thumb > 150 ? 150 : thumb <= 0 ? 0 : thumb
    }
})