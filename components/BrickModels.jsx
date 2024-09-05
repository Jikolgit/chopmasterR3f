import * as THREE from 'three';
import React, { createContext, useContext, useEffect, useRef, useState } from 'react'
import { useAnimations, useGLTF, useTexture } from '@react-three/drei'
import { useFrame } from '@react-three/fiber';
import { appContext } from '../src/App';
import { CustomCounter } from '../components/utils';
import { AudioManage } from '../components/audioComp';

import { BrickManagerContext,HandModelContext } from './GameApp';
export function Brick_1_Model()
{
  const _brickManagerContext = useContext(BrickManagerContext);
  const _modelContext = useContext(HandModelContext);
  const _appContext = useContext(appContext)
  const group = React.useRef(null);
  const brickNormalRef = useRef(null);
  const brickExplodeRef = useRef(null);
  const { nodes, materials,animations } = useGLTF('/model_2.glb');
  const {mixer, clips,actions} = useAnimations(animations,group)
  let bricktxt_1 = useTexture('bricktxt1.jpg');
  bricktxt_1.flipY = false;
  bricktxt_1.colorSpace = THREE.SRGBColorSpace; 
  bricktxt_1.minFilter = THREE.LinearFilter;
  bricktxt_1.magFilter = THREE.LinearFilter;
  let animationManager = {start:false}
  let brickMat = useRef(new THREE.MeshBasicMaterial({map:bricktxt_1,transparent:true}));
  let brickShakeFromLeft = true
  let action_1 = null

  useFrame(()=>
    {
      if(animationManager.start)
      {
        if(actions?.block1laction.time >= 1.2)
          {
            animationManager.start = false
         
            actions.block1laction.paused = true ;
            actions.block1raction.paused = true ;
            hideBrick();
          }
          else
          {
            // console.log(actions?.block1laction.paused);
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
      // actions?.block1laction.stop();
      // actions?.block1raction.stop();
      // actions?.block1laction.reset();
      // actions?.block1raction.reset();
    }
  let hideBrick = ()=>
    {
      brickExplodeRef.current.children[0].material.transparent = true;
      
      let cCounter = new CustomCounter(3,0,reduceOpacity,null);

      cCounter.start();
      

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
        brickNormalRef.current.position.x = -0.3
      let counter2 = new CustomCounter(50,0,_function,null);
      counter2.start();
      
    }
  let dropBrickAnimation = ()=>
    {
      brickNormalRef.current.position.y -= 0.5
      if(brickNormalRef.current.position.y <= 2)
      {
        brickNormalRef.current.position.y = 2;
        _modelContext.effectAfterbrickIsReady();
        return true;
      }
      else
      {
        return false;
      }
    }
  useEffect(()=>
    {
      
       actions?.block1laction.setLoop(THREE.LoopOnce,1)
     
       actions?.block1raction.setLoop(THREE.LoopOnce,1)

       _brickManagerContext.brickModelFunctions.current = (type)=>
        { 
          
          if(type == 'brake')
          {
            brickExplodeRef.current.visible = true;
            brickNormalRef.current.visible = false;
            
            animationManager.start = true;
            
            actions?.block1laction.play();
            actions?.block1raction.play();
          }
          else if(type == 'no-brake')
          {

            let customCounter = new CustomCounter(2,7,shakeBrick,shakeBrickCallBack);
            customCounter.start()
          }
          
          
        }
  
    },[])
  useEffect(()=>
    {
        let customCounter = new CustomCounter(1,0,dropBrickAnimation,null);
        customCounter.start();
    },[])
  return(
          <>
                <group
                  ref={group}
                  
                  position={[0,0,0]} rotation={[0,Math.PI*0.5,0]}
                >
                <mesh name="block_1_core" geometry={nodes.block_1_core.geometry} visible={false} material={brickMat.current} position={[0, 2.981, 0]} />
                <group name='BRICK-EXPLODE-ANIMATION' ref={brickExplodeRef} visible={false}  >
                    <mesh  name="block_1_left" geometry={nodes.block_1_left.geometry} material={brickMat.current}  position={[0, 2, 0]} />
                    <mesh   name="block_1_right" geometry={nodes.block_1_right.geometry} material={brickMat.current} position={[0, 2, 0]} rotation={[0, 0, -Math.PI]} />
                </group>
                <mesh ref={brickNormalRef} name="block_1" geometry={nodes.block_1.geometry} material={brickMat.current} position={[-0.3, 10, 0]} />
              </group>
          </>
  )
}
export function Brick_2_Model()
{
  const _brickManagerContext = useContext(BrickManagerContext);
  const _modelContext = useContext(HandModelContext);
  const _appContext = useContext(appContext)
  const group = React.useRef(null);
  const brickNormalRef = useRef(null);
  const brickExplodeRef = useRef(null);
  const { nodes, materials,animations } = useGLTF('/model_2.glb');
  const {mixer, clips,actions} = useAnimations(animations,group)
  let bricktxt_1 = useTexture('block_1_txt.jpg');
  bricktxt_1.flipY = false;
  bricktxt_1.colorSpace = THREE.SRGBColorSpace; 
  bricktxt_1.minFilter = THREE.LinearFilter;
  bricktxt_1.magFilter = THREE.LinearFilter;
  let animationManager = {start:false}
  let brickMat = useRef(new THREE.MeshBasicMaterial({map:bricktxt_1,transparent:true}));
  let brickShakeFromLeft = true
  let action_1 = null

  useFrame(()=>
    {
      if(animationManager.start)
      {
        if(actions?.block_2_leftAction.time >= 1.2)
          {
            animationManager.start = false
         
            actions.block_2_leftAction.paused = true ;
            actions.block_2_rightAction.paused = true ;
            hideBrick();
          }
          else
          {
            // console.log(actions?.block_2_leftAction.paused);
          }
        
      }
      
    })
  let reduceOpacity = ()=>
    {
      brickExplodeRef.current.children[0].material.opacity -=0.1;
      if(brickExplodeRef.current.children[0].material.opacity<=0)
      {
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
      _modelContext.resetHandPosition();
      // brickExplodeRef.current.children[0].material.opacity = 1;
      // brickExplodeRef.current.visible = false;
      // // brickNormalRef.current.position.y = 10;
      // brickNormalRef.current.visible = true;
      // actions?.block_2_leftAction.stop();
      // actions?.block_2_rightAction.stop();
      // actions?.block_2_leftAction.reset();
      // actions?.block_2_rightAction.reset();
    }
  let hideBrick = ()=>
    {
      brickExplodeRef.current.children[0].material.transparent = true;
      
      let cCounter = new CustomCounter(3,0,reduceOpacity,null);

      cCounter.start();
      

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
          _modelContext.resetHandPosition();
          
          // brickExplodeRef.current.visible = false;
          // brickNormalRef.current.visible = true;

          return true;
        }
        brickNormalRef.current.position.x = -0.3
      let counter2 = new CustomCounter(50,0,_function,null);
      counter2.start();
      
    }
  let dropBrickAnimation = ()=>
    {
      brickNormalRef.current.position.y -= 0.5
      if(brickNormalRef.current.position.y <= 2)
      {
        brickNormalRef.current.position.y = 2;
        _modelContext.effectAfterbrickIsReady();
        return true;
      }
      else
      {
        return false;
      }
    }
  useEffect(()=>
    {
      
       actions?.block_2_leftAction.setLoop(THREE.LoopOnce,1)
     
       actions?.block_2_rightAction.setLoop(THREE.LoopOnce,1)

       _brickManagerContext.brickModelFunctions.current = (type)=>
        { 
          
          if(type == 'brake')
          {
            brickExplodeRef.current.visible = true;
            brickNormalRef.current.visible = false;
            
            animationManager.start = true;
            
            actions?.block_2_leftAction.play();
            actions?.block_2_rightAction.play();
          }
          else if(type == 'no-brake')
          {

            let customCounter = new CustomCounter(2,7,shakeBrick,shakeBrickCallBack);
            customCounter.start()
          }
          
          
        }
  
    },[])
  useEffect(()=>
    {
        let customCounter = new CustomCounter(1,0,dropBrickAnimation,null);
        customCounter.start();
    },[])
  return(
          <>
                <group
                  ref={group}
                  
                  position={[0,0,0]} rotation={[0,Math.PI*0.5,0]}
                >
                <mesh name="block_1_core" geometry={nodes.block_1_core.geometry} visible={false} material={brickMat.current} position={[0, 2.981, 0]} />
                <group name='BRICK-EXPLODE-ANIMATION' ref={brickExplodeRef} visible={false}  >
                    <mesh name="block_2_left" geometry={nodes.block_2_left.geometry} material={brickMat.current} position={[0, 2, 0]} />
                    <mesh name="block_2_right" geometry={nodes.block_2_right.geometry} material={brickMat.current} position={[0, 2, 0]} />
                </group>
                <mesh ref={brickNormalRef} name="block_2" geometry={nodes.block_2.geometry} material={brickMat.current} position={[-0.3, 10, 0]} />
                {/* <mesh  name="block_1" geometry={nodes.block_1.geometry} material={brickMat.current} position={[-0.3, 10, 0]} /> */}
              </group>
          </>
  )
}
useGLTF.preload('/model_2.glb')
//On pourra même jouer en fonction de la distance