"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PagesTab } from "./pages-tab"
import { BlogTab } from "./blog-tab"
import { BannersTab } from "./banners-tab"

export function ContentClient() {
  const [activeTab, setActiveTab] = useState("pages")

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Quản lí nội dung web</h1>
      </div>
      <Tabs defaultValue="pages" className="space-y-4" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="pages">Trang</TabsTrigger>
          <TabsTrigger value="blog">Bài viết</TabsTrigger>
          <TabsTrigger value="banners">Banner</TabsTrigger>
        </TabsList>
        <TabsContent value="pages" className="space-y-4">
          <PagesTab />
        </TabsContent>
        <TabsContent value="blog" className="space-y-4">
          <BlogTab />
        </TabsContent>
        <TabsContent value="banners" className="space-y-4">
          <BannersTab />
        </TabsContent>
      </Tabs>
    </div>
  )
}
