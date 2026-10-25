import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { X, Play, Pause, Shield, Info } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface ThreeMerkleVaultProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ThreeMerkleVault: React.FC<ThreeMerkleVaultProps> = ({ isOpen, onClose }) => {
  const { isDark } = useTheme();
  const mountRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [selectedNodeInfo, setSelectedNodeInfo] = useState<string>(
    'Root 0x8a92e41c: 284 Evidence Leafs Verified'
  );
  const isPlayingRef = useRef(isPlaying);
  isPlayingRef.current = isPlaying;

  useEffect(() => {
    if (!isOpen || !mountRef.current) return;

    const container = mountRef.current;
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 500;

    // 1. Scene & Atmosphere (Sleek deep cryptographic container)
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(isDark ? 0x0b0f14 : 0x0f1715);
    scene.fog = new THREE.FogExp2(isDark ? 0x0b0f14 : 0x0f1715, 0.04);

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 5, 12);
    camera.lookAt(0, 0, 0);

    // 3. Renderer with ACESFilmicToneMapping
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // 4. Studio PBR Lighting
    const hemiLight = new THREE.HemisphereLight(0x4edea3, 0x101419, 0.7);
    scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.5);
    dirLight.position.set(6, 10, 6);
    scene.add(dirLight);

    const ambientLight = new THREE.AmbientLight(0x223042, 0.8);
    scene.add(ambientLight);

    // 5. Procedural 3D Cryptographic Vault (Composite group of parts)
    const vaultGroup = new THREE.Group();
    scene.add(vaultGroup);

    // Part 1: Central Root Merkle Core (Octahedron with Beveled Ring)
    const coreGeo = new THREE.OctahedronGeometry(1.2, 0);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x10b981,
      roughness: 0.2,
      metalness: 0.8,
      emissive: 0x059669,
      emissiveIntensity: 0.3,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    coreMesh.position.y = 1.5;
    vaultGroup.add(coreMesh);

    // Part 2: Orbiting Cryptographic Gyroscope Ring 1
    const ringGeo1 = new THREE.TorusGeometry(2.0, 0.06, 16, 64);
    const ringMat1 = new THREE.MeshStandardMaterial({
      color: 0x68dba9,
      metalness: 0.9,
      roughness: 0.1,
    });
    const ringMesh1 = new THREE.Mesh(ringGeo1, ringMat1);
    ringMesh1.position.y = 1.5;
    ringMesh1.rotation.x = Math.PI / 4;
    vaultGroup.add(ringMesh1);

    // Part 3: Orbiting Cryptographic Gyroscope Ring 2
    const ringGeo2 = new THREE.TorusGeometry(2.5, 0.04, 16, 64);
    const ringMat2 = new THREE.MeshStandardMaterial({
      color: 0xffb95f,
      metalness: 0.85,
      roughness: 0.2,
    });
    const ringMesh2 = new THREE.Mesh(ringGeo2, ringMat2);
    ringMesh2.position.y = 1.5;
    ringMesh2.rotation.y = Math.PI / 3;
    vaultGroup.add(ringMesh2);

    // Part 4: Pedestal Base with stepped disc bevels
    const baseGeo = new THREE.CylinderGeometry(3.5, 4.0, 0.4, 32);
    const baseMat = new THREE.MeshStandardMaterial({
      color: 0x182230,
      metalness: 0.5,
      roughness: 0.4,
    });
    const baseMesh = new THREE.Mesh(baseGeo, baseMat);
    baseMesh.position.y = -1.2;
    vaultGroup.add(baseMesh);

    // Part 5: Contact shadow disc
    const shadowGeo = new THREE.CircleGeometry(4.5, 32);
    const shadowMat = new THREE.MeshBasicMaterial({
      color: 0x000000,
      transparent: true,
      opacity: 0.4,
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = -1.41;
    vaultGroup.add(shadowMesh);

    // Part 6-12: Surrounding Merkle Leaf Nodes (8 Nodes on circular orbit)
    const leafNodes: THREE.Mesh[] = [];
    const leafCount = 8;
    const leafGeo = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    const leafMat = new THREE.MeshStandardMaterial({
      color: 0x4edea3,
      roughness: 0.3,
      metalness: 0.7,
    });

    const linesGroup = new THREE.Group();
    vaultGroup.add(linesGroup);

    for (let i = 0; i < leafCount; i++) {
      const angle = (i / leafCount) * Math.PI * 2;
      const radius = 3.6;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = 0.5 + Math.sin(i * 1.5) * 0.4;

      const leaf = new THREE.Mesh(leafGeo, leafMat);
      leaf.position.set(x, y, z);
      leaf.userData = { id: `Leaf #${i + 1}`, hash: `0x7a${i * 11}b...${i * 22}fa` };
      vaultGroup.add(leaf);
      leafNodes.push(leaf);

      // Connecting lines to core
      const lineGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 1.5, 0),
        new THREE.Vector3(x, y, z),
      ]);
      const lineMat = new THREE.LineBasicMaterial({
        color: 0x223042,
        transparent: true,
        opacity: 0.8,
      });
      const line = new THREE.Line(lineGeo, lineMat);
      linesGroup.add(line);
    }

    // 6. Raycasting & Interaction
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onPointerDown = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects([...leafNodes, coreMesh]);
      if (intersects.length > 0) {
        const hit = intersects[0].object;
        if (hit === coreMesh) {
          setSelectedNodeInfo('Merkle Master Root (SHA-256: 0x8a92e41c...99b0fc11)');
        } else if (hit.userData?.id) {
          setSelectedNodeInfo(`${hit.userData.id}: Hash ${hit.userData.hash} (Verified Tombstone)`);
        }
      }
    };
    renderer.domElement.addEventListener('pointerdown', onPointerDown);

    // 7. Animation Loop with smooth rotation
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      if (isPlayingRef.current) {
        vaultGroup.rotation.y += delta * 0.4;
        ringMesh1.rotation.z += delta * 0.6;
        ringMesh2.rotation.x += delta * 0.5;
        coreMesh.rotation.y += delta * 0.8;
      }

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('pointerdown', onPointerDown);
      renderer.dispose();
      if (container && renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [isOpen, isDark]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 animate-fadeIn">
      <div
        className={`rounded-2xl max-w-4xl w-full h-[85vh] flex flex-col overflow-hidden shadow-2xl relative border ${
          isDark
            ? 'bg-[#101419] border-[#223042]'
            : 'bg-white border-[#E2EAE3] card-depth-hover'
        }`}
      >
        {/* Top Header */}
        <div
          className={`px-5 py-4 flex items-center justify-between border-b ${
            isDark
              ? 'bg-[#121820] border-[#223042]'
              : 'bg-[#FFFFFF] border-[#E2EAE3]'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <Shield className="w-4 h-4 text-[#138443] dark:text-[#4EDE78]" />
            <div>
              <h2 className={`text-base font-bold tracking-tight ${isDark ? 'text-[#E0E2EA]' : 'text-[#111713]'}`}>
                3D Merkle Cryptographic Cluster Topology
              </h2>
              <div className={`text-xs font-mono ${isDark ? 'text-[#86948A]' : 'text-[#58645D]'}`}>
                Real-time procedural visualization of decentralized deletion attestations
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close 3D Merkle Vault"
            className="w-8 h-8 rounded-lg border flex items-center justify-center btn-secondary cursor-pointer"
          >
            <X className="w-4 h-4 text-[#111713] dark:text-[#E0E2EA]" />
          </button>
        </div>

        {/* 3D Canvas Mount */}
        <div ref={mountRef} className="flex-1 w-full relative bg-[#0B0F14] overflow-hidden" />

        {/* Floating Viewport-First Control Dock (Compact <= 15% viewport) */}
        <div
          className={`absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 rounded-xl p-4 max-w-md shadow-xl space-y-2 border backdrop-blur-md ${
            isDark
              ? 'bg-[#121820]/95 border-[#223042]'
              : 'bg-white/95 border-[#E2EAE3] text-[#111713]'
          }`}
        >
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-[#138443] dark:text-[#4EDE78] flex items-center gap-1.5">
              <Info className="w-4 h-4" />
              <span>Inspection Node</span>
            </span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="px-3 py-1 rounded-lg text-xs font-semibold btn-secondary transition flex items-center gap-1.5 cursor-pointer"
              >
                {isPlaying ? <Pause className="w-3 h-3 text-[#B45309]" /> : <Play className="w-3 h-3 text-[#138443]" />}
                <span>{isPlaying ? 'Pause' : 'Rotate'}</span>
              </button>
            </div>
          </div>

          <div
            className={`rounded-lg p-2.5 text-xs font-mono border ${
              isDark
                ? 'bg-[#0B0F14] border-[#223042] text-[#E0E2EA]'
                : 'bg-[#F2FBF4] border-[#E2EAE3] text-[#111713]'
            }`}
          >
            {selectedNodeInfo}
          </div>
          <div className="text-xs text-[#58645D] dark:text-[#86948A]">
            Click any orbiting node or central Merkle core to inspect cryptographic tombstone proofs.
          </div>
        </div>
      </div>
    </div>
  );
};
