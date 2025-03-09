import { useState } from "react"
import { Play, X } from "lucide-react"
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogClose
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export function VideoInstructionBubble({ title, videoSrc, position = "bottom-right" }) {
  const [isOpen, setIsOpen] = useState(false)
  
  // Position styling
  const positionStyles = {
    "bottom-right": "fixed bottom-6 right-6",
    "bottom-left": "fixed bottom-6 left-6",
    "top-right": "fixed top-6 right-6",
    "top-left": "fixed top-6 left-6"
  }
  
  return (
    <>
      {/* Floating bubble button */}
      <div className={`${positionStyles[position]} z-50`}>
        <Button 
          onClick={() => setIsOpen(true)}
          className="rounded-full w-14 h-14 bg-[#7497bd] hover:bg-[#5a7a9d] shadow-lg flex items-center justify-center"
        >
          <Play className="h-6 w-6" />
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#7497bd] opacity-25"></span>
        </Button>
        <div className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4">
          <div className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            ?
          </div>
        </div>
      </div>

      {/* Video modal */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[700px] p-0 overflow-hidden bg-black">
          <DialogHeader className="p-4 bg-gradient-to-r from-[#1a2233] to-[#111927] flex flex-row items-center justify-between">
            <DialogTitle className="text-white">{title}</DialogTitle>
            <DialogClose asChild>
              <Button variant="ghost" className="h-8 w-8 p-0 text-white">
                <X className="h-5 w-5" />
              </Button>
            </DialogClose>
          </DialogHeader>
          <div className="relative pb-[56.25%] h-0">
            <iframe 
              className="absolute top-0 left-0 w-full h-full"
              src={videoSrc}
              title={title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}