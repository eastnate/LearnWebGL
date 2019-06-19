// 책에 있는 예제를 단순화 했습니다.
// 배경 색 초기화 예제
// 배경 색 초기화는 clearColor() 를 이용합니다.
// set clearColor 후 
// clear로 적용합니다.
// 저 버퍼비트가 true(실제론 true가 아님) 일때만 가능합니다.

let gl = null;
let c_width = 0;
let c_height = 0;

window.onkeydown = checkKey;

function checkKey(ev){
  switch(ev.keyCode){
    case 49:{ // Keyboard '1' key
        gl.clearColor(0.3, 0.7, 0.2, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT); 
        break;
    }
    case 50:{ //  Keyboard '2' key
        gl.clearColor(0.3, 0.2, 0.7, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        break;
    }
  }
}


let canvas = document.getElementById("canvas-element-id");
gl = canvas.getContext("webgl");  // Return Webgl Context Object
