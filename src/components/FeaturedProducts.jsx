import React from 'react';
import { Camera, Mesh, Plane, Program, Renderer, Texture, Transform } from 'ogl';
import { useEffect, useRef } from 'react';

// Import your actual images - UPDATE THESE PATHS TO MATCH YOUR FOLDER STRUCTURE
import ceramicPlate from "../assets/ceramicPlate.png";
import diya from "../assets/diya.png";
import coaster from "../assets/coaster.png";
import vase from "../assets/vase.png";

function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

function lerp(p1, p2, t) {
  return p1 + (p2 - p1) * t;
}

function autoBind(instance) {
  const proto = Object.getPrototypeOf(instance);
  Object.getOwnPropertyNames(proto).forEach(key => {
    if (key !== 'constructor' && typeof instance[key] === 'function') {
      instance[key] = instance[key].bind(instance);
    }
  });
}

function createProductCard(gl, image, title, price) {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  
  // Set canvas size to match your card design (increased size more)
  canvas.width = 480;
  canvas.height = 620;
  
  // Fill with white background
  context.fillStyle = '#ffffff';
  context.fillRect(0, 0, canvas.width, canvas.height);
  
  // Add subtle shadow/border
  context.shadowColor = 'rgba(0,0,0,0.1)';
  context.shadowBlur = 20;
  context.shadowOffsetY = 10;
  
  // Draw white card background with rounded corners
  context.beginPath();
  context.roundRect(0, 0, canvas.width, canvas.height, 12);
  context.fillStyle = '#ffffff';
  context.fill();
  
  // Reset shadow
  context.shadowColor = 'transparent';
  context.shadowBlur = 0;
  context.shadowOffsetY = 0;
  
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      // Draw image - maintain aspect ratio and center it (increased image area more)
      const imageArea = {
        x: 25,
        y: 25,
        width: canvas.width - 50,
        height: 420  // Increased from 360
      };
      
      const imgAspect = img.naturalWidth / img.naturalHeight;
      const areaAspect = imageArea.width / imageArea.height;
      
      let drawWidth, drawHeight, drawX, drawY;
      
      if (imgAspect > areaAspect) {
        // Image is wider than area
        drawWidth = imageArea.width;
        drawHeight = drawWidth / imgAspect;
        drawX = imageArea.x;
        drawY = imageArea.y + (imageArea.height - drawHeight) / 2;
      } else {
        // Image is taller than area
        drawHeight = imageArea.height;
        drawWidth = drawHeight * imgAspect;
        drawX = imageArea.x + (imageArea.width - drawWidth) / 2;
        drawY = imageArea.y;
      }
      
      // Draw image with rounded corners
      context.save();
      context.beginPath();
      context.roundRect(drawX, drawY, drawWidth, drawHeight, 8);
      context.clip();
      context.drawImage(img, drawX, drawY, drawWidth, drawHeight);
      context.restore();
      
      // Add product title (increased font size)
      context.fillStyle = '#3D6B73';
      context.font = 'bold 20px Arial, sans-serif';  // Increased from 16px
      context.textAlign = 'center';
      context.textBaseline = 'top';
      
      // Split title into multiple lines if needed
      const words = title.split(' ');
      const lines = [];
      let currentLine = words[0] || '';
      
      for (let i = 1; i < words.length; i++) {
        const testLine = currentLine + ' ' + words[i];
        const metrics = context.measureText(testLine);
        if (metrics.width > canvas.width - 60 && currentLine.length > 0) {  // Adjusted for larger canvas
          lines.push(currentLine);
          currentLine = words[i];
        } else {
          currentLine = testLine;
        }
      }
      if (currentLine) lines.push(currentLine);
      
      // Draw title lines (adjusted position and spacing for larger card)
      const lineHeight = 26;  // Increased line height
      const titleStartY = 470;  // Moved down for larger image area
      lines.forEach((line, index) => {
        context.fillText(line, canvas.width / 2, titleStartY + (index * lineHeight));
      });
      
      // Add price (increased font size)
      context.fillStyle = '#666666';
      context.font = 'bold 22px Arial, sans-serif';  // Increased from 18px
      context.textAlign = 'left';
      context.fillText(`₹${price}`, 25, titleStartY + (lines.length * lineHeight) + 15);
      
      const texture = new Texture(gl, { generateMipmaps: false });
      texture.image = canvas;
      resolve({ texture, width: canvas.width, height: canvas.height });
    };
    img.src = image;
  });
}

class Media {
  constructor({
    geometry,
    gl,
    image,
    index,
    length,
    renderer,
    scene,
    screen,
    text,
    price,
    viewport
  }) {
    this.extra = 0;
    this.geometry = geometry;
    this.gl = gl;
    this.image = image;
    this.index = index;
    this.length = length;
    this.renderer = renderer;
    this.scene = scene;
    this.screen = screen;
    this.text = text;
    this.price = price;
    this.viewport = viewport;
    this.isReady = false;
    this.createShader();
    this.onResize();
  }
  
  createShader() {
    // Create a temporary texture first
    const tempTexture = new Texture(this.gl, { generateMipmaps: false });
    
    // Create the program immediately with the temp texture
    this.program = new Program(this.gl, {
      depthTest: false,
      depthWrite: false,
      vertex: `
        precision highp float;
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        uniform float uTime;
        uniform float uSpeed;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          vec3 p = position;
          // Subtle wave animation
          p.z = sin(p.x * 2.0 + uTime) * 0.02 + cos(p.y * 1.5 + uTime) * 0.02;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
        }
      `,
      fragment: `
        precision highp float;
        uniform sampler2D tMap;
        varying vec2 vUv;
        void main() {
          vec4 color = texture2D(tMap, vUv);
          gl_FragColor = color;
        }
      `,
      uniforms: {
        tMap: { value: tempTexture },
        uSpeed: { value: 0 },
        uTime: { value: 100 * Math.random() }
      },
      transparent: true
    });
    
    // Create the mesh immediately
    this.createMesh();
    
    // Load the actual product card asynchronously
    this.loadProductCard();
  }
  
  async loadProductCard() {
    try {
      const { texture } = await createProductCard(this.gl, this.image, this.text, this.price);
      // Update the texture once it's ready
      this.program.uniforms.tMap.value = texture;
      this.isReady = true;
    } catch (error) {
      console.warn('Failed to load product card:', error);
      this.isReady = false;
    }
  }
  
  createMesh() {
    this.plane = new Mesh(this.gl, {
      geometry: this.geometry,
      program: this.program
    });
    this.plane.setParent(this.scene);
  }
  
  update(scroll, direction) {
    // Only update if we have a valid program
    if (!this.program || !this.program.uniforms) return;
    
    this.plane.position.x = this.x - scroll.current - this.extra;
    this.plane.position.y = 0; // No bending - keep flat
    this.plane.rotation.z = 0; // No rotation
    
    this.speed = scroll.current - scroll.last;
    this.program.uniforms.uTime.value += 0.02;
    this.program.uniforms.uSpeed.value = this.speed;

    const planeOffset = this.plane.scale.x / 2;
    const viewportOffset = this.viewport.width / 2;
    this.isBefore = this.plane.position.x + planeOffset < -viewportOffset;
    this.isAfter = this.plane.position.x - planeOffset > viewportOffset;
    
    if (direction === 'right' && this.isBefore) {
      this.extra -= this.widthTotal;
      this.isBefore = this.isAfter = false;
    }
    if (direction === 'left' && this.isAfter) {
      this.extra += this.widthTotal;
      this.isBefore = this.isAfter = false;
    }
  }
  
  onResize({ screen, viewport } = {}) {
    if (screen) this.screen = screen;
    if (viewport) this.viewport = viewport;
    
    // Maintain card aspect ratio (480x620) - increased scale further
    const cardAspect = 480 / 620;
    this.scale = Math.min(this.screen.height / 700, this.screen.width / 1000);  // Increased scale factor more
    
    this.plane.scale.y = (this.viewport.height * (700 * this.scale)) / this.screen.height;  // Increased height more
    this.plane.scale.x = this.plane.scale.y * cardAspect;
    
    this.padding = 0.6;  // Reduced padding even more for tighter spacing
    this.width = this.plane.scale.x + this.padding;
    this.widthTotal = this.width * this.length;
    this.x = this.width * this.index;
  }
}

class App {
  constructor(
    container,
    {
      items,
      scrollSpeed = 1,
      scrollEase = 0.1
    } = {}
  ) {
    this.container = container;
    this.scrollSpeed = scrollSpeed;
    this.scroll = { ease: scrollEase, current: 0, target: 0, last: 0 };
    this.onCheckDebounce = debounce(this.onCheck, 200);
    this.createRenderer();
    this.createCamera();
    this.createScene();
    this.onResize();
    this.createGeometry();
    this.createMedias(items);
    this.update();
    this.addEventListeners();
  }
  
  createRenderer() {
    this.renderer = new Renderer({
      alpha: true,
      antialias: true,
      dpr: Math.min(window.devicePixelRatio || 1, 2)
    });
    this.gl = this.renderer.gl;
    this.gl.clearColor(0, 0, 0, 0);
    this.container.appendChild(this.gl.canvas);
  }
  
  createCamera() {
    this.camera = new Camera(this.gl);
    this.camera.fov = 45;
    this.camera.position.z = 20;
  }
  
  createScene() {
    this.scene = new Transform();
  }
  
  createGeometry() {
    this.planeGeometry = new Plane(this.gl, {
      heightSegments: 20,
      widthSegments: 20
    });
  }
  
  createMedias(items) {
    const galleryItems = items.concat(items); // Duplicate for infinite scroll
    this.mediasImages = galleryItems;
    this.medias = this.mediasImages.map((data, index) => {
      return new Media({
        geometry: this.planeGeometry,
        gl: this.gl,
        image: data.image,
        index,
        length: this.mediasImages.length,
        renderer: this.renderer,
        scene: this.scene,
        screen: this.screen,
        text: data.text,
        price: data.price,
        viewport: this.viewport
      });
    });
  }
  
  onTouchDown(e) {
    this.isDown = true;
    this.scroll.position = this.scroll.current;
    this.start = e.touches ? e.touches[0].clientX : e.clientX;
  }
  
  onTouchMove(e) {
    if (!this.isDown) return;
    const x = e.touches ? e.touches[0].clientX : e.clientX;
    const distance = (this.start - x) * (this.scrollSpeed * 0.02);
    this.scroll.target = this.scroll.position + distance;
  }
  
  onTouchUp() {
    this.isDown = false;
    this.onCheck();
  }
  
  onWheel(e) {
    const delta = e.deltaY || e.wheelDelta || e.detail;
    this.scroll.target += (delta > 0 ? this.scrollSpeed : -this.scrollSpeed) * 0.1;
    this.onCheckDebounce();
  }
  
  onCheck() {
    if (!this.medias || !this.medias[0]) return;
    const width = this.medias[0].width;
    const itemIndex = Math.round(Math.abs(this.scroll.target) / width);
    const item = width * itemIndex;
    this.scroll.target = this.scroll.target < 0 ? -item : item;
  }
  
  onResize() {
    this.screen = {
      width: this.container.clientWidth,
      height: this.container.clientHeight
    };
    this.renderer.setSize(this.screen.width, this.screen.height);
    this.camera.perspective({
      aspect: this.screen.width / this.screen.height
    });
    const fov = (this.camera.fov * Math.PI) / 180;
    const height = 2 * Math.tan(fov / 2) * this.camera.position.z;
    const width = height * this.camera.aspect;
    this.viewport = { width, height };
    if (this.medias) {
      this.medias.forEach(media => media.onResize({ screen: this.screen, viewport: this.viewport }));
    }
  }
  
  update() {
    this.scroll.current = lerp(this.scroll.current, this.scroll.target, this.scroll.ease);
    const direction = this.scroll.current > this.scroll.last ? 'right' : 'left';
    
    if (this.medias) {
      this.medias.forEach(media => {
        // Only update media that have valid programs
        if (media.program && media.program.uniforms) {
          media.update(this.scroll, direction);
        }
      });
    }
    
    // Only render if we have valid media with programs
    const validMedias = this.medias ? this.medias.filter(media => media.program && media.program.uniforms) : [];
    if (validMedias.length > 0) {
      this.renderer.render({ scene: this.scene, camera: this.camera });
    }
    
    this.scroll.last = this.scroll.current;
    this.raf = window.requestAnimationFrame(this.update.bind(this));
  }
  
  addEventListeners() {
    this.boundOnResize = this.onResize.bind(this);
    this.boundOnWheel = this.onWheel.bind(this);
    this.boundOnTouchDown = this.onTouchDown.bind(this);
    this.boundOnTouchMove = this.onTouchMove.bind(this);
    this.boundOnTouchUp = this.onTouchUp.bind(this);
    
    window.addEventListener('resize', this.boundOnResize);
    window.addEventListener('mousewheel', this.boundOnWheel);
    window.addEventListener('wheel', this.boundOnWheel);
    window.addEventListener('mousedown', this.boundOnTouchDown);
    window.addEventListener('mousemove', this.boundOnTouchMove);
    window.addEventListener('mouseup', this.boundOnTouchUp);
    window.addEventListener('touchstart', this.boundOnTouchDown);
    window.addEventListener('touchmove', this.boundOnTouchMove);
    window.addEventListener('touchend', this.boundOnTouchUp);
  }
  
  destroy() {
    window.cancelAnimationFrame(this.raf);
    window.removeEventListener('resize', this.boundOnResize);
    window.removeEventListener('mousewheel', this.boundOnWheel);
    window.removeEventListener('wheel', this.boundOnWheel);
    window.removeEventListener('mousedown', this.boundOnTouchDown);
    window.removeEventListener('mousemove', this.boundOnTouchMove);
    window.removeEventListener('mouseup', this.boundOnTouchUp);
    window.removeEventListener('touchstart', this.boundOnTouchDown);
    window.removeEventListener('touchmove', this.boundOnTouchMove);
    window.removeEventListener('touchend', this.boundOnTouchUp);
    if (this.renderer && this.renderer.gl && this.renderer.gl.canvas.parentNode) {
      this.renderer.gl.canvas.parentNode.removeChild(this.renderer.gl.canvas);
    }
  }
}

function AnimatedGallery({
  items,
  scrollSpeed = 1,
  scrollEase = 0.1
}) {
  const containerRef = useRef(null);
  
  useEffect(() => {
    const app = new App(
      containerRef.current,
      { items, scrollSpeed, scrollEase }
    );
    return () => {
      app.destroy();
    };
  }, [items, scrollSpeed, scrollEase]);
  
  return (
    <div
      className="w-full h-full overflow-hidden cursor-grab active:cursor-grabbing"
      ref={containerRef}
      style={{ touchAction: 'none' }}
    />
  );
}

const FeaturedProducts = () => {
  // Your exact product data matching the design
  const products = [
    {
      image: ceramicPlate,
      text: "Ceramic Art Plate- Pichwah Style",
      price: 500
    },
    {
      image: diya,
      text: "Brass Diya Lamps (Set of 2)",
      price: 350
    },
    {
      image: coaster,
      text: "Kutchh Embroidered Coaster",
      price: 700
    },
    {
      image: vase,
      text: "Terracotta Miniature Vase",
      price: 1000
    }
  ];

  return (
    <section className="py-7 pb-10 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-8 pt-5 text-center text-[#205963]">
          Featured Products
        </h2>
        
        {/* Animated Gallery - larger cards, reduced height */}
        <div className="w-full h-[400px] mb-6">  {/* Reduced from 500px to 400px */}
          <AnimatedGallery
            items={products}
            scrollSpeed={2}
            scrollEase={0.1}
          />
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;