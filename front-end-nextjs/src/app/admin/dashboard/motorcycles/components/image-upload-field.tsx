"use client"

import type React from "react"

import { useState, useRef } from "react"
import { X, Upload, ImageIcon, FileUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface ImageUploadFieldProps {
  value: { imageUrl: string }[]
  onChange: (value: { imageUrl: string }[]) => void
  onBlur: () => void
  disabled?: boolean
}

export function ImageUploadField({ value, onChange, onBlur, disabled }: ImageUploadFieldProps) {
  const [newImageUrl, setNewImageUrl] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const addImage = () => {
    if (newImageUrl && newImageUrl.trim() !== "") {
      onChange([...value, { imageUrl: newImageUrl }])
      setNewImageUrl("")
    }
  }

  const removeImage = (index: number) => {
    const newImages = [...value]
    newImages.splice(index, 1)
    onChange(newImages)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    const file = files[0]
    if (!file.type.startsWith("image/")) {
      alert("Vui lòng chọn file hình ảnh")
      return
    }

    // Giới hạn kích thước file (5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("Kích thước file quá lớn. Vui lòng chọn file nhỏ hơn 5MB")
      return
    }

    // Chuyển đổi file thành URL dạng base64
    const reader = new FileReader()
    reader.onload = (event) => {
      if (event.target?.result) {
        onChange([...value, { imageUrl: event.target.result.toString() }])
      }
    }
    reader.readAsDataURL(file)

    // Reset input để có thể chọn lại cùng một file
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4">
        {value.map((image, index) => (
          <div key={index} className="relative group">
            <div className="border rounded-md overflow-hidden w-32 h-32 flex items-center justify-center bg-muted">
              {image.imageUrl ? (
                <img
                  src={image.imageUrl || "/placeholder.svg"}
                  alt={`Image ${index + 1}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder.svg?height=128&width=128"
                  }}
                />
              ) : (
                <ImageIcon className="h-10 w-10 text-muted-foreground" />
              )}
            </div>
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute -top-2 -right-2 h-6 w-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => removeImage(index)}
              disabled={disabled}
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <Input
            type="url"
            placeholder="Nhập URL ảnh"
            value={newImageUrl}
            onChange={(e) => setNewImageUrl(e.target.value)}
            onBlur={onBlur}
            disabled={disabled}
          />
          <Button type="button" onClick={addImage} disabled={disabled || !newImageUrl}>
            <Upload className="h-4 w-4 mr-2" />
            Thêm
          </Button>
        </div>

        <div className="flex items-center gap-2 mt-2">
          <div className="text-sm text-muted-foreground">hoặc</div>
          <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()} disabled={disabled}>
            <FileUp className="h-4 w-4 mr-2" />
            Tải ảnh từ máy tính
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
            disabled={disabled}
          />
        </div>
      </div>
    </div>
  )
}
