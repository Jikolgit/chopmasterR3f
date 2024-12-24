import * as THREE from 'three';
import React, { createContext, useContext, useEffect, useRef, useState } from 'react'
import { OrbitControls, PerspectiveCamera, Text, useAnimations, useGLTF, useTexture } from '@react-three/drei'
import { useFrame } from '@react-three/fiber';
import { appContext } from '../src/App';
import { CustomCounter } from '../components/utils';
import { prepareTexture } from './GameApp';

export function Shop3DView(props)
{

      const _appContext = useContext(appContext)
      const group = React.useRef(null);
      const { nodes, materials,animations } = useGLTF('/model_2.glb');
      const {mixer, clips,actions} = useAnimations(animations,group)
      const [GLoveModel,setGloveModel] = useState(1)
    useEffect(()=>
        {
            _appContext.shopViewController.current = (args)=>
            {
                if(args == 'LEFT')
                {
                    if(_appContext.currentGLove.current == 1)
                    {}
                    else
                    {
                        _appContext.currentGLove.current --; 
                        setGloveModel(_appContext.currentGLove.current)
                    }
                    
                }
                else
                {
                        if(_appContext.currentGLove.current == _appContext.totalGLove.current)
                        {}
                        else
                        {
                            _appContext.currentGLove.current ++; 
                            setGloveModel(_appContext.currentGLove.current)
                        }
                }
            }
        },[])
    return(
            <>
                <PerspectiveCamera position={[-5,5,0]}  makeDefault/>
                <OrbitControls />
                
                <GloveModels gloveModel={GLoveModel} />
            </>
    )
}

export function GloveModels(props)
{
    const group = React.useRef(null);
    const { nodes, materials,animations } = useGLTF('/model_2.glb');
    const {mixer, clips,actions} = useAnimations(animations,group);
    let txt = prepareTexture('handtxt1.jpg');
    let modelTxt = new THREE.MeshBasicMaterial({map:txt});
    let handBox = new THREE.MeshBasicMaterial({wireframe:true,color:'white',visible:false});
    let handRef = useRef(null);

    useFrame(()=>
    {
        handRef.current.rotation.y += 0.01
    })
    return(
            <>
                    {props.gloveModel == 1 &&
                        <mesh  scale={0.5} name='HAND-BOX' geometry={nodes.hand_1_box.geometry} material={handBox} position={[0,0,0]}>
                        <mesh ref={handRef} rotation={[0,Math.PI,Math.PI]}  geometry={nodes.hand_1.geometry} material={modelTxt} position={[-0.3,2.3,0.2]} >
                                <mesh geometry={nodes.hand_1.geometry} scale={1.03}>
                                        <meshBasicMaterial visible={false} color={'red'} side={THREE.BackSide} />
                                </mesh>
                        </mesh>
                        </mesh>

                    }
                    {props.gloveModel == 2 &&
                        <mesh  scale={0.5} name='HAND-BOX' geometry={nodes.hand_2_box.geometry} material={handBox} position={[0,0,0]}>
                        <mesh ref={handRef} rotation={[0,Math.PI,Math.PI]}  geometry={nodes.hand_2.geometry} material={modelTxt} position={[-0.3,2.3,0.2]} >
                                <mesh geometry={nodes.hand_2.geometry} scale={1.03}>
                                        <meshBasicMaterial visible={false} color={'red'} side={THREE.BackSide} />
                                </mesh>
                        </mesh>
                        </mesh>

                    }
                    
            </>
    )
}