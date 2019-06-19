let gl = null; // WebGL context
let prg = null; // The program (shaders)

let coneVertexBuffer = null; //The vertex buffer for the cone
let coneIndexBuffer = null; // The index buffer for the cone

let indices = [];
let vertices = [];

let mvMatrix = mat4.create(); // The Model-View matrix
let pMatrix = mat4.create(); // The projection matrix 이거 두개 뭔소린지 잘 모르겠음

let canvas = document.getElementById("canvas-element-id");
let c_width = canvas.width;
let c_height = canvas.height;

gl = canvas.getContext("webgl");  // Return Webgl Context Object

function initProgram() {
  let fgShader = utils.getShader(gl, 'shader-fs');
  let vxShader = utils.getShader(gl, 'shader-vs');

  prg = gl.createProgram();
  gl.attachShader(prg, vxShader);
  gl.attachShader(prg, fgShader);
  gl.linkProgram(prg);
  gl.useProgram(prg);

  prg.vertexPositionAttribute = gl.getAttribLocation(prg, 'aVertexPosition');
  prg.pMatrixUniform          = gl.getUniformLocation(prg, 'uPMatrix');
  prg.mvMatrixUniform         = gl.getUniformLocation(prg, 'uMVMatrix');
}	


function initBuffers() {

  vertices = [
    1.5, 0, 0, 
    -1.5, 1, 0, 
    -1.5, 0.809017,	0.587785,
    -1.5, 0.309017,	0.951057, 
    -1.5, -0.309017, 0.951057, 
    -1.5, -0.809017, 0.587785,
    -1.5, -1, 0, 
    -1.5, -0.809017, -0.587785,
    -1.5, -0.309017, -0.951057, 
    -1.5, 0.309017,	-0.951057, 
    -1.5, 0.809017,	-0.587785
  ]

  indices = [
    0, 1, 2,
    0, 2, 3,
    0, 3, 4,
    0, 4, 5,
    0, 5, 6,
    0, 6, 7,
    0, 7, 8,
    0, 8, 9,
    0, 9, 10,
    0, 10, 1
  ]

  coneVertexBuffer = gl.createBuffer();                                       //VBO 생성
  gl.bindBuffer(gl.ARRAY_BUFFER, coneVertexBuffer);                           //VBO를 바인딩 GL에 바인딩
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW); //값을 넣는다 어디에?  VBO가 바인딩된 gl.ARRAY_BUFFER에!
  
  coneIndexBuffer = gl.createBuffer();                                              // IBO 만들고
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, coneIndexBuffer);                          // gl.ELEMENT_ARRAY_BUFFER에 IBO를 바인딩하고 
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW); //값 넣어주고


  gl.bindBuffer(gl.ARRAY_BUFFER, null);         // 버퍼 비워주고  (나중에 또 써야하니깐) 값은 VBO로 넘어간듯
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null); // 버퍼 비워주고 (나중에 또 써야하니깐) 값은 IBO로 넘어간듯
}


function drawScene(){

  mat4.perspective(45, c_width / c_height, 0.1, 10000.0, pMatrix);
  mat4.identity(mvMatrix);	
  mat4.translate(mvMatrix, [0.0, 0.0, -5.0]);

  gl.uniformMatrix4fv(prg.pMatrixUniform, false, pMatrix);
  gl.uniformMatrix4fv(prg.mvMatrixUniform, false, mvMatrix);

  // 다시 VBO에 바이드하고 (gl.ARRAY_BUFFER는 통로라고 생각하면 될듯)
  gl.bindBuffer(gl.ARRAY_BUFFER, coneVertexBuffer);

  // 밑에 두개가 VBO에 속성값 넣는거임
  gl.vertexAttribPointer(prg.aVertexPosition, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(prg.vertexPositionAttribute);

  // INDEX 그려버리기~
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, coneIndexBuffer);
  // Render 할때는 IBO를 이용함 Index Buffer Object
  gl.drawElements(gl.LINE_LOOP, indices.length, gl.UNSIGNED_SHORT,0);
}


// 이건 지금 스킵 Chapter3에서 배움
initProgram();

initBuffers();

drawScene();