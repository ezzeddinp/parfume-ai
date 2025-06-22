"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { MessageCircle } from "lucide-react"

interface FloatingChatButtonProps {
  isChatOpen: boolean
  setIsChatOpen: (open: boolean) => void
}

export default function FloatingChatButton({ isChatOpen, setIsChatOpen }: FloatingChatButtonProps) {
  return (
    <AnimatePresence>
      {!isChatOpen && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          className="fixed bottom-6 right-6 z-50"
        >
          <motion.div whileHover={{ scale: 1.1, y: -5 }} whileTap={{ scale: 0.9 }}>
            <Button
              onClick={() => setIsChatOpen(true)}
              className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white rounded-full p-4 shadow-xl border border-blue-500/20"
            >
              <MessageCircle className="h-6 w-6" />
            </Button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
