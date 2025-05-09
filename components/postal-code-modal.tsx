"use client"

import { useState } from "react"
import { Plus } from "lucide-react"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface PostalCodeModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSelectPostalCode: (postalCode: string) => void
}

export function PostalCodeModal({ open, onOpenChange, onSelectPostalCode }: PostalCodeModalProps) {
  const [postalCode, setPostalCode] = useState("")
  const [showNewAddressForm, setShowNewAddressForm] = useState(false)

  const handleSubmit = () => {
    if (postalCode) {
      onSelectPostalCode(postalCode)
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">¿Dónde deseas recibir tus compras?</DialogTitle>
          <DialogDescription className="text-base">
            Podremos mostrarte las mejores oportunidades en tus búsquedas cercanas a tu domicilio, ver costos y tiempos
            de entrega.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Addresses section */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Tus direcciones</h3>
            <p className="text-gray-600 mb-3">Aún no cargaste ninguna dirección en tu perfil.</p>
            <Button
              variant="ghost"
              className="text-fuchsia-600 hover:text-fuchsia-700 hover:bg-fuchsia-50 pl-0"
              onClick={() => setShowNewAddressForm(!showNewAddressForm)}
            >
              <Plus className="h-5 w-5 mr-1" /> Crear nueva
            </Button>
          </div>

          {/* New address form (conditionally shown) */}
          {showNewAddressForm && (
            <div className="space-y-3 border p-3 rounded-md">
              <h4 className="font-medium">Nueva dirección</h4>
              <div>
                <label htmlFor="street" className="block text-sm mb-1">
                  Calle y número
                </label>
                <Input id="street" placeholder="Ej: Av. Corrientes 1234" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="city" className="block text-sm mb-1">
                    Ciudad
                  </label>
                  <Input id="city" placeholder="Ej: Buenos Aires" />
                </div>
                <div>
                  <label htmlFor="province" className="block text-sm mb-1">
                    Provincia
                  </label>
                  <Input id="province" placeholder="Ej: CABA" />
                </div>
              </div>
            </div>
          )}

          {/* Search by zone section */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Buscar por zona</h3>
            <Input
              placeholder="Código Postal"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              className="mb-2"
            />
            <a href="#" className="text-fuchsia-600 hover:underline text-sm">
              No sé mi código
            </a>
          </div>
        </div>

        <DialogFooter className="flex justify-between sm:justify-between mt-6 border-t pt-4">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="border-fuchsia-600 text-fuchsia-600 hover:bg-fuchsia-50"
          >
            Cancelar
          </Button>
          <Button onClick={handleSubmit} className="bg-gray-200 text-gray-700 hover:bg-gray-300" disabled={!postalCode}>
            Aceptar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
