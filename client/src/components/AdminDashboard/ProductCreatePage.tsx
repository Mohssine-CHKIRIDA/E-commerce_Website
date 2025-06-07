import React, { useEffect, useState } from "react";
import { X, Plus, Save, Image, Star } from "lucide-react";
import { ProductEdit, Color, Size, ProductInput } from "../types";
import { useCategories } from "../../hooks/hookCategory";
import { useCreateProduct } from "../../hooks/hookProducts";

interface ProductCreationFormProps {
  productEdit?: ProductEdit | null;
}

export const ProductCreationForm: React.FC<ProductCreationFormProps> = ({
  productEdit,
}) => {
  const [product, setProduct] = useState<Partial<ProductEdit>>({
    name: "",
    category: { id: 0, name: "", imageUrl: "" },
    subcategory: { id: 0, name: "" },
    imageUrl: "",
    price: 0,
    inStock: 0,
    brand: { id: 0, name: "" },
    rating: 0,
    numReviews: 0,
    description: "",
    sizes: [],
    colors: [],
  });

  // Use useEffect to handle productEdit changes
  useEffect(() => {
    if (productEdit) {
      setProduct(productEdit);
    } else {
      setProduct({
        name: "",
        category: { id: 0, name: "", imageUrl: "" },
        subcategory: { id: 0, name: "" },
        imageUrl: "",
        price: 0,
        inStock: 0,
        brand: { id: 0, name: "" },
        rating: 0,
        numReviews: 0,
        description: "",
        sizes: [],
        colors: [],
      });
    }
  }, [productEdit]);

  const [sizeInput, setSizeInput] = useState("");
  const [colorInput, setColorInput] = useState({ name: "", hex: "#000000" });
  const [nextColorId, setNextColorId] = useState(1);
  const { categories } = useCategories();

  const handleInputChange = (field: keyof ProductEdit, value: unknown) => {
    setProduct((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const addSize = () => {
    const trimmed = sizeInput.trim();
    if (
      trimmed &&
      !product.sizes?.some(
        (s) => String(s.value).toLowerCase() === trimmed.toLowerCase()
      )
    ) {
      const newSize: Size = {
        id: Date.now(), // ou générer un UUID si besoin
        value: isNaN(Number(trimmed)) ? trimmed : Number(trimmed),
      };
      setProduct((prev) => ({
        ...prev,
        sizes: [...(prev.sizes || []), newSize],
      }));
      setSizeInput("");
    }
  };

  const removeSize = (sizeId: number) => {
    setProduct((prev) => ({
      ...prev,
      sizes: prev.sizes?.filter((size) => size.id !== sizeId),
    }));
  };

  const addColor = () => {
    if (colorInput.name.trim()) {
      const newColor: Color = {
        id: nextColorId,
        name: colorInput.name.trim(),
        hex: colorInput.hex,
      };
      setProduct((prev) => ({
        ...prev,
        colors: [...(prev.colors || []), newColor],
      }));
      setColorInput({ name: "", hex: "#000000" });
      setNextColorId((prev) => prev + 1);
    }
  };
  const handleBrandChange = (name: string) => {
    setProduct((prev) => ({
      ...prev,
      brand: { id: prev.brand?.id || 0, name },
    }));
  };

  const removeColor = (colorId: number) => {
    setProduct((prev) => ({
      ...prev,
      colors: prev.colors?.filter((color) => color.id !== colorId),
    }));
  };
  const { submit, loading } = useCreateProduct();

  const convertToProductInput = (
    product: Partial<ProductEdit>
  ): ProductInput => {
    if (
      !product.name ||
      !product.description ||
      !product.price ||
      !product.imageUrl ||
      !product.rating ||
      !product.inStock ||
      !product.category?.id ||
      !product.subcategory?.id ||
      !product.brand?.name
    ) {
      throw new Error("Le produit est incomplet");
    }
    const sizesValues = product.sizes?.map((size) => size.value) || [];

    return {
      name: product.name,
      description: product.description,
      price: product.price,
      imageUrl: product.imageUrl,
      rating: product.rating,
      inStock: product.inStock,
      categoryId: product.category.id,
      subcategoryId: product.subcategory.id,
      brandName: product.brand.name,
      colors: (product.colors || []).map((c) => ({ name: c.name, hex: c.hex })),
      sizes: sizesValues || [],
    };
  };

  const handleSave = async () => {
    try {
      const productInput = convertToProductInput(product);
      const createdProduct = await submit(productInput);
      console.log("Produit créé:", createdProduct);
      // Ici tu peux reset le formulaire ou rediriger
    } catch (err) {
      console.error(err);
      // Erreur gérée par le hook dans error
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">
                Add product
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Create a new product for your store
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setProduct({
                    name: "",
                    category: { id: 0, name: "", imageUrl: "" },
                    subcategory: {
                      id: 0,
                      name: "",
                    },
                    imageUrl: "",
                    price: 0,
                    inStock: 0,
                    brand: { id: 0, name: "" },
                    rating: 0,
                    numReviews: 0,
                    description: "",
                    sizes: [],
                    colors: [],
                  });
                }}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Discard
              </button>
              <button
                onClick={handleSave}
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <Save size={16} />
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-6">
                Product information
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    value={product.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Enter product name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Brand *
                    </label>
                    <input
                      type="text"
                      value={product.brand?.name}
                      onChange={(e) => handleBrandChange(e.target.value)}
                      placeholder="Enter brand name"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price *
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                        $
                      </span>
                      <input
                        type="number"
                        value={product.price}
                        onChange={(e) =>
                          handleInputChange("price", Number(e.target.value))
                        }
                        placeholder="0.00"
                        step="0.01"
                        className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={product.description}
                    onChange={(e) =>
                      handleInputChange("description", e.target.value)
                    }
                    placeholder="Describe your product"
                    rows={6}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Media */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-6">
                Product Image
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Image URL
                  </label>
                  <input
                    type="url"
                    value={product.imageUrl}
                    onChange={(e) =>
                      handleInputChange("imageUrl", e.target.value)
                    }
                    placeholder="https://example.com/image.jpg"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                </div>

                <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
                  <div className="flex flex-col items-center">
                    {product.imageUrl ? (
                      <img
                        src={product.imageUrl}
                        alt="Product preview"
                        className="w-32 h-32 object-cover rounded-lg mb-4"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    ) : (
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                        <Image className="w-6 h-6 text-gray-400" />
                      </div>
                    )}
                    <p className="text-sm font-medium text-gray-900 mb-1">
                      Add product image
                    </p>
                    <p className="text-sm text-gray-500 mb-4">
                      Upload an image or provide a URL above
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Inventory */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-6">
                Inventory & Stock
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Stock Quantity *
                  </label>
                  <input
                    type="number"
                    value={product.inStock}
                    onChange={(e) =>
                      handleInputChange("inStock", Number(e.target.value))
                    }
                    placeholder="0"
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Number of items available in stock
                  </p>
                </div>
              </div>
            </div>

            {/* Product Variants */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-6">
                Product Variants
              </h2>

              <div className="space-y-6">
                {/* Sizes */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Available Sizes
                  </label>
                  <div className="flex gap-2 mb-3">
                    <input
                      type="text"
                      value={sizeInput}
                      onChange={(e) => setSizeInput(e.target.value)}
                      onKeyPress={(e) =>
                        e.key === "Enter" && (e.preventDefault(), addSize())
                      }
                      placeholder="Add size (e.g., S, M, L, 42, 10.5)"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    />
                    <button
                      onClick={addSize}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  {product.sizes && product.sizes.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {product.sizes.map((size, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm"
                        >
                          {size.value}
                          <button
                            onClick={() => removeSize(size.id)}
                            className="hover:text-gray-600"
                          >
                            <X size={12} />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Colors */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Available Colors
                  </label>
                  <div className="flex gap-2 mb-3">
                    <input
                      type="text"
                      value={colorInput.name}
                      onChange={(e) =>
                        setColorInput((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                      placeholder="Color name"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    />
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={colorInput.hex}
                        onChange={(e) =>
                          setColorInput((prev) => ({
                            ...prev,
                            hex: e.target.value,
                          }))
                        }
                        className="w-10 h-10 border border-gray-300 rounded cursor-pointer"
                      />
                      <button
                        onClick={addColor}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                  {product.colors && product.colors.length > 0 && (
                    <div className="space-y-2">
                      {product.colors.map((color) => (
                        <div
                          key={color.id}
                          className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg"
                        >
                          <div
                            className="w-6 h-6 rounded-full border border-gray-300"
                            style={{ backgroundColor: color.hex }}
                          ></div>
                          <span className="flex-1 text-sm font-medium text-gray-900">
                            {color.name}
                          </span>
                          <span className="text-xs text-gray-500 font-mono">
                            {color.hex}
                          </span>
                          <button
                            onClick={() => removeColor(color.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Reviews & Rating */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-6">
                Reviews & Rating
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Initial Rating
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={product.rating}
                      onChange={(e) =>
                        handleInputChange("rating", Number(e.target.value))
                      }
                      placeholder="0.0"
                      min="0"
                      max="5"
                      step="0.1"
                      className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    />
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={16}
                          className={`${
                            star <= (product.rating || 0)
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Reviews
                  </label>
                  <input
                    type="number"
                    value={product.numReviews}
                    onChange={(e) =>
                      handleInputChange("numReviews", Number(e.target.value))
                    }
                    placeholder="0"
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Product Organization */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Product organization
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    value={product.category?.id || ""}
                    onChange={(e) => {
                      const selectedCatId = Number(e.target.value);
                      const selectedCategory = categories.find(
                        (cat) => cat.id === selectedCatId
                      ) || { id: 0, name: "", imageUrl: "" };
                      handleInputChange("category", selectedCategory);
                      handleInputChange("subcategory", { id: 0, name: "" }); // Reset subcategory when category changes
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  >
                    <option value="">Select category</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subcategory *
                  </label>
                  <select
                    value={product.subcategory?.id || ""}
                    onChange={(e) => {
                      const selectedId = Number(e.target.value);
                      // Trouver la sous-catégorie sélectionnée dans la catégorie courante
                      const selectedSubcat =
                        product.category?.subcategories?.find(
                          (subcat) => subcat.id === selectedId
                        );
                      handleInputChange("subcategory", selectedSubcat);
                    }}
                    disabled={!product.category}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors disabled:bg-gray-100"
                  >
                    <option value="">Select subcategory</option>
                    {product.category?.subcategories?.map((subcat) => (
                      <option key={subcat.id} value={subcat.id}>
                        {subcat.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Product Preview */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Preview
              </h3>

              <div className="border border-gray-200 rounded-lg p-4">
                <div className="w-full h-32 bg-gray-100 rounded-lg mb-3 flex items-center justify-center overflow-hidden">
                  {product.imageUrl ? (
                    <img
                      src={product.imageUrl}
                      alt="Product preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  ) : (
                    <Image className="w-8 h-8 text-gray-400" />
                  )}
                </div>
                <h4 className="font-medium text-gray-900 text-sm mb-1">
                  {product.name || "Product title"}
                </h4>
                <p className="text-xs text-gray-500 mb-2">
                  {product.brand?.name || "Brand"} •{" "}
                  {product.category?.name || "Category"}
                </p>
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={12}
                        className={`${
                          star <= (product.rating || 0)
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-500">
                    ({product.numReviews || 0})
                  </span>
                </div>
                <p className="text-sm font-semibold text-gray-900">
                  ${product.price || "0.00"}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Stock: {product.inStock || 0} items
                </p>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Quick Stats
              </h3>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Colors</span>
                  <span className="text-sm font-medium">
                    {product.colors?.length || 0}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Sizes</span>
                  <span className="text-sm font-medium">
                    {product.sizes?.length || 0}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Stock Value</span>
                  <span className="text-sm font-medium">
                    $
                    {((product.price || 0) * (product.inStock || 0)).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
