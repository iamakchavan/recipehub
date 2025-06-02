"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  ChefHat,
  Clock,
  Users,
  Heart,
  Eye,
  ArrowLeft,
  Play,
  Pause,
  RotateCcw,
  Plus,
  Minus,
  Share,
  Edit,
} from "lucide-react"
import Link from "next/link"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Copy, Facebook, Twitter, Mail, Link2, Check } from "lucide-react"

// Mock recipe data
const recipe = {
  id: 1,
  title: "Grandma's Chocolate Chip Cookies",
  description:
    "The perfect chewy cookies with crispy edges that will remind you of childhood. These cookies have the ideal balance of sweetness and texture.",
  image: "/placeholder.svg?height=400&width=600",
  cookTime: "25 min",
  prepTime: "15 min",
  totalTime: "40 min",
  originalServings: 24,
  servings: 24,
  likes: 15,
  views: 89,
  isPublic: true,
  curator: "Sarah Johnson",
  collaborators: ["john@example.com", "mary@example.com"],
  createdAt: "2 days ago",
  ingredients: [
    { id: 1, name: "All-purpose flour", amount: 2.25, unit: "cups" },
    { id: 2, name: "Baking soda", amount: 1, unit: "tsp" },
    { id: 3, name: "Salt", amount: 1, unit: "tsp" },
    { id: 4, name: "Butter, softened", amount: 1, unit: "cup" },
    { id: 5, name: "Granulated sugar", amount: 0.75, unit: "cup" },
    { id: 6, name: "Brown sugar, packed", amount: 0.75, unit: "cup" },
    { id: 7, name: "Large eggs", amount: 2, unit: "pieces" },
    { id: 8, name: "Vanilla extract", amount: 2, unit: "tsp" },
    { id: 9, name: "Chocolate chips", amount: 2, unit: "cups" },
  ],
  steps: [
    {
      id: 1,
      instruction: "Preheat your oven to 375°F (190°C). Line baking sheets with parchment paper.",
      timer: 0,
    },
    {
      id: 2,
      instruction: "In a medium bowl, whisk together flour, baking soda, and salt. Set aside.",
      timer: 2,
    },
    {
      id: 3,
      instruction:
        "In a large bowl, cream together the softened butter, granulated sugar, and brown sugar until light and fluffy.",
      timer: 5,
    },
    {
      id: 4,
      instruction: "Beat in eggs one at a time, then add vanilla extract. Mix until well combined.",
      timer: 3,
    },
    {
      id: 5,
      instruction: "Gradually mix in the flour mixture until just combined. Don't overmix. Fold in chocolate chips.",
      timer: 3,
    },
    {
      id: 6,
      instruction: "Drop rounded tablespoons of dough onto prepared baking sheets, spacing them about 2 inches apart.",
      timer: 5,
    },
    {
      id: 7,
      instruction:
        "Bake for 9-11 minutes, or until the edges are golden brown but centers still look slightly underbaked.",
      timer: 11,
    },
    {
      id: 8,
      instruction:
        "Let cookies cool on the baking sheet for 5 minutes, then transfer to a wire rack to cool completely.",
      timer: 5,
    },
  ],
}

interface TimerState {
  stepId: number
  timeLeft: number
  isRunning: boolean
  originalTime: number
}

export default function RecipeView() {
  const [servings, setServings] = useState(recipe.originalServings)
  const [liked, setLiked] = useState(false)
  const [activeTimers, setActiveTimers] = useState<TimerState[]>([])
  const [showShareModal, setShowShareModal] = useState(false)
  const [copied, setCopied] = useState(false)

  const scalingFactor = servings / recipe.originalServings

  const scaleIngredient = (amount: number) => {
    const scaled = amount * scalingFactor
    return scaled % 1 === 0 ? scaled.toString() : scaled.toFixed(2)
  }

  const startTimer = (stepId: number, minutes: number) => {
    const existingTimer = activeTimers.find((t) => t.stepId === stepId)
    if (existingTimer) return

    const timer: TimerState = {
      stepId,
      timeLeft: minutes * 60,
      isRunning: true,
      originalTime: minutes * 60,
    }

    setActiveTimers((prev) => [...prev, timer])

    const interval = setInterval(() => {
      setActiveTimers((prev) =>
        prev.map((t) => {
          if (t.stepId === stepId) {
            const newTimeLeft = t.timeLeft - 1
            if (newTimeLeft <= 0) {
              clearInterval(interval)
              // Could add notification here
              return { ...t, timeLeft: 0, isRunning: false }
            }
            return { ...t, timeLeft: newTimeLeft }
          }
          return t
        }),
      )
    }, 1000)
  }

  const pauseTimer = (stepId: number) => {
    setActiveTimers((prev) => prev.map((t) => (t.stepId === stepId ? { ...t, isRunning: !t.isRunning } : t)))
  }

  const resetTimer = (stepId: number) => {
    setActiveTimers((prev) => prev.filter((t) => t.stepId !== stepId))
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const getTimer = (stepId: number) => {
    return activeTimers.find((t) => t.stepId === stepId)
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy: ", err)
    }
  }

  const shareUrl = `${typeof window !== "undefined" ? window.location.origin : ""}/recipe/${recipe.id}`
  const shareText = `Check out this amazing recipe: ${recipe.title}`

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-orange-100 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <Link href="/dashboard">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              </Link>
              <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                <ChefHat className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">Recipe</h1>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => setShowShareModal(true)}>
                <Share className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Link href={`/recipe/${recipe.id}/edit`}>
                <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Recipe Header */}
          <Card className="bg-white/60 backdrop-blur-sm border-0 overflow-hidden">
            <div className="relative">
              <img src="/images/chocolate-chip-cookies.png" alt={recipe.title} className="w-full h-64 object-cover" />
              <div className="absolute top-4 right-4 flex gap-2">
                {recipe.isPublic ? (
                  <Badge className="bg-green-500 text-white">Public</Badge>
                ) : (
                  <Badge variant="secondary">Private</Badge>
                )}
              </div>
            </div>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{recipe.title}</h1>
                  <p className="text-gray-600 text-lg">{recipe.description}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setLiked(!liked)}
                  className={liked ? "text-red-500" : "text-gray-400"}
                >
                  <Heart className={`w-5 h-5 mr-1 ${liked ? "fill-current" : ""}`} />
                  {recipe.likes + (liked ? 1 : 0)}
                </Button>
              </div>

              <div className="flex items-center space-x-6 mb-6">
                <div className="flex items-center text-gray-600">
                  <Clock className="w-4 h-4 mr-2" />
                  <span className="text-sm">
                    Prep: {recipe.prepTime} • Cook: {recipe.cookTime} • Total: {recipe.totalTime}
                  </span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Eye className="w-4 h-4 mr-2" />
                  <span className="text-sm">{recipe.views} views</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback>SJ</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Curated by {recipe.curator}</p>
                    <p className="text-xs text-gray-500">{recipe.createdAt}</p>
                  </div>
                </div>
                {recipe.collaborators.length > 0 && (
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">Collaborators:</span>
                    <div className="flex -space-x-2">
                      {recipe.collaborators.slice(0, 3).map((_, index) => (
                        <Avatar key={index} className="w-6 h-6 border-2 border-white">
                          <AvatarFallback className="text-xs">{String.fromCharCode(65 + index)}</AvatarFallback>
                        </Avatar>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Ingredients */}
            <div className="md:col-span-1">
              <Card className="bg-white/60 backdrop-blur-sm border-0 sticky top-24">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Users className="w-5 h-5 text-green-500" />
                      Ingredients
                    </CardTitle>
                  </div>
                  <div className="flex items-center justify-center space-x-2 bg-gray-50 rounded-lg p-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setServings(Math.max(1, servings - 1))}
                      className="h-8 w-8 p-0"
                    >
                      <Minus className="w-3 h-3" />
                    </Button>
                    <div className="flex items-center justify-center min-w-[80px]">
                      <span className="text-sm font-medium text-center">{servings} servings</span>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setServings(servings + 1)}
                      className="h-8 w-8 p-0"
                    >
                      <Plus className="w-3 h-3" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {recipe.ingredients.map((ingredient) => (
                    <div key={ingredient.id} className="flex justify-between items-center">
                      <span className="text-sm text-gray-900">{ingredient.name}</span>
                      <span className="text-sm font-medium text-gray-600">
                        {scaleIngredient(ingredient.amount)} {ingredient.unit}
                      </span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Instructions */}
            <div className="md:col-span-2">
              <Card className="bg-white/60 backdrop-blur-sm border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-purple-500" />
                    Instructions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-8">
                  {recipe.steps.map((step, index) => {
                    const timer = getTimer(step.id)
                    return (
                      <div key={step.id} className="group">
                        <div className="flex items-start space-x-4">
                          <div className="flex-shrink-0">
                            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-sm">
                              {index + 1}
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                              <p className="text-gray-900 leading-relaxed text-base">{step.instruction}</p>
                              {step.timer > 0 && (
                                <div className="mt-4 pt-4 border-t border-gray-200">
                                  {!timer ? (
                                    <Button
                                      onClick={() => startTimer(step.id, step.timer)}
                                      size="sm"
                                      className="bg-purple-500 hover:bg-purple-600 text-white rounded-lg px-4 py-2 text-sm font-medium"
                                    >
                                      <Clock className="w-4 h-4 mr-2" />
                                      Start {step.timer}m Timer
                                    </Button>
                                  ) : (
                                    <div className="flex items-center space-x-3">
                                      <div
                                        className={`px-4 py-2 rounded-lg text-sm font-semibold ${
                                          timer.timeLeft === 0
                                            ? "bg-red-100 text-red-800 border border-red-200"
                                            : "bg-purple-100 text-purple-800 border border-purple-200"
                                        }`}
                                      >
                                        {timer.timeLeft === 0 ? "⏰ Time's up!" : `⏱️ ${formatTime(timer.timeLeft)}`}
                                      </div>
                                      <Button
                                        onClick={() => pauseTimer(step.id)}
                                        size="sm"
                                        variant="ghost"
                                        className="h-8 w-8 p-0 rounded-lg hover:bg-gray-100"
                                      >
                                        {timer.isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                                      </Button>
                                      <Button
                                        onClick={() => resetTimer(step.id)}
                                        size="sm"
                                        variant="ghost"
                                        className="h-8 w-8 p-0 rounded-lg hover:bg-gray-100"
                                      >
                                        <RotateCcw className="w-4 h-4" />
                                      </Button>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        {/* Share Modal */}
        <Dialog open={showShareModal} onOpenChange={setShowShareModal}>
          <DialogContent className="sm:max-w-md p-6 overflow-hidden">
            <DialogHeader className="pb-4">
              <DialogTitle className="flex items-center gap-2 text-xl">
                <Share className="w-5 h-5 text-orange-500" />
                Share Recipe
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-5 overflow-hidden">
              {/* Recipe Preview */}
              <div className="flex items-center space-x-3 p-3 bg-orange-50 rounded-lg border border-orange-100 w-full">
                <img
                  src={recipe.image || "/placeholder.svg"}
                  alt={recipe.title}
                  className="w-12 h-12 object-cover rounded-md flex-shrink-0"
                />
                <div className="flex-1 min-w-0 overflow-hidden">
                  <h3 className="font-medium text-gray-900 truncate">{recipe.title}</h3>
                  <p className="text-xs text-gray-600 truncate">by {recipe.curator}</p>
                </div>
              </div>

              {/* Copy Link */}
              <div className="space-y-2 w-full">
                <label className="text-sm font-medium text-gray-700 block">Share Link</label>
                <div className="flex items-center gap-2 w-full">
                  <div className="flex-1 flex items-center p-2 bg-gray-50 rounded-md border border-gray-200 min-w-0 overflow-hidden">
                    <Link2 className="w-4 h-4 text-gray-400 flex-shrink-0 mr-2" />
                    <span className="text-sm text-gray-600 truncate">{shareUrl}</span>
                  </div>
                  <Button
                    onClick={() => copyToClipboard(shareUrl)}
                    size="sm"
                    className={`flex-shrink-0 whitespace-nowrap ${copied ? "bg-green-500 hover:bg-green-600" : "bg-orange-500 hover:bg-orange-600"}`}
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 mr-1" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 mr-1" />
                        Copy
                      </>
                    )}
                  </Button>
                </div>
              </div>

              {/* Social Share Options */}
              <div className="space-y-2 w-full">
                <label className="text-sm font-medium text-gray-700 block">Share on Social Media</label>
                <div className="grid gap-2 w-full">
                  <Button
                    variant="outline"
                    className="w-full justify-start h-10 text-left"
                    onClick={() => {
                      window.open(
                        `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
                        "_blank",
                      )
                    }}
                  >
                    <Twitter className="w-4 h-4 mr-2 text-blue-500" />
                    Twitter
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start h-10 text-left"
                    onClick={() => {
                      window.open(
                        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
                        "_blank",
                      )
                    }}
                  >
                    <Facebook className="w-4 h-4 mr-2 text-blue-600" />
                    Facebook
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start h-10 text-left"
                    onClick={() => {
                      window.open(
                        `mailto:?subject=${encodeURIComponent(recipe.title)}&body=${encodeURIComponent(`${shareText}\n\n${shareUrl}`)}`,
                        "_blank",
                      )
                    }}
                  >
                    <Mail className="w-4 h-4 mr-2 text-gray-600" />
                    Email
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  )
}
