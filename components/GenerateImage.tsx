"use client";
import { useAuth } from "@clerk/nextjs";
import { useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { BACKEND_URL } from "@/app/config";
import { SelectModel } from "./Models";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useCredits } from "@/hooks/use-credits";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function GenerateImage() {
  const [prompt, setPrompt] = useState("");
  const [imageSize, setImageSize] = useState("landscape_4_3");
  const [selectedModel, setSelectedModel] = useState<string>();
  const [isGenerating, setIsGenerating] = useState(false);
  const { getToken } = useAuth();
  const { credits } = useCredits();
  const router = useRouter();

  const handleGenerate = async () => {
    if (!prompt || !selectedModel) return;

    if (credits <= 0) {
      router.push("/pricing");
      return;
    }

    setIsGenerating(true);
    try {
      const token = await getToken();
      await axios.post(
        `${BACKEND_URL}/ai/generate`,
        {
          prompt,
          modelId: selectedModel,
          num: 1,
          imageSize,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Image generation started!");
      setPrompt("");
      // @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Failed to generate image");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <motion.div
      className="max-w-2xl mx-auto space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="space-y-4">
        <SelectModel
          selectedModel={selectedModel}
          setSelectedModel={setSelectedModel}
        />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="space-y-1 mb-5">
            <h2 className="text-2xl font-semibold tracking-tight">
              Step 2 - Write a prompt
            </h2>
          </div>
          <Textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder='Use the keyword "model" to bring your idea to life, e.g., "model in a vintage denim jacket standing in a bustling city street".'
            className="min-h-[120px] text-2xl resize-none"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="space-y-1 mb-5">
            <h2 className="text-2xl font-semibold tracking-tight">
              Step 3 - Select a Image Size
            </h2>
            
          </div>
          <Select value={imageSize} onValueChange={setImageSize}>
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="landscape_4_3">Landscape 4:3 (1024x768)</SelectItem>
              <SelectItem value="landscape_16_9">Landscape 16:9 (1024x576)</SelectItem>
              <SelectItem value="portrait_4_3">Portrait 3:4 (768x1024)</SelectItem>
              <SelectItem value="portrait_16_9">Portrait 9:16 (576x1024)</SelectItem>
              <SelectItem value="square_hd">Square HD (1024x1024)</SelectItem>
              <SelectItem value="square">Square (512x512)</SelectItem>
            </SelectContent>
          </Select>
        </motion.div>

        <motion.div
          className="flex justify-end"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            onClick={handleGenerate}
            disabled={isGenerating || !prompt || !selectedModel}
            className="px-8"
          >
            <Sparkles className="mr-2 h-4 w-4" />
            {isGenerating ? "Generating..." : "Generate (1 credit)"}
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}
