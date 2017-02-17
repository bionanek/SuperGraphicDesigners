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


// -------------CAR OBJECT------------
function Car (x, y, z, color) // constructor func for Car object 
{
	this.startPositionX = x;
	this.startPositionY = y;
	this.startPositionZ = z;

	this.carPositionX = this.startPositionX;
	this.carPositionY = this.startPositionY;
	this.carPositionZ = this.startPositionZ;

	this.cubeBotGeo = new THREE.BoxGeometry(8,2,4);
	this.cubeBotMaterial = new THREE.MeshPhongMaterial({color: color}); //0xd62d20
	this.cubeBot = new THREE.Mesh(this.cubeBotGeo.clone(),this.cubeBotMaterial);

	this.cubeTopGeo = new THREE.BoxGeometry(5, 3, 3);
	this.cubeTopMaterial = new THREE.MeshPhongMaterial({color: 0xfffffff});
	this.cubeTop = new THREE.Mesh(this.cubeTopGeo.clone(), this.cubeTopMaterial);

	this.wheelsGeo = new THREE.CylinderGeometry(1, 1, 1.5, 12);
	this.wheelsMaterial = new THREE.MeshLambertMaterial({color: 0x323232});
	this.wheelBackRight = new THREE.Mesh(this.wheelsGeo.clone(), this.wheelsMaterial);
	this.wheelBackRight.rotation.x = Math.PI / 2;

	this.wheelFrontRight= new THREE.Mesh(this.wheelsGeo.clone(), this.wheelsMaterial);
	this.wheelFrontRight.rotation.x = Math.PI / 2;

	this.wheelFrontLeft= new THREE.Mesh(this.wheelsGeo.clone(), this.wheelsMaterial);
	this.wheelFrontLeft.rotation.x = Math.PI / 2;

	this.wheelBackLeft= new THREE.Mesh(this.wheelsGeo.clone(), this.wheelsMaterial);
	this.wheelBackLeft.rotation.x = Math.PI / 2;

	this.setupStart;

	scene.add(this.cubeBot);
	scene.add(this.cubeTop);
	scene.add(this.wheelBackRight);
	scene.add(this.wheelFrontRight);
	scene.add(this.wheelBackLeft);
	scene.add(this.wheelFrontLeft);
	console.log(this.carPositionX);

	this.setupStart = function()
	{
		this.cubeBot.position.x = this.carPositionX;
		this.cubeBot.position.y = this.carPositionY;
		this.cubeBot.position.z = this.carPositionZ;

		this.cubeTop.position.x = this.cubeBot.position.x -1;
		this.cubeTop.position.y = this.cubeBot.position.y +1;
		this.cubeTop.position.z = this.cubeBot.position.z;

		this.wheelBackRight.position.x = this.cubeBot.position.x - 2.5;
		this.wheelBackRight.position.y = this.cubeBot.position.y -1;
		this.wheelBackRight.position.z = this.cubeBot.position.z +1.5;

		this.wheelFrontRight.position.x = this.cubeBot.position.x +2.5;
		this.wheelFrontRight.position.y = this.cubeBot.position.y-1;
		this.wheelFrontRight.position.z = this.cubeBot.position.z + 1.5;
	
		this.wheelFrontLeft.position.x = this.cubeBot.position.x +2.5;
		this.wheelFrontLeft.position.y = this.cubeBot.position.y-1;
		this.wheelFrontLeft.position.z = this.cubeBot.position.z - 1.5;

		this.wheelBackLeft.position.x = this.cubeBot.position.x - 2.5;
		this.wheelBackLeft.position.y = this.cubeBot.position.y -1;
		this.wheelBackLeft.position.z = this.cubeBot.position.z -1.5;

		console.log("setup Start");
	}

	this.rotateWheels = function(delta)
	{
		this.wheelBackRight.rotation.y -= delta*5;
		this.wheelFrontRight.rotation.y -= delta*5;
		this.wheelBackLeft.rotation.y -= delta*5;
		this.wheelFrontLeft.rotation.y -= delta*5;
	}

	this.move = function(delta)
	{
		delta *= 20; // making a movement a lil bit faster
		this.cubeBot.position.x += delta;
		this.cubeTop.position.x += delta;
		this.wheelBackLeft.position.x += delta;
		this.wheelBackRight.position.x += delta;
		this.wheelFrontLeft.position.x += delta;
		this.wheelFrontRight.position.x += delta;
		if(this.cubeBot.position.x >= this.startPositionX *10)
		{
			this.setupStart;

			console.log("dojechal");
		}
	}
}

var carOne = new Car(1,1,1,0xd62d20);
var carTwo = new Car(10,1,1,0xAEDDC7);
var carThree = new Car(carTwo.carPositionX+10, 1,1,0x147006);
var carArr = [carOne, carTwo, carThree];

// ----------ROAD OBJECT-----------

function Road(x,y,z,lenght,width,height,color)
{
	this.roadGeo = new THREE.BoxGeometry( width, height, lenght);
	this.roadMaterial = new THREE.MeshPhongMaterial({color: color, shininess: 50}); //0xd62d20
	this.road = new THREE.Mesh(this.roadGeo.clone(),this.roadMaterial);
	this.road.position.x = x;
	this.road.position.y = y;
	this.road.position.z = z;
	scene.add(this.road);
}
for(i = 0; i < 100; i++)
	new Road(10*i,-1.2,1,10,20,0.5,0x7f7f7f);



// REST

camera.position.x = 50;
camera.position.y = 5;
camera.position.z = 35;


var light = new THREE.DirectionalLight(0xfffffff, 1);
	light.position.set(10,10, 5);
	scene.add(light);

carArr[1].cubeTop.add(camera); // makes camera follow the object

var clock = new THREE.Clock();

var render = function() {
	requestAnimationFrame(render);
	var delta = clock.getDelta();

	for(i = 0; i < carArr.length; i++ ) // this loop is going through the whole carArr and is calling 
	{									// methods in each object
		carArr[i].rotateWheels(delta);
		carArr[i].move(delta);
	}
	renderer.render(scene, camera);
}
var controls = new THREE.OrbitControls(camera);

render();
