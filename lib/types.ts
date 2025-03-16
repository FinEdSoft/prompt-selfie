import { z } from "zod";

export const TrainModel = z.object({
    name: z.string(),
    type: z.enum(["Man", "Woman", "Others"]),
    age: z.number(),
    ethinicity: z.enum(["White", 
        "Black", 
        "Asian_American", 
        "East_Asian",
        "South_East_Asian", 
        "South_Asian", 
        "Middle_Eastern", 
        "Pacific", 
        "Hispanic"
    ]),
    eyeColor: z.enum(["Brown", "Blue", "Hazel", "Gray"]),
    bald: z.boolean(),
    zipUrl: z.string()
})

export const GenerateImage = z.object({
    prompt: z.string(),
    modelId: z.string(),
    num: z.number(),
    imageSize: z.enum([
        "landscape_4_3",
        "landscape_16_9",
        "portrait_16_9",
        "portrait_4_3",
        "square",
        "square_hd",
    ])
})

export const GenerateImagesFromPack = z.object({
    modelId: z.string(),
    packId: z.string(),
    imageSize: z.enum([
        "landscape_4_3",
        "landscape_16_9",
        "portrait_16_9",
        "portrait_4_3",
        "square",
        "square_hd",
    ])
})