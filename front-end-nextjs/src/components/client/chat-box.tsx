"use client"

import { useState, useRef, useEffect } from "react"
import { MessageCircle, X, Send, Paperclip, ChevronDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"

// Mock data for chat messages
const initialMessages = [
  {
    id: 1,
    sender: "bot",
    message: "Xin chào! Tôi là trợ lý ảo của MotorBike. Tôi có thể giúp gì cho bạn?",
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
  },
]

export function ChatBox() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState(initialMessages)
  const [newMessage, setNewMessage] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  // Toggle chat box
  const toggleChatBox = () => {
    setIsOpen(!isOpen)
  }

  // Send a new message
  const handleSendMessage = () => {
    if (newMessage.trim() === "") return

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      sender: "user",
      message: newMessage,
      timestamp: new Date(),
    }

    setMessages([...messages, userMessage])
    setNewMessage("")

    // Simulate bot response after a short delay
    setTimeout(() => {
      const botResponses = [
        "Cảm ơn bạn đã liên hệ với chúng tôi. Chúng tôi có thể giúp gì cho bạn?",
        "Bạn có thể cho tôi biết thêm chi tiết về yêu cầu của bạn không?",
        "Chúng tôi có nhiều mẫu xe máy phù hợp với nhu cầu của bạn. Bạn quan tâm đến loại xe nào?",
        "Bạn có thể liên hệ với chúng tôi qua số hotline 1900 1234 để được tư vấn trực tiếp.",
        "Cửa hàng chúng tôi mở cửa từ 8h đến 20h hàng ngày, kể cả cuối tuần.",
      ]

      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)]

      const botMessage = {
        id: messages.length + 2,
        sender: "bot",
        message: randomResponse,
        timestamp: new Date(),
      }

      setMessages((prevMessages) => [...prevMessages, botMessage])
    }, 1000)
  }

  // Format timestamp
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat Button */}
      <Button
        onClick={toggleChatBox}
        className="h-14 w-14 rounded-full shadow-lg"
        aria-label={isOpen ? "Đóng chat" : "Mở chat"}
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </Button>

      {/* Chat Box */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 sm:w-96 bg-background rounded-lg shadow-xl border overflow-hidden">
          {/* Chat Header */}
          <div className="bg-primary text-primary-foreground p-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Support" />
                <AvatarFallback>MB</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium text-sm">Hỗ trợ trực tuyến</h3>
                <p className="text-xs text-primary-foreground/80">Trực tuyến</p>
              </div>
            </div>
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary/80"
              >
                <ChevronDown className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary/80"
                onClick={toggleChatBox}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Chat Messages */}
          <ScrollArea className="h-80 p-3">
            <div className="space-y-3">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                  {msg.sender === "bot" && (
                    <Avatar className="h-8 w-8 mr-2 flex-shrink-0 self-end mb-1">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Support" />
                      <AvatarFallback>MB</AvatarFallback>
                    </Avatar>
                  )}
                  <div className="max-w-[80%]">
                    <div
                      className={`rounded-lg p-3 ${
                        msg.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                      }`}
                    >
                      <p className="text-sm">{msg.message}</p>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{formatTime(msg.timestamp)}</p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Chat Input */}
          <div className="p-3 border-t">
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" className="h-10 w-10 flex-shrink-0">
                <Paperclip className="h-5 w-5" />
              </Button>
              <Input
                placeholder="Nhập tin nhắn..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSendMessage()
                  }
                }}
                className="flex-1"
              />
              <Button size="icon" className="h-10 w-10 flex-shrink-0" onClick={handleSendMessage}>
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
