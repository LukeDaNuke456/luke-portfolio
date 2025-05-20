class Canvas {
  constructor(canvasId, text1, text2) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext("2d");
    this.text1 = text1;
    this.text2 = text2;
    this.index1 = 0;
    this.index2 = 0;
    this.typingSpeed = 100;
    this.fadeDelay = 1000;
    this.cursorVisible = true;
    this.cursorBlinkSpeed = 500;
    this.isTypingComplete = false;
    this.fontLoaded = false; // Flag to track font loading

    if (!this.canvas) {
      console.error(`Canvas with ID "${canvasId}" not found.`);
      return;
    }

    this.init();
  }

  async init() {
    await this.loadFont(); // Load font before drawing
    this.resizeCanvas();
    this.startTypingEffect();
    this.startCursorBlink();
    window.addEventListener("resize", () => this.resizeCanvas());
  }

  async loadFont() {
    try {
      const font = new FontFace(
        "CustomFont",
        'url("fonts/VT323-Regular.ttf")',
      );
      await font.load();
      document.fonts.add(font);
      this.fontLoaded = true;
      this.drawText(); // Ensure first draw after font is ready
    } catch (error) {
      console.error("Font failed to load:", error);
    }
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

    const fontSize = Math.min(Math.max(20, this.canvas.width * 0.09), 40);

    // Ensure the font is only applied if it's fully loaded
    if (this.fontLoaded) {
      this.ctx.font = `${fontSize}px CustomFont`;
    } else {
      this.ctx.font = `${fontSize}px Arial`; // Fallback while waiting
    }

    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";
    this.ctx.fillStyle = `rgba(255, 255, 255, 1)`;

    const isTypingText1 = this.index1 < this.text1.length;
    const isTypingText2 = !isTypingText1 && this.index2 < this.text2.length;

    const cursor = this.cursorVisible ? "|" : " ";

    let text1Displayed = this.text1.substring(0, this.index1);
    let text2Displayed = this.text2.substring(0, this.index2);

    if (isTypingText1) {
      text1Displayed += cursor;
    } else if (isTypingText2) {
      text2Displayed += cursor;
    } else {
      text2Displayed += cursor;
      this.isTypingComplete = true;
    }

    this.ctx.fillText(
      text1Displayed,
      this.canvas.width / 2,
      this.canvas.height / 2 - 30,
    );
    this.ctx.fillText(
      text2Displayed,
      this.canvas.width / 2,
      this.canvas.height / 2 + 40,
    );
  }

  startTypingEffect() {
    const typeText1 = () => {
      if (this.index1 < this.text1.length) {
        this.index1++;
        this.drawText();
        setTimeout(typeText1, this.typingSpeed);
      } else {
        setTimeout(typeText2, this.fadeDelay);
      }
    };

    const typeText2 = () => {
      if (this.index2 < this.text2.length) {
        this.index2++;
        this.drawText();
        setTimeout(typeText2, this.typingSpeed);
      } else {
        this.isTypingComplete = true;
      }
    };

    typeText1();
  }

  startCursorBlink() {
    setInterval(() => {
      this.cursorVisible = !this.cursorVisible;
      this.drawText();
    }, this.cursorBlinkSpeed);
  }
}

// Initialize the class
new Canvas("myCanvas", "Hello, I'm Luke.", "Welcome to my page.");
