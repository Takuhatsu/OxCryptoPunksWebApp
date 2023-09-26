import React, { useRef, useEffect } from 'react';

const PixelArtCanvas = () => {
  const canvasRef = useRef(null);
  let canvas;
  let ctx;
  const scale = 6; // set the scale factor to 3
  let currentColor = 'black'; // set the initial color to black

  useEffect(() => {
    canvas = canvasRef.current;
    ctx = canvas.getContext('2d');

    // Resize the canvas and the pixel size
    resizeCanvas();

    canvas.addEventListener('click', handleClick);

    const blackSelector = document.getElementById('black');
    const redSelector = document.getElementById('red');
    const blueSelector = document.getElementById('blue');

    blackSelector.addEventListener('click', () => {
      currentColor = 'black';
    });

    redSelector.addEventListener('click', () => {
      currentColor = 'red';
    });

    blueSelector.addEventListener('click', () => {
      currentColor = 'blue';
    });

    window.addEventListener('resize', resizeCanvas);

    fetch(`/get-canvas`)
      .then((response) => response.json())
      .then((seed) => {
        for (let i = 0; i <= 120; i++) {
          for (let j = 0; j <= 120; j++) {
            const c = seed[i][j];
            if (c !== null) {
              ctx.fillStyle = c;
              ctx.fillRect(i, j, 1, 1);
            }
          }
        }
      });

    return () => {
      canvas.removeEventListener('click', handleClick);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  const handleClick = (event) => {
    // Adjust the position of the clicked pixel based on the scale factor
    const x = Math.floor(event.offsetX / scale);
    const y = Math.floor(event.offsetY / scale);
    fetch(`/put-pixel?x=${x}&y=${y}&color=${currentColor}`, { method: 'POST' }).then((response) => {});

    ctx.fillStyle = currentColor; // use the current color
    ctx.fillRect(x, y, 1, 1);
  };

  const resizeCanvas = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.scale(scale, scale);
  };

  return (
    <div>
      <canvas ref={canvasRef} id='pixel-canvas'></canvas>
      <div>
        <div className='color-selector' id='black'></div>
        <div className='color-selector' id='red'></div>
        <div className='color-selector' id='blue'></div>
      </div>
    </div>
  );
};

export default PixelArtCanvas;