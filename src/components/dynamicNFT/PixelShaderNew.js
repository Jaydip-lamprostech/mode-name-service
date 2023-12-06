export const PixelShader = {
  uniforms: {
    tDiffuse: { value: null },
    resolution: { value: null },
    pixelSize: { value: 1 },
  },
  vertexShader: `
      varying mediump vec2 vUv;
  
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
  fragmentShader: `
      uniform sampler2D tDiffuse;
      uniform float pixelSize;
      uniform vec2 resolution;
      varying highp vec2 vUv;
  
      void main(){
        mediump vec2 dxy = pixelSize / resolution;
        mediump vec2 coord = dxy * floor(vUv / dxy);
        gl_FragColor = texture2D(tDiffuse, coord);
      }
    `,
};
