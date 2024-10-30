export const CHANNEL_NAMES = [
  'Help me please',
  'It\'s getting more difficult',
  'Serious help needed',
  'Why is this happening to me?',
  'Hello?',
  'Problem with my order',
  'Issue with my transaction',
  'Urgent help required',
  'App not working as intended',
  'What the..',
  'Hmmm...',
  'I smell a rat',
  'Curiosity killed the cat',
  'A little bird told me',
  'Birds of a feather flock together',
  'Not my cup of tea',
  'Two down, one to go',
  'Short end of the stick',
]

export function getRandomChannelName() {
  const randomIndex = Math.floor(Math.random() * CHANNEL_NAMES.length)
  return CHANNEL_NAMES[randomIndex]
}
