import { useGLTF } from "@react-three/drei";

export function generateBlockData(level)
    {
        const { nodes, materials,animations } = useGLTF('/model_2.glb');
        
        if(level >= 1 && level < 6)
        {
            return [nodes.block_1.geometry,nodes.block_1_left.geometry,nodes.block_1_right.geometry,'block1laction','block1raction','block_1_left','block_1_right',0]
        }
        else if(level >= 6 && level < 10)
        {
            return [nodes.block_2.geometry,nodes.block_2_left.geometry,nodes.block_2_right.geometry,'block_2_leftAction','block_2_rightAction','block_2_left','block_2_right',1]
        }
        else if(level >= 10 )
        {
            return [nodes.block_3.geometry,nodes.block_3_left.geometry,nodes.block_3_right.geometry,'block_3_leftAction','block_3_rightAction','block_3_left','block_3_right',1]
        }
    }