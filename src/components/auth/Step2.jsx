import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { step2Schema } from '@/lib/validations'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

export function Step2({ defaultValues, onNext, onBack }) {
  const { register, handleSubmit, control, watch, setValue, formState: { errors, isValid } } = useForm({
    resolver: zodResolver(step2Schema),
    mode: 'onChange',
    defaultValues: {
      dob: defaultValues?.dob || '',
      gender: defaultValues?.gender || undefined,
      height: defaultValues?.height || 170,
      heightUnit: defaultValues?.heightUnit || 'cm',
      weight: defaultValues?.weight || 70,
      weightUnit: defaultValues?.weightUnit || 'kg'
    }
  })

  const hUnit = watch('heightUnit')
  const wUnit = watch('weightUnit')
  const gender = watch('gender')

  const onSubmit = (data) => {
    onNext(data)
  }

  const genderOptions = ['Male', 'Female', 'Non-binary', 'Prefer not to say']

  const handleHeightUnit = (newUnit) => {
    if (newUnit === hUnit) return
    const currentHeight = watch('height')
    if (currentHeight) {
      if (newUnit === 'ft') {
        // cm to ft
        setValue('height', Number((currentHeight / 30.48).toFixed(2)))
      } else {
        // ft to cm
        setValue('height', Math.round(currentHeight * 30.48))
      }
    }
    setValue('heightUnit', newUnit)
  }

  const handleWeightUnit = (newUnit) => {
    if (newUnit === wUnit) return
    const currentWeight = watch('weight')
    if (currentWeight) {
      if (newUnit === 'lbs') {
        // kg to lbs
        setValue('weight', Number((currentWeight * 2.20462).toFixed(1)))
      } else {
        // lbs to kg
        setValue('weight', Number((currentWeight / 2.20462).toFixed(1)))
      }
    }
    setValue('weightUnit', newUnit)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit, (errors) => alert("Validation Failed: " + JSON.stringify(errors)))} className="space-y-6">
      {/* Hidden inputs must have bound values or they submit empty strings! */}
      <input type="hidden" {...register('gender')} value={gender || ''} />
      <input type="hidden" {...register('heightUnit')} value={hUnit || 'cm'} />
      <input type="hidden" {...register('weightUnit')} value={wUnit || 'kg'} />

      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Personal Details</h2>
        <p className="text-neutral-500 text-sm">Help us tailor your experience.</p>
      </div>

      <div className="space-y-6">
        {/* DOB */}
        <div className="bg-neutral-50 dark:bg-neutral-900 rounded-xl p-4 space-y-3 border border-neutral-100 dark:border-neutral-800">
          <Label htmlFor="dob">Date of Birth</Label>
          <Input id="dob" type="date" {...register('dob')} className="bg-white dark:bg-neutral-950" />
          {errors.dob && <p className="text-error text-sm">{errors.dob.message}</p>}
        </div>

        {/* Gender Toggle Group */}
        <div className="bg-neutral-50 dark:bg-neutral-900 rounded-xl p-4 space-y-3 border border-neutral-100 dark:border-neutral-800">
          <Label>Gender</Label>
          <div className="flex flex-wrap gap-2">
            {genderOptions.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => setValue('gender', opt, { shouldValidate: true })}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  gender === opt 
                    ? 'bg-brand-500 text-white shadow-md' 
                    : 'bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
          {errors.gender && <p className="text-error text-sm">{errors.gender.message}</p>}
        </div>

        {/* Height & Weight row */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-neutral-50 dark:bg-neutral-900 rounded-xl p-4 space-y-3 border border-neutral-100 dark:border-neutral-800">
            <div className="flex justify-between items-center">
              <Label htmlFor="height">Height</Label>
              <div className="flex bg-neutral-200 dark:bg-neutral-800 rounded-lg p-0.5">
                <button type="button" onClick={() => handleHeightUnit('cm')} className={`px-2 py-0.5 text-xs rounded-md ${hUnit === 'cm' ? 'bg-white dark:bg-neutral-700 shadow' : ''}`}>cm</button>
                <button type="button" onClick={() => handleHeightUnit('ft')} className={`px-2 py-0.5 text-xs rounded-md ${hUnit === 'ft' ? 'bg-white dark:bg-neutral-700 shadow' : ''}`}>ft</button>
              </div>
            </div>
            <Input id="height" type="number" {...register('height', { valueAsNumber: true })} className="bg-white dark:bg-neutral-950" />
            {errors.height && <p className="text-error text-sm">{errors.height.message}</p>}
          </div>

          <div className="bg-neutral-50 dark:bg-neutral-900 rounded-xl p-4 space-y-3 border border-neutral-100 dark:border-neutral-800">
            <div className="flex justify-between items-center">
              <Label htmlFor="weight">Weight</Label>
              <div className="flex bg-neutral-200 dark:bg-neutral-800 rounded-lg p-0.5">
                <button type="button" onClick={() => handleWeightUnit('kg')} className={`px-2 py-0.5 text-xs rounded-md ${wUnit === 'kg' ? 'bg-white dark:bg-neutral-700 shadow' : ''}`}>kg</button>
                <button type="button" onClick={() => handleWeightUnit('lbs')} className={`px-2 py-0.5 text-xs rounded-md ${wUnit === 'lbs' ? 'bg-white dark:bg-neutral-700 shadow' : ''}`}>lbs</button>
              </div>
            </div>
            <Input id="weight" type="number" {...register('weight', { valueAsNumber: true })} className="bg-white dark:bg-neutral-950" />
            {errors.weight && <p className="text-error text-sm">{errors.weight.message}</p>}
          </div>
        </div>
      </div>

      <div className="pt-4 flex justify-between gap-4">
        <Button type="button" variant="ghost" onClick={onBack}>Back</Button>
        <Button type="submit" className="flex-1">Continue</Button>
      </div>
    </form>
  )
}
