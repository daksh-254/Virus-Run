var player, citizen1, citizen2, citizen3, hospital, HomeMarker,infection, button, bg, edges, sanitizer;
var PCRightimg, PCLeftimg, PCstaticR, PCstaticL, NPCimg1, NPCimg2, hospitalBGImg, HomeMARKERimg, CITYIMG, staticmage, sanitizerimg, hospitality, houseBGimg;
var coughSND, ambulanceSND, VictorySND, help;
var PLAY = 1;
var OVER = 0;
var WIN = 2;
var gameState = PLAY;
var b1, b2, b3, b4, b5, b6, b7, b8, b9, b1a, b2a, b3a, b4a, b5a, b6a, b7a, b8ua, b9a;

function preload(){
 //image loading
  //PC Right 
    PCRightimg = loadAnimation("Images/RIGHT_facing/1mR.png", "Images/RIGHT_facing/2mR.png", "Images/RIGHT_facing/3mR.png", "Images/RIGHT_facing/4mR.png", "Images/RIGHT_facing/5mR.png");
  //PC Left
    PCLeftimg = loadAnimation("Images/LEFT_facing/1mL.png", "Images/LEFT_facing/2mL.png", "Images/LEFT_facing/3mL.png", "Images/LEFT_facing/4mL.png", "Images/LEFT_facing/5mL.png");
  
  //static player 
    staticmage = loadImage("Images/LEFT_facing/1mL.png"); 

  //NPC
   //infectedHUMAN
     NPCimg1 = loadImage("Images/femaleNPC.png");
     NPCimg2 = loadImage("Images/maleNPC.png");
  
   //HomeMarker NPC
     HomeMARKERimg = loadImage("Images/HomeMarker.png");   
    
   //sanitizerimage
     sanitizerimg = loadImage("Images/SANITIZER.png"); 
     
   //Hospital marker map
     hospitality = loadImage("Images/Hex.png");  

  //BGS   
   //Hospital
     hospitalBGImg = loadImage("Images/Hospital.jpg");  
   //city
     CITYIMG = loadImage("Images/City1.jpg");
   //HOUSEING 
     houseBGimg = loadImage("Images/HouseBGG.jpg"); 
 
 //sound loading
   soundFormats('mp3', 'wav');
  //cough  
    coughSND = loadSound("Sound/Cough.wav"); 
  //ambulance
    ambulanceSND = loadSound("Sound/Ambulance.mp3");
  //WIN
    VictorySND = loadSound("Sound/HOME.mp3");       
  }

function setup(){
 //Canvas
   createCanvas(800, 650); 
 //PC   
 //playerSprite
   player = createSprite(705, 625, 30, 30);
   player.addImage("STAT",staticmage);
   player.addAnimation("LEFT", PCLeftimg);
   player.addAnimation("RIGHT", PCRightimg); 
   player.scale = 0.11; 
 //NPC ***shall be placed with an alternate route***  
 //citizen
   citizen1 = createSprite(235, 165, 50, 50);
   citizen1.addImage(NPCimg1); 
   citizen1.scale = 0.2;
 //citizen
   citizen2 = createSprite(270, 265, 50, 50);
   citizen2.addImage(NPCimg2);
   citizen2.scale = 0.2;
 //citizen
   citizen3 =createSprite(700, 175, 50, 50);
   citizen3.addImage(NPCimg1);
   citizen3.scale = 0.2;  

 //homeMarking
   HomeMarker = createSprite(130, 170);
   HomeMarker.addImage(HomeMARKERimg);
   HomeMarker.scale = 0.1; 

 //hospital sprite
   hospital = createSprite(385, 335, 20, 20);
   hospital.addImage(hospitality);
   hospital.scale = 0.05;

 //sanitizer
   sanitizer = createSprite(320, 445, 50, 50);
   sanitizer.addImage(sanitizerimg);
   sanitizer.scale = 0.10;   

 //infection
   infection = 0; 
 //bg 
   bg = CITYIMG;
 //helps
   help = createSprite(0, 500, 50, 50);
   help.visible = false;
      
   
 //barriers
   b1 = createSprite(685, 470, 10, 400); 
   b1.visible = false; 

   b2 = createSprite(725, 400, 10, 500);
   b2.visible = false;

   b3 = createSprite(300, 125, 1000, 10);
   b3.visible = false;

   b4 = createSprite(655, 195, 10, 45);
   b4.visible = false;

   b5 = createSprite(525, 265, 330, 10);
   b5.visible = false;

   b6 = createSprite(368, 450, 10, 500);
   b6.visible = false;

   b7 = createSprite(100, 490, 195, 325);
   b7.visible = false;

   b8 = createSprite(285, 575, 75, 175);
   b8.visible = false;

   b9 = createSprite(575, 195, 150, 40);
   b9.visible = false;
}

function draw(){
 //background
   background(bg);

 //edge creation  
   edges = createEdgeSprites();

 //collision  
   player.collide(edges);

   drawSprites();

 if(gameState === PLAY){
    //visiblity 'yes'   
      citizen1.visible = true;
      citizen2.visible = true;
      citizen3.visible = true;
      sanitizer.visible = true;
      player.visible = true;
      HomeMarker.visible = true;
      hospital.visible = true;

    //playerMovement
     //UP
       if(keyWentDown(UP_ARROW)){
          player.changeImage("STAT");
          player.velocityY = -1.5;
          player.velocityX = 0;
       }else if(keyWentUp(UP_ARROW)){
          player.velocityX = 0;
          player.velocityY = 0;     
       }

     //DOWN
       if(keyWentDown(DOWN_ARROW)){
          player.changeImage("STAT");
          player.velocityY = 1.5;
          player.velocityX = 0;
       }else if(keyWentUp(DOWN_ARROW)){
          player.velocityX = 0;
          player.velocityY = 0; 
       } 

     //RIGHT
       if(keyWentDown(RIGHT_ARROW)){
          player.changeAnimation("RIGHT");
          player.velocityY = 0;
          player.velocityX = 1.5;
       }else if(keyWentUp(RIGHT_ARROW)){
          player.velocityX = 0;
          player.velocityY = 0;
       } 

     //LEFT
       if(keyWentDown(LEFT_ARROW)){
          player.changeAnimation("LEFT");
          player.velocityY = 0;
          player.velocityX = -1.5;
       }else if(keyWentUp(LEFT_ARROW)){
          player.velocityX = 0;
          player.velocityY = 0;         
       }

    //contact with NPC
     //humans     
       if(player.collide(citizen1) || player.collide(citizen2)){
          coughSND.play();
          infection += 1;
          player.x += 30;     
       }

       if(player.collide(citizen3)){
          coughSND.play();
          infection += 1;
          player.y += 30;
       } 

     //things
       if(player.collide(sanitizer) && infection >= 2){
          sanitizer.destroy();
          infection -= 2;
       }    
      
      if(infection === 5){
         gameState = OVER;
         
      }

    //collision with barriers
      player.collide(b1);
      player.collide(b2);
      player.collide(b3);
      player.collide(b4);
      player.collide(b5);
      player.collide(b6);   
      player.collide(b7); 
      player.collide(b8); 
      player.collide(b9);

    //REACH HOME
      if(player.collide(HomeMarker)){
         gameState = WIN;
      }

   }else if(gameState === OVER){
            bg = hospitalBGImg; 

            textSize(20);
            text("You are admitted", 320, 50);

            citizen1.visible = false;
            citizen2.visible = false;
            citizen3.visible = false;
            sanitizer.visible = false;
            player.visible = false;
            HomeMarker.visible = false;
            hospital.visible = false;

            ambulanceSND.play();


            if(keyDown("enter")){
              ambulanceSND.stop();
              infection -= 2;
              gameState = PLAY;
              bg = CITYIMG;
            //player  
              player.changeImage("STAT");
              player.x = 345;
              player.y = 320;
            }
          }else if(gameState === WIN){
              help.velocityX = 50;

              if(help.x < 500){
                 VictorySND.play();
              }else if(help.x >= 700){
                 VictorySND.stop(); 
                 help.destroy();   
              }

              citizen1.visible = false;
              citizen2.visible = false;
              citizen3.visible = false;
              sanitizer.visible = false;
              player.visible = false;
              HomeMarker.visible = false;
              hospital.visible = false;

              bg = houseBGimg;

              if(infection === 0){
                 textSize(25);
                 stroke("black");
                 fill("green")
                 text("Excellent work!! You successfully reached home!", 125, 300);  
              }else if(infection === 1){
                 textSize(25);
                 stroke("black");
                 fill("white");
                 text("Great! You made it home!", 260, 300);    
              }else if(infection === 2){
                textSize(25);
                stroke("black");
                fill("yellow");
                text("You finally reached Home!", 260, 300);    
             }else if(infection === 3){
               textSize(25);
               stroke("black");
               strokeWeight(5);
               fill("orange");
               text("Good Job! Should have avoided infections..", 150, 300);    
           }else if(infection === 4){
             textSize(25);
             stroke("black");
             fill("red");
             text("Made it home in time!!", 260, 300);    
          }
      } 
  }
