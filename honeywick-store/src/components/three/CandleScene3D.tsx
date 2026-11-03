import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Flame, Eye, RotateCcw, Sparkles, Volume2, VolumeX, ShieldAlert } from 'lucide-react';

interface CandleScene3DProps {
  candleType?: 'jar' | 'bubble';
  initialLit?: boolean;
  waxColorHex?: string;
  onLightToggle?: (isLit: boolean) => void;
  className?: string;
  showControls?: boolean;
  interactive?: boolean;
}

export const CandleScene3D: React.FC<CandleScene3DProps> = ({
  candleType = 'jar',
  initialLit = true,
  waxColorHex = '#FFF8F0',
  onLightToggle,
  className = '',
  showControls = true,
  interactive = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLit, setIsLit] = useState<boolean>(initialLit);
  const [hasWebGL, setHasWebGL] = useState<boolean>(true);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [activeWaxColor, setActiveWaxColor] = useState<string>(waxColorHex);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);

  // Three.js internal references
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const flameGroupRef = useRef<THREE.Group | null>(null);
  const flameLightRef = useRef<THREE.PointLight | null>(null);
  const waxMeshRef = useRef<THREE.Mesh | null>(null);
  const bubbleMeshesRef = useRef<THREE.Mesh[]>([]);
  const rootObjectRef = useRef<THREE.Group | null>(null);
  const isDraggingRef = useRef<boolean>(false);
  const previousMousePositionRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const targetRotationRef = useRef<{ x: number; y: number }>({ x: 0.15, y: -0.35 });
  const currentRotationRef = useRef<{ x: number; y: number }>({ x: 0.15, y: -0.35 });
  const animFrameIdRef = useRef<number>(0);

  // Audio tone generator for satisfying match ignition & flame crackle
  const playIgniteSound = (ignite: boolean) => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);

      if (ignite) {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(320, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(560, audioCtx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.3);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.3);
      } else {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(450, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(120, audioCtx.currentTime + 0.2);
        gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.2);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.2);
      }
    } catch {
      // Audio not supported or blocked
    }
  };

  const handleToggleLight = () => {
    const nextState = !isLit;
    setIsLit(nextState);
    playIgniteSound(nextState);
    if (onLightToggle) onLightToggle(nextState);
  };

  // Sync with prop changes
  useEffect(() => {
    setActiveWaxColor(waxColorHex);
    if (waxMeshRef.current && (waxMeshRef.current.material as THREE.MeshStandardMaterial)) {
      (waxMeshRef.current.material as THREE.MeshStandardMaterial).color.set(waxColorHex);
    }
    bubbleMeshesRef.current.forEach(mesh => {
      if (mesh.material && (mesh.material as THREE.MeshStandardMaterial).color) {
        (mesh.material as THREE.MeshStandardMaterial).color.set(waxColorHex);
      }
    });
  }, [waxColorHex]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check WebGL availability
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setHasWebGL(false);
        return;
      }
    } catch {
      setHasWebGL(false);
      return;
    }

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 450;

    // Scene & Camera
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 1.2, 5.0);
    camera.lookAt(0, 0.1, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    rendererRef.current = renderer;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xfff6ea, 1.4);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.8);
    keyLight.position.set(3, 6, 4);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xf5d6dc, 0.9);
    fillLight.position.set(-4, 3, -2);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xffe6cb, 1.2);
    rimLight.position.set(0, 4, -4);
    scene.add(rimLight);

    // Flame Point Light
    const flameLight = new THREE.PointLight(0xff9e2a, isLit ? 3.2 : 0, 4.5, 1.5);
    flameLight.position.set(0, 1.2, 0);
    flameLight.castShadow = true;
    scene.add(flameLight);
    flameLightRef.current = flameLight;

    // Pedestal Shadow Floor
    const floorGeo = new THREE.PlaneGeometry(10, 10);
    const floorMat = new THREE.ShadowMaterial({ opacity: 0.18 });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -1.2;
    floor.receiveShadow = true;
    scene.add(floor);

    // Soft reflective pedestal disk
    const diskGeo = new THREE.CylinderGeometry(1.6, 1.7, 0.08, 64);
    const diskMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.3,
      metalness: 0.05,
    });
    const disk = new THREE.Mesh(diskGeo, diskMat);
    disk.position.y = -1.16;
    disk.receiveShadow = true;
    scene.add(disk);

    // Root Candle Group
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);
    rootObjectRef.current = rootGroup;

    // Helper: Create Texture for Honeywick Logo on Jar
    const createLogoTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 512;
      const ctx = canvas.getContext('2d');
      if (!ctx) return null;

      // Transparent background
      ctx.clearRect(0, 0, 512, 512);

      // Outer Pink Circle
      ctx.beginPath();
      ctx.arc(256, 256, 220, 0, Math.PI * 2);
      ctx.fillStyle = '#F5D6DC';
      ctx.fill();
      ctx.lineWidth = 10;
      ctx.strokeStyle = '#D87591';
      ctx.stroke();

      // Inner dotted border
      ctx.beginPath();
      ctx.arc(256, 256, 200, 0, Math.PI * 2);
      ctx.setLineDash([8, 8]);
      ctx.lineWidth = 3;
      ctx.strokeStyle = '#D87591';
      ctx.stroke();
      ctx.setLineDash([]);

      // Candle Icon Illustration
      ctx.fillStyle = '#FFFFFF';
      ctx.strokeStyle = '#8E2949';
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.roundRect(200, 170, 112, 90, 12);
      ctx.fill();
      ctx.stroke();

      // Ribbon
      ctx.strokeStyle = '#8E2949';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(200, 215);
      ctx.lineTo(312, 215);
      ctx.stroke();

      // Flame icon
      ctx.fillStyle = '#E7AA51';
      ctx.beginPath();
      ctx.moveTo(256, 105);
      ctx.quadraticCurveTo(280, 135, 272, 160);
      ctx.quadraticCurveTo(256, 170, 240, 160);
      ctx.quadraticCurveTo(232, 135, 256, 105);
      ctx.fill();

      // "honeywick" Brand Text
      ctx.font = 'bold 58px "Cormorant Garamond", Georgia, serif';
      ctx.fillStyle = '#8E2949';
      ctx.textAlign = 'center';
      ctx.fillText('honeywick', 256, 330);

      // Subtitle
      ctx.font = '500 18px "Manrope", sans-serif';
      ctx.fillStyle = '#8E2949';
      ctx.letterSpacing = '2px';
      ctx.fillText('✦ SCENTED & DECORATIVE ✦', 256, 368);

      // Bow flourish
      ctx.font = '28px serif';
      ctx.fillText('୨୧', 256, 405);

      const texture = new THREE.CanvasTexture(canvas);
      texture.anisotropy = 8;
      return texture;
    };

    // BUILD OBJECT BASED ON TYPE
    if (candleType === 'jar') {
      // 1. Clear Glass Outer Tumbler
      const glassOuterGeo = new THREE.CylinderGeometry(1.05, 1.0, 2.1, 64, 1, true);
      const glassMat = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.45,
        roughness: 0.04,
        metalness: 0.05,
        transmission: 0.88,
        ior: 1.52,
        reflectivity: 0.8,
        clearcoat: 1.0,
        clearcoatRoughness: 0.05,
        side: THREE.DoubleSide,
      });
      const glassOuter = new THREE.Mesh(glassOuterGeo, glassMat);
      glassOuter.position.y = 0;
      glassOuter.castShadow = true;
      rootGroup.add(glassOuter);

      // Heavy Solid Glass Base
      const glassBaseGeo = new THREE.CylinderGeometry(0.99, 0.99, 0.22, 64);
      const glassBase = new THREE.Mesh(glassBaseGeo, glassMat);
      glassBase.position.y = -1.0;
      rootGroup.add(glassBase);

      // Polished Glass Top Rim
      const glassRimGeo = new THREE.TorusGeometry(1.025, 0.035, 24, 64);
      const glassRim = new THREE.Mesh(glassRimGeo, glassMat);
      glassRim.rotation.x = Math.PI / 2;
      glassRim.position.y = 1.05;
      rootGroup.add(glassRim);

      // 2. Soy Wax Fill
      const waxGeo = new THREE.CylinderGeometry(0.98, 0.96, 1.6, 48);
      const waxMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(activeWaxColor),
        roughness: 0.45,
        metalness: 0.02,
      });
      const waxMesh = new THREE.Mesh(waxGeo, waxMat);
      waxMesh.position.y = -0.15;
      waxMesh.receiveShadow = true;
      rootGroup.add(waxMesh);
      waxMeshRef.current = waxMesh;

      // Melted Wax pool ring at the top
      const waxTopGeo = new THREE.CircleGeometry(0.97, 48);
      const waxTopMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(activeWaxColor),
        roughness: 0.15,
        metalness: 0.08,
      });
      const waxTop = new THREE.Mesh(waxTopGeo, waxTopMat);
      waxTop.rotation.x = -Math.PI / 2;
      waxTop.position.y = 0.65;
      waxTop.receiveShadow = true;
      rootGroup.add(waxTop);

      // 3. Braided Cotton Wick
      const wickGeo = new THREE.CylinderGeometry(0.025, 0.025, 0.32, 16);
      const wickMat = new THREE.MeshStandardMaterial({
        color: 0x221a17,
        roughness: 0.9,
      });
      const wick = new THREE.Mesh(wickGeo, wickMat);
      wick.position.set(0, 0.78, 0);
      wick.castShadow = true;
      rootGroup.add(wick);

      // Burnt tip
      const burntTipGeo = new THREE.SphereGeometry(0.035, 12, 12);
      const burntTipMat = new THREE.MeshBasicMaterial({ color: 0x110d0b });
      const burntTip = new THREE.Mesh(burntTipGeo, burntTipMat);
      burntTip.position.set(0, 0.92, 0);
      rootGroup.add(burntTip);

      // 4. Circular Logo Label on Glass
      const logoTexture = createLogoTexture();
      if (logoTexture) {
        const labelGeo = new THREE.CylinderGeometry(1.06, 1.06, 0.95, 32, 1, true, -Math.PI * 0.28, Math.PI * 0.56);
        const labelMat = new THREE.MeshBasicMaterial({
          map: logoTexture,
          transparent: true,
          side: THREE.DoubleSide,
          depthWrite: false,
        });
        const labelMesh = new THREE.Mesh(labelGeo, labelMat);
        labelMesh.position.y = -0.05;
        rootGroup.add(labelMesh);
      }
    } else {
      // BUBBLE CANDLE (3x3x3 Grid of 27 Spheres)
      bubbleMeshesRef.current = [];
      const sphereRadius = 0.34;
      const sphereSpacing = 0.58;
      const bubbleGeo = new THREE.SphereGeometry(sphereRadius, 32, 32);
      const bubbleMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(activeWaxColor),
        roughness: 0.5,
        metalness: 0.02,
      });

      for (let x = -1; x <= 1; x++) {
        for (let y = -1; y <= 1; y++) {
          for (let z = -1; z <= 1; z++) {
            const sphere = new THREE.Mesh(bubbleGeo, bubbleMat);
            sphere.position.set(x * sphereSpacing, y * sphereSpacing - 0.2, z * sphereSpacing);
            sphere.castShadow = true;
            sphere.receiveShadow = true;
            rootGroup.add(sphere);
            bubbleMeshesRef.current.push(sphere);
          }
        }
      }

      // Top Wick
      const wickGeo = new THREE.CylinderGeometry(0.025, 0.025, 0.38, 16);
      const wickMat = new THREE.MeshStandardMaterial({ color: 0x241d1a, roughness: 0.8 });
      const wick = new THREE.Mesh(wickGeo, wickMat);
      wick.position.set(0, 0.55, 0);
      wick.castShadow = true;
      rootGroup.add(wick);
    }

    // 5. ANIMATED PROCEDURAL FLAME
    const flameGroup = new THREE.Group();
    const flameY = candleType === 'jar' ? 1.02 : 0.72;
    flameGroup.position.set(0, flameY, 0);
    flameGroup.visible = isLit;
    rootGroup.add(flameGroup);
    flameGroupRef.current = flameGroup;

    // Inner bright core
    const innerFlameGeo = new THREE.ConeGeometry(0.08, 0.32, 16);
    const innerFlameMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.95,
    });
    const innerFlame = new THREE.Mesh(innerFlameGeo, innerFlameMat);
    innerFlame.position.y = 0.15;
    flameGroup.add(innerFlame);

    // Golden honey body
    const bodyFlameGeo = new THREE.ConeGeometry(0.14, 0.44, 16);
    const bodyFlameMat = new THREE.MeshBasicMaterial({
      color: 0xffa726,
      transparent: true,
      opacity: 0.85,
    });
    const bodyFlame = new THREE.Mesh(bodyFlameGeo, bodyFlameMat);
    bodyFlame.position.y = 0.20;
    flameGroup.add(bodyFlame);

    // Outer warm amber halo
    const outerFlameGeo = new THREE.ConeGeometry(0.20, 0.54, 16);
    const outerFlameMat = new THREE.MeshBasicMaterial({
      color: 0xff5722,
      transparent: true,
      opacity: 0.45,
    });
    const outerFlame = new THREE.Mesh(outerFlameGeo, outerFlameMat);
    outerFlame.position.y = 0.24;
    flameGroup.add(outerFlame);

    // Subtle blue base flame
    const baseFlameGeo = new THREE.SphereGeometry(0.07, 12, 12);
    const baseFlameMat = new THREE.MeshBasicMaterial({
      color: 0x3388ff,
      transparent: true,
      opacity: 0.75,
    });
    const baseFlame = new THREE.Mesh(baseFlameGeo, baseFlameMat);
    baseFlame.position.y = 0.03;
    baseFlame.scale.set(1, 0.5, 1);
    flameGroup.add(baseFlame);

    // ANIMATION & INTERACTION LOOP
    let clock = new THREE.Clock();

    const animate = () => {
      animFrameIdRef.current = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Smooth damped rotation towards target
      if (rootObjectRef.current) {
        // Idle gentle rotation when not dragging
        if (!isDraggingRef.current) {
          targetRotationRef.current.y += 0.003;
        }

        currentRotationRef.current.x += (targetRotationRef.current.x - currentRotationRef.current.x) * 0.08;
        currentRotationRef.current.y += (targetRotationRef.current.y - currentRotationRef.current.y) * 0.08;

        rootObjectRef.current.rotation.x = currentRotationRef.current.x;
        rootObjectRef.current.rotation.y = currentRotationRef.current.y;
      }

      // Organic Flame flicker
      if (flameGroupRef.current && isLit) {
        const flicker1 = Math.sin(elapsedTime * 12) * 0.04;
        const flicker2 = Math.cos(elapsedTime * 19) * 0.03;
        const flicker3 = Math.sin(elapsedTime * 27) * 0.05;

        flameGroupRef.current.scale.set(
          1 + flicker1,
          1 + flicker3 * 1.5,
          1 + flicker2
        );

        flameGroupRef.current.rotation.z = Math.sin(elapsedTime * 8) * 0.08;
        flameGroupRef.current.rotation.x = Math.cos(elapsedTime * 10) * 0.06;

        if (flameLightRef.current) {
          flameLightRef.current.intensity = 2.8 + Math.sin(elapsedTime * 15) * 0.6;
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    // MOUSE & TOUCH EVENT LISTENERS
    const onMouseDown = (e: MouseEvent) => {
      if (!interactive) return;
      isDraggingRef.current = true;
      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current || !interactive) return;
      const deltaX = e.clientX - previousMousePositionRef.current.x;
      const deltaY = e.clientY - previousMousePositionRef.current.y;

      targetRotationRef.current.y += deltaX * 0.008;
      targetRotationRef.current.x = Math.max(-0.4, Math.min(0.6, targetRotationRef.current.x + deltaY * 0.008));

      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDraggingRef.current = false;
    };

    // Touch events for mobile
    const onTouchStart = (e: TouchEvent) => {
      if (!interactive || e.touches.length !== 1) return;
      isDraggingRef.current = true;
      previousMousePositionRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDraggingRef.current || !interactive || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - previousMousePositionRef.current.x;
      const deltaY = e.touches[0].clientY - previousMousePositionRef.current.y;

      targetRotationRef.current.y += deltaX * 0.01;
      targetRotationRef.current.x = Math.max(-0.4, Math.min(0.6, targetRotationRef.current.x + deltaY * 0.01));

      previousMousePositionRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const onTouchEnd = () => {
      isDraggingRef.current = false;
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    domElement.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    // Responsive Resize Handler
    const handleResize = () => {
      if (!container || !renderer) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animFrameIdRef.current);
      domElement.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      domElement.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (container.contains(domElement)) {
        container.removeChild(domElement);
      }
    };
  }, [candleType]);

  // Sync flame state on toggle
  useEffect(() => {
    if (flameGroupRef.current) {
      flameGroupRef.current.visible = isLit;
    }
    if (flameLightRef.current) {
      flameLightRef.current.intensity = isLit ? 3.0 : 0;
    }
  }, [isLit]);

  const handleResetView = () => {
    targetRotationRef.current = { x: 0.15, y: -0.35 };
  };

  const paletteColors = [
    { label: 'Soy Cream', hex: '#FFF8F0' },
    { label: 'Blush Rose', hex: '#F7C5D1' },
    { label: 'Golden Honey', hex: '#F9DE9C' },
    { label: 'Lavender', hex: '#E2D9F3' },
    { label: 'Baby Blue', hex: '#A0C4FF' },
  ];

  if (!hasWebGL) {
    return (
      <div className={`relative rounded-3xl bg-blush-light p-6 flex flex-col items-center justify-center border border-border ${className}`}>
        <img
          src={candleType === 'jar' ? '/images/products/delulu-hero-lit.jpeg' : '/images/products/bubble-gum-pastels.jpeg'}
          alt="Honeywick Candle"
          className="w-full max-w-xs h-64 object-cover rounded-2xl shadow-warm mb-4"
        />
        <div className="flex items-center gap-2 text-muted text-sm">
          <ShieldAlert className="w-4 h-4 text-berry" />
          <span>Showing studio photo (3D hardware acceleration unavailable)</span>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative select-none overflow-hidden rounded-3xl transition-all duration-300 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 3D Canvas Viewport */}
      <div
        ref={containerRef}
        className="w-full h-full min-h-[360px] cursor-grab active:cursor-grabbing touch-none"
      />

      {/* Subtle Glow Overlay when Lit */}
      {isLit && (
        <div className="pointer-events-none absolute inset-0 bg-radial-gradient from-honey/15 via-transparent to-transparent opacity-80" />
      )}

      {/* Floating Status & Interaction Pills */}
      <div className="absolute top-4 left-4 flex flex-wrap gap-2 pointer-events-auto">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-surface/90 backdrop-blur-md text-cocoa shadow-sm border border-border/60">
          <Sparkles className="w-3.5 h-3.5 text-honey" />
          <span>Interactive 3D Studio</span>
        </span>

        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-surface/80 backdrop-blur-md text-muted border border-border/40">
          <RotateCcw className="w-3 h-3 text-berry" />
          <span>Drag 360° to rotate</span>
        </span>
      </div>

      {/* Top Right Sound & Reset Controls */}
      <div className="absolute top-4 right-4 flex items-center gap-2 pointer-events-auto">
        <button
          onClick={() => setSoundEnabled(!soundEnabled)}
          title={soundEnabled ? 'Mute flame sound' : 'Enable ambient flame sound'}
          className="p-2 rounded-full bg-surface/80 hover:bg-surface text-cocoa border border-border/60 shadow-sm transition-transform active:scale-95"
        >
          {soundEnabled ? <Volume2 className="w-4 h-4 text-berry" /> : <VolumeX className="w-4 h-4 text-muted" />}
        </button>

        <button
          onClick={handleResetView}
          title="Reset View"
          className="p-2 rounded-full bg-surface/80 hover:bg-surface text-cocoa border border-border/60 shadow-sm transition-transform active:scale-95"
        >
          <RotateCcw className="w-4 h-4 text-cocoa" />
        </button>
      </div>

      {/* Bottom Floating Interactive Controls Bar */}
      {showControls && (
        <div className="absolute bottom-4 inset-x-4 flex flex-col sm:flex-row items-center justify-between gap-3 pointer-events-auto">
          {/* Flame Toggle Primary Action */}
          <button
            onClick={handleToggleLight}
            className={`flex items-center gap-2.5 px-5 py-2.5 rounded-full font-semibold text-sm transition-all shadow-warm transform active:scale-95 ${
              isLit
                ? 'bg-berry text-white hover:bg-berry-dark ring-4 ring-honey/30 shadow-glow'
                : 'bg-surface/95 text-cocoa hover:bg-surface border border-border hover:border-berry'
            }`}
          >
            <Flame className={`w-4 h-4 transition-transform ${isLit ? 'text-honey fill-honey scale-110' : 'text-muted'}`} />
            <span>{isLit ? 'Extinguish Flame' : 'Light the Mood'}</span>
          </button>

          {/* Real-time Wax Shade Customizer */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface/90 backdrop-blur-md border border-border/80 shadow-sm">
            <span className="text-xs text-muted font-medium pr-1">Wax:</span>
            {paletteColors.map(color => (
              <button
                key={color.hex}
                onClick={() => {
                  setActiveWaxColor(color.hex);
                  if (waxMeshRef.current && (waxMeshRef.current.material as THREE.MeshStandardMaterial)) {
                    (waxMeshRef.current.material as THREE.MeshStandardMaterial).color.set(color.hex);
                  }
                  bubbleMeshesRef.current.forEach(mesh => {
                    if (mesh.material && (mesh.material as THREE.MeshStandardMaterial).color) {
                      (mesh.material as THREE.MeshStandardMaterial).color.set(color.hex);
                    }
                  });
                }}
                title={color.label}
                className={`w-5 h-5 rounded-full border transition-transform ${
                  activeWaxColor === color.hex ? 'scale-125 border-berry ring-2 ring-berry/20' : 'border-border/60 hover:scale-110'
                }`}
                style={{ backgroundColor: color.hex }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Illustrative preview disclaimer from PRD/TRD */}
      <div className="absolute bottom-1 right-4 text-[10px] text-muted/70 pointer-events-none">
        Illustrative 3D preview • Real studio photos in gallery
      </div>
    </div>
  );
};
