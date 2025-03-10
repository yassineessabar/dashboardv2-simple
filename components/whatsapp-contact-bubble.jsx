import { MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export function WhatsAppContactBubble({ phoneNumber = "447700000000", message = "I need help with registration", position = "bottom-right" }) {
  // Position styling - positioned slightly above the video bubble
  const positionStyles = {
    "bottom-right": "fixed bottom-24 right-6",
    "bottom-left": "fixed bottom-24 left-6",
    "top-right": "fixed top-24 right-6",
    "top-left": "fixed top-24 left-6"
  }
  
  const handleWhatsAppClick = (e) => {
    // Prevent default behavior and event propagation
    e.preventDefault()
    e.stopPropagation()
    
    // Encode the message for URL
    const encodedMessage = encodeURIComponent(message)
    // Open WhatsApp with pre-filled message
    window.open(`https://wa.me/61480575144?text=Hi%20team,%20I'd%20like%20to%20set%20up%20a%20live%20account%20on%20Sigmatic3.5.%20Could%20you%20help%20me%20get%20started?%20Thanks!`, '_blank')
  }
  
  return (
    <div className={`${positionStyles[position]} z-50`}>
      <Button 
        onClick={handleWhatsAppClick}
        className="rounded-full w-14 h-14 bg-green-500 hover:bg-green-600 shadow-lg flex items-center justify-center"
        type="button" // Explicitly set button type to prevent form submission
      >
        <MessageCircle className="h-6 w-6" />
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-25"></span>
      </Button>
      <div className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4">
        <div className="bg-white text-green-600 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
          ?
        </div>
      </div>
    </div>
  )
}