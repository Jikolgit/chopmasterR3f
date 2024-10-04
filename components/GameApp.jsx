/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.0 ./public/model_2.glb 
*/
import * as THREE from 'three';
import React, { createContext, useContext, useEffect, useRef, useState } from 'react'
import { OrbitControls, PerspectiveCamera, useAnimations, useGLTF, useTexture } from '@react-three/drei'
import { useFrame } from '@react-three/fiber';
import { appContext } from '../src/App';
import { CustomCounter } from './utils';
import { AudioManage } from './audioComp';
import { Brick_1_Model } from './BrickModels';

export const HandModelContext = createContext(null);
export const BrickManagerContext = createContext(null);
export function HandModel(props) {
  const _appContext = useContext(appContext);
  const group = React.useRef()
  let buttonClicked = useRef(false);
  let brickManagerFunc = useRef(null);
  const { nodes, materials,animations } = useGLTF('/model_2.glb');
  let handModeRef = useRef(null)
  const {actions} = useAnimations(animations,group)
  let [txt,supportTXT,groundtxt] = useTexture(['handtxt1.jpg','supportTXT.jpg','groundtxt2.jpg']);
  let passedTime = useRef(0);
  let stopHandNormalAnimation = useRef(false)
  txt.flipY = false;
  txt.colorSpace = THREE.SRGBColorSpace; 
  txt.minFilter = THREE.LinearFilter;
  txt.magFilter = THREE.LinearFilter;
  supportTXT.flipY = false;
  supportTXT.colorSpace = THREE.SRGBColorSpace; 
  supportTXT.minFilter = THREE.LinearFilter;
  supportTXT.magFilter = THREE.LinearFilter;
  groundtxt.flipY = false;
  groundtxt.colorSpace = THREE.SRGBColorSpace; 
  groundtxt.minFilter = THREE.LinearFilter;
  groundtxt.magFilter = THREE.LinearFilter;

  let modelTxt = new THREE.MeshBasicMaterial({map:txt});
  let supportMat = new THREE.MeshBasicMaterial({map:supportTXT});
  let ground_1_Mat = new THREE.MeshBasicMaterial({map:groundtxt});
  let handBox = new THREE.MeshBasicMaterial({wireframe:true,color:'white',visible:false});
  let startAnimation = true
  let timer = 0;
  let handRotateSpeed = 1/200
  let yDistance = 0.2,speed = 1/8;
  let handMoveObj = {start:false,type:'none',speed:8}
  let brick = {brake:true}
  let startHandMove = (type)=>
    { 

          if(!buttonClicked.current)
          {
            if(type == 'success')
            {
              handMoveObj.type ='success'
            }
            else
            {
              handMoveObj.type ='fail'
            }
            handModeRef.current.position.y = 15;
            stopHandNormalAnimation.current = true;
            buttonClicked.current = true;
            handMoveObj.start = true
            
          }

      
      
    }
  let resetHandPosition = (args)=>
    {
      
      brick.brake = brick.brake? false : true
    
      handModeRef.current.visible = false;
      handModeRef.current.position.y = 12;
      if(args == 'RESTART'){}
      else if(args == 'NEXT')
      {   _appContext.setOnce.current = false;
          _appContext.Level.current ++;
      }
      brickManagerFunc.current('RESET-BRICK');
      
    }
  let handMove = ()=>
    {
      
      if(handMoveObj.start)
      {
        if(handMoveObj.type == 'success')
        {
            if(handModeRef.current.position.y <= 1)
            { AudioManage.play('punch');
              // console.log('casser')
              handMoveObj.start = false;
              brickManagerFunc.current('BREAKE-BRICK');
            }
            else
            {
              
              handModeRef.current.position.y -= 0.1*handMoveObj.speed;
            }
        }
        else if(handMoveObj.type == 'fail')
        {
            if(handModeRef.current.position.y <= 4.2)
            { 
              AudioManage.play('punch-fail')
              handMoveObj.start = false;
              _appContext.PlayerLife.current --;
              
              _appContext.playerLifeVueControllerFunc.current('UPDATE')
              brickManagerFunc.current('SHAKE-BRICK');
            }
            else
            {
              
              handModeRef.current.position.y -= 0.1*handMoveObj.speed;
            }
        }
        
        
      }
    }
  let effectAfterbrickIsReady = ()=>
    { 
    
      
      if(!_appContext.setOnce.current)
      {
        if(_appContext.Level.current == 4 || _appContext.Level.current == 6 || _appContext.Level.current == 9 || _appContext.Level.current == 13)
        {
          _appContext.cursorManagerControllerFunc.current('UPDATE-CURSOR')
        }
        else if(_appContext.Level.current == 7)
        {
          
          _appContext.cursorControllerFunc.current('INCREASE-SPEED')
        }
        else
        {
          _appContext.canClickOnButton.current = true;
        }
        _appContext.setOnce.current = true;
      }
      else
      {
        _appContext.canClickOnButton.current = true;
      }
      
      _appContext.cursorControllerFunc.current('restart');
      _appContext.cursorControllerFunc.current(true);
      buttonClicked.current = false
      handModeRef.current.visible = true;
      stopHandNormalAnimation.current = false
    }
  let handNormalAnimation = ()=>
    {
      if(!stopHandNormalAnimation.current)
        {
          handModeRef.current.position.y += (Math.sin(passedTime.current))/60
        }
      
    }
  useFrame(()=>
    {
      passedTime.current += 1/20;
      handMove()
      handNormalAnimation()
      
    })
  useEffect(()=>
    {
      _appContext.StartHandMoveFunc.current = (args)=>{startHandMove(args)} ;
      _appContext.loadingScreenControllerFunc.current('HIDE-LOADING');
    },[])
  return (
    <HandModelContext.Provider
      value={{resetHandPosition,effectAfterbrickIsReady,brickManagerFunc}}
    >
     
        <group ref={group} {...props} dispose={null}>
          
              <mesh name='HAND-BOX' ref={handModeRef} visible={false} geometry={nodes.hand_1_box.geometry} material={handBox} position={[0.5,12,0]}>
                    <mesh rotation={[0,Math.PI,Math.PI]}  geometry={nodes.hand_1.geometry} material={modelTxt} position={[-0.3,2.3,0.2]} >
                            <mesh geometry={nodes.hand_1.geometry} scale={1.03}>
                                    <meshBasicMaterial visible={false} color={'red'} side={THREE.BackSide} />
                            </mesh>
                    </mesh>
              </mesh>
              <mesh name="support" geometry={nodes.support.geometry} material={supportMat} position={[-0.254, -1, 0.246]} />
              <mesh name="ground_1" geometry={nodes.ground_1.geometry} material={ground_1_Mat} position={[-0.254, -1, 0.246]} />
              <BrickManager />
        </group>
    </HandModelContext.Provider>
  )
}


function BrickManager()
{
  let _handModelContext = useContext(HandModelContext)
  let _appContext = useContext(appContext)
  let brickModelFunctions = useRef(null);

  let [brickModel,setBrickModel] = useState(<Brick_1_Model level={_appContext.Level.current} />);
  let brickManagerFunctions = (args)=>
    {
      // if(args == 'DROP-BRICK')
      // {
      //   setBrickModel(c => c = null);

      //   let resetBrickCounter = new CustomCounter(20,0,()=>{setBrickModel(c => c = <Brick_1_Model />); return true},null);
      //   resetBrickCounter.start();
      // }
       if(args == 'BREAKE-BRICK')
      { 
        brickModelFunctions.current("brake");
      }
      else if(args == 'SHAKE-BRICK')
      { 
        brickModelFunctions.current("no-brake");
      }
      else if(args == 'RESET-BRICK')
      {
        setBrickModel(c => c = null);

        let resetBrickCounter = new CustomCounter(20,0,()=>{setBrickModel(c => c = <Brick_1_Model level={_appContext.Level.current} /> ); return true},null);
        resetBrickCounter.start();
      }
      
    }
  useEffect(()=>
    {
      _handModelContext.brickManagerFunc.current = (args)=>
        {
          brickManagerFunctions(args)
        } 
    },[])
  return(
          <>
              <BrickManagerContext.Provider
                value={{brickModelFunctions}}
              >
              {brickModel}
              </BrickManagerContext.Provider>
          </>
  )
}

export function CameraManager()
{
  let camRef = useRef(null);
  let moveStep = useRef('LEFT');
  let cameraTimer = useRef({delay:2})
  let moveCamera = ()=>
    {
       if(moveStep.current=='LEFT')
       {
          if(camRef.current.position.z >= 10)
          {
              moveStep.current='DOWN'
              
          }
          else{camRef.current.position.z = Math.round((camRef.current.position.z +0.1) *10)/10}
         
       }
       else if(moveStep.current=='DOWN')
       {
          if(camRef.current.position.y <= 15)
          {
              moveStep.current='RIGHT'
              
          }
          else{camRef.current.position.y = Math.round((camRef.current.position.y-0.1) *10)/10}
         
       }
       else if(moveStep.current=='RIGHT')
        {
          if(camRef.current.position.z <= -10)
          {
              moveStep.current='UP'
             
          }
          else{camRef.current.position.z = Math.round((camRef.current.position.z -0.1) *10)/10}
        }
        else if(moveStep.current=='UP')
        {
          if(camRef.current.position.y >= 25 )
          {
              moveStep.current='LEFT'
              
          }
          else{camRef.current.position.y = Math.round((camRef.current.position.y +0.1) *10)/10}
        }
       
       return false;
    }
  useEffect(()=>
    {
      let customCounter = new CustomCounter(5,0,moveCamera,null);
      customCounter.start();

      return()=>
        {
          customCounter.cancelCounter();
        }
    },[])
  return(
          <>
              <PerspectiveCamera ref={camRef} position={[30,25,-10]} makeDefault />
              {/* <OrbitControls enableZoom={false} enableRotate={false} enableDamping={false} target={[0,3,0]} /> */}
              <OrbitControls  target={[0,3,0]} />
              <fog attach={'fog'} args={["#6fbbc7",35,70]} />
          </>
  )
}
useGLTF.preload('/model_2.glb')
//On pourra même jouer en fonction de la distance

//BONUS la barre devient rapide et petite et le cube brille mais si on arrive a le briser on gagne beaucoup

//BUT DU JEUX
//Un seul mode pour le moment on ne fait que casser des briques et monter en niveaux