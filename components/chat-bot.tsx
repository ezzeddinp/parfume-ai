"use client"

import { useChat } from "@ai-sdk/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, Bot, User, Sparkles, X } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface ChatBotProps {
  isChatOpen: boolean
  setIsChatOpen: (open: boolean) => void
}

export default function ChatBot({ isChatOpen, setIsChatOpen }: ChatBotProps) {
  const [isMobile, setIsMobile] = useState(false)

  const { messages, input, handleInputChange, handleSubmit, isLoading, error } = useChat({
    api: "/api/chat",
    onError: (error) => {
      console.error("❌ Chat Error:", error)
    },
    onFinish: (message) => {
      console.log("✅ Message finished:", message)
    },
  })

  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Debug: Log messages changes
  useEffect(() => {
    console.log("📝 Messages updated:", messages)
  }, [messages])

  // Debug: Log loading state
  useEffect(() => {
    console.log("⏳ Loading state:", isLoading)
  }, [isLoading])

  // Debug: Log errors
  useEffect(() => {
    if (error) {
      console.error("💥 Frontend Error:", error)
    }
  }, [error])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Prevent body scroll when chat is open on mobile
  useEffect(() => {
    if (isChatOpen && isMobile) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isChatOpen, isMobile])

  return (
    <AnimatePresence>
      {isChatOpen && (
        <motion.div
          initial={{ scale: 0, opacity: 0, y: 100 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0, opacity: 0, y: 100 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className={`fixed z-[9997] chatbot-container ${
            isMobile ? "inset-0 chatbot-mobile" : "bottom-8 right-8 w-96 h-[600px] chatbot-desktop"
          }`}
        >
          <div className="bg-gradient-to-b from-gray-900/95 to-black/95 backdrop-blur-xl border border-gray-700/50 rounded-3xl shadow-2xl w-full h-full flex flex-col overflow-hidden">
            <motion.div
              className="flex items-center justify-between p-4 md:p-6 border-b border-gray-700/50 bg-gradient-to-r from-blue-900/20 to-black/20"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-full p-2">
                  <Sparkles className="h-4 w-4 md:h-5 md:w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base md:text-lg">AI Perfume Expert</h3>
                  <motion.p
                    className="text-xs text-blue-400 flex items-center"
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <span className="w-2 h-2 bg-blue-400 rounded-full mr-1"></span>
                    {isLoading ? "Thinking..." : "Siap Membantu"}
                  </motion.p>
                </div>
              </div>
              <motion.div whileHover={{ scale: 1.1, rotate: 90 }} whileTap={{ scale: 0.9 }}>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsChatOpen(false)}
                  className="text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-full p-2"
                >
                  <X className="h-4 w-4 md:h-5 md:w-5" />
                </Button>
              </motion.div>
            </motion.div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 custom-scrollbar">
              {/* Debug Info */}
              {error && (
                <div className="bg-red-900/50 border border-red-500/50 rounded-lg p-3 text-red-200 text-sm">
                  <strong>Error:</strong> {error.message}
                </div>
              )}

              <AnimatePresence>
                {messages.length === 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center text-gray-400 py-8 md:py-12"
                  >
                    <motion.div
                      animate={{
                        rotate: [0, 360],
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        rotate: { duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                        scale: { duration: 2, repeat: Number.POSITIVE_INFINITY },
                      }}
                      className="mb-4 md:mb-6"
                    >
                      <Bot className="h-12 w-12 md:h-16 md:w-16 mx-auto text-blue-400" />
                    </motion.div>
                    <motion.p
                      className="text-sm leading-relaxed px-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      Halo! Saya AI expert parfum Anda. Tanyakan tentang fragrance, dapatkan rekomendasi personal, atau
                      pelajari tentang scent families!
                    </motion.p>

                    {/* Suggested Questions */}
                    <motion.div
                      className="mt-4 md:mt-6 space-y-2"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 }}
                    >
                      {[
                        "Parfum yang cocok untuk musim panas?",
                        "Recommend romantic fragrance",
                        "Ceritakan tentang woody scents",
                      ].map((suggestion, index) => (
                        <motion.button
                          key={`suggestion-${suggestion}`}
                          className="block w-full text-left text-xs bg-gradient-to-r from-blue-900/30 to-black/30 text-blue-300 px-3 py-2 rounded-full border border-blue-700/30 hover:border-blue-500/50 transition-colors"
                          whileHover={{ scale: 1.02, x: 5 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => {
                            const event = { target: { value: suggestion } } as any
                            handleInputChange(event)
                          }}
                        >
                          {suggestion}
                        </motion.button>
                      ))}
                    </motion.div>
                  </motion.div>
                )}

                {/* Debug: Show message count */}
                {messages.length > 0 && (
                  <div className="text-xs text-gray-500 text-center mb-4">
                    Messages: {messages.length} | Loading: {isLoading ? "Yes" : "No"}
                  </div>
                )}

                {messages.map((message, index) => (
                  <motion.div
                    key={`message-${message.id || index}`}
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`flex items-start space-x-2 md:space-x-3 max-w-[85%] ${
                        message.role === "user" ? "flex-row-reverse space-x-reverse" : ""
                      }`}
                    >
                      <motion.div
                        className={`rounded-full p-1.5 md:p-2 flex-shrink-0 ${
                          message.role === "user"
                            ? "bg-gradient-to-r from-blue-600 to-blue-800"
                            : "bg-gradient-to-r from-gray-700 to-gray-800"
                        }`}
                        whileHover={{ scale: 1.1 }}
                      >
                        {message.role === "user" ? (
                          <User className="h-3 w-3 md:h-4 md:w-4 text-white" />
                        ) : (
                          <Bot className="h-3 w-3 md:h-4 md:w-4 text-blue-400" />
                        )}
                      </motion.div>

                      <motion.div
                        className={`rounded-2xl p-3 md:p-4 relative overflow-hidden ${
                          message.role === "user"
                            ? "bg-gradient-to-r from-blue-600 to-blue-800 text-white"
                            : "bg-gradient-to-r from-gray-800/80 to-gray-900/80 text-gray-100 backdrop-blur-sm border border-gray-700/30"
                        }`}
                        whileHover={{ scale: 1.02 }}
                        layout
                      >
                        <div className="text-sm whitespace-pre-wrap leading-relaxed relative z-10">
                          {message.content || "No content"}
                        </div>
                        {/* Debug: Show message details */}
                        <div className="text-xs opacity-50 mt-1">
                          Role: {message.role} | ID: {message.id?.slice(0, 8)}
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                ))}

                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="flex items-start space-x-2 md:space-x-3 max-w-[85%]">
                      <motion.div
                        className="bg-gradient-to-r from-gray-700 to-gray-800 rounded-full p-1.5 md:p-2"
                        animate={{
                          scale: [1, 1.1, 1],
                          rotate: [0, 360],
                        }}
                        transition={{
                          scale: { duration: 1, repeat: Number.POSITIVE_INFINITY },
                          rotate: { duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                        }}
                      >
                        <Bot className="h-3 w-3 md:h-4 md:w-4 text-blue-400" />
                      </motion.div>
                      <div className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 backdrop-blur-sm border border-gray-700/30 rounded-2xl p-3 md:p-4">
                        <div className="flex space-x-1">
                          {[0, 1, 2].map((i) => (
                            <motion.div
                              key={`loading-dot-${i}`}
                              className="w-1.5 h-1.5 md:w-2 md:h-2 bg-blue-400 rounded-full"
                              animate={{
                                scale: [1, 1.5, 1],
                                opacity: [0.5, 1, 0.5],
                              }}
                              transition={{
                                duration: 1,
                                repeat: Number.POSITIVE_INFINITY,
                                delay: i * 0.2,
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div ref={messagesEndRef} />
            </div>

            {/* Enhanced Input */}
            <motion.div
              className="border-t border-gray-700/50 p-3 md:p-4 bg-gradient-to-r from-gray-900/50 to-black/50 backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <form onSubmit={handleSubmit} className="flex space-x-2 md:space-x-3">
                <div className="flex-1 relative">
                  <Input
                    value={input}
                    onChange={handleInputChange}
                    placeholder="Tanyakan tentang parfum..."
                    className="bg-gray-800/50 border-gray-600/50 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-full px-4 py-2 md:py-3 pr-10 md:pr-12 backdrop-blur-sm text-sm md:text-base"
                    disabled={isLoading}
                  />
                  {input && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    >
                      <Sparkles className="h-3 w-3 md:h-4 md:w-4 text-blue-400" />
                    </motion.div>
                  )}
                </div>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white rounded-full p-2 md:p-3 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
                  >
                    <Send className="h-3 w-3 md:h-4 md:w-4 relative z-10" />
                  </Button>
                </motion.div>
              </form>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
