/*
 * HOMEFRONT ONLINE GAME CLIENT
 * (c) 2015 - Homefront Online. All rights reserved.
 * Developed by Brunno Pleffken Hosti
 *
 * ../libraries/Economy.js
 */

$(document).ready(function() {
	"use strict";

	/*
	 * --------------------------------------------------------------------
	 * RUN WEBGL RENDERING ONLY WHEN VIEWING PLANET DETAILS
	 * --------------------------------------------------------------------
	 */
	if(SETTINGS.action == "planet") {
		planetRender("planet-preview", "earth.png");
	}
});

/*
 * --------------------------------------------------------------------
 * RENDER 3D PLANET USING WEBGL
 * --------------------------------------------------------------------
 */
function planetRender(_containerId, _textureName) {

	// THIS IS THE PLANET! :)
	var sphere;

	// Create scene and camera
	var scene = new THREE.Scene();
	var camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);

	// Initialize WebGL renderer
	var renderer = new THREE.WebGLRenderer({ alpha: true });
	renderer.setSize(250, 250);
	document.getElementById(_containerId).appendChild(renderer.domElement);

	// Load texture and create sphere (a.k.a. planet)
	var loader = new THREE.TextureLoader();
	loader.load("assets/textures/" + _textureName, function(texture) {
		var geometry = new THREE.SphereGeometry(1, 25, 25);
		var material = new THREE.MeshPhongMaterial({
			bumpMap: texture,
			bumpScale: 0.006,
			map: texture,
			shininess: 20
		});

		sphere = new THREE.Mesh(geometry, material);
		sphere.overdraw = true;
		scene.add(sphere);

		// Add subtle ambient lighting
		var ambientLight = new THREE.AmbientLight(0x111111);
		scene.add(ambientLight);

		// Directional lighting
		var directionalLight = new THREE.DirectionalLight(0xffffff);
		directionalLight.position.set(2, 1, 1).normalize();
		scene.add(directionalLight);

		// Define camera distance (Z-axis)
		camera.position.z = 1.7;

		// Render and animate
		var render = function() {
			requestAnimationFrame(render);
			renderer.render(scene, camera);
			sphere.rotation.y -= 0.001;
		};

		render();
	});
}
