import * as THREE from 'three';
import React, { createContext, useContext, useEffect, useRef, useState } from 'react'
import { Text, useAnimations, useGLTF, useTexture } from '@react-three/drei'
import { useFrame } from '@react-three/fiber';
import { appContext } from '../src/App';
import { CustomCounter } from '../components/utils';
import { AudioManage } from '../components/audioComp';

import { BrickManagerContext,HandModelContext } from './GameApp';
import { generateBlockData } from './r3fUtils';

export function Brick_1_Model(props)
{
  const _brickManagerContext = useContext(BrickManagerContext);
  const _modelContext = useContext(HandModelContext);
  const _appContext = useContext(appContext)
  const group = React.useRef(null);
  const brickNormalRef = useRef(null);
  const brickExplodeRef = useRef(null);
  const brickExplodeRef_2 = useRef(null);
  const { nodes, materials,animations } = useGLTF('/model_2.glb');
  const {mixer, clips,actions} = useAnimations(animations,group)
  // let [blockN,blockL,blockR,blockLAnim,blockRAnim,blockLName,blockRName,brickSkinIndex] = generateBlockData(props.level)
  let [blockNormal,blockNormalName,blockExplosionParts,blockExplosion_2_Part,breakTry,brickSkinIndex] = generateBlockData(props.level)
  let [bricktxt_1,bricktxt_2,bricktxt_3] = useTexture(['bricktxt1.jpg','block_1_txt.jpg','explosiontexture.png']);
  let textureContainer = [bricktxt_1,bricktxt_2,bricktxt_3];
  for(let i =0;i<textureContainer.length;i++)
  {
    textureContainer[i].flipY = false;
    textureContainer[i].colorSpace = THREE.SRGBColorSpace; 
    textureContainer[i].minFilter = THREE.LinearFilter;
    textureContainer[i].magFilter = THREE.LinearFilter;
  }
  let actualBlockForAnimation = useRef('none')
  let animationManager = {start:false}
  let brickMat = useRef(new THREE.MeshBasicMaterial({map:textureContainer[brickSkinIndex],transparent:true}));
  let brickMat_2 = useRef(new THREE.MeshBasicMaterial({map:textureContainer[2],transparent:true}));
  let brickShakeFromLeft = true
  let bombCounterStart = useRef(true);
  let breakSuccess = useRef(true);
  let hideBrickObj = useRef(null);
  let block_7_counter = useRef(9);
  let block_7_counter_text = useRef('0:0'+block_7_counter.current);
  let brickNormalContainer;
  let blockExplodeContainer = [];
  let blockExplodeContainer_2 = [];
  let blockExplodeAnimeContainer = [];
  let blockExplodeAnimeContainer_2 = [];
  let block7customCounter = null;
  // {geo:geometry,name:BlockName,blockAnime:blockAnime}
  let block_7_mat = useRef(new THREE.MeshBasicMaterial({color:'black'}))

  

  if(breakTry == 'none'){_appContext.brickTry.current ='none'}
  else
  {
    if(!_appContext.brickTryUpdate.current)
    {
      _appContext.brickTryUpdate.current = true;
      _appContext.brickTry.current =breakTry
    }
  }
  
  brickNormalContainer = 
                                <mesh ref={brickNormalRef} name={blockNormalName} rotation={blockExplosionParts[0].blockRot} scale={blockExplosionParts[0].blockScale} geometry={blockNormal} material={brickMat.current} position={blockExplosionParts[0].blockPos}>
                                              {blockNormalName=='block_7' && <mesh name="block_7_screen" geometry={nodes.block_7_screen.geometry} material={block_7_mat.current}>
                                                                                         {  _appContext.brickTry.current == 0 &&
                                                                                            <Text
                                                                                          
                                                                                            font="ds_digit.TTF"
                                                                                            characters='1234567890'
                                                                                            fontSize={1} fontWeight={1000}
                                                                                            rotation={[0,-Math.PI*0.2,Math.PI*0.5]}
                                                                                            position={[-1.1, -0.069, 1.424]} color={'white'} anchorX={"center"} anchorY={"middle"}
                                                                                            >
                                                                                            {block_7_counter_text.current}
                                                                                            </Text>
                                                                                                 }
                                                                              </mesh>
                                              }
                                              
                                </mesh>
                                
                         
  if(blockExplosion_2_Part === null)
  {}
  else
  {
      for(let i =0;i<blockExplosion_2_Part.length;i++)
      {
        blockExplodeContainer_2[i] = <mesh key={i} scale={blockExplosion_2_Part[i].blockScale}  name={blockExplosion_2_Part[i].blockName} geometry={blockExplosion_2_Part[i].blockGeo} material={brickMat_2.current}  position={blockExplosion_2_Part[i].blockPos} 
                                    rotation={blockExplosion_2_Part[i].blockRot}
                                    />
        blockExplodeAnimeContainer_2[i] =blockExplosion_2_Part[i].blockAnime;
      }
  }                   
  for(let i =0;i<blockExplosionParts.length;i++)
  {
    blockExplodeContainer[i] = <mesh key={i} scale={blockExplosionParts[i].blockScale}  name={blockExplosionParts[i].blockName} geometry={blockExplosionParts[i].blockGeo} material={brickMat.current}  position={blockExplosionParts[i].blockPos} 
                                rotation={blockExplosionParts[i].blockRot}
                                />
    blockExplodeAnimeContainer[i] =blockExplosionParts[i].blockAnime
  }
 

  useFrame(()=>
    {
      startBrickAnimation();
      if(animationManager.start)
      {
        if(blockNormalName == 'block_7' && !breakSuccess.current)
        {

            if(actions[blockExplodeAnimeContainer_2[0]].time >= 1.2)
            {
              animationManager.start = false
              for(let i =0;i<blockExplodeAnimeContainer_2.length;i++)
              {
                actions[blockExplodeAnimeContainer_2[i]].paused = true ;
              }
              hideBrick();
            }
            
        }
        else
        {
            if(actions[blockExplodeAnimeContainer[0]].time >= 1.2)
            {
              animationManager.start = false
           
              // actions[blockLAnim].paused = true ;
              // actions[blockRAnim].paused = true ;
  
              for(let i =0;i<blockExplodeAnimeContainer.length;i++)
              {
                actions[blockExplodeAnimeContainer[i]].paused = true ;
              }
              hideBrick();
            }
            else
            {
              // console.log(actions?props.blockLActionpaused);
            }
        }
          
        
      }
      
    })
  let reduceOpacity = ()=>
    {
      brickExplodeRef.current.children[0].material.opacity -=0.1;
      if(brickExplodeRef.current.children[0].material.opacity<=0)
      {
        //Quand la brique a finit d'etre brisée
        if(blockNormalName == 'block_7' && !breakSuccess.current)
        {
          _modelContext.setGameOver()
        }
        else
        {
          resetBrick();
        }
        
        return true
      }
      else
      {
        return false;
      }
    }
  let resetBrick = ()=>
    {
      _modelContext.resetHandPosition('NEXT');
      // brickExplodeRef.current.children[0].material.opacity = 1;
      // brickExplodeRef.current.visible = false;
      // // brickNormalRef.current.position.y = 10;
      // brickNormalRef.current.visible = true;
      // actions?props.blockLActionstop();
      // actions?props.blockRActionstop();
      // actions?props.blockLActionreset();
      // actions?props.blockRActionreset();
    }
  let hideBrick = ()=>
    {
      if(blockNormalName == 'block_7' && !breakSuccess.current)
        {
          
          brickExplodeRef_2.current.children[0].material.transparent = true;
      
          hideBrickObj.current = new CustomCounter(3,0,reduceOpacity,null);
    
          hideBrickObj.current.start();
          
        }
      else
      {
        brickExplodeRef.current.children[0].material.transparent = true;
      
        hideBrickObj.current = new CustomCounter(3,0,reduceOpacity,null);
  
        hideBrickObj.current.start();
        
      }


    }
  let shakeBrick = ()=>
    { 
      let value = brickShakeFromLeft? -0.5 : 0.5;
      brickShakeFromLeft = brickShakeFromLeft? false : true;
      brickNormalRef.current.position.x = brickNormalRef.current.position.x + value
    }
  let shakeBrickCallBack = ()=>
    {
      
      let _function = ()=>
        {
          _modelContext.resetHandPosition('RESTART');
          
          // brickExplodeRef.current.visible = false;
          // brickNormalRef.current.visible = true;

          return true;
        }
        
        brickNormalRef.current.position.x = -0.3;
        if(_appContext.PlayerLife.current > 0)
        {
          let counter2 = new CustomCounter(50,0,_function,null);
          counter2.start();
        }
        else
        {
          let counter2 = new CustomCounter(50,0,()=>{_modelContext.setGameOver();return true},null);
          counter2.start();
        }
        
      
    }
  let startBrickAnimation = ()=>
    {
      if(actualBlockForAnimation.current == 'block_6')
      {
          brickNormalRef.current.rotation.y += 0.01;
      }
    }
  let dropBrickAnimation = ()=>
    {
      
      brickNormalRef.current.position.y -= 0.5
      if(brickNormalRef.current.position.y <= 2)
      {
        brickNormalRef.current.position.y = 2;
        _modelContext.effectAfterbrickIsReady();
        console.log(_appContext.Level.current)
        if(blockNormalName == 'block_6')
        {
            actualBlockForAnimation.current = 'block_6'
        }
        
        else if(blockNormalName == 'block_7')
        {
          
          if(_appContext.brickTry.current == 0)
          { 
            startBlock_7_Counter_Animation()
          }
          
          
        }
        return true;
      }
      else
      {
        return false;
      }
    }
  let startBlock_7_Counter_Animation = ()=>
    {
      block7customCounter = new CustomCounter(75,0,block_7_counterFunc,null);
      block7customCounter.start();
    }
  let startBlockExplosion_1 = ()=>
    {
            brickExplodeRef.current.visible = true;
            brickNormalRef.current.visible = false;
            
            animationManager.start = true;
            
            for(let i =0;i<blockExplodeAnimeContainer.length;i++)
            {
              actions[blockExplodeAnimeContainer[i]]?.play();
            }
    }
    let startBlockExplosion_2 = ()=>
    {
            brickExplodeRef_2.current.visible = true;
            brickNormalRef.current.visible = false;
            
            let explositionAnimation = ()=>
              {
                brickExplodeRef_2.current.children[0].scale.x += 0.2;
                brickExplodeRef_2.current.children[0].scale.y += 0.2;
                brickExplodeRef_2.current.children[0].scale.z += 0.2;

                if(brickExplodeRef_2.current.children[0].scale.x >= 5)
                {
                  brickExplodeRef_2.current.children[0].scale.x = 1;
                  brickExplodeRef_2.current.children[0].scale.y = 1;
                  brickExplodeRef_2.current.children[0].scale.z = 1;
                  brickExplodeRef_2.current.visible = false;

                  let cbcustomCounter_2 = new CustomCounter(50,0,()=>{_modelContext.setGameOver();return true},null);
                      cbcustomCounter_2.start();
                  return true
                }
                else
                {
                  return false
                }
                
              }
            let block7customCounter_2 = new CustomCounter(1,0,explositionAnimation,null);
            block7customCounter_2.start();

            // animationManager.start = true;
            
            // for(let i =0;i<blockExplodeAnimeContainer_2.length;i++)
            // {
            //   actions[blockExplodeAnimeContainer_2[i]]?.play();
            // }
    }
  useEffect(()=>
    {
      for(let i =0;i<blockExplodeAnimeContainer.length;i++)
      { 
        actions[blockExplodeAnimeContainer[i]]?.setLoop(THREE.LoopOnce,1)
      }
      // for(let i =0;i<blockExplodeAnimeContainer_2.length;i++)
      //   { 
      //     actions[blockExplodeAnimeContainer_2[i]]?.setLoop(THREE.LoopOnce,1)
      //   }
      //  actions[blockLAnim]?.setLoop(THREE.LoopOnce,1)
     
      //  actions[blockRAnim]?.setLoop(THREE.LoopOnce,1)

       _brickManagerContext.brickModelFunctions.current = (type)=>
        { 
          
          if(type == 'brake')
          {
            startBlockExplosion_1()
            breakSuccess.current = true;
            _appContext.brickTryUpdate.current = false;
            _appContext.brickTry.current ='none';
            // actions[blockLAnim]?.play();
            // actions[blockRAnim]?.play();
          }
          else if(type == 'no-brake')
          {
            breakSuccess.current = false
            if(blockNormalName == 'block_7' && _appContext.brickTry.current == 0)
            {
              AudioManage.play('bomb-explode');
              _appContext.brickTryUpdate.current = false;
              _appContext.brickTry.current ='none'
              _modelContext.disableCLick();
              startBlockExplosion_2()
            }
            else
            {
              if(_appContext.brickTry.current != 'none')
              {
                if(_appContext.brickTry.current >0){_appContext.brickTry.current --;}
              }
              
              AudioManage.play('punch-fail')
              let customCounter = new CustomCounter(2,7,shakeBrick,shakeBrickCallBack);
              customCounter.start()
            }
            
          }
          else if(type == 'stop-bomb-counter')
          {
            bombCounterStart.current = false;
            
          }
          
          
        }
        return()=>
          {
            hideBrickObj.current?.cancelCounter()
          }
    },[])
  useEffect(()=>
    {
      brickNormalRef.current.position.y = 10;
        let customCounter = new CustomCounter(1,0,dropBrickAnimation,null);
        customCounter.start();
        return()=>
          {
            customCounter.cancelCounter();
          }
    },[])
  let block_7_counterFunc = ()=>
    {
        if(!_appContext.gamePause.current)
        {
            if(bombCounterStart.current)
            {   
                if(block_7_counter.current == 1)
                {
                  AudioManage.play('bomb-explode');
                  _modelContext.disableCLick();
                  startBlockExplosion_2();
        
                  return true
                }
                else
                {
                  block_7_counter.current --;
                  block_7_counter_text.current = '0:0'+block_7_counter.current;
                  brickNormalRef.current.children[0].children[0].text = block_7_counter_text.current;
                  AudioManage.play('bomb-counter');
                }
            }
            
        }
        
    }
  useEffect(()=>
    {
      
      return()=>{
        if(blockNormalName == 'block_7')
          {
            
            if(block7customCounter != null)
            {
              block7customCounter.cancelCounter()
            }
          }
      }
    },[])
  return(
          <>
                <group
                  ref={group}
                  
                  position={[0,0,0]} rotation={[0,Math.PI*0.5,0]}
                >
                
                <group name='BRICK-EXPLODE-ANIMATION' ref={brickExplodeRef} visible={false}  >
                    {blockExplodeContainer}
                    
                    {/* <mesh   name={'block_1_left'} geometry={nodes.block_1_left.geometry} material={brickMat.current}  position={[0, 2, 0]} />
                    <mesh   name={'block_1_right'} geometry={nodes.block_1_right.geometry} material={brickMat.current} position={[0, 2, 0]} rotation={[0, 0, -Math.PI]} /> */}

                    {/* <mesh   name={blockLName} geometry={blockL} material={brickMat.current}  position={[0, 2, 0]} />
                    <mesh   name={blockRName} geometry={blockR} material={brickMat.current} position={[0, 2, 0]} rotation={[0, 0, -Math.PI]} /> */}
                </group>
                <group name='BRICK-EXPLODE-ANIMATION-2' position={[0,0,0]} ref={brickExplodeRef_2} visible={false}>
                {blockExplodeContainer_2}
                </group>
                {brickNormalContainer}
                {/* <mesh ref={brickNormalRef} name="block_1" geometry={blockN} material={brickMat.current} position={[-0.3, 10, 0]} /> */}
              </group>
          </>
  )
}

useGLTF.preload('/model_2.glb')
//On pourra même jouer en fonction de la distance