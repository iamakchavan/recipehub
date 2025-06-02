"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { ChefHat, Plus, Minus, Clock, Users, Mail, ArrowLeft, Trash2, Save } from "lucide-react"
import Link from "next/link"

interface Ingredient {
  id: number
  name: string
  amount: string
  unit: string
}

interface Step {
  id: number
  instruction: string
  timer: number
}

// Mock data for editing
const initialRecipe = {
  title: "Grandma's Chocolate Chip Cookies",
  description:
    "The perfect chewy cookies with crispy edges that will remind you of childhood. These cookies have the ideal balance of sweetness and texture.",
  servings: 24,
  cookTime: "25 minutes",
  isPublic: true,
  collaborators: ["john@example.com", "mary@example.com"],
}

const initialIngredients: Ingredient[] = [
  { id: 1, name: "All-purpose flour", amount: "2.25", unit: "cups" },
  { id: 2, name: "Baking soda", amount: "1", unit: "tsp" },
  { id: 3, name: "Salt", amount: "1", unit: "tsp" },
  { id: 4, name: "Butter, softened", amount: "1", unit: "cup" },
  { id: 5, name: "Granulated sugar", amount: "0.75", unit: "cup" },
  { id: 6, name: "Brown sugar, packed", amount: "0.75", unit: "cup" },
  { id: 7, name: "Large eggs", amount: "2", unit: "pieces" },
  { id: 8, name: "Vanilla extract", amount: "2", unit: "tsp" },
  { id: 9, name: "Chocolate chips", amount: "2", unit: "cups" },
]

const initialSteps: Step[] = [
  { id: 1, instruction: "Preheat your oven to 375°F (190°C). Line baking sheets with parchment paper.", timer: 0 },
  { id: 2, instruction: "In a medium bowl, whisk together flour, baking soda, and salt. Set aside.", timer: 2 },
  {
    id: 3,
    instruction:
      "In a large bowl, cream together the softened butter, granulated sugar, and brown sugar until light and fluffy.",
    timer: 5,
  },
  { id: 4, instruction: "Beat in eggs one at a time, then add vanilla extract. Mix until well combined.", timer: 3 },
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
    instruction: "Let cookies cool on the baking sheet for 5 minutes, then transfer to a wire rack to cool completely.",
    timer: 5,
  },
]

export default function EditRecipe() {
  const [title, setTitle] = useState(initialRecipe.title)
  const [description, setDescription] = useState(initialRecipe.description)
  const [servings, setServings] = useState(initialRecipe.servings)
  const [cookTime, setCookTime] = useState(initialRecipe.cookTime)
  const [isPublic, setIsPublic] = useState(initialRecipe.isPublic)
  const [collaboratorEmail, setCollaboratorEmail] = useState("")
  const [collaborators, setCollaborators] = useState<string[]>(initialRecipe.collaborators)

  const [ingredients, setIngredients] = useState<Ingredient[]>(initialIngredients)
  const [steps, setSteps] = useState<Step[]>(initialSteps)

  const addIngredient = () => {
    const newId = Math.max(...ingredients.map((i) => i.id)) + 1
    setIngredients([...ingredients, { id: newId, name: "", amount: "", unit: "" }])
  }

  const removeIngredient = (id: number) => {
    if (ingredients.length > 1) {
      setIngredients(ingredients.filter((i) => i.id !== id))
    }
  }

  const updateIngredient = (id: number, field: keyof Ingredient, value: string) => {
    setIngredients(ingredients.map((i) => (i.id === id ? { ...i, [field]: value } : i)))
  }

  const addStep = () => {
    const newId = Math.max(...steps.map((s) => s.id)) + 1
    setSteps([...steps, { id: newId, instruction: "", timer: 0 }])
  }

  const removeStep = (id: number) => {
    if (steps.length > 1) {
      setSteps(steps.filter((s) => s.id !== id))
    }
  }

  const updateStep = (id: number, field: keyof Step, value: string | number) => {
    setSteps(steps.map((s) => (s.id === id ? { ...s, [field]: value } : s)))
  }

  const addCollaborator = () => {
    if (collaboratorEmail && !collaborators.includes(collaboratorEmail)) {
      setCollaborators([...collaborators, collaboratorEmail])
      setCollaboratorEmail("")
    }
  }

  const removeCollaborator = (email: string) => {
    setCollaborators(collaborators.filter((c) => c !== email))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-orange-100 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <Link href="/recipe/1">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Recipe
                </Button>
              </Link>
              <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                <ChefHat className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">Edit Recipe</h1>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
              <Button className="bg-orange-500 hover:bg-orange-600">Publish</Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Basic Info */}
          <Card className="bg-white/60 backdrop-blur-sm border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ChefHat className="w-5 h-5 text-orange-500" />
                Recipe Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Recipe Title</Label>
                <Input
                  id="title"
                  placeholder="Enter a delicious title..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="text-lg"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Tell us about your recipe..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="servings">Servings</Label>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" onClick={() => setServings(Math.max(1, servings - 1))}>
                      <Minus className="w-4 h-4" />
                    </Button>
                    <Input
                      id="servings"
                      type="number"
                      value={servings}
                      onChange={(e) => setServings(Number.parseInt(e.target.value) || 1)}
                      className="text-center"
                      min="1"
                    />
                    <Button variant="outline" size="sm" onClick={() => setServings(servings + 1)}>
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cookTime">Cook Time</Label>
                  <Input
                    id="cookTime"
                    placeholder="e.g., 30 minutes"
                    value={cookTime}
                    onChange={(e) => setCookTime(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Make Public</Label>
                  <p className="text-sm text-gray-600">Allow others to view and discover your recipe</p>
                </div>
                <Switch checked={isPublic} onCheckedChange={setIsPublic} />
              </div>
            </CardContent>
          </Card>

          {/* Ingredients */}
          <Card className="bg-white/60 backdrop-blur-sm border-0">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-green-500" />
                  Ingredients
                </CardTitle>
                <Button onClick={addIngredient} variant="outline" size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Ingredient
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {ingredients.map((ingredient, index) => (
                <div key={ingredient.id} className="flex items-center space-x-3">
                  <span className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm font-medium">
                    {index + 1}
                  </span>
                  <div className="flex-1 grid grid-cols-3 gap-3">
                    <Input
                      placeholder="Amount"
                      value={ingredient.amount}
                      onChange={(e) => updateIngredient(ingredient.id, "amount", e.target.value)}
                    />
                    <Input
                      placeholder="Unit"
                      value={ingredient.unit}
                      onChange={(e) => updateIngredient(ingredient.id, "unit", e.target.value)}
                    />
                    <Input
                      placeholder="Ingredient name"
                      value={ingredient.name}
                      onChange={(e) => updateIngredient(ingredient.id, "name", e.target.value)}
                    />
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeIngredient(ingredient.id)}
                    disabled={ingredients.length === 1}
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Instructions */}
          <Card className="bg-white/60 backdrop-blur-sm border-0">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-purple-500" />
                  Instructions
                </CardTitle>
                <Button onClick={addStep} variant="outline" size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Step
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {steps.map((step, index) => (
                <div key={step.id} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <span className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-sm font-medium text-purple-600">
                        {index + 1}
                      </span>
                      <span className="font-medium">Step {index + 1}</span>
                    </span>
                    <Button variant="ghost" size="sm" onClick={() => removeStep(step.id)} disabled={steps.length === 1}>
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </div>
                  <Textarea
                    placeholder="Describe this step in detail..."
                    value={step.instruction}
                    onChange={(e) => updateStep(step.id, "instruction", e.target.value)}
                    rows={3}
                  />
                  <div className="flex items-center space-x-3">
                    <Label htmlFor={`timer-${step.id}`} className="text-sm">
                      Timer (minutes):
                    </Label>
                    <Input
                      id={`timer-${step.id}`}
                      type="number"
                      placeholder="0"
                      value={step.timer || ""}
                      onChange={(e) => updateStep(step.id, "timer", Number.parseInt(e.target.value) || 0)}
                      className="w-24"
                      min="0"
                    />
                    {step.timer > 0 && (
                      <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                        <Clock className="w-3 h-3 mr-1" />
                        {step.timer}m
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Collaborators */}
          <Card className="bg-white/60 backdrop-blur-sm border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-pink-500" />
                Collaborators
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex space-x-3">
                <Input
                  placeholder="Enter email address..."
                  value={collaboratorEmail}
                  onChange={(e) => setCollaboratorEmail(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && addCollaborator()}
                />
                <Button onClick={addCollaborator} variant="outline">
                  <Plus className="w-4 h-4 mr-2" />
                  Invite
                </Button>
              </div>

              {collaborators.length > 0 && (
                <div className="space-y-2">
                  <Label>Invited Collaborators</Label>
                  <div className="flex flex-wrap gap-2">
                    {collaborators.map((email) => (
                      <Badge key={email} variant="secondary" className="bg-pink-100 text-pink-800">
                        {email}
                        <button onClick={() => removeCollaborator(email)} className="ml-2 hover:text-red-600">
                          ×
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
