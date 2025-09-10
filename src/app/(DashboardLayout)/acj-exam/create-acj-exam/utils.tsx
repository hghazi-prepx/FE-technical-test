import { MenuItem } from "@mui/material"
import moment from "moment"

export const populateOptions = (start: any, end: any) => {
  const options = []
  for (let i = start; i <= end; i++) {
    options.push(
      <MenuItem key={i} value={i < 10 ? "0" + i : i}>
        {i < 10 ? "0" + i : i}
      </MenuItem>
    )
  }
  return options
}

export const generateTimeOptions = () => {
  const timeOptions = []
  for (let hour = 1; hour <= 24; hour++) {
    const hour12 = hour > 12 ? hour - 12 : hour
    const period = hour >= 12 ? "PM" : "AM"
    const formattedTime = hour === 24 ? "12:00 AM" : `${hour12}:00 ${period}`
    timeOptions.push(formattedTime)
  }
  return timeOptions
}

export const addSelectedTimeToTimestamp = (
  selectedTime: any,
  baseDate: number | null
) => {
  // Parse the selected time
  const [time, period] = selectedTime.split(" ")
  let [hours, minutes] = time.split(":").map(Number)
  let convertedHours = hours
  // Convert to 24-hour format
  if (period === "PM" && convertedHours !== 12) {
    convertedHours += 12
  }
  if (period === "AM" && convertedHours === 12) {
    convertedHours = 0
  }

  // Create a moment object from the existing timestamp in UTC mode
  let date = moment.utc(baseDate || new Date())

  // Set the hours and minutes based on selected time
  date.hour(convertedHours).minute(minutes).second(0).millisecond(0)
  return date.valueOf()
}
