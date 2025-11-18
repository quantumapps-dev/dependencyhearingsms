'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Phone, Plus, Trash2, CheckCircle } from 'lucide-react'
import { toast } from 'sonner'

interface PhoneNumber {
  id: string
  number: string
  friendlyName: string
  isPrimary: boolean
  capabilities: {
    sms: boolean
    voice: boolean
  }
}

export default function PhoneNumberManager() {
  const [numbers, setNumbers] = useState<PhoneNumber[]>([])
  const [newNumber, setNewNumber] = useState('')
  const [newName, setNewName] = useState('')

  useEffect(() => {
    const saved = localStorage.getItem('twilio_phone_numbers')
    if (saved) {
      setNumbers(JSON.parse(saved))
    } else {
      // Default numbers
      const defaultNumbers: PhoneNumber[] = [
        {
          id: '1',
          number: '+15551234567',
          friendlyName: 'Main Office Line',
          isPrimary: true,
          capabilities: { sms: true, voice: true },
        },
        {
          id: '2',
          number: '+15559876543',
          friendlyName: 'Emergency Contact Line',
          isPrimary: false,
          capabilities: { sms: true, voice: false },
        },
      ]
      setNumbers(defaultNumbers)
      localStorage.setItem('twilio_phone_numbers', JSON.stringify(defaultNumbers))
    }
  }, [])

  const addNumber = () => {
    if (!newNumber) {
      toast.error('Please enter a phone number')
      return
    }

    const number: PhoneNumber = {
      id: Date.now().toString(),
      number: newNumber,
      friendlyName: newName || newNumber,
      isPrimary: numbers.length === 0,
      capabilities: { sms: true, voice: true },
    }

    const updated = [...numbers, number]
    setNumbers(updated)
    localStorage.setItem('twilio_phone_numbers', JSON.stringify(updated))
    
    setNewNumber('')
    setNewName('')
    toast.success('Phone number added')
  }

  const removeNumber = (id: string) => {
    const updated = numbers.filter((n) => n.id !== id)
    setNumbers(updated)
    localStorage.setItem('twilio_phone_numbers', JSON.stringify(updated))
    toast.success('Phone number removed')
  }

  const setPrimary = (id: string) => {
    const updated = numbers.map((n) => ({
      ...n,
      isPrimary: n.id === id,
    }))
    setNumbers(updated)
    localStorage.setItem('twilio_phone_numbers', JSON.stringify(updated))
    toast.success('Primary number updated')
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                placeholder="+1 555 123 4567"
                value={newNumber}
                onChange={(e) => setNewNumber(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="friendlyName">Friendly Name</Label>
              <Input
                id="friendlyName"
                placeholder="e.g., Main Office Line"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
            </div>
          </div>
          <Button onClick={addNumber} className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Add Phone Number
          </Button>
        </CardContent>
      </Card>

      <div className="space-y-2">
        <h4 className="font-medium">Active Phone Numbers</h4>
        {numbers.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">
              <Phone className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>No phone numbers configured</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-2">
            {numbers.map((number) => (
              <Card key={number.id}>
                <CardContent className="py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{number.number}</p>
                          {number.isPrimary && (
                            <Badge variant="default">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Primary
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {number.friendlyName}
                        </p>
                        <div className="flex gap-2 mt-1">
                          {number.capabilities.sms && (
                            <Badge variant="secondary" className="text-xs">
                              SMS
                            </Badge>
                          )}
                          {number.capabilities.voice && (
                            <Badge variant="secondary" className="text-xs">
                              Voice
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {!number.isPrimary && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setPrimary(number.id)}
                        >
                          Set Primary
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeNumber(number.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
