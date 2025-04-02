"use client";

import { useState } from "react";
import { Trash2, Plus, Upload, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Form, useForm } from "react-hook-form";

// Sample data for dropdowns
const categories = [
  { id: 1, name: "Sport Bikes" },
  { id: 2, name: "Cruisers" },
  { id: 3, name: "Scooters" },
  { id: 4, name: "Off-Road" },
  { id: 5, name: "Touring" },
];

const brands = [
  { id: 1, name: "Honda" },
  { id: 2, name: "Yamaha" },
  { id: 3, name: "Suzuki" },
  { id: 4, name: "Kawasaki" },
  { id: 5, name: "Ducati" },
];

const colors = [
  { id: 1, name: "Red" },
  { id: 2, name: "Black" },
  { id: 3, name: "Blue" },
  { id: 4, name: "White" },
  { id: 5, name: "Silver" },
];

export function AddProductForm() {
  // Basic information state
  const [basicInfo, setBasicInfo] = useState({
    bikeName: "",
    description: "",
    videoUrl: "",
    categoryId: "",
    brandId: "",
  });

  // Basic specifications state
  const [basicSpec, setBasicSpec] = useState({
    weight: "",
    length: "",
    width: "",
    height: "",
    wheelbase: "",
    seatHeight: "",
    groundClearance: "",
    fuelTankCapacity: "",
    frontTireSize: "",
    rearTireSize: "",
  });

  // Engine and frame state
  const [engineFrame, setEngineFrame] = useState({
    frontSuspension: "",
    rearSuspension: "",
    engineType: "",
    maximumPower: "",
    displacement: "",
    bore: "",
    stroke: "",
    compressionRatio: "",
  });

  // Variants state
  const [variants, setVariants] = useState([
    {
      variantName: "",
      variantPrice: "",
      variantStock: "",
      variantColors: [
        {
          colorId: "",
          images: [{ imageUrl: "" }, { imageUrl: "" }, { imageUrl: "" }],
        },
      ],
    },
  ]);

  // Handle variant changes
  const handleVariantChange = (index, field, value) => {
    const updatedVariants = [...variants];
    updatedVariants[index][field] = value;
    setVariants(updatedVariants);
  };

  // Handle color changes in variants
  const handleColorChange = (variantIndex, colorIndex, value) => {
    const updatedVariants = [...variants];
    updatedVariants[variantIndex].variantColors[colorIndex].colorId = value;
    setVariants(updatedVariants);
  };

  // Handle image URL changes
  const handleImageUrlChange = (
    variantIndex,
    colorIndex,
    imageIndex,
    value
  ) => {
    const updatedVariants = [...variants];
    updatedVariants[variantIndex].variantColors[colorIndex].images[
      imageIndex
    ].imageUrl = value;
    setVariants(updatedVariants);
  };

  // Add a new variant
  const addVariant = () => {
    setVariants([
      ...variants,
      {
        variantName: "",
        variantPrice: "",
        variantStock: "",
        variantColors: [
          {
            colorId: "",
            images: [{ imageUrl: "" }, { imageUrl: "" }, { imageUrl: "" }],
          },
        ],
      },
    ]);
  };

  // Remove a variant
  const removeVariant = (index) => {
    const updatedVariants = [...variants];
    updatedVariants.splice(index, 1);
    setVariants(updatedVariants);
  };

  // Add a new color to a variant
  const addColor = (variantIndex) => {
    const updatedVariants = [...variants];
    updatedVariants[variantIndex].variantColors.push({
      colorId: "",
      images: [{ imageUrl: "" }, { imageUrl: "" }, { imageUrl: "" }],
    });
    setVariants(updatedVariants);
  };

  // Remove a color from a variant
  const removeColor = (variantIndex, colorIndex) => {
    const updatedVariants = [...variants];
    updatedVariants[variantIndex].variantColors.splice(colorIndex, 1);
    setVariants(updatedVariants);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Construct the complete product object
    const productData = {
      ...basicInfo,
      basicSpecification: basicSpec,
      engineAndFrame: engineFrame,
      variants: variants.map((variant) => ({
        ...variant,
        variantPrice: Number.parseFloat(variant.variantPrice),
        variantStock: Number.parseInt(variant.variantStock),
      })),
    };

    console.log("Product data to submit:", productData);
    // Here you would typically send this data to your API
    // For example: await fetch('/api/products', { method: 'POST', body: JSON.stringify(productData) })

    alert("Product added successfully!");
  };

  const form = useForm({});

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Add New Motorcycle</h1>
        <div className="flex gap-2">
          <Button variant="outline" type="button">
            Cancel
          </Button>
          <Button type="submit">Save Product</Button>
        </div>
      </div>

      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="basic">Basic Information</TabsTrigger>
          <TabsTrigger value="specifications">Specifications</TabsTrigger>
          <TabsTrigger value="engine">Engine & Frame</TabsTrigger>
          <TabsTrigger value="variants">Variants & Images</TabsTrigger>
        </TabsList>

        {/* Variants & Images Tab */}
        <TabsContent value="variants" className="space-y-6 pt-4">
          {variants.map((variant, variantIndex) => (
            <Card key={variantIndex} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">
                    Variant {variantIndex + 1}
                  </h3>
                  {variants.length > 1 && (
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => removeVariant(variantIndex)}
                    >
                      <Trash2 className="h-4 w-4 mr-1" /> Remove Variant
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-3 mb-6">
                  <div className="space-y-2">
                    <Label htmlFor={`variantName-${variantIndex}`}>
                      Variant Name
                    </Label>
                    <Input
                      id={`variantName-${variantIndex}`}
                      value={variant.variantName}
                      onChange={(e) =>
                        handleVariantChange(
                          variantIndex,
                          "variantName",
                          e.target.value
                        )
                      }
                      placeholder="e.g. Standard, Deluxe, Sport"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`variantPrice-${variantIndex}`}>
                      Price
                    </Label>
                    <Input
                      id={`variantPrice-${variantIndex}`}
                      type="number"
                      step="0.01"
                      value={variant.variantPrice}
                      onChange={(e) =>
                        handleVariantChange(
                          variantIndex,
                          "variantPrice",
                          e.target.value
                        )
                      }
                      placeholder="Enter price"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`variantStock-${variantIndex}`}>
                      Stock
                    </Label>
                    <Input
                      id={`variantStock-${variantIndex}`}
                      type="number"
                      value={variant.variantStock}
                      onChange={(e) =>
                        handleVariantChange(
                          variantIndex,
                          "variantStock",
                          e.target.value
                        )
                      }
                      placeholder="Enter stock quantity"
                      required
                    />
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Colors & Images</h4>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => addColor(variantIndex)}
                    >
                      <Plus className="h-4 w-4 mr-1" /> Add Color
                    </Button>
                  </div>

                  {variant.variantColors.map((colorItem, colorIndex) => (
                    <div key={colorIndex} className="p-4 border rounded-md">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-primary/20"></div>
                          <h5 className="font-medium">
                            Color {colorIndex + 1}
                          </h5>
                        </div>
                        {variant.variantColors.length > 1 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              removeColor(variantIndex, colorIndex)
                            }
                          >
                            <X className="h-4 w-4 mr-1" /> Remove
                          </Button>
                        )}
                      </div>

                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label
                            htmlFor={`colorId-${variantIndex}-${colorIndex}`}
                          >
                            Color
                          </Label>
                          <Select
                            value={colorItem.colorId.toString()}
                            onValueChange={(value) =>
                              handleColorChange(variantIndex, colorIndex, value)
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select color" />
                            </SelectTrigger>
                            <SelectContent>
                              {colors.map((color) => (
                                <SelectItem
                                  key={color.id}
                                  value={color.id.toString()}
                                >
                                  {color.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label>Images (up to 3)</Label>
                          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                            {colorItem.images.map((image, imageIndex) => (
                              <div key={imageIndex} className="space-y-2">
                                <div className="relative border rounded-md p-1 h-[150px] flex items-center justify-center bg-muted/50">
                                  {image.imageUrl ? (
                                    <img
                                      src={image.imageUrl || "/placeholder.svg"}
                                      alt={`Preview ${imageIndex + 1}`}
                                      className="max-h-full max-w-full object-contain"
                                    />
                                  ) : (
                                    <div className="flex flex-col items-center text-muted-foreground">
                                      <Upload className="h-8 w-8 mb-2" />
                                      <span className="text-xs">
                                        Image {imageIndex + 1}
                                      </span>
                                    </div>
                                  )}
                                </div>
                                <Input
                                  placeholder={`Image URL ${imageIndex + 1}`}
                                  value={image.imageUrl}
                                  onChange={(e) =>
                                    handleImageUrlChange(
                                      variantIndex,
                                      colorIndex,
                                      imageIndex,
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}

          <Button
            type="button"
            variant="outline"
            onClick={addVariant}
            className="w-full"
          >
            <Plus className="h-4 w-4 mr-2" /> Add Another Variant
          </Button>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end gap-2 pt-4">
        <Button variant="outline" type="button">
          Cancel
        </Button>
        <Button type="submit">Save Product</Button>
      </div>
    </form>
  );
}
