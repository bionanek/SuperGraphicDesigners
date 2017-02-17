var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(
	75, //FOV
	window.innerWidth / window.innerHeight,
	0.1,
	1000);

var renderer = new THREE.WebGLRenderer({
	antialias: true,
	alpha: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var geometry = new THREE.SphereGeometry( 
    0.6, 	// radius — sphere radius. Default is 50.
    24, //widthSegments — number of horizontal segments. Minimum value is 3, and the default is 8.
    16 //heightSegments — number of vertical segments. Minimum value is 2, and the default is 6.
    );
var boxGeometry = new THREE.BoxGeometry(5,2,3);


var material = new THREE.MeshNormalMaterial();
var cube = new THREE.Mesh(geometry, material);
var box = new THREE.Mesh(boxGeometry, material);

var materialPhong = new THREE.MeshPhongMaterial({ color: 0x7d01a0 , shininess: 100});
	mesh1 = new THREE.Mesh( geometry.clone(), materialPhong );
	mesh1.position.x = -2;    
	scene.add( mesh1 );

var materialLambert = new THREE.MeshLambertMaterial({color: 0x2d73a0,	shininess: 100}); 
	mesh2 = new THREE.Mesh( geometry.clone(), materialLambert );
	mesh2.position.x = +2; 
	scene.add( mesh2 );

var light = new THREE.DirectionalLight( 0xdddddd, 1 );
    light.position.set(0, 0, 1 );
    scene.add( light );

scene.add(box);
//scene.add(cube);
/*var geometry = new THREE.BoxGeometry(1,1,1);
var boxMaterial = new THREE.MeshLambertMaterial({color: 0xd62d20});

var cube = new THREE.Mesh(geometry,boxMaterial);


var material = new THREE.MeshNormalMaterial();
var cube = new THREE.Mesh(geometry, material);
cube.position.x = 1;
cube.position.y = 1;
cube.position.z = 1;
scene.add(cube);
*/
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 5;

/*var light = new THREE.DirectionalLight(0xdddddd, 1);
	light.position.set(0,0,1);
	scene.add(light);

scene.add(cube);*/

var clock = new THREE.Clock();

var render = function() {
	requestAnimationFrame(render);
	var delta = clock.getDelta();
	cube.rotation.x += delta;
	cube.rotation.z += delta;

	var elapsed = clock.getElapsedTime();
	cube.position.x = Math.cos(elapsed);
	cube.position.y = Math.sin(elapsed);

	renderer.render(scene, camera);
}
var controls = new THREE.OrbitControls(camera);
//controls.noKeys = false;
//renderer.render(scene, camera);
render();