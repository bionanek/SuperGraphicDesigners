//by JAKUB URBAN and WOJCIECH ZIÓŁKOWSKI

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(
	75, //FOV
	window.innerWidth / window.innerHeight,
	0.1,
	5000);

var renderer = new THREE.WebGLRenderer({
	antialias: true,
	alpha: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var sphereGeo = new THREE.SphereGeometry( 
    10, 	// radius — sphereGeo radius. Default is 50.
    24, //widthSegments — number of horizontal segments. Minimum value is 3, and the default is 8.
    16 //heightSegments — number of vertical segments. Minimum value is 2, and the default is 6.
);


var trunkGeometry = new THREE.CylinderGeometry(3, 4, 20);
var streetLampGeometry = new THREE.CylinderGeometry(1, 1, 30);
var streetLampLightGeometry = new THREE.BoxGeometry(2, 2, 10);
var buildingGeometry = new THREE.BoxGeometry(40, 30, 40);
var roofGeometry = new THREE.CylinderGeometry(0, 20, 20, 4);


// var sphereGeo = new THREE.BoxsphereGeo(1, 1, 1);

//var cube = new THREE.Mesh(sphereGeo, material);

var materialNormal 		= new THREE.MeshNormalMaterial();
var materialPhongGreen 	= 	new THREE.MeshPhongMaterial({ color: 0x256200 , shininess: 50, wireframe: true});
var materialPhongBrown 	= 	new THREE.MeshPhongMaterial({ color: 0x9C5312 , shininess: 1, shading: THREE.FlatShading});
var materialPhongSilver = 	new THREE.MeshPhongMaterial({ color: 0xF6F6F3 , shininess: 100});
var materialPhongBlue 	= 	new THREE.MeshPhongMaterial({ color: 0x101080 , shininess: 30});

var materialLambertGreen 	= new THREE.MeshLambertMaterial({color: 0x256200,	shininess: 100}); 
var materialLambertBrown 	= new THREE.MeshLambertMaterial({color: 0x9C5312,	shininess: 100}); 
var materialLambertBlue 	= new THREE.MeshLambertMaterial({ color: 0x101080 , shininess: 100});

function spawnTree(x, z) {
	treeTrunk = new THREE.Mesh(trunkGeometry.clone(), materialLambertBrown);
	treeCrown1 = new THREE.Mesh(sphereGeo.clone(), materialPhongGreen);
	treeCrown2 = new THREE.Mesh(sphereGeo.clone(), materialPhongGreen);
	treeCrown3 = new THREE.Mesh(sphereGeo.clone(), materialPhongGreen);
	treeCrown4 = new THREE.Mesh(sphereGeo.clone(), materialPhongGreen);
	treeCrown5 = new THREE.Mesh(sphereGeo.clone(), materialPhongGreen);

	treeCrownBaseHeight = 25;

	treeTrunk.position.z = z;
	treeTrunk.position.y = 10;
	treeTrunk.position.x = x;

	treeCrown1.position.x = x;
	treeCrown1.position.y = treeCrownBaseHeight;
	treeCrown1.position.z = treeTrunk.position.z + 6;

	treeCrown2.position.x = x;
	treeCrown2.position.y = treeCrownBaseHeight;
	treeCrown2.position.z = treeTrunk.position.z - 6;

	treeCrown3.position.y = treeCrownBaseHeight;
	treeCrown3.position.x = treeTrunk.position.x + 6;
	treeCrown3.position.z = z;

	treeCrown4.position.y = treeCrownBaseHeight;
	treeCrown4.position.x = treeTrunk.position.x - 6;
	treeCrown4.position.z = z;

	treeCrown5.position.x = x;
	treeCrown5.position.y = treeCrownBaseHeight + 5;
	treeCrown5.position.z = z;

	scene.add(treeCrown1);
	scene.add(treeCrown2);
	scene.add(treeCrown3);
	scene.add(treeCrown4);
	scene.add(treeCrown5);
	scene.add(treeTrunk);
}

function spawnLamp(x, z) {
	streetLamp = new THREE.Mesh(streetLampGeometry.clone(), materialPhongSilver);
	streetLampLight = new THREE.Mesh(streetLampLightGeometry.clone(), materialNormal);

	streetLamp.position.x = x;
	streetLamp.position.z = z;
	streetLamp.position.y = 15;

	streetLampLight.position.z = streetLamp.position.z + 3;
	streetLampLight.position.x = x;
	streetLampLight.position.y = 30;

	scene.add(streetLamp);
	scene.add(streetLampLight);
}

function spawnBuilding(x, z) {
	building = new THREE.Mesh(buildingGeometry.clone(), materialLambertBlue);
	roof = new THREE.Mesh(roofGeometry.clone(), materialLambertBrown);

	building.position.x = x;
	building.position.z = z;
	building.position.y = 15;
	
	roof.position.x = x;
	roof.position.z = z;
	roof.position.y = building.position.y *2 + 5;
	roof.rotation.y = Math.PI / 4;
	roof.scale.x = 2;
	roof.scale.z = 2;


	scene.add(building);
	scene.add(roof);
}

var i = 0;
while(i < 10) {
	spawnTree(i * 50, 20);
	spawnLamp(i * 50, -20);
	if(i < 4)
		spawnBuilding(i * 150, -50);
	i++;
}


var light = new THREE.DirectionalLight( 0xFFFFFFF, 1 );
    light.position.set(5, 10, 1 );
    scene.add( light );

// scene.add(cube);

camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 5;

var clock = new THREE.Clock();



function Car (x, y, z, color) 
{ // constructor func for Car object 

	this.carPositionX = x;
	this.carPositionY = y;
	this.carPositionZ = z;

	this.cubeBotGeo = new THREE.BoxGeometry(8,2,4);
	this.cubeBotMaterial = new THREE.MeshPhongMaterial({color: color}); //0xd62d20
	this.cubeBot = new THREE.Mesh(this.cubeBotGeo.clone(),this.cubeBotMaterial);

	this.cubeBot.position.x = this.carPositionX;
	this.cubeBot.position.y = this.carPositionY;
	this.cubeBot.position.z = this.carPositionZ;

	this.cubeTopGeo = new THREE.BoxGeometry(5, 3, 3);
	this.cubeTopMaterial = new THREE.MeshPhongMaterial({color: 0xfffffff, transparent: true, opacity: 0.8});
	this.cubeTop = new THREE.Mesh(this.cubeTopGeo.clone(), this.cubeTopMaterial);

	this.cubeTop.position.x = this.cubeBot.position.x -1;
	this.cubeTop.position.y = this.cubeBot.position.y +1;
	this.cubeTop.position.z = this.cubeBot.position.z;

	this.wheelsGeo = new THREE.CylinderGeometry(1, 1, 1.5, 12);
	this.wheelsMaterial = new THREE.MeshLambertMaterial({color: 0x323232});
	this.wheelBackRight = new THREE.Mesh(this.wheelsGeo.clone(), this.wheelsMaterial);

	this.wheelBackRight.position.x = this.cubeBot.position.x - 2.5;
	this.wheelBackRight.position.y = this.cubeBot.position.y -1;
	this.wheelBackRight.position.z = this.cubeBot.position.z +1.5;

	this.wheelBackRight.rotation.x = Math.PI / 2;

	this.wheelFrontRight= new THREE.Mesh(this.wheelsGeo.clone(), this.wheelsMaterial);

	this.wheelFrontRight.position.x = this.cubeBot.position.x +2.5;
	this.wheelFrontRight.position.y = this.cubeBot.position.y-1;
	this.wheelFrontRight.position.z = this.cubeBot.position.z + 1.5;

	this.wheelFrontRight.rotation.x = Math.PI / 2;

	this.wheelFrontLeft= new THREE.Mesh(this.wheelsGeo.clone(), this.wheelsMaterial);

	this.wheelFrontLeft.position.x = this.cubeBot.position.x +2.5;
	this.wheelFrontLeft.position.y = this.cubeBot.position.y-1;
	this.wheelFrontLeft.position.z = this.cubeBot.position.z - 1.5;

	this.wheelFrontLeft.rotation.x = Math.PI / 2;

	this.wheelBackLeft= new THREE.Mesh(this.wheelsGeo.clone(), this.wheelsMaterial);

	this.wheelBackLeft.position.x = this.cubeBot.position.x - 2.5;
	this.wheelBackLeft.position.y = this.cubeBot.position.y -1;
	this.wheelBackLeft.position.z = this.cubeBot.position.z -1.5;

	this.wheelBackLeft.rotation.x = Math.PI / 2;

	scene.add(this.cubeBot);
	scene.add(this.cubeTop);
	scene.add(this.wheelBackRight);
	scene.add(this.wheelFrontRight);
	scene.add(this.wheelBackLeft);
	scene.add(this.wheelFrontLeft);

	this.rotateWheels = function(delta)	{
		this.wheelBackRight.rotation.y -= delta*5;
		this.wheelFrontRight.rotation.y -= delta*5;
		this.wheelBackLeft.rotation.y -= delta*5;
		this.wheelFrontLeft.rotation.y -= delta*5;
	}

	this.move = function(delta)	{
		delta *= 20; // making a movement a lil bit faster
		this.cubeBot.position.x += delta;
		this.cubeTop.position.x += delta;
		this.wheelBackLeft.position.x += delta;
		this.wheelBackRight.position.x += delta;
		this.wheelFrontLeft.position.x += delta;
		this.wheelFrontRight.position.x += delta;
	}
}

var carOne = new Car(1,1,1,0xd62d20);
var carTwo = new Car(40,1,1,0xAEDDC7);
var carThree = new Car(carTwo.carPositionX+17, 1,1,0x147006);
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
for(i = 0; i < 50; i++)
	new Road(10 * i, -1.2, 1, 10, 20, 0.5, 0x7f7f7f); // generates pieces of road one by one


//-----------SKY BOX-------------

var directions = ["SkyBox2/posx.jpg", "SkyBox2/negx.jpg", "SkyBox2/posy.jpg", "SkyBox2/negy.jpg", "SkyBox2/posz.jpg", "SkyBox2/negz.jpg"];
var materialArray = [];
for(i = 0; i < 6; i++)
{
	materialArray.push(new THREE.MeshBasicMaterial({
		map: THREE.ImageUtils.loadTexture(directions[i]),
		side: THREE.BackSide
	}));
}

var skyGeometry = new THREE.CubeGeometry(5000,5000,5000);
var skyMaterial = new THREE.MeshFaceMaterial(materialArray);
var skyBox = new THREE.Mesh(skyGeometry, skyMaterial);
scene.add(skyBox);


// REST

camera.position.x = 0;
camera.position.y = -50;
camera.position.z = 400;


var light = new THREE.DirectionalLight(0xfffffff, 1);
	light.position.set(10, 10, 5);
	scene.add(light);

//carArr[1].cubeTop.add(camera); // makes camera follow the object
var render = function() 
{
	requestAnimationFrame(render);
	renderer.render(scene, camera);
	var delta = clock.getDelta();
	for(i = 0; i < carArr.length; i++ ) 
	{ 		// this loop is going through the whole carArr and is calling 
												// methods in each object
		carArr[i].rotateWheels(delta); // makes wheels spinning 
		carArr[i].move(delta); // makes cars move

	}
	renderer.render(scene, camera);

}
var controls = new THREE.OrbitControls(camera);
//controls.noKeys = false;

//renderer.render(scene, camera);
render();