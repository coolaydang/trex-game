var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloudImage;

var obs1;//obs spawn
var obs2;
var obs3;
var obs4;
var obs5;
var obs6;

var obsGroup;//creating groups
var cloudsGroup;

var score;

var gameState = 'play';

var gameOverImg,gameOver;
var restartImg,restart;


function preload() {
    trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
    trex_collided = loadAnimation("trex_collided.png");
    cloudImage = loadImage("cloud.png");
    groundImage = loadImage("ground2.png");

    obs1 = loadImage("obstacle1.png");
    obs2 = loadImage("obstacle2.png");
    obs3 = loadImage("obstacle3.png");
    obs4 = loadImage("obstacle4.png");
    obs5 = loadImage("obstacle5.png");
    obs6 = loadImage("obstacle6.png");

    gameOverImg = loadImage('gameOver.png');
    restartImg = loadImage('restart.png');

    jumpSound = loadSound("jump.mp3");
    dieSound = loadSound("die.mp3");
    checkPointSound = loadSound("checkpoint.mp3");
}

function setup() {
    createCanvas(windowWidth, windowHeight);

    //create a trex sprite
    trex = createSprite(50,height-70,20,50);
    trex.addAnimation("running", trex_running);
    trex.addAnimation("collided", trex_collided);
    trex.scale = 0.5;
    //trex.debug = true;
    trex.setCollider("rectangle",0,0,40,90);

    //create a ground sprite
    ground = createSprite(width/2,height-75,width,20);
    ground.addImage("ground",groundImage);
    ground.x = ground.width /2;


    invisibleGround = createSprite(width/2,height-10,width,125);
    invisibleGround.visible = false;

    //create game over stuff
    gameOver = createSprite(width/2,height/2-50);
    gameOver.addImage('gameOver', gameOverImg);
    gameOver.scale = 0.5

    restart = createSprite(width/2,height/2);
    restart.addImage('restart', restartImg);
    restart.scale = 0.5

    score = 0;

    obsGroup = new Group();
    cloudsGroup = new Group();
}

function draw() {
    background(000);

    text('Score: '+score,width-100,50);

    text('FrameRate: '+getFrameRate(),width-100,40);
    if(gameState === 'play'){
        score = score + Math.round(getFrameRate()/60);

        gameOver.visible = false;
        restart.visible = false;

        //jump when the space button is pressed
        //console.log(trex.y);
        if ((touches.length > 0 || keyDown("space")) && trex.y >= height-120) {
            trex.velocityY = -12;
            jumpSound.play();
            touches = [];
        }
        trex.velocityY = trex.velocityY + 0.8
        if (ground.x < 0) {
            ground.x = ground.width / 2;
        }

        if(score>0 && score%500 === 0){
            checkPointSound.play() 
         }
         
         if (ground.x < 0){
           ground.x = ground.width/2;
         }
        
        spawnClouds();
        spawnObstacles();

        if(obsGroup.isTouching(trex)){
            gameState = 'end'
                    dieSound.play()
        }
    }
    else if(gameState === 'end'){
        trex.changeAnimation('collided',trex_collided);

        trex.velocityY = 0;
        ground.velocityX = 0;

        obsGroup.setVelocityXEach(0);
        cloudsGroup.setVelocityXEach(0);

        obsGroup.setLifetimeEach(-1);
        cloudsGroup.setLifetimeEach(-1);

        gameOver.visible = true;
        restart.visible = true;

        if(mousePressedOver(restart)){
            reset();
        }
    }

    trex.collide(invisibleGround);

    drawSprites();
}

function reset(){
    gameState = "play";

    obsGroup.destroyEach();
    cloudsGroup.destroyEach();

    trex.changeAnimation("running", trex_running);

    score = 0;
}

function spawnClouds(){//spawn clouds
    if(frameCount % 60 === 0){
        var cloud = createSprite(width+50,100,40,10);//making cloud sprite and placing it
        cloud.addImage(cloudImage);
        cloud.velocityX = -4;
        //cloud.scale = 0.12

        cloud.lifetime = 601;

        cloud.y = Math.round(random(10,height*2/3));
        cloud.scale = Math.round(random(0.1,0.4)*100)/100;

        cloud.depth = trex.depth;
        trex.depth += 1;

        cloudsGroup.add(cloud);
    }
}

function spawnObstacles(){//spawn obs
    var obstacle;

    if(frameCount % 60 === 0){
       obstacle = createSprite(width,height-90,10,40);
       obstacle.velocityX = -(6 + score/100);
       obstacle.lifetime = 601;
       //obstacle.debug = true;

       var rand = Math.round(random(1,6));;

       switch(rand){
        case 1: obstacle.addImage(obs1);
        obstacle.scale = 0.1;
        break;

        case 2: obstacle.addImage(obs2);
        obstacle.scale = 0.1;
        break;

        case 3: obstacle.addImage(obs3);
        obstacle.scale = 0.15;
        break;

        case 4: obstacle.addImage(obs4);
        obstacle.scale = 0.06;
        break;

        case 5: obstacle.addImage(obs5);
        obstacle.scale = 0.055;
        break;

        case 6: obstacle.addImage(obs6);
        obstacle.scale = 0.15;
        break;

        default: break; 
       }
        obsGroup.add(obstacle);
    }   
}
