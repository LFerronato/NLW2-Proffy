export default function convertHourToMinutes(time: string) {
  const [hour, minutes] = time.split(':').map(Number)
  const totalMinutes = minutes + (hour * 60)
  return totalMinutes
}
