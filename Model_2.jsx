/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.2 ./public/model_2.glb 
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
        <mesh name="hand_1_box" geometry={nodes.hand_1_box.geometry} material={nodes.hand_1_box.material} position={[-0.25, 8.948, 0.257]} rotation={[0, 0, Math.PI / 2]}>
          <mesh name="hand_1" geometry={nodes.hand_1.geometry} material={nodes.hand_1.material} position={[0.25, 2.3, -0.2]} rotation={[Math.PI, 0, 0]} />
        </mesh>
        <mesh name="support" geometry={nodes.support.geometry} material={nodes.support.material} position={[-0.254, -0.09, 0.246]} />
        <mesh name="ground_1" geometry={nodes.ground_1.geometry} material={nodes.ground_1.material} position={[0.016, -6.067, 0]} scale={1.6} />
        <mesh name="block_1" geometry={nodes.block_1.geometry} material={nodes.block_1.material} position={[-12, 2, 0]} />
        <mesh name="block_1_core" geometry={nodes.block_1_core.geometry} material={nodes.block_1_core.material} position={[0, 2.981, 0]} />
        <mesh name="block_1_left" geometry={nodes.block_1_left.geometry} material={nodes.block_1_left.material} position={[0, 2, 0]} />
        <mesh name="block_1_right" geometry={nodes.block_1_right.geometry} material={nodes.block_1_right.material} position={[0, 2, 0]} rotation={[0, 0, -Math.PI]} />
        <mesh name="block_2" geometry={nodes.block_2.geometry} material={nodes.block_2.material} position={[15.324, 2, 0.229]} />
        <mesh name="block_2_left" geometry={nodes.block_2_left.geometry} material={nodes.block_2_left.material} position={[0, 0, 0.029]} />
        <mesh name="block_2_right" geometry={nodes.block_2_right.geometry} material={nodes.block_2_right.material} position={[0, 0, 0.029]} />
        <mesh name="block_3_left" geometry={nodes.block_3_left.geometry} material={nodes.block_3_left.material} position={[0.016, 0.141, 0]} />
        <mesh name="block_3_right" geometry={nodes.block_3_right.geometry} material={nodes.block_3_right.material} position={[0, 0.141, 0]} />
        <mesh name="block_3" geometry={nodes.block_3.geometry} material={nodes.block_3.material} position={[0, 3, 0]} />
        <mesh name="block_4_left" geometry={nodes.block_4_left.geometry} material={nodes.block_4_left.material} position={[0.007, 2.041, 0.462]} />
        <mesh name="block_4" geometry={nodes.block_4.geometry} material={nodes.block_4.material} position={[-11.693, 2.041, 0.462]} />
        <mesh name="block_4_right" geometry={nodes.block_4_right.geometry} material={nodes.block_4_right.material} position={[0.007, 2.041, 0.462]} />
        <mesh name="block_5_left" geometry={nodes.block_5_left.geometry} material={nodes.block_5_left.material} position={[-0.001, 2.104, 0.462]} />
        <mesh name="block_5" geometry={nodes.block_5.geometry} material={nodes.block_5.material} position={[-14.001, 2.104, 0.462]} />
        <mesh name="block_5_right" geometry={nodes.block_5_right.geometry} material={nodes.block_5_right.material} position={[-0.001, 2.104, 0.462]} />
        <mesh name="block_6" geometry={nodes.block_6.geometry} material={nodes.block_6.material} position={[-30.849, 3.191, 21]} scale={1.669} />
        <mesh name="block_6_part_7" geometry={nodes.block_6_part_7.geometry} material={nodes.block_6_part_7.material} position={[0.016, 3.191, 0]} scale={1.669} />
        <mesh name="block_6_part_2" geometry={nodes.block_6_part_2.geometry} material={nodes.block_6_part_2.material} position={[0.016, 3.191, 0]} scale={1.669} />
        <mesh name="block_6_part_1" geometry={nodes.block_6_part_1.geometry} material={nodes.block_6_part_1.material} position={[0.016, 3.191, 0]} scale={1.669} />
        <mesh name="block_6_part_3" geometry={nodes.block_6_part_3.geometry} material={nodes.block_6_part_3.material} position={[0.016, 3.191, 0]} scale={1.669} />
        <mesh name="block_6_part_4" geometry={nodes.block_6_part_4.geometry} material={nodes.block_6_part_4.material} position={[0.016, 3.191, 0]} scale={1.669} />
        <mesh name="block_6_part_5" geometry={nodes.block_6_part_5.geometry} material={nodes.block_6_part_5.material} position={[0.016, 3.191, 0]} scale={1.669} />
        <mesh name="block_6_part_6" geometry={nodes.block_6_part_6.geometry} material={nodes.block_6_part_6.material} position={[0.016, 3.191, 0]} scale={1.669} />
        <mesh name="block_7_part_3" geometry={nodes.block_7_part_3.geometry} material={nodes.block_7_part_3.material} position={[-0.293, 2.49, 0.102]} rotation={[0, 0, -Math.PI / 2]} />
        <mesh name="block_7" geometry={nodes.block_7.geometry} material={nodes.block_7.material} position={[-28.293, 2.49, 0.102]} rotation={[0, 0, -Math.PI / 2]} />
        <mesh name="block_7_part_1" geometry={nodes.block_7_part_1.geometry} material={nodes.block_7_part_1.material} position={[-0.293, 2.49, 0.102]} rotation={[0, 0, -Math.PI / 2]} />
        <mesh name="block_7_part_2" geometry={nodes.block_7_part_2.geometry} material={nodes.block_7_part_2.material} position={[-0.293, 2.49, 0.102]} rotation={[0, 0, -Math.PI / 2]} />
      </group>
    </group>
  )
}

useGLTF.preload('/model_2.glb')
