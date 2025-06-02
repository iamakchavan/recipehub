"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChefHat, Plus, Search, Clock, Users, Heart, Eye, ArrowRight } from "lucide-react"
import Link from "next/link"

const foodCategories = [
  { name: "Italian", emoji: "🍝", count: 245 },
  { name: "Asian", emoji: "🍜", count: 189 },
  { name: "Desserts", emoji: "🍰", count: 156 },
  { name: "Healthy", emoji: "🥗", count: 203 },
  { name: "Quick", emoji: "⚡", count: 178 },
  { name: "Comfort", emoji: "🍲", count: 134 },
]

const topChefs = [
  { id: 1, name: "Gordon Ramsay", avatar: "/placeholder.svg", recipes: 45, followers: "2.1M" },
  { id: 2, name: "Julia Child", avatar: "/placeholder.svg", recipes: 32, followers: "1.8M" },
  { id: 3, name: "Jamie Oliver", avatar: "/placeholder.svg", recipes: 67, followers: "3.2M" },
  { id: 4, name: "Ina Garten", avatar: "/placeholder.svg", recipes: 28, followers: "1.5M" },
]

const trendingRecipes = [
  {
    id: 1,
    title: "Creamy Tuscan Chicken",
    chef: "Maria Romano",
    image: "/placeholder.svg?height=200&width=300",
    cuisine: "Italian",
    cookTime: "30 min",
    likes: 1263,
    difficulty: "Medium",
  },
  {
    id: 2,
    title: "Spicy Korean Ramen",
    chef: "Kim Soo-jin",
    image: "/placeholder.svg?height=200&width=300",
    cuisine: "Korean",
    cookTime: "15 min",
    likes: 987,
    difficulty: "Easy",
  },
  {
    id: 3,
    title: "Classic French Croissants",
    chef: "Pierre Dubois",
    image: "/placeholder.svg?height=200&width=300",
    cuisine: "French",
    cookTime: "3 hours",
    likes: 2156,
    difficulty: "Hard",
  },
  {
    id: 4,
    title: "Chocolate Lava Cake",
    chef: "Sarah Baker",
    image: "/placeholder.svg?height=200&width=300",
    cuisine: "Dessert",
    cookTime: "25 min",
    likes: 1845,
    difficulty: "Medium",
  },
]

const myRecipes = [
  {
    id: 1,
    title: "Grandma's Chocolate Chip Cookies",
    description: "The perfect chewy cookies with crispy edges",
    image: "/images/chocolate-chip-cookies.png",
    cookTime: "25 min",
    servings: 24,
    collaborators: 2,
    likes: 15,
    views: 89,
    isPublic: true,
    curator: "You",
  },
  {
    id: 2,
    title: "Spicy Thai Basil Chicken",
    description: "Authentic pad krapow with jasmine rice",
    image: "/placeholder.svg?height=200&width=300",
    cookTime: "15 min",
    servings: 4,
    collaborators: 1,
    likes: 32,
    views: 156,
    isPublic: true,
    curator: "You",
  },
]

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-orange-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                <ChefHat className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">RecipeHub</h1>
            </div>
            <div className="flex items-center space-x-3">
              <Avatar>
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium text-gray-700">John Doe</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Hello John! 👋</h2>
          <p className="text-gray-600 text-lg">What do you want to cook today?</p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Search recipes, ingredients, or chefs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-14 text-lg bg-white border-gray-200 rounded-2xl shadow-sm"
            />
          </div>
        </div>

        {/* Food Categories */}
        <div className="mb-10">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Browse by Category</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {foodCategories.map((category) => (
              <div
                key={category.name}
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white to-gray-50 border border-gray-100 hover:border-orange-200 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative p-6 text-center">
                  <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300 filter group-hover:drop-shadow-lg">
                    {category.emoji}
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-1 group-hover:text-orange-600 transition-colors duration-300">
                    {category.name}
                  </h4>
                  <div className="inline-flex items-center px-2 py-1 rounded-full bg-gray-100 group-hover:bg-orange-100 transition-colors duration-300">
                    <span className="text-xs font-medium text-gray-600 group-hover:text-orange-700">
                      {category.count} recipes
                    </span>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-400 to-pink-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </div>
            ))}
          </div>
        </div>

        {/* Top Chefs */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">Top Chefs</h3>
            <Button variant="ghost" className="text-orange-600 hover:text-orange-700">
              View all
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {topChefs.map((chef) => (
              <Card
                key={chef.id}
                className="border-0 bg-white shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
              >
                <CardContent className="p-6 text-center">
                  <Avatar className="w-16 h-16 mx-auto mb-3">
                    <AvatarImage src={chef.avatar || "/placeholder.svg"} />
                    <AvatarFallback>
                      {chef.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <h4 className="font-medium text-gray-900 mb-1">{chef.name}</h4>
                  <p className="text-sm text-gray-500 mb-1">{chef.recipes} recipes</p>
                  <p className="text-xs text-gray-400">{chef.followers} followers</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Trending Recipes */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">Trending Recipes</h3>
            <Button variant="ghost" className="text-orange-600 hover:text-orange-700">
              View all
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingRecipes.map((recipe) => (
              <div
                key={recipe.id}
                className="group relative overflow-hidden rounded-3xl bg-white border border-gray-100 hover:border-orange-200 shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer"
              >
                {/* Image Container */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={recipe.image || "/placeholder.svg"}
                    alt={recipe.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <div className="px-3 py-1 bg-white/95 backdrop-blur-sm rounded-full border border-white/20">
                      <span className="text-xs font-semibold text-gray-700">{recipe.cuisine}</span>
                    </div>
                    <div className="flex items-center space-x-1 px-2 py-1 bg-white/95 backdrop-blur-sm rounded-full border border-white/20">
                      <Heart className="w-3 h-3 text-red-500" />
                      <span className="text-xs font-semibold text-gray-700">{recipe.likes}</span>
                    </div>
                  </div>

                  {/* Bottom Content Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <div className="text-white">
                      <h4 className="font-bold text-lg mb-1 line-clamp-2 leading-tight">{recipe.title}</h4>
                      <p className="text-white/90 text-sm mb-3">by {recipe.chef}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4 text-white/80" />
                          <span className="text-sm text-white/90">{recipe.cookTime}</span>
                        </div>
                        <div className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
                          <span className="text-xs font-medium text-white">{recipe.difficulty}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Hover Action Button */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white/95 backdrop-blur-sm rounded-full p-3 shadow-lg transform scale-90 group-hover:scale-100 transition-transform duration-300">
                      <ArrowRight className="w-5 h-5 text-orange-500" />
                    </div>
                  </div>
                </div>

                {/* Subtle Bottom Accent */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </div>
            ))}
          </div>
        </div>

        {/* My Recipes Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">My Recipes</h3>
            <Link href="/recipe/new">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                <Plus className="w-4 h-4 mr-2" />
                New Recipe
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myRecipes.map((recipe) => (
              <Card
                key={recipe.id}
                className="group overflow-hidden border-0 bg-white shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={recipe.image || "/placeholder.svg"}
                    alt={recipe.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute top-3 right-3 flex gap-2">
                    {recipe.isPublic ? (
                      <Badge className="bg-green-500 text-white border-0 font-medium">Public</Badge>
                    ) : (
                      <Badge className="bg-gray-500 text-white border-0 font-medium">Private</Badge>
                    )}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/60 to-transparent">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center">
                          <Heart className="w-4 h-4 mr-1" />
                          {recipe.likes}
                        </div>
                        <div className="flex items-center">
                          <Eye className="w-4 h-4 mr-1" />
                          {recipe.views}
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {recipe.cookTime}
                      </div>
                    </div>
                  </div>
                </div>
                <CardContent className="p-5">
                  <h3 className="font-semibold text-lg text-gray-900 group-hover:text-orange-600 transition-colors line-clamp-1 mb-2">
                    {recipe.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{recipe.description}</p>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1 text-gray-500" />
                      <span className="text-sm text-gray-500">{recipe.servings} servings</span>
                    </div>
                    <span className="text-xs text-gray-500">by {recipe.curator}</span>
                  </div>
                  <div className="flex gap-2">
                    <Link href={`/recipe/${recipe.id}`} className="flex-1">
                      <Button variant="outline" className="w-full text-sm h-9 rounded-md">
                        View
                      </Button>
                    </Link>
                    <Link href={`/recipe/${recipe.id}/edit`} className="flex-1">
                      <Button className="w-full text-sm h-9 rounded-md bg-orange-500 hover:bg-orange-600">Edit</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
