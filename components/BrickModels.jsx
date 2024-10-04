import * as THREE from 'three';
import React, { createContext, useContext, useEffect, useRef, useState } from 'react'
import { useAnimations, useGLTF, useTexture } from '@react-three/drei'
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
  const { nodes, materials,animations } = useGLTF('/model_2.glb');
  const {mixer, clips,actions} = useAnimations(animations,group)
  // let [blockN,blockL,blockR,blockLAnim,blockRAnim,blockLName,blockRName,brickSkinIndex] = generateBlockData(props.level)
  let [blockNormal,blockNormalName,blockExplosionParts,brickSkinIndex] = generateBlockData(props.level)
  let [bricktxt_1,bricktxt_2] = useTexture(['bricktxt1.jpg','block_1_txt.jpg']);
  let textureContainer = [bricktxt_1,bricktxt_2];
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
  let brickShakeFromLeft = true
  let hideBrickObj = useRef(null);
  let brickNormalContainer;
  let blockExplodeContainer = [];
  let blockExplodeAnimeContainer = [];
  // {geo:geometry,name:BlockName,blockAnime:blockAnime}
  brickNormalContainer = <mesh ref={brickNormalRef} name={blockNormalName} rotation={blockExplosionParts[0].blockRot} scale={blockExplosionParts[0].blockScale} geometry={blockNormal} material={brickMat.current} position={blockExplosionParts[0].blockPos} />
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
      
    })
  let reduceOpacity = ()=>
    {
      brickExplodeRef.current.children[0].material.opacity -=0.1;
      if(brickExplodeRef.current.children[0].material.opacity<=0)
      {
        //Quand la brique a finit d'etre brisée
        resetBrick();
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
      brickExplodeRef.current.children[0].material.transparent = true;
      
      hideBrickObj.current = new CustomCounter(3,0,reduceOpacity,null);

      hideBrickObj.current.start();
      

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
          let counter2 = new CustomCounter(50,0,()=>{_appContext.gameOverScreenControllerFunc.current('SHOW-GAME-OVER');return true},null);
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
        if(blockNormalName == 'block_6')
        {
            actualBlockForAnimation.current = 'block_6'
        }
        
        return true;
      }
      else
      {
        return false;
      }
    }
  useEffect(()=>
    {
      for(let i =0;i<blockExplodeAnimeContainer.length;i++)
      { 
        actions[blockExplodeAnimeContainer[i]]?.setLoop(THREE.LoopOnce,1)
      }
      //  actions[blockLAnim]?.setLoop(THREE.LoopOnce,1)
     
      //  actions[blockRAnim]?.setLoop(THREE.LoopOnce,1)

       _brickManagerContext.brickModelFunctions.current = (type)=>
        { 
          
          if(type == 'brake')
          {
            brickExplodeRef.current.visible = true;
            brickNormalRef.current.visible = false;
            
            animationManager.start = true;
            
            for(let i =0;i<blockExplodeAnimeContainer.length;i++)
            {
              actions[blockExplodeAnimeContainer[i]]?.play();
            }

            // actions[blockLAnim]?.play();
            // actions[blockRAnim]?.play();
          }
          else if(type == 'no-brake')
          {

            let customCounter = new CustomCounter(2,7,shakeBrick,shakeBrickCallBack);
            customCounter.start()
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
  useEffect(()=>
    {
      if(blockNormalName == 'block_6')
      {
        
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
                {brickNormalContainer}
                {/* <mesh ref={brickNormalRef} name="block_1" geometry={blockN} material={brickMat.current} position={[-0.3, 10, 0]} /> */}
              </group>
          </>
  )
}

useGLTF.preload('/model_2.glb')
//On pourra même jouer en fonction de la distance