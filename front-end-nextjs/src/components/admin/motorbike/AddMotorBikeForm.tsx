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

  // Handle basic info changes
  const handleBasicInfoChange = (e) => {
    const { name, value } = e.target;
    setBasicInfo({
      ...basicInfo,
      [name]: value,
    });
  };

  // Handle select changes for category and brand
  const handleSelectChange = (name, value) => {
    setBasicInfo({
      ...basicInfo,
      [name]: value,
    });
  };

  // Handle basic specification changes
  const handleBasicSpecChange = (e) => {
    const { name, value } = e.target;
    setBasicSpec({
      ...basicSpec,
      [name]: value,
    });
  };

  // Handle engine and frame changes
  const handleEngineFrameChange = (e) => {
    const { name, value } = e.target;
    setEngineFrame({
      ...engineFrame,
      [name]: value,
    });
  };

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

      <Form {...form} className="space-y-6"></Form>

      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="basic">Basic Information</TabsTrigger>
          <TabsTrigger value="specifications">Specifications</TabsTrigger>
          <TabsTrigger value="engine">Engine & Frame</TabsTrigger>
          <TabsTrigger value="variants">Variants & Images</TabsTrigger>
        </TabsList>

        {/* Basic Information Tab */}
        <TabsContent value="basic" className="space-y-4 pt-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="bikeName">Motorcycle Name</Label>
              <Input
                id="bikeName"
                name="bikeName"
                value={basicInfo.bikeName}
                onChange={handleBasicInfoChange}
                placeholder="Enter motorcycle name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="videoUrl">Video URL</Label>
              <Input
                id="videoUrl"
                name="videoUrl"
                value={basicInfo.videoUrl}
                onChange={handleBasicInfoChange}
                placeholder="Enter video URL"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="categoryId">Category</Label>
              <Select
                value={basicInfo.categoryId}
                onValueChange={(value) =>
                  handleSelectChange("categoryId", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem
                      key={category.id}
                      value={category.id.toString()}
                    >
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="brandId">Brand</Label>
              <Select
                value={basicInfo.brandId}
                onValueChange={(value) => handleSelectChange("brandId", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select brand" />
                </SelectTrigger>
                <SelectContent>
                  {brands.map((brand) => (
                    <SelectItem key={brand.id} value={brand.id.toString()}>
                      {brand.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={basicInfo.description}
              onChange={handleBasicInfoChange}
              placeholder="Enter motorcycle description"
              rows={5}
              required
            />
          </div>
        </TabsContent>

        {/* Specifications Tab */}
        <TabsContent value="specifications" className="space-y-4 pt-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input
                id="weight"
                name="weight"
                type="number"
                step="0.1"
                value={basicSpec.weight}
                onChange={handleBasicSpecChange}
                placeholder="Enter weight"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="length">Length (mm)</Label>
              <Input
                id="length"
                name="length"
                type="number"
                step="0.1"
                value={basicSpec.length}
                onChange={handleBasicSpecChange}
                placeholder="Enter length"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="width">Width (mm)</Label>
              <Input
                id="width"
                name="width"
                type="number"
                step="0.1"
                value={basicSpec.width}
                onChange={handleBasicSpecChange}
                placeholder="Enter width"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="height">Height (mm)</Label>
              <Input
                id="height"
                name="height"
                type="number"
                step="0.1"
                value={basicSpec.height}
                onChange={handleBasicSpecChange}
                placeholder="Enter height"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="wheelbase">Wheelbase (mm)</Label>
              <Input
                id="wheelbase"
                name="wheelbase"
                type="number"
                step="0.1"
                value={basicSpec.wheelbase}
                onChange={handleBasicSpecChange}
                placeholder="Enter wheelbase"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="seatHeight">Seat Height (mm)</Label>
              <Input
                id="seatHeight"
                name="seatHeight"
                type="number"
                step="0.1"
                value={basicSpec.seatHeight}
                onChange={handleBasicSpecChange}
                placeholder="Enter seat height"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="groundClearance">Ground Clearance (mm)</Label>
              <Input
                id="groundClearance"
                name="groundClearance"
                type="number"
                step="0.1"
                value={basicSpec.groundClearance}
                onChange={handleBasicSpecChange}
                placeholder="Enter ground clearance"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="fuelTankCapacity">Fuel Tank Capacity (L)</Label>
              <Input
                id="fuelTankCapacity"
                name="fuelTankCapacity"
                type="number"
                step="0.1"
                value={basicSpec.fuelTankCapacity}
                onChange={handleBasicSpecChange}
                placeholder="Enter fuel tank capacity"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="frontTireSize">Front Tire Size (inches)</Label>
              <Input
                id="frontTireSize"
                name="frontTireSize"
                type="number"
                step="0.1"
                value={basicSpec.frontTireSize}
                onChange={handleBasicSpecChange}
                placeholder="Enter front tire size"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="rearTireSize">Rear Tire Size (inches)</Label>
              <Input
                id="rearTireSize"
                name="rearTireSize"
                type="number"
                step="0.1"
                value={basicSpec.rearTireSize}
                onChange={handleBasicSpecChange}
                placeholder="Enter rear tire size"
              />
            </div>
          </div>
        </TabsContent>

        {/* Engine & Frame Tab */}
        <TabsContent value="engine" className="space-y-4 pt-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="frontSuspension">Front Suspension</Label>
              <Input
                id="frontSuspension"
                name="frontSuspension"
                value={engineFrame.frontSuspension}
                onChange={handleEngineFrameChange}
                placeholder="Enter front suspension type"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="rearSuspension">Rear Suspension</Label>
              <Input
                id="rearSuspension"
                name="rearSuspension"
                value={engineFrame.rearSuspension}
                onChange={handleEngineFrameChange}
                placeholder="Enter rear suspension type"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="engineType">Engine Type</Label>
              <Input
                id="engineType"
                name="engineType"
                value={engineFrame.engineType}
                onChange={handleEngineFrameChange}
                placeholder="Enter engine type"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="maximumPower">Maximum Power (HP)</Label>
              <Input
                id="maximumPower"
                name="maximumPower"
                type="number"
                step="0.1"
                value={engineFrame.maximumPower}
                onChange={handleEngineFrameChange}
                placeholder="Enter maximum power"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="displacement">Displacement (cc)</Label>
              <Input
                id="displacement"
                name="displacement"
                type="number"
                step="0.1"
                value={engineFrame.displacement}
                onChange={handleEngineFrameChange}
                placeholder="Enter displacement"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bore">Bore (mm)</Label>
              <Input
                id="bore"
                name="bore"
                type="number"
                step="0.1"
                value={engineFrame.bore}
                onChange={handleEngineFrameChange}
                placeholder="Enter bore"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="stroke">Stroke (mm)</Label>
              <Input
                id="stroke"
                name="stroke"
                type="number"
                step="0.1"
                value={engineFrame.stroke}
                onChange={handleEngineFrameChange}
                placeholder="Enter stroke"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="compressionRatio">Compression Ratio</Label>
              <Input
                id="compressionRatio"
                name="compressionRatio"
                type="number"
                step="0.1"
                value={engineFrame.compressionRatio}
                onChange={handleEngineFrameChange}
                placeholder="Enter compression ratio"
              />
            </div>
          </div>
        </TabsContent>

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
