import { useGLTF } from "@react-three/drei";

export function generateBlockData(level)
    {
        const { nodes, materials,animations } = useGLTF('/model_2.glb');

        const Block_1 = [nodes.block_1.geometry,'block_1',[{blockGeo:nodes.block_1_left.geometry,blockName:'block_1_left',blockAnime:'block1laction',blockPos:[0, 2, 0],blockRot:[0,0,0],blockScale:1},
                                                 {blockGeo:nodes.block_1_right.geometry,blockName:'block_1_right',blockAnime:'block1raction',blockPos:[0, 2, 0],blockRot:[0, 0, -Math.PI],blockScale:1}
                                                ],0];
        // const Block_1 = [nodes.block_1.geometry,nodes.block_1_left.geometry,nodes.block_1_right.geometry,'block1laction','block1raction','block_1_left','block_1_right',0];
        // const Block_2 = [nodes.block_2.geometry,nodes.block_2_left.geometry,nodes.block_2_right.geometry,'block_2_leftAction','block_2_rightAction','block_2_left','block_2_right',1]
        const Block_2 = [nodes.block_2.geometry,'block_2',[{blockGeo:nodes.block_2_left.geometry,blockName:'block_2_left',blockAnime:'block_2_leftAction',blockPos:[0, 2, 0],blockRot:[0,0,0],blockScale:1},
                                                 {blockGeo:nodes.block_2_right.geometry,blockName:'block_2_right',blockAnime:'block_2_rightAction',blockPos:[0, 2, 0],blockRot:[0,0,0],blockScale:1}],1]
        
        const Block_3 = [nodes.block_3.geometry,'block_3',[{blockGeo:nodes.block_3_left.geometry,blockName:'block_3_left',blockAnime:'block_3_leftAction',blockPos:[0, 2, 0],blockRot:[0,0,0],blockScale:1},
                                                 {blockGeo:nodes.block_3_right.geometry,blockName:'block_3_right',blockAnime:'block_3_rightAction',blockPos:[0, 2, 0],blockRot:[0,0,0],blockScale:1}],1]

        const Block_4 = [nodes.block_4.geometry,'block_4',[{blockGeo:nodes.block_4_left.geometry,blockName:'block_4_left',blockAnime:'block_4_leftAction',blockPos:[0, 2, 0],blockRot:[0,0,0],blockScale:1},
                                                 {blockGeo:nodes.block_4_right.geometry,blockName:'block_4_right',blockAnime:'block_4_rightAction',blockPos:[0, 2, 0],blockRot:[0,0,0],blockScale:1}],1]
        const Block_5 = [nodes.block_5.geometry,'block_5',[{blockGeo:nodes.block_5_left.geometry,blockName:'block_5_left',blockAnime:'block_5_leftAction',blockPos:[0, 2, 0],blockRot:[0,0,0],blockScale:1},
                                                 {blockGeo:nodes.block_5_right.geometry,blockName:'block_5_right',blockAnime:'block_5_rightAction',blockPos:[0, 2, 0],blockRot:[0,0,0],blockScale:1}

        ],1]
        const Block_6 = [nodes.block_6.geometry,'block_6',[{blockGeo:nodes.block_6_part_1.geometry,blockName:'block_6_part_1',blockAnime:'block_6_part_1Action',blockPos:[0.016, 3.191, 0],blockScale:2,blockRot:[0,0,0]},
                                                 {blockGeo:nodes.block_6_part_2.geometry,blockName:'block_6_part_2',blockAnime:'block_6_part_2Action',blockPos:[0.016, 3.191, 0],blockScale:2,blockRot:[0,0,0]},
                                                 {blockGeo:nodes.block_6_part_3.geometry,blockName:'block_6_part_3',blockAnime:'block_6_part_3Action',blockPos:[0.016, 3.191, 0],blockScale:2,blockRot:[0,0,0]},
                                                 {blockGeo:nodes.block_6_part_4.geometry,blockName:'block_6_part_4',blockAnime:'block_6_part_4Action',blockPos:[0.016, 3.191, 0],blockScale:2,blockRot:[0,0,0]},
                                                 {blockGeo:nodes.block_6_part_5.geometry,blockName:'block_6_part_5',blockAnime:'block_6_part_5Action',blockPos:[0.016, 3.191, 0],blockScale:2,blockRot:[0,0,0]},
                                                 {blockGeo:nodes.block_6_part_6.geometry,blockName:'block_6_part_6',blockAnime:'block_6_part_6Action',blockPos:[0.016, 3.191, 0],blockScale:2,blockRot:[0,0,0]},
                                                 {blockGeo:nodes.block_6_part_7.geometry,blockName:'block_6_part_7',blockAnime:'block_6_part_7Action',blockPos:[0.016, 3.191, 0],blockScale:2,blockRot:[0,0,0]},
                                                ],1];
        const Block_7 = [nodes.block_7.geometry,'block_7',[{blockGeo:nodes.block_7_part_1.geometry,blockName:'block_7_part_1',blockAnime:'block_7_part_1Action',blockPos:[-0.293, 2.49, 0.102],blockRot:[0, 0, -Math.PI / 2],blockScale:1},
        {blockGeo:nodes.block_7_part_2.geometry,blockName:'block_7_part_2',blockAnime:'block_7_part_2Action',blockPos:[-0.293, 2.49, 0.102],blockRot:[0, 0, -Math.PI / 2],blockScale:1},
        {blockGeo:nodes.block_7_part_3.geometry,blockName:'block_7_part_3',blockAnime:'block_7_part_3Action',blockPos:[-0.293, 2.49, 0.102],blockRot:[0, 0, -Math.PI / 2],blockScale:1}

       ],1]

        if(level >= 1 && level < 3)
        {
            return Block_1
        }
        else if(level >= 3 && level < 7)
        {
            return Block_2
        }
        else if(level >= 3 && level < 11)
        {
            return Block_3
        }
        else if(level >= 11 && level < 14)
        {
            return Block_4
        }
        else if(level >= 14 && level < 17)
        {
            return Block_5
        }
        else if(level >= 17)
        {
            return Block_6
        }
    }