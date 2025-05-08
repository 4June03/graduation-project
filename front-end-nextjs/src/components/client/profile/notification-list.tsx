"use client"

import { useState } from "react"
import Link from "next/link"
import { Bell, Check, Trash2, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface Notification {
  id: number
  title: string
  message: string
  date: string
  isRead: boolean
  type: string
  link: string
}

interface NotificationListProps {
  initialNotifications: Notification[]
}

export function NotificationList({ initialNotifications }: NotificationListProps) {
  const [activeTab, setActiveTab] = useState("all")
  const [notificationList, setNotificationList] = useState(initialNotifications)

  // Filter notifications based on active tab
  const filteredNotifications = notificationList.filter((notification) => {
    if (activeTab === "all") return true
    if (activeTab === "unread") return !notification.isRead
    return notification.type === activeTab
  })

  // Mark notification as read
  const markAsRead = (id: number) => {
    setNotificationList(
      notificationList.map((notification) =>
        notification.id === id ? { ...notification, isRead: true } : notification,
      ),
    )
  }

  // Mark all as read
  const markAllAsRead = () => {
    setNotificationList(notificationList.map((notification) => ({ ...notification, isRead: true })))
  }

  // Delete notification
  const deleteNotification = (id: number) => {
    setNotificationList(notificationList.filter((notification) => notification.id !== id))
  }

  // Delete all notifications
  const deleteAllNotifications = () => {
    if (activeTab === "all") {
      setNotificationList([])
    } else {
      const notificationsToKeep = notificationList.filter((notification) => {
        if (activeTab === "unread") return notification.isRead
        return notification.type !== activeTab
      })
      setNotificationList(notificationsToKeep)
    }
  }

  // Get notification type badge
  const getNotificationTypeBadge = (type: string) => {
    switch (type) {
      case "order":
        return { variant: "default" as const, text: "Đơn hàng" }
      case "promotion":
        return { variant: "destructive" as const, text: "Khuyến mãi" }
      case "system":
        return { variant: "outline" as const, text: "Hệ thống" }
      case "news":
        return { variant: "secondary" as const, text: "Tin tức" }
      case "service":
        return { variant: "default" as const, text: "Dịch vụ" }
      default:
        return { variant: "outline" as const, text: type }
    }
  }

  // Count unread notifications
  const unreadCount = notificationList.filter((notification) => !notification.isRead).length

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Thông báo của tôi</CardTitle>
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <Button variant="outline" size="sm" onClick={markAllAsRead}>
              <Check className="h-4 w-4 mr-2" />
              Đánh dấu tất cả đã đọc
            </Button>
          )}
          <Button variant="outline" size="sm" onClick={deleteAllNotifications}>
            <Trash2 className="h-4 w-4 mr-2" />
            Xóa tất cả
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <div className="flex justify-between items-center mb-6">
            <TabsList>
              <TabsTrigger value="all">
                Tất cả
                {notificationList.length > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {notificationList.length}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="unread">
                Chưa đọc
                {unreadCount > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {unreadCount}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="order">Đơn hàng</TabsTrigger>
              <TabsTrigger value="promotion">Khuyến mãi</TabsTrigger>
              <TabsTrigger value="system">Hệ thống</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value={activeTab} className="space-y-4">
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 border rounded-lg ${notification.isRead ? "" : "bg-muted/30 border-primary/20"}`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-start gap-3">
                      <div
                        className={`h-10 w-10 rounded-full flex items-center justify-center ${
                          notification.isRead ? "bg-muted" : "bg-primary/10"
                        }`}
                      >
                        <Bell className={`h-5 w-5 ${notification.isRead ? "text-muted-foreground" : "text-primary"}`} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className={`font-medium ${notification.isRead ? "" : "text-primary"}`}>
                            {notification.title}
                          </h3>
                          <Badge variant={getNotificationTypeBadge(notification.type).variant}>
                            {getNotificationTypeBadge(notification.type).text}
                          </Badge>
                        </div>
                        <p className="text-sm mt-1">{notification.message}</p>
                        <p className="text-xs text-muted-foreground mt-2">{notification.date}</p>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {!notification.isRead && (
                          <DropdownMenuItem onClick={() => markAsRead(notification.id)}>
                            <Check className="h-4 w-4 mr-2" />
                            Đánh dấu đã đọc
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem asChild>
                          <Link href={notification.link}>
                            <span className="flex items-center w-full">
                              <span className="mr-2">→</span>
                              Xem chi tiết
                            </span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => deleteNotification(notification.id)}
                          className="text-red-600 focus:text-red-600"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Xóa thông báo
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                  <Bell className="h-8 w-8 text-muted-foreground" />
                </div>
                <h2 className="text-lg font-medium mb-2">Không có thông báo nào</h2>
                <p className="text-muted-foreground">
                  {activeTab === "all"
                    ? "Bạn chưa có thông báo nào"
                    : activeTab === "unread"
                      ? "Bạn đã đọc tất cả thông báo"
                      : `Bạn không có thông báo nào thuộc loại ${getNotificationTypeBadge(activeTab).text}`}
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
