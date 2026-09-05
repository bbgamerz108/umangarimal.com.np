import { i as __toESM } from "../_runtime.mjs";
import { A as SRGBColorSpace, H as require_jsx_runtime, R as Vector3, T as MeshStandardMaterial, U as require_react, a as Canvas, d as BufferAttribute, f as BufferGeometry, i as useTexture, k as PointsMaterial, n as ContactShadows, r as RoundedBox, s as useFrame, t as Sparkles } from "../_libs/@react-three/drei+[...].mjs";
import { n as FRAME_TEXTURES, r as useScroll } from "./routes-BO-79rNs.mjs";
import { a as Vignette, i as Noise, n as ChromaticAberration, o as BlendFunction, r as EffectComposer, t as Bloom } from "../_libs/@react-three/postprocessing+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/SceneCanvas-BA4lE-1c.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Dslr() {
	const rec = (0, import_react.useRef)(null);
	const mats = (0, import_react.useMemo)(() => {
		return {
			body: new MeshStandardMaterial({
				color: "#1a1612",
				roughness: .38,
				metalness: .72
			}),
			leather: new MeshStandardMaterial({
				color: "#0e0c0a",
				roughness: .82,
				metalness: .08
			}),
			gold: new MeshStandardMaterial({
				color: "#c4a46a",
				roughness: .28,
				metalness: .92
			}),
			glass: new MeshStandardMaterial({
				color: "#071018",
				roughness: .06,
				metalness: .95
			}),
			dark: new MeshStandardMaterial({
				color: "#090807",
				roughness: .5,
				metalness: .4
			}),
			lcd: new MeshStandardMaterial({
				color: "#14110c",
				roughness: .2,
				metalness: .3,
				emissive: "#3a2a12",
				emissiveIntensity: .35
			})
		};
	}, []);
	useFrame((state) => {
		if (rec.current) rec.current.emissiveIntensity = .45 + Math.sin(state.clock.elapsedTime * 4) * .4;
	});
	const blades = 8;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RoundedBox, {
			args: [
				1.72,
				1.05,
				.82
			],
			radius: .06,
			smoothness: 4,
			castShadow: true,
			receiveShadow: true,
			material: mats.body
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RoundedBox, {
			args: [
				1.55,
				.72,
				.84
			],
			radius: .05,
			smoothness: 4,
			position: [
				.02,
				-.08,
				0
			],
			material: mats.leather
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RoundedBox, {
			args: [
				.46,
				1.08,
				.92
			],
			radius: .08,
			smoothness: 4,
			position: [
				.78,
				-.04,
				.04
			],
			castShadow: true,
			material: mats.leather
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RoundedBox, {
			args: [
				.2,
				.55,
				.7
			],
			radius: .04,
			position: [
				.92,
				.02,
				.08
			],
			material: mats.body
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RoundedBox, {
			args: [
				1.62,
				.14,
				.78
			],
			radius: .03,
			position: [
				0,
				.54,
				0
			],
			material: mats.body
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RoundedBox, {
			args: [
				.62,
				.38,
				.52
			],
			radius: .03,
			position: [
				-.12,
				.72,
				-.08
			],
			material: mats.body
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			position: [
				-.12,
				.86,
				.18
			],
			rotation: [
				.4,
				0,
				0
			],
			material: mats.dark,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				.5,
				.08,
				.28
			] })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			position: [
				-.12,
				.94,
				-.08
			],
			material: mats.gold,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				.28,
				.06,
				.18
			] })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			position: [
				.52,
				.66,
				-.18
			],
			rotation: [
				Math.PI / 2,
				0,
				0
			],
			castShadow: true,
			material: mats.dark,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
				.13,
				.13,
				.08,
				24
			] })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			position: [
				.52,
				.71,
				-.18
			],
			rotation: [
				Math.PI / 2,
				0,
				0
			],
			material: mats.gold,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
				.09,
				.09,
				.02,
				24
			] })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			position: [
				.78,
				.64,
				.16
			],
			rotation: [
				Math.PI / 2,
				0,
				0
			],
			material: mats.gold,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
				.055,
				.055,
				.05,
				20
			] })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				.62,
				.58,
				.42
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
				.025,
				12,
				12
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				ref: rec,
				color: "#d4af6a",
				emissive: "#d4af6a",
				emissiveIntensity: .8,
				roughness: .3
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
			position: [
				0,
				-.04,
				.42
			],
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
					position: [
						0,
						0,
						.18
					],
					rotation: [
						Math.PI / 2,
						0,
						0
					],
					castShadow: true,
					material: mats.body,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
						.42,
						.46,
						.38,
						48
					] })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
					position: [
						0,
						0,
						.4
					],
					rotation: [
						Math.PI / 2,
						0,
						0
					],
					material: mats.dark,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
						.44,
						.44,
						.08,
						48
					] })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
					position: [
						0,
						0,
						.48
					],
					rotation: [
						Math.PI / 2,
						0,
						0
					],
					material: mats.gold,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("torusGeometry", { args: [
						.45,
						.028,
						12,
						48
					] })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
					position: [
						0,
						0,
						.62
					],
					rotation: [
						Math.PI / 2,
						0,
						0
					],
					castShadow: true,
					material: mats.body,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
						.4,
						.42,
						.28,
						48
					] })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
					position: [
						0,
						0,
						.76
					],
					rotation: [
						Math.PI / 2,
						0,
						0
					],
					material: mats.gold,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("torusGeometry", { args: [
						.4,
						.02,
						10,
						40
					] })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
					position: [
						0,
						0,
						.78
					],
					rotation: [
						Math.PI / 2,
						0,
						0
					],
					material: mats.glass,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circleGeometry", { args: [.36, 48] })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
					position: [
						0,
						0,
						.79
					],
					rotation: [
						Math.PI / 2,
						0,
						0
					],
					children: Array.from({ length: blades }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
						rotation: [
							0,
							0,
							i / blades * Math.PI * 2
						],
						material: mats.gold,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
							.018,
							.22,
							.008
						] })
					}, i))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
					position: [
						0,
						0,
						.8
					],
					rotation: [
						Math.PI / 2,
						0,
						0
					],
					material: mats.gold,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ringGeometry", { args: [
						.36,
						.4,
						48
					] })
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RoundedBox, {
			args: [
				.78,
				.52,
				.03
			],
			radius: .02,
			position: [
				-.12,
				-.04,
				-.42
			],
			material: mats.lcd
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				-.12,
				-.04,
				-.438
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [.7, .44] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", { color: "#1c140c" })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			position: [
				-.12,
				.62,
				-.38
			],
			rotation: [
				Math.PI / 2,
				0,
				0
			],
			material: mats.dark,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
				.12,
				.14,
				.1,
				20
			] })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			position: [
				-.88,
				.32,
				0
			],
			rotation: [
				0,
				0,
				Math.PI / 2
			],
			material: mats.gold,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("torusGeometry", { args: [
				.05,
				.014,
				8,
				16
			] })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			position: [
				.88,
				.38,
				-.1
			],
			rotation: [
				0,
				0,
				Math.PI / 2
			],
			material: mats.gold,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("torusGeometry", { args: [
				.05,
				.014,
				8,
				16
			] })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				.46,
				.28,
				-.42
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circleGeometry", { args: [.07, 24] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#c4a46a",
				metalness: .9,
				roughness: .3
			})]
		})
	] });
}
function Frame({ url, position, rotation, width }) {
	const tex = useTexture(url);
	tex.colorSpace = SRGBColorSpace;
	const height = width * .68;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		position,
		rotation,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				width + .08,
				height + .08,
				.06
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#c4a46a",
				metalness: .85,
				roughness: .35
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					0,
					.02
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					width + .02,
					height + .02,
					.04
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#0c0b09",
					metalness: .2,
					roughness: .6
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					0,
					.045
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [width, height] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					map: tex,
					roughness: .45,
					metalness: .05
				})]
			})
		]
	});
}
function PhotoFrames() {
	const group = (0, import_react.useRef)(null);
	const progress = useScroll((s) => s.progress);
	const layout = (0, import_react.useMemo)(() => {
		return FRAME_TEXTURES.map((url, i) => {
			const t = i / (FRAME_TEXTURES.length - 1) * Math.PI - Math.PI / 2;
			const x = Math.sin(t) * 6.4;
			const z = -4.2 - Math.cos(t) * 1.6;
			return {
				url,
				position: [
					x,
					(i % 3 - 1) * 1.35,
					z
				],
				rotation: [
					0,
					-t * .35,
					0
				],
				width: 1.7 + i % 2 * .25
			};
		});
	}, []);
	useFrame((_, delta) => {
		const g = group.current;
		if (!g) return;
		const p = progress;
		const show = Math.min(1, Math.max(0, (p - .3) / .08) * Math.max(0, 1 - (p - .68) / .12));
		const d = Math.min(delta, .1);
		g.scale.setScalar(g.scale.x + (.85 + show * .15 - g.scale.x) * (1 - Math.exp(-4 * d)));
		g.visible = show > .02;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
		ref: group,
		children: layout.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Frame, { ...f }, f.url + f.position.join()))
	});
}
function Dust({ count = 420 }) {
	const ref = (0, import_react.useRef)(null);
	const geo = (0, import_react.useMemo)(() => {
		const positions = new Float32Array(count * 3);
		const speeds = new Float32Array(count);
		for (let i = 0; i < count; i++) {
			positions[i * 3] = (Math.random() - .5) * 16;
			positions[i * 3 + 1] = (Math.random() - .5) * 10;
			positions[i * 3 + 2] = (Math.random() - .5) * 12;
			speeds[i] = .12 + Math.random() * .28;
		}
		const g = new BufferGeometry();
		g.setAttribute("position", new BufferAttribute(positions, 3));
		g.setAttribute("speed", new BufferAttribute(speeds, 1));
		return g;
	}, [count]);
	const mat = (0, import_react.useMemo)(() => new PointsMaterial({
		color: "#d4af6a",
		size: .028,
		transparent: true,
		opacity: .55,
		depthWrite: false,
		blending: 2,
		sizeAttenuation: true
	}), []);
	useFrame((_, delta) => {
		const d = Math.min(delta, .1);
		const points = ref.current;
		if (!points) return;
		const pos = points.geometry.attributes.position;
		const spd = points.geometry.attributes.speed;
		for (let i = 0; i < pos.count; i++) {
			let y = pos.getY(i) + spd.getX(i) * d * .35;
			if (y > 5) y = -5;
			pos.setY(i, y);
			pos.setX(i, pos.getX(i) + Math.sin(y + i) * d * .04);
		}
		pos.needsUpdate = true;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("points", {
		ref,
		geometry: geo,
		material: mat
	});
}
function lerp(a, b, t) {
	return a + (b - a) * t;
}
function clamp01(n) {
	return Math.min(1, Math.max(0, n));
}
function smoothstep(edge0, edge1, x) {
	const t = clamp01((x - edge0) / (edge1 - edge0));
	return t * t * (3 - 2 * t);
}
var KEYS = [
	{
		p: 0,
		pos: [
			2.45,
			.58,
			4.55
		],
		look: [
			-.35,
			.06,
			.12
		],
		fov: 34
	},
	{
		p: .08,
		pos: [
			2.1,
			.5,
			4.2
		],
		look: [
			-.15,
			.04,
			.08
		],
		fov: 33
	},
	{
		p: .14,
		pos: [
			-.45,
			.32,
			2.95
		],
		look: [
			.85,
			.05,
			0
		],
		fov: 31
	},
	{
		p: .26,
		pos: [
			-1.85,
			.52,
			3.15
		],
		look: [
			.45,
			.06,
			0
		],
		fov: 32
	},
	{
		p: .34,
		pos: [
			.15,
			.7,
			6.2
		],
		look: [
			0,
			.08,
			-1.5
		],
		fov: 38
	},
	{
		p: .48,
		pos: [
			.2,
			.85,
			9
		],
		look: [
			0,
			.1,
			-3.2
		],
		fov: 42
	},
	{
		p: .62,
		pos: [
			1.2,
			.45,
			6.4
		],
		look: [
			-.3,
			0,
			-1.8
		],
		fov: 38
	},
	{
		p: .78,
		pos: [
			-1.4,
			.7,
			5.2
		],
		look: [
			.15,
			.08,
			-.6
		],
		fov: 40
	},
	{
		p: 1,
		pos: [
			.3,
			1.2,
			7.4
		],
		look: [
			0,
			.15,
			0
		],
		fov: 44
	}
];
function sample(progress) {
	const p = clamp01(progress);
	let i = 0;
	while (i < KEYS.length - 1 && KEYS[i + 1].p < p) i++;
	const a = KEYS[i];
	const b = KEYS[Math.min(i + 1, KEYS.length - 1)];
	const span = b.p - a.p || 1;
	const t = smoothstep(0, 1, (p - a.p) / span);
	return {
		p,
		pos: [
			lerp(a.pos[0], b.pos[0], t),
			lerp(a.pos[1], b.pos[1], t),
			lerp(a.pos[2], b.pos[2], t)
		],
		look: [
			lerp(a.look[0], b.look[0], t),
			lerp(a.look[1], b.look[1], t),
			lerp(a.look[2], b.look[2], t)
		],
		fov: lerp(a.fov, b.fov, t)
	};
}
function Backdrop() {
	const tex = useTexture("/photos/durbar-dusk.jpg");
	tex.colorSpace = SRGBColorSpace;
	const mat = (0, import_react.useRef)(null);
	const progress = useScroll((s) => s.progress);
	useFrame(() => {
		if (mat.current) mat.current.opacity = .55 * (1 - smoothstep(.08, .22, progress));
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
		position: [
			0,
			.4,
			-10
		],
		scale: [
			22,
			12.4,
			1
		],
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [1, 1] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
			ref: mat,
			map: tex,
			transparent: true,
			opacity: .4,
			toneMapped: false
		})]
	});
}
function Rig() {
	const look = (0, import_react.useRef)(new Vector3(0, 0, 0));
	const tmp = (0, import_react.useMemo)(() => new Vector3(), []);
	const progress = useScroll((s) => s.progress);
	const mouseX = useScroll((s) => s.mouseX);
	const mouseY = useScroll((s) => s.mouseY);
	const reduced = useScroll((s) => s.reduced);
	useFrame((state, delta) => {
		const d = Math.min(delta, .1);
		const k = sample(progress);
		tmp.set(k.pos[0], k.pos[1], k.pos[2]);
		if (!reduced) {
			tmp.x += mouseX * .45;
			tmp.y += mouseY * .22;
		}
		const alpha = 1 - Math.exp(-3.2 * d);
		state.camera.position.lerp(tmp, alpha);
		look.current.lerp(tmp.set(k.look[0], k.look[1], k.look[2]), alpha);
		state.camera.lookAt(look.current);
		const cam = state.camera;
		cam.fov = lerp(cam.fov, k.fov, alpha);
		cam.updateProjectionMatrix();
	});
	return null;
}
function CameraRig() {
	const group = (0, import_react.useRef)(null);
	const progress = useScroll((s) => s.progress);
	const reduced = useScroll((s) => s.reduced);
	useFrame((state, delta) => {
		const g = group.current;
		if (!g) return;
		const d = Math.min(delta, .1);
		const p = progress;
		const study = smoothstep(.1, .16, p) * (1 - smoothstep(.3, .4, p));
		const after = smoothstep(.3, .38, p);
		const turns = smoothstep(.12, .34, p) * Math.PI * 4;
		const heroSpin = reduced ? .52 : .52 + Math.sin(state.clock.elapsedTime * .28) * .07;
		const y = study > .02 ? .4 + turns : heroSpin;
		g.rotation.y = lerp(g.rotation.y, y, 1 - Math.exp(-3 * d));
		g.rotation.x = lerp(g.rotation.x, -.1, 1 - Math.exp(-3 * d));
		const scale = 1.12 * (1 - after);
		g.scale.setScalar(lerp(g.scale.x, Math.max(.001, scale), 1 - Math.exp(-4 * d)));
		g.visible = after < .98;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		ref: group,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pointLight", {
			position: [
				.6,
				.8,
				1.6
			],
			intensity: 7,
			color: "#f0d7a4",
			distance: 6
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dslr, {})]
	});
}
function World({ fancy }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("color", {
			attach: "background",
			args: ["#0a0908"]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("fog", {
			attach: "fog",
			args: [
				"#0a0908",
				7,
				26
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ambientLight", {
			intensity: .12,
			color: "#efe9dd"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("spotLight", {
			position: [
				4.5,
				6.2,
				4.2
			],
			intensity: 55,
			color: "#e2c48a",
			angle: .38,
			penumbra: .85,
			castShadow: true,
			"shadow-mapSize-width": 1024,
			"shadow-mapSize-height": 1024
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("spotLight", {
			position: [
				-5.2,
				2.4,
				-1.5
			],
			intensity: 22,
			color: "#7f93b8",
			angle: .55,
			penumbra: 1
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pointLight", {
			position: [
				.5,
				.15,
				1.4
			],
			intensity: 6,
			color: "#ffd9a0",
			distance: 5
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("directionalLight", {
			position: [
				0,
				3,
				-8
			],
			intensity: .35,
			color: "#efe9dd"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rig, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CameraRig, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhotoFrames, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Backdrop, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dust, { count: fancy ? 480 : 180 }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, {
			count: fancy ? 60 : 24,
			scale: [
				12,
				5,
				10
			],
			size: 2.4,
			speed: .35,
			color: "#d4af6a",
			opacity: .45
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContactShadows, {
			position: [
				0,
				-1.15,
				0
			],
			opacity: .45,
			scale: 12,
			blur: 2.4,
			far: 4,
			color: "#000000"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			rotation: [
				-Math.PI / 2,
				0,
				0
			],
			position: [
				0,
				-1.16,
				0
			],
			receiveShadow: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circleGeometry", { args: [8, 48] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#0a0908",
				roughness: .9,
				metalness: .2
			})]
		}),
		fancy ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(EffectComposer, {
			multisampling: 0,
			enableNormalPass: false,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bloom, {
					luminanceThreshold: .45,
					intensity: .55,
					mipmapBlur: true,
					luminanceSmoothing: .2
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Vignette, {
					offset: .28,
					darkness: .62
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Noise, {
					premultiply: true,
					blendFunction: BlendFunction.OVERLAY,
					opacity: .18
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChromaticAberration, { offset: [6e-4, 4e-4] })
			]
		}) : null
	] });
}
function SceneCanvas({ fancy }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "scene-root",
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Canvas, {
			dpr: fancy ? [1, 1.6] : [1, 1.15],
			gl: {
				antialias: true,
				alpha: false,
				powerPreference: fancy ? "high-performance" : "default",
				stencil: false
			},
			shadows: fancy ? "percentage" : false,
			onCreated: ({ gl }) => {
				gl.shadowMap.type = 1;
			},
			camera: {
				fov: 34,
				near: .1,
				far: 80,
				position: [
					2.45,
					.58,
					4.55
				]
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
				fallback: null,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(World, { fancy })
			})
		})
	});
}
//#endregion
export { SceneCanvas };
