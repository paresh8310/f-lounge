import * as THREE from "three";

/**
 * F.LOUNGE — fashion-editorial 3D accent scene.
 * Floating rings, faceted glass-like solids and subtle pointer parallax.
 * Abstract accents only — never presented as actual merchandise.
 *
 * Performance notes:
 *  - Shared geometry, ~8 draw calls
 *  - DPR capped (1.5 mobile / 2 desktop)
 *  - Rendering pauses off-screen / hidden tab
 *  - prefers-reduced-motion renders a single static frame
 */

export interface HeroSceneOptions {
  mobile: boolean;
  reducedMotion: boolean;
}

export interface HeroSceneHandle {
  dispose(): void;
}

export function createHeroScene(
  container: HTMLElement,
  canvas: HTMLCanvasElement,
  opts: HeroSceneOptions,
): HeroSceneHandle {
  const { mobile, reducedMotion } = opts;

  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: !mobile,
    powerPreference: "high-performance",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, mobile ? 1.5 : 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 60);
  const CAM_BASE = new THREE.Vector3(0, 0, 9);
  camera.position.copy(CAM_BASE);

  const group = new THREE.Group();
  scene.add(group);

  const geoms: THREE.BufferGeometry[] = [];
  const materials: THREE.Material[] = [];

  const glass = (color: number, opacity: number) => {
    const m = new THREE.MeshPhysicalMaterial({
      color,
      roughness: 0.18,
      metalness: 0.1,
      transparent: true,
      opacity,
      clearcoat: 1,
      clearcoatRoughness: 0.25,
    });
    materials.push(m);
    return m;
  };

  const matLime = glass(0xd7ff38, 0.92);
  const matLavender = glass(0xb9a1ff, 0.85);
  const matAcid = glass(0xff6038, 0.8);
  const matBone = new THREE.MeshStandardMaterial({ color: 0xf5f1e8, roughness: 0.5, metalness: 0.2 });
  materials.push(matBone);

  /* Torus rings — orbiting fashion hoops */
  const ringGeoA = new THREE.TorusGeometry(3.4, 0.045, 16, 90);
  const ringGeoB = new THREE.TorusGeometry(4.6, 0.028, 16, 90);
  geoms.push(ringGeoA, ringGeoB);
  const ringA = new THREE.Mesh(ringGeoA, matLime);
  ringA.rotation.set(Math.PI / 2.4, 0.4, 0);
  const ringB = new THREE.Mesh(ringGeoB, matLavender);
  ringB.rotation.set(Math.PI / 1.9, -0.5, 0.3);
  group.add(ringA, ringB);

  /* Faceted gems / abstract solids */
  const gemGeo = new THREE.IcosahedronGeometry(0.9, 0);
  geoms.push(gemGeo);
  const gemA = new THREE.Mesh(gemGeo, matAcid);
  gemA.position.set(-3.1, 1.15, -0.6);
  const gemB = new THREE.Mesh(gemGeo, matBone);
  gemB.scale.setScalar(0.62);
  gemB.position.set(3.3, -1.05, 0.4);
  const gemC = new THREE.Mesh(gemGeo, matLavender);
  gemC.scale.setScalar(0.45);
  gemC.position.set(2.6, 1.7, -1.4);
  group.add(gemA, gemB, gemC);

  /* Slim capsule shards */
  const shardGeo = new THREE.CapsuleGeometry(0.09, 1.7, 6, 14);
  geoms.push(shardGeo);
  const shardA = new THREE.Mesh(shardGeo, matLime);
  shardA.position.set(1.6, 2.4, -2.2);
  shardA.rotation.z = 0.7;
  const shardB = new THREE.Mesh(shardGeo, matBone);
  shardB.position.set(-2.2, -2.2, -1.2);
  shardB.rotation.z = -0.5;
  group.add(shardA, shardB);

  /* Lights */
  scene.add(new THREE.HemisphereLight(0xf5f1e8, 0x101010, 0.9));
  const key = new THREE.DirectionalLight(0xffffff, 2.6);
  key.position.set(4, 6, 6);
  scene.add(key);
  const rim = new THREE.PointLight(0xd7ff38, mobile ? 12 : 20, 20, 2);
  rim.position.set(-5, -2, 3);
  scene.add(rim);

  /* Interaction & loop */
  const pointer = { x: 0, y: 0 };
  const eased = { x: 0, y: 0 };
  const clock = new THREE.Clock();
  let raf = 0;
  let inView = true;
  let pageHidden = document.hidden;
  let disposed = false;

  const onPointerMove = (e: MouseEvent) => {
    pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
    pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
  };

  const render = () => {
    const t = clock.getElapsedTime();
    eased.x += (pointer.x - eased.x) * 0.045;
    eased.y += (pointer.y - eased.y) * 0.045;
    const scroll = Math.min(1, Math.max(0, window.scrollY / Math.max(1, window.innerHeight)));

    if (!reducedMotion) {
      ringA.rotation.z = t * 0.12;
      ringB.rotation.z = -t * 0.09;
      gemA.rotation.x = t * 0.22;
      gemA.rotation.y = t * 0.16;
      gemB.rotation.x = -t * 0.18;
      gemC.rotation.y = t * 0.3;
      shardA.rotation.x = t * 0.2;
      shardB.rotation.y = t * 0.15;
      group.position.y = Math.sin(t * 0.5) * 0.18 - scroll * 1.6;
      group.rotation.z = scroll * 0.12;
    }

    camera.position.set(CAM_BASE.x + eased.x * 0.7, CAM_BASE.y - eased.y * 0.45, CAM_BASE.z);
    camera.lookAt(0, 0, 0);
    renderer.render(scene, camera);
  };

  const loop = () => {
    raf = requestAnimationFrame(loop);
    if (!inView || pageHidden) return;
    render();
  };

  const resize = () => {
    if (disposed) return;
    const w = container.clientWidth || 1;
    const h = container.clientHeight || 1;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    if (reducedMotion) render();
  };
  const ro = new ResizeObserver(resize);
  ro.observe(container);
  resize();

  const io = new IntersectionObserver(
    (entries) => {
      inView = entries.some((e) => e.isIntersecting);
    },
    { threshold: 0 },
  );
  io.observe(container);

  const onVisibility = () => {
    pageHidden = document.hidden;
  };

  window.addEventListener("pointermove", onPointerMove, { passive: true });
  document.addEventListener("visibilitychange", onVisibility);

  if (reducedMotion) {
    render(); // single static frame
  } else {
    loop();
  }

  return {
    dispose() {
      if (disposed) return;
      disposed = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("visibilitychange", onVisibility);
      for (const g of geoms) g.dispose();
      for (const m of materials) m.dispose();
      renderer.dispose();
    },
  };
}
