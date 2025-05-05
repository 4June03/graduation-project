"use client"

import { useState } from "react"
import { PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ContentActionDropdown } from "./content-action-dropdown"
import { AddBlogPostModal } from "./add-blog-post-modal"
import { EditBlogPostModal } from "./edit-blog-post-modal"

export interface BlogPost {
  id: number
  title: string
  category: string
  author: string
  date: string
  status: "published" | "draft"
}

// Mock data for blog posts
const initialBlogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Top 5 xe máy phổ thông tốt nhất 2023",
    category: "Đánh giá",
    author: "Nguyễn Văn A",
    date: "10/03/2023",
    status: "published",
  },
  {
    id: 2,
    title: "Cách chọn xe máy phù hợp cho sinh viên",
    category: "Hướng dẫn",
    author: "Trần Thị B",
    date: "15/04/2023",
    status: "published",
  },
  {
    id: 3,
    title: "So sánh Honda Wave và Yamaha Sirius",
    category: "So sánh",
    author: "Lê Văn C",
    date: "20/05/2023",
    status: "published",
  },
  {
    id: 4,
    title: "Bảo dưỡng xe máy đúng cách trong mùa mưa",
    category: "Hướng dẫn",
    author: "Phạm Thị D",
    date: "25/06/2023",
    status: "published",
  },
  {
    id: 5,
    title: "Xu hướng xe máy điện trong tương lai",
    category: "Tin tức",
    author: "Hoàng Văn E",
    date: "30/07/2023",
    status: "draft",
  },
]

export const getStatusColor = (status: string) => {
  switch (status) {
    case "published":
      return "bg-green-100 text-green-800"
    case "draft":
      return "bg-yellow-100 text-yellow-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export const getStatusText = (status: string) => {
  switch (status) {
    case "published":
      return "Đã xuất bản"
    case "draft":
      return "Bản nháp"
    default:
      return status
  }
}

export function BlogTab() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(initialBlogPosts)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [addModalOpen, setAddModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)

  const categories = ["all", ...Array.from(new Set(blogPosts.map((post) => post.category)))]

  const filteredBlogPosts = blogPosts.filter(
    (post) =>
      (searchTerm === "" || post.title.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (categoryFilter === "all" || post.category === categoryFilter),
  )

  const handleAddPost = (newPost: Omit<BlogPost, "id">) => {
    const id = blogPosts.length > 0 ? Math.max(...blogPosts.map((post) => post.id)) + 1 : 1
    setBlogPosts([...blogPosts, { ...newPost, id }])
    setAddModalOpen(false)
  }

  const handleEditPost = (updatedPost: BlogPost) => {
    setBlogPosts(blogPosts.map((post) => (post.id === updatedPost.id ? updatedPost : post)))
    setEditModalOpen(false)
    setSelectedPost(null)
  }

  const handleDeletePost = (id: number) => {
    setBlogPosts(blogPosts.filter((post) => post.id !== id))
  }

  const openEditModal = (post: BlogPost) => {
    setSelectedPost(post)
    setEditModalOpen(true)
  }

  const handleViewPost = (post: BlogPost) => {
    // In a real application, this would navigate to the post
    console.log("View post:", post)
  }

  return (
    <>
      <div className="flex justify-between">
        <div className="flex gap-4">
          <div className="w-[300px]">
            <Input
              placeholder="Tìm kiếm bài viết..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="w-[200px]">
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Chọn danh mục" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category === "all" ? "Tất cả danh mục" : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button onClick={() => setAddModalOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Thêm bài viết
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Danh sách bài viết</CardTitle>
          <CardDescription>Quản lý các bài viết trên blog</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Tiêu đề</TableHead>
                <TableHead>Danh mục</TableHead>
                <TableHead>Tác giả</TableHead>
                <TableHead>Ngày đăng</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBlogPosts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell className="font-medium">{post.id}</TableCell>
                  <TableCell>{post.title}</TableCell>
                  <TableCell>{post.category}</TableCell>
                  <TableCell>{post.author}</TableCell>
                  <TableCell>{post.date}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(post.status)}`}>
                      {getStatusText(post.status)}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <ContentActionDropdown
                      item={post}
                      type="blog"
                      onView={() => handleViewPost(post)}
                      onEdit={() => openEditModal(post)}
                      onDelete={() => handleDeletePost(post.id)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Modals */}
      <AddBlogPostModal
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onAdd={handleAddPost}
        categories={categories.filter((cat) => cat !== "all")}
      />

      {selectedPost && (
        <EditBlogPostModal
          isOpen={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          post={selectedPost}
          onEdit={handleEditPost}
          categories={categories.filter((cat) => cat !== "all")}
        />
      )}
    </>
  )
}
