import { useGLTF } from "@react-three/drei";

export function generateBlockData(level)
    {
        const { nodes, materials,animations } = useGLTF('/model_2.glb');
        
        if(level >= 1 && level < 5)
        {
            return [nodes.block_1.geometry,nodes.block_1_left.geometry,nodes.block_1_right.geometry,'block1laction','block1raction','block_1_left','block_1_right','bricktxt1.jpg']
        }
        else if(level >= 5)
        {
            return [nodes.block_2.geometry,nodes.block_2_left.geometry,nodes.block_2_right.geometry,'block_2_leftAction','block_2_rightAction','block_2_left','block_2_right','block_1_txt.jpg']
        }
    }