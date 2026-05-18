import React, { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Play, Clock } from 'lucide-react'

const initialExercises = [
  { id: 1, name: 'Warm-up: Dynamic Stretching', duration: '5 min', completed: true },
  { id: 2, name: 'Barbell Squats (4x8)', duration: '15 min', completed: true },
  { id: 3, name: 'Romanian Deadlifts (3x10)', duration: '12 min', completed: true },
  { id: 4, name: 'Bulgarian Split Squats (3x10/leg)', duration: '10 min', completed: false },
  { id: 5, name: 'Leg Press (3x12)', duration: '8 min', completed: false },
  { id: 6, name: 'Cool-down: Static Stretching', duration: '5 min', completed: false },
]

export function WorkoutCard() {
  const [exercises, setExercises] = useState(initialExercises)

  const toggleExercise = (id) => {
    setExercises(exercises.map(ex => 
      ex.id === id ? { ...ex, completed: !ex.completed } : ex
    ))
  }

  const completedCount = exercises.filter(ex => ex.completed).length
  const totalCount = exercises.length
  const progressPercent = (completedCount / totalCount) * 100

  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start mb-2">
          <CardTitle>Today's Workout</CardTitle>
          <div className="flex items-center text-xs font-medium bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded-md text-neutral-600 dark:text-neutral-400">
            <Clock className="w-3 h-3 mr-1" />
            45 min
          </div>
        </div>
        <p className="text-sm text-brand-600 dark:text-brand-400 font-medium">Lower Body Power</p>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col">
        <div className="mb-6">
          <div className="flex justify-between text-xs font-medium text-neutral-500 mb-2">
            <span>Progress</span>
            <span>{completedCount} of {totalCount} completed</span>
          </div>
          <div className="h-2 w-full bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-brand-500 transition-all duration-500 ease-out" 
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        <div className="space-y-4 flex-1">
          {exercises.map((ex) => (
            <div key={ex.id} className="flex items-center space-x-3">
              <Checkbox 
                id={`ex-${ex.id}`} 
                checked={ex.completed} 
                onCheckedChange={() => toggleExercise(ex.id)} 
              />
              <div className="flex-1">
                <Label 
                  htmlFor={`ex-${ex.id}`}
                  className={`text-sm font-medium cursor-pointer transition-colors ${
                    ex.completed ? 'text-neutral-400 dark:text-neutral-600 line-through' : 'text-neutral-700 dark:text-neutral-200'
                  }`}
                >
                  {ex.name}
                </Label>
              </div>
              <span className={`text-xs ${ex.completed ? 'text-neutral-400' : 'text-neutral-500'}`}>
                {ex.duration}
              </span>
            </div>
          ))}
        </div>
      </CardContent>

      <CardFooter className="pt-4 border-t">
        <Button className="w-full shadow-lg group">
          <Play className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
          {completedCount === 0 ? 'Start Workout' : completedCount === totalCount ? 'Workout Complete!' : 'Resume Workout'}
        </Button>
      </CardFooter>
    </Card>
  )
}
