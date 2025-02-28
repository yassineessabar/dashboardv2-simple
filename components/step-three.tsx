import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"

export function StepThree({ formData, updateFormData }) {
  const robots = [
    {
      id: "sigmatic-3.5",
      name: "Sigmatic 3.5",
      description: "Our latest and most advanced trading robot",
      icon: "🚀",
    },
    {
      id: "sigmatic-3.0",
      name: "Sigmatic 3.0",
      description: "Proven performance with a track record of success",
      icon: "📈",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4 text-[#7497bd]">Step 3: Select Your Trading Robot</h2>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
          Choose the Sigmatic Trading robot that best fits your trading goals and risk tolerance.
        </p>
      </div>

      <Card className="shadow-lg">
        <CardContent className="p-6">
          <RadioGroup
            value={formData.selectedRobot}
            onValueChange={(value) => updateFormData({ selectedRobot: value })}
            className="space-y-4"
          >
            {robots.map((robot) => (
              <div
                key={robot.id}
                className="flex items-center space-x-3 bg-gray-50 p-4 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
              >
                <RadioGroupItem value={robot.id} id={robot.id} />
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">{robot.icon}</span>
                    <Label htmlFor={robot.id} className="text-lg font-medium cursor-pointer">
                      {robot.name}
                    </Label>
                  </div>
                  <p className="text-gray-600 text-sm mt-1">{robot.description}</p>
                </div>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>

      <div className="text-center">
        <p className="text-sm text-gray-500">
          Not sure which robot to choose?{" "}
          <a href="#" className="text-[#7497bd] hover:underline">
            Learn more about our trading robots
          </a>
        </p>
      </div>
    </div>
  )
}

