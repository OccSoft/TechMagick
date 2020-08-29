let font
let points
let size
let skip
let go
let button
let btnrec
let rec
let x1
let x2
let y1
let y2
let canv
let inc
let capStarted
let saving
let nonBlankInp
let inp
let status
let mobile

function mobileCheck() {
  mobile = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) mobile = true;})(navigator.userAgent||navigator.vendor||window.opera);
}

function preload() {
  mobileCheck()
  font = loadFont('rbi.ttf')
}

function setup() {
 
  frameRate(30)
  status = document.getElementById("status")
  let p5Canvas = createCanvas(800, 800)
  p5Canvas.parent('wrap')
  canv = p5Canvas.canvas
  initBools()
  initInts()
  initInputBar()
  initButtons()
  points = font.textToPoints('Your will please...', 0, 0, 10, {
    sampleFactor: 10,
    simplifyThreshold: 0
  })
}

function draw() {
  translate(size, 10 * size)
  background(255)
  toggleInputs()
  let num = frameCount
  if (skip < 50 && go) skip++
  if (rec) {
    recordNotif()
    toggleCapture()
    num = inc
  }
  if (saving) {
    saveAnimation()
  } else {
    drawPoints(num)
  }
  if (rec) {
    capturer.capture(canv)
    if (inc == 180) {
      endRecording()
    }
    inc++
  }
}

function initInputBar() {
  inp = createInput()
  inp.size(795)
  inp.input(myInputEvent)
  inp.attribute('placeholder', 'Your will please...')
  inp.parent('wrap')
  inp.elt.focus()
}

function initBools() {
  capStarted = false
  saving = false
  nonBlankInp = false
  go = false
  rec = false
}

function initButtons() {
  button = createButton('Sigilize')
  button.mousePressed(() => {
    if (nonBlankInp) {
      go = true
    } else {
      alert('You must enter at least 1 character to make a sigil.')
    }
  })
  button.parent('wrap')
  btnrec = createElement('span')
  if(!mobile){
  btnrec = createButton('Save gif')
  btnrec.mousePressed(() => {
    if (skip == 50) {
      rec = true
      inc = 0
    } else {
      alert('You must create a new sigil with the sigilize button before making a gif!')
    }
  })
  btnrec.parent('wrap')
}
 
}

function initInts() {
  inc = 0
  size = 25
  skip = 0
}

function drawPoints(ang) {
  for (let i = 0; i < points.length - skip; i++) {
    let p = points[i]
    let p2 = points[i + skip]
    let sn = Math.sin(p.y + (ang * (3.14 / 180)) * 2) * size
    let cs = Math.cos(p.x + (ang * (3.14 / 180)) * 2) * size
    if (go) {
      x1 = (p.x * size) + sn
      x2 = (p.x * size) + sn
    } else {
      x1 = (p.x * size)
      x2 = (p.x * size)
    }
    y1 = (p.y * size) + cs
    y2 = (p2.y * size) + cs
    let off = floor(p.x * size / (width - 50)) * (height / 6)
    let off2 = floor(p.x * size / (width - 60)) * (width - 60)
    line(10 + x1 - off2, y1 + off, 10 + x2 - off2, y2 + off)
  }
}

function saveAnimation() {
  textSize(64)
  if (frameCount % 10 < 4) {
    status.style.color = "Green"
  } else {
    status.style.color = "White"
  }
  status.innerHTML = "Saving, this will take a litte time."
}

function endRecording() {
  rec = false
  capStarted = false
  capturer.stop()
  saving = true
  try {
    capturer.save((blob) => {
      saving = false
      inc = 0
      download(blob, "sigil.gif", "image/gif")
      alert('File Saved')
      location.reload()
    })
  } catch (err) {
    alert('error saving')
    location.reload()
  }
}

function toggleCapture() {
  if (!capStarted) {
    capturer.start()
    capStarted = true
  }
}

function toggleInputs() {
  if (rec || saving) {
    inp.style('visibility', 'hidden')
    btnrec.style('visibility', 'hidden')
    button.style('visibility', 'hidden')
  } else {
    inp.style('visibility', 'visible')
    btnrec.style('visibility', 'visible')
    button.style('visibility', 'visible')
  }
}

function recordNotif() {
  textSize(64)
  if (frameCount % 10 < 4) {
    status.style.color = "Green"
  } else {
    status.style.color = "White"
  }
  status.innerHTML = "Recording"
}


function myInputEvent() {
  go = false
  skip = 0
  let process = Array.from(new Set(this.value()))
  process.sort(() => Math.random() - 0.5)
  process.join("")
  process.toString().trim()
  nonBlankInp = false
  if (process.length > 0) nonBlankInp = true
  points = (font.textToPoints(process, 0, 0, 10, {
    sampleFactor: 10,
    simplifyThreshold: 0
  }))
}