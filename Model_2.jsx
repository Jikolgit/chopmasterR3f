/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.0 ./public/model_2.glb 
*/

import React from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

export function Model(props) {
  const group = React.useRef()
  const { nodes, materials, animations } = useGLTF('/model_2.glb')
  const { actions } = useAnimations(animations, group)
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <mesh name="hand_1_box" geometry={nodes.hand_1_box.geometry} material={nodes.hand_1_box.material} position={[-0.25, 5.019, 0.257]}>
          <mesh name="hand_1" geometry={nodes.hand_1.geometry} material={nodes.hand_1.material} position={[0.25, 2.3, -0.2]} rotation={[Math.PI, 0, 0]} />
        </mesh>
        <mesh name="support" geometry={nodes.support.geometry} material={nodes.support.material} position={[-0.254, -0.09, 0.246]} />
        <mesh name="block_1" geometry={nodes.block_1.geometry} material={nodes.block_1.material} position={[-12, 2, 0]} />
        <mesh name="block_1_core" geometry={nodes.block_1_core.geometry} material={nodes.block_1_core.material} position={[0, 2.981, 0]} />
        <mesh name="block_1_left" geometry={nodes.block_1_left.geometry} material={nodes.block_1_left.material} position={[0, 2, 0]} />
        <mesh name="block_1_right" geometry={nodes.block_1_right.geometry} material={nodes.block_1_right.material} position={[0, 2, 0]} rotation={[0, 0, -Math.PI]} />
        <mesh name="block_2" geometry={nodes.block_2.geometry} material={nodes.block_2.material} position={[15.324, 2, 0.229]} />
        <mesh name="block_2_left" geometry={nodes.block_2_left.geometry} material={nodes.block_2_left.material} position={[0, 0, 0.029]} />
        <mesh name="block_2_right" geometry={nodes.block_2_right.geometry} material={nodes.block_2_right.material} position={[0, 0, 0.029]} />
      </group>
    </group>
  )
}

useGLTF.preload('/model_2.glb')
