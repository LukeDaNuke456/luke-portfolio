import '../styles/style.css';

class Canvas {
  constructor(canvasId, text1, text2) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext("2d");
    this.text1 = text1;
    this.text2 = text2;
    this.opacity1 = 0; // Opacity for first text
    this.opacity2 = 0; // Opacity for second text
    this.fadeSpeed = 0.01;
    this.fadeDelay = 50; // Delay before text 2 starts fading in

    if (!this.canvas) {
      console.error(`Canvas with ID "${canvasId}" not found.`);
      return;
    }

    this.init();
  }

  init() {
    this.resizeCanvas();
    this.startFadeIn();
    window.addEventListener("resize", () => this.resizeCanvas());
  }

  resizeCanvas() {
    const section = document.querySelector(".canvas-section");
    if (!section) {
      console.error("Canvas section not found.");
      return;
    }

    this.canvas.width = section.clientWidth;
    this.canvas.height = section.clientHeight;
    this.drawText();
  }

  drawText() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Adjust font size dynamically (min 20px, max 40px)
    const fontSize = Math.min(Math.max(20, this.canvas.width * 0.05), 40);

    this.ctx.font = `${fontSize}px Arial`;
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";

    // Draw first text
    this.ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity1})`;
    this.ctx.fillText(this.text1, this.canvas.width / 2, this.canvas.height / 2 - 30);

    // Draw second text only when first text is fully visible
    this.ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity2})`;
    this.ctx.fillText(this.text2, this.canvas.width / 2, this.canvas.height / 2 + 40);
  }

  startFadeIn() {
    
    let delayCounter = 0;
    
    const fadeIn = () => {
      if (this.opacity1 < 1) {
        this.opacity1 += this.fadeSpeed;
      } else if (delayCounter < this.fadeDelay) {
        delayCounter++; // Wait before starting Text 2 fade-in
      } else if (this.opacity2 < 1) {
        this.opacity2 += this.fadeSpeed;
      }

      this.drawText();

      if (this.opacity2 < 1) {
        requestAnimationFrame(fadeIn);
      }
    };
    
    fadeIn();
  }
}

// Initialize the class with the canvas ID and text
new Canvas("myCanvas", "Hello, I'm Luke.", "Welcome to my page.");
